"""Amazon – bản thử 10 giây mở đầu (phong cách "Vox sạch"). Giọng: clone "Trang giọng việt" (ElevenLabs eleven_v3).
Chạy: python3 amz_test10.py
"""
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(__file__))
from vox import prog
import clean
from clean import halftone_card, paste_card, title, stat
from clean_build import Builder, Align
from engine import mix_audio

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../story-of-the-company"))
B = f"{ROOT}/amazon/build"
SPEED = 1.0  # giọng Trang đọc tốc độ tự nhiên
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", f"{B}/tts.mp3", "-filter:a", f"atempo={SPEED}",
                "-ar", "44100", "-ac", "1", f"{B}/voice.wav"], check=True)
A = Align(f"{B}/align.json", SPEED)
END = A("phút.") + 1.4

road = halftone_card(f"{ROOT}/assets/photos/highway.jpg", 1000, crop=(0, 250, 2200, 1432))
bezos = halftone_card(f"{ROOT}/assets/people/bezos.jpg", 560, crop=(0, 0, 923, 1050))

b = Builder(END)
c1, c2, c3 = A("gõ"), A("Ba mươi"), A("khoảng")


def s_road(t, cv):
    paste_card(cv, road, 640, 540, rot=-2.5, scale=1.0 + 0.025 * t)
    return (title(1480, 420, "1994", 170, prog(t, 0.15, 0.6), sub="TEXAS - SEATTLE")
            + (f'<g transform="translate(1480,700) scale({min(1, prog(t, 0.8, 1.1)) * 1.1:.2f})">{clean.ICONS["car"](clean.ORANGE)}</g>'
               if t > 0.8 else ""))


def s_bezos(t, cv):
    paste_card(cv, bezos, 560, 560, rot=2.0, scale=1.0 + 0.02 * t)
    return (title(1250, 470, "JEFF BEZOS", 110, prog(t, 0.1, 0.5), sub="GÕ KẾ HOẠCH KINH DOANH")
            + title(1250, 700, "NGAY TRÊN XE", 60, prog(t, 0.7, 1.1), bar=False))


def s_30(t, cv):
    return title(960, 560, "30 NĂM SAU", 160, prog(t, 0.05, 0.4))


def s_stat(t, cv):
    return stat(1010, 560, "coin", "$1,2 TRIỆU", "DOANH THU MỖI PHÚT (NĂM 2024)", prog(t, 0.05, 0.45), size=170)


b.scene(0, c1, s_road)
b.scene(c1, c2, s_bezos)
b.scene(c2, c3, s_30)
b.scene(c3, END, s_stat)

mix_audio(f"{B}/voice.wav", [f"{ROOT}/assets/audio/music1.mp3"], f"{ROOT}/assets/audio",
          [(t - 0.05, "whoosh", 0.12) for t in b.cuts()], [], f"{B}/mix.wav", END, music_db=-31)
b.render(f"{B}/amazon_thu_10s.mp4", f"{B}/mix.wav")
print("xong", END)
