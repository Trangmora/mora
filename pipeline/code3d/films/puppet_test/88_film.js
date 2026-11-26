// Phim thử: nhân vật ảnh (OpenAI) làm rối có xương, đứng trên thuyền trong cảnh 3D code. 10 giây.
const DUR = 10;
const RIG = { split: { L: [[126, 360], [130, 540], [132, 580], [118, 620], [110, 660], [88, 700], [80, 760], [62, 800], [60, 870], [30, 1060]], R: [[398, 360], [394, 540], [392, 580], [405, 620], [413, 660], [434, 700], [430, 760], [457, 800], [462, 870], [500, 1060]] }, w: 527, h: 1431, height_m: 1.66, eyes: [[240, 137, 13, 5.5], [290, 137, 13, 5.5]], mouth: [265, 195, 19, 4], chin_y: 236,
  joints: { hip: [263, 700], neck: [263, 252], headTop: [263, 30], shL: [132, 292], elL: [64, 528], wrL: [48, 660], handL: [50, 840],
    shR: [398, 292], elR: [472, 528], wrR: [480, 660], handR: [478, 840], feet: [263, 1420] } };
const thanh = makePuppet(RIG, ASSET.le_than, ASSET.le_than_d);
net.visible = false;
function blinkAt(t, times) { let b = 0; for (const s of times) { const k = (t - s) / .16; if (k > 0 && k < 2) b = Math.max(b, 1 - Math.abs(k - 1)); } return b; }
function film(t) {
  const k = smooth(0, DUR, t);
  camera.position.set(lerp(3.0, 2.2, k), lerp(1.45, 1.35, k), lerp(5.4, 3.6, k)); camera.lookAt(.15, lerp(1.0, 1.15, k), 0);
  camera.fov = 34; camera.aspect = W / H; camera.updateProjectionMatrix();
  boat.position.set(0, Math.sin(t * 1.1) * .03, 0); boat.rotation.set(Math.sin(t * .8) * .02, -.25, Math.sin(t * 1.3) * .025); boat.updateMatrixWorld(true);
  const base = boat.localToWorld(new THREE.Vector3(.1, .08, .05)); thanh.mesh.position.copy(base); thanh.face(camera.position); thanh.mesh.updateMatrixWorld(true);
  const raise = smooth(5.2, 7.2, t), talk = t > 1.4 && t < 3.6 ? Math.max(0, Math.sin(t * 17) * .5 + Math.sin(t * 7.3) * .5) : 0;
  thanh.pose({ chest: Math.sin(t * .9) * .015 + raise * .03, head: Math.sin(t * .6) * .04 + lerp(0, .08, smooth(3.8, 4.6, t)) * (1 - raise) - raise * .02,
    uarmL: Math.sin(t * 1.1) * .03, farmL: 0,
    uarmR: -Math.sin(t * 1.0) * .03 + raise * 2.35, farmR: raise * .5,
    blink: blinkAt(t, [.9, 3.9, 6.0, 8.7]), mouth: talk });
  // gươm trong tay phải khi giơ lên
  const hand = thanh.world(RIG.joints.handR, 6), wr = thanh.world(RIG.joints.wrR, 6);
  blade.visible = raise > .02; blade.position.copy(hand);
  const dir = hand.clone().sub(wr).normalize(); blade.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
  const glow = raise * (.9 + Math.sin(t * 2.3) * .1); bladeMat.uniforms.uGlow.value = glow;
  aura.position.copy(blade.localToWorld(new THREE.Vector3(.55, 0, 0))); aura.quaternion.copy(camera.quaternion); auraMat.uniforms.uA.value = glow * .8;
  U.uBladePos.value.copy(blade.position); U.uBlade.value = glow * .5;
  const fp = boat.localToWorld(new THREE.Vector3(1.85, 1.95, .3)); flame.position.copy(fp); flame.quaternion.copy(camera.quaternion);
  U.uTorchPos.value.copy(fp); U.uTorch.value = 1.3 + (noise3(t * 6, 0, 0) - .5) * .35;
  updateAir(t);
  finalMat.uniforms.uFade.value = smooth(0, .8, t) * (1 - smooth(DUR - .8, DUR, t));
}
