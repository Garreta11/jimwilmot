'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import styles from './Hero.module.scss';
import gsap from 'gsap';
import useMousePosition from '@/app/hooks/useMousePosition';
import { heroInitAnimation } from '@/app/animations';
import { LoadingContext } from '@/app/context/LoadingContext';
import Audio from '@/components/Audio/Audio';

const Hero = (props) => {
  const { media } = props;
  const mediaRef = useRef();
  const soundRef = useRef(); // Reference for hero__sound
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const [isMuted, setIsMuted] = useState(true);
  const { x, y } = useMousePosition();

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
    >
      <Suspense fallback={<p>Loading video...</p>}>
        <VideoComponent mediaRef={mediaRef} media={media} />
        <div className={`${styles.hero__sound} hero__sound`}>
          <Audio handleClick={handleClick} isMuted={isMuted} />
        </div>
      </Suspense>

      <div ref={soundRef} className={styles.hero__hello}>
        <p>{'[ HELLO ]'}</p>
      </div>
    </div>
  );
};

export default Hero;

const VideoComponent = ({ mediaRef, media }) => {
  useEffect(() => {
    heroInitAnimation(mediaRef.current);
  }, []);
  return (
    <video
      ref={mediaRef}
      className={`${styles.hero__media}`}
      muted
      autoPlay
      loop
      controls={false}
      playsInline
    >
      <source src={media} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
};
