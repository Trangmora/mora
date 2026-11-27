"""Bộ dựng cảnh phong cách "Vox sạch" (dùng các phần tử trong clean.py).

Một cảnh = (t0, t1, hàm vẽ). Hàm vẽ nhận (t, k_vào, canvas RGBA) và trả về chuỗi SVG phủ lên trên.
Nền xám lưới ô zoom rất chậm; chuyển cảnh = mờ nhanh 0.15 s + "vút" rất nhẹ.
"""
import json
import subprocess
import numpy as np
from PIL import Image

from vox import W, H, FPS, prog, ease_io, svg_to_rgba
import clean

XF = 0.15  # thời gian mờ chuyển cảnh


class Align:
    """Tra mốc thời gian theo cụm chữ trong lời thoại (căn chỉnh từng ký tự)."""

    def __init__(self, path, speed=1.0):
        d = json.load(open(path, encoding="utf-8"))
        self.text = "".join(d["chars"])
        self.t0 = [t / speed for t in d["t0"]]

    def __call__(self, phrase, off=0.0, nth=0):
        i = -1
        for _ in range(nth + 1):
            i = self.text.index(phrase, i + 1)
        return self.t0[i] + off


class Builder:
    def __init__(self, duration):
        self.duration = duration
        self.scenes = []
        self.bg = clean.make_bg(1.12).convert("RGBA")

    def scene(self, t0, t1, draw):
        self.scenes.append((t0, t1, draw))

    def cuts(self):
        return [s[0] for s in self.scenes[1:]]

    def _layer(self, sc, t):
        t0, t1, draw = sc
        cv = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        svg = draw(t - t0, cv) or ""
        if svg:
            ov = Image.fromarray(svg_to_rgba(svg).astype("uint8"), "RGBA")
            cv.alpha_composite(ov)
        return cv

    def frame(self, t):
        # nền zoom rất chậm
        z = 1.0 + 0.04 * t / max(1, self.duration)
        bw, bh = self.bg.size
        cw, ch = int(W / z), int(H / z)
        x0, y0 = (bw - cw) // 2, (bh - ch) // 2
        out = self.bg.crop((x0, y0, x0 + cw, y0 + ch)).resize((W, H), Image.BILINEAR)
        for sc in self.scenes:
            t0, t1, _ = sc
            if t0 - 1e-6 <= t < t1 + XF:
                a = 1.0
                if t > t1:
                    a = 1 - prog(t, t1, t1 + XF)
                elif sc is not self.scenes[0] and t < t0 + XF:
                    a = ease_io(prog(t, t0, t0 + XF))
                lay = self._layer(sc, t)
                if a < 1:
                    lay.putalpha(lay.getchannel("A").point(lambda v: int(v * a)))
                out.alpha_composite(lay)
        return out.convert("RGB")

    def render(self, out_path, audio_path=None):
        n = int(self.duration * FPS)
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
               "-r", str(FPS), "-i", "-"]
        if audio_path:
            cmd += ["-i", audio_path, "-c:a", "aac", "-b:a", "192k", "-shortest"]
        cmd += ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "medium", out_path]
        p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        for i in range(n):
            p.stdin.write(np.asarray(self.frame(i / FPS)).tobytes())
        p.stdin.close()
        p.wait()
