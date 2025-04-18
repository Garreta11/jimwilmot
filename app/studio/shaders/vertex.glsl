precision mediump float;

uniform float u_scale;

varying vec2 vUv;

void main() {
  vec3 pos = position * u_scale;

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}