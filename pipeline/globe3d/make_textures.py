"""Sinh texture bản đồ cổ cho quả địa cầu 3D (phép chiếu equirectangular), bằng code từ dữ liệu Natural Earth.

python3 pipeline/globe3d/make_textures.py <ne_50m_admin_0_countries.geojson> <thư_mục_ra> [JPN=#c8323c USA=#2f5d9e ...]

Xuất: base.png (đất giấy cũ + biển), hl1.png, hl2.png … (từng bước tô màu: mỗi bước thêm một nước),
      height.png (độ cao: đất nổi, núi gồ theo nhiễu, viền bờ thoải), clouds.png (mây mỏng, kênh alpha).
"""
import io, json, os, sys
import numpy as np
import cairosvg
from PIL import Image, ImageFilter
from shapely.geometry import shape

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "mapstory"))
from demo import LAND, LAND_EDGE, SEA

TW, TH = 4096, 2048

def path_of(geom):
    polys = [geom] if geom.geom_type == "Polygon" else list(geom.geoms)
    d = ""
    for p in polys:
        for ring in [p.exterior] + list(p.interiors):
            d += "M" + " ".join(f"{(x + 180) / 360 * TW:.1f},{(90 - y) / 180 * TH:.1f}" for x, y in ring.coords) + "Z"
    return d

def raster(svg_body, bg):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{TW}" height="{TH}"><rect width="{TW}" height="{TH}" fill="{bg}"/>{svg_body}</svg>'
    return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode()))).convert("RGB")

def fbm(shape_, seed, octaves=6):
    rng = np.random.default_rng(seed)
    h, w = shape_
    out = np.zeros(shape_, np.float32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        n = max(4, 4 * 2 ** o)
        small = rng.random((n // 2 + 1, n)).astype(np.float32)
        small[:, -1] = small[:, 0]  # nối liền kinh tuyến 180
        layer = np.asarray(Image.fromarray((small * 255).astype("uint8")).resize((w, h), Image.BICUBIC), np.float32) / 255
        out += layer * amp; tot += amp; amp *= 0.55
    return out / tot

def main(geo, outdir, *hl):
    os.makedirs(outdir, exist_ok=True)
    feats = [(f["properties"]["ADM0_A3"], shape(f["geometry"])) for f in json.load(open(geo))["features"]]
    paths = {c: path_of(g) for c, g in feats}
    land = "".join(f'<path d="{d}" fill="{LAND}" stroke="{LAND_EDGE}" stroke-width="2.2" stroke-linejoin="round"/>' for d in paths.values())
    grain = fbm((TH, TW), 7, 8)[..., None]
    def finish(img):
        a = np.asarray(img, np.float32) * (0.9 + 0.16 * grain)
        return Image.fromarray(np.clip(a, 0, 255).astype("uint8"))
    finish(raster(land, SEA)).save(f"{outdir}/base.png")
    extra = ""
    for k, spec in enumerate(hl, 1):
        codes, col = spec.split("=")  # nhiều nước cùng một bước: "CHN+MNG=#9a6a2a"
        dark = "#" + "".join(f"{int(int(col[i:i + 2], 16) * 0.45):02x}" for i in (1, 3, 5))
        for code in codes.split("+"):
            extra += f'<path d="{paths[code]}" fill="{col}" stroke="{dark}" stroke-width="3" stroke-linejoin="round"/>'
        finish(raster(land + extra, SEA)).save(f"{outdir}/hl{k}.png")
    # độ cao: mặt nạ đất làm mềm + núi theo nhiễu (chỉ trên đất)
    mask = raster("".join(f'<path d="{d}" fill="#fff"/>' for d in paths.values()), "#000").convert("L").resize((TW // 2, TH // 2))
    m = np.asarray(mask.filter(ImageFilter.GaussianBlur(3)), np.float32) / 255
    inland = np.asarray(mask.filter(ImageFilter.GaussianBlur(14)), np.float32) / 255
    mount = fbm((TH // 2, TW // 2), 11, 7)
    h = 0.35 * m + 0.65 * m * np.clip((mount - 0.45) * 2.6, 0, 1) * inland
    Image.fromarray((np.clip(h, 0, 1) * 255).astype("uint8")).save(f"{outdir}/height.png")
    # mây mỏng
    c = fbm((TH // 2, TW // 2), 23, 7)
    c = np.clip((c - 0.52) * 3.2, 0, 1) ** 1.4
    rgba = np.dstack([np.full_like(c, 255), np.full_like(c, 250), np.full_like(c, 240), c * 200]).astype("uint8")
    Image.fromarray(rgba, "RGBA").save(f"{outdir}/clouds.png")
    print("ok", outdir)

if __name__ == "__main__":
    main(*sys.argv[1:])
