// Cảnh quê Việt Nam hai bên bờ sông, dựng hoàn toàn bằng code: bờ đất cỏ, lau sậy, lũy tre, cau, chuối, nhà tranh.
// Cây dùng InstancedMesh (một hình học, nhiều bản sao) để nhẹ; lá đung đưa theo gió trong vertex shader.
function instMat(albedoGLSL, opts = {}) {
  return new THREE.ShaderMaterial({ side: opts.side || THREE.DoubleSide, uniforms: U,
    vertexShader: GL_NOISE + `uniform float uTime; varying vec3 vP; varying vec3 vN; varying vec3 vL; varying vec3 vC;
      void main(){ vec3 p = position; vec4 base = instanceMatrix * vec4(0.,0.,0.,1.);
        float sway = ${opts.sway || '0.'} * p.y * p.y;
        float ph = base.x * .37 + base.z * .21;
        p.x += sway * (sin(uTime * 1.3 + ph) * .6 + sin(uTime * 2.9 + ph * 1.7) * .25);
        p.z += sway * sin(uTime * 1.1 + ph * 1.3) * .4;
        vec4 w = modelMatrix * instanceMatrix * vec4(p, 1.); vP = w.xyz; vL = position;
        vN = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
        #ifdef USE_INSTANCING_COLOR
        vC = instanceColor;
        #else
        vC = vec3(1.);
        #endif
        gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: GL_NOISE + GL_LIGHT + `uniform float uClip; varying vec3 vP; varying vec3 vN; varying vec3 vL; varying vec3 vC;
      void main(){ if (uClip > .5 && vP.y < 0.) discard; vec3 P = vP, N = normalize(vN); if (!gl_FrontFacing) N = -N;
        vec3 alb = (${albedoGLSL}) * vC;
        vec3 V = normalize(uCamPos - P);
        vec3 c = light(P, N, alb, .08) + alb * uMoonCol * max(dot(-N, uMoonDir), 0.) * (.35 + uDay * .15) * vec3(.9,1.1,.5);   // ánh sáng xuyên lá
        gl_FragColor = vec4(fog(c, P), 1.); }` });
}
function addInstances(geo, mat, list) { // list: [{p:[x,y,z], r:[x,y,z], s:[x,y,z], c:[r,g,b]}]
  const m = new THREE.InstancedMesh(geo, mat, list.length), o = new THREE.Object3D(), col = new THREE.Color();
  list.forEach((it, i) => { o.position.set(...it.p); o.rotation.set(...(it.r || [0, 0, 0])); o.scale.set(...(it.s || [1, 1, 1])); o.updateMatrix(); m.setMatrixAt(i, o.matrix);
    m.setColorAt(i, col.setRGB(...(it.c || [1, 1, 1]))); });
  m.frustumCulled = false; scene.add(m); return m;
}
// độ cao bờ: từ mép nước (|x| = x0) dốc lên thành bãi phẳng
function bankH(x, z, x0) { const d = Math.abs(x) - x0; return d < 0 ? -1 : Math.min(d * .45, .9) + (fbm3(x * .15, 0, z * .15, 3) - .5) * .5 - .15; }
function vnBanks(o = {}) {
  const x0 = o.x0 || 7, z0 = o.z0 || 30, z1 = o.z1 || -170, seed = o.seed || 1;
  const R = k => hash(k * 13.37 + seed);
  // bờ đất
  const bankMat = litMat(`mix(vec3(.16,.11,.07), vec3(.06,.11,.04) * (.7 + .6*fbm(P*.8)), smoothstep(.0,.35,P.y + (fbm(P*.5)-.5)*.3))`, { spec: '.05' });
  for (const sd of [-1, 1]) {
    const g = new THREE.PlaneGeometry(26, z0 - z1, 60, 160).rotateX(-Math.PI / 2); const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i) + sd * (x0 + 11), z = p.getZ(i) + (z0 + z1) / 2; p.setXYZ(i, x, bankH(x, z, x0 + (fbm3(0, 0, z * .05, 2) - .5) * 3), z); }
    g.computeVertexNormals(); scene.add(new THREE.Mesh(g, bankMat));
  }
  const edge = (sd, z) => sd * (x0 + (fbm3(0, 0, z * .05, 2) - .5) * 3);
  // lau sậy, cỏ sát mép nước: phiến lá hẹp
  const blade = new THREE.BufferGeometry(); blade.setAttribute('position', new THREE.Float32BufferAttribute([-.02, 0, 0, .02, 0, 0, 0, 1, 0], 3)); blade.computeVertexNormals();
  const reeds = []; for (let i = 0; i < 5000; i++) { const sd = i % 2 ? 1 : -1, z = lerp(z0, z1 * .5, R(i)), x = edge(sd, z) + sd * (R(i + 1) * 2.2 - .4);
    const h = .5 + R(i + 2) * 1.1; reeds.push({ p: [x, bankH(x, z, Math.abs(edge(sd, z))) - .05, z], r: [(R(i + 3) - .5) * .5, R(i + 4) * 6.28, (R(i + 5) - .5) * .5], s: [1, h, 1], c: [.8 + R(i + 6) * .5, .9 + R(i + 7) * .4, .6] }); }
  addInstances(blade, instMat(`vec3(.09,.14,.05)`, { sway: '.18' }), reeds);
  // tre: thân cong (ống), lá thuôn mọc thành chùm ở nửa trên
  const culmCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 5, 0), new THREE.Vector3(1.6, 8.5, 0));
  const culm = new THREE.TubeGeometry(culmCurve, 24, .045, 6, false);
  const leaf = new THREE.BufferGeometry(); leaf.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, .05, .18, .015, 0, .42, 0, -.05, .18, -.015], 3)); leaf.setIndex([0, 1, 2, 0, 2, 3]); leaf.computeVertexNormals();
  const culms = [], leaves = [];
  const clumps = o.bamboo || 26;
  for (let k = 0; k < clumps; k++) { const sd = k % 2 ? 1 : -1, z = lerp(z0 - 5, z1 * .6, R(k + 100)), bx = edge(sd, z) + sd * (1.5 + R(k + 101) * 4);
    const by = bankH(bx, z, Math.abs(edge(sd, z)));
    const n = 9 + Math.floor(R(k + 102) * 8);
    for (let j = 0; j < n; j++) { const a = R(k * 31 + j) * 6.28, rr = R(k * 37 + j) * .6, hs = .75 + R(k * 41 + j) * .55;
      const yaw = Math.atan2(-Math.sin(a), Math.cos(a)) + (sd < 0 ? 0 : Math.PI) * 0 + (R(k * 43 + j) - .5) * 1.2 + (sd > 0 ? Math.PI : 0);
      const lean = .05 + R(k * 47 + j) * .2, x = bx + Math.cos(a) * rr, zz = z + Math.sin(a) * rr;
      culms.push({ p: [x, by - .1, zz], r: [0, yaw, lean], s: [hs, hs, hs], c: [.8 + R(j) * .3, .9 + R(j + 1) * .2, .7] });
      // lá: rải theo đường cong của thân
      const ob = new THREE.Object3D(); ob.position.set(x, by - .1, zz); ob.rotation.set(0, yaw, lean); ob.scale.setScalar(hs); ob.updateMatrixWorld();
      for (let q = 0; q < 70; q++) { const t = .45 + R(k * 53 + j * 7 + q) * .55, cp = culmCurve.getPoint(t);
        cp.x += (R(q * 3 + j) - .5) * .9 * t; cp.z += (R(q * 5 + j) - .5) * .9 * t; cp.y += (R(q * 7 + j) - .5) * .5;
        const wp = ob.localToWorld(cp.clone());
        leaves.push({ p: [wp.x, wp.y, wp.z], r: [2.2 + R(q + j) * 1.2, R(q * 11 + j) * 6.28, (R(q * 13 + k) - .5) * 1.4], s: [1.2, 1.2 + R(q) * .6, 1.2],
          c: [.75 + R(q * 17 + k) * .5, .85 + R(q * 19 + k) * .35, .6 + R(q * 23) * .3] }); } } }
  addInstances(culm, instMat(`mix(vec3(.09,.14,.05), vec3(.16,.17,.08), fbm(vL*3.))`, { sway: '.004' }), culms);
  addInstances(leaf, instMat(`vec3(.045,.10,.03)`, { sway: '.0' }), leaves);
  // cau: thân thẳng mảnh, có đốt, tán lá kép ở ngọn
  const trunk = new THREE.CylinderGeometry(.08, .11, 9, 8, 30); trunk.translate(0, 4.5, 0);
  { const p = trunk.attributes.position; for (let i = 0; i < p.count; i++) { const y = p.getY(i); p.setX(i, p.getX(i) + Math.sin(y * .25) * .15 * y / 9); } trunk.computeVertexNormals(); }
  const frond = new THREE.BufferGeometry(); { const ps = [], ix = [];
    for (let i = 0; i <= 16; i++) { const t = i / 16, y = Math.sin(t * 2.6) * 1.0, x = t * 2.4, w = Math.sin(t * 3.14) * .45;
      ps.push(x, y, 0, x - .1, y - .15, w, x - .1, y - .15, -w); if (i) { const a = (i - 1) * 3, b = i * 3; ix.push(a, b, b + 1, a, b + 1, a + 1, a, a + 2, b + 2, a, b + 2, b); } }
    frond.setAttribute('position', new THREE.Float32BufferAttribute(ps, 3)); frond.setIndex(ix); frond.computeVertexNormals(); }
  const palms = [], fronds = [];
  for (let k = 0; k < (o.areca || 22); k++) { const sd = k % 2 ? 1 : -1, z = lerp(z0, z1 * .7, R(k + 300)), x = edge(sd, z) + sd * (3 + R(k + 301) * 7);
    const y = bankH(x, z, Math.abs(edge(sd, z))), hs = .8 + R(k + 302) * .45, ry = R(k + 303) * 6.28;
    palms.push({ p: [x, y - .1, z], r: [0, ry, 0], s: [hs, hs, hs], c: [1, 1, 1] });
    const top = new THREE.Vector3(Math.sin(9 * .25) * .15 * hs, 9 * hs, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry).add(new THREE.Vector3(x, y - .1, z));
    for (let f = 0; f < 9; f++) fronds.push({ p: [top.x, top.y, top.z], r: [0, f / 9 * 6.28 + R(k * 7 + f) * .4, (R(k * 9 + f) - .5) * .5], s: [hs, hs, hs], c: [.8 + R(f) * .4, .9 + R(f + 1) * .3, .7] }); }
  addInstances(trunk, instMat(`vec3(.18,.17,.14) * (.8 + .4*step(.5, fract(vL.y*2.2)))`, { sway: '.0006' }), palms);
  addInstances(frond, instMat(`vec3(.08,.14,.04)`, { sway: '.02' }), fronds);
  // chuối: thân thấp, lá to bản, mép rách
  const bTrunk = new THREE.CylinderGeometry(.09, .14, 2.2, 8); bTrunk.translate(0, 1.1, 0);
  const bLeaf = new THREE.BufferGeometry(); { const ps = [], ix = [];
    for (let i = 0; i <= 12; i++) { const t = i / 12, x = t * 1.9, y = Math.sin(t * 2.2) * .7 - t * t * .5, w = Math.sin(t * 3.14) * .38 * (1 - .25 * Math.sin(t * 40));
      ps.push(x, y, 0, x, y - .06, w, x, y - .06, -w); if (i) { const a = (i - 1) * 3, b = i * 3; ix.push(a, b, b + 1, a, b + 1, a + 1, a, a + 2, b + 2, a, b + 2, b); } }
    bLeaf.setAttribute('position', new THREE.Float32BufferAttribute(ps, 3)); bLeaf.setIndex(ix); bLeaf.computeVertexNormals(); }
  const bt = [], bl = [];
  for (let k = 0; k < (o.banana || 30); k++) { const sd = k % 2 ? 1 : -1, z = lerp(z0 - 2, z1 * .5, R(k + 500)), x = edge(sd, z) + sd * (1.8 + R(k + 501) * 6);
    const y = bankH(x, z, Math.abs(edge(sd, z))), hs = .7 + R(k + 502) * .5; bt.push({ p: [x, y - .1, z], r: [0, 0, (R(k) - .5) * .15], s: [hs, hs, hs] });
    for (let f = 0; f < 7; f++) bl.push({ p: [x, y - .1 + 2.1 * hs, z], r: [0, f / 7 * 6.28 + R(k * 3 + f), (R(k * 5 + f) - .3) * .5], s: [hs, hs, hs], c: [.9 + R(f) * .3, 1 + R(f + 2) * .3, .7] }); }
  addInstances(bTrunk, instMat(`vec3(.14,.17,.07)`, { sway: '.002' }), bt);
  addInstances(bLeaf, instMat(`vec3(.09,.17,.05)`, { sway: '.03' }), bl);
  // nhà tranh: tường đất, mái tranh dốc
  const wallMat = litMat(`vec3(.25,.19,.12) * (.7 + .5*fbm(P*3.))`, { spec: '.03' }), roofMat = litMat(`vec3(.24,.2,.12) * (.6 + .6*fbm(vec3(P.x*2., P.y*14., P.z*2.)))`, { spec: '.03', side: THREE.DoubleSide });
  for (let k = 0; k < (o.huts || 3); k++) { const sd = k % 2 ? -1 : 1, z = -25 - k * 28 - R(k + 700) * 10, x = edge(sd, z) + sd * (6 + R(k + 701) * 3), y = bankH(x, z, Math.abs(edge(sd, z)));
    const hut = new THREE.Group(); hut.position.set(x, y - .1, z); hut.rotation.y = (R(k + 702) - .5) * .6 + (sd > 0 ? Math.PI / 2 : -Math.PI / 2); scene.add(hut);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(5, 1.9, 3.2), wallMat); wall.position.y = .95; hut.add(wall);
    const rs = new THREE.Shape(); rs.moveTo(-2.3, 0); rs.lineTo(0, 1.9); rs.lineTo(2.3, 0);
    const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(rs, { depth: 6, bevelEnabled: false }), roofMat); roof.rotation.y = Math.PI / 2; roof.position.set(-3, 1.85, 0); roof.scale.set(1, 1, 1); hut.add(roof);
    const door = new THREE.Mesh(new THREE.PlaneGeometry(.8, 1.4), litMat(`vec3(.02)`)); door.position.set(0, .7, 1.61); hut.add(door); }
}
