"""Video 2 – danh sách giữ lại khi cắt giọng (số câu = dòng trong v2/segments.txt).
Theo story-of-the-company/LUAT_DUNG_VIDEO.md: giữ NGUYÊN đoạn giới thiệu Trang (1–12); bỏ câu vấp, lặp ý,
câu một mình "đúng không?/Đó."; cắt câu SAI hoặc KHÔNG KIỂM CHỨNG ĐƯỢC (ghi lý do ở từng dòng).
"""
ALL = "all"
KEEP = {i: ALL for i in range(1, 351)}

DROP = {
    18: "vấp: 'muốn phân tích trước khi muốn phân tích'",
    47: "đúng không? một mình", 50: "lặp 'năm miếng'", 49: "trùng ý với 51–52", 55: "lặp 5 miếng = 5% = 75 tỷ",
    59: "đúng không? một mình",
    61: "SAI: hồ sơ S-1 KHÔNG có mức tối đa (mỗi lần giá +50% thì thêm tới 2%, không ghi trần)",
    17: "Thì,", 78: "Thì,", 89: "Và,", 62: "Đó.", 68: "vấp", 70: "lặp ý 69", 71: "lặp ý 69", 74: "Đó.", 83: "Đó.", 93: "vấp", 101: "lặp 100",
    105: "đúng không?", 107: "vấp", 119: "nói dở", 121: "đúng không?", 127: "lặp nguyên ý 117–123", 130: "đúng không?",
    132: "lời rào", 133: "lời rào", 134: "lời rào", 135: "lời rào", 136: "lời rào",
    140: "vấp tên", 142: "vấp tên", 143: "vấp", 151: "Đó,", 152: "lặp 153", 160: "Đó.",
    161: "số tiền Microsoft đọc vấp/không rõ ('hàng nghìn thì ờm đô') – không đưa con số sai lên kênh",
    166: "vấp", 167: "vấp", 168: "vấp", 170: "vấp tên", 172: "vấp", 173: "vấp", 174: "vấp",
    182: "câu nối bỏ dở", 183: "ờm", 184: "lời rào", 185: "lời rào", 186: "lời rào", 187: "lời rào", 188: "lời rào", 189: "lời rào",
    200: "Đó.", 201: "lời rào", 202: "lời rào", 224: "Đó.", 231: "Đó.",
    249: "ờm", 250: "đó.", 252: "Đó.", 254: "ờm", 255: "xin lỗi vì ồn – không cần cho người xem",
    259: "KHÔNG KIỂM CHỨNG ĐƯỢC mốc '5 năm sau nhập vào Google, 2011 ngừng tài trợ' – hình sẽ nêu phần đã kiểm chứng",
    260: "Đó.", 264: "Đó.", 272: "đếm nhầm", 273: "đếm nhầm", 274: "đếm nhầm", 275: "đếm nhầm",
    312: "KHÔNG KIỂM CHỨNG: lương 400.000 $ (chính chủ kênh nói nguồn mạng xã hội, chưa kiểm chứng)",
    313: "theo 312", 314: "theo 312", 315: "theo 312", 316: "theo 312", 317: "theo 312", 318: "theo 312",
    326: "vấp", 327: "vấp", 328: "vấp", 329: "vấp", 330: "vấp", 334: "nói dở", 335: "tự sửa lại ở 336", 346: "lời rào",
}
for k in DROP:
    KEEP.pop(k, None)

# cắt trong câu
KEEP[24] = ["ngay trước đó thì họ tuyên bố lập một cái quỹ vì cộng đồng, nó trị giá khoảng tầm bảy lăm tỷ đô."]
KEEP[69] = ["phải chi ít nhất năm phần trăm tài sản cho từ thiện với quỹ khoảng bảy lăm tỷ đô ấy, thì nghĩa là từ bốn đến năm tỷ đô mỗi năm."]
KEEP[190] = ["mình muốn hiểu được là tại sao cái năm người đấy nó lại quyết định nhiều, nó theo tư tưởng nào, điều quan trọng là họ quyết định"]
KEEP[223] = ["mình cũng thấy nó hơi kỳ vì ví dụ như bản thân mình dùng thì mình thấy nó nhanh hơn."]
KEEP[234] = ["cái lúc này để", "bán cổ phiếu, bán IPO, phải không?"]
KEEP[333] = ["các cái lời hứa ý, thông thường đều viết là không có ràng buộc pháp lý"]  # bỏ "thứ ba là" (đếm nhầm: đây là ý thứ hai)
for k in (235, 311):  # "Thì" / "Và," đứng một mình
    KEEP.pop(k, None)
