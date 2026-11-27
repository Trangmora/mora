// Quả địa cầu bản đồ cổ, dựng bằng three.js. Mọi thứ là hàm của thời gian t.
// Biến do build.py chèn vào: TEX (data URI các texture), FILM ({dur, cams:[[t, lon, lat, dist]], hl:[[t0,t1],...], clouds}).
const Q = new URLSearchParams(location.search);
const W = +(Q.get('w') || 1920), H = +(Q.get('h') || 1080);
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(W, H); renderer.setClearColor(0x16302f);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, W / H, 0.05, 50);
const deg = Math.PI / 180;
const xyz = (lon, lat, r) => new THREE.Vector3(r * Math.cos(lat * deg) * Math.cos(lon * deg), r * Math.sin(lat * deg), -r * Math.cos(lat * deg) * Math.sin(lon * deg));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
const lerp = (a, b, k) => a + (b - a) * k;
let pending = 0;
const loader = new THREE.TextureLoader();
const tex = (k, srgb = true) => { pending++; const t = loader.load(TEX[k], () => { pending--; });
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; return t; };
const SUN = new THREE.Vector3(-0.55, 0.62, 0.56).normalize();

// ---------- địa cầu ----------
const hlTex = FILM.hl.map((_, i) => tex('hl' + (i + 1)));
const globeMat = new THREE.ShaderMaterial({
  uniforms: { tBase: { value: tex('base') }, tH: { value: tex('height', false) }, tHl0: { value: hlTex[0] || null }, tHl1: { value: hlTex[1] || hlTex[0] || null },
    uHl: { value: new THREE.Vector2() }, uSun: { value: SUN }, uRelief: { value: 0.018 }, uCam: { value: new THREE.Vector3() } },
  vertexShader: `uniform sampler2D tH; uniform float uRelief; varying vec2 vUv; varying vec3 vN; varying vec3 vP;
    void main(){ vUv = uv; float h = texture(tH, uv).r; vec3 p = position * (1. + h * uRelief);
      vN = normalize(position); vP = p; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.); }`,
  fragmentShader: `uniform sampler2D tBase, tH, tHl0, tHl1; uniform vec2 uHl; uniform vec3 uSun, uCam; uniform float uRelief;
    varying vec2 vUv; varying vec3 vN; varying vec3 vP;
    void main(){
      vec3 c = texture(tBase, vUv).rgb;
      c = mix(c, texture(tHl0, vUv).rgb, uHl.x); c = mix(c, texture(tHl1, vUv).rgb, uHl.y);
      // pháp tuyến gồ ghề từ bản đồ độ cao (theo hướng đông và bắc)
      vec2 e = vec2(1.5 / 2048., 1.5 / 1024.);
      float h = texture(tH, vUv).r;
      float hx = texture(tH, vUv + vec2(e.x, 0.)).r - texture(tH, vUv - vec2(e.x, 0.)).r;
      float hy = texture(tH, vUv + vec2(0., e.y)).r - texture(tH, vUv - vec2(0., e.y)).r;
      vec3 n = normalize(vN); vec3 east = normalize(cross(vec3(0., 1., 0.), n)); vec3 north = cross(n, east);
      n = normalize(n - (east * hx + north * hy) * 9.0);
      float dif = max(dot(n, uSun), 0.);
      vec3 V = normalize(uCam - vP);
      float sea = 1. - smoothstep(0.02, 0.1, h);
      float spec = pow(max(dot(reflect(-uSun, n), V), 0.), 18.) * sea * 0.10;
      float fres = pow(1. - max(dot(normalize(vN), V), 0.), 3.);
      vec3 col = c * (0.42 + 0.72 * dif) * (1. - 0.12 * h * (1. - sea)) + spec * vec3(1., .96, .85);
      col = mix(col, vec3(.78, .9, .86), fres * 0.35);
      gl_FragColor = vec4(col, 1.);
      #include <colorspace_fragment>
    }` });
const globe = new THREE.Mesh(new THREE.SphereGeometry(1, 640, 320), globeMat);
scene.add(globe);

// ---------- mây mỏng ----------
const cloudMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false,
  uniforms: { tC: { value: tex('clouds') }, uSun: { value: SUN }, uA: { value: FILM.clouds } },
  vertexShader: `varying vec2 vUv; varying vec3 vN; void main(){ vUv = uv; vN = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
  fragmentShader: `uniform sampler2D tC; uniform vec3 uSun; uniform float uA; varying vec2 vUv; varying vec3 vN;
    void main(){ vec4 c = texture(tC, vUv); float d = 0.55 + 0.5 * max(dot(vN, uSun), 0.);
      gl_FragColor = vec4(c.rgb * d, c.a * uA);
      #include <colorspace_fragment>
    }` });
const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.03, 256, 128), cloudMat);
scene.add(clouds);

// ---------- quầng khí quyển ----------
const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.12, 128, 64), new THREE.ShaderMaterial({
  side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  uniforms: { uCam: { value: new THREE.Vector3() } },
  vertexShader: `varying vec3 vP; void main(){ vP = (modelMatrix * vec4(position, 1.)).xyz; gl_Position = projectionMatrix * viewMatrix * vec4(vP, 1.); }`,
  fragmentShader: `uniform vec3 uCam; varying vec3 vP;
    void main(){ vec3 V = normalize(vP - uCam); float b = dot(uCam, V); float d2 = dot(uCam, uCam) - b * b; float d = sqrt(max(d2, 0.));
      float g = smoothstep(1.12, 1.0, d) * smoothstep(0.96, 1.0, d);
      gl_FragColor = vec4(vec3(.72, .9, .84) * g * 0.55, g); }` }));
scene.add(atmo);

// ---------- máy quay ----------
function camAt(t) {
  const K = FILM.cams;
  let a = K[0], b = K[K.length - 1];
  for (let i = 0; i < K.length - 1; i++) if (t >= K[i][0] && t < K[i + 1][0]) { a = K[i]; b = K[i + 1]; break; }
  const k = t <= K[0][0] ? 0 : t >= K[K.length - 1][0] ? 1 : smooth(a[0], b[0], t);
  let dl = b[1] - a[1]; if (dl > 180) dl -= 360; if (dl < -180) dl += 360;
  return [a[1] + dl * k, lerp(a[2], b[2], k), lerp(a[3], b[3], k), lerp(a[4] || 0, b[4] || 0, k)];
}

function renderAt(t) {
  const [lon, lat, dist, lift] = camAt(t);
  camera.position.copy(xyz(lon, lat, dist));
  camera.up.set(0, 1, 0);
  camera.lookAt(xyz(lon, lat + lift, 0.0).add(new THREE.Vector3(0, lift * 0.01, 0)));
  camera.updateMatrixWorld(); camera.updateProjectionMatrix();
  globeMat.uniforms.uCam.value.copy(camera.position); atmo.material.uniforms.uCam.value.copy(camera.position);
  globeMat.uniforms.uHl.value.set(...FILM.hl.map(([a, b]) => smooth(a, b, t)).concat([0, 0]).slice(0, 2));
  clouds.rotation.y = t * 0.006;
  renderer.render(scene, camera);
  const pv = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  return { pv: pv.elements.slice(), cam: camera.position.toArray() };
}
window.renderAt = renderAt;
window.FILM_DUR = FILM.dur;
(function wait() { if (pending > 0) return setTimeout(wait, 50); renderAt(0); window.READY = true; })();
