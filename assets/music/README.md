# Thư viện nhạc nền

File âm thanh **không commit vào git** (`.gitignore`); chúng chỉ nằm trên máy làm việc. Muốn dùng ở phiên làm việc mới thì chủ kênh tải lên lại.
**Không dùng nhạc Artlist** (bị dính bản quyền). Ba bài Artlist đã xóa ngày 25/11/2026.
**Quy tắc:** dưới giọng đọc chỉ dùng bài **không lời**. Bài có lời chỉ dùng ở khoảng ngắt không có giọng đọc.

| File | Dài | Nước / chất liệu | Lời? | Nguồn (chủ kênh xác nhận không dính bản quyền, 25/11/2026) |
|---|---|---|---|---|
| Hon_Kyoku_-_Doug_Maxwell__Zac_Zinger | 2:28 | Nhật, shakuhachi, thiền | không | YouTube Audio Library |
| Aomori_Wings_-_The_Mini_Vandals | 2:03 | Nhật, hiện đại | không | YouTube Audio Library |
| Imperial_Forces_-_Aaron_Kenny | 1:47 | Á Đông, hùng tráng (chiến tranh, triều đình) | không | YouTube Audio Library |
| Finding_Movement_-_Kevin_MacLeod | 1:56 | Á Đông chung | không | Kevin MacLeod (CC-BY, phải ghi tên) |
| Asian_Drums_-_Vadodara_-_Kevin_MacLeod | 2:19 | Ấn Độ, trống | không | Kevin MacLeod (CC-BY, phải ghi tên) |
| Dreams_Of_River_Ganga_-_Hanu_Dixit | 2:22 | Ấn Độ | không | YouTube Audio Library |
| Bhaj_Le_Ram_-_Bhajan_Voice_Sarangi_Tabla | 2:27 | Ấn Độ, bhajan | **có** | YouTube Audio Library |
| Raag_Ahir_Bhairav_-_Drut_Teentaal_Sarangi_Tabla | 2:58 | Ấn Độ, raga | không | YouTube Audio Library |
| Hammersion_-_Ezra_Lipp | 2:00 | bộ gõ | không | YouTube Audio Library |
| Yearning_-_Nat_Keefe | 3:22 | cảm xúc, chậm | không | YouTube Audio Library |
| Daytime_Forrest_Bonfire | 3:04 | âm thanh rừng, lửa trại (không khí) | không | YouTube Audio Library |
| asian_background_music-wild-lotus-rhythms-japan-travel-220672 | 3:19 | Nhật, du lịch | không rõ | Pixabay |
| vprodmusic_asia_bgm-ha-long-bay-serenity-147067 | 2:41 | Việt Nam, êm | không rõ | Pixabay |
| vprodmusic_asia_bgm-vietnam-bamboo-flute-143601 | 2:33 | Việt Nam, sáo trúc | không rõ | Pixabay |
| soulprodmusic-welcome-to-korea-173264 | 2:13 | Hàn Quốc | không rõ | Pixabay |

**Gợi ý theo chủ đề:**
- **Nhật:** Hon Kyoku, Aomori Wings, Wild Lotus.
- **Việt Nam:** Ha Long Bay, Bamboo Flute.
- **Hàn Quốc:** Welcome to Korea.
- **Ấn Độ:** Ganga, Raag, Vadodara.
- **Cảnh chiến tranh hoặc triều đình:** Imperial Forces.
- **Cảnh buồn:** Yearning.

**Cách trộn** (`pipeline/full/musicbed.py`): nhạc ở mức 0,10 dưới giọng đọc, 0,72 ở khoảng ngắt, cao trào ở tên chủ đề, tắt ở đoạn tối đen.
