precision mediump float;

#pragma glslify: easeBack = require(glsl-easings/back-in-out)
#pragma glslify: rotate = require(glsl-rotate)

varying vec2 vUv;
uniform float uTick;

const float HALF_PI = 1.570796327;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  float time = uTick * 0.1;
  vec3 axis = vec3(0, 1., 0.1);
  pos = rotate(pos, axis, 8.0 * HALF_PI * easeBack(sin(time)));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}