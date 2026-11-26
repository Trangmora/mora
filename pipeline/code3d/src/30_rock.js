// Núi đá vôi dạng tháp (karst): mặt tròn xoay có phình đầu, dời đỉnh bằng nhiễu; cây bụi trên mặt hướng lên.
const rockMat = litMat(`mix(vec3(.13,.135,.14) * (.55 + .9*fbm(vec3(P.x*.9, P.y*.07, P.z*.9))), vec3(.035,.085,.045) * (.6 + .8*fbm(P*2.3)), smoothstep(.25,.65, N.y + (fbm(P*.4)-.5)*1.1)) * (.65 + .6*fbm(P*1.7))`, { spec: '.05' });
function karst(x, z, h, r, seed) {
  const pts = [];
  for (let i = 0; i <= 24; i++) {
    const k = i / 24, bulge = 1 + .35 * Math.sin(k * Math.PI * .9 + seed) * k;
    let rr = r * (1.05 - .55 * k) * bulge; if (k > .9) rr *= Math.sqrt(Math.max(0, 1 - (k - .9) / .1)) * .9 + .1;
    pts.push(new THREE.Vector2(Math.max(rr, .01), k * h - 2));
  }
  const g = new THREE.LatheGeometry(pts, 40);
  displace(g, v => (fbm3(v.x * .12 + seed, v.y * .09, v.z * .12, 5) - .5) * r * .9 + (noise3(v.x * .6, v.y * .6, v.z * .6) - .5) * r * .12);
  const m = new THREE.Mesh(g, rockMat); m.position.set(x, 0, z); m.rotation.y = seed; scene.add(m); return m;
}
// Hai bờ sông và dãy núi xa: vị trí tính từ hạt giống cố định, lần nào tải cũng như nhau
for (let i = 0; i < 46; i++) {
  const side = i % 2 ? 1 : -1, z = 25 - i * 9 - hash(i) * 6;
  const x = side * (16 + hash(i + 7) * 30 + Math.max(0, -z) * .12);
  karst(x, z, 18 + hash(i + 3) * 40 + Math.max(0, -z) * .08, 5 + hash(i + 9) * 7, i * 1.7);
}
for (let i = 0; i < 26; i++) karst((hash(i + 50) - .5) * 360, -300 - hash(i + 60) * 250, 60 + hash(i + 70) * 90, 16 + hash(i + 80) * 18, i * 2.3);
