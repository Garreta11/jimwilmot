'use client';
import { useState, useEffect, useRef } from 'react';

const useMousePosition = (usePageCoordinates = false) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (event) => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        setMousePosition({
          x: usePageCoordinates ? event.pageX : event.clientX,
          y: usePageCoordinates ? event.pageY : event.clientY,
        });
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [usePageCoordinates]);

  return mousePosition;
};

export default useMousePosition;
