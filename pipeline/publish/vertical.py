"""Cắt video dài 16:9 thành các phần dọc 9:16 (1080x1920) cho TikTok, Instagram, Threads, X. Không tốn credit.
Bố cục: nền giấy kem, con dấu đỏ + tiêu đề ở trên, video ở giữa, dòng "PART n/N" và lời mời xem bản đủ ở dưới.
Dùng: python3 vertical.py <fonts_dir> <video.mp4> <out_prefix> <chữ_con_dấu> "<TIÊU ĐỀ>" "<lời mời>" <font.ttf> <mốc_cắt_1> [mốc_cắt_2 ...]"""
import sys, subprocess
from PIL import Image, ImageDraw, ImageFont
import numpy as np
F, SRC, PRE, SEAL, TITLE, CTA, TF = sys.argv[1:8]; cuts = [float(x) for x in sys.argv[8:]]
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', SRC], capture_output=True, text=True).stdout)
bounds = [0.0] + cuts + [dur]; N = len(bounds) - 1
W, H = 1080, 1920; VY = (H - 608) // 2
def wrap(d, text, font, maxw):
    out, cur = [], ''
    for w in text.split(' '):
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=font) <= maxw: cur = t
        else: out.append(cur); cur = w
    return out + [cur]
for i in range(N):
    rng = np.random.default_rng(i)
    base = np.full((H, W, 3), (244, 235, 214), np.float32) + rng.normal(0, 4, (H, W, 1))
    im = Image.fromarray(base.clip(0, 255).astype(np.uint8)); d = ImageDraw.Draw(im)
    sz = 110; sx = (W - sz) // 2; sy = 150
    d.rectangle((sx, sy, sx + sz, sy + sz), fill=(178, 22, 30))
    fs = ImageFont.truetype(f'{F}/NotoSerifSC700.ttf', 80); w = d.textlength(SEAL, font=fs); d.text((sx + (sz - w) / 2, sy + 6), SEAL, font=fs, fill=(251, 241, 220))
    ft = ImageFont.truetype(f'{F}/{TF}', 76); y = 320
    for l in wrap(d, TITLE, ft, W - 120):
        w = d.textlength(l, font=ft); d.text(((W - w) / 2, y), l, font=ft, fill=(40, 32, 26)); y += 90
    for k in range(8): d.line((W / 2 - 120, y + 18 + k * .8, W / 2 + 120 - k * 6, y + 16 + k), fill=(176, 22, 30), width=2)
    d.rectangle((0, VY - 6, W, VY + 608 + 6), fill=(92, 62, 38))
    fp = ImageFont.truetype(f'{F}/{TF}', 64); t = f'PART {i + 1}/{N}'; w = d.textlength(t, font=fp)
    d.text(((W - w) / 2, VY + 608 + 90), t, font=fp, fill=(178, 22, 30))
    fc = ImageFont.truetype(f'{F}/{TF}', 40); y = VY + 608 + 200
    for l in wrap(d, CTA, fc, W - 160):
        w = d.textlength(l, font=fc); d.text(((W - w) / 2, y), l, font=fc, fill=(107, 18, 22)); y += 54
    bgp = f'{PRE}_bg{i + 1}.png'; im.save(bgp)
    a, b = bounds[i], bounds[i + 1]; L = b - a
    fil = (f'[1:v]scale=1080:608,setsar=1[v];[0:v][v]overlay=0:{VY},fade=t=in:st=0:d=0.6,fade=t=out:st={L - 0.8:.2f}:d=0.8[o];'
           f'[1:a]afade=t=in:st=0:d=0.5,afade=t=out:st={L - 1.0:.2f}:d=1.0[a]')
    out = f'{PRE}_part{i + 1}.mp4'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-loop', '1', '-i', bgp, '-ss', str(a), '-t', str(L), '-i', SRC,
                    '-filter_complex', fil, '-map', '[o]', '-map', '[a]', '-t', str(L), '-r', '30', '-c:v', 'libx264',
                    '-pix_fmt', 'yuv420p', '-crf', '20', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], check=True)
    print('ok', out, round(L, 1), 's')
