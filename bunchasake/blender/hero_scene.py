"""Bunchasake hero scene – "The Build".
Chạy: bvenv/bin/python blend/scene.py <out.png> <width> <height> <samples>
"""
import sys, math, random
import bpy
from mathutils import Vector, Euler

out, W, H, SAMPLES = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
HERE = __file__.rsplit("/", 1)[0]
random.seed(7)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def hexrgb(h, a=1.0):
    h = h.lstrip("#"); r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    lin = lambda c: c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4
    return (lin(r), lin(g), lin(b), a)

def mat(name, color, rough=.5, metal=0.0, coat=0.0, emit=None, emit_str=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = hexrgb(color)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Metallic"].default_value = metal
    p.inputs["Coat Weight"].default_value = coat
    if emit:
        p.inputs["Emission Color"].default_value = hexrgb(emit)
        p.inputs["Emission Strength"].default_value = emit_str
    return m

M_FLOOR = mat("floor", "#0b0b0b", rough=.32, coat=.2)
M_PLINTH = mat("plinth", "#121211", rough=.6)
M_DARK = mat("block_dark", "#161615", rough=.55)
M_MID = mat("block_mid", "#232321", rough=.48)
M_RED = mat("brand_red", "#ff3b1f", rough=.22, coat=.6, emit="#ff2a10", emit_str=1.6)
M_TEXT = mat("type", "#f2f2ee", rough=.45)

def cube(size, loc, rot=(0, 0, 0), m=M_DARK, bevel=.035):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object; o.scale = size if isinstance(size, tuple) else (size, size, size)
    bpy.ops.object.transform_apply(scale=True)
    b = o.modifiers.new("bevel", "BEVEL"); b.width = bevel; b.segments = 4; b.limit_method = "ANGLE"
    o.data.materials.append(m)
    bpy.ops.object.shade_smooth()
    return o

# Sàn
bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, 0))
bpy.context.object.data.materials.append(M_FLOOR)

# Bệ đá
PL_H = .42
cube((5.4, 3.4, PL_H), (0, 0, PL_H / 2), m=M_PLINTH, bevel=.03)

# Khối kim tự tháp, mỗi khối lệch nhẹ như được xếp bằng tay
S, GAP = .86, .045
z0 = PL_H
for level, n in enumerate([4, 3, 2]):
    off = (n - 1) / 2
    for i in range(n):
        for j in range(n):
            x, y = (i - off) * (S + GAP), (j - off) * (S + GAP)
            z = z0 + S / 2 + level * (S + .012)
            rz = math.radians(random.uniform(-2.2, 2.2))
            cube(S, (x + random.uniform(-.012, .012), y + random.uniform(-.012, .012), z), (0, 0, rz),
                 m=M_MID if (i + j + level) % 3 == 0 else M_DARK)

# Viên đỏ – dấu ấn Bunchasake – đang được đặt lên đỉnh
top_z = z0 + 3 * (S + .012) + S / 2 + .38
red = cube(S, (0, 0, top_z), (math.radians(6), math.radians(-4), math.radians(14)), m=M_RED, bevel=.05)

# Một khối đang rơi vào chỗ, gợi cảm giác "đang xây"
cube(S * .9, (-2.9, 1.1, 3.6), (math.radians(28), math.radians(17), math.radians(-22)), m=M_DARK)

# Chữ ký trên mặt trước bệ: bunchasake + chấm đỏ
font = bpy.data.fonts.load(f"{HERE}/InterTight-600.ttf")
bpy.ops.object.text_add(location=(-2.35, -1.705, PL_H * .32), rotation=(math.radians(90), 0, 0))
t = bpy.context.object; t.data.body = "bunchasake"; t.data.font = font
t.data.size = .30; t.data.extrude = .012; t.data.bevel_depth = .002; t.data.space_character = .98
t.data.materials.append(M_TEXT)
bpy.context.view_layer.update()
dims = t.dimensions
bpy.ops.mesh.primitive_uv_sphere_add(radius=.034, location=(-2.35 + dims.x + .07, -1.72, PL_H * .32 + .034))
bpy.context.object.data.materials.append(M_RED); bpy.ops.object.shade_smooth()

# Ánh sáng
def area(name, loc, rot, size, power, color="#ffffff"):
    bpy.ops.object.light_add(type="AREA", location=loc, rotation=rot)
    l = bpy.context.object; l.name = name; l.data.size = size; l.data.energy = power; l.data.color = hexrgb(color)[:3]
    l.visible_camera = False; l.visible_glossy = name != "rim"
    return l
area("key", (-4.5, -4.2, 6.5), (math.radians(48), 0, math.radians(-42)), 4.5, 1300, "#fff3e8")
area("rim", (3.8, 4.5, 4.2), (math.radians(-55), 0, math.radians(140)), 3.0, 1700, "#ff5a3a")
area("top", (0, 0, 9), (0, 0, 0), 6.0, 380, "#ffffff")
area("fill", (5.5, -3.5, 2.2), (math.radians(70), 0, math.radians(55)), 5.0, 160, "#cfd8ff")
bpy.ops.object.light_add(type="POINT", location=(0, 0, top_z + .1))
glow = bpy.context.object; glow.data.energy = 60; glow.data.color = hexrgb("#ff4a2e")[:3]; glow.data.shadow_soft_size = .4

# Nền
world = bpy.data.worlds.new("world"); scene.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = hexrgb("#0a0a0a")
world.node_tree.nodes["Background"].inputs["Strength"].default_value = .6

# Máy quay
bpy.ops.object.camera_add(location=(10.2, -11.2, 6.6))
cam = bpy.context.object; scene.camera = cam
cam.data.lens = 55
target = Vector((-.35, 0, 1.85))
cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
cam.data.dof.use_dof = True; cam.data.dof.focus_object = red; cam.data.dof.aperture_fstop = 3.2

# Render
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.render.resolution_x, scene.render.resolution_y = W, H
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Medium High Contrast"
scene.render.film_transparent = False
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = out
bpy.ops.render.render(write_still=True)
print("saved", out)
