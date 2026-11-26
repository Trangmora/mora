// Bầu trời đêm: dải màu, sao lấp lánh, trăng có quầng, mây mỏng trôi. Một quả cầu lớn, shader thuần.
const skyMat = new THREE.ShaderMaterial({
  uniforms: U, side: THREE.BackSide, depthWrite: false,
  vertexShader: `varying vec3 vD; void main(){ vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
  fragmentShader: GL_NOISE + `uniform vec3 uMoonDir; uniform float uTime; uniform vec3 uFogCol; uniform float uInk, uDay; uniform vec3 uMoonCol; varying vec3 vD;
    void main(){ vec3 d = normalize(vD); float e = d.y;
      vec3 c = mix(uFogCol * 1.15, vec3(.006,.01,.03), smoothstep(-.02,.55,e));
      vec2 g = d.xz / max(d.y,.05) * 60.; vec2 gi = floor(g); float s = h3(vec3(gi, 1.));
      float tw = .6 + .4*sin(uTime*2. + s*40.);
      c += vec3(.8,.85,1.) * step(.985, s) * smoothstep(.45,.0,length(fract(g)-.5)) * tw * smoothstep(.05,.3,e) * 1.4;
      float m = dot(d, uMoonDir);
      c += vec3(1.,.95,.82) * smoothstep(.99955,.9997,m) * 6.;
      c += vec3(.35,.42,.6) * pow(max(m,0.), 300.) * .9 + vec3(.15,.2,.32) * pow(max(m,0.), 18.) * .25;
      vec2 cp = d.xz / max(d.y,.08) * 1.4 + vec2(uTime*.012, 0.);
      float cl = smoothstep(.5,.85, fbm(vec3(cp, 3.))) * smoothstep(.0,.25,e);
      c = mix(c, vec3(.06,.08,.13) + vec3(.25,.3,.42)*pow(max(m,0.),30.)*.8, cl*.65);
      if (uDay > .5) { float m2 = max(m, 0.);
        vec3 zen = vec3(.16,.30,.58), hor = vec3(.95,.55,.32);
        c = mix(hor, zen, smoothstep(-.02, .55, e)) + vec3(1.4,.85,.4) * pow(m2, 6.) * .9 + vec3(2.,1.4,.8) * pow(m2, 60.) * .8;
        c += vec3(6.,4.5,3.) * smoothstep(.9993,.9996,m);
        vec2 cq = d.xz / max(d.y,.06) * 1.1 + vec2(uTime*.01, 0.); float cn = fbm(vec3(cq, 2.)), cl2 = smoothstep(.48,.78,cn) * smoothstep(.0,.2,e);
        vec3 ccol = mix(vec3(.75,.55,.5), vec3(1.6,1.15,.75), pow(m2, 3.) + .3*smoothstep(.5,.9,cn));
        c = mix(c, ccol, cl2 * .85); if (e < 0.) c = hor * .9; }
      if (uInk > .5) { c = vec3(1.6) - vec3(.25) * smoothstep(.0,.6,e); c = mix(c, vec3(2.2,.12,.06), smoothstep(.99935,.9995,m)); }
      gl_FragColor = vec4(c,1.); }`
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(2000, 48, 24), skyMat); sky.renderOrder = -1; scene.add(sky);
