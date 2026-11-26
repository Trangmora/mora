// Ảnh phong cảnh (OpenAI) thành không gian 2.5D: mỗi điểm ảnh đẩy ra xa theo bản đồ chiều sâu, nhìn từ một máy quay gốc.
// Máy quay di chuyển nhẹ sẽ có thị sai thật. Code thêm: mặt nước gợn lấp lánh (trong vùng nước đánh dấu), mây trôi, nắng lóa.
function makePlate(imgURL, depURL, o = {}) {
  const fov = (o.fov || 50) * Math.PI / 180, asp = o.aspect || 1.5, NX = 220, NY = 150, pos = [], uv = [], idx = [];
  const th = Math.tan(fov / 2);
  for (let j = 0; j <= NY; j++) for (let i = 0; i <= NX; i++) { pos.push(0, 0, 0); uv.push(i / NX, j / NY); }
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) { const a = j * (NX + 1) + i, b = a + 1, c = a + NX + 1, d = c + 1; idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
  const water = o.water || [[0, 1], [1, 1]];
  const mat = new THREE.ShaderMaterial({ uniforms: { tImg: { value: loadTex(imgURL) }, tDep: { value: loadTex(depURL) }, uTh: { value: th }, uAsp: { value: asp },
      uTime: U.uTime, uGain: { value: o.gain || 1 }, uWL: { value: new THREE.Vector3(...o.waterL) }, uWR: { value: new THREE.Vector3(...o.waterR) }, uHz: { value: o.horizon || .575 },
      uNear: { value: o.near || 5 }, uFar: { value: o.far || 700 } },
    vertexShader: `uniform sampler2D tDep; uniform float uTh, uAsp, uNear, uFar; varying vec2 vUv; varying float vD;
      void main(){ vUv = uv; float d = texture2D(tDep, uv).r; float dist = clamp(uNear / (pow(d, 1.6) + .008), uNear, uFar);
        vec3 dir = normalize(vec3((uv.x - .5) * 2. * uTh * uAsp, -(uv.y - .5) * 2. * uTh, -1.)); vec3 p = dir * dist; vD = dist;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(p, 1.); }`,
    fragmentShader: GL_NOISE + `uniform sampler2D tImg; uniform float uTime, uGain, uHz; uniform vec3 uWL, uWR; varying vec2 vUv; varying float vD;
      float bx(vec3 L, float v){ return v < L.z ? mix(L.x, L.y, (v - uHz) / (L.z - uHz)) : L.y; }
      void main(){ vec2 uv = vUv;
        // vùng nước: giữa hai đường bờ (mỗi bên là đường thẳng từ đường chân trời xuống), gợn sóng làm lệch ảnh phản chiếu
        float inW = step(uHz, uv.y) * step(bx(uWL, uv.y) - .01, uv.x) * step(uv.x, bx(uWR, uv.y) + .01);
        float k = smoothstep(uHz, uHz + .06, uv.y) * inW;
        float n = fbm(vec3(uv.x * 30., uv.y * 140. / (uv.y - uHz + .05) * .05 - uTime * .6, uTime * .3));
        uv.x += (n - .5) * .006 * k; uv.y += (n - .5) * .004 * k;
        // mây trôi chậm ở vùng trời
        float sky = smoothstep(.45, .2, vUv.y) * step(400., vD); uv.x += uTime * .0012 * sky;
        vec3 c = texture2D(tImg, uv).rgb;
        c += vec3(1., .8, .55) * pow(max(n - .55, 0.) * 2.2, 3.) * k * .5;   // lấp lánh
        gl_FragColor = vec4(pow(c, vec3(2.2)) * uGain, 1.); }` });
  mat.depthWrite = false; mat.depthTest = false;
  const mesh = new THREE.Mesh(g, mat); mesh.frustumCulled = false; mesh.renderOrder = -10;
  let px = null;
  mesh.worldAt = (u, v) => { const im = mat.uniforms.tDep.value.image;
    if (!px) { const cv = document.createElement('canvas'); cv.width = im.width; cv.height = im.height; const cx = cv.getContext('2d'); cx.drawImage(im, 0, 0); px = { d: cx.getImageData(0, 0, im.width, im.height).data, w: im.width, h: im.height }; }
    const d = px.d[(Math.min(px.h - 1, Math.floor(v * px.h)) * px.w + Math.min(px.w - 1, Math.floor(u * px.w))) * 4] / 255;
    const dist = clamp((o.near || 5) / (Math.pow(d, 1.6) + .008), o.near || 5, o.far || 700);
    return new THREE.Vector3((u - .5) * 2 * th * asp, -(v - .5) * 2 * th, -1).normalize().multiplyScalar(dist); };
  return mesh;
}
