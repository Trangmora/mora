"""Video 2 ĐẦY ĐỦ (~16 phút) – "Ai thật sự nắm quyền ở Anthropic?" – phong cách "Vật lý giấy cắt", khung ngang.
Theo story-of-the-company/LUAT_DUNG_VIDEO.md. Ảnh người thật: sticker từ ảnh có giấy phép (people/credits.json).

PEOPLE_DIR=… python3 ep2_full.py <voice_edit.wav> <words_edit.json> <sfx_dir> <out.mp4>   (PREVIEW=…, CHECK=1 như ep1_full)
"""
import json, math, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
import ep1_video as ev
from engine import mix_audio
from phys import (OW, OH, FPS, RED, BLACK, CREAM, GOLD, INK, glyph, render_stage, page_slide, ease_io, prog, stamp,
                  text_img, place, coin_sprites)
from phys_scenes import (T, mk, tag, num, board, bins, scale, bucket, heading, stamps, source, legend, row, person, pops,
                         arrows, weight_sprite, bowl_sprite, LEAD)

A = ev.A
G = {}
SLIDE = 0.4

FOUNDERS = [("dario", "DARIO AMODEI"), ("daniela", "DANIELA AMODEI"), ("kaplan", "JARED KAPLAN"), ("mccandlish", "SAM McCANDLISH"),
            ("tombrown", "TOM BROWN"), ("olah", "CHRIS OLAH"), ("jackclark", "JACK CLARK")]
TRUSTEES = [("shah", "BUDDY SHAH", "CHỦ TỊCH"), ("fontaine", "RICHARD FONTAINE", None), ("bernanke", "BEN BERNANKE", "CỰU CHỦ TỊCH FED"),
            ("stubbs", "CHRISTOPHER STUBBS", None), (None, "GHẾ TRỐNG", "(11/2026)")]

def founders_row(t, y, w=150, x0=230, x1=1880, dt=0.18):
    ims = [person(k, n, w=w, seed=i) for i, (k, n) in enumerate(FOUNDERS)]
    xs = np.linspace(x0, x1, len(ims))
    return [(t + i * dt, im, (x, y)) for i, (im, x) in enumerate(zip(ims, xs))]

def tiles_scene(t0, t1, events, heads=(), src=None, seed=0):
    """100 miếng bánh = 100% cổ phần; tại mỗi mốc, các miếng bay vào hộp QUỸ (vật lý thật)."""
    st = board(t0, t1, seed=seed, heads=heads, floor=False, FL=1100)
    S_, GAP = 54, 8
    GX, GY = 330, 300
    pos = [(GX + (i % 10) * (S_ + GAP), GY + (i // 10) * (S_ + GAP)) for i in range(100)]
    BX0, BX1, BT, BB = 1260, 1860, 560, 960
    st.fills.append(([(BX0, BT), (BX1, BT), (BX1, BB), (BX0, BB)], CREAM))
    st.wall((BX0, BT), (BX0, BB), 7)
    st.wall((BX1, BT), (BX1, BB), 7)
    st.wall((BX0, BB), (BX1, BB), 7)
    tile = Image.new("RGBA", (S_, S_), RED + (255,))
    from PIL import ImageDraw
    ImageDraw.Draw(tile).rectangle((0, 0, S_ - 1, S_ - 1), outline=BLACK + (255,), width=4)
    gone = {}
    order = list(range(100))
    k = 0
    for ts, n in events:
        for j in range(n):
            i = order[k]
            k += 1
            gone[i] = ts + j * 0.12
            x, y = pos[i]
            st.at(gone[i], lambda s, x=x, y=y: s.solid(tile, x + S_ / 2, y + S_ / 2, mass=1, vx=(1560 + s.rng.uniform(-120, 120) - x) / 1.0,
                                                     vy=-1100, z=3, sound=("paper", 0.3)))

    def draw(d, img, t, snap):
        for i, (x, y) in enumerate(pos):
            if i in gone and t >= gone[i]:
                d.rectangle((x, y, x + S_, y + S_), outline=(150, 145, 138, 255), width=2)
            else:
                d.rectangle((x, y, x + S_, y + S_), fill=CREAM + (255,), outline=BLACK + (255,), width=4)
        n = sum(1 for v in gone.values() if v + 0.8 <= t)
        if n:
            place(img, text_img(f"{n}% CỔ PHẦN", 70, RED, stroke=8), ((BX0 + BX1) / 2, BT - 60))
        place(img, text_img("QUỸ CÔNG ÍCH", 52, BLACK, stroke=6), ((BX0 + BX1) / 2, BB + 50))
        place(img, text_img("100 MIẾNG = 100% CỔ PHẦN", 40, BLACK, stroke=6), (GX + 5 * (S_ + GAP), GY + 10 * (S_ + GAP) + 50))
    st.world_fns.append(draw)
    if src:
        source(st, *src)
    st.cam = lambda t: (1056, 640, 2112 - 120 * ease_io(prog(t, t0, t1)))
    return st

def diagram(t0, t1, items=(), arr=(), heads=(), stamp_items=(), src=None, seed=0, cam=None):
    st = board(t0, t1, seed=seed, heads=heads, floor=False, FL=1150, stamp_items=stamp_items, src=src, cam=cam)
    if arr:
        arrows(st, arr)
    pops(st, list(items))
    return st

def scenes():
    S = []
    def add(t1, fn):
        t0 = S[-1][1] if S else 0.0
        S.append((t0, t1, fn))
    a = lambda seg, ph=None, off=0.0: A(seg, ph, off)
    cut = lambda seg: A(seg, None, -0.25)
    src_s1 = "Nguồn: hồ sơ S-1 của Anthropic (SEC, 10–11/2026)"

    # ---------- MỞ ĐẦU (giới thiệu Trang giữ nguyên; hình không nói về cá nhân) ----------
    add(cut(9), lambda t0, t1: board(t0, t1, seed=1,
        heads=[(a(1), "CHÀO MỪNG QUAY TRỞ LẠI", 76, BLACK)],
        drops=[(a(5, "video trước"), tag("TẬP TRƯỚC", 54, 1), 300),
               (a(6, "kiếm tiền"), mk([T("CLAUDE KIẾM TIỀN THẾ NÀO?", 84, RED)], seed=2), 1056, {"mass": 14, "z": 4}),
               (a(7, "link"), tag("LINK Ở GÓC MÀN HÌNH", 44, 3), 1700)],
        pours=[(a(1), a(7, None, 3.0), 60, GOLD)]))
    add(cut(13), lambda t0, t1: board(t0, t1, seed=2,
        heads=[(a(12), "KÊNH CHIA SẺ KIẾN THỨC TÀI CHÍNH", 70, RED)],
        drops=row([(a(12, "kiến thức"), mk([T("KIẾN THỨC TÀI CHÍNH", 54)], seed=1)),
                   (a(12, "trong ngành"), mk([T("TỪ NGƯỜI TRONG NGHỀ", 54)], seed=2)),
                   (a(12, "tổng hợp"), mk([T("NGHIÊN CỨU & TỔNG HỢP", 54, RED)], seed=3))], gap=50),
        pours=[(a(9), a(12, None, 8), 80, GOLD)]))
    add(cut(20), lambda t0, t1: board(t0, t1, seed=3,
        heads=[(a(13), "HÔM NAY: TIẾP TỤC VỀ ANTHROPIC", 70, BLACK)],
        drops=[(a(13, "Anthropic"), mk([T("ANTHROPIC", 130)], seed=1), 1150, {"mass": 16}),
               (a(13, "IPO"), person("dario", "DARIO AMODEI", "CEO", w=210), 520, {"mass": 4}),
               (a(16, "định giá"), tag("VỪA LÊN SÀN – ĐỊNH GIÁ NGHÌN TỶ $", 46, 2), 1150, {"z": 4})]))
    add(cut(34), lambda t0, t1: board(t0, t1, seed=4,
        heads=[(a(21), "CUỐI 2026: 3 ÔNG LỚN AI CÙNG “CHO ĐI”", 66, BLACK)],
        drops=[(a(22), person("dario", "ANTHROPIC", w=190, seed=1), 380, {"mass": 4}),
               (a(24, "quỹ"), mk([T("QUỸ CÔNG ÍCH", 44, RED), T("~75 TỶ $", 56)], seed=2), 380),
               (a(26), person("musk", "ELON MUSK", "SPACEX", w=190, seed=3), 1056, {"mass": 4}),
               (a(27, "SpaceX"), mk([T("CỔ PHIẾU SPACEX", 40, RED), T("CHO TRẺ EM MỸ", 40)], seed=4), 1056),
               (a(28, "OpenAI"), person("altman", "SAM ALTMAN", "OPENAI", w=190, seed=5), 1730, {"mass": 4}),
               (a(30, "một phần tư"), mk([T(">1/4 GIÁ TRỊ", 44, RED), T("CHO XÃ HỘI", 40)], seed=6), 1730)],
        stamp_items=[(a(32, "tổng hợp"), "MÌNH CHỈ TỔNG HỢP · LINK DƯỚI MÔ TẢ", (1056, 330), -3, 46)],
        src=("Nguồn: CNBC, Al Jazeera (10–11/2026); OpenAI (10/2025)", a(24))))
    add(cut(44), lambda t0, t1: board(t0, t1, seed=5,
        heads=[(a(34), "CÓ ĐIỂM GÌ LẠ?", 84, RED, (1056, 150), a(43)), (a(43), "HÔM NAY: BÓC TÁCH VÌ SAO", 76, RED, (1056, 150))],
        drops=[(a(35, "cần tiền"), mk([T("NHỮNG CÔNG TY", 44), T("CẦN TIỀN NHẤT THẾ GIỚI", 44)], seed=1), 1150),
               (a(39, "tám trăm"), weight_sprite("895 TỶ $"), 520, {"mass": 60, "box": (480, 300)}),
               (a(41, "cho đi"), mk([T("VẬY MÀ HỨA CHO ĐI", 54, RED), T("RẤT NHIỀU TIỀN", 40)], seed=2), 1650),
               (a(42, "ngân hàng"), tag("NHƯ NGÂN HÀNG NỢ KHỔNG LỒ…", 44, 3), 1056, {"z": 4}),
               (a(42, "phong bì"), mk([T("…ĐI TẶNG PHONG BÌ", 54, CREAM)], bg=RED, seed=4), 1300, {"z": 5})]))

    # ---------- QUỸ HOẠT ĐỘNG THẾ NÀO (bánh 100 miếng) ----------
    add(cut(63), lambda t0, t1: tiles_scene(t0, t1, seed=6, events=[(a(52, "năm miếng"), 5), (a(58, "bảy miếng"), 2), (a(60, "chín"), 2)],
        heads=[(a(44), "QUỸ CỦA ANTHROPIC HOẠT ĐỘNG THẾ NÀO?", 62, BLACK, (1056, 150), a(56)),
               (a(56), "GIÁ CỔ PHIẾU +50% THÌ QUỸ ĐƯỢC THÊM TỚI 2%", 58, RED, (1056, 150))],
        src=(src_s1 + " – 5% lúc IPO (~75 tỷ $), thêm tới 2% mỗi lần giá +50%; hồ sơ không ghi mức trần", a(52))))
    add(cut(65), lambda t0, t1: board(t0, t1, seed=71,
        heads=[(a(63), "CÔNG TY CÀNG THÀNH CÔNG", 70, BLACK, (1056, 150))],
        drops=[(a(63, "xã hội"), mk([T("XÃ HỘI CÀNG ĐƯỢC CHIA NHIỀU", 70, RED)], seed=1), 1056, {"mass": 12})],
        pours=[(a(63), a(64, None, 2.0), 90, GOLD)],
        stamp_items=[(a(64, "chi tiết"), "NHƯNG CÓ 1 CHI TIẾT RẤT QUAN TRỌNG", (1056, 400), -4, 60)]))
    add(cut(75), lambda t0, t1: board(t0, t1, seed=7,
        heads=[(a(65), "QUỸ TỪ THIỆN Ở MỸ PHẢI THEO LUẬT", 66, BLACK)],
        drops=[(a(66, "ba điểm"), num(1, 1), 230), (a(66, "ba điểm", 0.15), num(2, 2), 860), (a(66, "ba điểm", 0.3), num(3, 3), 1490)]
              + [(a(69, "phải chi"), mk([T("CHI ≥ 5% TÀI SẢN / NĂM", 40, RED), T("QUỸ 75 TỶ: ~4 TỶ $ / NĂM", 34)], seed=4), 560),
                 (a(72, "công khai"), mk([T("CÔNG KHAI", 46, RED), T("SỔ SÁCH", 46)], seed=5), 1130),
                 (a(73, "giới hạn"), mk([T("GIỚI HẠN", 46, RED), T("CHI VÀO ĐÂU", 46)], seed=6), 1730)]))
    add(cut(92), lambda t0, t1: board(t0, t1, seed=8,
        heads=[(a(75), "QUỸ CỦA ANTHROPIC LẠI ĐĂNG KÝ LÀ…", 64, BLACK, (1056, 150), a(85)),
               (a(85), "GỌI LÀ QUỸ TỪ THIỆN, NHƯNG…?", 70, RED, (1056, 150))],
        drops=[(a(76, "trách nhiệm"), mk([T("CÔNG TY TNHH", 80), T("(LLC)", 60, RED)], seed=1), 560, {"mass": 14}),
               (a(82, "linh hoạt"), tag("LÝ DO: “ĐỂ LINH HOẠT”", 44, 2), 560, {"z": 4}),
               (a(84, "vận động"), mk([T("CAM KẾT: KHÔNG DÙNG", 38), T("ĐỂ VẬN ĐỘNG CHÍNH TRỊ", 38, RED)], seed=3), 1500),
               (a(88, "câu hỏi"), glyph("?", 380), 1500, {"mass": 14})],
        stamp_items=[(a(80, "không bắt buộc"), "KHÔNG BẮT BUỘC CHI MỖI NĂM", (1300, 360), -5, 52),
                     (a(81, "công khai"), "KHÔNG BẮT BUỘC CÔNG KHAI", (1300, 470), 4, 52)],
        src=("Nguồn: CNBC, Forbes (19/10/2026) – quỹ là LLC thuộc sở hữu toàn phần", a(76))))

    # ---------- AI NẮM QUYỀN ----------
    add(cut(98), lambda t0, t1: board(t0, t1, seed=91,
        heads=[(a(92), "ĐIỀU QUAN TRỌNG NHẤT CỦA VIDEO", 66, BLACK, (1056, 150))],
        drops=[(a(95, "quyền lực"), mk([T("AI THẬT SỰ NẮM QUYỀN", 90, RED), T("Ở ANTHROPIC?", 70)], seed=1), 1056, {"mass": 16}),
               (a(96), glyph("?", 300), 1700, {"mass": 10})],
        pours=[(a(92), a(97, None, 1.5), 80, GOLD)]))
    add(cut(110), lambda t0, t1: diagram(t0, t1, seed=9,
        heads=[(a(98), "CÔNG TY BÌNH THƯỜNG", 72, BLACK, (1056, 150))],
        items=[(a(100, "Cổ đông"), mk([T("CỔ ĐÔNG", 72)], seed=1, minw=520), (1056, 880)),
               (a(100, "hội đồng"), mk([T("HỘI ĐỒNG QUẢN TRỊ", 64)], seed=2, minw=520), (1056, 620)),
               (a(102, "CEO"), mk([T("CEO", 72, RED)], seed=3, minw=520), (1056, 370))],
        arr=[(a(100, "bầu"), (1056, 820), (1056, 690), "BẦU"), (a(102, "chọn"), (1056, 560), (1056, 440), "CHỌN")],
        stamp_items=[(a(103, "quy tắc"), "1 CỔ PHIẾU = 1 PHIẾU BẦU", (1056, 1090), -3, 50)]))
    def s_twotiers(t0, t1):
        sm = lambda txt, sd, col=BLACK: mk([T(txt, 46, col)], seed=sd, minw=440)
        return diagram(t0, t1, seed=101,
            heads=[(a(110), "Ở ANTHROPIC THÌ KHÁC", 72, RED, (1056, 140))],
            items=[(a(110, None, 0.3), sm("CỔ ĐÔNG", 1), (1500, 960)), (a(110, None, 0.5), sm("HĐQT", 2), (1500, 800)),
                   (a(110, None, 0.7), sm("CEO", 3, RED), (1500, 640)),
                   (a(111, "hai tầng"), mk([T("TẦNG 2 · ?", 46, CREAM)], bg=RED, seed=4, minw=440), (1500, 470)),
                   (a(111, "hai tầng", 0.4), mk([T("TẦNG 1 · ?", 46, CREAM)], bg=RED, seed=5, minw=440), (1500, 320)),
                   (a(112, "điều lệ"), mk([T("ĐIỀU LỆ CÔNG TY", 54), T("ĐẦU TƯ = CHẤP NHẬN LUẬT CỦA HỌ", 36, RED)], seed=6), (620, 640))])
    add(cut(115), s_twotiers)
    founders = founders_row(a(124, "bảy"), 700, w=150)
    add(cut(128), lambda t0, t1: diagram(t0, t1, seed=10,
        heads=[(a(115), "TẦNG 1: “CỔ PHIẾU VUA”", 72, RED, (1056, 140))],
        items=[(a(117, "đặc biệt"), mk([T("1 CỔ PHIẾU LOẠI F", 60), T("= 50,1% QUYỀN BIỂU QUYẾT", 52, RED)], seed=1), (1056, 330)),
               (a(122, "công ty riêng"), tag("NẰM TRONG 1 CÔNG TY RIÊNG CỦA 7 NHÀ SÁNG LẬP", 40, 2), (1056, 480))] + founders,
        src=(src_s1 + " – Class F do Founder LLC nắm", a(117))))
    add(cut(137), lambda t0, t1: scale(t0, t1, seed=11, left=[(a(128, "50,1"), 16)], right=[(a(128, "49,9"), 9)],
        lab=("SÁNG LẬP 50,1%", "CÒN LẠI 49,9%"), spin=0.0,
        heads=[(a(128), "50,1% = THẮNG MỌI CUỘC BỎ PHIẾU", 64, RED, (1056, 150))],
        stamp_items=[(a(131), "TẦNG 1: CỔ PHIẾU VUA", (1056, 1095), -3, 60)]))
    trustees = [((a(141, "Bernanke") if k == "bernanke" else a(139, "Gồm") + i * 0.2), person(k, n, r, w=170, seed=i), (300 + i * 380, 700))
                for i, (k, n, r) in enumerate(TRUSTEES)]
    add(cut(154), lambda t0, t1: diagram(t0, t1, seed=12,
        heads=[(a(137), "TẦNG 2: QUỸ TÍN THÁC LỢI ÍCH DÀI HẠN", 64, RED, (1056, 140))],
        items=[(a(138), tag("LONG-TERM BENEFIT TRUST (LTBT)", 50, 9), (1056, 300)),
               (a(139, "đa số"), mk([T("5 GHẾ · CHỌN ĐA SỐ GHẾ HỘI ĐỒNG QUẢN TRỊ", 50)], seed=1), (1056, 440))] + trustees,
        stamp_items=[(a(149, "tự chọn"), "TỰ CHỌN NHAU · CÂU LẠC BỘ KHÉP KÍN", (1056, 1010), -3, 56)],
        src=("Nguồn: Anthropic, hồ sơ S-1; Fortune (21/10/2026) – thành viên tại 11/2026", a(139))))
    def s_result(t0, t1):
        ims = [(a(154), mk([T("CỔ PHIẾU VUA", 46, RED), T("7 NHÀ SÁNG LẬP · 50,1%", 32)], seed=1), (600, 260)),
               (a(154, None, 0.3), mk([T("QUỸ TÍN THÁC", 46, RED), T("CHỌN ĐA SỐ GHẾ", 32)], seed=2), (1512, 260)),
               (a(154, None, 0.6), mk([T("HỘI ĐỒNG QUẢN TRỊ", 56)], seed=3, minw=560), (1056, 520)),
               (a(154, None, 0.9), person("dario", "DARIO AMODEI", "CEO", w=150, seed=4), (1056, 760)),
               (a(155, "cổ đông"), mk([T("CỔ ĐÔNG ĐẠI CHÚNG (BẠN)", 44)], seed=5), (1056, 1020))]
        arr = [(a(154, None, 0.5), (700, 340), (930, 460), None), (a(154, None, 0.5), (1410, 340), (1180, 460), None),
               (a(154, None, 1.0), (1056, 580), (1056, 650), None)]
        return diagram(t0, t1, seed=13, items=ims, arr=arr,
                       stamp_items=[(a(155, "gần như"), "GẦN NHƯ KHÔNG CÓ TIẾNG NÓI", (1640, 900), -5, 40),
                                    (a(158, "bán cổ phiếu"), "CHỈ CÓ QUYỀN BÁN", (470, 900), 5, 44)],
                       src=(src_s1 + " – mục rủi ro về quyền biểu quyết", a(155)))
    add(cut(162), s_result)

    # ---------- SO VỚI ZUCKERBERG ----------
    def s_zuck(t0, t1):
        st = bins(t0, t1, BW=320, R=18, seed=14, leg=("1 ĐỒNG XU = 1%", a(164)),
                  heads=[(a(162), "SO VỚI MARK ZUCKERBERG (META)", 62, BLACK, (1056, 130), a(177)),
                         (a(177), "10/2026: META TẠO CỔ PHIẾU KHÔNG CÓ QUYỀN BIỂU QUYẾT", 52, RED, (1056, 130))],
                  items=[dict(cx=800, n=13, color=GOLD, label="CỔ PHẦN", sub="~13,4%", ta=a(164, "13%"), tb=a(164, "13%", 0.8),
                              fmt=lambda k, n: f"{k}%", lab_t=a(164)),
                         dict(cx=1200, n=61, color=RED, label="PHIẾU BẦU", sub="~60,6%", ta=a(165, "60%"), tb=a(165, "60%", 1.4),
                              fmt=lambda k, n: f"{k}%", tcol=RED, lab_t=a(165))],
                  src=("Nguồn: hồ sơ Meta gửi SEC (21/10/2026)", a(164)))
        from ep1_full import add_drops
        add_drops(st, [(a(162, "Mark"), person("zuckerberg", "MARK ZUCKERBERG", "CEO META", w=210), 360)], FL=960, x0=170)
        stamps(st, [(a(165, "mười phiếu"), "1 CỔ PHIẾU LOẠI B = 10 PHIẾU", (1640, 470), -5, 34),
                    (a(171, "bán"), "BÁN RA LÀ THÀNH CỔ PHIẾU THƯỜNG", (1640, 640), 4, 34)])
        return st
    add(cut(178), s_zuck)
    add(cut(190), lambda t0, t1: bucket(t0, t1, [(a(178), a(180), 160, lambda u: 1.0)], fire=False, seed=15,
        heads=[(a(178), "CÒN Ở ANTHROPIC?", 72, RED, (1056, 130))],
        labels=[(a(179, "bán"), "BÁN ĐẾN ~98% CỔ PHẦN", 46, BLACK, (360, 520)),
                (a(179, "quyền kiểm soát"), "QUYỀN KIỂM SOÁT", 50, RED, (1700, 560)), (a(179, "quyền kiểm soát", 0.2), "VẪN 50,1%", 64, RED, (1700, 640))],
        stamp_items=[(a(180), "VỪA LẤY TIỀN VỪA GIỮ QUYỀN", (1056, 1080), -3, 56)],
        src=("Nguồn: phân tích hồ sơ S-1 (Yahoo Finance, Intelligize)", a(179))))

    # ---------- 5 NGƯỜI & VỊ THA HIỆU QUẢ ----------
    rice = bowl_sprite("CƠM")
    add(cut(204), lambda t0, t1: board(t0, t1, seed=16,
        heads=[(a(190), "HỌ QUYẾT ĐỊNH TIỀN TỪ THIỆN ĐI ĐÂU", 64, BLACK, (1056, 140), a(195)),
               (a(195), "“VỊ THA HIỆU QUẢ”: TỪ THIỆN SAO CHO HIỆU QUẢ NHẤT", 52, RED, (1056, 140))],
        drops=[(a(192, "Vị tha"), mk([T("VỊ THA HIỆU QUẢ", 56, RED), T("EFFECTIVE ALTRUISM", 34)], seed=1), 1250),
               (a(193, "chủ tịch"), person("shah", "BUDDY SHAH · CHỦ TỊCH QUỸ TÍN THÁC", "TỪNG LÀ GIÁM ĐỐC ĐIỀU HÀNH GIVEWELL", w=180), 450, {"mass": 4}),
               (a(196, "10.000"), mk([T("KIẾM 10.000 $ / GIỜ", 50)], seed=3), 1250, {"z": 4}),
               (a(197, "quyên góp"), mk([T("LÀM THÊM 1 GIỜ RỒI QUYÊN GÓP", 44, RED)], seed=4), 1250, {"z": 5})]
              + [(a(198, "thuê") + i * 0.15 + LEAD, rice, 900 + i * 110, {"mass": 2, "lead": LEAD}) for i in range(9)],
        src=("Nguồn: GiveWell (công bố quan hệ); Anthropic", a(194))))

    # ---------- VÌ SAO LÊN SÀN LÚC NÀY ----------
    add(cut(209), lambda t0, t1: board(t0, t1, seed=17,
        heads=[(a(204), "VÌ SAO LÊN SÀN ĐÚNG LÚC NÀY?", 72, RED)],
        drops=[(a(205, "NVIDIA"), person("jensen", "JENSEN HUANG", "CỰU CEO NVIDIA", w=200), 520, {"mass": 4}),
               (a(207, "ngoại tình"), mk([T("BÊ BỐI, TỪ CHỨC (11/2026)", 46)], seed=1), 1250),
               (a(207, "xuống"), mk([T("CỔ PHIẾU NVIDIA GIẢM MẠNH", 52, CREAM)], bg=RED, seed=2), 1250, {"z": 4})],
        src=("Nguồn: CNBC (10–16/11/2026), Al Jazeera (12/11/2026)", a(205))))
    add(cut(217), lambda t0, t1: board(t0, t1, seed=18,
        heads=[(a(209), "LÝ DO 1: TĂNG TRƯỞNG KHÓ GIỮ", 70, BLACK)],
        drops=[(a(210, "13"), mk([T("DOANH THU ×13", 100, RED)], seed=1), 700, {"mass": 14}),
               (a(213, "định giá"), glyph("?", 380), 1550, {"mass": 14})],
        stamp_items=[(a(211, "khó duy trì"), "CHÍNH ANTHROPIC: KHÓ DUY TRÌ", (640, 420), -5, 48),
                     (a(214), "ĐỊNH GIÁ QUÁ CAO?", (1520, 300), 5, 54)],
        src=(src_s1 + " – mục rủi ro", a(211))))
    add(cut(220), lambda t0, t1: board(t0, t1, seed=19,
        heads=[(a(217), "LÝ DO 2: HÓA ĐƠN THUÊ MÁY CHỦ", 70, BLACK)],
        drops=[(a(217, "895"), weight_sprite("895 TỶ $"), 1056, {"mass": 60, "box": (480, 300)}),
               (a(218, "Amazon"), tag("AMAZON · GOOGLE", 50, 1), 520),
               (a(219, "mở rộng"), tag("CÒN PHẢI MỞ RỘNG", 50, 2), 1600)],
        src=(src_s1, a(217))))
    add(cut(232), lambda t0, t1: board(t0, t1, seed=20,
        heads=[(a(220), "NHỮNG TÍN HIỆU ĐÁNG LO", 72, RED)],
        drops=row([(a(221, "cắt giảm"), mk([T("89% DOANH NGHIỆP", 42, RED), T("CẮT / ĐỔI KẾ HOẠCH AI", 32), T("VÌ TỐN TIỀN", 32)], seed=1)),
                   (a(222, "19%"), mk([T("LẬP TRÌNH VIÊN GIỎI", 38), T("DÙNG AI CHẬM HƠN 19%", 36, RED), T("(1 NGHIÊN CỨU 2025)", 26)], seed=2)),
                   (a(225, "đắt hơn"), mk([T("CHI PHÍ AI", 42, RED), T("> LƯƠNG NGƯỜI", 34), T("VỪA CHO NGHỈ", 34)], seed=3))], gap=50)
             + [(a(228, "gấp đôi"), tag("VÍ DỤ: LƯƠNG 3.000 $, TIỀN API CÓ THỂ GẤP ĐÔI", 38, 4), 1056, {"z": 4})],
        src=("Nguồn: Cloudera – State of Enterprise AI 2026; METR (7/2025)", a(221))))

    # ---------- MUA Ở ĐỈNH? ĐỊNH GIÁ ----------
    add(cut(240), lambda t0, t1: scale(t0, t1, seed=21, left=[(a(237, "mua"), 6)], right=[(a(237, "bán"), 6)],
        lab=("MUA Ở ĐỈNH?", "BÁN Ở ĐỈNH?"),
        heads=[(a(232), "NGƯỜI HOÀI NGHI: “CÒN LÚC NÀO TỐT HƠN ĐỂ BÁN?”", 52, BLACK, (1056, 150), a(236)),
               (a(236), "CÂU HỎI CHO MỌI NHÀ ĐẦU TƯ", 66, RED, (1056, 150))]))
    add(cut(251), lambda t0, t1: board(t0, t1, seed=22,
        heads=[(a(240), "ĐỊNH GIÁ ĐÚNG HAY THỔI PHỒNG?", 72, RED)],
        drops=row([(a(244, "phương pháp"), mk([T("NHIỀU PHƯƠNG PHÁP ĐỊNH GIÁ", 50)], seed=1)),
                   (a(247, "tương lai"), mk([T("ĐỊNH GIÁ = KỲ VỌNG TƯƠNG LAI", 46, RED), T("KHÔNG PHẢI GIÁ TRỊ HÔM NAY", 34)], seed=2))], gap=60)
             + [(a(248, "quá cao"), glyph("?", 300), 1056, {"mass": 12, "z": 4})]))

    # ---------- LỊCH SỬ: 3 CÂU CHUYỆN ----------
    add(cut(256), lambda t0, t1: board(t0, t1, seed=231,
        heads=[(a(251), "KHÔNG BIẾT TƯƠNG LAI? NHÌN LẠI LỊCH SỬ", 64, BLACK, (1056, 150))],
        drops=[(a(253, "ba"), mk([T("1. GOOGLE", 60)], seed=1, minw=440), 420), (a(253, "ba", 0.4), mk([T("2. ALLBIRDS", 60)], seed=2, minw=440), 1056),
               (a(253, "ba", 0.8), mk([T("3. AMAZON", 60)], seed=3, minw=440), 1690)]))
    add(cut(261), lambda t0, t1: board(t0, t1, seed=23,
        heads=[(a(256), "1. GOOGLE – IPO 2004", 76, RED, (1056, 140))],
        drops=[(a(256, "Google"), mk([T("GOOGLE", 110)], seed=1), 560, {"mass": 14}),
               (a(257, "quỹ"), mk([T("HỨA 1% CỔ PHẦN & LỢI NHUẬN", 44, RED), T("CHO TỪ THIỆN", 40)], seed=2), 1400),
               (a(258, "lớn hơn"), mk([T("SAU ĐÓ: QUỸ BỊ GỘP VÀO GOOGLE.ORG", 40), T("(CHỈ 1,3 TRIỆU $ TỪ QUỸ, THEO SSIR)", 28, RED)], seed=3), 1056, {"z": 4})],
        src=("Nguồn: thư IPO của Google (2004); NBC News; Stanford Social Innovation Review", a(257))))
    add(cut(265), lambda t0, t1: bins(t0, t1, BW=380, R=22, seed=24, leg=("1 ĐỒNG XU = 40 TRIỆU $", a(262)),
        heads=[(a(261), "2. ALLBIRDS – CÔNG TY VÌ CỘNG ĐỒNG", 64, RED, (1056, 130))],
        items=[dict(cx=700, n=100, color=GOLD, label="IPO 2021", sub="~4 TỶ $", ta=a(262, "4 tỷ", -0.8), tb=a(262, "4 tỷ", 1.2),
                    fmt=lambda k, n: f"{k * 0.04:.1f} TỶ $".replace(".", ","), lab_t=a(262)),
               dict(cx=1412, n=1, color=RED, label="2026", sub="BÁN TÀI SẢN 39 TRIỆU $", ta=a(263, "39"), tb=a(263, "39", 0.2),
                    fmt=lambda k, n: "39 TRIỆU $", tcol=RED, lab_t=a(263))],
        stamp_items=[(a(263, "giải thể"), "GIẢI THỂ", (1412, 600), 8, 110)],
        src=("Nguồn: TipRanks, WWD, 24/7 Wall St. (3–4/2026)", a(263))))
    add(cut(278), lambda t0, t1: bins(t0, t1, BW=380, R=22, seed=25, leg=("1 ĐỒNG XU = 1 $", a(271)),
        heads=[(a(265), "3. AMAZON & BONG BÓNG DOTCOM (2000)", 62, RED, (1056, 130), a(277)),
               (a(277), "…NHƯNG VẪN SỐNG SÓT, THÀNH TOP THẾ GIỚI", 58, BLACK, (1056, 130))],
        items=[dict(cx=700, n=100, color=GOLD, label="ĐẦU TƯ", sub="ĐỈNH 1999", ta=a(267), tb=a(268), fmt=lambda k, n: f"{k} $", lab_t=a(266)),
               dict(cx=1412, n=6, color=RED, label="CÒN LẠI", sub="2001", ta=a(276, "6"), tb=a(276, "6", 0.5),
                    fmt=lambda k, n: f"{k} $", tcol=RED, lab_t=a(271))],
        stamp_items=[(a(271, "94%"), "−94%", (1412, 560), 7, 130)]))
    add(cut(285), lambda t0, t1: board(t0, t1, seed=26,
        heads=[(a(278), "NẾU BONG BÓNG AI VỠ?", 76, RED)],
        drops=[(a(279, "chết"), mk([T("CÓ CÔNG TY CHẾT", 60)], seed=1), 600),
               (a(279, "mạnh hơn"), mk([T("CÓ CÔNG TY MẠNH HƠN", 60, RED)], seed=2), 1450),
               (a(283), person("dario", "ANTHROPIC", w=170), 1056, {"mass": 4})],
        stamp_items=[(a(282, "niềm tin"), "MÌNH VẪN TIN TƯƠNG ĐỐI VÀO", (1056, 380), -4, 50)]))

    # ---------- ĐIỂM TỐT / ĐIỂM LO ----------
    good = [(a(287, "năm người"), mk([T("1. THÀNH VIÊN QUỸ TÍN THÁC", 32, RED), T("KHÔNG ĐƯỢC SỞ HỮU CỔ PHIẾU", 28)], seed=1)),
            (a(290, "ngăn"), mk([T("2. CÓ NGƯỜI “PHANH”", 32, RED), T("CHẠY THEO LỢI NHUẬN", 28)], seed=2)),
            (a(293, "giấu"), mk([T("3. NÓI THẲNG TRONG HỒ SƠ:", 32, RED), T("CỔ ĐÔNG GẦN NHƯ KHÔNG CÓ TIẾNG NÓI", 26)], seed=3))]
    good2 = [(a(298, "khóa"), mk([T("4. KHÓA CỬA BỎ “VÌ CỘNG ĐỒNG”", 32, RED), T("CẦN 80% HĐQT + 80% QUỸ TÍN THÁC", 26)], seed=4)),
             (a(302, "thứ năm"), mk([T("5. KHÔNG CHỈ MUỐN", 32, RED), T("GIÀU NHANH", 30)], seed=5))]
    add(cut(305), lambda t0, t1: board(t0, t1, seed=27, FL=820,
        heads=[(a(285), "NHỮNG ĐIỂM CẦN LƯU Ý", 70, BLACK, (1056, 140), a(287)), (a(287), "5 ĐIỂM TỐT", 80, RED, (1056, 140))],
        drops=row(good, gap=40) + row(good2, x0=300, x1=1812, gap=120),
        src=(src_s1 + " – cần 80% HĐQT và 80% thành viên quỹ để sửa điều lệ quỹ tín thác", a(298))))
    add(cut(319), lambda t0, t1: board(t0, t1, seed=28,
        heads=[(a(305), "ĐIỂM ĐÁNG LO", 80, RED)],
        drops=[(a(307, "thẩm phán"), person("cuellar", "M.-F. CUÉLLAR", "CỰU THẨM PHÁN TOÀ TỐI CAO BANG CALIFORNIA", w=200), 480, {"mass": 4}),
               (a(309, "rời"), mk([T("RỜI QUỸ TÍN THÁC (8/2026)", 44), T("SANG LÀM LÃNH ĐẠO ANTHROPIC", 40, RED)], seed=1), 1350),
               (a(310, "nương tay"), glyph("?", 360), 1350, {"mass": 14})],
        src=("Nguồn: Anthropic; các bài phân tích quản trị (8/2026)", a(309))))
    add(cut(324), lambda t0, t1: diagram(t0, t1, seed=29,
        heads=[(a(319), "7 NHÀ SÁNG LẬP HỨA DÀNH 80% TÀI SẢN CHO TỪ THIỆN", 52, BLACK, (1056, 150))],
        items=founders_row(a(319, "bảy"), 560, w=150),
        stamp_items=[(a(321, "không ràng buộc"), "KHÔNG RÀNG BUỘC PHÁP LÝ", (1056, 920), -4, 80)],
        src=(src_s1, a(320))))

    # ---------- BÀI HỌC ----------
    add(cut(340), lambda t0, t1: board(t0, t1, seed=30,
        heads=[(a(325), "BÀI HỌC CHO NHÀ ĐẦU TƯ NHỎ", 72, RED)],
        drops=row([(a(331, "thiết kế"), mk([T("1. XEM HỌ THIẾT KẾ QUYỀN LỰC", 46, RED), T("KHI PHÁT HÀNH IPO", 36)], seed=1)),
                   (a(333, "lời hứa"), mk([T("2. LỜI HỨA KHÔNG RÀNG BUỘC", 46, RED), T("= TỐT CHO HỌ, KHÔNG PHẢI CHO TA", 32)], seed=2))], gap=60)))
    add(cut(347), lambda t0, t1: bucket(t0, t1, [(a(340), a(344, None, 2), 150, lambda u: 0.4 + u)], seed=31, t_fire=a(344, "hóa đơn"),
        heads=[(a(337), "3. ĐỪNG CHỈ NHÌN DOANH THU", 66, RED, (1056, 130))],
        labels=[(a(343, "mười ba"), "DOANH THU ×13", 60, BLACK, (370, 460)), (a(342, "chi tiền"), "NHÌN CẢ CÁCH HỌ CHI TIỀN", 50, RED, (1600, 960))]))
    add(None, lambda t0, t1: board(t0, t1, seed=32,
        heads=[(a(350), "CẢM ƠN CÁC BẠN · HẸN GẶP LẠI!", 80, RED, (1056, 150))],
        drops=row([(a(347, "giá trị"), mk([T("MONG MANG LẠI GIÁ TRỊ", 54)], seed=1)),
                   (a(349), mk([T("QUYẾT ĐỊNH LÀ CỦA BẠN", 54, RED)], seed=2))], gap=80),
        stamp_items=[(a(348, "không phải"), "KHÔNG PHẢI LỜI KHUYÊN ĐẦU TƯ", (1056, 380), -4, 70)]))
    return S

def build():
    S = scenes()
    S[-1] = (S[-1][0], G["dur"], S[-1][2])
    return [fn(t0, t1).run(extra=SLIDE + 0.1) for t0, t1, fn in S]

def render(fi):
    t = fi / FPS
    S = G["stages"]
    i = max(j for j, s in enumerate(S) if s.t0 <= t)
    cur = render_stage(S[i], t)
    if i > 0 and t - S[i].t0 < SLIDE:
        cur = page_slide(render_stage(S[i - 1], t), cur, (t - S[i].t0) / SLIDE)
    a = np.asarray(cur.convert("RGB"), np.float32)
    a *= min(1, t / 0.3, (G["dur"] - t) / 0.8)
    return np.clip(a, 0, 255).astype("uint8").tobytes()

def main(voice, words, sfx_dir, out):
    G["words"] = json.load(open(words))
    ev.WORDS = G["words"]
    G["dur"] = G["words"][-1]["end"] + 2.0
    if os.environ.get("CHECK"):
        for t0, t1, fn in scenes():
            print(f"{t0:7.1f} → {(t1 or G['dur']):7.1f}  ({(t1 or G['dur']) - t0:5.1f}s)")
        return
    G["stages"] = build()
    dur = G["dur"]
    if os.environ.get("PREVIEW"):
        for tt in [float(x) for x in os.environ["PREVIEW"].split(",")]:
            Image.frombytes("RGB", (OW, OH), render(int(tt * FPS))).resize((960, 540)).save(out.replace(".mp4", f"_{tt}.jpg"))
        return
    events = []
    for k, s in enumerate(G["stages"]):
        events += [e for e in s.sounds if s.t0 <= e[0] < s.t1]
        if k:
            events.append((s.t0, "whoosh", 0.12))
    mixed = out.replace(".mp4", "_mix.wav")
    mix_audio(voice, [os.path.join(sfx_dir, "music1.mp3"), os.path.join(sfx_dir, "music2.mp3")], sfx_dir, events, [], mixed, dur,
              music_db=-31)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{OW}x{OH}", "-r", str(FPS),
                           "-i", "-", "-i", mixed, "-shortest", "-c:v", "libx264", "-preset", "medium", "-pix_fmt", "yuv420p",
                           "-crf", "19", "-c:a", "aac", "-b:a", "192k", out], stdin=subprocess.PIPE)
    with Pool(4) as pool:
        for fr in pool.imap(render, range(int(dur * FPS)), chunksize=8):
            ff.stdin.write(fr)
    ff.stdin.close()
    ff.wait()

if __name__ == "__main__":
    main(*sys.argv[1:])
