// Người dựng bằng hàm khoảng cách (SDF): các khối cầu, nang, nón tròn hòa trộn mềm thành một khối liền,
// lưới bề mặt tạo bằng thuật toán surface nets, rồi gắn bộ xương (SkinnedMesh) để khớp xoay thì da và áo uốn theo.
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
function sdCapsule(p, a, b, r) { const pa = p.clone().sub(a), ba = b.clone().sub(a); const h = clamp(pa.dot(ba) / ba.dot(ba), 0, 1); return pa.sub(ba.multiplyScalar(h)).length() - r; }
function sdRoundCone(p, a, b, r1, r2) { // nón tròn hai đầu (iq)
  const ba = b.clone().sub(a), l2 = ba.dot(ba), rr = r1 - r2, a2 = l2 - rr * rr, il2 = 1 / l2;
  const pa = p.clone().sub(a), y = pa.dot(ba), z = y - l2, x2v = pa.multiplyScalar(l2).sub(ba.clone().multiplyScalar(y)), x2 = x2v.dot(x2v), y2 = y * y * l2, z2 = z * z * l2;
  const k = Math.sign(rr) * rr * rr * x2;
  if (Math.sign(z) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - r2;
  if (Math.sign(y) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - r1;
  return (Math.sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
}
function sdEll(p, c, r) { const q = V3((p.x - c.x) / r.x, (p.y - c.y) / r.y, (p.z - c.z) / r.z), k0 = q.length(), q2 = V3(q.x / r.x, q.y / r.y, q.z / r.z), k1 = q2.length(); return k0 * (k0 - 1) / Math.max(k1, 1e-6); }
const smin = (a, b, k) => { const h = clamp(.5 + .5 * (b - a) / k, 0, 1); return lerp(b, a, h) - k * h * (1 - h); };
// Vật liệu theo nhãn: 0 da, 1 áo, 2 quần/khăn/tóc/râu (sẫm), 3 thắt lưng, 4 mắt
const ARM_ANG = 50 * Math.PI / 180;
function ARM(s) { const d = V3(s * Math.sin(ARM_ANG), -Math.cos(ARM_ANG), 0), sh = V3(s * .17, 1.37, 0), at = k => sh.clone().addScaledVector(d, k);
  const pr = V3(-d.y * s, d.x * s, 0); // vuông góc trong mặt phẳng xy
  return { el: at(.28), cuff: at(.5), wr: at(.53), palm: at(.6), fing: at(.65), thumb: at(.58).add(V3(0, 0, .035)), hd: at(.68) }; }
const HUMAN_COLORS = [[.5, .32, .22], [.07, .085, .13], [.035, .032, .035], [.09, .06, .04], [.02, .015, .015]];
function humanParts(o) { // tư thế gốc: đứng thẳng, tay chếch xuống; mặt nhìn về +z
  const sk = 0, cl = 1, dk = 2;
  const P = [];
  const cap = (a, b, r, lab, bone, k = .03) => P.push({ f: p => sdCapsule(p, a, b, r), lab, bone, k });
  const cone = (a, b, r1, r2, lab, bone, k = .03) => P.push({ f: p => sdRoundCone(p, a, b, r1, r2), lab, bone, k });
  const ell = (c, r, lab, bone, k = .02) => P.push({ f: p => sdEll(p, c, r), lab, bone, k });
  // đầu và mặt
  ell(V3(0, 1.555, .005), V3(.088, .112, .102), sk, 'head', .0);
  ell(V3(0, 1.49, .045), V3(.062, .05, .06), sk, 'head', .03);          // cằm, hàm
  cap(V3(0, 1.545, .098), V3(0, 1.505, .112), .016, sk, 'head', .015);   // mũi
  ell(V3(0, 1.507, .1), V3(.022, .012, .012), sk, 'head', .012);         // cánh mũi
  for (const s of [-1, 1]) {
    ell(V3(s * .036, 1.575, .088), V3(.03, .01, .012), dk, 'head', .006); // lông mày
    ell(V3(s * .052, 1.525, .07), V3(.03, .022, .03), sk, 'head', .02);   // gò má
    ell(V3(s * .088, 1.545, -.005), V3(.012, .028, .02), sk, 'head', .01); // tai
  }
  ell(V3(0, 1.465, .07), V3(.045, .04, .035), dk, 'head', .02);           // râu cằm
  cap(V3(-.025, 1.488, .095), V3(.025, 1.488, .095), .008, dk, 'head', .008); // ria
  ell(V3(0, 1.6, -.018), V3(.09, .062, .094), dk, 'head', .008);            // tóc + khăn
  cone(V3(0, 1.585, 0), V3(0, 1.605, 0), .102, .1, dk, 'head', .005);     // dải khăn quấn
  ell(V3(0, 1.665, -.035), V3(.042, .038, .042), dk, 'head', .02);        // búi tó
  cap(V3(0, 1.38, -.005), V3(0, 1.47, .0), .048, sk, 'neck', .03);        // cổ
  // thân áo giao lĩnh
  ell(V3(0, 1.27, .0), V3(.17, .16, .11), cl, 'chest', .05);
  cone(V3(0, 1.3, -.005), V3(0, 1.0, 0), .15, .14, cl, 'spine', .06);
  cone(V3(0, 1.0, 0), V3(0, .5, .01), .145, .22, cl, 'hip', .05);         // vạt áo dài tới gối
  cone(V3(0, 1.36, .0), V3(0, 1.38, 0), .075, .07, cl, 'chest', .04);     // cổ áo
  P.push({ f: p => { const q = p.clone().sub(V3(0, 1.0, 0)); const d = Math.hypot(q.x / 1.05, q.z / .8) - .148; return Math.hypot(d, q.y) - .022; }, lab: 2, bone: 'spine', k: .005 }); // thắt lưng vải
  for (const s of [-1, 1]) {
    const sh = V3(s * .17, 1.37, 0), A = ARM(s), el = A.el, wr = A.wr, hd = A.hd, bn = s < 0 ? 'L' : 'R';
    ell(V3(s * .14, 1.35, 0), V3(.07, .05, .07), cl, 'chest', .04);        // vai
    cone(sh, el, .062, .056, cl, 'uarm' + bn, .025);
    cone(el, A.cuff, .056, .052, cl, 'farm' + bn, .02);                    // tay áo
    cap(A.cuff, wr, .033, sk, 'farm' + bn, .015);                          // cổ tay
    ell(A.palm, V3(.042, .05, .028), sk, 'hand' + bn, .02);                // bàn tay
    ell(A.fing, V3(.03, .03, .022), sk, 'hand' + bn, .02);                 // ngón khép
    ell(A.thumb, V3(.014, .028, .014), sk, 'hand' + bn, .012);             // ngón cái
    const hp = V3(s * .085, .9, 0), kn = V3(s * .095, .48, .01), an = V3(s * .1, .08, 0);
    cone(hp, kn, .075, .06, dk, s < 0 ? 'thighL' : 'thighR', .03);
    cone(kn, an, .058, .042, dk, s < 0 ? 'shinL' : 'shinR', .02);
    cap(V3(s * .1, .07, -.02), V3(s * .1, .035, .02), .04, sk, s < 0 ? 'shinL' : 'shinR', .02); // gót, cổ chân
    cone(V3(s * .1, .035, .0), V3(s * .105, .022, .13), .038, .03, sk, s < 0 ? 'footL' : 'footR', .02); // bàn chân trần
  }
  // mắt: hốc khoét nhẹ + nhãn cầu sẫm
  const eyes = [-1, 1].map(s => V3(s * .034, 1.55, .088));
  return { P, eyes };
}
const BONES = { // tên: [cha, vị trí khớp (thế giới, tư thế gốc), điểm cuối để tính trọng số]
  hip: [null, V3(0, .92, 0), V3(0, 1.0, 0)], spine: ['hip', V3(0, 1.0, 0), V3(0, 1.2, 0)], chest: ['spine', V3(0, 1.2, 0), V3(0, 1.38, 0)],
  neck: ['chest', V3(0, 1.38, 0), V3(0, 1.46, 0)], head: ['neck', V3(0, 1.46, 0), V3(0, 1.62, 0)],
  uarmL: ['chest', V3(-.17, 1.37, 0), ARM(-1).el], farmL: ['uarmL', ARM(-1).el, ARM(-1).wr], handL: ['farmL', ARM(-1).wr, ARM(-1).hd],
  uarmR: ['chest', V3(.17, 1.37, 0), ARM(1).el], farmR: ['uarmR', ARM(1).el, ARM(1).wr], handR: ['farmR', ARM(1).wr, ARM(1).hd],
  thighL: ['hip', V3(-.085, .9, 0), V3(-.095, .48, .01)], shinL: ['thighL', V3(-.095, .48, .01), V3(-.1, .08, 0)], footL: ['shinL', V3(-.1, .06, 0), V3(-.105, .022, .13)],
  thighR: ['hip', V3(.085, .9, 0), V3(.095, .48, .01)], shinR: ['thighR', V3(.095, .48, .01), V3(.1, .08, 0)], footR: ['shinR', V3(.1, .06, 0), V3(.105, .022, .13)] };
function buildHumanGeometry(step = .0095) {
  const { P, eyes } = humanParts();
  const sdf = p => { let d = 1e9; for (const q of P) d = d > 1e8 ? q.f(p) : smin(d, q.f(p), q.k || .0001);
    for (const e of eyes) d = smin(d, sdEll(p, e, V3(.014, .008, .008)), .004); return d; };
  const lo = V3(-.72, -.03, -.3), hi = V3(.72, 1.74, .32), nx = Math.ceil((hi.x - lo.x) / step) + 1, ny = Math.ceil((hi.y - lo.y) / step) + 1, nz = Math.ceil((hi.z - lo.z) / step) + 1;
  const F = new Float32Array(nx * ny * nz), id = (i, j, k) => i + nx * (j + ny * k), p = V3();
  // chỉ tính SDF chính xác gần bề mặt: lấy mẫu thô trước để bỏ qua vùng trống
  const cs = 4, cx = Math.ceil(nx / cs) + 1, cy = Math.ceil(ny / cs) + 1, cz = Math.ceil(nz / cs) + 1, CF = new Float32Array(cx * cy * cz), cid = (i, j, k) => i + cx * (j + cy * k);
  for (let k = 0; k < cz; k++) for (let j = 0; j < cy; j++) for (let i = 0; i < cx; i++) { p.set(lo.x + i * cs * step, lo.y + j * cs * step, lo.z + k * cs * step); CF[cid(i, j, k)] = sdf(p); }
  const band = cs * step * 1.9;
  for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const fi = i / cs, fj = j / cs, fk = k / cs, i0 = Math.floor(fi), j0 = Math.floor(fj), k0 = Math.floor(fk), u = fi - i0, v = fj - j0, w = fk - k0;
    const c = (a, b, d) => CF[cid(Math.min(i0 + a, cx - 1), Math.min(j0 + b, cy - 1), Math.min(k0 + d, cz - 1))];
    const est = lerp(lerp(lerp(c(0,0,0), c(1,0,0), u), lerp(c(0,1,0), c(1,1,0), u), v), lerp(lerp(c(0,0,1), c(1,0,1), u), lerp(c(0,1,1), c(1,1,1), u), v), w);
    if (Math.abs(est) > band) { F[id(i, j, k)] = est; continue; }
    p.set(lo.x + i * step, lo.y + j * step, lo.z + k * step); F[id(i, j, k)] = sdf(p); }
  const vid = new Int32Array(nx * ny * nz).fill(-1), pos = [], idx = [];
  const E = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]], C = [[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[1,1,1]];
  for (let k = 0; k < nz - 1; k++) for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
    const v = C.map(c => F[id(i + c[0], j + c[1], k + c[2])]); let neg = 0; v.forEach(x => { if (x < 0) neg++; }); if (neg === 0 || neg === 8) continue;
    let sx = 0, sy = 0, sz = 0, n = 0;
    for (const [a, b] of E) { if ((v[a] < 0) === (v[b] < 0)) continue; const t = v[a] / (v[a] - v[b]);
      sx += C[a][0] + (C[b][0] - C[a][0]) * t; sy += C[a][1] + (C[b][1] - C[a][1]) * t; sz += C[a][2] + (C[b][2] - C[a][2]) * t; n++; }
    vid[id(i, j, k)] = pos.length / 3; pos.push(lo.x + (i + sx / n) * step, lo.y + (j + sy / n) * step, lo.z + (k + sz / n) * step);
  }
  const quad = (a, b, c, d, flip) => { if (a < 0 || b < 0 || c < 0 || d < 0) return; if (flip) idx.push(a, c, b, a, d, c); else idx.push(a, b, c, a, c, d); };
  for (let k = 1; k < nz - 1; k++) for (let j = 1; j < ny - 1; j++) for (let i = 1; i < nx - 1; i++) {
    const s0 = F[id(i, j, k)] < 0;
    if (s0 !== (F[id(i + 1, j, k)] < 0)) quad(vid[id(i, j - 1, k - 1)], vid[id(i, j, k - 1)], vid[id(i, j, k)], vid[id(i, j - 1, k)], s0);
    if (s0 !== (F[id(i, j + 1, k)] < 0)) quad(vid[id(i - 1, j, k - 1)], vid[id(i - 1, j, k)], vid[id(i, j, k)], vid[id(i, j, k - 1)], s0);
    if (s0 !== (F[id(i, j, k + 1)] < 0)) quad(vid[id(i - 1, j - 1, k)], vid[id(i, j - 1, k)], vid[id(i, j, k)], vid[id(i - 1, j, k)], s0);
  }
  // pháp tuyến từ gradient SDF, màu theo khối gần nhất, trọng số xương
  const N = pos.length / 3, nrm = new Float32Array(N * 3), col = new Float32Array(N * 3), si = new Uint16Array(N * 4), sw = new Float32Array(N * 4);
  const names = Object.keys(BONES), e = .002;
  for (let v = 0; v < N; v++) {
    p.set(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]);
    const g = V3(sdf(V3(p.x + e, p.y, p.z)) - sdf(V3(p.x - e, p.y, p.z)), sdf(V3(p.x, p.y + e, p.z)) - sdf(V3(p.x, p.y - e, p.z)), sdf(V3(p.x, p.y, p.z + e)) - sdf(V3(p.x, p.y, p.z - e))).normalize();
    nrm.set([g.x, g.y, g.z], v * 3);
    let best = 1e9, lab = 0, bone = 'hip';
    for (const q of P) { const d = q.f(p); if (d < best) { best = d; lab = q.lab; bone = q.bone; } }
    if (eyes.some(ey => sdEll(p, ey, V3(.014, .008, .008)) < .003)) lab = 4;
    col.set(HUMAN_COLORS[lab], v * 3);
    // trọng số: khoảng cách tới đoạn xương, ưu tiên xương của khối chứa đỉnh; vạt áo dưới hông bám hông nhiều hơn
    const ws = names.map((nm, bi) => { const [, a, b] = BONES[nm]; let d = Math.max(sdCapsule(p, a, b, 0), .004); let w = 1 / Math.pow(d, 4);
      if (nm === bone) w *= 6; if (lab === 1 && p.y < .95 && p.y > .45 && nm.startsWith('thigh')) w *= .25; return [w, bi]; }).sort((x, y) => y[0] - x[0]).slice(0, 4);
    if (lab === 1 && p.y < .98) { // vạt áo: bám hông là chính, hai đùi kéo nhẹ theo phía
      const k = smooth(.98, .5, p.y), side = clamp(p.x / .15, -1, 1);
      const W4 = [[1 - k * .45, names.indexOf('hip')], [k * .45 * (.5 - .5 * side), names.indexOf('thighL')], [k * .45 * (.5 + .5 * side), names.indexOf('thighR')], [0, names.indexOf('spine')]];
      W4.forEach(([w, bi], q) => { si[v * 4 + q] = bi; sw[v * 4 + q] = w; }); continue; }
    const tot = ws.reduce((s, x) => s + x[0], 0); ws.forEach(([w, bi], k) => { si[v * 4 + k] = bi; sw[v * 4 + k] = w / tot; });
  }
  for (let t = 0; t < idx.length; t += 3) { const [a, b, c] = [idx[t], idx[t + 1], idx[t + 2]];
    const A = V3(pos[a*3], pos[a*3+1], pos[a*3+2]), B = V3(pos[b*3], pos[b*3+1], pos[b*3+2]), Cc = V3(pos[c*3], pos[c*3+1], pos[c*3+2]);
    const fn = B.sub(A).cross(Cc.sub(A)); const nn = V3(nrm[a*3] + nrm[b*3] + nrm[c*3], nrm[a*3+1] + nrm[b*3+1] + nrm[c*3+1], nrm[a*3+2] + nrm[b*3+2] + nrm[c*3+2]);
    if (fn.dot(nn) < 0) { idx[t + 1] = c; idx[t + 2] = b; } }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  geo.setAttribute('acol', new THREE.BufferAttribute(col, 3)); geo.setAttribute('skinIndex', new THREE.BufferAttribute(si, 4)); geo.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
  geo.setIndex(idx); return geo;
}
const humanMat = new THREE.ShaderMaterial({ uniforms: Object.assign({}, U, { uWet: { value: 0 } }),
  vertexShader: `#include <common>
    #include <skinning_pars_vertex>
    attribute vec3 acol; varying vec3 vP; varying vec3 vN; varying vec3 vC; varying vec3 vL;
    void main(){
      #include <skinbase_vertex>
      #include <begin_vertex>
      #include <beginnormal_vertex>
      #include <skinning_vertex>
      #include <skinnormal_vertex>
      vec4 w = modelMatrix * vec4(transformed, 1.); vP = w.xyz; vL = position; vN = normalize(mat3(modelMatrix) * objectNormal); vC = acol;
      gl_Position = projectionMatrix * viewMatrix * w; }`,
  fragmentShader: GL_NOISE + GL_LIGHT + `uniform float uClip; varying vec3 vP; varying vec3 vN; varying vec3 vC; varying vec3 vL;
    void main(){ vec3 P = vP, N = normalize(vN); if (uClip > .5 && P.y < 0.) discard;
      float skin = step(.35, vC.r) * step(vC.b, .3);
      float cloth = 1. - skin;
      vec3 alb = vC * (1. + cloth * (.35*fbm(vL*60.) - .17 + .12*sin(vL.y*900.)*.0));
      vec3 V = normalize(uCamPos - P);
      vec3 c = light(P, N, alb, mix(.06, .3, skin));
      // tán xạ dưới da: viền sáng ấm khi đuốc chiếu ngược
      vec3 L = normalize(uTorchPos - P); c += skin * vec3(.9,.35,.15) * pow(max(dot(-N, L),0.)*.5 + .5*(1. - max(dot(N,V),0.)), 3.) * uTorch * .25;
      c += vec3(.25,.3,.45) * pow(1. - max(dot(N,V),0.), 4.) * .25;   // viền sáng ánh trăng
      gl_FragColor = vec4(fog(c, P), 1.); }` });
function makeHuman() {
  const geo = buildHumanGeometry(), bones = {}, list = [];
  for (const [nm, [par, at]] of Object.entries(BONES)) { const b = new THREE.Bone(); b.name = nm;
    const pp = par ? BONES[par][1] : V3(0, 0, 0); b.position.copy(at.clone().sub(pp)); bones[nm] = b; list.push(b); if (par) bones[par].add(b); }
  for (const [nm, s] of [['uarmL', -1], ['uarmR', 1]]) bones[nm].userData.base = new THREE.Quaternion().setFromAxisAngle(V3(0, 0, 1), -s * (ARM_ANG - .12));
  const mesh = new THREE.SkinnedMesh(geo, humanMat); mesh.add(bones.hip); mesh.bind(new THREE.Skeleton(list)); mesh.frustumCulled = false;
  const pose = (nm, x, y, z) => { const b = bones[nm], q = new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z));
    if (b.userData.base) q.multiply(b.userData.base); b.quaternion.copy(q); };
  return { mesh, bones, pose };
}
