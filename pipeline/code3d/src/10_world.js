// Bộ kết xuất, cảnh, uniform chung, vật liệu chiếu sáng tự viết (không dùng vật liệu dựng sẵn).
const canvas = document.createElement('canvas'); document.body.appendChild(canvas);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(W, H, false);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, W / H, .1, 2500);
const U = {
  uMoonDir: { value: new THREE.Vector3(-.28, .17, -.95).normalize() }, uMoonCol: { value: new THREE.Color(.20, .26, .42) },
  uSkyCol: { value: new THREE.Color(.035, .05, .10) }, uGroundCol: { value: new THREE.Color(.01, .012, .02) },
  uFogCol: { value: new THREE.Color(.028, .042, .085) }, uFogDen: { value: .006 },
  uTorchPos: { value: new THREE.Vector3() }, uTorchCol: { value: new THREE.Color(2.4, 1.05, .35) }, uTorch: { value: 1 },
  uCamPos: { value: new THREE.Vector3() }, uTime: { value: 0 }, uClip: { value: 0 },
  uBladePos: { value: new THREE.Vector3(0, -9, 0) }, uBlade: { value: 0 }
};
// Vật liệu: albedo viết bằng GLSL (biến P = vị trí thế giới, N = pháp tuyến), có thể tự phát sáng
function litMat(albedoGLSL, opts = {}) {
  return new THREE.ShaderMaterial({
    uniforms: Object.assign({}, U, opts.uniforms || {}), side: opts.side || THREE.FrontSide,
    vertexShader: `varying vec3 vP; varying vec3 vN; varying vec3 vL;
      void main(){ vec4 w = modelMatrix * vec4(position,1.); vP = w.xyz; vL = position; vN = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: GL_NOISE + GL_LIGHT + `varying vec3 vP; varying vec3 vN; varying vec3 vL;
      ${opts.decl || ''}
      uniform float uClip;
      void main(){ vec3 P = vP, N = normalize(vN); if (uClip > .5 && P.y < 0.) discard; if(!gl_FrontFacing) N = -N; vec3 emis = vec3(0.); float spec = ${opts.spec || '.1'};
        vec3 alb = ${albedoGLSL};
        ${opts.extra || ''}
        vec3 c = light(P, N, alb, spec) + emis;
        gl_FragColor = vec4(fog(c, P), 1.); }`
  });
}
// Hình học: dời đỉnh theo nhiễu (CPU, làm một lần lúc tải trang)
function displace(geo, fn) {
  const p = geo.attributes.position, n = geo.attributes.normal, v = new THREE.Vector3(), nn = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); nn.fromBufferAttribute(n, i); v.addScaledVector(nn, fn(v, nn)); p.setXYZ(i, v.x, v.y, v.z); }
  geo.computeVertexNormals(); return geo;
}
