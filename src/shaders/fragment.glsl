precision highp float;

varying vec2 vUv;
varying float vWave;
uniform sampler2D uTex;


void main() {
  gl_FragColor = texture(uTex, vUv + vWave);
}