// Phim thử tông màu thương hiệu: bình minh vàng trên sông quê thời Lê, nhân vật chớp mắt, mỉm cười. 10 giây.
// Ánh sáng ban ngày: dùng lại uniform trăng làm mặt trời thấp, trời cam - xanh, sương ấm.
U.uDay.value = 1; U.uMoonDir.value.set(-.85, .32, .18).normalize(); U.uMoonCol.value.setRGB(2.3, 1.45, .8);
U.uSkyCol.value.setRGB(.2, .25, .34); U.uGroundCol.value.setRGB(.07, .055, .04); U.uFogCol.value.setRGB(.78, .55, .38); U.uFogDen.value = .0032;
finalMat.uniforms.uGrade.value = 1; finalMat.uniforms.uExp.value = .62; flame.visible = false;
const DUR = 10, CUT = 5;
const RIG = { hideR: [418, 630, 540, 880], split: { L: [[126, 360], [130, 540], [132, 580], [118, 620], [110, 660], [88, 700], [80, 760], [62, 800], [60, 870], [30, 1060]], R: [[398, 360], [394, 540], [392, 580], [405, 620], [413, 660], [434, 700], [430, 760], [457, 800], [462, 870], [500, 1060]] }, w: 527, h: 1431, height_m: 1.66, eyes: [[240, 137, 13, 5.5], [290, 137, 13, 5.5]], mouth: [265, 195, 19, 4], chin_y: 236,
  joints: { hip: [263, 700], neck: [263, 252], headTop: [263, 30], shL: [132, 292], elL: [64, 528], wrL: [48, 660], handL: [50, 840],
    shR: [398, 292], elR: [472, 528], wrR: [480, 660], handR: [478, 840], feet: [263, 1420] } };
const thanh = makePuppet(RIG, ASSET.le_than, ASSET.le_than_d);
const boatM = boat.clone(), thanhM = new THREE.Mesh(thanh.mesh.geometry, thanh.mat); thanhM.frustumCulled = false; // bản phản chiếu xuống nước
let BP = null;
{ const dark = litMat(`vec3(.085,.05,.03) * (.7 + .5*n3(vec3(vL.x*14., vL.y*2., vL.z*2.)))`, { spec: '.2', side: THREE.DoubleSide });
  boat.traverse(o => { if (o.isMesh) o.material = dark; }); boatM.traverse(o => { if (o.isMesh) o.material = dark; });
  pole.visible = false; boatM.traverse(o => { if (o.geometry === pole.geometry) o.visible = false; }); }
thanh.addGrip(ASSET.fistR, { w: 685, h: 1024, anchor: [395, 330], axis: [245, 670], guard: [560, 930], scale: .17, z: .1 });
net.visible = false;
vnBanks({ x0: 7 });
function blinkAt(t, times) { let b = 0; for (const s of times) { const k = (t - s) / .16; if (k > 0 && k < 2) b = Math.max(b, 1 - Math.abs(k - 1)); } return b; }
// Cảnh 1: ảnh phong cảnh OpenAI dựng 2.5D + chim cò bay bằng code
const plateScene = new THREE.Scene();
const plate = makePlate(ASSET.p1, ASSET.p1_d, { fov: 50, aspect: 1.5, horizon: .575, waterL: [.45, 0., .8], waterR: [.66, 1., .74], gain: 1.15 }); plateScene.add(plate);
const NB2 = 14, egPos = new Float32Array(NB2 * 4 * 3), egG = new THREE.BufferGeometry(); egG.setAttribute('position', new THREE.BufferAttribute(egPos, 3));
plateScene.add(new THREE.LineSegments(egG, new THREE.LineBasicMaterial({ color: new THREE.Color(1.6, 1.5, 1.35) })));
function egrets(t) { for (let i = 0; i < NB2; i++) { const x = -18 + t * 1.6 + (i % 4) * 1.4 + hash(i) * 2, y = 6 + Math.floor(i / 4) * .9 + hash(i + 4) * .6, z = -60 - hash(i + 9) * 8;
  const f = Math.sin(t * 6.5 + i * 1.7) * .3, s = .45; [[x - s, y + f, z], [x, y, z], [x, y, z], [x + s, y + f, z]].forEach((q, k) => egPos.set(q, (i * 4 + k) * 3)); } egG.attributes.position.needsUpdate = true; }
function film(t) {
  // chuyển cảnh: nhá sáng vàng quanh mốc CUT
  const flash = Math.exp(-Math.pow((t - CUT) / .18, 2));
  if (t < CUT) { window.ACTIVE_SCENE = plateScene; const k = smooth(0, CUT, t);
    camera.position.set(lerp(0, .15, k), lerp(0, .1, k), lerp(0, -2.2, k)); camera.lookAt(lerp(0, .6, k), lerp(-1.2, -.6, k), -50);
    camera.fov = 40; camera.aspect = W / H; camera.updateProjectionMatrix(); U.uCamPos.value.copy(camera.position); egrets(t);
    finalMat.uniforms.uFade.value = smooth(0, .8, t); finalMat.uniforms.uExp.value = .62 * (1 + flash * 2.5); return; }
  window.ACTIVE_SCENE = plateScene; finalMat.uniforms.uExp.value = .62 * (1 + flash * 2.5);
  if (!plateScene.userData.set) { plateScene.userData.set = true; plateScene.add(boat); plateScene.add(thanh.mesh); plateScene.add(blade); plateScene.add(aura);
    plateScene.add(boatM); plateScene.add(thanhM); }
  t = t - CUT + 3.6;
  { const k = smooth(3.6, 8.6, t);           // máy quay ở gần gốc ảnh, ống kính tele nhìn xuống thuyền trên mặt sông của ảnh
    if (!BP) BP = plate.worldAt(.47, .8);
    camera.position.set(.25, .05, -.4 - k * .3); camera.lookAt(BP.x + .1, BP.y + lerp(1.0, 1.15, k), BP.z); camera.fov = lerp(15, 11.5, k); }
  camera.aspect = W / H; camera.updateProjectionMatrix();
  boat.position.set(BP.x, BP.y + Math.sin(t * 1.1) * .03, BP.z); boat.rotation.set(Math.sin(t * .8) * .02, -.25, Math.sin(t * 1.3) * .025); boat.updateMatrixWorld(true);
  const base = boat.localToWorld(new THREE.Vector3(.1, .08, .05)); thanh.mesh.position.copy(base); thanh.face(camera.position); thanh.mesh.updateMatrixWorld(true);
  { const wy = BP.y; boatM.position.set(boat.position.x, 2 * wy - boat.position.y, boat.position.z); boatM.rotation.set(-boat.rotation.x, boat.rotation.y, -boat.rotation.z); boatM.scale.set(1, -1, 1);
    thanhM.position.set(base.x, 2 * wy - base.y, base.z); thanhM.rotation.copy(thanh.mesh.rotation); thanhM.scale.set(1, -1, 1); }
  const raise = smooth(6.2, 7.6, t), talk = 0, smile = smooth(4.2, 4.9, t) * (1 - smooth(5.9, 6.4, t));
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
  finalMat.uniforms.uFade.value = 1 - smooth(9.0 - CUT + 3.6 + .2, 10 - CUT + 3.6, t);
}
