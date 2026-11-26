"""Bản đồ chiều sâu (Depth Anything V2 small, ONNX) cho hiệu ứng 2.5D: ghi <ảnh>_d.png (sáng = gần).
Dùng: python3 pipeline/scenes/depth.py <model.onnx> <ảnh> ..."""
import sys, cv2, numpy as np, onnxruntime as ort
s = ort.InferenceSession(sys.argv[1]); inp = s.get_inputs()[0].name
for p in sys.argv[2:]:
    im = cv2.imread(p)[:, :, ::-1].astype(np.float32) / 255; h, w = im.shape[:2]
    x = cv2.resize(im, (518, 518)); x = (x - [.485, .456, .406]) / [.229, .224, .225]
    d = s.run(None, {inp: x.transpose(2, 0, 1)[None].astype(np.float32)})[0].squeeze()
    d = cv2.resize(d, (w, h)); d = (d - d.min()) / (d.max() - d.min() + 1e-6)
    out = p.rsplit('.', 1)[0] + '_d.png'; cv2.imwrite(out, (d * 255).astype(np.uint8)); print('ok', out)
