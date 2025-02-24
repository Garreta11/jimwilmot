'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';
import gsap from 'gsap';

const Hero = (props) => {
  const { media } = props;
  const mediaRef = useRef();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    gsap.fromTo(
      mediaRef.current,
      {
        maskSize: '0%',
      },
      {
        maskSize: '5000%',
        duration: 5,
        ease: 'expo.inOut',
      }
    );
  }, []);

  return (
    <div className={styles.hero}>
      <video
        ref={mediaRef}
        className={`${styles.hero__media}`}
        muted
        autoPlay
        loop
        controls={false}
        playsInline
        onLoadedData={handleVideoLoaded} // Detect when the video is loaded
      >
        <source src={media} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Hero;
