# Bunchasake – cảnh Blender "The Build"

Hình đầu trang của bản 3D (`site/work/hero-build.jpg`) được dựng và render bằng Blender 5.2 (Cycles) từ script `hero_scene.py`.

- Khối đá đen xếp tầng, viên đỏ (dấu ấn Bunchasake) đang được đặt lên đỉnh, một khối đang rơi vào chỗ.
- Chữ ký "bunchasake" và chấm đỏ khắc trên mặt trước của bệ.
- Font: Inter Tight 600 (Google Fonts), cần đặt `InterTight-600.ttf` cạnh script.

Render lại:

```bash
python3.13 -m venv bvenv && bvenv/bin/pip install bpy==5.2.3
bvenv/bin/python hero_scene.py "$PWD/hero.png" 1600 1200 128
```

`hero-build-1600.png` là bản PNG gốc (chất lượng đầy đủ).
