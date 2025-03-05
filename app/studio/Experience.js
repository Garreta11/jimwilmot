import * as THREE from 'three';
import gsap from 'gsap';

import Plane from './Plane';

const mouseMultiplier = 0.6;

const multipliers = {
  mouse: mouseMultiplier * 2,
};

export default class Experience {
  static instance;

  constructor(_options = {}) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    console.log('EXPERIENCE');

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

    this.dragIntensity = 10;

    this.isDragging = false;
    this.tl = gsap.timeline({ paused: true });

    this.el = document.querySelector('.js-grid');

    this.setConfig();
    this.setScene();
    this.setCamera();
    this.setRenderer();
    this.addPlanes();
    this.addEvents();

    // resize
    this.onResize();
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

    const { bottom, right } = this.el.getBoundingClientRect();

    this.max.x = right;
    this.max.y = bottom;
  }

  onMouseMove = (e) => {
    const cursor = getCursor(e);
    if (this.isDragging) {
      this.tx = this.on.x + cursor.x * this.dragIntensity;
      this.ty = this.on.y - cursor.y * this.dragIntensity;
    } else {
      // Apply a very subtle movement when just moving the mouse
      const smallMovementFactor = 0.01; // Adjust for desired sensitivity
      this.tx += (cursor.x - window.innerWidth / 2) * smallMovementFactor;
      this.ty += (cursor.y - window.innerHeight / 2) * smallMovementFactor;
    }
  };

  onMouseDown = (e) => {
    const cursor = getCursor(e);
    if (this.isDragging) return;

    this.isDragging = true;

    this.on.x = this.tx - cursor.x * this.dragIntensity;
    this.on.y = this.ty + cursor.y * this.dragIntensity;
  };

  onMouseUp = (e) => {
    if (!this.isDragging) return;

    this.isDragging = false;
  };

  onWheel = (e) => {
    const { mouse } = multipliers;

    this.wheel.x = e.wheelDeltaX || e.deltaX * -1;
    this.wheel.y = e.wheelDeltaY || e.deltaY * -1;

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

  // Destroy Events
  destroy() {
    // Remove event listeners
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', () => this.onResize());

    // Dispose Three.js objects
    this.planes?.forEach((plane) => this.scene.remove(plane));

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }

    Experience.instance = null;
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
