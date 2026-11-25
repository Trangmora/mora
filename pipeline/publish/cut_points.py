"""Tìm mốc cắt khoảng 1 phút cho bản dọc, cắt đúng chỗ chuyển cảnh.
Dùng: python3 cut_points.py <work_dir> <lang> <thứ tự các phần, ví dụ op,act1,act2...> <log assemble> [mục tiêu=60]"""
import json, sys, ast, re
W, LANG, names, logf = sys.argv[1], sys.argv[2], sys.argv[3].split(','), sys.argv[4]
target = float(sys.argv[5]) if len(sys.argv) > 5 else 60
line = [l for l in open(logf) if l.startswith('dur')][-1]
dur = float(line.split()[1]); start = ast.literal_eval(line[line.index('{'):])
B = []
for n in names:
    if n == 'op': continue
    f = f'{W}/{n}_{LANG}_shots.json' if not (n == 'act1' and LANG == 'vi') else f'{W}/act1_shots.json'
    try: sj = json.load(open(f))
    except FileNotFoundError: sj = json.load(open(f'{W}/act1_shots.json'))
    B += [start[n]] + [start[n] + s['s'] for s in sj['shots'] if s['s'] > 0]
B = sorted(set(round(b, 2) for b in B)); cuts, last = [], 0.0
while dur - last > target * 1.25:
    cand = [b for b in B if 42 <= b - last <= 75]
    if not cand: break
    b = min(cand, key=lambda x: abs(x - last - target)); cuts.append(b); last = b
print(' '.join(str(c) for c in cuts)); print('parts', [round(b - a, 1) for a, b in zip([0] + cuts, cuts + [dur])], file=sys.stderr)
