// Vòng kết xuất: renderAt(t) vẽ đúng một khung (dùng khi chụp từng khung); khi mở trang bình thường thì tự chạy.
function renderAt(t) {
  U.uTime.value = t; film(t);
  if (Q.has('cam')) { const c = Q.get('cam').split(',').map(Number); camera.position.set(c[0], c[1], c[2]); camera.lookAt(c[3], c[4], c[5]); if (c[6]) { camera.fov = c[6]; camera.updateProjectionMatrix(); } }
  camera.updateMatrixWorld();
  U.uCamPos.value.copy(camera.position);
  renderReflection();
  renderer.setRenderTarget(hdrRT); renderer.render(scene, camera);
  if (window.STYLE === 'ink') inkRender(); else postRender();
}
window.renderAt = renderAt; window.FILM_DUR = DUR;
if (!Q.has('cap')) { const t0 = performance.now(); (function loop() { renderAt(((performance.now() - t0) / 1000) % DUR); requestAnimationFrame(loop); })(); }
window.READY = true;
