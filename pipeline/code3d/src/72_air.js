// Sương trôi trên mặt sông (các lớp phẳng, nhiễu fbm) và đom đóm (điểm sáng, quỹ đạo là hàm của t).
const mistMat = (y, s) => new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false,
  vertexShader: `varying vec3 vP; void main(){ vec4 w = modelMatrix*vec4(position,1.); vP = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
  fragmentShader: GL_NOISE + `uniform float uTime; uniform vec3 uCamPos, uFogCol, uMoonCol, uTorchPos, uTorchCol; uniform float uTorch; varying vec3 vP;
    void main(){ float n = fbm(vec3(vP.xz*${s} + vec2(uTime*.05, uTime*.012), ${y.toFixed(2)} + uTime*.03));
      float d = length(vP - uCamPos); float a = smoothstep(.45,.85,n) * smoothstep(2.,10.,d) * smoothstep(.03,.25,abs(normalize(vP-uCamPos).y)) * smoothstep(700.,150.,d) * .32;
      vec3 c = uFogCol*1.6 + uMoonCol*.5 + uTorchCol*uTorch*.25/(1. + dot(vP-uTorchPos,vP-uTorchPos)*.08);
      gl_FragColor = vec4(c, a); }` });
[[.35, .06], [1.3, .045], [3.2, .03], [7., .02]].forEach(([y, s]) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600).rotateX(-Math.PI / 2), mistMat(y, s)); m.position.y = y; m.renderOrder = 2; scene.add(m); });
const NF = 40, ffPos = new Float32Array(NF * 3), ffG = new THREE.BufferGeometry(); ffG.setAttribute('position', new THREE.BufferAttribute(ffPos, 3));
const ffMat = new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  vertexShader: `uniform float uTime; varying float vB; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.); vB = .5+.5*sin(uTime*3. + position.x*7. + position.z*3.);
    gl_PointSize = clamp(160. / -mv.z, 1., 5.); gl_Position = projectionMatrix*mv; }`,
  fragmentShader: `varying float vB; void main(){ float r = length(gl_PointCoord-.5); gl_FragColor = vec4(vec3(1.2,1.5,.55)*smoothstep(.5,.0,r)*vB, 1.); }` });
const fireflies = new THREE.Points(ffG, ffMat); scene.add(fireflies);
function updateAir(t) {
  for (let i = 0; i < NF; i++) { const a = hash(i) * 6.28, r = 6 + hash(i + 1) * 22;
    ffPos[i * 3] = Math.cos(a + t * .05 * (hash(i + 2) - .5)) * r + Math.sin(t * .4 + i) * .6;
    ffPos[i * 3 + 1] = .6 + hash(i + 3) * 3.5 + Math.sin(t * .7 + i * 1.3) * .3;
    ffPos[i * 3 + 2] = Math.sin(a) * r - 8 + Math.cos(t * .3 + i) * .6; }
  ffG.attributes.position.needsUpdate = true;
}
