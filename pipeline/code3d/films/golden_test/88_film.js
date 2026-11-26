// Phim thử tông màu thương hiệu: bình minh vàng trên sông quê thời Lê, nhân vật chớp mắt, mỉm cười. 10 giây.
// Ánh sáng ban ngày: dùng lại uniform trăng làm mặt trời thấp, trời cam - xanh, sương ấm.
U.uDay.value = 1; U.uMoonDir.value.set(-.85, .32, .18).normalize(); U.uMoonCol.value.setRGB(2.3, 1.45, .8);
U.uSkyCol.value.setRGB(.2, .25, .34); U.uGroundCol.value.setRGB(.07, .055, .04); U.uFogCol.value.setRGB(.78, .55, .38); U.uFogDen.value = .0032;
finalMat.uniforms.uGrade.value = 1; finalMat.uniforms.uExp.value = .62; flame.visible = false;
const DUR = 10;
const RIG = { hideR: [418, 630, 540, 880], split: { L: [[126, 360], [130, 540], [132, 580], [118, 620], [110, 660], [88, 700], [80, 760], [62, 800], [60, 870], [30, 1060]], R: [[398, 360], [394, 540], [392, 580], [405, 620], [413, 660], [434, 700], [430, 760], [457, 800], [462, 870], [500, 1060]] }, w: 527, h: 1431, height_m: 1.66, eyes: [[240, 137, 13, 5.5], [290, 137, 13, 5.5]], mouth: [265, 195, 19, 4], chin_y: 236,
  joints: { hip: [263, 700], neck: [263, 252], headTop: [263, 30], shL: [132, 292], elL: [64, 528], wrL: [48, 660], handL: [50, 840],
    shR: [398, 292], elR: [472, 528], wrR: [480, 660], handR: [478, 840], feet: [263, 1420] } };
const thanh = makePuppet(RIG, ASSET.le_than, ASSET.le_than_d);
thanh.addGrip(ASSET.fistR, { w: 685, h: 1024, anchor: [395, 330], axis: [245, 670], guard: [560, 930], scale: .17, z: .1 });
net.visible = false;
vnBanks({ x0: 7 });
function blinkAt(t, times) { let b = 0; for (const s of times) { const k = (t - s) / .16; if (k > 0 && k < 2) b = Math.max(b, 1 - Math.abs(k - 1)); } return b; }
function film(t) {
  if (t < 3.6) { const k = smooth(0, 3.6, t);   // cảnh rộng: sông giữa lũy tre, hàng cau, núi đá
    camera.position.set(lerp(4.5, 3.2, k), lerp(4.2, 2.6, k), lerp(24, 13, k)); camera.lookAt(0, lerp(2.2, 1.2, k), lerp(-25, 0, k)); camera.fov = 40; }
  else { const k = smooth(3.6, DUR, t);           // cận trung: nhân vật trên thuyền
    camera.position.set(lerp(2.8, 2.0, k), lerp(1.45, 1.35, k), lerp(4.8, 3.4, k)); camera.lookAt(.15, lerp(1.05, 1.15, k), 0); camera.fov = 34; } camera.aspect = W / H; camera.updateProjectionMatrix();
  boat.position.set(0, Math.sin(t * 1.1) * .03, 0); boat.rotation.set(Math.sin(t * .8) * .02, -.25, Math.sin(t * 1.3) * .025); boat.updateMatrixWorld(true);
  const base = boat.localToWorld(new THREE.Vector3(.1, .08, .05)); thanh.mesh.position.copy(base); thanh.face(camera.position); thanh.mesh.updateMatrixWorld(true);
  const raise = smooth(7.0, 8.8, t), talk = 0, smile = smooth(4.3, 5.0, t) * (1 - smooth(6.8, 7.4, t));
  thanh.pose({ chest: Math.sin(t * .9) * .015 + raise * .03, head: Math.sin(t * .6) * .04 + lerp(0, .08, smooth(3.8, 4.6, t)) * (1 - raise) - raise * .02,
    uarmL: Math.sin(t * 1.1) * .03, farmL: 0,
    uarmR: -Math.sin(t * 1.0) * .03 + raise * 2.35, farmR: raise * .5,
    blink: blinkAt(t, [.9, 4.3, 6.0, 8.7]), mouth: talk, smile });
  // gươm: khi giơ lên thì thay bàn tay xòe bằng bàn tay nắm chuôi gươm, lưỡi gươm mọc ra từ chắn tay
  const gr = thanh.updateGrip(raise > .3);
  blade.visible = !!gr;
  if (gr) { blade.position.copy(gr.guard); blade.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), gr.dir); }
  const glow = raise * (.6 + Math.sin(t * 2.3) * .1); bladeMat.uniforms.uGlow.value = glow;
  aura.position.copy(blade.localToWorld(new THREE.Vector3(.55, 0, 0))); aura.quaternion.copy(camera.quaternion); auraMat.uniforms.uA.value = glow * .8;
  U.uBladePos.value.copy(blade.position); U.uBlade.value = glow * .5;
  const fp = boat.localToWorld(new THREE.Vector3(1.85, 1.95, .3)); flame.position.copy(fp); flame.quaternion.copy(camera.quaternion);
  U.uTorchPos.value.copy(fp); U.uTorch.value = 0; flame.visible = false;
  updateAir(t);
  finalMat.uniforms.uFade.value = smooth(0, .8, t) * (1 - smooth(DUR - .8, DUR, t));
}
