"""Mở đầu thủy mặc 2.5D (bản Python, thay cho g3.html của tập 1).

Dùng: python3 ink_open.py <config.json> <lang> <out.mp4> [still_giây ...]
config: ảnh nền, bản đồ độ sâu, font, mốc giọng đọc (T_<lang>.json), mặt trời, chữ mực loang, chữ phụ.
- Camera gần như đứng yên: zoom 1.05 -> 1.10, trôi rất chậm, thị sai nhẹ theo độ sâu.
- Mặt trời bị núi che theo đúng đường sống núi (mặt nạ trời lấy từ bản đồ độ sâu).
- Chữ bản địa màu đỏ hiện như mực loang; chữ phụ giãn chữ, hiện mờ dần.
"""
import json, sys, subprocess, math
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont

cfg = json.load(open(sys.argv[1])); LANG = sys.argv[2]; OUT = sys.argv[3]
STILLS = [float(a) for a in sys.argv[4:]]
W, H, FPS = 1280, 720, 24
TJ = json.load(open(cfg['timing'].format(lang=LANG)))
T, CH = TJ['T'], TJ['chars']
OFF = cfg['music_lead']                     # giây chỉ có nhạc trước lời đầu tiên
def G(sid): return OFF + T[sid]
def W_(sid, word):                          # mốc bắt đầu một cụm từ trong đoạn sid
    if isinstance(CH, dict):
        s = ''.join(c for c, _ in CH[sid]); i = s.index(word); return OFF + CH[sid][i][1]
    s = ''.join(c for c, _ in CH); i = s.index(word)            # bản thu một lần (tts_flow): danh sách phẳng
    while CH[i][1] < T[sid] - 0.05: i = s.index(word, i + 1)
    return OFF + CH[i][1]
def ev(x):                                  # biểu thức mốc: số, "op2", "op2+0.3", "op5@Nho giáo", "end+4"
    if isinstance(x, dict): x = x[LANG]
    if isinstance(x, (int, float)): return float(x)
    add = 0.0
    for sep in ['+', '-']:
        if sep in x[1:]:
            a, b = x.rsplit(sep, 1); add = float(b) * (1 if sep == '+' else -1); x = a; break
    if '@' in x:
        sid, word = x.split('@'); return W_(sid, word) + add
    if x == 'end': return OFF + T['end'] + add
    return G(x) + add
DUR = ev(cfg['end'])

# ---------- nền và độ sâu ----------
bg = cv2.cvtColor(cv2.imread(cfg['bg']), cv2.COLOR_BGR2RGB).astype(np.float32) / 255
dp = cv2.imread(cfg['depth'], cv2.IMREAD_GRAYSCALE).astype(np.float32) / 255
ih, iw = bg.shape[:2]; ch = int(iw * 9 / 16); y0 = int((ih - ch) * cfg.get('crop_y', 0.5))
bg = cv2.resize(bg[y0:y0 + ch], (W, H), interpolation=cv2.INTER_AREA)
dp = cv2.resize(dp[y0:y0 + ch], (W, H), interpolation=cv2.INTER_AREA)
dp = cv2.GaussianBlur(dp, (0, 0), 2)
# 1 = trời: chỉ phần nằm TRÊN đường chân trời của từng cột (sương ở thung lũng vẫn che mặt trời)
solid = dp > cfg.get('sky_thr', 0.07)
first = np.where(solid.any(0), solid.argmax(0), H).astype(np.float32)
first = cv2.GaussianBlur(first[None], (0, 0), 1.5)[0]
sky = np.clip((first[None, :] - np.arange(H, dtype=np.float32)[:, None]) / 2.0, 0, 1)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)

rng = np.random.default_rng(7)
def noise(sc, seed):
    r = np.random.default_rng(seed).random((H // sc + 2, W // sc + 2)).astype(np.float32)
    return cv2.resize(r, (W, H), interpolation=cv2.INTER_CUBIC)
mist = np.clip(cv2.GaussianBlur(noise(40, 3) * .6 + noise(14, 4) * .4, (0, 0), 18), 0, 1)
mist = np.tile(mist, (1, 2))                  # để trôi ngang
grain = [rng.normal(0, 1, (H, W)).astype(np.float32) for _ in range(6)]
vig = np.clip(1 - 0.38 * (((xx - W / 2) / (W * .62)) ** 2 + ((yy - H / 2) / (H * .62)) ** 2), 0, 1)[..., None]
paper = 0.97 + 0.03 * noise(3, 11)[..., None]

# ---------- chữ ----------
def text_mask(text, font, size, spacing=0):
    f = ImageFont.truetype(font, size)
    widths = [f.getlength(c) for c in text]; tw = int(sum(widths) + spacing * (len(text) - 1)) + 40
    im = Image.new('L', (tw, int(size * 1.6)), 0); d = ImageDraw.Draw(im); x = 20
    for c, w in zip(text, widths):
        d.text((x, int(size * .15)), c, font=f, fill=255); x += w + spacing
    a = np.asarray(im, np.float32) / 255
    ys, xs = np.where(a > 0.02)
    return a[max(0, ys.min() - 8):ys.max() + 8, max(0, xs.min() - 8):xs.max() + 8]
def place(mask, x, y, align):
    h, w = mask.shape; full = np.zeros((H, W), np.float32)
    x0 = int(x - (w / 2 if align == 'center' else 0)); y0 = int(y - h / 2)
    xa, ya = max(0, x0), max(0, y0); xb, yb = min(W, x0 + w), min(H, y0 + h)
    full[ya:yb, xa:xb] = mask[ya - y0:yb - y0, xa - x0:xb - x0]; return full
def hexrgb(h): h = h.lstrip('#'); return np.array([int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)], np.float32)

items = []
for it in cfg['ink'] + cfg['captions']:
    if LANG not in it.get('langs', [LANG]): continue
    txt = it['text'][LANG] if isinstance(it['text'], dict) else it['text']
    m = place(text_mask(txt, cfg['fonts'][it['font'] if it['font'] != 'cap' else 'cap_' + LANG],
                        it['size'], it.get('spacing', 0)), it['x'], it['y'], it.get('align', 'left'))
    it = dict(it, m=m, t0=ev(it['t0']), t1=ev(it['t1']) if 't1' in it else DUR + 1, col=hexrgb(it['color']))
    if it.get('reveal'):                      # mực loang: ngưỡng tăng dần trên nền nhiễu + khoảng cách
        ys, xs = np.where(m > .05); cy, cx = ys.mean(), xs.mean()
        dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2); dist /= dist[m > .05].max()
        it['field'] = 0.55 * dist + 0.45 * noise(9, len(items) + 20)
        it['bleed'] = cv2.GaussianBlur(m, (0, 0), 3)
    items.append(it)
def sm(x): x = min(1, max(0, x)); return x * x * (3 - 2 * x)

S = cfg.get('sun')
DR = cfg.get('dragon')
if DR:   # rồng mực đỏ vẽ trên nền trắng -> hòa trộn kiểu nhân (multiply), giấy trắng không đổi màu
    d_ = cv2.cvtColor(cv2.imread(DR['img']), cv2.COLOR_BGR2RGB).astype(np.float32) / 255
    nz = np.where(d_.min(2) < 0.92); d_ = d_[nz[0].min():nz[0].max() + 1, nz[1].min():nz[1].max() + 1]
    dw = int(DR['width']); dh = int(d_.shape[0] * dw / d_.shape[1])
    DIMG = cv2.resize(d_, (dw, dh), interpolation=cv2.INTER_AREA)
    if DR.get('flip'): DIMG = DIMG[:, ::-1].copy()
SUNC = hexrgb(S['color']) if S else None
def frame(t):
    k = sm(t / DUR)
    z = 1.05 + 0.05 * k
    cx = W / 2 + cfg.get('drift', 18) * (k - .5); cy = H / 2
    par = cfg.get('parallax', 7) * (k - .5)
    mx = cx + (xx - W / 2) / z + par * (dp - .3)
    my = cy + (yy - H / 2) / z
    img = cv2.remap(bg, mx, my, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    skm = cv2.remap(sky, mx, my, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    # sương trôi ở vùng giữa
    off = int(t * 6) % W; ms = mist[:, off:off + W]
    band = np.clip(1 - np.abs(yy / H - .62) / .25, 0, 1)
    img = img * (1 - .22 * (ms * band)[..., None]) + np.array([.95, .93, .88], np.float32) * (.22 * ms * band)[..., None]
    # mặt trời
    if S:
        a = 0.0
        for (ta, tb, ya_, yb_) in S['path']:
            ta, tb = ev(ta), ev(tb)
            if ta <= t <= tb: sy = ya_ + (yb_ - ya_) * sm((t - ta) / (tb - ta)); a = 1; break
            if t > tb: sy = yb_; a = 1
        if a:
            sx = S['x'] * W; r = S['r'] * H; syp = sy * H
            # vị trí mặt trời trên ảnh nền -> theo camera
            px = (sx - cx) * z + W / 2; py = (syp - cy) * z + H / 2
            d = np.sqrt((xx - px) ** 2 + (yy - py) ** 2)
            disc = np.clip((r * z - d) / 1.5, 0, 1) * skm
            img = img * (1 - disc[..., None]) + (SUNC * (0.96 + .04 * noise(2, 5)[..., None]) * disc[..., None])
    # rồng: bay theo đường đi, thân uốn sóng, bị núi che theo đường chân trời
    if DR:
        P = [(ev(a), x_, y_) for a, x_, y_ in DR['path']]
        if P[0][0] <= t <= P[-1][0]:
            for (ta, xa, ya), (tb, xb, yb) in zip(P, P[1:]):
                if ta <= t <= tb:
                    q = (t - ta) / (tb - ta); q = q if DR.get('linear', 1) else sm(q)
                    wx = (xa + (xb - xa) * q) * W; wy = (ya + (yb - ya) * q) * H; break
            fa = sm((t - ev(DR['fade_in'][0])) / (ev(DR['fade_in'][1]) - ev(DR['fade_in'][0])))
            fb = 1 - sm((t - ev(DR['fade_out'][0])) / (ev(DR['fade_out'][1]) - ev(DR['fade_out'][0])))
            px = (wx - cx) * z + W / 2; py = (wy - cy) * z + H / 2
            dh, dw = DIMG.shape[:2]; sz = z
            A, lam, om = DR['wave']
            x0 = int(max(0, px - dw * sz / 2 - 40)); x1 = int(min(W, px + dw * sz / 2 + 40))
            y0 = int(max(0, py - dh * sz / 2 - A * 2 - 10)); y1 = int(min(H, py + dh * sz / 2 + A * 2 + 10))
            if x1 > x0 and y1 > y0:
                gx, gy = np.meshgrid(np.arange(x0, x1, dtype=np.float32), np.arange(y0, y1, dtype=np.float32))
                u = (gx - px) / sz + dw / 2
                # sóng truyền từ đầu (trái) về đuôi (phải); đầu ít lắc hơn đuôi
                amp = A * (0.35 + 0.65 * np.clip(u / dw, 0, 1))
                v = (gy - py) / sz + dh / 2 - amp * np.sin(2 * np.pi * u / lam - om * t)
                patch = cv2.remap(DIMG, u, v, cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(1, 1, 1))
                m = (fa * fb * DR.get('opacity', 0.95)) * skm[y0:y1, x0:x1]
                sub = img[y0:y1, x0:x1]
                img[y0:y1, x0:x1] = sub * (1 - m[..., None] * (1 - patch))
    # chữ
    for it in items:
        lt = t - it['t0']
        if lt < 0 or t > it['t1'] + 1.0: continue
        out = 1 - sm((t - it['t1']) / 0.9)
        if it.get('reveal'):
            p = lt / it['reveal']; th = p * 1.25
            vis = np.clip((th - it['field']) / 0.12, 0, 1)
            m = np.maximum(it['m'], it['bleed'] * .55 * min(1, p)) * vis
        else:
            m = it['m'] * sm(lt / it.get('fadein', 1.0))
        m = (m * out * it.get('alpha', 1))[..., None]
        img = img * (1 - m) + it['col'] * (0.9 + .1 * paper) * m
    img = img * paper * (0.55 + 0.45 * vig)
    img = img + grain[int(t * FPS) % 6][..., None] * 0.018
    fi = sm(t / cfg.get('fade_in', 1.2)); fo = sm((DUR - t) / cfg.get('fade_out', 1.5))
    img = img * fi * fo
    return (np.clip(img, 0, 1) * 255).astype(np.uint8)

if STILLS:
    for s in STILLS:
        cv2.imwrite(f'{OUT}_{s}.jpg', cv2.cvtColor(frame(s), cv2.COLOR_RGB2BGR))
    sys.exit()
ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}',
                       '-r', str(FPS), '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', OUT],
                      stdin=subprocess.PIPE)
N = int(DUR * FPS)
for f in range(N):
    ff.stdin.write(frame(f / FPS).tobytes())
    if f % 240 == 0: print(LANG, f, '/', N, flush=True)
ff.stdin.close(); ff.wait()
json.dump({'DUR': DUR, 'OFF': OFF, 'marks': {it['text'][LANG] if isinstance(it['text'], dict) else it['text']: it['t0'] for it in items}},
          open(OUT + '.json', 'w'), ensure_ascii=False)
print('done', OUT, DUR)
