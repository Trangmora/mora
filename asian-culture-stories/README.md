# Asian Culture Stories

Mã dựng video và quy tắc cho kênh YouTube "Asian Culture Stories".

- `STYLE_GUIDE.md`: **đọc trước khi làm tập mới**.
- `pipeline/opening/`: mở đầu thủy mặc (WebGL 2.5D + chữ mực loang).
- `pipeline/scenes/`: phần chính giấy cắt (ảnh, chớp mắt và mỉm cười, chuyển cảnh theo bông hoa).
- `pipeline/audio/`: nhạc nền và tiếng động tự tạo.
- `episodes/01-shinto/`: lời dẫn và mốc thời gian của tập 1.

Các file trong `pipeline/` là bản chụp nguyên trạng từ tập 1. Đường dẫn và mốc thời gian trong đó còn gắn với tập 1, cần chỉnh khi dùng lại.

## Dựng cả tập (từ tập 1, bản đầy đủ)
- `pipeline/full/tts.py`: thu giọng Trang cho cả hai ngôn ngữ (lời trong `script.json`), xuất mốc thời gian `T_<lang>.json`.
- `pipeline/full/full.cjs <en|vi>`: render hình theo mốc thời gian. Gồm mở đầu và kết thủy mặc, cảnh giấy cắt, clip Wan, chuyển cảnh hoa, xé giấy và mờ, chữ con dấu. Xuất thêm `timeline_<lang>.json`.
- `pipeline/full/audio_full.py <lang>`: tạo nhạc và tiếng động từ timeline.
- **Ghép:** VO `atempo=0.9, adelay=1300`, nhạc ×0,85, grain 5.
- `assets/japan/index.json`: kho ảnh và clip đã tạo, **dùng lại trước khi tạo mới**.
