'use client';
import { useRef } from 'react';
import styles from './Hero.module.scss';
import { getImageDimensions } from '@sanity/asset-utils';

const Hero = (props) => {
  const { media } = props;

  console.log(media);

  const mediaRef = useRef();

  // Get width & height dynamically
  // const { width, height } = getImageDimensions(img);
  return (
    <div className={styles.hero}>
      <video
        ref={mediaRef}
        className={`${styles.hero__media}`}
        muted
        autoPlay
        loop
        controls={false}
        playsInline={true}
      >
        <source src={media} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Hero;
