'use client';
import styles from './page.module.scss';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PortableText } from '@portabletext/react';
import Experience from './Experience';
import Link from 'next/link';
import TextGlitch from '@/components/TextGlitch/TextGlitch';
import StudioMouse from '@/components/StudioMouse/StudioMouse';

const StudioProjectWrapper = ({ project }) => {
  const outputRef = useRef(null);
  const containerRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Load all images
    const loadImages = async () => {
      await Promise.all(
        project?.images.map(
          (item) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = item.imageUrl;
              img.onload = resolve;
              img.onerror = resolve; // Handle errors gracefully
            })
        )
      );
      setImagesLoaded(true);
    };
    loadImages();
  }, [project]);

  useEffect(() => {
    if (!imagesLoaded) return;
    // Init Animation
    // gsap.fromTo(imgRef.current, { opacity: 0 }, { opacity: 1, delay: 1 });

    // Clear Output
    if (outputRef.current) {
      outputRef.current.destroy();
      outputRef.current = null;
    }

    outputRef.current = new Experience({
      targetElement: containerRef.current,
      //router,
      //timeline,
    });

    return () => {
      outputRef.current?.destroy();
      outputRef.current = null;
    };
  }, [imagesLoaded]);

  return (
    <div className={styles.project}>
      <StudioMouse />
      <div className={`js-grid ${styles.project__grid}`}>
        {project.images?.map((item, index) => (
          <div key={index}>
            <figure
              className={`js-plane ${styles.project__grid__plane}`}
              data-src={item.imageUrl}
            >
              <img className={`js-img`} src={item.imageUrl} alt='Trulli' />
            </figure>
          </div>
        ))}
      </div>

      <div className={styles.project__wrapper}>
        <div className={styles.project__wrapper__title}>
          <h1>{project.client}</h1>
          <h1>{project.title}</h1>
        </div>
        {project.descriptions?.map((item, index) => (
          <div className={styles.project__wrapper__item} key={index}>
            <PortableText value={item.text} />
          </div>
        ))}
      </div>

      <div
        className={`${styles.project__canvas} ${imagesLoaded ? styles.project__canvas__show : ''}`}
        ref={containerRef}
      ></div>

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
