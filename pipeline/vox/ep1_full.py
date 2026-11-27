"""Video 1 ĐẦY ĐỦ (~14 phút) – phong cách "Vật lý giấy cắt", khung ngang 1920×1080.
Theo bộ luật story-of-the-company/LUAT_DUNG_VIDEO.md.

python3 ep1_full.py <voice_edit.wav> <words_edit.json> <people_dir> <sfx_dir> <out.mp4>
  PREVIEW=t1,t2,...   → chỉ xuất khung hình xem trước
  CHECK=1             → chỉ kiểm tra mốc chữ (không render)
"""
import json, os, subprocess, sys
from multiprocessing import Pool
import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
import ep1_video as ev
import ep1_phys as E
from engine import mix_audio
from phys import OW, OH, FPS, RED, BLACK, CREAM, GOLD, glyph, render_stage, page_slide
from phys_scenes import (T, mk, tag, num, board, bins, scale, bucket, meter, loop, factory, heading, stamps, source,
                         bowl_sprite, house_sprite, chip_sprite, egg_sprite, weight_sprite, LEAD, row)

A = ev.A
G = {}
SLIDE = 0.4

def tien(v, dec=1):
    return f"{v:.{dec}f}".replace(".", ",") + " TỶ $"

def add_drops(st, drops, FL=960, x0=170, x1=1942):
    st.wall((x0, FL), (x1, FL), 5)
    for d in drops:
        tt, im, x = d[:3]
        kw = d[3] if len(d) > 3 else {}
        st.at(tt - LEAD, lambda s, im=im, x=x, kw=kw: s.solid(im, x, -im.height / 2 - 60, mass=kw.get("mass", 5),
                                                               angle=s.rng.uniform(-0.06, 0.06), z=3))

def sprinkle(t0, t1, im, n, xr=(300, 1800), mass=1.0):
    """Thả n vật nhỏ giống nhau rải đều trong [t0, t1]."""
    out = []
    for k in range(n):
        tt = t0 + (t1 - t0) * k / max(1, n - 1)
        out.append((tt + LEAD, im, xr[0] + (xr[1] - xr[0]) * ((k * 0.618) % 1), {"mass": mass, "lead": LEAD}))
    return out

def scenes(people):
    S = []
    def add(t1, fn):
        t0 = S[-1][1] if S else 0.0
        S.append((t0, t1, fn))
    a = lambda seg, ph=None, off=0.0: A(seg, ph, off)
    cut = lambda seg: A(seg, None, -0.25)

    # ---------------- MỞ ĐẦU (giữ như bản đã duyệt) ----------------
    add(A(8, "cỗ", -0.1), E.s_open)
    add(A(11, None, -0.2), E.s_scale)
    add(cut(19), E.s_ipo)
    add(A(21, None, -0.2), lambda t0, t1: E.s_company(t0, t1, people))
    add(cut(22), E.s_burn)
    add(cut(23), E.s_end)

    # ---------------- PHẦN 1: CLAUDE LÀ GÌ ----------------
    add(cut(25), lambda t0, t1: board(t0, t1, seed=101,
        heads=[(a(23), "PHẦN 1 · CLAUDE LÀ GÌ?", 84, RED)],
        drops=row([(a(24, "trợ lý"), mk([T("TRỢ LÝ AI", 66)], seed=1)),
                   (a(24, "biết đọc"), mk([T("ĐỌC", 66)], seed=2)),
                   (a(24, "biết viết"), mk([T("VIẾT", 66)], seed=3)),
                   (a(24, "suy nghĩ"), mk([T("SUY NGHĨ", 66)], seed=4)),
                   (a(24, "ChatGPT"), mk([T("GIỐNG CHATGPT", 50, RED)], seed=5))])))
    add(cut(28), lambda t0, t1: board(t0, t1, seed=102,
        heads=[(a(25), "CÁC BẠN CÓ THỂ NHỜ CLAUDE", 64, BLACK, (1056, 150))],
        drops=row([(a(25, "email"), mk([T("VIẾT EMAIL", 40)], seed=1, padx=30)),
                   (a(25, "viết bài"), mk([T("VIẾT BÀI", 40)], seed=2, padx=30)),
                   (a(25, "dịch"), mk([T("DỊCH TÀI LIỆU", 40)], seed=3, padx=30)),
                   (a(25, "tóm tắt"), mk([T("TÓM TẮT HỢP ĐỒNG", 40)], seed=4, padx=30)),
                   (a(25, "phân tích"), mk([T("PHÂN TÍCH SỐ LIỆU", 40)], seed=5, padx=30))], gap=20)
             + [(a(25, "AI viết"), mk([T("AI VIẾT PHẦN MỀM", 110, RED)], seed=6), 1056, {"mass": 12, "z": 4})],
        stamp_items=[(a(26, "đỉnh cao"), "ĐỈNH CAO CỦA CLAUDE", (1056, 330), -6, 80)]))
    add(cut(30), lambda t0, t1: board(t0, t1, seed=103,
        heads=[(a(28), "NGƯỜI TA DÙNG CLAUDE THEO 3 CÁCH", 70, BLACK)],
        drops=[(a(28, "ba cách"), num(1, 1), 230), (a(28, "ba cách", 0.15), num(2, 2), 1260), (a(28, "ba cách", 0.3), num(3, 3), 1720),
               (a(29, "ứng dụng"), mk([T("ỨNG DỤNG CLAUDE", 52, RED), T("ĐIỆN THOẠI · MÁY TÍNH", 32)], seed=4), 680),
               (a(29, "câu hỏi"), mk([T("HỎI CÂU HỎI CÁ NHÂN", 36)], seed=5), 680)]))
    add(cut(40), lambda t0, t1: board(t0, t1, seed=104, FL=900,
        heads=[(a(30), "CÁCH 2 · DOANH NGHIỆP", 76, RED)],
        drops=[(a(32, "móng"), mk([T("CLAUDE = NỀN MÓNG", 84, CREAM)], bg=RED, seed=1, minw=1100), 1056, {"mass": 30}),
               (a(33, "xây"), mk([T("NGÂN HÀNG", 50)], seed=2), 720),
               (a(33, "xây", 0.25), mk([T("CỬA HÀNG", 50)], seed=3), 1056),
               (a(33, "doanh nghiệp khác"), mk([T("BỆNH VIỆN", 50)], seed=4), 1390),
               (a(34, "API"), tag("API", 64, 5), 1750),
               (a(35, "nguồn nước"), mk([T("NHƯ VÒI NƯỚC", 40), T("TỪ NỀN MÓNG", 40)], seed=6), 1750),
               (a(39, "viết code"), mk([T("VIẾT CODE HỘ", 64, RED)], seed=7), 1056)]))
    add(cut(44), lambda t0, t1: board(t0, t1, seed=105,
        heads=[(a(40), "MÌNH CŨNG ĐANG DÙNG API", 66, BLACK)],
        drops=row([(a(40, "viết"), mk([T("VIẾT CODE", 48)], seed=1)),
                   (a(41, "trả lời"), mk([T("TRẢ LỜI KHÁCH HÀNG", 48)], seed=2)),
                   (a(41, "thông tin"), mk([T("TỔNG HỢP THÔNG TIN", 48)], seed=3)),
                   (a(41, "báo cáo"), mk([T("BÁO CÁO", 48)], seed=4))], gap=30),
        stamp_items=[(a(42, "80%"), "≈ 80% DOANH THU", (1056, 360), -5, 110)]))
    add(cut(46), lambda t0, t1: board(t0, t1, seed=106,
        heads=[(a(44), "CÁCH 3", 76, RED)],
        drops=[(a(44, "Claude Code"), mk([T("CLAUDE CODE", 120, RED), T("CÔNG CỤ CHO LẬP TRÌNH VIÊN", 44)], seed=1), 900, {"mass": 14}),
               (a(44, "viết trực tiếp"), glyph("</>", 230), 1620)]))

    # ---------------- PHẦN 2: BÁN AI NHƯ BÁN ĐIỆN ----------------
    def s_factory(t0, t1):
        st = board(t0, t1, seed=201, heads=[(a(46), "VẬN HÀNH & BÁN NHƯ THẾ NÀO?", 66, BLACK)],
                   drops=[(a(49, "nhà máy điện"), mk([T("= NHÀ MÁY ĐIỆN", 60)], seed=1), 1450),
                          (a(49, "sản xuất AI"), mk([T("NHƯNG SẢN XUẤT AI", 70, RED)], seed=2), 1450, {"z": 3})])
        factory(st, x=560, base=800, label="ANTHROPIC", puffs_t=a(50), puff_lab="TRÍ THÔNG MINH")
        return st
    add(cut(51), s_factory)
    add(cut(60), lambda t0, t1: meter(t0, t1, (a(55, "token"), a(59, None, 1.2)), 34,
        ["Xin", "chào", "Claude", "viết", "giúp", "mình", "email", "này", "cảm ơn", "nhé"], label="ĐỒNG HỒ TOKEN", seed=202,
        heads=[(a(51), "BÁN ĐIỆN", 64, BLACK, (470, 200), a(53)), (a(51), "KIỂU GÌ?", 64, BLACK, (470, 280), a(53)),
               (a(53), "DÙNG BAO NHIÊU", 60, RED, (470, 200)), (a(53), "TRẢ BẤY NHIÊU", 60, RED, (470, 275))],
        extra_drops=[(a(54, "kilowatt"), mk([T("ĐIỆN", 40), T("TÍNH THEO KWH", 34)], seed=1, minw=380), 520),
                     (a(55, "token"), mk([T("AI", 44, RED), T("TÍNH THEO TOKEN", 34, RED)], seed=2, minw=380), 520),
                     (a(57, "mỗi chữ"), mk([T("MỖI CHỮ VÀO / RA", 34), T("ĐỀU ĐƯỢC ĐẾM", 40, RED)], seed=3), 1600)]))
    add(cut(67), lambda t0, t1: board(t0, t1, seed=203,
        heads=[(a(60), "VÍ DỤ: MỘT NGÂN HÀNG", 70, BLACK)],
        drops=row([(a(61, "một triệu"), mk([T("1 TRIỆU CÂU HỎI / NGÀY", 46)], seed=1)),
                   (a(63, "vài xu", -0.3), glyph("×", 110, BLACK)),
                   (a(63, "vài xu"), mk([T("VÀI XU / CÂU", 46)], seed=2)),
                   (a(64, "30", -0.2), glyph("×", 110, BLACK)),
                   (a(64, "30", 0.1), mk([T("30 NGÀY", 46)], seed=3))], gap=30)
             + [(a(64, "hàng triệu"), mk([T("= HÀNG TRIỆU $ / THÁNG", 84, RED)], seed=4), 1056, {"mass": 14, "z": 4})],
        pours=[(a(64, "hàng triệu", 0.6), a(66, None, 1.5), 70, GOLD)],
        stamp_items=[(a(66, "mới"), "MỚI CHỈ 1 KHÁCH HÀNG", (1056, 330), -5, 80)]))
    leg01 = ("1 ĐỒNG XU = 0,1 TỶ $", a(69))
    src_s1 = ("Nguồn: hồ sơ S-1 của Anthropic – 6 tháng đầu 2026 (làm tròn)", a(69))
    add(cut(70), lambda t0, t1: bins(t0, t1, BW=460, seed=204, leg=leg01, src=src_s1,
        heads=[(a(67), "80% DOANH THU TỪ DOANH NGHIỆP", 66, BLACK, (1056, 140))],
        items=[dict(cx=700, n=131, color=GOLD, label="DOANH NGHIỆP", sub="6 THÁNG ĐẦU 2026", ta=a(69, "Nửa"), tb=a(69, "đô", -0.3),
                    fmt=lambda k, n: tien(13.1 * k / n), lab_t=a(67)),
               dict(cx=1412, n=0, color=RED, label="GÓI THÁNG", sub="?", lab_t=a(67, None, 1.0))]))
    add(cut(74), lambda t0, t1: board(t0, t1, seed=205,
        heads=[(a(70), "HỌ BÁN Ở ĐÂU?", 76, BLACK)],
        drops=[(a(71, "trực tiếp"), mk([T("BÁN TRỰC TIẾP", 60)], seed=1), 460),
               (a(71, "chợ"), mk([T("CHỢ ĐÁM MÂY", 64, RED), T("AMAZON · GOOGLE", 40)], seed=2), 1150),
               (a(72, "bấm"), mk([T("BẤM 1 NÚT", 56, CREAM)], bg=RED, seed=3), 1700),
               (a(72, "hóa đơn"), mk([T("HÓA ĐƠN AMAZON / GOOGLE", 38), T("+ CLAUDE", 50, RED)], seed=4), 1150, {"z": 4})],
        stamp_items=[(a(73, "tiện"), "RẤT TIỆN · DÙNG RẤT NHIỀU", (1056, 330), -5, 76)]))
    add(cut(84), lambda t0, t1: board(t0, t1, seed=206,
        heads=[(a(74), "GÓI THÁNG", 84, RED)],
        drops=row([(a(75, "đang dùng"), tag("GÓI MÌNH ĐANG DÙNG", 40, 1)),
                   (a(78, "Netflix"), mk([T("NHƯ NETFLIX", 50)], seed=2)),
                   (a(79), mk([T("SPOTIFY", 50)], seed=3)),
                   (a(80, "miễn phí"), mk([T("MIỄN PHÍ", 54), T("NHƯNG BỊ GIỚI HẠN", 32, RED)], seed=4))], gap=36),
        stamp_items=[(a(83, "trả tiền"), "MUỐN DÙNG NHIỀU = TRẢ TIỀN", (1056, 340), -5, 76)]))
    add(cut(87), lambda t0, t1: board(t0, t1, seed=207,
        heads=[(a(84), "CÁC GÓI", 76, BLACK)],
        drops=row([(a(84, "cá nhân"), mk([T("CÁ NHÂN", 60)], seed=1, minw=380)),
                   (a(84, "người dùng"), mk([T("NGƯỜI DÙNG", 60)], seed=2, minw=380)),
                   (a(86, "doanh nghiệp"), mk([T("DOANH NGHIỆP LỚN", 60, RED)], seed=3, minw=380))], gap=50)))
    add(cut(89), lambda t0, t1: bins(t0, t1, BW=460, seed=208, leg=("1 ĐỒNG XU = 0,1 TỶ $", t0), src=(src_s1[0], t0),
        items=[dict(cx=700, n=131, color=GOLD, label="DOANH NGHIỆP", sub="6 THÁNG ĐẦU 2026", pre=True, lab_t=t0,
                    fmt=lambda k, n: tien(13.1 * k / n)),
               dict(cx=1412, n=32, color=RED, label="GÓI THÁNG", sub="6 THÁNG ĐẦU 2026", ta=a(87, "3,2", -0.6), tb=a(87, "3,2", 0.6),
                    fmt=lambda k, n: tien(3.2 * k / n), tcol=RED, lab_t=t0)],
        stamp_items=[(a(88, "80%"), "80%", (700, 620), -8, 130), (a(88, "20%"), "20%", (1412, 620), 7, 130)]))

    # ---------------- PHẦN 3: CLAUDE CODE – GÀ ĐẺ TRỨNG VÀNG ----------------
    egg = egg_sprite()
    add(cut(92), lambda t0, t1: board(t0, t1, seed=301,
        heads=[(a(89), "TƯƠNG LAI: GÀ ĐẺ TRỨNG VÀNG", 72, RED)],
        drops=[(a(90, "Claude Code"), mk([T("CLAUDE CODE", 120, RED), T("CÔNG CỤ VIẾT PHẦN MỀM", 44)], seed=1), 1056, {"mass": 16})]
              + sprinkle(a(90, "gà"), a(91, None, 1.5), egg, 22, (330, 1780))))
    add(cut(94), lambda t0, t1: meter(t0, t1, (a(93, "cả ngày"), a(94, None, -0.4)), 30,
        ["def", "code", "if", "for", "return", "class", "print", "api", "fix", "test"], label="ĐỒNG HỒ TOKEN", seed=302,
        heads=[(a(92), "TẠI SAO", 64, BLACK, (470, 200), a(93, "cả ngày")), (a(92), "QUAN TRỌNG?", 64, BLACK, (470, 280), a(93, "cả ngày")),
               (a(93, "cả ngày"), "DÙNG CẢ NGÀY", 60, RED, (470, 200)), (a(93, "cả ngày"), "ĐỒNG HỒ QUAY LIÊN TỤC", 44, RED, (470, 270))],
        extra_drops=[(a(93, "lập trình viên"), mk([T("LẬP TRÌNH VIÊN", 40)], seed=1), 520),
                     (a(93, "làm nhanh"), mk([T("SẴN SÀNG", 40, RED), T("TRẢ TIỀN", 40, RED)], seed=2), 1600)]))

    def s_dev(t0, t1):
        st = bins(t0, t1, BW=420, seed=303, leg=("1 ĐỒNG XU = 200 $", a(95)),
                  heads=[(a(94), "THUÊ 1 LẬP TRÌNH VIÊN SENIOR", 64, BLACK, (1056, 140), a(100)),
                         (a(100), "BÂY GIỜ: TRẢ TIỀN CHO CLAUDE", 64, RED, (1056, 140))],
                  items=[dict(cx=520, n=50, color=GOLD, label="LẬP TRÌNH VIÊN", sub="VN · SINGAPORE · CHÂU ÂU · MỸ",
                              ta=a(95, "ba nghìn"), tb=a(95, "mười nghìn"), lab_t=a(94),
                              fmt=lambda k, n: f"{3000 if k * 200 < 3000 else k * 200:,} $ / THÁNG".replace(",", "."))],
                  stamp_items=[(a(102, "xong"), "THẾ LÀ XONG", (1450, 300), -6, 90)])
        add_drops(st, [(a(100, "trả tiền"), mk([T("CLAUDE VIẾT CODE", 60, RED)], seed=1), 1450),
                       (a(101, "check"), mk([T("+ 1 NGƯỜI KIỂM TRA LẠI", 44)], seed=2), 1450)], FL=960, x0=900)
        return st
    add(cut(104), s_dev)
    add(cut(109), lambda t0, t1: bins(t0, t1, BW=460, seed=304, leg=("1 ĐỒNG XU = 0,1 TỶ $", a(106)),
        src=("Nguồn: theo công ty – đầu năm 2026", a(105)),
        heads=[(a(104), "GÓI SẼ CÒN PHÁT TRIỂN HƠN NỮA", 64, BLACK, (1056, 140))],
        items=[dict(cx=1056, n=25, color=GOLD, label="CHỈ RIÊNG CLAUDE CODE", sub="DOANH THU / NĂM", ta=a(106, "hai"), tb=a(106, "đô"),
                    fmt=lambda k, n: f"{2.5 * k / n:.1f} TỶ $ / NĂM".replace(".", ","), lab_t=a(105))],
        stamp_items=[(a(107, "Một"), "CHỈ 1 SẢN PHẨM", (1560, 520), -7, 80)]))

    # ---------------- PHẦN 4: TIỀN ĐI ĐÂU ----------------
    add(cut(115), lambda t0, t1: bucket(t0, t1, [(a(109), a(114, None, 2.5), 140, lambda u: 1.0)], seed=401, t_fire=a(113, "tiền ra"),
        heads=[(a(110), "KIẾM NHIỀU THẾ, SAO PHẢI IPO?", 64, BLACK, (1056, 130), a(112)), (a(112), "TIỀN ĐI ĐÂU?", 90, RED, (1056, 130))],
        labels=[(a(109), "TIỀN VÀO", 64, BLACK, (430, 300)), (a(113, "tiền ra"), "TIỀN RA Ở ĐÂU?", 64, RED, (1600, 960))]))

    def s_costs(t0, t1):
        st = board(t0, t1, seed=402, heads=[(a(115, "hai loại"), "NHÀ MÁY ĐIỆN CÓ 2 LOẠI CHI PHÍ", 64, BLACK)],
                   drops=row([(a(116, "xây"), mk([T("1. XÂY NHÀ MÁY", 54, RED), T("CỰC ĐẮT · CHỈ 1 LẦN", 34)], seed=1)),
                              (a(117, "vận hành"), mk([T("2. VẬN HÀNH", 54, RED), T("THAN · NƯỚC · CÔNG NHÂN", 34)], seed=2))],
                             x0=820, gap=40),
                   stamp_items=[(a(118), "ANTHROPIC CŨNG VẬY", (1300, 330), -5, 80)])
        factory(st, x=440, base=800, label="NHÀ MÁY", w=480)
        return st
    add(cut(119), s_costs)
    chip = chip_sprite()
    data = mk([T("DỮ LIỆU", 30)], seed=9, padx=16, pady=8)
    add(cut(132), lambda t0, t1: board(t0, t1, seed=403,
        heads=[(a(119), "1. HUẤN LUYỆN AI = XÂY NHÀ MÁY", 66, RED)],
        drops=sprinkle(a(120, "dữ liệu"), a(121, None, 3.5), data, 26, (300, 1800))
              + [(a(122, "hàng tháng"), mk([T("CHẠY HÀNG THÁNG", 50)], seed=1), 450)]
              + sprinkle(a(123, "chip"), a(124, None, 0.8), chip, 36, (760, 1800), mass=2)
              + [(a(124, "hàng tỷ"), mk([T("HÀNG TỶ $", 110, RED)], seed=2), 1250, {"mass": 14, "z": 4}),
                 (a(125, "liên tục"), mk([T("LIÊN TỤC RA BẢN MỚI", 52)], seed=3), 500, {"z": 4})],
        stamp_items=[(a(131, "đắt"), "CHI PHÍ ĐẮT NHẤT", (1056, 330), -5, 90)]))
    add(cut(140), lambda t0, t1: bucket(t0, t1, [(a(132), a(137, None, 4), 130, lambda u: 1.0)], seed=404, t_fire=a(132, "đốt than"),
        heads=[(a(132), "2. VẬN HÀNH = ĐỐT THAN", 72, RED)],
        labels=[(a(133, "hỏi"), "MỖI CÂU HỎI", 54, BLACK, (430, 300)), (a(134, "tốn điện"), "TỐN ĐIỆN · THUÊ MÁY", 48, RED, (1600, 820)),
                (a(137, "lương"), "LƯƠNG KỸ SƯ AI", 54, RED, (1600, 920))]))
    w895 = weight_sprite("895 TỶ $")
    add(cut(150), lambda t0, t1: board(t0, t1, seed=405,
        heads=[(a(140), "ANTHROPIC KHÔNG TỰ LÀM CHIP", 66, BLACK)],
        drops=[(a(141, "thuê"), mk([T("THUÊ MÁY CHỦ", 60, RED), T("AMAZON · GOOGLE · ...", 36)], seed=1), 480),
               (a(143, "tám trăm"), w895, 1150, {"mass": 60, "box": (480, 300)}),
               (a(145, "dài hạn"), tag("HỢP ĐỒNG THUÊ DÀI HẠN", 44, 2), 1150, {"z": 4}),
               (a(146, "quán"), mk([T("NHƯ THUÊ QUÁN 10 NĂM", 46), T("ĐÔNG HAY VẮNG VẪN TRẢ", 34, RED)], seed=3), 1650)],
        src=("Nguồn: hồ sơ S-1 của Anthropic (bản sửa đổi 2/11/2026 ghi ~901 tỷ $)", a(143))))

    # ---------------- PHẦN 5: LỜI HAY LỖ ----------------
    add(cut(156), lambda t0, t1: scale(t0, t1, left=[(a(153, "lời"), 6)], right=[(a(153, "lỗ"), 6)], seed=501,
        heads=[(a(150), "CHI PHÍ LỚN NHƯ THẾ", 60, BLACK, (1056, 150), a(151)), (a(151), "LỜI HAY LỖ?", 130, RED, (1056, 220))],
        stamp_items=[(a(153, "vừa lời"), "VỪA LỜI VỪA LỖ", (1056, 1090), -4, 76)]))

    def s_years(t0, t1):
        st = bins(t0, t1, BW=380, R=24, TOP=520, seed=502, leg=("VÀNG = 1 $ THU VỀ · ĐỎ = TIỀN CHẠY MÁY", a(156)),
                  src=("Nguồn: hồ sơ S-1 của Anthropic (ước tính, làm tròn)", a(157)),
                  heads=[(a(156), "MỖI 1 $ THU VỀ, TỐN BAO NHIÊU TIỀN CHẠY MÁY?", 54, BLACK, (1056, 130), a(164)),
                         (a(164), "LỖ ĐỂ GIÀNH KHÁCH – NHƯ GRAB, SHOPEE NGÀY XƯA", 54, RED, (1056, 130), a(169)),
                         (a(169), "MỖI 1 $ THU VỀ, TỐN BAO NHIÊU TIỀN CHẠY MÁY?", 54, BLACK, (1056, 130))],
                  items=[dict(cx=420, n=0, color=GOLD, label="2024", sub="NĂM ĐẦU", lab_t=a(156, "2024")),
                         dict(cx=1056, n=0, color=GOLD, label="2025", lab_t=a(169, "2025")),
                         dict(cx=1692, n=0, color=GOLD, label="2026", lab_t=a(173, "2026"))],
                  stamp_items=[(a(159, "bán lỗ"), "LỖ ~1 $", (420, 420), -6, 76),
                               (a(170, "bốn mươi", 0.8), "LỜI ~40 CENT", (1056, 420), -5, 64),
                               (a(176, "tám mươi", 0.6), "LỜI 60–80 CENT", (1692, 420), 5, 58)])
        def pr(ta, tb, n, cx, col):
            st.pour(ta, tb, n, (cx - 150, cx + 150), -90, R=24, color=col)
        pr(a(157, "một đô", -0.5), a(157, "một đô", 0.6), 10, 420, GOLD)
        pr(a(157, "hai đô", -0.5), a(157, "hai đô", 1.2), 19, 420, RED)
        pr(a(170, "mỗi đô", -0.5), a(170, "mỗi đô", 0.5), 10, 1056, GOLD)
        pr(a(170, "bốn mươi", -0.4), a(170, "bốn mươi", 0.4), 6, 1056, RED)
        pr(a(173, "mỗi đô", -0.5), a(173, "mỗi đô", 0.5), 10, 1692, GOLD)
        pr(a(174, "sáu mươi", -0.4), a(174, "sáu mươi", 0.3), 3, 1692, RED)
        return st
    add(cut(177), s_years)
    add(cut(181), lambda t0, t1: board(t0, t1, seed=503,
        heads=[(a(177), "CHỈ TRONG 3 NĂM", 76, BLACK)],
        drops=[(a(179, "chi phí"), mk([T("CHI PHÍ BAN ĐẦU RẤT CAO", 60)], seed=1), 1056)],
        pours=[(a(177), a(179, None, 3.0), 110, GOLD)],
        stamp_items=[(a(178, "rất ít"), "HIẾM CÓ TRONG NGÀNH AI", (1056, 330), -5, 86)]))
    add(cut(189), lambda t0, t1: board(t0, t1, seed=504,
        heads=[(a(181), "BÁN TỪNG CÂU TRẢ LỜI", 70, BLACK, (1056, 150), a(184)), (a(184), "CÓ LỜI RỒI, SAO VẪN ĐỐT TIỀN?", 70, RED, (1056, 150))],
        drops=[(a(182, "hỏi"), mk([T("BẠN HỎI", 60)], seed=1), 500),
               (a(182, "trả lời"), mk([T("CLAUDE TRẢ LỜI", 60, RED)], seed=2), 980),
               (a(184, "đốt tiền"), glyph("?", 460), 1560, {"mass": 16})],
        stamp_items=[(a(183, "lời"), "ĐÃ CÓ LỜI", (740, 420), -6, 80)]))
    bowl, house = bowl_sprite(), house_sprite()
    add(cut(197), lambda t0, t1: board(t0, t1, seed=505,
        heads=[(a(190), "VÍ DỤ: MỘT QUÁN PHỞ", 70, BLACK, (1056, 150), a(194)), (a(194), "XÂY THÊM 100 CHI NHÁNH", 70, RED, (1056, 150))],
        drops=[(a(190, "phở"), bowl, 480, {"mass": 6})]
              + sprinkle(a(194, "một trăm"), a(194, None, 3.0), house, 60, (850, 1850), mass=1.5)
              + [(a(196, "âm"), mk([T("TÀI KHOẢN: ÂM", 84, CREAM)], bg=RED, seed=3), 1300, {"mass": 18, "z": 4})],
        stamp_items=[(a(191, "ba mươi"), "+30% MỖI BÁT", (480, 420), -6, 70)]))

    def s_raise(t0, t1):
        st = board(t0, t1, seed=506, heads=[(a(197), "ANTHROPIC CŨNG VẬY", 76, BLACK)],
                   drops=[(a(198, "bán"), mk([T("BÁN: CÓ LỜI", 64)], seed=1), 1300),
                          (a(198, "tốn quá"), mk([T("XÂY NHÀ MÁY AI: TỐN QUÁ NHIỀU", 50, RED)], seed=2), 1400, {"z": 4})],
                   stamp_items=[(a(201, "IPO"), "IPO ĐỂ CÓ TIỀN", (1350, 340), -6, 96)])
        factory(st, x=440, base=800, label="NHÀ MÁY AI", w=480)
        return st
    add(cut(204), s_raise)

    # ---------------- PHẦN 6: AMAZON & GOOGLE ----------------
    add(cut(214), lambda t0, t1: board(t0, t1, seed=601,
        heads=[(a(204), "AMAZON & GOOGLE LÀ AI VỚI ANTHROPIC?", 62, BLACK)],
        drops=[(a(204, "Amazon"), mk([T("AMAZON", 90)], seed=1, minw=600), 560, {"mass": 14}),
               (a(204, "Google"), mk([T("GOOGLE", 90)], seed=2, minw=600), 1550, {"mass": 14}),
               (a(206, "nhà đầu tư"), tag("1. NHÀ ĐẦU TƯ", 50, 3), 560), (a(206, "nhà đầu tư", 0.2), tag("1. NHÀ ĐẦU TƯ", 50, 4), 1550),
               (a(207, "chủ nhà"), tag("2. CHỦ NHÀ · CHO THUÊ MÁY CHỦ", 40, 5), 560),
               (a(207, "chủ nhà", 0.2), tag("2. CHỦ NHÀ · CHO THUÊ MÁY CHỦ", 40, 6), 1550),
               (a(209, "đối thủ"), mk([T("3. ĐỐI THỦ · GEMINI", 46, CREAM)], bg=RED, seed=7), 1550)]))
    add(cut(230), lambda t0, t1: loop(t0, t1, "AMAZON", "ANTHROPIC", seed=602,
        steps=[(a(215, "đầu tư"), "ab", "1. ĐẦU TƯ TIỀN", 6), (a(217, "thuê"), "ba", "2. THUÊ LẠI MÁY CHỦ AMAZON", 6)],
        counter=(a(220, "doanh thu"), "+ GHI NHẬN DOANH THU"),
        heads=[(a(214), "CÁC BẠN NHÌN DÒNG TIỀN NHÉ", 62, BLACK, (1056, 120), a(224)),
               (a(224), "HỢP PHÁP · CÔNG KHAI – NHƯNG CẦN TỈNH TÁO", 58, RED, (1056, 120))],
        stamp_items=[(a(222, "vòng tròn"), "GIAO DỊCH VÒNG TRÒN", (1056, 600), -5, 50)]))

    # ---------------- PHẦN 7: BA CANH BẠC ----------------
    add(cut(241), lambda t0, t1: board(t0, t1, seed=701,
        heads=[(a(230), "ANTHROPIC ĐANG ĐẶT CƯỢC VÀO 3 ĐIỀU", 64, BLACK)],
        drops=[(a(231, "ba"), num(1, 1), 260), (a(231, "ba", 0.15), num(2, 2), 1220), (a(231, "ba", 0.3), num(3, 3), 1700),
               (a(237, "doanh nghiệp"), mk([T("DOANH NGHIỆP", 50, RED), T("DÙNG AI NHIỀU HƠN", 40)], seed=4), 620)],
        stamp_items=[(a(238, "canh bạc"), "CANH BẠC", (620, 470), -7, 80)]))
    add(cut(246), lambda t0, t1: bins(t0, t1, BW=440, R=20, seed=702, leg=("1 ĐỒNG XU = 1% LÃNH ĐẠO", a(241)),
        src=("Nguồn: Cloudera – State of Enterprise AI 2026 (1.500 lãnh đạo CNTT, 9 nước, khảo sát 9/2026)", a(241)),
        heads=[(a(241), "KHẢO SÁT 1.500 LÃNH ĐẠO CNTT", 60, BLACK, (1056, 140))],
        items=[dict(cx=700, n=89, color=RED, label="CẮT GIẢM / ĐỔI KẾ HOẠCH", sub="VÌ TỐN TIỀN", ta=a(241, "89%", -0.8), tb=a(241, "89%", 1.2),
                    fmt=lambda k, n: f"{k}%", tcol=RED, lab_t=a(241, "89%")),
               dict(cx=1412, n=11, color=GOLD, label="CÒN LẠI", ta=a(241, "89%", 1.2), tb=a(241, "89%", 1.8),
                    fmt=lambda k, n: f"{k}%", lab_t=a(241, "89%", 1.0))],
        stamp_items=[(a(243, "tín hiệu"), "TÍN HIỆU CẦN ĐỂ Ý", (1056, 520), -6, 80)]))
    add(cut(251), lambda t0, t1: board(t0, t1, seed=703,
        heads=[(a(246), "2. CHẠY AI NGÀY CÀNG RẺ", 76, RED)],
        drops=row([(a(247, "Chip"), mk([T("CHIP MỚI", 48)], seed=1)),
                   (a(247, "phần mềm"), mk([T("PHẦN MỀM TỐI ƯU", 48)], seed=2)),
                   (a(247, "chi phí giảm"), mk([T("CHI PHÍ GIẢM", 48)], seed=3)),
                   (a(247, "lợi nhuận"), mk([T("LỢI NHUẬN TĂNG", 48, RED)], seed=4))], gap=30),
        stamp_items=[(a(248, "diễn ra"), "ĐANG DIỄN RA KHÁ TỐT", (1056, 340), -5, 80)]))
    add(cut(272), lambda t0, t1: board(t0, t1, seed=704,
        heads=[(a(251), "3. CLAUDE PHẢI LUÔN ĐỦ GIỎI", 76, RED, (1056, 150), a(254)),
               (a(254), "ĐIỂM MẠNH: DOANH NGHIỆP + LẬP TRÌNH", 64, RED, (1056, 150))],
        drops=[(a(252, "OpenAI"), mk([T("CHATGPT", 60), T("OPENAI", 34)], seed=1), 440),
               (a(252, "Gemini"), mk([T("GEMINI", 60), T("GOOGLE", 34)], seed=2), 1056),
               (a(252, "Grok"), mk([T("GROK", 60), T("ELON MUSK", 34)], seed=3), 1670),
               (a(260, "ChatGPT"), tag("CHATGPT: TRỢ LÝ · GIẢI ĐÁP", 40, 4), 440),
               (a(262, "Claude"), mk([T("CLAUDE: LẬP TRÌNH · LÀM LUÔN CHO DOANH NGHIỆP", 50, CREAM)], bg=RED, seed=5), 1150, {"z": 4})]))
    add(cut(284), lambda t0, t1: bucket(t0, t1, [(a(272), a(283, None, 1.5), 230, lambda u: 0.4 + u)], hole=False, fire=False, seed=705,
        heads=[(a(272), "NẾU CẢ 3 LÁ BÀI ĐỀU THẮNG", 70, BLACK, (1056, 130))],
        labels=[(a(279, "giảm"), "GIẢM CHI XÂY DỰNG", 50, BLACK, (400, 460)), (a(282, "tiền vào"), "CHỈ CÒN TIỀN VÀO", 54, RED, (1640, 600))],
        stamp_items=[(a(283, "lãi rất"), "LÃI RẤT LỚN", (1056, 520), -6, 110)]))
    add(cut(288), lambda t0, t1: board(t0, t1, seed=706,
        heads=[(a(284), "CÒN NẾU THUA?", 84, RED)],
        drops=[(a(284, None, 0.4), mk([T("ANTHROPIC", 110)], seed=1), 1056, {"mass": 10}),
               (a(285, "895"), weight_sprite("895 TỶ $"), 1056, {"mass": 80, "box": (480, 300)})],
        stamp_items=[(a(285, "gánh nặng"), "GÁNH NẶNG CỰC LỚN", (1500, 340), -6, 76)]))

    # ---------------- TÓM TẮT ----------------
    add(cut(300), lambda t0, t1: board(t0, t1, seed=801,
        heads=[(a(296), "3 ĐIỂM MẤU CHỐT", 84, RED)],
        drops=row([(a(291, "bán AI"), mk([T("1. BÁN AI", 52, RED), T("NHƯ BÁN ĐIỆN", 34)], seed=1, padx=36, minw=420)),
                   (a(295, "bán thì"), mk([T("2. BÁN CÓ LỜI", 52, RED), T("VẪN ĐỐT TIỀN XÂY AI MỚI", 30)], seed=3, padx=36, minw=420)),
                   (a(298, "mua cổ phiếu"), mk([T("3. MUA CỔ PHIẾU", 52, RED), T("= ĐẶT CƯỢC VÀO AI", 34)], seed=4, padx=36, minw=420))], gap=60)
             + [(a(292, "dùng bao nhiêu"), tag("DÙNG BAO NHIÊU TRẢ BẤY NHIÊU", 26, 2), 420, {"z": 4})],
        stamp_items=[(a(299), "MẤU CHỐT NẾU MUỐN ĐẦU TƯ", (1056, 400), -4, 58)]))
    add(cut(316), lambda t0, t1: board(t0, t1, seed=802,
        heads=[(a(300), "CHƯA DỪNG Ở ĐÂY...", 76, BLACK, (1056, 150), a(315)), (a(315), "GIẢI THÍCH Ở VIDEO SAU", 76, RED, (1056, 150))],
        drops=[(a(301, "bán cổ phiếu"), mk([T("BẠN MUA CỔ PHIẾU", 56)], seed=1), 480),
               (a(303), mk([T("LLC NHÀ SÁNG LẬP: 50,1% PHIẾU", 40)], seed=2), 1380),
               (a(305), mk([T("QUỸ TÍN THÁC 5 GHẾ CHỌN ĐA SỐ HĐQT", 36)], seed=3), 1380),
               (a(307, "75"), mk([T("QUỸ CÔNG ÍCH ~75–100 TỶ $", 40, RED)], seed=4), 1380)],
        src=("Nguồn: hồ sơ S-1 của Anthropic; ước tính giá trị quỹ của AP", a(303)),
        stamp_items=[(a(302, "tiếng nói"), "GẦN NHƯ KHÔNG CÓ TIẾNG NÓI", (560, 440), -6, 52)]))
    add(None, lambda t0, t1: board(t0, t1, seed=803,
        heads=[(a(319), "CẢM ƠN CÁC BẠN!", 96, RED, (1056, 150))],
        drops=[(a(316, "thích"), mk([T("BẤM THÍCH", 60)], seed=1), 460),
               (a(316, "đăng ký"), mk([T("ĐĂNG KÝ KÊNH", 60, CREAM)], bg=RED, seed=2), 1056),
               (a(316, "chuông"), mk([T("BẬT CHUÔNG", 60)], seed=3), 1650),
               (a(317, "comment"), tag("COMMENT GÓP Ý CHO MÌNH", 50, 4), 1056)],
        stamp_items=[(a(318, "không phải"), "KHÔNG PHẢI LỜI KHUYÊN ĐẦU TƯ", (1056, 360), -4, 70)]))
    return S

def build(people):
    S = scenes(people)
    S[-1] = (S[-1][0], G["dur"], S[-1][2])
    out = []
    for t0, t1, fn in S:
        out.append(fn(t0, t1).run(extra=SLIDE + 0.1))
    return out

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

def main(voice, words, people, sfx_dir, out):
    G["words"] = json.load(open(words))
    ev.WORDS = G["words"]
    G["dur"] = G["words"][-1]["end"] + 2.0
    if os.environ.get("CHECK"):
        S = scenes(people)
        for t0, t1, fn in S:
            print(f"{t0:7.1f} → {(t1 or G['dur']):7.1f}  ({(t1 or G['dur']) - t0:5.1f}s)")
        return
    G["stages"] = build(people)
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
    mix_audio(voice, [os.path.join(sfx_dir, "music2.mp3"), os.path.join(sfx_dir, "music1.mp3")], sfx_dir, events, [], mixed, dur,
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
