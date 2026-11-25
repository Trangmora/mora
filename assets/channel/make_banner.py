"""Ảnh bìa kênh YouTube (2560x1440), cùng phong cách video: thủy mặc, rồng mực đỏ, dải giấy có con dấu đỏ.
Dùng: python3 make_banner.py <fonts_dir> <out.jpg> "<TIÊU ĐỀ>" "<dòng phụ>" <từ_gạch_chân> <font_tiêu_đề.ttf>"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
import numpy as np
F, OUT, TITLE, SUB, HL, TFONT = sys.argv[1:7]
W, H = 2560, 1440
bg = Image.open('assets/china/images/bg_tai.jpg').convert('RGB')
bg = bg.resize((W, int(bg.height * W / bg.width)), Image.LANCZOS)
oy = int((bg.height - H) * 0.55); bg = bg.crop((0, oy, W, oy + H))
dr = Image.open('assets/china/images/dragon_red.jpg').convert('RGB')
a = np.asarray(dr); ys, xs = np.where(a.min(2) < 235); dr = dr.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
dw = 980; dr = dr.resize((dw, int(dr.height * dw / dr.width)), Image.LANCZOS)
layer = Image.new('RGB', (W, H), 'white'); layer.paste(dr, (500, 170))
img = ImageChops.multiply(bg, layer).convert('RGBA')
d = ImageDraw.Draw(img)
ft = ImageFont.truetype(f'{F}/{TFONT}', 72); fsub = ImageFont.truetype(f'{F}/{TFONT}', 30)
fs = ImageFont.truetype(f'{F}/NotoSerifSC700.ttf', 50)
def wsp(t, f, sp): return sum(d.textlength(c, font=f) for c in t) + sp * (len(t) - 1)
def dsp(x, y, t, f, sp, fill):
    for c in t: d.text((x, y), c, font=f, fill=fill); x += d.textlength(c, font=f) + sp
seal = 136; pad = 44; gap = 44
tw = max(wsp(TITLE, ft, 8), wsp(SUB, fsub, 8))
sw = pad + seal + gap + tw + pad; sh = 210
x0 = int((W - sw) / 2); y0 = int((H - sh) / 2); x1, y1 = x0 + int(sw), y0 + sh
strip = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(strip).rectangle((x0, y0, x1, y1), fill=(246, 238, 220, 240))
img = Image.alpha_composite(img, strip.filter(ImageFilter.GaussianBlur(1.2))); d = ImageDraw.Draw(img)
d.rectangle((x0, y0, x1, y1), outline=(120, 90, 60, 255), width=3)
sx, sy = x0 + pad, y0 + (sh - seal) // 2
d.rectangle((sx, sy, sx + seal, sy + seal), fill=(178, 22, 30, 255))
for i, c in enumerate('神話'):
    w = d.textlength(c, font=fs); d.text((sx + (seal - w) / 2, sy + 6 + i * 60), c, font=fs, fill=(251, 241, 220, 255))
tx = sx + seal + gap
dsp(tx, y0 + 34, TITLE, ft, 8, (43, 38, 34, 255))
i = TITLE.index(HL); mx = tx + (wsp(TITLE[:i], ft, 8) + 8 if i else 0); mw = wsp(HL, ft, 8)
for k in range(9): d.line((mx - 4, y0 + 128 + k * .9, mx + mw + 4 - k * 3, y0 + 126 + k), fill=(176, 22, 30, 200), width=2)
dsp(tx + 3, y0 + 150, SUB, fsub, 8, (107, 18, 22, 255))
img = img.convert('RGB'); arr = np.asarray(img).astype(np.float32); yy, xx = np.mgrid[0:H, 0:W]
v = np.clip(1 - 0.22 * (((xx - W / 2) / (W * .6)) ** 2 + ((yy - H / 2) / (H * .6)) ** 2), 0, 1)[..., None]
arr = arr * (0.8 + 0.2 * v) + np.random.default_rng(1).normal(0, 3, arr.shape)
Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(OUT, quality=92)
print('strip', x0, x1, 'safe 507..2053')
