precision highp float;

varying vec3 vPos;

void main() {
  if( distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
    discard;
  }
  gl_FragColor = vec4(vPos.x, 0.5, 0.5, 1.0);
}