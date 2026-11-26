"""Tách nền phông xanh thành nền trong suốt, khử viền xanh. Dùng: python3 key_green.py <vào.png> <ra.png>"""
import sys, numpy as np, cv2
im = cv2.imread(sys.argv[1]).astype(np.float32) / 255; b, g, r = im[..., 0], im[..., 1], im[..., 2]
gr = g - np.maximum(r, b)                                # độ "xanh"
a = 1 - np.clip((gr - .08) / .25, 0, 1)                  # alpha
a = cv2.GaussianBlur(a, (0, 0), .7)
g2 = np.minimum(g, np.maximum(r, b) * 1.02)              # khử loang xanh ở viền
out = np.dstack([b, g2, r, a]); ys, xs = np.where(a > .05)
out = out[max(ys.min() - 8, 0):ys.max() + 8, max(xs.min() - 8, 0):xs.max() + 8]
cv2.imwrite(sys.argv[2], (np.clip(out, 0, 1) * 255).astype(np.uint8)); print('ok', out.shape)
