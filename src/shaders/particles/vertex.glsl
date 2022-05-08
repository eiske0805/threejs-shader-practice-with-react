precision mediump float;

#pragma glslify: exponential = require(glsl-easings/exponential-out)
#pragma glslify: easeBack = require(glsl-easings/back-in-out)
#pragma glslify: easeCubic = require(glsl-easings/cubic-in-out)
#pragma glslify: noise2 = require(glsl-noise/simplex/2d);
#pragma glslify: noise3 = require(glsl-noise/simplex/3d);

varying vec2 vUv;
uniform float uTick;

void main() {
  vUv = uv;
  vec3 pos = position;

  float delay = distance(vec2(0., 1.), uv) / distance(vec2(0., 1.), vec2(1., 0.));
  float time = uTick * delay * 0.002;
  float speed = easeCubic(sin(time));

  float n = noise2(vUv * 10. - time);
  float n2 = noise3(vec3(vUv * 10., time));
  float n3 = noise3(vec3(vUv.x * 10., vUv.y * 50., speed));

  pos.x = n;
  pos.y = n2;
  pos.z = n3;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 1.2 * (1.2 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition; 
}