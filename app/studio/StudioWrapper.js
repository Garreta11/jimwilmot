'use client';
import { useEffect, useRef } from 'react';
import styles from './page.module.scss';
import Experience from './Experience';

const StudioWrapper = ({ projects }) => {
  const containerRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
  }, []);

  return (
    <div className={styles.page}>
      <div className={`js-grid ${styles.page__grid}`}>
        {projects.map((item, index) => (
          <div key={index}>
            <figure
              className={`js-plane ${styles.page__grid__plane}`}
              data-src={item.thumbnailUrl}
            >
              <img className={`js-img`} src={item.thumbnailUrl} alt='Trulli' />
            </figure>
          </div>
        ))}
      </div>

      <div className={styles.page__canvas} ref={containerRef}></div>
    </div>
  );
};

export default StudioWrapper;
