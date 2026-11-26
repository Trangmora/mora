// Thuyền gỗ, người đánh cá (dựng từ khối tròn xoay, trụ, cầu), đuốc, lưới và lưỡi gươm. Tư thế là hàm của thời gian.
const woodMat = litMat(`vec3(.20,.12,.07) * (.7 + .5*n3(vec3(vL.x*14., vL.y*2., vL.z*2.)))`, { spec: '.15' });
const tunicMat = litMat(`vec3(.22,.14,.08) * (.85 + .3*fbm(vL*18.))`, { spec: '.05' });
const darkMat = litMat(`vec3(.03,.03,.035) * (.8 + .4*fbm(vL*20.))`, { spec: '.1' });
const skinMat = litMat(`vec3(.55,.36,.24)`, { spec: '.25' });
// Thân thuyền: vỏ mở phía trên, mặt cắt nửa elip, hai đầu thon và cong lên (lưới đỉnh tự dựng)
function hullGeo(L = 4.4, Wd = .62, D = .38, nu = 48, nv = 14) {
  const pos = [], idx = [];
  for (let i = 0; i <= nu; i++) { const u = i / nu, x = (u - .5) * L, k = Math.abs(2 * u - 1);
    const w = Wd * Math.pow(Math.max(0, 1 - k * k), .55), d = D * (1 - .5 * k * k), rise = Math.pow(k, 2.5) * .45;
    for (let j = 0; j <= nv; j++) { const a = Math.PI + Math.PI * j / nv; pos.push(x, Math.sin(a) * d + rise + .05, Math.cos(a) * w); } }
  for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) { const a = i * (nv + 1) + j, b2 = a + nv + 1; idx.push(a, b2, a + 1, b2, b2 + 1, a + 1); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals(); return g;
}
const boat = new THREE.Group(); scene.add(boat);
const woodMat2 = litMat(`vec3(.20,.12,.07) * (.7 + .5*n3(vec3(vL.x*14., vL.y*2., vL.z*2.)))`, { spec: '.15', side: THREE.DoubleSide });
const hull = new THREE.Mesh(hullGeo(), woodMat2); hull.position.y = .12; boat.add(hull);
for (const x of [-1.2, -.2, .9]) { const sb = new THREE.Mesh(new THREE.BoxGeometry(.12, .04, 1.05), woodMat); sb.position.set(x, .3, 0); boat.add(sb); }
const cyl = (r1, r2, h, mat, seg = 14) => { const g = new THREE.CylinderGeometry(r1, r2, h, seg); g.translate(0, -h / 2, 0); return new THREE.Mesh(g, mat); };
// Người: dựng bằng SDF + bộ xương (40_human.js)
const fisher = window.NO_SDF_HUMAN ? null : makeHuman(); if (fisher) { fisher.mesh.position.set(.2, .02, .05); boat.add(fisher.mesh); }
const BN = fisher ? fisher.bones : null;
// Đuốc ở mũi thuyền
const pole = cyl(.025, .03, 1.5, woodMat); pole.position.set(1.85, 1.62, .3); boat.add(pole);
const flameMat = new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  vertexShader: `varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
  fragmentShader: GL_NOISE + `uniform float uTime; varying vec2 vU;
    void main(){ vec2 p = vU - vec2(.5,.18); float n = fbm(vec3(p.x*4., p.y*3. - uTime*3.2, uTime*.7));
      float w = .23 * (1. - smoothstep(0.,.8,p.y)) * (.7 + .6*n); float core = smoothstep(w, w*.2, abs(p.x + (n-.5)*.12*p.y*2.)) * smoothstep(-.12,.02,p.y) * smoothstep(.8,.1,p.y);
      vec3 c = mix(vec3(2.6,.7,.12), vec3(4.,2.8,1.2), smoothstep(.3,.9,core) * smoothstep(.5,.0,p.y));
      float glow = exp(-dot(p*vec2(2.,1.2),p*vec2(2.,1.2))*14.) * .35 * smoothstep(.5,.3,length(vU-.5));
      gl_FragColor = vec4(c*core + vec3(1.5,.6,.15)*glow, 1.); }` });
const flame = new THREE.Mesh(new THREE.PlaneGeometry(.55, .9), flameMat); scene.add(flame);
// Lưới: các đường dây, vị trí tính lại mỗi khung
const NU = 11, NV = 9, netPos = new Float32Array(((NU * (NV - 1)) + (NV * (NU - 1))) * 6);
const netG = new THREE.BufferGeometry(); netG.setAttribute('position', new THREE.BufferAttribute(netPos, 3));
const net = new THREE.LineSegments(netG, new THREE.LineBasicMaterial({ color: new THREE.Color(.35, .3, .22), transparent: true, opacity: .8 })); scene.add(net);
// Lưỡi gươm: lưỡi thẳng hai cạnh, chuôi; tự phát sáng màu vàng
const bladeMat = litMat(`vec3(.25,.24,.22)`, { spec: '.9', uniforms: { uGlow: { value: 0 } }, decl: 'uniform float uGlow;',
  extra: `emis = vec3(2.2,1.5,.55) * uGlow * (.6 + .4*n3(vec3(vL.x*6. - uTime*2., 0., 0.)));` });
const blade = new THREE.Group(); scene.add(blade);
{ const g = new THREE.BoxGeometry(1.05, .055, .012); g.translate(.52, 0, 0); blade.add(new THREE.Mesh(g, bladeMat));
  const tip = new THREE.ConeGeometry(.04, .12, 4).rotateZ(-Math.PI / 2); tip.translate(1.1, 0, 0); blade.add(new THREE.Mesh(tip, bladeMat)); }
const auraMat = new THREE.ShaderMaterial({ uniforms: { uA: { value: 0 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  vertexShader: `varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
  fragmentShader: `uniform float uA; varying vec2 vU; void main(){ vec2 p = (vU-.5)*2.; float r = dot(p,p)*2.;
    gl_FragColor = vec4(vec3(1.6,1.05,.35) * (exp(-r*4.) + .25*exp(-r*1.2)) * smoothstep(1., .55, length(vU-.5)*2.) * uA, 1.); }` });
const aura = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), auraMat); scene.add(aura);
