// Đoạn GLSL dùng chung: nhiễu, sương theo độ cao, chiếu sáng đêm trăng + đuốc.
const GL_NOISE = `
float h3(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
float n3(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z); }
float fbm(vec3 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*n3(p); p*=2.03; a*=.5; } return s; }
`;
const GL_LIGHT = `
uniform vec3 uMoonDir, uMoonCol, uSkyCol, uGroundCol, uFogCol, uTorchPos, uTorchCol, uCamPos;
uniform float uFogDen, uTorch, uTime;
vec3 light(vec3 P, vec3 N, vec3 alb, float spec){
  vec3 V = normalize(uCamPos - P);
  float hemi = .5 + .5*N.y;
  vec3 c = alb * mix(uGroundCol, uSkyCol, hemi);
  float d = max(dot(N, uMoonDir), 0.); c += alb * uMoonCol * d;
  vec3 L = uTorchPos - P; float dl = length(L); L /= dl;
  float tl = uTorch / (1. + dl*dl*.55);
  c += alb * uTorchCol * max(dot(N, L), 0.) * tl;
  vec3 Hm = normalize(uMoonDir + V); c += uMoonCol * pow(max(dot(N,Hm),0.), 40.) * spec * .6;
  vec3 Ht = normalize(L + V); c += uTorchCol * pow(max(dot(N,Ht),0.), 30.) * spec * tl;
  return c;
}
vec3 fog(vec3 c, vec3 P){
  float d = length(P - uCamPos);
  float hf = exp(-max(P.y, 0.) * .045);
  float f = 1. - exp(-d * uFogDen * (.35 + hf));
  return mix(c, uFogCol, clamp(f, 0., 1.));
}
`;
