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

def shots():
    A = ev.A
    return [
        {"t": 0.0, "bg": ("desk",), "zoom": (1.0, 1.06), "punch": [A(1, "founder")], "els": [
            E("write", A(1, None, 0.05), text="Xin chào!", x=960, y=250, size=110, color=RED, anchor="middle", dur=0.6),
            E("label", A(1, "Trang"), text="TRANG", x=960, y=470, size=200, rot=-2),
            E("label", A(1, "founder"), text="FOUNDER · MORA AI", x=960, y=700, size=74, bg=MUSTARD, rot=2)]},
        {"t": A(2, None, -0.1), "bg": ("photo", "stock"), "zoom": (1.04, 1.16), "pan": (-80, 0), "els": [
            E("key", A(2, "tài chính"), text="LÀM VIỆC TRONG NGÀNH TÀI CHÍNH", size=74, accent=GOLD)]},
        {"t": A(2, "tốt nghiệp", -0.1), "bg": ("photo", "duomo"), "zoom": (1.0, 1.12), "pan": (0, -40), "els": [
            E("key", A(2, "thạc sĩ"), text="THẠC SĨ QUẢN TRỊ KINH DOANH", size=74),
            E("label", A(2, "MBA"), text="MBA · Ý", x=1560, y=200, size=110, bg=GOLD, rot=4)]},
        {"t": A(4, None, -0.1), "bg": ("photo", "chatbot"), "zoom": (1.0, 1.14), "pan": (60, 0), "els": [
            E("key", A(4, "chia sẻ"), text="CHIA SẺ KIẾN THỨC TÀI CHÍNH", size=74, accent=GOLD)]},
        {"t": A(7, None, -0.1), "bg": ("desk",), "zoom": (1.0, 1.05), "punch": [A(8, "kiếm tiền")], "els": [
            E("write", A(7, None, 0.1), text="Hôm nay:", x=960, y=230, size=90, color=TEAL, anchor="middle", dur=0.5),
            E("label", A(8, "Claude"), text="CLAUDE", x=960, y=470, size=220, bg=MUSTARD, rot=-2),
            E("big", A(8, "kiếm tiền"), text="kiếm tiền thế nào?", x=960, y=760, size=120, color=INK)]},
        {"t": A(8, "cỗ máy", -0.1), "bg": ("photo", "datacenter"), "zoom": (1.0, 1.22), "els": [
            E("key", A(9, "nghìn"), text="CỖ MÁY AI NGHÌN TỶ ĐÔ", size=90, accent=GOLD)]},
        {"t": A(9, "lời", -0.25), "bg": ("desk",), "zoom": (1.02, 1.1), "punch": [A(9, "lỗ")], "els": [
            E("stamp", A(9, "lời"), text="LỜI", x=680, y=540, color=GREEN, size=190, rot=-8),
            E("stamp", A(9, "lỗ"), text="LỖ?", x=1250, y=540, color=RED, size=190, rot=6)]},
        {"t": A(11, None, -0.1), "bg": ("photo", "stockexchange"), "zoom": (1.0, 1.12), "dim": 0.25, "els": [
            E("headline", A(11, "lên sàn"), outlet="NBC News", band="#1d3b6e", w=1650, x=960, y=520, size=60,
              title="Anthropic sets modest $1 trillion IPO valuation target in a test of Wall Street's AI fervor")]},
        {"t": A(11, "con số", -0.1), "bg": ("desk",), "zoom": (1.0, 1.08), "punch": [A(11, "1500", 1.2)], "els": [
            E("big", A(11, "1500"), count=(0, 1500), suf=" TỶ $", x=960, y=560, size=250, color=GREEN, cdur=1.0),
            E("key", A(11, "1500", 0.6), text="ĐỊNH GIÁ KHI LÊN SÀN", size=80, accent=GOLD)]},
    ]

def init(voice, words, photos, dur):
    ev.WORDS = json.load(open(words))
    pics = {n: os.path.join(photos, f"{n}.jpg") for n in os.listdir(photos) for n in [n[:-4]]}
    G["f"] = Fast(shots(), pics, envelope(voice), dur)

def render(i):
    return G["f"].render(i)

def main(voice, words, photos, sfx_dir, out):
    ev.WORDS = json.load(open(words))
    ws = [w for w in ev.WORDS if w["seg"] == 11]
    dur = ws[-1]["end"] + 0.6
    init(voice, words, photos, dur)
    mixed = out.replace(".mp4", "_mix.wav")
    mix_audio(voice, [os.path.join(sfx_dir, "music1.mp3")], sfx_dir, G["f"].sfx(), [], mixed, dur, music_db=-16)
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
