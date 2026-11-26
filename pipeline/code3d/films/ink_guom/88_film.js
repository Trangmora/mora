// Phim thử: "Thanh sắt trong lưới". 20 giây. Kịch bản khung: máy quay, tư thế người, lưới, lưỡi gươm, đuốc.
const DUR = 9;
const SHOTS = [[0, 9, [12, 7.5, 30], [4.2, 2.6, 11], [-4, 6, -60], [0, 1.3, 0], 40]];
// Kiểu thủy mặc: trời sáng mờ sương, mặt trời son đỏ, không đuốc
window.STYLE = 'ink'; U.uInk.value = 1;
U.uMoonDir.value.set(-.35, .32, -.88).normalize(); U.uMoonCol.value.setRGB(1.1, 1.08, 1.0); U.uSkyCol.value.setRGB(.95, .95, .95); U.uGroundCol.value.setRGB(.35, .35, .35);
U.uFogCol.value.setRGB(1.3, 1.3, 1.3); U.uFogDen.value = .004; U.uTorchCol.value.setRGB(0, 0, 0);
// đàn chim: nét chữ V vỗ cánh
const NB = 9, birdPos = new Float32Array(NB * 4 * 3), birdG = new THREE.BufferGeometry(); birdG.setAttribute('position', new THREE.BufferAttribute(birdPos, 3));
const birds = new THREE.LineSegments(birdG, new THREE.LineBasicMaterial({ color: 0x000000 })); scene.add(birds);
function updateBirds(t) { for (let i = 0; i < NB; i++) { const x = -30 + t * 2.2 + (i % 3) * 2.5 + hash(i) * 2, y = 16 + Math.floor(i / 3) * 1.6 + hash(i + 4), z = -40 - i * 1.5;
  const f = Math.sin(t * 7 + i * 1.7) * .45, s = .9; const P = [[x - s, y + f, z], [x, y, z], [x, y, z], [x + s, y + f, z]];
  P.forEach((q, k) => birdPos.set(q, (i * 4 + k) * 3)); } birdG.attributes.position.needsUpdate = true; }
function film(t) {
  updateBirds(t); const tt = t; t = t + 5.5;  // tư thế lấy từ đoạn kéo lưới
  const s = SHOTS.find(x => tt < x[1]) || SHOTS[SHOTS.length - 1], k = smooth(s[0], s[1], tt) * .9 + clamp((tt - s[0]) / (s[1] - s[0]), 0, 1) * .1;
  const p = s[2].map((v, i) => lerp(v, s[3][i], k)), l = s[4].map((v, i) => lerp(v, s[5][i], k));
  camera.position.set(p[0] + Math.sin(t * .7) * .04, p[1] + Math.sin(t * .9) * .03, p[2]); camera.lookAt(l[0], l[1], l[2]);
  camera.fov = s[6]; camera.aspect = W / H; camera.updateProjectionMatrix();
  // thuyền nhấp nhô
  boat.position.set(0, Math.sin(t * 1.1) * .03, 0); boat.rotation.set(Math.sin(t * .8) * .02, -.25, Math.sin(t * 1.3) * .025);
  boat.updateMatrixWorld(true);
  // tư thế: 0-6 thả lưới chờ; 6-11.5 kéo lưới (cúi xuống rồi đứng lên, ba nhịp); 12.5+ giơ lưỡi gươm lên ngắm
  const pull = smooth(6.2, 11.5, t), lift = smooth(12.6, 15, t), beat = Math.sin(clamp((t - 6.2) / 5.3, 0, 1) * Math.PI * 3);
  const bt = clamp((t - 6.2) / 5.3, 0, 1), crouch = smooth(5.4, 6.6, t) * (1 - lift);
  const breath = Math.sin(t * 1.7) * .018;
  BN.hip.position.y = .92 - crouch * (.05 + beat * .02);
  BN.thighL.rotation.x = -crouch * (.4 + beat * .1); BN.thighR.rotation.x = -crouch * (.32 + beat * .1);
  BN.shinL.rotation.x = crouch * (.65 + beat * .15); BN.shinR.rotation.x = crouch * (.55 + beat * .15);
  BN.footL.rotation.x = -crouch * .3; BN.footR.rotation.x = -crouch * .25;
  BN.spine.rotation.x = lerp(.12, .42 - pull * .18 + beat * .12, crouch) * (1 - lift) + lift * .02;
  BN.chest.rotation.x = lerp(.08, .2 + beat * .06, crouch) * (1 - lift) - lift * .08 + breath;
  BN.spine.rotation.y = lerp(0, .35, lift) + Math.sin(t * .6) * .03;
  BN.neck.rotation.x = lerp(.25, .12, lift); BN.head.rotation.x = lerp(.3 - beat * .1, -.45, lift); BN.head.rotation.y = lerp(Math.sin(t * .4) * .1, .15, lift);
  const reach = -(.95 + crouch * (.35 - beat * .3)) ;
  fisher.pose('uarmL', lerp(reach, -.25, lift), 0, lerp(.25, .1, lift)); fisher.pose('uarmR', lerp(reach, -2.75, lift), 0, lerp(-.25, .15, lift));
  BN.farmL.rotation.set(lerp(-.45 + beat * .25, -.3, lift), 0, 0); BN.farmR.rotation.set(lerp(-.45 + beat * .25, -.15, lift), 0, 0);
  BN.handL.rotation.x = -.2; BN.handR.rotation.x = lerp(-.2, .3, lift);
  boat.updateMatrixWorld(true);
  const hL = BN.handL.localToWorld(V3(0, -.05, .02)), hR = BN.handR.localToWorld(V3(0, -.05, .02));
  // lưới: mép trên giữa hai bàn tay, thân lưới chìm dưới nước rồi được kéo lên
  const top = hL.clone().add(hR).multiplyScalar(.5), depth = lerp(2.2, .55, pull), out = lerp(1.4, .5, pull);
  const P = (u, v) => new THREE.Vector3(top.x + (u - .5) * lerp(1.6, .8, v * pull), top.y - v * depth - Math.sin(u * Math.PI) * v * .2, top.z + v * out + .15);
  let n = 0; const put = q => { netPos[n++] = q.x; netPos[n++] = q.y; netPos[n++] = q.z; };
  for (let j = 0; j < NV - 1; j++) for (let i = 0; i < NU; i++) { put(P(i / (NU - 1), j / (NV - 1))); put(P(i / (NU - 1), (j + 1) / (NV - 1))); }
  for (let j = 0; j < NV; j++) for (let i = 0; i < NU - 1; i++) { put(P(i / (NU - 1), j / (NV - 1))); put(P((i + 1) / (NU - 1), j / (NV - 1))); }
  netG.attributes.position.needsUpdate = true; net.visible = t < 13.2; net.material.opacity = .8 * (1 - smooth(12.4, 13.2, t));
  // lưỡi gươm: nằm trong lưới (dưới nước), sáng dần; khi giơ lên thì nằm trong tay phải
  const inNet = P(.5, .85), held = hR.clone().add(new THREE.Vector3(0, .02, 0));
  blade.position.copy(inNet.clone().lerp(held, lift));
  blade.rotation.set(0, lerp(-.25, -1.3, lift), lerp(.15, 1.4, lift));
  const glow = smooth(7.5, 11, t) * .7 + lift * .6 + Math.max(0, Math.sin(t * 2.3)) * .08 * lift;
  bladeMat.uniforms.uGlow.value = glow;
  aura.position.copy(blade.localToWorld(new THREE.Vector3(.55, 0, 0))); aura.quaternion.copy(camera.quaternion);
  auraMat.uniforms.uA.value = glow * (blade.position.y < 0 ? .5 : 1);
  U.uBladePos.value.copy(blade.position); U.uBlade.value = glow;
  // đuốc
  const fp = boat.localToWorld(new THREE.Vector3(1.85, 1.95, .3));
  boat.visible = true;
  flame.visible = false; aura.visible = false;
  flame.position.copy(fp); flame.quaternion.copy(camera.quaternion);
  U.uTorchPos.value.copy(fp); U.uTorch.value = 1 + (noise3(t * 6, 0, 0) - .5) * .35;
  updateAir(t);
  inkMat.uniforms.uFade.value = smooth(0, 1.2, tt) * (1 - smooth(DUR - 1, DUR, tt));
}
