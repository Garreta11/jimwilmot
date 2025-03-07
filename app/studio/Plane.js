import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const loader = new THREE.TextureLoader();

const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
const material = new THREE.ShaderMaterial({
  fragmentShader,
  vertexShader,
  transparent: true,
  blending: THREE.NormalBlending,
});

export default class Plane extends THREE.Object3D {
  init(el, i) {
    this.el = el;

    this.x = 0;
    this.y = 0;

    this.mx = 0.05 * Math.random() * 2 - 1;
    this.my = 0.2 * Math.random() * 2 - 1;

    this.geometry = geometry;
    this.material = material.clone();

    this.material.uniforms = {
      u_texture: { value: 0 },
      u_res: { value: new THREE.Vector2(1, 1) },
      u_size: { value: new THREE.Vector2(1, 1) },
      u_diff: { value: 0 },
      u_opacity: { value: 1.0 },
    };

    this.texture = loader.load(this.el.dataset.src, (texture) => {
      const { naturalWidth, naturalHeight } = texture.image;
      const { u_size, u_texture } = this.material.uniforms;
      u_texture.value = texture;
      u_size.value.x = naturalWidth;
      u_size.value.y = naturalHeight;
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.add(this.mesh);
    this.resize();

    // Add custom userData
    this.mesh.userData = {
      customProperty: this.el, // Add any other custom data you need
    };
  }

  update = (x, y, max, diff) => {
    const { right, bottom } = this.rectImg;
    const { u_diff } = this.material.uniforms;
    this.y = gsap.utils.wrap(-(max.y - bottom), bottom, y) - this.yOffset;
    this.x = gsap.utils.wrap(-(max.x - right), right, x) - this.xOffset;

    u_diff.value = diff;

    this.position.x =
      (this.mx * this.x - window.innerWidth / 4) / window.innerWidth;
    this.position.y =
      (this.my * this.y - window.innerHeight / 4) / window.innerHeight;

    // Define threshold for fading
    const fadeThreshold = 0.8; // Adjust as needed
    const distance = Math.sqrt(this.position.x ** 2 + this.position.y ** 2);

    if (distance > fadeThreshold) {
      gsap.to(this.material.uniforms.u_opacity, {
        value: 0,
        duration: 1,
        ease: 'power2.out',
      }); // Fade out
    } else {
      gsap.to(this.material.uniforms.u_opacity, {
        value: 1,
        duration: 1,
        ease: 'power2.out',
      }); // Fade in
    }
  };

  resize() {
    this.img = this.el.children[0];

    this.rect = this.el.getBoundingClientRect();
    this.rectImg = this.img.getBoundingClientRect();

    const { left, top, width, height } = this.rectImg;
    const { u_res, u_toRes, u_pos, u_offset } = this.material.uniforms;

    const wscale = width / window.innerWidth;
    const hscale = height / window.innerWidth;

    this.xOffset = left + width / 2 - window.innerWidth / 2;
    this.yOffset = top + height / 2 - window.innerHeight / 2;

    this.position.x = this.xOffset;
    this.position.y = this.yOffset;

    u_res.value.x = width;
    u_res.value.y = height;

    this.mesh.scale.set(wscale, hscale, 1);
  }
}
