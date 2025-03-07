'use client';
import styles from './LoaderStudio.module.scss';
import { useEffect, useRef, useState } from 'react';
import useMousePosition from '@/app/hooks/useMousePosition';

const LoaderStudio = () => {
  const canvasRef = useRef(null);
  const { x, y } = useMousePosition();
  const positionRef = useRef({ x: 0, y: 0 });
  const [mouseMoved, setMouseMoved] = useState(false);

  const params = {
    pointsNumber: 40,
    widthFactor: 0.3,
    mouseThreshold: 0.6,
    spring: 0.4,
    friction: 0.5,
  };

  const trail = useRef(
    new Array(params.pointsNumber).fill(null).map(() => ({
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
    }))
  );

  useEffect(() => {
    positionRef.current.x = x;
    positionRef.current.y = y;
    setMouseMoved(true);
  }, [x, y]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.current.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? positionRef.current : trail.current[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(trail.current[0].x, trail.current[0].y);

      for (let i = 1; i < trail.current.length - 1; i++) {
        const xc = 0.5 * (trail.current[i].x + trail.current[i + 1].x);
        const yc = 0.5 * (trail.current[i].y + trail.current[i + 1].y);
        ctx.quadraticCurveTo(trail.current[i].x, trail.current[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, 'rgba(67,101,206,1)'); // Blue
        gradient.addColorStop(0.25, 'rgba(150,84,118,1)'); // Purple
        gradient.addColorStop(0.5, 'rgba(221,70,43,1)'); // Red
        gradient.addColorStop(0.75, 'rgba(227,212,49,1)'); // Yellow
        gradient.addColorStop(1, 'rgba(63,164,96,1)'); // Green
        ctx.strokeStyle = gradient;
        ctx.stroke();
      }
      ctx.lineTo(
        trail.current[trail.current.length - 1].x,
        trail.current[trail.current.length - 1].y
      );
      // ctx.stroke();

      requestAnimationFrame(update);
    };

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setupCanvas();
    update();
    window.addEventListener('resize', setupCanvas);

    return () => {
      window.removeEventListener('resize', setupCanvas);
    };
  }, [mouseMoved]);

  return (
    <div className={styles.loader}>
      <p className={styles.loader__title}>
        welcome to my
        <br />
        <span>[ STUDIO ]</span>
      </p>
      <canvas className={styles.loader__canvas} ref={canvasRef} />
    </div>
  );
};

export default LoaderStudio;
