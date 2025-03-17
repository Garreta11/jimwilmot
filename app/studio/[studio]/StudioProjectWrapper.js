'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './page.module.scss';
import Link from 'next/link';
import TextGlitch from '@/components/TextGlitch/TextGlitch';

const StudioProjectWrapper = ({ project }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(imgRef.current, { opacity: 0 }, { opacity: 1, delay: 1 });
  }, []);

  return (
    <div className={styles.project}>
      <h2 className={styles.project__title}>[ {project.title} ]</h2>
      <img
        ref={imgRef}
        className={styles.project__img}
        src={project.thumbnailUrl}
      />

      <Link className={styles.project__goback} href='/studio'>
        <TextGlitch>
          <p>
            go back to my
            <br />
            <span>[ STUDIO ]</span>
          </p>
        </TextGlitch>
      </Link>
    </div>
  );
};

export default StudioProjectWrapper;
