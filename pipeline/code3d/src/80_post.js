// Hậu kỳ tự viết: dựng cảnh vào bộ đệm HDR, tách vùng sáng, làm nhòe (bloom), ánh xạ tông ACES, tối góc, hạt phim.
const hdrRT = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, depthBuffer: true });
const bw = W >> 2, bh = H >> 2;
const bA = new THREE.WebGLRenderTarget(bw, bh, { type: THREE.HalfFloatType }), bB = bA.clone();
const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), quadScene = new THREE.Scene();
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2)); quadScene.add(quad);
const VQ = `varying vec2 vU; void main(){ vU = uv; gl_Position = vec4(position.xy, 0., 1.); }`;
const brightMat = new THREE.ShaderMaterial({ uniforms: { tSrc: { value: null } }, vertexShader: VQ,
  fragmentShader: `uniform sampler2D tSrc; varying vec2 vU; void main(){ vec3 c = texture2D(tSrc, vU).rgb; float l = dot(c, vec3(.3,.59,.11));
    gl_FragColor = vec4(c * smoothstep(.55, 1.6, l), 1.); }` });
const blurMat = new THREE.ShaderMaterial({ uniforms: { tSrc: { value: null }, uDir: { value: new THREE.Vector2() } }, vertexShader: VQ,
  fragmentShader: `uniform sampler2D tSrc; uniform vec2 uDir; varying vec2 vU; void main(){ vec3 s = vec3(0.); float w[5]; w[0]=.227; w[1]=.195; w[2]=.122; w[3]=.054; w[4]=.016;
    s += texture2D(tSrc, vU).rgb * w[0]; for(int i=1;i<5;i++){ s += (texture2D(tSrc, vU + uDir*float(i)).rgb + texture2D(tSrc, vU - uDir*float(i)).rgb) * w[i]; }
    gl_FragColor = vec4(s, 1.); }` });
const finalMat = new THREE.ShaderMaterial({ uniforms: { tSrc: { value: hdrRT.texture }, tBloom: { value: bA.texture }, uTime: U.uTime, uExp: { value: 1 }, uFade: { value: 1 } }, vertexShader: VQ,
  fragmentShader: `uniform sampler2D tSrc, tBloom; uniform float uTime, uExp, uFade; varying vec2 vU;
    vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14), 0., 1.); }
    void main(){ vec2 d = (vU-.5); float ca = dot(d,d)*.004;
      vec3 c = vec3(texture2D(tSrc, vU + d*ca).r, texture2D(tSrc, vU).g, texture2D(tSrc, vU - d*ca).b);
      c += texture2D(tBloom, vU).rgb * .9; c *= uExp;
      c = aces(c * 1.6); c = pow(c, vec3(1./2.2));
      c *= 1. - smoothstep(.35, .95, length(d*vec2(1.1,1.))) * .55;
      c += (fract(sin(dot(vU*vec2(W_,H_) + uTime*61.7, vec2(12.9898,78.233)))*43758.5453) - .5) * .035;
      gl_FragColor = vec4(c * uFade, 1.); }`.replace('W_', W.toFixed(1)).replace('H_', H.toFixed(1)) });
function pass(mat, target) { quad.material = mat; renderer.setRenderTarget(target); renderer.render(quadScene, quadCam); }
function postRender() {
  brightMat.uniforms.tSrc.value = hdrRT.texture; pass(brightMat, bA);
  for (let i = 0; i < 2; i++) {
    blurMat.uniforms.tSrc.value = bA.texture; blurMat.uniforms.uDir.value.set(1.6 / bw, 0); pass(blurMat, bB);
    blurMat.uniforms.tSrc.value = bB.texture; blurMat.uniforms.uDir.value.set(0, 1.6 / bh); pass(blurMat, bA);
  }
  pass(finalMat, null);
}
