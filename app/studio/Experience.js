import * as THREE from 'three';
import gsap from 'gsap';

import Plane from './Plane';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
const isWindows = navigator.appVersion.indexOf('Win') != -1;

const mouseMultiplier = 0.6;
const firefoxMultiplier = 20;

const multipliers = {
  mouse: isWindows ? mouseMultiplier * 2 : mouseMultiplier,
  firefox: isWindows ? firefoxMultiplier * 2 : firefoxMultiplier,
};

export default class Experience {
  static instance;

  constructor(_options = {}) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    // Options
    this.targetElement = _options.targetElement;
    if (!this.targetElement) {
      console.warn("Missing 'targetElement' property");
      return;
    }
    this.tick = 0;
    this.tx = 0;
    this.ty = 0;
    this.cx = 0;
    this.cy = 0;
    this.diff = 0;
    this.wheel = { x: 0, y: 0 };
    this.on = { x: 0, y: 0 };
    this.max = { x: 0, y: 0 };
    this.isDragging = false;
    this.tl = gsap.timeline({ paused: true });

    this.el = document.querySelector('.js-grid');

    this.setConfig();
    this.setScene();
    this.setCamera();
    this.setRenderer();
    // this.setPlane();
    this.addPlanes();

    this.addEvents();

    // update
    this.update();
  }

  setConfig() {
    this.config = {};

    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

    // Width and height
    const boundings = this.targetElement.getBoundingClientRect();
    this.config.width = boundings.width;
    this.config.height = boundings.height || window.innerHeight;

    // Compute aspect ratio
    this.config.aspect = this.config.width / this.config.height;
  }

  setScene() {
    this.scene = new THREE.Scene();
  }

  setCamera() {
    const aspect = this.config.aspect;
    const frustumHeight = 1; // Keeping a reference height
    const frustumWidth = frustumHeight * aspect;

    this.camera = new THREE.OrthographicCamera(
      -frustumWidth / 2,
      frustumWidth / 2,
      frustumHeight / 2,
      -frustumHeight / 2,
      -1000,
      1000
    );

    this.camera.position.z = 1; // Move the camera forward to see the plane
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(this.config.width, this.config.height);
    this.renderer.setPixelRatio(
      gsap.utils.clamp(1, 1.5, window.devicePixelRatio)
    );

    this.targetElement.appendChild(this.renderer.domElement);
  }

  setPlane() {
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  addEvents() {
    // gsap.ticker.add(this.update);

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);

    window.addEventListener('touchmove', this.onMouseMove);
    window.addEventListener('touchstart', this.onMouseDown);
    window.addEventListener('touchend', this.onMouseUp);

    window.addEventListener('wheel', this.onWheel);

    window.addEventListener('resize', () => this.onResize());
  }

  addPlanes() {
    const planes = [...document.querySelectorAll('.js-plane')];
    this.planes = planes.map((el, i) => {
      const plane = new Plane();
      plane.init(el, i);

      this.scene.add(plane);

      return plane;
    });

    console.log(this.planes);
  }

  /**
   * EVENTS
   */

  onResize() {
    this.setConfig();

    const aspect = this.config.aspect;
    const frustumHeight = 1;
    const frustumWidth = frustumHeight * aspect;

    this.camera.left = -frustumWidth / 2;
    this.camera.right = frustumWidth / 2;
    this.camera.top = frustumHeight / 2;
    this.camera.bottom = -frustumHeight / 2;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.config.width, this.config.height);
    this.renderer.setPixelRatio(this.config.pixelRatio);
  }

  onMouseMove = (e) => {
    const cursor = getCursor(e);
    if (!this.isDragging) return;

    this.tx = this.on.x + cursor.x * 2.5;
    this.ty = this.on.y - cursor.y * 2.5;
  };

  onMouseDown = (e) => {
    const cursor = getCursor(e);
    if (this.isDragging) return;

    this.isDragging = true;

    this.on.x = this.tx - cursor.x * 2.5;
    this.on.y = this.ty + cursor.y * 2.5;
  };

  onMouseUp = (e) => {
    const cursor = getCursor(e);
    if (!this.isDragging) return;

    this.isDragging = false;
  };

  onWheel = (e) => {
    const { mouse, firefox } = multipliers;

    this.wheel.x = e.wheelDeltaX || e.deltaX * -1;
    this.wheel.y = e.wheelDeltaY || e.deltaY * -1;

    if (e.deltaMode === 1) {
      this.wheel.x *= firefox;
      this.wheel.y *= firefox;
    }

    this.wheel.y *= mouse;
    this.wheel.x *= mouse;

    this.tx += this.wheel.x;
    this.ty -= this.wheel.y;
  };

  // Update
  update() {
    const xDiff = this.tx - this.cx;
    const yDiff = this.ty - this.cy;

    this.cx += xDiff * 0.085;
    this.cx = Math.round(this.cx * 100) / 100;

    this.cy += yDiff * 0.085;
    this.cy = Math.round(this.cy * 100) / 100;

    this.diff = Math.max(Math.abs(yDiff * 0.0001), Math.abs(xDiff * 0.0001));

    this.planes &&
      this.planes.forEach((plane) =>
        plane.update(this.cx, this.cy, this.max, this.diff)
      );

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(() => this.update());
  }
}

const getCursor = (e) => {
  if (
    e.type == 'touchstart' ||
    e.type == 'touchmove' ||
    e.type == 'touchend' ||
    e.type == 'touchcancel'
  ) {
    var evt = typeof e.originalEvent === 'undefined' ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    return {
      x: touch.pageX,
      y: touch.pageY,
    };
  } else if (
    e.type == 'mousedown' ||
    e.type == 'mouseup' ||
    e.type == 'mousemove' ||
    e.type == 'mouseover' ||
    e.type == 'mouseout' ||
    e.type == 'mouseenter' ||
    e.type == 'mouseleave'
  ) {
    return {
      x: e.clientX,
      y: e.clientY,
    };
  }
};
