'use client';
import styles from './TextGlitch.module.scss';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';

const TextGlitch = ({ children, delay = 5 }) => {
  const textRef = useRef();
  const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

  useEffect(() => {
    const text = new SplitType(textRef.current, { types: 'chars,words' });
    const CHARS = text.chars;

    for (let c = 0; c < CHARS.length; c++) {
      for (let g = 0; g < 10; g++) {
        CHARS[c].style.setProperty(
          `--char-${g}`,
          `"${GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]}"`
        );
      }
      CHARS[c].style.setProperty('--count', Math.random() * 5 + 1);
      CHARS[c].setAttribute('data-char', CHARS[c].textContent);
      CHARS[c].setAttribute('data-delay', `${delay}s`);
    }
  }, []);

  const restartAnimation = () => {
    const element = textRef.current;
    element.classList.remove(styles.active);
    void element.offsetWidth; // Force reflow (trick to restart animation)
    element.classList.add(styles.active);
  };

  return (
    <div
      ref={textRef}
      className={`${styles.glitch}`}
      onMouseEnter={restartAnimation} // Restart animation on hover
    >
      {children}
    </div>
  );
};

export default TextGlitch;
