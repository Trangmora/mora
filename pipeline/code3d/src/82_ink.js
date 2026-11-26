// Kiểu tranh thủy mặc: dựng cảnh như thường, thêm bộ đệm độ sâu và pháp tuyến, rồi một lượt màn hình biến ảnh thành mực trên giấy dó:
// nét viền bút lông (Sobel trên độ sâu + pháp tuyến, độ dày rung theo nhiễu), mảng mực loang theo độ tối, vết bút khô (phi bạch),
// xa thì nhạt dần thành giấy trắng (lưu bạch), giấy có thớ, vật màu đỏ (mặt trời, con dấu) giữ màu son.
hdrRT.depthTexture = new THREE.DepthTexture(W, H);
const normRT = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType });
const normMat = new THREE.MeshNormalMaterial();
const inkMat = new THREE.ShaderMaterial({ vertexShader: VQ,
  uniforms: { tCol: { value: hdrRT.texture }, tDepth: { value: hdrRT.depthTexture }, tNorm: { value: normRT.texture }, uNear: { value: .1 }, uFar: { value: 2500 },
    uTime: U.uTime, uFade: { value: 1 }, uMist: { value: .012 }, uRes: { value: new THREE.Vector2(W, H) } },
  fragmentShader: GL_NOISE + `uniform sampler2D tCol, tDepth, tNorm; uniform float uNear, uFar, uTime, uFade, uMist; uniform vec2 uRes; varying vec2 vU;
    float lin(vec2 uv){ float z = texture2D(tDepth, uv).r * 2. - 1.; return 2. * uNear * uFar / (uFar + uNear - z * (uFar - uNear)); }
    vec3 nrm(vec2 uv){ return texture2D(tNorm, uv).rgb * 2. - 1.; }
    void main(){
      vec2 px = 1. / uRes, uv = vU;
      float d = lin(uv); float sky = step(uFar * .9, d);
      vec3 col = texture2D(tCol, uv).rgb; float L = dot(col, vec3(.3,.59,.11));
      float mist = 1. - exp(-d * uMist); mist = max(mist, sky);
      // mảng mực: tối thì đậm, có loang theo nhiễu tần thấp, phân tầng mềm như các lớp mực chồng
      float ink = 1. - smoothstep(.08, 1.15, L);
      ink *= .72 + .55 * fbm(vec3(uv * vec2(3.5, 7.) + d * .004, 2.));
      ink = mix(ink, floor(ink * 4. + n3(vec3(uv * 40., 1.))) / 4., .35);
      // phi bạch: vệt bút khô theo chiều dọc trên vách đá
      vec3 N = nrm(uv); float steep = 1. - abs(N.y);
      float streak = smoothstep(.35, .75, n3(vec3(uv.x * 420., uv.y * 22. + uv.x * 30., 3.)));
      ink *= mix(1., .35 + .65 * streak, steep * .55 * (1. - sky));
      // nét viền: Sobel trên độ sâu (tương đối) và pháp tuyến; bán kính lấy mẫu rung theo nhiễu cho giống nét lông
      float r = 1.1 + 1.6 * n3(vec3(uv * vec2(90., 60.), 5.));
      float e = 0.; float dc = d;
      for (int i = 0; i < 8; i++) { float a = float(i) * .785398; vec2 o = vec2(cos(a), sin(a)) * px * r;
        float dd = lin(uv + o); e += abs(dd - dc) / max(dc, .5) * 6.; e += (1. - dot(N, nrm(uv + o))) * .9; }
      float line = smoothstep(.55, 1.6, e) * (.55 + .7 * n3(vec3(uv * vec2(160., 160.), 7.)));
      line *= 1. - sky;
      ink = max(ink * .9, line);
      ink *= 1. - mist * .93;                        // lưu bạch: xa mờ thành giấy
      // giấy dó
      float fib = fbm(vec3(uv * vec2(380., 240.), 9.)) * .6 + fbm(vec3(uv * 18., 11.)) * .4;
      vec3 paper = vec3(.94, .905, .83) * (.93 + .1 * fib);
      paper *= 1. - smoothstep(.45, .95, length((uv - .5) * vec2(1.2, 1.))) * .22;
      vec3 inkC = mix(vec3(.07, .07, .08), vec3(.2, .19, .17), .3 * fib);
      vec3 c = mix(paper, inkC, clamp(ink, 0., 1.));
      // son đỏ: giữ các vật màu đỏ
      float red = clamp((col.r - max(col.g, col.b)) * 1.2, 0., 1.);
      c = mix(c, vec3(.72, .13, .1) * (.9 + .1 * fib), smoothstep(.25, .6, red));
      c += (fract(sin(dot(uv * uRes + uTime * 61.7, vec2(12.9898, 78.233))) * 43758.5453) - .5) * .02;
      gl_FragColor = vec4(c * uFade + vec3(.94, .905, .83) * (1. - uFade), 1.); }` });
function inkRender() {
  // lượt pháp tuyến: ẩn các lớp trong suốt (sương, đom đóm, lửa, lưới)
  const hid = []; scene.traverse(o => { if (o.isMesh || o.isPoints || o.isLine) { const m = o.material; if (o.isPoints || o.isLine || (m && m.transparent) || o === sky) { if (o.visible) { hid.push(o); o.visible = false; } } } });
  scene.overrideMaterial = normMat; renderer.setRenderTarget(normRT); renderer.setClearColor(0x8080ff); renderer.clear(); renderer.render(scene, camera);
  scene.overrideMaterial = null; hid.forEach(o => o.visible = true); renderer.setClearColor(0x000000);
  inkMat.uniforms.uNear.value = camera.near; inkMat.uniforms.uFar.value = camera.far;
  pass(inkMat, null);
}
