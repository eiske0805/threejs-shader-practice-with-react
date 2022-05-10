precision mediump float;

#pragma glslify: easeQuint = require(glsl-easings/quintic-in-out)

attribute vec3 flPosition;
varying vec2 vUv;
uniform float uTick;

void main() {
  vUv = uv;
  vec3 p = position;
  vec3 n = normal;
  vec3 fp = flPosition;

  float aDelay = distance(vec2(0., 1.), uv) / distance(vec2(0., 1.), vec2(1., 0.));
  float progress = sin(uTick * 0.3) * 0.5 + 0.5;
  float delay = easeQuint(clamp(progress * 2. - (1. - uv.x) * 1., 0., 1.));

  vec3 pos = mix(p, fp, delay);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0); 
  gl_PointSize = 2. * (3. / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}