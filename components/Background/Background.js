'use client'; // Required for hooks in client components

import { usePathname } from 'next/navigation';
import styles from './Background.module.scss';

const Background = () => {
  const pathname = usePathname(); // Get the current URL path
  const isStudioPage = pathname === '/studio'; // Check if current path is "/studio"

  return (
    <div className={`background ${styles.background}`}>
      <div
        className={`background__rect ${styles.background__rect} ${styles.background__rect__topleft} ${
          isStudioPage ? styles.background__rect__studio : ''
        }`}
      ></div>
      <div
        className={`background__rect ${styles.background__rect} ${styles.background__rect__topright} ${
          isStudioPage ? styles.background__rect__studio : ''
        }`}
      ></div>
      <div
        className={`background__rect ${styles.background__rect} ${styles.background__rect__bottomleft} ${
          isStudioPage ? styles.background__rect__studio : ''
        }`}
      ></div>
      <div
        className={`background__rect ${styles.background__rect} ${styles.background__rect__bottomright} ${
          isStudioPage ? styles.background__rect__studio : ''
        }`}
      ></div>
    </div>
  );
};

export default Background;
