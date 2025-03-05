'use client';

import styles from './page.module.scss';
import Link from 'next/link';
import { useState, useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { TransitionContext } from '../context/TransitionContext';
import { useRouter } from 'next/navigation';
import { projectSelectedFromWork } from '../animations';
import TextGlitch from '@/components/TextGlitch/TextGlitch';
import { TimeContext } from '../context/TimeContext';
import useMousePosition from '@/app/hooks/useMousePosition';

const WorkPage = ({ projects }) => {
  const router = useRouter();
  const { x, y } = useMousePosition();
  const radius = 800;

  const [currentVideo, setCurrentVideo] = useState(projects[0] || '');
  const [mainProject, setMainProject] = useState(projects[0] || '');
  const [count, setCount] = useState('01');
  const [isHovered, setIsHovered] = useState(false);

  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const videoRefs = useRef([]);
  const videoRef = useRef(null);
  const countRef = useRef(null);
  const mouseRef = useRef(null);

  const { timeline } = useContext(TransitionContext);
  const { setVideoTime } = useContext(TimeContext);

  useEffect(() => {
    if (!wrapperRef.current || !projects.length) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / projects.length;
    let scrollOffset = 0;

    const normalizeAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));

    projects.forEach((item, index) => {
      const angle = index * angleIncrement;
      const x = centerX + radius * Math.cos(angle) * 0.9;
      const y = centerY + radius * Math.sin(angle) * 0.5;

      const diff = Math.abs(normalizeAngle(angle));
      const maxAngle = Math.PI / 3;
      const newOpacity = diff >= maxAngle ? 0 : 1 - diff / maxAngle;
      const newScale = newOpacity;

      gsap.set(wrapperRef.current.children[index], {
        x,
        y,
        opacity: newOpacity,
        scale: newScale,
      });
    });

    const updatePosition = () => {
      const indexScroll = parseInt(scrollOffset * projects.length);

      let closestIndex = -1;
      let maxX = -Infinity;

      itemRefs.current.forEach((item, index) => {
        const angle = (index + indexScroll) * angleIncrement;
        const x = centerX + radius * Math.cos(angle) * 0.9;
        const y = centerY + radius * Math.sin(angle) * 0.5;

        const diff = Math.abs(normalizeAngle(angle));
        const maxAngle = Math.PI / 3;
        const newOpacity = diff >= maxAngle ? 0 : 1 - diff / maxAngle;
        const newScale = newOpacity;

        if (x > maxX) {
          maxX = x;
          closestIndex = index;
        }

        gsap.to(item, {
          duration: 0.5,
          x,
          y,
          opacity: newOpacity,
          scale: newScale,
          ease: 'none',
        });
      });

      setCurrentVideo(projects[closestIndex]);
      setMainProject(projects[closestIndex]);
    };

    const handleWheel = (event) => {
      scrollOffset += event.deltaY * 0.0001; // Adjust sensitivity
      updatePosition();
    };

    document.addEventListener('wheel', handleWheel);
    return () => document.removeEventListener('wheel', handleWheel);
  }, [projects]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const isActive = projects[index] === currentVideo;

        if (isActive) {
          video.play();
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

    let index = projects.findIndex((project) => project === currentVideo);
    index++;
    setCount(index.toString().padStart(2, '0'));
  }, [currentVideo, projects]);

  useEffect(() => {
    if (mouseRef.current) {
      gsap.to(mouseRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, [x, y]);

  useEffect(() => {
    if (mouseRef.current) {
      gsap.to(mouseRef.current, {
        opacity: isHovered ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);

  const handleClickProject = () => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const isActive = projects[index] === currentVideo;
        if (isActive) {
          setVideoTime(video.currentTime);
          video.pause();
        }
      }
    });

    timeline.pause().clear();
    const project = projects.find((project) => project === currentVideo);
    const url = `/work/${project.slug}`;

    // Set the onComplete callback globally on the timeline
    timeline.eventCallback('onComplete', () => {
      console.log('Video animation complete!');
      router.push(url);
      timeline.pause().clear();
    });

    timeline.add(projectSelectedFromWork(wrapperRef, videoRef, countRef));

    timeline.play();
  };

  return (
    <div ref={containerRef} className={styles.page}>
      <div className={styles.page__wrapper} ref={wrapperRef}>
        {projects.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`workItems ${index} ${styles.page__item} ${index === projects.findIndex((p) => p === currentVideo) ? styles.page__item__current : ''}`}
            onMouseEnter={() => {
              setCurrentVideo(item);
            }}
            onMouseLeave={() => {
              setCurrentVideo(mainProject);
            }}
          >
            <Link
              href={`/work/${item.slug}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default Next.js Link navigation
                setCurrentVideo(item); // Ensures correct video is selected
                handleClickProject(); // Run the animation and navigation
              }}
            >
              <TextGlitch>
                <h3>
                  {item.client}
                  &emsp;
                  <span>
                    &nbsp;[&nbsp;
                    {item.category
                      .split('-')
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(' ')}
                    &nbsp;]&nbsp;
                  </span>
                </h3>
                <h3>{item.title}</h3>
              </TextGlitch>
            </Link>
          </div>
        ))}
      </div>

      <div
        ref={videoRef}
        className={styles.page__video}
        onClick={() => handleClickProject()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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

        <div ref={countRef} className={styles.page__video__count}>
          <p>
            [<span>{count}</span> / <span>{projects.length}</span>]
          </p>
        </div>
      </div>

      <div ref={mouseRef} className={styles.page__mouse}>
        <p>[ WATCH PROJECT ]</p>
      </div>
    </div>
  );
};

export default WorkPage;
