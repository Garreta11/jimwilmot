import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const loader = new THREE.TextureLoader();

const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
const material = new THREE.ShaderMaterial({
  fragmentShader,
  vertexShader,
});

export default class Plane extends THREE.Object3D {
  init(el, i) {
    this.el = el;

    this.x = 0;
    this.y = 0;

    this.my = 1 - (i % 5) * 0.1;

    this.geometry = geometry;
    this.material = material.clone();

    this.material.uniforms = {
      u_texture: { value: 0 },
      u_res: { value: new THREE.Vector2(1, 1) },
      u_size: { value: new THREE.Vector2(1, 1) },
      u_diff: { value: 0 },
    };

    this.texture = loader.load(this.el.dataset.src, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const { naturalWidth, naturalHeight } = texture.image;
      const { u_size, u_texture } = this.material.uniforms;

      u_texture.value = texture;
      u_size.value.x = naturalWidth;
      u_size.value.y = naturalHeight;
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.add(this.mesh);

    this.resize();
  }

  update = (x, y, max, diff) => {
    const { right, bottom } = this.rect;
    const { u_diff } = this.material.uniforms;

    this.y =
      gsap.utils.wrap(-(max.y - bottom), bottom, y * this.my) - this.yOffset;

    this.x = gsap.utils.wrap(-(max.x - right), right, x) - this.xOffset;

    u_diff.value = diff;

    this.position.x = this.x;
    this.position.y = this.y;
  };

  resize() {
    this.rect = this.el.getBoundingClientRect();

    const { left, top, width, height } = this.rect;
    const { u_res, u_toRes, u_pos, u_offset } = this.material.uniforms;

    this.xOffset = left + width / 2 - window.innerWidth / 2;
    this.yOffset = top + height / 2 - window.innerHeight / 2;

    this.position.x = this.xOffset;
    this.position.y = this.yOffset;

    u_res.value.x = width;
    u_res.value.y = height;

    this.mesh.scale.set(width, height, 1);
  }
}
