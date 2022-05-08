precision mediump float;

#pragma glslify: exponential = require(glsl-easings/exponential-out)
#pragma glslify: rotate = require(glsl-rotate)

varying vec2 vUv;
uniform float uTick;

const float HALF_PI = 1.570796327;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  float time = uTick * 0.5;
  float sTime = sin(time) * 0.5 + 0.5;
  float delay = distance(vec2(0., 1.), uv) / distance(vec2(0., 1.), vec2(1., 0.));
  float x = clamp(sTime * 2. - delay * 0.1, 0., 1.);
  float progress = exponential(x);
  vec3 axis = vec3(1.0, 1.0, 0);
  pos = rotate(pos, axis, 4.0 * HALF_PI * progress);
  pos.z += progress * 10.;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}