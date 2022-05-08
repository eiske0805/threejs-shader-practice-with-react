precision highp float;
varying vec2 vUv;


void main() {
  if( distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
    discard;
  }
  gl_FragColor = vec4(vUv.x, 0.5, 0.5, 1.0);
}