precision mediump float;

#pragma glslify: exponential = require(glsl-easings/exponential-out)
#pragma glslify: rotate = require(glsl-rotate)
#pragma glslify: noise2 = require(glsl-noise/simplex/2d);
#pragma glslify: noise3 = require(glsl-noise/simplex/3d);

varying vec2 vUv;
uniform float uTick;
varying float vWave;

const float HALF_PI = 1.570796327;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  float noiseFreq = 0.5;
  float noiseAmp = 0.05;
  
  // vec3 noisePos = vec3(pos.x * noiseFreq + uTick, pos.y, pos.z);
  vec3 noisePos = vec3(pos.x * noiseFreq, pos.y * exponential(uTick), pos.z + sin(uTick));
  pos.z += noise3(noisePos) * noiseAmp;

  vWave = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}