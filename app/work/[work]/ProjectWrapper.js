'use client';
import styles from './page.module.scss';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import useMousePosition from '@/app/hooks/useMousePosition';
import { TransitionContext } from '@/app/context/TransitionContext';
import { TimeContext } from '@/app/context/TimeContext';
import { useRouter } from 'next/navigation';
import {
  useEffect,
  useRef,
  useState,
  useContext,
  useLayoutEffect,
} from 'react';
import gsap from 'gsap';
import { projectNextPrev } from '@/app/animations';

const ProjectWrapper = ({ project }) => {
  const router = useRouter();
  const { x, y } = useMousePosition();
  const mouseRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const nextPrevRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(true);

  const { timeline } = useContext(TransitionContext);
  const { videoTime } = useContext(TimeContext);

  useEffect(() => {
    videoRef.current.currentTime = videoTime;
  }, [videoTime]);

  // Animate hero__sound to follow the mouse
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

  const handleNextPrev = (project, other, url) => {
    timeline.pause().clear();
    timeline.eventCallback('onComplete', () => {
      console.log('Video animation complete!');
      router.push(url);
      timeline.pause().clear();
    });

    timeline.add(
      projectNextPrev(project.current, other.current, nextPrevRef.current)
    );

    timeline.play();
  };

  return (
    <div className={styles.page}>
      <div className={styles.page__wrapper}>
        <div className={styles.page__wrapper__title}>
          <div className={styles.page__wrapper__title__wrapper}>
            <h3>
              {project.client}
              &emsp;
              <span>
                &nbsp;[&nbsp;
                {project.category
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
                &nbsp;]&nbsp;
              </span>
            </h3>
            <h3>{project.title}</h3>
          </div>
        </div>

        <div className={styles.page__wrapper__credits}>
          <PortableText value={project.credits} />
        </div>

        <div className={styles.page__wrapper__builder}>
          {/* add page builder content here */}
          {project.pageBuilder?.map((block, index) => {
            if (block._type === 'imageBlock') {
              return (
                <div
                  key={index}
                  className={`${styles.page__wrapper__builder__item} ${styles.page__wrapper__builder__image}`}
                  onMouseEnter={() => setIsHovered(false)}
                  onMouseLeave={() => setIsHovered(true)}
                >
                  <img src={block.imageUrl} alt='Page builder image' />
                </div>
              );
            }
            if (block._type === 'textBlock') {
              return (
                <div
                  key={index}
                  className={`${styles.page__wrapper__builder__item} ${styles.page__wrapper__builder__text}`}
                >
                  <PortableText value={block.text} />
                </div>
              );
            }
            return null;
          })}
        </div>

        <div ref={nextPrevRef} className={styles.page__wrapper__nextprev}>
          <Link
            ref={prevRef}
            href={`/work/${project.prevProject.slug.current}`}
            className={styles.page__wrapper__nextprev__prev}
            onMouseEnter={() => setIsHovered(false)}
            onMouseLeave={() => setIsHovered(true)}
            onClick={(e) => {
              e.preventDefault();
              handleNextPrev(
                prevRef,
                nextRef,
                `/work/${project.prevProject.slug.current}`
              );
            }}
          >
            <video
              className={styles.page__wrapper__nextprev__prev__video}
              muted
              loop
              playsInline
            >
              <source src={project.prevProject.heroUrl} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <p className={styles.page__wrapper__nextprev__text}>[ prev ]</p>
          </Link>
          <Link
            ref={nextRef}
            href={`/work/${project.nextProject.slug.current}`}
            className={styles.page__wrapper__nextprev__next}
            onMouseEnter={() => setIsHovered(false)}
            onMouseLeave={() => setIsHovered(true)}
            onClick={(e) => {
              e.preventDefault();
              handleNextPrev(
                nextRef,
                prevRef,
                `/work/${project.nextProject.slug.current}`
              );
            }}
          >
            <video
              className={styles.page__wrapper__nextprev__prev__video}
              muted
              loop
              playsInline
            >
              <source src={project.nextProject.heroUrl} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <p className={styles.page__wrapper__nextprev__text}>[ next ]</p>
          </Link>
        </div>
      </div>

      <div className={styles.page__video}>
        <video
          ref={videoRef}
          className={styles.page__video__media}
          muted
          loop
          autoPlay
          playsInline
        >
          <source src={project.heroUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>

      <div ref={mouseRef} className={styles.page__playvideo}>
        <p>[ PLAY FULL VIDEO ]</p>
      </div>
    </div>
  );
};

export default ProjectWrapper;
