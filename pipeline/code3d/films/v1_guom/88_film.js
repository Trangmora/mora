// Phim thử: "Thanh sắt trong lưới". 20 giây. Kịch bản khung: máy quay, tư thế người, lưới, lưỡi gươm, đuốc.
const DUR = 20;
const SHOTS = [ // [bắt đầu, kết thúc, vị trí máy đầu, vị trí máy cuối, điểm nhìn đầu, điểm nhìn cuối, góc nhìn]
  [0, 6.5, [9, 6, 34], [5, 3.2, 17], [-2, 3, -30], [0, 1.2, 0], 38],
  [6.5, 12.5, [3.4, 1.5, 6.2], [2.4, 1.3, 4.6], [.2, .9, .6], [.2, 1.1, .7], 34],
  [12.5, 20, [-1.3, 1.15, 3.6], [-.9, 1.05, 3.0], [.25, 1.6, .2], [.25, 1.75, .15], 34]];
function film(t) {
  const s = SHOTS.find(x => t < x[1]) || SHOTS[SHOTS.length - 1], k = smooth(s[0], s[1], t) * .9 + clamp((t - s[0]) / (s[1] - s[0]), 0, 1) * .1;
  const p = s[2].map((v, i) => lerp(v, s[3][i], k)), l = s[4].map((v, i) => lerp(v, s[5][i], k));
  camera.position.set(p[0] + Math.sin(t * .7) * .04, p[1] + Math.sin(t * .9) * .03, p[2]); camera.lookAt(l[0], l[1], l[2]);
  camera.fov = s[6]; camera.aspect = W / H; camera.updateProjectionMatrix();
  // thuyền nhấp nhô
  boat.position.set(0, Math.sin(t * 1.1) * .03, 0); boat.rotation.set(Math.sin(t * .8) * .02, -.25, Math.sin(t * 1.3) * .025);
  boat.updateMatrixWorld(true);
  // tư thế: 0-6 thả lưới chờ; 6-11.5 kéo lưới (cúi xuống rồi đứng lên, ba nhịp); 12.5+ giơ lưỡi gươm lên ngắm
  const pull = smooth(6.2, 11.5, t), lift = smooth(12.6, 15, t), beat = Math.sin(clamp((t - 6.2) / 5.3, 0, 1) * Math.PI * 3);
  hip.rotation.x = lerp(lerp(.25, .55 - pull * .4 + beat * .12, smooth(5.5, 6.5, t)), .05, lift);
  hip.rotation.y = lerp(0, .5, lift);
  head.rotation.x = lerp(.35, -.25, lift); head.rotation.y = lerp(0, .25, lift);
  const reach = lerp(-1.25 + pull * .5 + beat * .25, -2.3, lift);
  armL.sh.rotation.set(reach, 0, -.15); armR.sh.rotation.set(lerp(reach, -1.1, lift), 0, .15);
  armL.el.rotation.set(lerp(-.6, -.4, lift), 0, 0); armR.el.rotation.set(lerp(-.6, -.9, lift), 0, 0);
  man.updateMatrixWorld(true);
  const hL = armL.hand.getWorldPosition(new THREE.Vector3()), hR = armR.hand.getWorldPosition(new THREE.Vector3());
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
  blade.rotation.set(0, lerp(-.25, -1.2, lift), lerp(.15, 1.15, lift));
  const glow = smooth(7.5, 11, t) * .7 + lift * .6 + Math.max(0, Math.sin(t * 2.3)) * .08 * lift;
  bladeMat.uniforms.uGlow.value = glow;
  aura.position.copy(blade.localToWorld(new THREE.Vector3(.55, 0, 0))); aura.quaternion.copy(camera.quaternion);
  auraMat.uniforms.uA.value = glow * (blade.position.y < 0 ? .5 : 1);
  U.uBladePos.value.copy(blade.position); U.uBlade.value = glow;
  // đuốc
  const fp = boat.localToWorld(new THREE.Vector3(1.85, 1.95, .3));
  boat.visible = true;
  flame.position.copy(fp); flame.quaternion.copy(camera.quaternion);
  U.uTorchPos.value.copy(fp); U.uTorch.value = 1 + (noise3(t * 6, 0, 0) - .5) * .35;
  updateAir(t);
  finalMat.uniforms.uFade.value = smooth(0, 1.2, t) * (1 - smooth(DUR - 1, DUR, t));
}
