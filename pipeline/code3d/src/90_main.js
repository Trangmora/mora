// Vòng kết xuất: renderAt(t) vẽ đúng một khung (dùng khi chụp từng khung); khi mở trang bình thường thì tự chạy.
function renderAt(t) {
  U.uTime.value = t; film(t); camera.updateMatrixWorld();
  U.uCamPos.value.copy(camera.position);
  renderReflection();
  renderer.setRenderTarget(hdrRT); renderer.render(scene, camera);
  postRender();
}
window.renderAt = renderAt; window.FILM_DUR = DUR;
if (!Q.has('cap')) { const t0 = performance.now(); (function loop() { renderAt(((performance.now() - t0) / 1000) % DUR); requestAnimationFrame(loop); })(); }
window.READY = true;
