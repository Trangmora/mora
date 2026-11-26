"""Ghép các khung hình thử st_<lang>_<t>.jpg thành một bảng xem nhanh. Dùng: sheet.py <thư_mục_r> <lang> <t1> <t2> ..."""
import cv2, numpy as np, sys
R, LG = sys.argv[1], sys.argv[2]; ims = []
for t in sys.argv[3:]:
    im = cv2.resize(cv2.imread(f'{R}/st_{LG}_{float(t):g}.jpg'), (400, 225)); cv2.putText(im, f'{float(t):g}', (330, 218), 0, .55, (0, 0, 255), 2); ims.append(im)
while len(ims) % 5: ims.append(np.zeros((225, 400, 3), np.uint8))
cv2.imwrite(f'{R}/../st_{LG}.jpg', np.vstack([np.hstack(ims[i:i + 5]) for i in range(0, len(ims), 5)]), [cv2.IMWRITE_JPEG_QUALITY, 74])
