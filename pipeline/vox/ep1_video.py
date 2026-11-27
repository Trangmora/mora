"""Video 1: "Claude kiếm tiền thế nào? Bên trong cỗ máy AI nghìn tỷ đô" – dựng đầy đủ theo giọng đã cắt gọn.

python3 pipeline/vox/ep1_video.py <voice_edit.wav> <words_edit.json> <thư_mục_ảnh> <sfx_dir> <ne50.geojson> <out.mp4> [t_from t_to]
"""
import json, math, os, random, re, subprocess, sys
from multiprocessing import Pool
import numpy as np
from shapely.geometry import shape, Point

sys.path.insert(0, os.path.dirname(__file__))
from vox import W, H, FPS, INK, GOLD, GOLD_DK, TEAL, NAVY, MUSTARD
from engine import E, Video, mix_audio, RED, GREEN, BLUE, PURPLE, icon

WORDS = []

def norm(w):
    return re.sub(r"[^\wÀ-ỹ%,]", "", w.lower()).strip(",")

def A(seg, phrase=None, off=0.0):
    ws = [w for w in WORDS if w["seg"] == seg]
    if not ws:
        raise SystemExit(f"không có câu {seg}")
    if not phrase:
        return ws[0]["t"] + off
    p = [norm(x) for x in phrase.split()]
    toks = [norm(w["text"]) for w in ws]
    for s in range(len(toks) - len(p) + 1):
        if all(toks[s + k].startswith(p[k]) for k in range(len(p))):
            return ws[s]["t"] + off
    raise SystemExit(f"không thấy '{phrase}' trong câu {seg}: {' '.join(w['text'] for w in ws)}")

def vn_map(geo, bx):
    f = [x for x in json.load(open(geo))["features"] if x["properties"]["ADM0_A3"] == "VNM"][0]
    g = shape(f["geometry"])
    x0, y0, x1, y1 = bx
    lon0, lat0, lon1, lat1 = 102, 8.3, 110, 23.5
    k = min((x1 - x0) / (lon1 - lon0), (y1 - y0) / (lat1 - lat0))
    P = lambda lo, la: (x0 + (lo - lon0) * k, y0 + (lat1 - la) * k)
    polys = g.geoms if g.geom_type == "MultiPolygon" else [g]
    d = "".join("M" + " L".join(f"{P(*c)[0]:.1f},{P(*c)[1]:.1f}" for c in p.simplify(0.05).exterior.coords) + "Z"
                for p in polys if p.area > 0.05)
    rng = random.Random(4)
    pts = []
    while len(pts) < 22:
        lo, la = rng.uniform(lon0, lon1), rng.uniform(lat0, lat1)
        if g.contains(Point(lo, la)):
            pts.append(P(lo, la))
    pts.sort(key=lambda q: q[1])
    return d, pts

def build_pages(geo):
    P = []
    def page(t, els, host=True, sheet=True):
        P.append({"t": t, "els": els, "host": host, "sheet": sheet})

    # ---- 0. Giới thiệu
    page(0.0, [
        E("write", A(1, None, 0.1), text="Xin chào!", x=1050, y=240, size=84, color=RED, dur=0.7),
        E("label", A(1, "Trang"), text="TRANG", x=1400, y=420, size=150, rot=-3),
        E("label", A(1, "founder"), text="FOUNDER · MORA AI", x=1420, y=600, size=54, bg=MUSTARD, rot=2),
        E("sticky", A(2, "tài chính"), text="Tài chính", x=1120, y=840, color="#bfe8ff", rot=-5),
        E("sticky", A(2, "MBA"), text="MBA · Ý", x=1420, y=850, color="#ffe27a", rot=4),
        E("icon", A(4, "kênh"), icon="play", x=1720, y=830, s=1.0),
    ])
    # ---- 1. Tựa đề
    page(A(7, None, -0.5), [
        E("label", A(8, "Claude"), text="CLAUDE KIẾM TIỀN THẾ NÀO?", x=1060, y=320, size=78, rot=-2),
        E("write", A(8, "cỗ máy"), text="Bên trong cỗ máy AI nghìn tỷ đô", x=1060, y=500, size=66, anchor="middle", dur=1.0),
        E("stamp", A(9, "lời"), text="LỜI", x=880, y=760, color=GREEN, size=110, rot=-8),
        E("stamp", A(9, "lỗ"), text="LỖ?", x=1300, y=760, color=RED, size=110, rot=6),
    ])
    # ---- 2. Định giá
    page(A(11, None, -0.5), [
        E("headline", A(11, "lên sàn"), outlet="NBC News", band="#1d3b6e", w=1500, x=1080, y=260, size=52,
          title="Anthropic sets modest $1 trillion IPO valuation target in a test of Wall Street's AI fervor"),
        E("big", A(11, "1500"), count=(0, 1500), suf=" tỷ $", x=1080, y=640, size=180, color=GREEN, cdur=1.6),
        E("write", A(11, "định giá"), text="định giá khi lên sàn", x=1080, y=760, size=54, anchor="middle"),
        E("photo", A(11, "IPO"), name="stockexchange", x=1640, y=860, w=380, rot=4),
    ])
    # ---- 3. So với GDP Việt Nam
    page(A(12, None, -0.4), [
        E("bars", A(12, "1500"), x=650, y=900, bw=300, scale=0.42,
          items=[("Anthropic", 1500, GREEN, A(12, "1500"), "1.500 tỷ $"), ("GDP Việt Nam/năm", 500, TEAL, A(13, "nền kinh tế"), "~500 tỷ $")]),
        E("label", A(13, "mấy lần"), text="≈ GẤP 3 LẦN!", x=1550, y=330, size=80, bg=MUSTARD, rot=-4),
        E("sticky", A(14, "khổng lồ"), text="Con số\nkhổng lồ!", x=1560, y=620, color="#ffc8d6", rot=5),
        E("write", A(15, "lớn nhất"), text="lớn nhất lịch sử ngành AI?", x=1480, y=900, size=50, anchor="middle"),
    ])
    # ---- 4. Anthropic -> Claude
    page(A(19, None, -0.4), [
        E("label", A(19), text="ANTHROPIC", x=980, y=290, size=96, bg="#ffffff", rot=-2),
        E("write", A(19, "cha đẻ"), text="công ty \"cha đẻ\"", x=1360, y=210, size=48, color=TEAL),
        E("stroke", A(19, "trợ lý"), pts=[(980, 380), (985, 470), (980, 560)], dur=0.4, head=True, color=INK),
        E("label", A(19, "Claude"), text="CLAUDE", x=980, y=660, size=110, bg=MUSTARD, rot=2),
        E("photo", A(19, "mình đang dùng"), name="chatbot", x=1560, y=640, w=480, rot=3),
    ])
    # ---- 5. Ba câu hỏi
    page(A(20, None, -0.4), [
        E("sticky", A(20), text="Họ bán\ncái gì?", x=720, y=380, color="#ffe27a", rot=-6, w=280),
        E("sticky", A(21), text="Kiếm tiền\nkiểu gì?", x=1080, y=430, color="#bfe8ff", rot=4, w=280),
        E("big", A(21, "13"), text="×13", x=1480, y=430, size=170, color=RED, rot=-4),
        E("icon", A(21, "đốt"), icon="flame", x=1690, y=560, s=1.2, bob=True),
        E("write", A(22, "giải thích"), text="Giải thích thật đơn giản!", x=1150, y=880, size=66, anchor="middle", color=TEAL, sfx="ding", vol=0.6),
    ])
    # ---- 6. Claude là gì
    page(A(23, None, -0.4), [
        E("label", A(23), text="CLAUDE LÀ GÌ?", x=1000, y=170, size=84),
        E("write", A(24, "ChatGPT"), text="≈ giống ChatGPT", x=1500, y=290, size=50, color=TEAL),
        E("icon", A(25, "email"), icon="mail", x=640, y=440, s=0.9, label="Email"),
        E("icon", A(25, "viết bài"), icon="doc", x=870, y=440, s=0.9, label="Viết bài"),
        E("icon", A(25, "dịch"), icon="translate", x=1100, y=440, s=0.9, label="Dịch"),
        E("icon", A(25, "hợp đồng"), icon="doc", x=1330, y=440, s=0.9, label="Hợp đồng", c=MUSTARD),
        E("icon", A(25, "số liệu"), icon="chart", x=1560, y=440, s=0.9, label="Số liệu"),
        E("icon", A(25, "phần mềm"), icon="laptop", x=1000, y=800, s=1.5),
        E("label", A(25, "phần mềm", 0.2), text="AI VIẾT PHẦN MỀM", x=1500, y=760, size=60, bg=MUSTARD, rot=-3),
        E("icon", A(26, "đỉnh cao"), icon="star", x=1700, y=900, s=1.1, sfx="ding", vol=0.6),
    ])
    # ---- 7. Ba cách dùng
    page(A(28, None, -0.4), [
        E("label", A(28), text="3 CÁCH DÙNG CLAUDE", x=1000, y=160, size=78),
        E("big", A(28, "ba cách"), text="1", x=650, y=360, size=130, color=TEAL),
        E("big", A(28, "ba cách", 0.25), text="2", x=1100, y=360, size=130, color=MUSTARD),
        E("big", A(28, "ba cách", 0.5), text="3", x=1550, y=360, size=130, color=RED),
        E("icon", A(29, "ứng dụng"), icon="phone", x=650, y=600, s=1.1, label="Ứng dụng cá nhân"),
        E("icon", A(29, "máy tính"), icon="cloud", x=1100, y=600, s=1.0, label="Doanh nghiệp (API)"),
        E("icon", A(29, "câu hỏi"), icon="laptop", x=1550, y=600, s=1.0, label="Claude Code"),
    ])
    # ---- 8. API: nền móng + nguồn nước
    bldg = lambda x, h, name, col: (f'<rect x="{x}" y="{880 - h}" width="200" height="{h}" fill="{col}" stroke="{INK}" stroke-width="6"/>'
                                    + "".join(f'<rect x="{x + 30 + (k % 3) * 52}" y="{880 - h + 30 + (k // 3) * 56}" width="30" height="34" fill="#fff" stroke="{INK}" stroke-width="3"/>' for k in range(3 * max(1, (h - 60) // 56)))
                                    + f'<text x="{x + 100}" y="{880 - h - 16}" text-anchor="middle" font-family="Pangolin" font-size="38" fill="{INK}">{name}</text>')
    page(A(30, None, -0.4), [
        E("label", A(30), text="CÁCH 2: DOANH NGHIỆP", x=1000, y=150, size=70),
        E("svg", A(32, "móng"), svg=f'<rect x="560" y="880" width="860" height="90" fill="{MUSTARD}" stroke="{INK}" stroke-width="6"/>'
                                    f'<text x="990" y="942" text-anchor="middle" font-family="Be Vietnam Pro" font-weight="800" font-size="46" fill="{INK}">CLAUDE = NỀN MÓNG</text>', sfx="pop", vol=0.5),
        E("svg", A(33, "xây"), svg=bldg(600, 300, "Doanh nghiệp A", "#bfe8ff"), sfx="pop", vol=0.4),
        E("svg", A(33, "xây", 0.3), svg=bldg(890, 420, "Doanh nghiệp B", "#c7f0d8"), sfx="pop", vol=0.4),
        E("svg", A(33, "xây", 0.6), svg=bldg(1180, 240, "Doanh nghiệp C", "#ffd6c8"), sfx="pop", vol=0.4),
        E("stroke", A(34, "API"), pts=[(1440, 925), (1520, 925), (1520, 560), (1380, 560)], color=BLUE, width=12, dur=0.7, head=True),
        E("label", A(34, "API"), text="API", x=1640, y=700, size=80, bg=BLUE, ink="#ffffff", rot=3),
        E("icon", A(35, "nguồn nước"), icon="drop", x=1640, y=480, s=0.8, bob=True),
        E("write", A(39), text="viết code hộ doanh nghiệp", x=1000, y=1010, size=46, anchor="middle"),
        E("write", A(40), text="Mora AI cũng dùng!", x=600, y=260, size=48, color=TEAL),
        E("sticky", A(41, "trả lời"), text="Trả lời\nkhách hàng", x=1700, y=280, color="#ffe27a", rot=-5, w=220, size=38),
    ])
    # ---- 9. 80% + Claude Code
    page(A(42, None, -0.4), [
        E("big", A(42, "80%"), count=(0, 80), suf="%", x=820, y=520, size=240, color=TEAL),
        E("write", A(42, "doanh thu"), text="doanh thu đến từ doanh nghiệp", x=820, y=640, size=52, anchor="middle"),
        E("label", A(44), text="CÁCH 3: CLAUDE CODE", x=1450, y=230, size=60, bg=MUSTARD),
        E("photo", A(44, "lập trình viên"), name="coder", x=1450, y=620, w=560, rot=-3),
    ])
    # ---- 10. Nhà máy điện
    page(A(46, None, -0.4), [
        E("label", A(46), text="BÁN AI NHƯ BÁN ĐIỆN", x=1000, y=160, size=80, bg=MUSTARD),
        E("photo", A(49, "nhà máy"), name="powerplant", x=720, y=560, w=620, rot=-3),
        E("icon", A(49, "sản xuất AI"), icon="factory", x=1430, y=560, s=1.6),
        E("icon", A(49, "sản xuất AI", 0.3), icon="chip", x=1520, y=360, s=0.6, bob=True),
        E("write", A(50), text="sản xuất \"trí thông minh\"", x=1420, y=860, size=56, anchor="middle", color=TEAL),
    ])
    # ---- 11. Đồng hồ điện -> token
    page(A(51, None, -0.4), [
        E("photo", A(51), name="meter", x=640, y=480, w=480, rot=3),
        E("write", A(53), text="Dùng bao nhiêu – trả bấy nhiêu", x=1250, y=220, size=58, anchor="middle"),
        E("icon", A(54, "kilowatt"), icon="meter", x=1120, y=520, s=1.3),
        E("stroke", A(55, "token", -0.3), pts=[(1240, 520), (1340, 520)], color=INK, dur=0.3, head=True),
        E("label", A(55, "token"), text="TOKEN", x=1560, y=520, size=110, bg=GOLD, rot=-3),
        E("write", A(57), text="= mỗi chữ AI đọc & viết", x=1520, y=680, size=50, anchor="middle"),
        E("write", A(58), text="Đọc nhiều, viết nhiều = trả nhiều", x=1150, y=900, size=58, anchor="middle", color=RED),
        E("icon", A(59), icon="coin", x=1700, y=330, s=0.7, bob=True, sfx="coin", vol=0.6),
    ])
    # ---- 12. Ví dụ ngân hàng
    page(A(60, None, -0.4), [
        E("photo", A(61), name="bank", x=640, y=440, w=500, rot=-3),
        E("big", A(61, "một triệu"), count=(0, 1000000), x=1350, y=290, size=110, color=NAVY, cdur=1.2),
        E("write", A(61, "nhắn tin"), text="câu hỏi mỗi ngày", x=1350, y=370, size=46, anchor="middle"),
        E("big", A(63, "vài xu"), text="× vài xu", x=1350, y=540, size=96, color=GOLD_DK, sfx="coin", vol=0.7),
        E("big", A(64, "30"), text="× 30 ngày", x=1350, y=700, size=96, color=TEAL),
        E("big", A(64, "triệu đô"), text="= hàng triệu $ / tháng", x=1300, y=880, size=84, color=GREEN, sfx="cash", vol=0.7),
        E("sticky", A(66), text="…mới chỉ\n1 khách hàng!", x=700, y=860, color="#ffc8d6", rot=-4),
    ])
    # ---- 13. 13 tỷ $, bán ở đâu
    page(A(67, None, -0.4), [
        E("big", A(69, "13"), count=(0, 13), suf=" tỷ $", x=820, y=330, size=150, color=GREEN),
        E("write", A(69, "nửa đầu"), text="nửa đầu 2026 · doanh nghiệp", x=820, y=420, size=46, anchor="middle"),
        E("label", A(70), text="BÁN Ở ĐÂU?", x=1450, y=170, size=70),
        E("label", A(71, "trực tiếp"), text="TRỰC TIẾP", x=1250, y=340, size=50, bg="#bfe8ff"),
        E("label", A(71, "chợ"), text="CHỢ ĐÁM MÂY", x=1620, y=340, size=50, bg=MUSTARD),
        E("icon", A(71, "Amazon"), icon="cloud", x=1620, y=520, s=1.0, label="Amazon · Google"),
        E("photo", A(72), name="datacenter", x=800, y=730, w=520, rot=2),
        E("icon", A(72, "bấm"), icon="button", x=1330, y=780, s=1.0, sfx="pop", vol=0.6),
        E("write", A(72, "hóa đơn"), text="= tính chung hóa đơn", x=1560, y=920, size=46, anchor="middle"),
    ])
    # ---- 14. Gói tháng
    page(A(74, None, -0.4), [
        E("label", A(74), text="GÓI THÁNG · 20%", x=1000, y=150, size=78, bg=MUSTARD),
        E("photo", A(78, "Netflix"), name="streaming", x=680, y=460, w=480, rot=-3),
        E("write", A(78, "Netflix"), text="như Netflix / Spotify", x=680, y=720, size=46, anchor="middle"),
        E("sticky", A(80), text="Miễn phí\n(giới hạn)", x=1130, y=420, color="#e8e8e8", rot=-4, w=230, size=40),
        E("sticky", A(84, "cá nhân"), text="Cá nhân", x=1390, y=400, color="#bfe8ff", rot=3, w=230, size=40),
        E("sticky", A(84, "người dùng"), text="Dùng\nnhiều", x=1650, y=420, color="#c7f0d8", rot=-3, w=230, size=40),
        E("sticky", A(86), text="Doanh nghiệp\nlớn", x=1390, y=680, color="#ffe27a", rot=4, w=250, size=40),
        E("big", A(87, "3,2"), count=(0, 3.2), dec=1, suf=" tỷ $", x=1200, y=950, size=100, color=GREEN),
    ])
    # ---- 15. Biểu đồ 80/20
    page(A(88, None, -0.4), [
        E("label", A(88), text="DOANH THU CỦA ANTHROPIC", x=1000, y=140, size=62),
        E("pie", A(88, "biểu đồ"), x=1000, y=590, r=300, parts=[(80, TEAL, "Doanh nghiệp (API)"), (20, MUSTARD, "Gói tháng")]),
    ])
    # ---- 16. Gà đẻ trứng vàng
    page(A(89, None, -0.4), [
        E("label", A(90, "gà"), text="GÀ ĐẺ TRỨNG VÀNG", x=1000, y=160, size=78, bg=GOLD),
        E("photo", A(90, "trứng"), name="goldegg", x=700, y=540, w=540, rot=-3),
        E("label", A(90, "Claude Code"), text="CLAUDE CODE", x=1430, y=380, size=70, bg=MUSTARD, rot=2),
        E("icon", A(90, "phần mềm"), icon="laptop", x=1430, y=600, s=1.4),
        E("write", A(93), text="Lập trình viên dùng AI cả ngày", x=1300, y=880, size=54, anchor="middle"),
        E("icon", A(93, "quay"), icon="meter", x=1700, y=740, s=0.8, spin=0),
    ])
    # ---- 17. Chi phí lập trình viên
    page(A(94, None, -0.4), [
        E("label", A(94), text="THUÊ LẬP TRÌNH VIÊN SENIOR", x=1000, y=160, size=66),
        E("big", A(95, "ba nghìn"), text="3.000 – 10.000 $ / tháng", x=1000, y=330, size=92, color=RED),
        E("sticky", A(96, "Việt Nam"), text="Việt Nam", x=700, y=540, color="#ffe27a", rot=-4, w=210, size=40),
        E("sticky", A(96, "Singapore"), text="Singapore", x=950, y=560, color="#bfe8ff", rot=3, w=210, size=40),
        E("sticky", A(98, "châu Âu"), text="Châu Âu", x=1200, y=540, color="#c7f0d8", rot=-3, w=210, size=40),
        E("sticky", A(98, "Mỹ"), text="Mỹ", x=1450, y=560, color="#ffc8d6", rot=4, w=210, size=40),
        E("icon", A(100, "thay vì"), icon="cross", x=700, y=850, s=0.9),
        E("icon", A(100, "trả tiền"), icon="laptop", x=1050, y=840, s=1.0, label="Claude viết"),
        E("icon", A(101), icon="person", x=1400, y=850, s=1.2, c=GREEN, label="1 người kiểm tra"),
        E("icon", A(102), icon="check", x=1650, y=840, s=1.0, sfx="ding", vol=0.7),
    ])
    # ---- 18. 2,5 tỷ $
    page(A(104, None, -0.4), [
        E("write", A(104), text="Gói sẽ còn phát triển hơn nữa", x=1050, y=240, size=56, anchor="middle"),
        E("big", A(106, "hai"), count=(0, 2.5), dec=1, suf=" tỷ $ / năm", x=1050, y=500, size=140, color=GREEN, sfx="cash", vol=0.6),
        E("write", A(105), text="chỉ riêng Claude Code (đầu 2026)", x=1050, y=620, size=52, anchor="middle"),
        E("stamp", A(107), text="1 SẢN PHẨM!", x=1300, y=840, color=TEAL, size=90),
    ])
    # ---- 19. Sao phải IPO
    page(A(109, None, -0.4), [
        E("label", A(110), text="NHIỀU TIỀN VẬY – SAO PHẢI IPO?", x=1000, y=200, size=64, bg=MUSTARD),
        E("label", A(113, "tiền vào"), text="TIỀN VÀO", x=760, y=480, size=64, bg="#c7f0d8"),
        E("stroke", A(113, "tiền vào", 0.2), pts=[(760, 560), (760, 860)], color=GREEN, width=12, dur=0.4, head=True),
        E("label", A(113, "tiền ra"), text="TIỀN RA ?", x=1340, y=480, size=64, bg="#ffc8d6"),
        E("stroke", A(113, "tiền ra", 0.2), pts=[(1340, 860), (1340, 560)], color=RED, width=12, dur=0.4, head=True),
        E("sticky", A(114), text="Chi tiêu\nở đâu?", x=1650, y=800, color="#ffe27a", rot=5),
    ])
    # ---- 20. Hai loại chi phí
    page(A(115, None, -0.4), [
        E("label", A(115), text="NHÀ MÁY ĐIỆN: 2 LOẠI CHI PHÍ", x=1000, y=160, size=66),
        E("label", A(116), text="1. XÂY NHÀ MÁY", x=720, y=340, size=56, bg=MUSTARD),
        E("icon", A(116, "xây"), icon="factory", x=720, y=580, s=1.4),
        E("write", A(116, "đắt"), text="cực đắt – làm 1 lần", x=720, y=800, size=50, anchor="middle", color=RED),
        E("label", A(117), text="2. VẬN HÀNH", x=1380, y=340, size=56, bg="#bfe8ff"),
        E("icon", A(117, "than"), icon="flame", x=1220, y=580, s=0.9, label="than"),
        E("icon", A(117, "nước"), icon="drop", x=1400, y=580, s=1.0, label="nước"),
        E("icon", A(117, "công nhân"), icon="person", x=1580, y=580, s=1.0, label="công nhân"),
    ])
    # ---- 21. Huấn luyện AI = xây nhà máy
    page(A(118, None, -0.4), [
        E("label", A(119), text="1. HUẤN LUYỆN AI = XÂY NHÀ MÁY", x=1000, y=150, size=60, bg=MUSTARD),
        E("photo", A(119, "xây"), name="construction", x=700, y=470, w=500, rot=-3),
        E("write", A(120, "dữ liệu"), text="học lượng dữ liệu khổng lồ", x=1380, y=300, size=50, anchor="middle"),
        E("photo", A(123, "chip"), name="chip", x=1380, y=530, w=420, rot=3),
        E("write", A(123, "chục nghìn"), text="hàng chục nghìn chip", x=1380, y=770, size=50, anchor="middle"),
        E("big", A(124, "tỷ"), text="HÀNG TỶ $", x=1380, y=920, size=96, color=RED),
        E("sticky", A(125, "liên tục"), text="v1", x=640, y=840, color="#e8e8e8", w=150, size=50, rot=-4),
        E("sticky", A(125, "bản mới"), text="v2", x=820, y=860, color="#bfe8ff", w=150, size=50, rot=3),
        E("sticky", A(126, "training"), text="v3…", x=1000, y=840, color="#ffe27a", w=150, size=50, rot=-3),
    ])
    # ---- 22. Vận hành = đốt than
    page(A(128, None, -0.4), [
        E("stamp", A(131), text="1. ĐẮT NHẤT", x=1450, y=330, color=RED, size=80),
        E("label", A(132), text="2. VẬN HÀNH = ĐỐT THAN", x=1000, y=150, size=64, bg="#bfe8ff"),
        E("photo", A(133), name="datacenter", x=700, y=560, w=520, rot=-2),
        E("icon", A(133, "máy tính"), icon="server", x=1250, y=600, s=1.1),
        E("icon", A(134, "điện"), icon="bolt", x=1480, y=580, s=1.0, label="tốn điện"),
        E("icon", A(134, "thuê"), icon="coin", x=1680, y=590, s=0.9, label="tiền thuê máy", sfx="coin", vol=0.5),
        E("label", A(137), text="+ LƯƠNG KỸ SƯ AI (cao nhất thế giới)", x=1200, y=900, size=46, bg=MUSTARD, rot=-1),
    ])
    # ---- 23. Không tự làm chip
    page(A(140, None, -0.4), [
        E("stamp", A(140, "không phải"), text="KHÔNG TỰ LÀM CHIP", x=1000, y=320, color=RED, size=84),
        E("icon", A(140, "chip"), icon="chip", x=720, y=640, s=1.3),
        E("icon", A(140, "không phải", 0.2), icon="cross", x=820, y=560, s=0.7),
        E("write", A(141), text="Phải đi THUÊ máy chủ của:", x=1050, y=560, size=54),
        E("label", A(141, "Amazon"), text="AMAZON", x=1200, y=740, size=60, bg="#ffe27a"),
        E("label", A(141, "Google"), text="GOOGLE", x=1520, y=740, size=60, bg="#bfe8ff"),
        E("write", A(141, "công ty khác"), text="+ một số công ty khác", x=1350, y=900, size=46, anchor="middle"),
    ])
    # ---- 24. Trích hồ sơ S-1
    page(A(143, None, -0.4), [
        E("doc", A(143), x=210, y=200, w=1500, size=40, lh=68, src="ANTHROPIC, PBC – FORM S-1 (SEC)",
          lines=["In aggregate, the contractual obligations in the table below plus",
                 "the short-term and subsequent commitments, as well as leases not yet",
                 "commenced, each described in the paragraphs below, are approximately",
                 "$895.4 billion, substantially all of which is related to compute and",
                 "infrastructure."],
          hl=[(3, A(143, "tám"), 0.36), (3, A(143, "tám", 0.6), 1.0), (4, A(143, "tám", 1.0), 0.22)]),
        E("big", A(144), text="≈ 895 TỶ $", x=960, y=760, size=130, color=RED),
        E("write", A(144, "rất là lớn"), text="hợp đồng THUÊ dài hạn – chủ yếu máy chủ & hạ tầng", x=960, y=880, size=48, anchor="middle"),
    ], host=False)
    # ---- 25. Thuê mặt bằng 10 năm
    page(A(146, None, -0.4), [
        E("photo", A(146, "quán"), name="shoprent", x=700, y=500, w=540, rot=-3),
        E("label", A(146, "mười năm"), text="THUÊ 10 NĂM", x=1380, y=330, size=72, bg=MUSTARD),
        E("write", A(146, "đông"), text="đông hay vắng – vẫn phải trả", x=1380, y=470, size=50, anchor="middle"),
        E("icon", A(147), icon="weight", x=1380, y=690, s=1.4, sfx="hit", vol=0.5),
        E("write", A(148), text="≈ giá trị cả công ty!", x=1380, y=920, size=58, anchor="middle", color=RED),
    ])
    # ---- 26. Lời hay lỗ
    page(A(150, None, -0.4), [
        E("big", A(151), text="LỜI HAY LỖ?", x=1000, y=300, size=120, color=INK, sfx="drumroll", vol=0.6),
        E("stamp", A(153, "lời"), text="LỜI", x=780, y=620, color=GREEN, size=130, rot=-8),
        E("stamp", A(153, "lỗ"), text="LỖ", x=1240, y=620, color=RED, size=130, rot=7),
        E("write", A(154), text="nghe vô lý… để mình giải thích!", x=1000, y=900, size=54, anchor="middle", color=TEAL),
    ])
    # ---- 27. Biên lợi nhuận 3 năm
    page(A(156, None, -0.4), [
        E("label", A(156), text="MỖI 1 $ DOANH THU: LỜI / LỖ BAO NHIÊU?", x=1000, y=140, size=54),
        E("bars", A(157), x=640, y=560, bw=200, scale=3.0,
          items=[("2024", -100, RED, A(157, "hai đô"), "−1 $"), ("2025", 40, TEAL, A(170, "bốn"), "+40¢"),
                 ("2026*", 70, GREEN, A(173, "2026"), "+60–80¢")], sfx="none"),
        E("stamp", A(159), text="BÁN LỖ", x=1010, y=800, color=RED, size=60, rot=-5, sfx="uhoh", vol=0.6),
        E("sticky", A(165, "chịu lỗ"), text="Chịu lỗ\ngiành khách", x=1650, y=360, color="#ffc8d6", rot=4, w=240, size=40),
        E("photo", A(166, "Grab"), name="delivery", x=1650, y=700, w=380, rot=-3),
        E("icon", A(170, "lời"), icon="check", x=1050, y=330, s=0.6, sfx="ding", vol=0.6),
        E("stroke", A(177), pts=[(700, 900), (1000, 700), (1300, 420)], color=GREEN, width=10, dur=0.8, head=True),
        E("write", A(174), text="* ước tính của nhà phân tích", x=1450, y=1010, size=36, color="#7a8796"),
    ])
    # ---- 28. Mỗi câu trả lời đã lời, sao vẫn đốt tiền
    page(A(181, None, -0.4), [
        E("label", A(181), text="MỖI CÂU TRẢ LỜI", x=720, y=300, size=60, bg="#c7f0d8"),
        E("icon", A(183), icon="check", x=720, y=520, s=1.3, sfx="ding", vol=0.5),
        E("write", A(183), text="đã có lời", x=720, y=690, size=56, anchor="middle", color=GREEN),
        E("label", A(184), text="VẪN ĐỐT TIỀN?", x=1360, y=300, size=60, bg="#ffc8d6"),
        E("icon", A(184, "đốt"), icon="flame", x=1360, y=540, s=1.6, bob=True),
        E("sticky", A(188), text="Có lời rồi,\nsao còn đốt tiền?", x=1100, y=880, color="#ffe27a", rot=-3, w=300, size=40),
    ])
    # ---- 29. Quán phở 100 chi nhánh
    vd, vpts = vn_map(geo, (1180, 130, 1750, 1000))
    stores = [E("icon", A(194, "một trăm", 0.08 * k), icon="store", x=round(x), y=round(y), s=0.32, sfx="pop" if k % 4 == 0 else "none", vol=0.3)
              for k, (x, y) in enumerate(vpts)]
    page(A(189, None, -0.4), [
        E("photo", A(190), name="pho", x=680, y=440, w=520, rot=-3),
        E("label", A(191, "ba mươi"), text="+30% / BÁT", x=680, y=760, size=70, bg="#c7f0d8", rot=-3),
        E("svg", A(194), svg=f'<path d="{vd}" fill="#f5e3a3" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>', sfx="paper", vol=0.4),
        *stores,
        E("label", A(196, "âm"), text="TÀI KHOẢN: ÂM", x=1050, y=960, size=60, bg="#ffc8d6", rot=-3, sfx="uhoh", vol=0.6),
    ])
    # ---- 30. Anthropic = quán phở -> IPO
    page(A(197, None, -0.4), [
        E("label", A(197), text="ANTHROPIC = ANH CHỦ QUÁN PHỞ", x=1000, y=160, size=62, bg=MUSTARD),
        E("icon", A(198, "nhà máy"), icon="factory", x=720, y=520, s=1.4, label="nhà máy AI mới"),
        E("stroke", A(198, "tốn"), pts=[(900, 520), (1150, 520)], color=INK, width=8, dur=0.4, head=True),
        E("label", A(198, "huy động"), text="HUY ĐỘNG VỐN", x=1420, y=520, size=64, bg="#bfe8ff"),
        E("stamp", A(201, "IPO"), text="IPO", x=1420, y=820, color=RED, size=150),
    ])
    # ---- 31. Amazon & Google là ai
    page(A(204, None, -0.4), [
        E("label", A(204, "Amazon"), text="AMAZON & GOOGLE LÀ AI?", x=1000, y=160, size=70),
        E("label", A(206), text="1. NHÀ ĐẦU TƯ", x=660, y=380, size=52, bg="#c7f0d8"),
        E("icon", A(206, "cổ phần"), icon="coin", x=660, y=600, s=1.2, sfx="coin", vol=0.5),
        E("label", A(207), text="2. CHỦ NHÀ", x=1100, y=380, size=52, bg="#bfe8ff"),
        E("icon", A(207, "máy chủ"), icon="server", x=1100, y=610, s=1.1),
        E("label", A(209, "đối thủ"), text="3. ĐỐI THỦ", x=1540, y=380, size=52, bg="#ffc8d6"),
        E("write", A(209, "Gemini"), text="Gemini (Google)", x=1540, y=620, size=56, anchor="middle", color=BLUE),
    ])
    # ---- 32. Giao dịch vòng tròn
    loop = [(700, 560), (850, 360), (1000, 320), (1150, 360), (1300, 560), (1150, 760), (1000, 800), (850, 760)]
    page(A(214, None, -0.4), [
        E("label", A(215, "Amazon"), text="AMAZON", x=620, y=560, size=64, bg="#ffe27a"),
        E("label", A(215, "Anthropic"), text="ANTHROPIC", x=1400, y=560, size=64, bg=MUSTARD),
        E("stroke", A(215, "đầu tư"), pts=[(700, 480), (850, 350), (1000, 320), (1150, 350), (1320, 470)], color=GREEN, width=10, dur=0.7, head=True),
        E("write", A(215, "đầu tư"), text="1. đầu tư $", x=1000, y=280, size=50, anchor="middle", color=GREEN),
        E("stroke", A(217), pts=[(1320, 650), (1150, 770), (1000, 800), (850, 770), (700, 650)], color=RED, width=10, dur=0.7, head=True),
        E("write", A(217), text="2. trả tiền thuê máy chủ", x=1000, y=880, size=50, anchor="middle", color=RED),
        E("coinpath", A(219), pts=loop, speed=0.45, sfx="coin", vol=0.5),
        E("sticky", A(220, "doanh thu"), text="Amazon ghi\n\"doanh thu\"", x=1720, y=330, color="#ffe27a", rot=5, w=260, size=40),
        E("label", A(222), text="GIAO DỊCH VÒNG TRÒN", x=1000, y=160, size=72, bg=GOLD, rot=-2),
        E("icon", A(224, "hợp pháp"), icon="check", x=1720, y=640, s=0.7, label="hợp pháp", sfx="ding", vol=0.4),
        E("write", A(224, "lớn hơn"), text="…nhưng doanh thu trông lớn hơn thực tế", x=1000, y=1000, size=48, anchor="middle", color=RED),
    ])
    # ---- 33. Ba lá bài
    page(A(230, None, -0.5), [
        E("label", A(230), text="ANTHROPIC ĐẶT CƯỢC 3 ĐIỀU", x=1000, y=150, size=68, sfx="riser", vol=0.5),
        E("icon", A(231, "ba"), icon="card", x=640, y=480, s=1.3, c=TEAL),
        E("icon", A(231, "ba", 0.25), icon="card", x=1000, y=480, s=1.3, c=MUSTARD),
        E("icon", A(231, "ba", 0.5), icon="card", x=1360, y=480, s=1.3, c=RED),
        E("photo", A(238, "canh bạc"), name="cards", x=1650, y=820, w=380, rot=4),
        E("label", A(237), text="1. DOANH NGHIỆP DÙNG AI NHIỀU HƠN", x=900, y=820, size=46, bg="#bfe8ff"),
    ])
    # ---- 34. Khảo sát 89%
    page(A(241, None, -0.4), [
        E("headline", A(241), outlet="ITPro", band=PURPLE, w=1500, x=1000, y=270, size=50,
          title="AI's price tag is starting to shape its path through the enterprise"),
        E("big", A(241, "89%"), count=(0, 89), suf="%", x=800, y=640, size=210, color=RED),
        E("write", A(241, "cắt giảm"), text="đã cắt giảm / đổi kế hoạch AI vì tốn tiền", x=820, y=760, size=46, anchor="middle"),
        E("write", A(241, "1.500"), text="(khảo sát 1.500 lãnh đạo công nghệ)", x=820, y=830, size=38, anchor="middle", color="#7a8796"),
        E("sticky", A(242), text="80% doanh thu\ntừ doanh nghiệp!", x=1480, y=620, color="#ffe27a", rot=4, w=300, size=40),
        E("stroke", A(244, "giảm"), pts=[(1640, 780), (1650, 960)], color=RED, width=12, dur=0.4, head=True, sfx="uhoh", vol=0.5),
    ])
    # ---- 35. AI ngày càng rẻ
    page(A(246, None, -0.4), [
        E("label", A(246), text="2. CHẠY AI NGÀY CÀNG RẺ", x=1000, y=160, size=68, bg="#c7f0d8"),
        E("photo", A(247), name="chip", x=700, y=540, w=520, rot=-3),
        E("icon", A(247, "phần mềm"), icon="gear", x=1250, y=560, s=1.0, spin=40),
        E("stroke", A(247, "chi phí"), pts=[(1450, 420), (1460, 720)], color=GREEN, width=12, dur=0.4, head=True),
        E("write", A(247, "chi phí"), text="chi phí giảm, lợi nhuận tăng", x=1560, y=820, size=50, anchor="middle", color=GREEN),
        E("icon", A(248), icon="check", x=1320, y=880, s=0.8, sfx="ding", vol=0.5),
    ])
    # ---- 36. Claude phải đủ giỏi
    page(A(251, None, -0.4), [
        E("label", A(251), text="3. CLAUDE PHẢI ĐỦ GIỎI", x=1000, y=150, size=68, bg=MUSTARD),
        E("label", A(252, "ChatGPT"), text="ChatGPT", x=650, y=350, size=56, bg="#e8e8e8", rot=-3),
        E("label", A(252, "Gemini"), text="Gemini", x=1000, y=370, size=56, bg="#bfe8ff", rot=2),
        E("label", A(252, "Grok"), text="Grok", x=1340, y=350, size=56, bg="#e8e8e8", rot=-2),
        E("label", A(254), text="CLAUDE", x=1000, y=600, size=96, bg=GOLD, rot=-2),
        E("sticky", A(254, "doanh nghiệp"), text="Doanh\nnghiệp", x=1450, y=620, color="#c7f0d8", rot=4, w=220, size=40),
        E("sticky", A(255), text="Lập trình\n(code)", x=1700, y=660, color="#ffe27a", rot=-3, w=220, size=40),
        E("write", A(260), text="ChatGPT: trợ lý, giải đáp", x=1000, y=860, size=48, anchor="middle"),
        E("write", A(262), text="Claude: làm luôn cho doanh nghiệp", x=1000, y=960, size=48, anchor="middle", color=TEAL),
    ])
    # ---- 37. Nếu thắng
    page(A(272, None, -0.4), [
        E("label", A(272), text="NẾU THẮNG CẢ 3 LÁ BÀI", x=1000, y=160, size=70, bg="#c7f0d8"),
        E("icon", A(272, "doanh nghiệp"), icon="check", x=720, y=340, s=0.8),
        E("icon", A(273), icon="check", x=1000, y=340, s=0.8),
        E("icon", A(275), icon="check", x=1280, y=340, s=0.8),
        E("write", A(279), text="giảm chi xây dựng", x=760, y=600, size=52, anchor="middle"),
        E("stroke", A(279, "giảm"), pts=[(760, 640), (760, 760)], color=RED, width=10, dur=0.3, head=True),
        E("write", A(282), text="chỉ còn tiền vào", x=1300, y=600, size=52, anchor="middle"),
        E("stroke", A(282, "tiền vào"), pts=[(1300, 760), (1300, 640)], color=GREEN, width=10, dur=0.3, head=True),
        E("big", A(283, "lãi"), text="LÃI RẤT LỚN", x=1000, y=920, size=130, color=GREEN, sfx="cash", vol=0.7),
    ])
    # ---- 38. Nếu thua
    page(A(284, None, -0.4), [
        E("label", A(284), text="NẾU THUA?", x=1000, y=180, size=90, bg="#ffc8d6"),
        E("icon", A(285, "895"), icon="weight", x=1000, y=520, s=2.0, sfx="hit", vol=0.6),
        E("big", A(285, "gánh nặng"), text="895 TỶ $ = GÁNH NẶNG", x=1000, y=860, size=96, color=RED, sfx="uhoh", vol=0.6),
    ])
    # ---- 39. Ba điểm mấu chốt
    page(A(288, None, -0.4), [
        E("label", A(296), text="3 ĐIỂM MẤU CHỐT", x=1000, y=150, size=80, bg=MUSTARD),
        E("sticky", A(291), text="1. Bán AI\nnhư bán điện", x=640, y=520, color="#bfe8ff", rot=-4, w=380, size=44),
        E("sticky", A(295), text="2. Bán đã lời,\nvẫn đốt tiền\nxây AI mới", x=1060, y=540, color="#ffe27a", rot=3, w=380, size=44),
        E("sticky", A(298), text="3. Cổ phiếu =\nđặt cược AI\nphổ biến, rẻ,\nClaude dẫn đầu", x=1480, y=520, color="#c7f0d8", rot=-3, w=400, size=42),
    ])
    # ---- 40. Gợi mở video 2
    page(A(300, None, -0.4), [
        E("label", A(300), text="VIDEO SAU…", x=1000, y=150, size=76, bg="#ffc8d6", sfx="riser", vol=0.5),
        E("icon", A(302), icon="lock", x=680, y=470, s=1.4, label="Bạn: gần như không có tiếng nói"),
        E("big", A(304), text="50,1%", x=1200, y=480, size=150, color=GOLD_DK),
        E("write", A(303), text="1 công ty nắm hơn nửa quyền lực", x=1200, y=580, size=44, anchor="middle"),
        E("sticky", A(305), text="Nhóm 5 người\ntự chọn nhau", x=1620, y=470, color="#ffe27a", rot=4, w=280, size=40),
        E("big", A(307, "75"), text="Quỹ từ thiện 75 tỷ $", x=1200, y=880, size=84, color=TEAL),
    ])
    # ---- 41. Kết
    page(A(315, None, -0.4), [
        E("write", A(315), text="Hẹn gặp ở video sau!", x=1000, y=220, size=64, anchor="middle", color=TEAL),
        E("icon", A(316, "thích"), icon="thumb", x=700, y=470, s=1.2, label="Thích"),
        E("icon", A(316, "đăng ký"), icon="play", x=1000, y=470, s=1.1, label="Đăng ký"),
        E("icon", A(316, "chuông"), icon="bell", x=1300, y=470, s=1.2, label="Bật chuông", sfx="ding", vol=0.6),
        E("write", A(317), text="Comment góp ý cho mình nhé!", x=1000, y=760, size=56, anchor="middle"),
        E("label", A(318), text="KHÔNG PHẢI LỜI KHUYÊN ĐẦU TƯ", x=1000, y=920, size=52, bg="#ffffff", ink=RED),
    ])
    # vị trí trang: đi zig-zag, thỉnh thoảng xuống dòng
    for k, p in enumerate(P):
        row, c = divmod(k, 6)
        p["pos"] = (c if row % 2 == 0 else 5 - c, row)
    return P

G = {}

def init(voice, words, photos, geo, dur):
    global WORDS
    WORDS = json.load(open(words))
    pages = build_pages(geo)
    v = Video(pages, WORDS, photos, dur, host_plan={"intro_end": pages[1]["t"]})
    v.setup(voice)
    G["v"] = v

def render(i):
    return G["v"].render(i)

def main(voice, words, photos, sfx_dir, geo, out, t_from=None, t_to=None):
    global WORDS
    WORDS = json.load(open(words))
    dur = WORDS[-1]["end"] + 1.5
    init(voice, words, photos, geo, dur)
    v = G["v"]
    music = [os.path.join(sfx_dir, "music1.mp3"), os.path.join(sfx_dir, "music2.mp3")]
    mixed = out.replace(".mp4", "_mix.wav")
    mix_audio(voice, music, sfx_dir, v.sfx_events(), [], mixed, dur)
    a = float(t_from) if t_from else 0.0
    b = float(t_to) if t_to else dur
    frames = range(int(a * FPS), int(b * FPS))
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-ss", str(a), "-t", str(b - a), "-i", mixed,
                           "-shortest", "-c:v", "libx264", "-preset", "medium", "-pix_fmt", "yuv420p", "-crf", "20",
                           "-c:a", "aac", "-b:a", "192k", out], stdin=subprocess.PIPE)
    with Pool(4, initializer=init, initargs=(voice, words, photos, geo, dur)) as pool:
        for fr in pool.imap(render, frames, chunksize=6):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:])
