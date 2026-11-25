"""Ráp cả tập Nho giáo: nối hình các phần, đặt giọng đọc, lập kế hoạch nhạc thăng trầm, rồi ghép (mix_dynamic.py).
Dùng (trong thư mục work): python3 ../assemble.py <lang>"""
import json, subprocess, wave, sys
import numpy as np
LANG = sys.argv[1]; SR = 44100
M = '../../../assets/music/'
FM, YE, IF = M + 'Finding_Movement_-_Kevin_MacLeod.mp3', M + 'Yearning_-_Nat_Keefe.mp3', M + 'Imperial_Forces_-_Aaron_Kenny.mp3'
op = json.load(open(f'op_{LANG}_silent.mp4.json'))
parts = [('op', f'op_{LANG}_silent.mp4', op['DUR'], f'vo_op_{LANG}.wav', op['OFF'], json.load(open(f'vo_op_{LANG}.json')))]
for name, sj, off in [('a1', f'a1_{LANG}_shots.json', 1.0), ('a2', f'a2_{LANG}_shots.json', 3.0),
                      ('a3', f'a3_{LANG}_shots.json', 3.0), ('a4', f'a4_{LANG}_shots.json', 3.0), ('a5', f'a5_{LANG}_shots.json', 2.5),
                      ('end', f'end_{LANG}_shots.json', 2.0)]:
    vo = f'vo_{name}_{LANG}'
    parts.append((name, f'{name}_{LANG}_silent.mp4', json.load(open(sj))['dur'], vo + '.wav', off, json.load(open(vo + '.json'))))
# nối hình
with open(f'concat_{LANG}.txt', 'w') as f:
    for p in parts: f.write(f"file '{p[1]}'\n")
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f'concat_{LANG}.txt', '-c', 'copy', f'full_{LANG}_silent.mp4'], check=True)
# giọng + mốc
start = {}; t = 0.0
for p in parts: start[p[0]] = t; t += p[2]
DUR = t; v = np.zeros(int(DUR * SR), '<i2')
def load(f): return np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout, '<i2')
A = {}
for name, _, d, vo, off, J in parts:
    x = load(vo); a = int((start[name] + off) * SR); v[a:a + len(x)] = x[:len(v) - a]
    A[name] = {k: start[name] + off + val for k, val in J['T'].items()}; A[name]['_s'] = start[name]; A[name]['_e'] = start[name] + d
    A[name]['_txt'] = ''.join(c for c, _ in J['chars']); A[name]['_ch'] = J['chars']; A[name]['_o'] = start[name] + off
w = wave.open(f'vo_full_{LANG}.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(v.tobytes()); w.close()
def word(name, wd):
    try: i = A[name]['_txt'].index(wd); return A[name]['_o'] + A[name]['_ch'][i][1]
    except ValueError: return None
s = lambda n: A[n]['_s']; e = lambda n: A[n]['_e']
ru = op['marks'].get('गंगा')
DR, RA, VA = M + 'Dreams_Of_River_Ganga_-_Hanu_Dixit.mp3', M + 'Raag_Ahir_Bhairav_-_Drut_Teentaal_Sarangi_Tabla_-_Sandeep_Das__Aneesh_Mishra.mp3', M + 'Asian_Drums_-_Vadodara_-_Kevin_MacLeod.mp3'
music = [[DR, 8, 0, e('op')], [RA, 20, s('a1'), e('a1')], [DR, 50, s('a2'), e('a3')], [VA, 10, s('a4'), e('a4')], [YE, 0, s('a5'), DUR]]
lv = [[0, .85], [op['OFF'], .85]]
if ru: lv += [[ru - 1, .6], [ru + .3, 1.0]]
lv += [[e('op') - .5, 1.0]]
for n in ['a1', 'a2', 'a3', 'a4', 'a5', 'end']:
    lv += [[s(n) - .6, .45], [s(n) + .2, .95], [A[n]['_o'] - .3, .95], [A[n]['_o'] + .5, .45]]
lv += [[A['end']['end'] - .2, .45], [A['end']['end'] + .8, 1.0], [DUR, 1.0]]
lv.sort()
mutes = []
for n, wd in [('a1', 'sức nước sẽ làm vỡ' if LANG == 'vi' else 'would shatter the earth'), ('a4', 'lại đang làm dòng sông ngạt thở' if LANG == 'vi' else 'is choking the river')]:
    t0 = word(n, wd)
    if t0: mutes.append([t0 - 1.0, t0 - .05])
sfx = []
if ru: sfx += [[ru + .2, 'bell', 1.0]]
sfx += [[s('a1') + .4, 'bell', .8], [s('a2') + .3, 'pluck', 1.0], [s('a3') + .3, 'pluck', .8], [s('a4') + .2, 'drum', .9], [s('a5') + .3, 'drum', .5], [A['end']['end'] + .4, 'bell', 1.0]]
for n in ['a1', 'a2', 'a3', 'a4', 'a5', 'end']:
    sj = json.load(open(f'{n}_{LANG}_shots.json'))
    sfx += [[s(n) + sh['s'] - .3, 'paper', 1.0] for sh in sj['shots'] if sh.get('tr') == 'tear' and sh['s'] > 0]
plan = {"dur": DUR, "vo": f'vo_full_{LANG}.wav', "duck": .2, "music": music, "levels": lv, "mutes": mutes, "sfx": sfx}
json.dump(plan, open(f'mix_full_{LANG}.json', 'w'), indent=1)
subprocess.run(['python3', '../../../pipeline/full/mix_dynamic.py', f'mix_full_{LANG}.json', f'full_{LANG}_silent.mp4', f'song_hang_{LANG}.mp4'], check=True)
print('dur', round(DUR, 1), {k: round(v, 1) for k, v in start.items()})
