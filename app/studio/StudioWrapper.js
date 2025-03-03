'use client';
import { useEffect, useRef } from 'react';
import styles from './page.module.scss';
import Experience from './Experience';

const StudioWrapper = () => {
  const containerRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    outputRef.current = new Experience({
      targetElement: containerRef.current,
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={`js-grid ${styles.page__grid}`}>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-3.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-2.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-1.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-3.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-2.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-1.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-3.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-2.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-1.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-3.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-2.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-1.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-1.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-3.jpg?width=1100&format=auto'
          ></figure>
        </div>
        <div>
          <figure
            className={`js-plane ${styles.page__grid__plane}`}
            data-src='https://assets.codepen.io/58281/lama-2.jpg?width=1100&format=auto'
          ></figure>
        </div>
      </div>

      <div className='page js-page'></div>

      <div className={styles.page__canvas} ref={containerRef}></div>
    </div>
  );
};

export default StudioWrapper;
