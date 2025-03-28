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
import { workPageAnimation } from '../animations';
import Gradient from '@/components/Gradient/Gradient';

const WorkPage = ({ projects, categories }) => {
  /* Hooks */
  const router = useRouter();
  const { x, y } = useMousePosition();

  /* useRefs */
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const mouseRef = useRef(null);
  const countRef = useRef(null);
  const videoRef = useRef(null);
  const videosRef = useRef([]);
  const indexScroll = useRef(0);
  const scrollOffset = useRef(0);
  const isTittleSelected = useRef(false);

  /* useStates */
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [count, setCount] = useState('01');
  const [isHovered, setIsHovered] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  /* useContext */
  const { timeline } = useContext(TransitionContext);
  const { setVideoTime } = useContext(TimeContext);

  /* START ANIMATION */
  useEffect(() => {
    workPageAnimation();
  }, []);

  /* Set FilteredProjects When Category Has Changed */
  useEffect(() => {
    videosRef.current = [];
    scrollOffset.current = 0;
    const f =
      selectedCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === selectedCategory);
    setFilteredProjects(f);
  }, [selectedCategory]);

  const normalizeAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));
  /* Show FilteredProjects */
  useEffect(() => {
    if (!filteredProjects.length) return;
    const radius =
      window.innerWidth > window.innerHeight
        ? window.innerHeight / 2
        : window.innerWidth / 2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / filteredProjects.length;

    const updatePosition = () => {
      if (isTittleSelected.current) return;
      indexScroll.current = parseInt(
        scrollOffset.current * filteredProjects.length
      );
      let closestIndex = -1;
      let maxX = -Infinity;

      filteredProjects.forEach((item, index) => {
        const angle = (index + indexScroll.current) * angleIncrement;
        const x = centerX + radius * Math.cos(angle) * 0.8;
        const y = centerY + radius * Math.sin(angle) * 0.8;

        const diff = Math.abs(normalizeAngle(angle));
        const maxAngle = Math.PI / 3;
        const newOpacity = diff >= maxAngle ? 0 : 1 - diff / maxAngle;
        const newScale = newOpacity;

        if (x > maxX) {
          maxX = x;
          closestIndex = index;
        }

        gsap.to(wrapperRef.current.children[index], {
          x,
          y,
          duration: 0.5,
          opacity: newOpacity,
          scale: newScale,
          ease: 'none',
        });
      });

      setCurrentProject(filteredProjects[closestIndex]);
      setCount(closestIndex.toString().padStart(2, '0'));
    };

    const handleWheel = (event) => {
      scrollOffset.current += event.deltaY * 0.0002; // Adjust sensitivity
      updatePosition();
    };

    updatePosition();
    document.addEventListener('wheel', handleWheel);
    return () => document.removeEventListener('wheel', handleWheel);
  }, [filteredProjects, currentProject]);

  /* Move Mouse Text */
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

  /* Show Mouse Text */
  useEffect(() => {
    if (mouseRef.current) {
      gsap.to(mouseRef.current, {
        opacity: isHovered ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);

  useEffect(() => {
    if (!videoRef.current) return;
    const videos = Array.from(videoRef.current.getElementsByTagName('video'));
    videos.forEach((video, index) => {
      const isActive = video.dataset.title === currentProject.title;
      if (isActive) {
        video.play();
      } else {
        video.pause();
      }
      gsap.to(video, {
        duration: 0.5,
        autoAlpha: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.5,
        ease: 'power2.out',
      });
    });
  }, [currentProject]);

  const handleClickVideo = () => {
    const videos = Array.from(videoRef.current.getElementsByTagName('video'));
    videos.forEach((video, index) => {
      if (video) {
        const isActive = video.dataset.title === currentProject.title;
        if (isActive) {
          setVideoTime(video.currentTime);
          video.pause();
        }
      }
    });

    timeline.pause().clear();
    const project = projects.find((project) => project === currentProject);
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

  const handleClickProjectTitle = (_index) => {
    isTittleSelected.current = true;

    const radius =
      window.innerWidth > window.innerHeight
        ? window.innerHeight / 2
        : window.innerWidth / 2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / filteredProjects.length;

    let closestIndex = -1;
    let maxX = -Infinity;

    const XX = Math.abs((parseInt(count) % filteredProjects.length) - _index);

    filteredProjects.forEach((item, index) => {
      const angle = (index + indexScroll.current - XX) * angleIncrement;
      const x = centerX + radius * Math.cos(angle) * 0.8;
      const y = centerY + radius * Math.sin(angle) * 0.8;

      const diff = Math.abs(normalizeAngle(angle));
      const maxAngle = Math.PI / 3;
      const newOpacity = diff >= maxAngle ? 0 : 1 - diff / maxAngle;
      const newScale = newOpacity;

      if (x > maxX) {
        maxX = x;
        closestIndex = index;
      }

      gsap.to(wrapperRef.current.children[index], {
        x,
        y,
        duration: 0.5,
        opacity: newOpacity,
        scale: newScale,
        ease: 'none',
      });
    });

    // setCurrentProject(filteredProjects[closestIndex]);
    setCount(closestIndex.toString().padStart(2, '0'));

    const videos = Array.from(videoRef.current.getElementsByTagName('video'));
    videos.forEach((video, index) => {
      if (video) {
        video.pause();
      }
    });
    setTimeout(() => {
      timeline.pause().clear();
      const project = projects.find(
        (project) => project === filteredProjects[closestIndex]
      );
      const url = `/work/${project.slug}`;
      // Set the onComplete callback globally on the timeline
      timeline.eventCallback('onComplete', () => {
        console.log('Video animation complete!');
        router.push(url);
        timeline.pause().clear();
      });

      timeline.add(projectSelectedFromWork(wrapperRef, videoRef, countRef));

      timeline.play();
    }, 500);
  };

  return (
    <div ref={containerRef} className={`${styles.page}`}>
      {/* Background Gradient */}
      <Gradient />

      {/* Projects List */}
      <div className={`${styles.page__wrapper} work__wrapper`} ref={wrapperRef}>
        {filteredProjects.map((item, index) => {
          return (
            <div
              key={index}
              className={`workItems ${styles.page__item} `}
              data-category={item.category}
            >
              <Link
                href={`/work/${item.slug}`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default Next.js Link navigation
                  setCurrentProject(item); // Ensures correct video is selected
                  handleClickProjectTitle(index); // Run the animation and navigation
                }}
              >
                <TextGlitch>
                  <div className={styles.page__item__clientcategory}>
                    <h3 className={styles.page__item__clientcategory__client}>
                      {item.client}
                    </h3>
                    <p className={styles.page__item__clientcategory__cat}>
                      {item.category
                        .split('-')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                    </p>
                  </div>
                  <h3>{item.title}</h3>
                </TextGlitch>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Videos */}
      <div
        ref={videoRef}
        className={`${styles.page__video} work__video`}
        onClick={() => handleClickVideo()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {filteredProjects.map((item, index) => {
          return (
            <video
              key={index}
              className={styles.page__video__media}
              data-title={item.title}
              data-project={item.client}
              data-hero={item.heroUrl}
              data-category={item.category}
              muted
              loop
              playsInline
              style={{ opacity: 0, visibility: 'hidden' }}
            >
              <source src={item.heroUrl} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          );
        })}

        <div ref={countRef} className={styles.page__video__count}>
          <p>
            [<span>{count}</span> /{' '}
            <span>{filteredProjects.length.toString().padStart(2, '0')}</span>]
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className={`${styles.page__categories} work__categories`}>
        <div
          className={`${styles.page__categories__item} ${
            selectedCategory === 'All'
              ? styles.page__categories__item__selected
              : ''
          }`}
          onClick={() => setSelectedCategory('All')}
        >
          <TextGlitch>
            <p>All</p>
          </TextGlitch>
        </div>
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.page__categories__item} ${
              selectedCategory === cat
                ? styles.page__categories__item__selected
                : ''
            }`}
          >
            <TextGlitch>
              <p>
                {cat
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </p>
            </TextGlitch>
          </div>
        ))}
      </div>

      {/* Mouse Text */}
      <div ref={mouseRef} className={styles.page__mouse}>
        <p>[ WATCH PROJECT ]</p>
      </div>
    </div>
  );
};

export default WorkPage;
