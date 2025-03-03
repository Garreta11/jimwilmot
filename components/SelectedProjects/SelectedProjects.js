'use client';
import { useState, useContext, useRef } from 'react';
import styles from './SelectedProjects.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { TransitionContext } from '@/app/context/TransitionContext';
import { useRouter } from 'next/navigation';
import { projectSelectedProject } from '@/app/animations';
import { TimeContext } from '@/app/context/TimeContext';

const SelectedProjects = ({ projects }) => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const containerRef = useRef();
  const itemRefs = useRef([]);
  const videoRefs = useRef([]);

  const { timeline } = useContext(TransitionContext);
  const { setVideoTime } = useContext(TimeContext);

  const handleClickSelectedProject = (index, url) => {
    setClickedIndex(index);

    if (videoRefs.current[index]) {
      setVideoTime(videoRefs.current[index].currentTime);
      videoRefs.current[index].pause();
    }

    timeline.pause().clear();
    timeline.eventCallback('onComplete', () => {
      console.log('Video animation complete!');
      router.push(url);
      timeline.pause().clear();
    });

    timeline.add(
      projectSelectedProject(
        containerRef.current,
        itemRefs.current,
        itemRefs.current[index]
      )
    );

    timeline.play();
  };

  return (
    <div ref={containerRef} className={styles.selectedprojects}>
      {projects.projects.map((project, index) => (
        <Link
          key={index}
          href={`/work/${project.slug}`}
          className={`${styles.selectedprojects__item} ${
            hoveredIndex === index ? styles.hovered__item : ''
          }`}
          ref={(el) => (itemRefs.current[index] = el)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={(e) => {
            e.preventDefault();
            handleClickSelectedProject(index, `/work/${project.slug}`);
          }}
        >
          <video
            className={`${styles.selectedprojects__item__video} ${
              hoveredIndex === index ? styles.hovered : ''
            }`}
            ref={(el) => (videoRefs.current[index] = el)}
            muted
            loop
            autoPlay
            playsInline
          >
            <source src={project.heroUrl} type='video/mp4' />
            Your browser does not support the video tag.
          </video>

          <Image
            className={`${styles.selectedprojects__item__thumbnail} ${
              hoveredIndex === index ? styles.hovered : ''
            } ${clickedIndex === index ? styles.hidden : ''}`}
            src={project.thumbnailUrl}
            width={1440}
            height={1080}
            alt='image'
          />

          <div
            className={`${styles.selectedprojects__item__title} ${
              hoveredIndex === index ? styles.hovered : ''
            }`}
          >
            <p>
              {project.client} | {project.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SelectedProjects;
