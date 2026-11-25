"""Dựng phần chính (cảnh giấy cắt) bằng Python, theo STYLE_GUIDE:
- camera gần như đứng yên (zoom 1,05 -> 1,10), cảnh dài chia khung cận;
- chuyển cảnh: mờ nhẹ 0,8 s (cross), xé giấy 1,7 s (tear), tối dần/sáng dần (fade);
- chữ: dải giấy nhỏ có con dấu đỏ, gạch chân bằng nét cọ đỏ dưới từ khóa, đặt ở góc trống;
- cánh hoa rơi nhẹ, hạt giấy, viền tối.
Dùng: python3 paper_scenes.py <shots.json> <out.mp4> [still_giây ...]
shots.json: {"fonts": {...}, "seal": "儒", "dur": giây, "shots": [
  {"img": "A1.png" | "clip": "c.mp4", "s": 0, "e": 8, "z": [1.05, 1.10], "f": [0.5, 0.5], "f1": [..],
   "tr": "cross|tear|fade|none", "labels": [{"t0": 1, "t1": 4, "parts": [["551 TCN · ", 0], ["NƯỚC LỖ", 1]], "pos": "tl|tr|bl|br"}]}]}
"""
import json, sys, subprocess, math
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont

cfg = json.load(open(sys.argv[1])); OUT = sys.argv[2]; STILLS = [float(a) for a in sys.argv[3:]]
W, H, FPS = 1280, 720, 24
SH = cfg['shots']; DUR = cfg['dur']
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
rng = np.random.default_rng(5)
vig = np.clip(1 - 0.30 * (((xx - W / 2) / (W * .62)) ** 2 + ((yy - H / 2) / (H * .62)) ** 2), 0, 1)[..., None]
grain = [rng.normal(0, 1, (H, W, 1)).astype(np.float32) for _ in range(6)]
def sm(x): x = min(1., max(0., x)); return x * x * (3 - 2 * x)

# ---------- nguồn hình ----------
cache = {}
def load_img(p):
    if p not in cache:
        im = cv2.cvtColor(cv2.imread(p), cv2.COLOR_BGR2RGB).astype(np.float32) / 255
        h, w = im.shape[:2]; ch = int(w * 9 / 16); y0 = (h - ch) // 2
        cache[p] = cv2.resize(im[y0:y0 + ch], (W * 2, H * 2), interpolation=cv2.INTER_AREA)   # 2x để zoom cận vẫn nét
    return cache[p]
def load_clip(p):
    """khung clip, cắt về 16:9, ở 2x như ảnh để zoom cận vẫn nét"""
    if p not in cache:
        # clip giữ ở 1x để đỡ tốn bộ nhớ (2x làm tràn RAM khi chạy nhiều phần song song)
        r = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-vf', f'scale={W}:-2,crop={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                           capture_output=True, check=True)
        n = len(r.stdout) // (W * H * 3); cache[p] = np.frombuffer(r.stdout, np.uint8)[:n * W * H * 3].reshape(n, H, W, 3)
        cache[p + '#fps'] = float(eval(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=r_frame_rate',
                                                       '-of', 'csv=p=0', p], capture_output=True, text=True).stdout.strip()))
    return cache[p], cache[p + '#fps']

# các kiểu máy quay chậm, luân phiên theo từng khung: đẩy vào, lia phải, lùi ra, lia trái (zoom tối đa 1,12)
MOVES = [([1.02, 1.10], [.5, .5], [.5, .48]), ([1.08, 1.10], [.44, .5], [.56, .5]),
         ([1.11, 1.03], [.5, .47], [.5, .5]), ([1.08, 1.10], [.56, .5], [.44, .5])]
for _i, _sh in enumerate(SH): _sh['_i'] = _i

def base_frame(sh, lt):
    if 'clip' in sh:
        fr, fps = load_clip(sh['clip']); n = len(fr)
        # quay chậm (mặc định 0,6), trộn 2 khung kề nhau cho mượt; hết clip thì giữ khung cuối
        pos = (sh.get('clip_t0', 0) + lt * sh.get('speed', cfg.get('speed', 0.6))) * fps
        q = min(int(pos), n - 1); r = min(pos - q, 1.0) if q < n - 1 else 0.0
        a = fr[q].astype(np.float32); bb = fr[min(q + 1, n - 1)].astype(np.float32)
        return (a * (1 - r) + bb * r) / 255
    return load_img(sh['img'])

def render_shot(sh, lt):
    d = sh['e'] - sh['s']; k = sm(lt / max(d, 1e-3))
    src = base_frame(sh, lt)
    mv = MOVES[sh.get('_i', 0) % len(MOVES)]
    z0, z1 = sh.get('z', mv[0]); z = z0 + (z1 - z0) * k
    f0 = sh.get('f', mv[1]); f1 = sh.get('f1', mv[2] if 'f' not in sh else f0); fx = f0[0] + (f1[0] - f0[0]) * k; fy = f0[1] + (f1[1] - f0[1]) * k
    hw, hh = 0.5 / z, 0.5 / z; fx = min(max(fx, hw), 1 - hw); fy = min(max(fy, hh), 1 - hh)
    sh_, sw_ = src.shape[:2]
    x0 = (fx - hw) * sw_; y0 = (fy - hh) * sh_; s_ = (sw_ / z) / W
    M = np.float32([[s_, 0, x0], [0, s_, y0]])
    out = cv2.warpAffine(src, M, (W, H), flags=cv2.INTER_LINEAR | cv2.WARP_INVERSE_MAP, borderMode=cv2.BORDER_REFLECT)
    dp = load_depth(sh)
    if dp is not None:   # 2.5D: lớp gần trôi nhiều hơn lớp xa (thị sai), không tốn credit
        d = cv2.warpAffine(dp, M, (W, H), flags=cv2.INTER_LINEAR | cv2.WARP_INVERSE_MAP, borderMode=cv2.BORDER_REFLECT)
        amp = sh.get('par', 14) * (k - .5) * 2
        out = cv2.remap(out, xx - amp * (d - .35), yy - amp * .25 * (d - .35), cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    return out

def load_depth(sh):
    if 'img' not in sh or sh.get('par', 1) == 0: return None
    p = sh['img'].replace('.png', '_d.png').replace('.jpg', '_d.png')
    if p not in cache:
        try:
            d = cv2.imread(p, cv2.IMREAD_GRAYSCALE).astype(np.float32) / 255; h, w = d.shape; ch = int(w * 9 / 16); y0 = (h - ch) // 2
            cache[p] = cv2.GaussianBlur(cv2.resize(d[y0:y0 + ch], (W * 2, H * 2)), (0, 0), 3)
        except Exception: cache[p] = None
    return cache[p]

# ---------- chữ: dải giấy + con dấu ----------
F = cfg['fonts']
def label_img(parts, size=26):
    f = ImageFont.truetype(F['cap'], size); fs = ImageFont.truetype(F['seal'], int(size * 1.15))
    txt = ''.join(p for p, _ in parts); sp = size * .16
    tw = sum(f.getlength(c) + sp for c in txt); seal = int(size * 1.5); pad = int(size * .55)
    w = int(seal + pad * 3 + tw); h = int(seal + pad * 1.2)
    im = Image.new('RGBA', (w + 8, h + 8), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rectangle((4, 4, w + 4, h + 4), fill=(60, 40, 25, 70))                     # bóng mờ
    d.rectangle((0, 0, w, h), fill=(246, 238, 220, 245), outline=(120, 90, 60, 255), width=2)
    sx, sy = pad, (h - seal) // 2; d.rectangle((sx, sy, sx + seal, sy + seal), fill=(178, 22, 30, 255))
    cw = d.textlength(cfg['seal'], font=fs); d.text((sx + (seal - cw) / 2, sy + seal * .02), cfg['seal'], font=fs, fill=(251, 241, 220, 255))
    x = sx + seal + pad; y = (h - size * 1.25) / 2
    for p, hl in parts:
        x0 = x
        for c in p: d.text((x, y), c, font=f, fill=(43, 38, 34, 255)); x += f.getlength(c) + sp
        if hl:
            for kk in range(6): d.line((x0, y + size * 1.32 + kk * .7, x - sp - kk * 3, y + size * 1.3 + kk), fill=(176, 22, 30, 220), width=2)
    return np.asarray(im, np.float32) / 255
labels = []
for i, sh in enumerate(SH):
    for lb in sh.get('labels', []):
        a = label_img(lb['parts'], lb.get('size', 26)); h, w = a.shape[:2]; pos = lb.get('pos', 'tl'); m = 36
        x = m if 'l' in pos else W - w - m; y = m if 't' in pos else H - h - m
        if pos == 'c': x = (W - w) // 2; y = (H - h) // 2
        if pos == 'tc': x = (W - w) // 2; y = m
        labels.append(dict(a=a, x=x, y=y, t0=sh['s'] + lb['t0'], t1=sh['s'] + lb['t1']))

# ---------- chuyển cảnh ----------
def tear_mask(p, seed=3):
    """mép xé đi từ phải sang trái; 1 = còn cảnh cũ"""
    r = np.random.default_rng(seed); edge = np.cumsum(r.normal(0, 3, H)); edge = cv2.GaussianBlur(edge[None], (0, 0), 6)[0] * 2
    pos = (1 - p) * (W + 160) - 80 + edge
    m = (xx < pos[:, None]).astype(np.float32)
    fib = np.clip(1 - np.abs(xx - pos[:, None]) / 7, 0, 1) * (r.random((H, 1)) * .5 + .5)   # mép xơ giấy trắng
    shadow = np.clip(1 - (xx - pos[:, None]) / 28, 0, 1) * (xx > pos[:, None])
    return m, fib, shadow
TR = {'cross': .4, 'tear': .85, 'fade': .9}
def idx_at(t):
    for i in range(len(SH) - 1, -1, -1):
        if t >= SH[i]['s']: return i
    return 0
def petals(img, t):
    if not cfg.get('petals', 1): return img
    ov = img
    for i in range(14):
        r = np.random.default_rng(i); sp = .4 + r.random() * .8; per = (H + 60) / (18 * sp); tt = (t + r.random() * per) % per
        y = -30 + tt * 18 * sp; x = (r.random() * W + math.sin(tt * 1.1 + i) * 30 + tt * 6) % W; s = 3 + r.random() * 3
        cv2.ellipse(ov, (int(x), int(y)), (int(s), int(s * .65)), (tt * 40 + i * 30) % 180, 0, 360, (0.96, 0.86, 0.84), -1, cv2.LINE_AA)
    return ov
def motes(img, t):
    """bụi sáng ấm lơ lửng, trôi lên rất chậm"""
    for j in range(22):
        r = np.random.default_rng(100 + j); x = (r.random() * W + math.sin(t * .3 + j) * 25) % W
        y = (r.random() * H - t * (6 + r.random() * 8)) % H; rad = 1.5 + r.random() * 2.5
        a = .25 + .2 * math.sin(t * 1.3 + j)
        cv2.circle(img, (int(x), int(y)), int(rad + 2), tuple(float(v) for v in img[int(y) % H, int(x) % W] * (1 - a * .5) + np.float32([1, .93, .75]) * a * .5), -1, cv2.LINE_AA)
    return img
def sweep(img, lt, d):
    """một vệt nắng chéo quét qua cảnh một lần"""
    p = lt / max(d, 1e-3); cx = -0.3 + p * 1.6
    band = np.exp(-(((xx / W - cx) + (yy / H) * .35) ** 2) / .012)[..., None]
    return img * (1 + .10 * band) + np.float32([1, .9, .7]) * .05 * band
def fire(img, t):
    """ánh lửa nhấp nháy + tàn lửa bay lên"""
    img = img * (1 + .06 * math.sin(t * 11) + .04 * math.sin(t * 27))
    for j in range(40):
        r = np.random.default_rng(300 + j); per = 2 + r.random() * 2; tt = (t + r.random() * per) % per
        x = W * (.35 + r.random() * .3) + math.sin(tt * 3 + j) * 20; y = H * (.75 - tt / per * .7)
        a = 1 - tt / per; cv2.circle(img, (int(x), int(y)), 2, (1.0, .55 + .3 * a, .15), -1, cv2.LINE_AA)
    return img
def smoke(img, t, at):
    """làn khói hương mảnh, uốn lượn"""
    ov = np.zeros((H, W), np.float32)
    for j in range(3):
        pts = [(int(at[0] * W + math.sin(t * .8 + y * .03 + j) * (6 + y * .25)), int(at[1] * H - y)) for y in range(0, 220, 6)]
        cv2.polylines(ov, [np.array(pts, np.int32)], False, .5, 3, cv2.LINE_AA)
    ov = cv2.GaussianBlur(ov, (0, 0), 4)[..., None]
    return img * (1 - ov * .5) + np.float32([.96, .95, .92]) * ov * .5
INKC = {}
def ink_char(img, spec, lt):
    """chữ Hán đỏ lớn hiện dần như mực loang ở góc trống"""
    key = (spec['text'], spec.get('size', 220))
    if key not in INKC:
        f = ImageFont.truetype(F[spec.get('font', 'brush')], spec.get('size', 220)); w = int(sum(f.getlength(c) for c in spec['text'])) + 40
        im = Image.new('L', (w, int(spec.get('size', 220) * 1.4)), 0); ImageDraw.Draw(im).text((20, 0), spec['text'], font=f, fill=255)
        m = np.asarray(im, np.float32) / 255; ys, xs = np.where(m > .05); m = m[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
        hh, ww = m.shape; gy, gx = np.mgrid[0:hh, 0:ww]; dist = np.hypot(gx - ww / 2, gy - hh / 2); dist /= dist.max()
        fld = .55 * dist + .45 * cv2.resize(np.random.default_rng(7).random((hh // 9 + 2, ww // 9 + 2)).astype(np.float32), (ww, hh), interpolation=cv2.INTER_CUBIC)
        INKC[key] = (m, fld)
    m, fld = INKC[key]; hh, ww = m.shape
    p = (lt - spec.get('t0', .6)) / spec.get('reveal', 1.8)
    if p <= 0: return img
    vis = np.clip((p * 1.25 - fld) / .12, 0, 1) * m * spec.get('alpha', .85)
    x0 = int(spec['x'] * W - ww / 2); y0 = int(spec['y'] * H - hh / 2)
    sub = img[y0:y0 + hh, x0:x0 + ww]; vis = vis[:sub.shape[0], :sub.shape[1], None]
    img[y0:y0 + hh, x0:x0 + ww] = sub * (1 - vis) + np.float32(spec.get('color', [.66, .09, .11])) * vis
    return img
def frame(t):
    i = idx_at(t); sh = SH[i]; img = None
    nxt = SH[i + 1] if i + 1 < len(SH) else None
    # cảnh kế bắt đầu chuyển trước mốc của nó hw giây; cảnh hiện tại kết thúc chuyển sau mốc hw giây
    for k, tr_owner in [(i + 1, nxt), (i, sh)]:
        if tr_owner is None or k == 0: continue
        tr = tr_owner.get('tr', 'cross'); hw = TR.get(tr, 0)
        if hw and abs(t - SH[k]['s']) < hw:
            p = (t - (SH[k]['s'] - hw)) / (2 * hw)
            A = render_shot(SH[k - 1], t - SH[k - 1]['s']); B = render_shot(SH[k], max(0, t - SH[k]['s']))
            if tr == 'cross': img = A * (1 - sm(p)) + B * sm(p)
            elif tr == 'fade': img = A * (1 - sm(p * 2)) if p < .5 else B * sm(p * 2 - 1)
            else:
                m, fib, shd = tear_mask(sm(p)); img = B * (1 - .35 * shd[..., None]) * (1 - m[..., None]) + A * m[..., None]
                img = img * (1 - fib[..., None]) + np.float32([.97, .95, .9]) * fib[..., None]
            break
    if img is None: img = render_shot(sh, t - sh['s'])
    img = np.ascontiguousarray(img, np.float32)
    img = petals(img, t)
    img = motes(img, t)
    lt_ = t - sh['s']
    for fx in sh.get('fx', []):
        if fx == 'fire': img = fire(img, t)
        elif fx == 'smoke': img = smoke(img, t, sh.get('smoke_at', [.75, .55]))
        elif fx == 'flicker': img = img * (1 + .04 * math.sin(t * 9) + .03 * math.sin(t * 23))
    if 'ink' in sh: img = ink_char(img, sh['ink'], lt_)
    if sh.get('sweep', (i % 3 == 1)): img = sweep(img, t - sh['s'], sh['e'] - sh['s'])
    for lb in labels:
        if lb['t0'] <= t <= lb['t1'] + .25:
            a = lb['a']; h, w = a.shape[:2]; al = a[..., 3:] * sm((t - lb['t0']) / .3) * sm((lb['t1'] + .25 - t) / .25)
            sub = img[lb['y']:lb['y'] + h, lb['x']:lb['x'] + w]; img[lb['y']:lb['y'] + h, lb['x']:lb['x'] + w] = sub * (1 - al) + a[..., :3] * al
    img = img * (0.78 + 0.22 * vig) + grain[int(t * FPS) % 6] * .015
    img = img * sm(t / cfg.get('fade_in', .8)) * sm((DUR - t) / cfg.get('fade_out', 1.5))
    return (np.clip(img, 0, 1) * 255).astype(np.uint8)

if STILLS:
    for s in STILLS: cv2.imwrite(f'{OUT}_{s}.jpg', cv2.cvtColor(frame(s), cv2.COLOR_RGB2BGR))
    sys.exit()
ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                       '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', OUT], stdin=subprocess.PIPE)
N = int(DUR * FPS)
for f in range(N):
    ff.stdin.write(frame(f / FPS).tobytes())
    if f % 240 == 0: print('frame', f, '/', N, flush=True)
ff.stdin.close(); ff.wait(); print('done', OUT)
