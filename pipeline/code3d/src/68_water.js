// Mặt nước: gương phẳng tự làm (camera đối xứng qua mặt nước, kết xuất vào texture), gợn sóng bằng nhiễu, ánh trăng và ánh đuốc.
const reflRT = new THREE.WebGLRenderTarget(W >> 1, H >> 1, { type: THREE.HalfFloatType });
const mirrorCam = camera.clone();
const texMat = new THREE.Matrix4();
const waterMat = new THREE.ShaderMaterial({
  uniforms: Object.assign({}, U, { uRefl: { value: reflRT.texture }, uTexMat: { value: texMat } }),
  vertexShader: `uniform mat4 uTexMat; varying vec3 vP; varying vec4 vR;
    void main(){ vec4 w = modelMatrix * vec4(position,1.); vP = w.xyz; vR = uTexMat * w; gl_Position = projectionMatrix * viewMatrix * w; }`,
  fragmentShader: GL_NOISE + GL_LIGHT + `uniform sampler2D uRefl; varying vec3 vP; varying vec4 vR;
    uniform vec3 uBladePos; uniform float uBlade;
    float wv(vec2 p){ return fbm(vec3(p*vec2(.35,.9) + vec2(0., uTime*.25), uTime*.12)) + .5*n3(vec3(p*2.2 - vec2(uTime*.4,0.), 1.)); }
    void main(){ vec3 P = vP; float e = .08;
      float h0 = wv(P.xz), hx = wv(P.xz + vec2(e,0.)), hz = wv(P.xz + vec2(0.,e));
      vec3 N = normalize(vec3(-(hx-h0)/e*.07, 1., -(hz-h0)/e*.07));
      vec3 V = normalize(uCamPos - P);
      float fr = .04 + .96*pow(1. - max(dot(N,V),0.), 5.);
      vec2 uv = vR.xy / vR.w + N.xz * .03;
      vec3 refl = texture2D(uRefl, uv).rgb;
      vec3 deep = vec3(.004,.012,.02);
      vec3 c = mix(deep, refl, clamp(fr*1.3 + .2, 0., .85));
      vec3 L = uTorchPos - P; float dl = length(L); L/=dl;
      c += uTorchCol * pow(max(dot(N, normalize(L+V)),0.), 120.) * uTorch * 6. / (1. + dl*.35);
      c += vec3(.9,.9,1.) * pow(max(dot(reflect(-V,N), uMoonDir),0.), 900.) * 1.2;
      float bd = length(P.xz - uBladePos.xz); c += vec3(1.6,1.1,.4) * uBlade * exp(-bd*bd*1.8) * (.7 + .5*h0) * smoothstep(.6,-1.5,uBladePos.y) ;
      gl_FragColor = vec4(fog(c, P), 1.); }`
});
const water = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), waterMat); scene.add(water);
function renderReflection() {
  mirrorCam.copy(camera);
  mirrorCam.position.set(camera.position.x, -camera.position.y, camera.position.z);
  const dir = new THREE.Vector3(); camera.getWorldDirection(dir); dir.y = -dir.y;
  mirrorCam.up.set(0, 1, 0); mirrorCam.lookAt(mirrorCam.position.clone().add(dir));
  mirrorCam.updateMatrixWorld(); mirrorCam.projectionMatrix.copy(camera.projectionMatrix);
  texMat.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1).multiply(mirrorCam.projectionMatrix).multiply(mirrorCam.matrixWorldInverse);
  water.visible = false; U.uClip.value = 1; U.uCamPos.value.copy(mirrorCam.position);
  renderer.setRenderTarget(reflRT); renderer.render(scene, mirrorCam);
  water.visible = true; U.uClip.value = 0; U.uCamPos.value.copy(camera.position);
}
