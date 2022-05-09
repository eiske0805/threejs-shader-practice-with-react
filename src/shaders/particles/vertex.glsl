precision mediump float;

#pragma glslify: exponential = require(glsl-easings/exponential-out)
#pragma glslify: easeBack = require(glsl-easings/back-in-out)
#pragma glslify: easeCubic = require(glsl-easings/cubic-in-out)
#pragma glslify: noise2 = require(glsl-noise/simplex/2d);
#pragma glslify: noise3 = require(glsl-noise/simplex/3d);

uniform float uTick;
uniform float uTexture;
varying vec3 vPos;

void main() {
  vec3 pos = position;
  vPos = pos;

  float time = uTick * pos.x * 0.001;
  float speed = easeCubic(sin(time));

  float n = noise2(pos.xy * 10. - time);
  float n2 = noise3(vec3(pos - sin(time)));
  float n3 = noise3(vec3(pos.x * 10., pos.y * 50., speed));

  pos.x = n;
  pos.y = n2;
  pos.z = n3;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 2.2 * (2.2 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition; 

}