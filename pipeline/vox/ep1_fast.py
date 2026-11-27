"""Video 1 – thử nhịp nhanh ~30 giây đầu (phong cách hình tràn khung, cắt cảnh 2–4 giây).

python3 pipeline/vox/ep1_fast.py <voice_edit.wav> <words_edit.json> <thư_mục_ảnh_hd> <sfx_dir> <out.mp4>
"""
import json, os, subprocess, sys
from multiprocessing import Pool

sys.path.insert(0, os.path.dirname(__file__))
from vox import W, H, FPS, INK, GOLD, MUSTARD, TEAL, NAVY, envelope
from engine import E, mix_audio, RED, GREEN
import ep1_video as ev
from fast import Fast

G = {}

PEOPLE = os.environ.get("PEOPLE_DIR", "")

def shots():
    A = ev.A
    L = lambda kind, t, **kw: dict(kind=kind, t=t, **kw)
    return [
        {"t": 0.0, "bg": ("desk",), "zoom": (1.0, 1.06), "tag": "MORA AI // XIN CHÀO", "els": [
            E("write", A(1, None, 0.05), text="Xin chào!", x=960, y=170, size=100, color=RED, anchor="middle", dur=0.6),
            E("label", A(1, "Trang"), text="TRANG", x=960, y=450, size=200, rot=-2),
            L("d_limbs", A(1, "Trang", 0.3), x=596, y=300, w=728, h=300, act="wave", face=False),
            E("label", A(1, "founder"), text="FOUNDER · MORA AI", x=960, y=880, size=74, bg=MUSTARD, rot=2)]},
        {"t": A(2, None, -0.1), "bg": ("photo", "stock"), "zoom": (1.04, 1.16), "pan": (-80, 0), "tag": "NGÀNH // TÀI CHÍNH", "els": [
            L("d_circle", A(2, "tài chính", 0.1), x=1380, y=360, rx=330, ry=220),
            L("d_arrow", A(2, "tài chính", 0.4), p0=(620, 620), p1=(1060, 420), bend=50),
            E("key", A(2, "tài chính"), text="LÀM VIỆC TRONG NGÀNH TÀI CHÍNH", size=74)]},
        {"t": A(2, "tốt nghiệp", -0.1), "bg": ("photo", "duomo"), "zoom": (1.0, 1.12), "pan": (0, -40), "tag": "MBA // MILANO, Ý", "els": [
            E("key", A(2, "thạc sĩ"), text="THẠC SĨ QUẢN TRỊ KINH DOANH", size=74),
            E("label", A(2, "MBA"), text="MBA · Ý", x=1560, y=210, size=110, bg=GOLD, rot=4),
            L("d_arrow", A(2, "MBA", 0.2), p0=(1100, 420), p1=(1400, 260), bend=-40)]},
        {"t": A(4, None, -0.1), "bg": ("photo", "chatbot"), "zoom": (1.0, 1.14), "pan": (60, 0), "tag": "KÊNH // CHIA SẺ", "els": [
            L("d_burst", A(4, "chia sẻ", 0.2), x=960, y=420, n=7),
            E("key", A(4, "chia sẻ"), text="CHIA SẺ KIẾN THỨC TÀI CHÍNH", size=74)]},
        {"t": A(7, None, -0.1), "bg": ("desk",), "zoom": (1.0, 1.05), "punch": [A(8, "kiếm tiền")], "tag": "HÔM NAY // CLAUDE", "els": [
            E("write", A(7, None, 0.1), text="Hôm nay:", x=960, y=150, size=86, color=TEAL, anchor="middle", dur=0.5),
            E("label", A(8, "Claude"), text="CLAUDE", x=960, y=420, size=220, bg=MUSTARD, rot=-2),
            L("d_limbs", A(8, "Claude", 0.3), x=490, y=250, w=940, h=340, act="walk", face=False, arm=110),
            E("big", A(8, "kiếm tiền"), text="kiếm tiền thế nào?", x=960, y=930, size=110, color=RED)]},
        {"t": A(8, "cỗ máy", -0.1), "bg": ("photo", "datacenter"), "zoom": (1.0, 1.22), "tag": "AI // DATA CENTER", "els": [
            L("d_arrow", A(9, "nghìn", -0.3), p0=(420, 260), p1=(860, 500), bend=40),
            E("key", A(9, "nghìn"), text="CỖ MÁY AI NGHÌN TỶ ĐÔ", size=90)]},
        {"t": A(9, "lời", -0.25), "bg": ("desk",), "zoom": (1.02, 1.08), "tag": "LỜI // HAY // LỖ", "els": [
            E("stamp", A(9, "lời"), text="LỜI", x=640, y=560, color=GREEN, size=190, rot=-8),
            L("d_limbs", A(9, "lời", 0.2), x=420, y=400, w=440, h=230, act="jump", mood="happy", fy=300),
            E("stamp", A(9, "lỗ"), text="LỖ?", x=1290, y=560, color=RED, size=190, rot=6),
            L("d_limbs", A(9, "lỗ", 0.2), x=1060, y=400, w=460, h=230, act="stand", mood="sad", fy=300)]},
        {"t": A(11, None, -0.1), "bg": ("photo", "stockexchange"), "zoom": (1.0, 1.12), "dim": 0.25, "tag": "IPO // NASDAQ", "els": [
            E("headline", A(11, "lên sàn"), outlet="NBC News", band="#1d3b6e", w=1650, x=960, y=520, size=60,
              title="Anthropic sets modest $1 trillion IPO valuation target in a test of Wall Street's AI fervor"),
            L("d_arrow", A(11, "IPO"), p0=(1780, 960), p1=(1500, 700), bend=40)]},
        {"t": A(11, "con số", -0.1), "bg": ("desk",), "zoom": (1.0, 1.06), "tag": "ĐỊNH GIÁ // IPO", "els": [
            E("big", A(11, "1500"), count=(0, 1500), suf=" TỶ $", x=960, y=560, size=240, color=GREEN, cdur=1.0),
            L("d_limbs", A(11, "1500", 1.0), x=280, y=400, w=1360, h=210, act="cheer", mood="wow", fy=250),
            E("key", A(11, "1500", 0.6), text="ĐỊNH GIÁ KHI LÊN SÀN", size=80)]},
        # --- Sơ đồ 1: so với GDP Việt Nam
        {"t": A(12, None, -0.1), "bg": ("desk",), "zoom": (1.0, 1.05), "tag": "SO SÁNH // GDP", "els": [
            L("d_box", A(12, "1500"), x=380, y=200, w=520, h=640, text="ANTHROPIC\n1.500 tỷ $", fill="#d8f3e3", c=GREEN, size=62),
            L("d_box", A(13, "nền kinh tế"), x=1060, y=640, w=520, h=200, text="GDP VIỆT NAM\n~500 tỷ $ / năm", fill="#e3f1fb", c=TEAL, size=52),
            L("d_arrow", A(13, "mấy lần"), p0=(1320, 620), p1=(960, 330), bend=-50),
            E("big", A(13, "mấy lần", 0.3), text="×3", x=1330, y=420, size=200, color=RED),
            L("d_limbs", A(13, "mấy lần", 0.5), x=1060, y=640, w=520, h=200, act="stand", mood="wow", fy=575, arm=80)]},
        {"t": A(14, None, -0.1), "bg": ("photo", "dollars"), "zoom": (1.0, 1.15), "tag": "CON SỐ // KHỔNG LỒ", "els": [
            L("d_burst", A(14, "khổng lồ", 0.2), x=960, y=420, n=9),
            E("key", A(14, "khổng lồ"), text="CON SỐ KHỔNG LỒ", size=96)]},
        {"t": A(15, None, -0.1), "bg": ("photo", "meeting"), "zoom": (1.0, 1.1), "tag": "KỶ LỤC // NGÀNH AI", "els": [
            E("key", A(15, "lớn nhất"), text="LỚN NHẤT LỊCH SỬ NGÀNH AI?", size=84),
            L("d_under", A(15, "lịch sử"), x0=560, x1=1360, y=960)]},
        # --- Sơ đồ 2: Anthropic -> Claude -> người dùng
        {"t": A(19, None, -0.1), "bg": ("desk",), "zoom": (1.0, 1.04), "tag": "ANTHROPIC // CLAUDE", "els": [
            L("d_box", A(19), x=170, y=420, w=540, h=220, text="ANTHROPIC\n(công ty mẹ)", size=58),
            L("photo_card", A(19, "tức là"), src=os.path.join(PEOPLE, "dario.jpg"), w=240, x=440, y=220, rot=-4),
            E("write", A(19, "tức là", 0.2), text="Dario Amodei – CEO", x=640, y=200, size=40, color=INK),
            L("d_arrow", A(19, "cha đẻ"), p0=(730, 530), p1=(1060, 530), bend=0),
            E("write", A(19, "cha đẻ", 0.2), text="tạo ra", x=895, y=480, size=50, color=RED, anchor="middle"),
            L("d_box", A(19, "Claude"), x=1080, y=420, w=500, h=220, text="CLAUDE\n(trợ lý AI)", fill="#ffe7a3", size=58),
            L("d_limbs", A(19, "Claude", 0.3), x=1080, y=420, w=500, h=220, act="wave", mood="happy", fy=350),
            L("d_arrow", A(19, "mình đang dùng"), p0=(1240, 740), p1=(1050, 860), bend=-20),
            L("d_arrow", A(19, "mình đang dùng", 0.15), p0=(1420, 740), p1=(1600, 860), bend=20),
            L("d_box", A(19, "mình đang dùng", 0.3), x=820, y=880, w=380, h=130, text="Người dùng", size=48, fill="#e3f1fb", c=TEAL),
            L("d_box", A(19, "mình đang dùng", 0.45), x=1440, y=880, w=400, h=130, text="Doanh nghiệp", size=48, fill="#d8f3e3", c=GREEN)]},
        {"t": A(20, None, -0.1), "bg": ("desk",), "zoom": (1.0, 1.06), "tag": "CÂU HỎI // 1", "els": [
            E("big", A(20, "bán"), text="Họ bán cái gì?", x=820, y=460, size=130, color=INK),
            E("big", A(20, "bán", 0.3), text="?", x=1560, y=560, size=380, color=RED),
            L("d_limbs", A(20, "bán", 0.5), x=1460, y=300, w=200, h=280, act="jump", mood="wow", fy=230, arm=80),
            E("key", A(20, "định giá"), text="VÌ SAO ĐỊNH GIÁ CAO VẬY?", size=82)]},
        # --- Sơ đồ 3: doanh thu x13 nhưng vẫn đốt tiền
        {"t": A(21, None, -0.1), "bg": ("desk",), "zoom": (1.0, 1.05), "tag": "DOANH THU // DÒNG TIỀN", "els": [
            L("d_box", A(21, "doanh thu"), x=220, y=200, w=600, h=190, text="DOANH THU", fill="#d8f3e3", c=GREEN, size=70),
            L("d_arrow", A(21, "13", -0.2), p0=(520, 820), p1=(520, 460), bend=0, c=GREEN),
            E("big", A(21, "13"), text="×13", x=520, y=700, size=210, color=GREEN),
            L("d_box", A(21, "đốt"), x=1100, y=200, w=600, h=190, text="TIỀN MẶT", fill="#ffd6d6", size=70),
            E("icon", A(21, "đốt", 0.1), icon="flame", x=1400, y=620, s=2.6, bob=True),
            L("d_limbs", A(21, "đốt", 0.3), x=1300, y=500, w=200, h=230, act="stand", mood="sad", fy=470, face=False),
            E("key", A(21, "đốt", 0.4), text="…MÀ VẪN ĐANG ĐỐT TIỀN?", size=82)]},
        {"t": A(22, None, -0.1), "bg": ("desk",), "zoom": (1.0, 1.08), "tag": "GIẢI THÍCH // ĐƠN GIẢN", "els": [
            E("big", A(22, "giải thích"), text="Giải thích thật đơn giản!", x=960, y=540, size=110, color=RED),
            L("d_under", A(22, "đơn giản"), x0=330, x1=1590, y=600),
            L("d_burst", A(22, "đơn giản", 0.2), x=1640, y=420, n=7)]},
    ]

def init(voice, words, photos, dur):
    ev.WORDS = json.load(open(words))
    pics = {n: os.path.join(photos, f"{n}.jpg") for n in os.listdir(photos) for n in [n[:-4]]}
    G["f"] = Fast(shots(), pics, envelope(voice), dur)

def render(i):
    return G["f"].render(i)

def main(voice, words, photos, sfx_dir, out):
    ev.WORDS = json.load(open(words))
    ws = [w for w in ev.WORDS if w["seg"] == 22]
    dur = ws[-1]["end"] + 0.6
    init(voice, words, photos, dur)
    mixed = out.replace(".mp4", "_mix.wav")
    mix_audio(voice, [os.path.join(sfx_dir, "music2.mp3")], sfx_dir, G["f"].sfx(), [], mixed, dur, music_db=-31)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-i", mixed, "-shortest", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                           "-crf", "19", "-c:a", "aac", "-b:a", "192k", out], stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(voice, words, photos, dur)) as pool:
        for fr in pool.imap(render, range(int(dur * FPS)), chunksize=4):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:])
