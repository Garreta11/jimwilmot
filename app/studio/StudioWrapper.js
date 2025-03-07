'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Experience from './Experience';
import LoaderStudio from '@/components/LoaderStudio/LoaderStudio';

const StudioWrapper = ({ projects }) => {
  const containerRef = useRef(null);
  const outputRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [hasWaited, setHasWaited] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      await Promise.all(
        projects.map(
          (item) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = item.thumbnailUrl;
              img.onload = resolve;
              img.onerror = resolve; // Handle errors gracefully
            })
        )
      );
      setImagesLoaded(true);
    };

    loadImages();

    // Start a 3-second timer
    const timer = setTimeout(() => {
      setHasWaited(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [projects]);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    if (outputRef.current) {
      outputRef.current.destroy();
      outputRef.current = null;
    }

    outputRef.current = new Experience({
      targetElement: containerRef.current,
    });

    return () => {
      outputRef.current?.destroy();
      outputRef.current = null;
    };
  }, [isLoaded]);

  useEffect(() => {
    if (imagesLoaded && hasWaited) {
      setIsLoaded(true);
    }
  }, [imagesLoaded, hasWaited]);

  return (
    <div className={styles.page}>
      {/* {!isLoaded && !hasWaited && <LoaderStudio />} */}
      <LoaderStudio />

      <div className={`js-grid ${styles.page__grid}`}>
        {projects.map((item, index) => (
          <div key={index}>
            <figure
              className={`js-plane ${styles.page__grid__plane}`}
              data-src={item.thumbnailUrl}
              data-slug={item.slug}
            >
              <img className={`js-img`} src={item.thumbnailUrl} alt='Trulli' />
            </figure>
          </div>
        ))}
      </div>

      <div
        className={`${styles.page__canvas} ${isLoaded ? styles.page__canvas__show : ''}`}
        ref={containerRef}
      ></div>
    </div>
  );
};

export default StudioWrapper;
