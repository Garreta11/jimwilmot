'use client';

import styles from './page.module.scss';
import Link from 'next/link';
import { useState, useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { TransitionContext } from '../context/TransitionContext';
import { useRouter } from 'next/navigation';
import { videoFullscreen } from './animations';

const WorkPage = ({ projects }) => {
  const router = useRouter();

  const radius = 600;
  const [currentVideo, setCurrentVideo] = useState(projects[0]?.heroUrl || '');
  const [mainProject, setMainProject] = useState(projects[0]?.heroUrl || '');
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const videoRefs = useRef([]);
  const videoRef = useRef(null);

  const { timeline } = useContext(TransitionContext);

  useEffect(() => {
    if (!wrapperRef.current || !projects.length) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / projects.length;

    projects.forEach((item, index) => {
      const angle = index * angleIncrement - Math.PI / 4;
      const x = centerX + radius * Math.cos(angle) * 0.9;
      const y = centerY + radius * Math.sin(angle) * 0.5;

      gsap.set(wrapperRef.current.children[index], {
        x,
        y,
      });
    });

    const updatePosition = () => {
      const scrollAmount = window.scrollY * 0.005;
      let maxX = -Infinity;
      let rightmostIndex = -1;

      itemRefs.current.forEach((item, index) => {
        const angle = index * angleIncrement + scrollAmount;
        const x = centerX + radius * Math.cos(angle) * 0.9;
        const y = centerY + radius * Math.sin(angle) * 0.5;
        const normalizeAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));
        const diff = Math.abs(normalizeAngle(angle));
        const maxAngle = Math.PI / 2;
        const newOpacity = diff >= maxAngle ? 0 : 1 - diff / maxAngle;

        const newScale = newOpacity;

        // To Know the selected project
        if (x > maxX) {
          maxX = x;
          rightmostIndex = index;
        }

        gsap.to(wrapperRef.current.children[index], {
          duration: 0.05,
          x,
          y,
          opacity: newOpacity,
          scale: newScale,
          ease: 'power1',
        });
      });

      setCurrentVideo(projects[rightmostIndex]?.heroUrl);
      setMainProject(projects[rightmostIndex]);
    };

    updatePosition();
    document.addEventListener('scroll', updatePosition);
    return () => document.removeEventListener('scroll', updatePosition);
  }, [projects]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const isActive = projects[index].heroUrl === currentVideo;

        if (isActive) {
          //video.play();
        } else {
          video.pause();
        }

        gsap.to(video, {
          duration: 0.5,
          autoAlpha: isActive ? 1 : 0,
          ease: 'power2.out',
        });
      }
    });
  }, [currentVideo, projects]);

  const handleClickProject = () => {
    timeline.pause().clear();
    const project = projects.find(
      (project) => project.heroUrl === currentVideo
    );
    const url = `/work/${project.slug}`;

    // Set the onComplete callback globally on the timeline
    timeline.eventCallback('onComplete', () => {
      console.log('Video animation complete!');
      router.push(url);
      timeline.pause().clear();
    });

    timeline.add(videoFullscreen(wrapperRef, videoRef));

    timeline.play();
  };

  return (
    <div ref={containerRef} className={styles.page}>
      <div className={styles.page__wrapper} ref={wrapperRef}>
        {projects.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            //className={styles.page__item}
            className={`workItems ${styles.page__item} ${index === projects.findIndex((p) => p.heroUrl === currentVideo) ? 'currentItem' : ''}`}
            onMouseEnter={() => {
              setCurrentVideo(item.heroUrl);
            }}
            onMouseLeave={() => {
              setCurrentVideo(mainProject?.heroUrl);
            }}
          >
            <Link
              href={`/work/${item.slug}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default Next.js Link navigation
                handleClickProject(); // Run the animation and navigation
              }}
            >
              <h3>
                {item.title}
                <span>
                  &nbsp;|&nbsp;
                  {item.category
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </span>
              </h3>
              <p>{item.subtitle}</p>
            </Link>
          </div>
        ))}
      </div>

      <div
        ref={videoRef}
        className={styles.page__video}
        onClick={() => handleClickProject()}
      >
        {projects.map((item, index) => (
          <video
            key={index}
            ref={(el) => (videoRefs.current[index] = el)}
            className={styles.page__video__media}
            muted
            loop
            playsInline
            style={{ opacity: 0, visibility: 'hidden' }}
          >
            <source src={item.heroUrl} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </div>
  );
};

export default WorkPage;
