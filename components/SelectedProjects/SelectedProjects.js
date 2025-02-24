'use client';
import { useState } from 'react';
import styles from './SelectedProjects.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const SelectedProjects = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  console.log(projects);

  return (
    <div className={styles.selectedprojects}>
      {projects.projects.map((project, index) => (
        <Link
          key={index}
          href={`/work/${project.slug}`}
          className={`${styles.selectedprojects__item} ${
            hoveredIndex === index ? styles.hovered__item : ''
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <video
            className={`${styles.selectedprojects__item__video} ${
              hoveredIndex === index ? styles.hovered : ''
            }`}
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
            }`}
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
            <h3>
              {project.title}
              <span>
                &nbsp;|&nbsp;
                {project.category
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </span>
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SelectedProjects;
