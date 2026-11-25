"""Ảnh bìa từng video (1280x720), cùng kiểu ảnh bìa kênh: nền thủy mặc + một hình đỏ (mặt trời / rồng) + dải giấy có con dấu đỏ.
Dùng: python3 make_thumb.py <fonts_dir> <nền.jpg> <out.jpg> <con_dấu (1-2 chữ)> "<TIÊU ĐỀ>" "<dòng phụ>" <font.ttf>
        [--sun x,y,r] [--red ảnh_đỏ.jpg,x,y,rộng] [--crop_y 0..1]"""
import sys, argparse
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
import numpy as np
ap = argparse.ArgumentParser(); [ap.add_argument(a) for a in ['F', 'bg', 'out', 'seal', 'title', 'sub', 'font']]
ap.add_argument('--sun'); ap.add_argument('--red'); ap.add_argument('--crop_y', type=float, default=0.5); ap.add_argument('--box', type=int, default=0)
A = ap.parse_args(); W, H = 1280, 720
bg = Image.open(A.bg).convert('RGB'); bg = bg.resize((W, int(bg.height * W / bg.width)), Image.LANCZOS)
oy = int((bg.height - H) * A.crop_y); img = bg.crop((0, oy, W, oy + H))
if A.sun:
    x, y, r = [float(v) for v in A.sun.split(',')]
    layer = Image.new('RGB', (W, H), 'white'); ImageDraw.Draw(layer).ellipse((x - r, y - r, x + r, y + r), fill=(186, 40, 44))
    img = ImageChops.multiply(img, layer.filter(ImageFilter.GaussianBlur(0.8)))
if A.red:
    p, x, y, w = A.red.split(','); dr = Image.open(p).convert('RGB'); a = np.asarray(dr)
    ys, xs = np.where(a.min(2) < 235); dr = dr.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    w = int(w); dr = dr.resize((w, int(dr.height * w / dr.width)), Image.LANCZOS)
    layer = Image.new('RGB', (W, H), 'white'); layer.paste(dr, (int(x), int(y))); img = ImageChops.multiply(img, layer)
img = img.convert('RGBA'); d = ImageDraw.Draw(img)
fsub = ImageFont.truetype(f'{A.F}/{A.font}', 28)
fs = ImageFont.truetype(f'{A.F}/NotoSerifSC700.ttf', 64 if len(A.seal) == 1 else 46)
def wsp(t, f, sp): return sum(d.textlength(c, font=f) for c in t) + sp * (len(t) - 1)
def dsp(x, y, t, f, sp, fill):
    for c in t: d.text((x, y), c, font=f, fill=fill); x += d.textlength(c, font=f) + sp
if not A.box:   # chỉ có chữ, đặt thẳng lên tranh, có quầng giấy sáng mờ phía sau cho dễ đọc
    lines = A.title.split('|')
    for size in range(150, 40, -2):
        ft = ImageFont.truetype(f'{A.F}/{A.font}', size)
        if size <= 120 and max(wsp(l, ft, 10) for l in lines) <= W * 0.62: break
    lh = int(size * 1.24); th = lh * len(lines); ty = int(H * 0.60 - th / 2)
    glow = Image.new('L', (W, H), 0); gd = ImageDraw.Draw(glow)
    for i, l in enumerate(lines):
        w = wsp(l, ft, 10); gd.rectangle(((W - w) / 2 - 30, ty + i * lh, (W + w) / 2 + 30, ty + i * lh + lh), fill=200)
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    img = Image.composite(Image.new('RGBA', (W, H), (246, 240, 226, 255)), img, glow); d = ImageDraw.Draw(img)
    for i, l in enumerate(lines):
        w = wsp(l, ft, 10); col = (178, 22, 30, 255) if i == len(lines) - 1 and len(lines) > 1 else (36, 28, 22, 255)
        dsp((W - w) / 2, ty + i * lh, l, ft, 10, col)
else:
    seal = 150; pad = 40; gap = 40
    lines = A.title.split('|'); sub = A.sub.strip()
    for size in range(110, 40, -2):   # tự co chữ cho dải giấy vừa khung (chừa 50 px mỗi bên)
        ft = ImageFont.truetype(f'{A.F}/{A.font}', size)
        tw = max([wsp(l, ft, 8) for l in lines] + ([wsp(sub, fsub, 6)] if sub else []))
        if pad + seal + gap + tw + pad <= W - 100: break
    lh = int(size * 1.08); th = lh * len(lines) + (50 if sub else 0)
    sh = max(seal + 2 * pad, th + 2 * pad); sw = pad + seal + gap + tw + pad
    x0 = int((W - sw) / 2); y0 = int(H * 0.58 - sh / 2); x1, y1 = x0 + int(sw), y0 + sh
    strip = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(strip).rectangle((x0, y0, x1, y1), fill=(246, 238, 220, 242))
    img = Image.alpha_composite(img, strip.filter(ImageFilter.GaussianBlur(1))); d = ImageDraw.Draw(img)
    d.rectangle((x0, y0, x1, y1), outline=(120, 90, 60, 255), width=3)
    sx, sy = x0 + pad, y0 + (sh - seal) // 2; d.rectangle((sx, sy, sx + seal, sy + seal), fill=(178, 22, 30, 255))
    fs = ImageFont.truetype(f'{A.F}/NotoSerifSC700.ttf', 84 if len(A.seal) == 1 else 60)
    if len(A.seal) == 1:
        w = d.textlength(A.seal, font=fs); d.text((sx + (seal - w) / 2, sy + 22), A.seal, font=fs, fill=(251, 241, 220, 255))
    else:
        for i, c in enumerate(A.seal[:2]):
            w = d.textlength(c, font=fs); d.text((sx + (seal - w) / 2, sy + 4 + i * 70), c, font=fs, fill=(251, 241, 220, 255))
    tx = sx + seal + gap; ty = y0 + (sh - th) // 2 - int(size * 0.12)
    for i, l in enumerate(lines):
        dsp(tx, ty + i * lh, l, ft, 8, (178, 22, 30, 255) if i == len(lines) - 1 and len(lines) > 1 else (40, 32, 26, 255))
    if sub:
        dsp(tx + 2, ty + lh * len(lines) + 8, sub, fsub, 6, (107, 18, 22, 255))
img = img.convert('RGB'); arr = np.asarray(img).astype(np.float32); yy, xx = np.mgrid[0:H, 0:W]
v = np.clip(1 - 0.25 * (((xx - W / 2) / (W * .6)) ** 2 + ((yy - H / 2) / (H * .6)) ** 2), 0, 1)[..., None]
arr = arr * (0.8 + 0.2 * v) + np.random.default_rng(1).normal(0, 2.5, arr.shape[:2] + (1,))
Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(A.out, quality=93); print('ok', A.out)
