precision highp float;
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vUv.x, 0.5, 0.5, 1.);
}