'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';
import gsap from 'gsap';
import useMousePosition from '@/app/hooks/useMousePosition';
import { heroInitAnimation } from '@/app/animations';

const Hero = (props) => {
  const { media } = props;
  const mediaRef = useRef();
  const soundRef = useRef(); // Reference for hero__sound
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const [isMuted, setIsMuted] = useState(true);
  const { x, y } = useMousePosition();

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    heroInitAnimation(mediaRef.current);
  }, []);

  // Animate hero__sound to follow the mouse
  useEffect(() => {
    if (soundRef.current) {
      gsap.to(soundRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, [x, y]);

  useEffect(() => {
    if (soundRef.current) {
      gsap.to(soundRef.current, {
        opacity: isHovered ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);

  const handleClick = () => {
    if (mediaRef.current) {
      const video = mediaRef.current;

      if (isMuted) {
        video.volume = 0;
        // Unmute with fade-in effect
        gsap.to(video, {
          volume: 1,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            mediaRef.current.muted = !isMuted;
          },
        });
      } else {
        video.volume = 1;
        // Mute with fade-out effect
        gsap.to(video, {
          volume: 0,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            mediaRef.current.muted = !isMuted;
          },
        });
      }

      setIsMuted((prev) => !prev); // Toggle mute state
    }
  };

  return (
    <div
      className={styles.hero}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick} // Toggle sound on click
    >
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

      <div ref={soundRef} className={styles.hero__sound}>
        <p>{isMuted ? '[ PLAY SOUND ]' : '[ PAUSE SOUND ]'}</p>
      </div>
    </div>
  );
};

export default Hero;
