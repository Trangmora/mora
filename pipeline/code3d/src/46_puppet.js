// Nhân vật "rối 2D có xương" đặt vào cảnh 3D: một tấm lưới mềm phủ ảnh nhân vật (nền trong suốt),
// mỗi đỉnh gắn trọng số với các xương 2D (thân, đầu, cánh tay, cẳng tay) để nghiêng, cúi, giơ tay;
// mí mắt và miệng vẽ bằng shader (chớp mắt, nói); bản đồ chiều sâu cho tấm hình có khối và nhận ánh sáng cảnh.
function makePuppet(rig, imgURL, depthURL) {
  const IW = rig.w, IH = rig.h, J = rig.joints, s = rig.height_m / IH;
  const R = rig.radii || { legs: 85, torso: 125, head: 52, uarm: 30, farm: 28 };
  const segs = [[J.hip, J.feet, 0, R.legs], [J.neck, [J.hip[0], J.hip[1] - 70], 1, R.torso], [J.headTop, [J.neck[0], J.neck[1] - 15], 2, R.head], [J.shL, J.elL, 3, R.uarm], [J.elL, J.handL, 4, R.farm], [J.shR, J.elR, 5, R.uarm], [J.elR, J.handR, 6, R.farm]];
  const dseg = (x, y, a, b) => { const bx = b[0] - a[0], by = b[1] - a[1], t = clamp(((x - a[0]) * bx + (y - a[1]) * by) / (bx * bx + by * by), 0, 1); return Math.hypot(x - a[0] - bx * t, y - a[1] - by * t); };
  const NX = 64, NY = 170, pos = [], px = [], si = [], sw = [], idx = [], sides = [];
  for (let j = 0; j <= NY; j++) for (let i = 0; i <= NX; i++) {
    const x = i / NX * IW, y = j / NY * IH; px.push(x, y); pos.push(0, 0, 0);
    // đường tách tay và thân (nếu có): bên ngoài chỉ theo xương tay, bên trong chỉ theo thân
    let side = 0; const sp = rig.split;
    if (sp) for (const [k, line] of [[-1, sp.L], [1, sp.R]]) { if (y < line[0][1] || y > line[line.length - 1][1]) continue;
      let bx = line[0][0]; for (let q = 0; q < line.length - 1; q++) if (y >= line[q][1] && y <= line[q + 1][1]) bx = lerp(line[q][0], line[q + 1][0], (y - line[q][1]) / (line[q + 1][1] - line[q][1]));
      if (k * (x - bx) > 0) side = k; else if (side === 0) side = 2; }
    sides.push(side);
    const ok = id => side === 0 ? true : side === 2 ? id <= 2 : side < 0 ? (id === 3 || id === 4) : (id === 5 || id === 6);
    const ws = segs.filter(sg => ok(sg[2])).map(([a, b, id, r]) => [1 / (Math.pow(Math.max(dseg(x, y, a, b) - r, 0) / 14, 4) + .01), id]).sort((p, q) => q[0] - p[0]).slice(0, 4);
    while (ws.length < 4) ws.push([0, 0]);
    const tot = ws.reduce((t, w) => t + w[0], 0); ws.forEach(([w, id]) => { si.push(id); sw.push(w / tot); });
  }
  const cut = (...v) => { const S = new Set(v.map(k => sides[k]).filter(x => x !== 0)); return S.size > 1; };
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) { const a = j * (NX + 1) + i, b = a + 1, c = a + NX + 1, d = c + 1;
    if (!cut(a, c, b)) idx.push(a, c, b); if (!cut(b, c, d)) idx.push(b, c, d); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('aPx', new THREE.Float32BufferAttribute(px, 2));
  g.setAttribute('aSi', new THREE.Float32BufferAttribute(si, 4)); g.setAttribute('aSw', new THREE.Float32BufferAttribute(sw, 4)); g.setIndex(idx);
  const B = Array.from({ length: 7 }, () => new THREE.Matrix3());
  const v2 = a => new THREE.Vector2(a[0], a[1]);
  const mat = new THREE.ShaderMaterial({ transparent: false, side: THREE.DoubleSide,
    uniforms: Object.assign({}, U, { tImg: { value: loadTex(imgURL) }, tDep: { value: loadTex(depthURL) }, uB: { value: B }, uSize: { value: new THREE.Vector2(IW, IH) },
      uS: { value: s }, uRelief: { value: .16 }, uBlink: { value: 0 }, uMouth: { value: 0 },
      uEye0: { value: new THREE.Vector4(...rig.eyes[0]) }, uEye1: { value: new THREE.Vector4(...rig.eyes[1]) }, uMo: { value: new THREE.Vector4(...rig.mouth) }, uChin: { value: rig.chin_y } }),
    vertexShader: `attribute vec2 aPx; attribute vec4 aSi; attribute vec4 aSw; uniform mat3 uB[7]; uniform vec2 uSize; uniform float uS, uRelief, uMouth, uChin; uniform vec4 uMo; uniform sampler2D tDep;
      varying vec2 vPx; varying vec3 vP; varying vec3 vN0; varying vec3 vAx, vAy, vAz;
      void main(){ vec3 q = vec3(aPx, 1.); vec2 p = vec2(0.);
        for (int k = 0; k < 4; k++) { int id = int(aSi[k] + .5); mat3 M = uB[0];
          if (id == 1) M = uB[1]; else if (id == 2) M = uB[2]; else if (id == 3) M = uB[3]; else if (id == 4) M = uB[4]; else if (id == 5) M = uB[5]; else if (id == 6) M = uB[6];
          p += (M * q).xy * aSw[k]; }
        // hàm dưới hạ xuống khi mở miệng
        float jaw = smoothstep(uMo.y - 2., uMo.y + 8., aPx.y) * smoothstep(uChin + 30., uChin - 5., aPx.y) * smoothstep(uMo.z * 2.6, uMo.z * .8, abs(aPx.x - uMo.x));
        p.y += jaw * uMouth * 5.;
        vec2 uv = aPx / uSize; float dep = texture2D(tDep, uv).r;
        vec3 lp = vec3((p.x - uSize.x * .5) * uS, (uSize.y - p.y) * uS, dep * uRelief);
        vec4 w = modelMatrix * vec4(lp, 1.); vP = w.xyz; vPx = aPx; vN0 = vec3(0.); vAx = mat3(modelMatrix)[0]; vAy = mat3(modelMatrix)[1]; vAz = mat3(modelMatrix)[2];
        gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: GL_NOISE + GL_LIGHT + `uniform sampler2D tImg, tDep; uniform vec2 uSize; uniform float uBlink, uMouth, uClip; uniform vec4 uEye0, uEye1, uMo; varying vec2 vPx; varying vec3 vP; varying vec3 vAx, vAy, vAz;
      vec4 tex(vec2 px){ return texture2D(tImg, px / uSize); }
      vec3 lid(vec3 c, vec4 e){ vec2 q = (vPx - e.xy) / e.zw; float r = length(q * vec2(1., .85));
        if (r > 1.25 || uBlink < .01) return c;
        float edge = mix(-1.3, 1.25, uBlink);                 // mí trên hạ xuống
        vec3 skin = tex(vec2(vPx.x, e.y + e.w * 2.3 + (vPx.y - e.y) * .3)).rgb * .9;
        float cover = smoothstep(edge + .12, edge - .12, q.y) * smoothstep(1.25, .95, r);
        c = mix(c, skin, cover);
        c *= 1. - .35 * smoothstep(.18, .0, abs(q.y - edge)) * smoothstep(1.1, .7, r) * step(.15, uBlink);  // đường mi
        return c; }
      void main(){ if (uClip > .5 && vP.y < 0.) discard;
        vec4 t = tex(vPx); if (t.a < .5) discard;
        vec3 c = t.rgb;
        c = lid(c, uEye0); c = lid(c, uEye1);
        if (uMouth > .02) { vec2 q = (vPx - uMo.xy - vec2(0., uMouth * 1.2)) / vec2(uMo.z * (.55 + .15 * uMouth), .5 + uMouth * 3.);
          float m = smoothstep(1., .6, length(q)); c = mix(c, mix(vec3(.16,.05,.045), vec3(.5,.45,.4), step(q.y, -.55) * .5), m * .9 * smoothstep(.02, .25, uMouth)); }
        vec3 alb = pow(c, vec3(2.2));
        float e = 2.; vec2 uv = vPx / uSize, d = 1. / uSize;
        float dx = texture2D(tDep, uv + vec2(d.x * e, 0.)).r - texture2D(tDep, uv - vec2(d.x * e, 0.)).r;
        float dy = texture2D(tDep, uv + vec2(0., d.y * e)).r - texture2D(tDep, uv - vec2(0., d.y * e)).r;
        vec3 Nl = normalize(vec3(-dx * 14., dy * 14., 1.));
        vec3 N = normalize(vAx * Nl.x + vAy * Nl.y + vAz * Nl.z);
        vec3 col = light(vP, N, alb * 1.7, .12) + alb * .05;
        gl_FragColor = vec4(fog(col, vP), 1.); }` });
  const mesh = new THREE.Mesh(g, mat); mesh.frustumCulled = false; scene.add(mesh);
  const P = { mesh, mat, rig,
    // góc (radian, dương = ngược chiều kim đồng hồ trên màn hình): chest, head, uarmL, farmL, uarmR, farmR
    pose(a) { const rot = (p, ang) => { const c = Math.cos(-ang), sn = Math.sin(-ang); return new THREE.Matrix3().set(c, -sn, p[0] - c * p[0] + sn * p[1], sn, c, p[1] - sn * p[0] - c * p[1], 0, 0, 1); };
      B[0].identity(); B[1].copy(rot(J.hip, a.chest || 0)); B[2].copy(B[1]).multiply(rot(J.neck, a.head || 0));
      B[3].copy(B[1]).multiply(rot(J.shL, a.uarmL || 0)); B[4].copy(B[3]).multiply(rot(J.elL, a.farmL || 0));
      B[5].copy(B[1]).multiply(rot(J.shR, a.uarmR || 0)); B[6].copy(B[5]).multiply(rot(J.elR, a.farmR || 0));
      mat.uniforms.uBlink.value = a.blink || 0; mat.uniforms.uMouth.value = a.mouth || 0; },
    // vị trí thế giới của một điểm ảnh sau khi xoay xương (ví dụ bàn tay để cầm gươm)
    world(pxpt, bone) { const v = new THREE.Vector3(pxpt[0], pxpt[1], 1).applyMatrix3(B[bone]);
      return mesh.localToWorld(new THREE.Vector3((v.x - IW / 2) * s, (IH - v.y) * s, .06)); },
    face(cam) { const w = mesh.getWorldPosition(new THREE.Vector3()); mesh.rotation.y = Math.atan2(cam.x - w.x, cam.z - w.z); } };
  P.pose({}); return P;
}
