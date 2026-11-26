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
// Người: hông -> thân -> vai -> tay; trục quay ở khớp
const man = new THREE.Group(); man.position.set(.2, .0, .05); boat.add(man);
const legL = cyl(.075, .06, .72, darkMat); legL.position.set(-.1, .74, 0); man.add(legL);
const legR = cyl(.075, .06, .72, darkMat); legR.position.set(.1, .74, 0); man.add(legR);
const hip = new THREE.Group(); hip.position.y = .74; man.add(hip);
const torso = new THREE.Mesh(new THREE.LatheGeometry([[.0,-.32],[.24,-.3],[.22,-.05],[.19,.25],[.21,.5],[.12,.62],[.0,.64]].map(a => new THREE.Vector2(a[0], a[1])), 20), tunicMat);
hip.add(torso);
const belt = new THREE.Mesh(new THREE.TorusGeometry(.2, .03, 6, 20).rotateX(Math.PI / 2), darkMat); belt.position.y = .02; hip.add(belt);
const head = new THREE.Group(); head.position.y = .76; hip.add(head);
head.add(new THREE.Mesh(new THREE.SphereGeometry(.11, 20, 16).scale(.92, 1.08, 1), skinMat));
for (const sx of [-.038, .038]) { const ey = new THREE.Mesh(new THREE.SphereGeometry(.012, 8, 6), darkMat); ey.position.set(sx, .015, .095); head.add(ey); }
{ const no = new THREE.Mesh(new THREE.ConeGeometry(.016, .04, 8).rotateX(Math.PI / 2), skinMat); no.position.set(0, -.01, .11); head.add(no);
  const be = new THREE.Mesh(new THREE.SphereGeometry(.05, 10, 8).scale(1, .7, .6), darkMat); be.position.set(0, -.085, .07); head.add(be); }
const wrap = new THREE.Mesh(new THREE.CylinderGeometry(.118, .115, .07, 20), darkMat); wrap.position.y = .05; head.add(wrap);
const knot = new THREE.Mesh(new THREE.SphereGeometry(.05, 12, 10), darkMat); knot.position.set(0, .14, -.04); head.add(knot);
const neck = cyl(.045, .05, .14, skinMat); neck.position.y = .7; hip.add(neck);
function arm(side) {
  const sh = new THREE.Group(); sh.position.set(side * .21, .56, 0); hip.add(sh);
  const up = cyl(.055, .048, .32, tunicMat); sh.add(up);
  const el = new THREE.Group(); el.position.y = -.32; sh.add(el);
  const lo = cyl(.046, .036, .3, tunicMat); el.add(lo);
  const hand = new THREE.Mesh(new THREE.SphereGeometry(.045, 10, 8), skinMat); hand.position.y = -.32; el.add(hand);
  return { sh, el, hand };
}
const armL = arm(-1), armR = arm(1);
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
