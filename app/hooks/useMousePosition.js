'use client';
import { useState, useEffect, useRef } from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (event) => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: event.pageX, y: event.pageY });
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
