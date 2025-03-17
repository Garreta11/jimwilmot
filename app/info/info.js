'use client';
import { useEffect, useRef } from 'react';
import styles from './page.module.scss';
import { PortableText } from '@portabletext/react';
import ContactForm from '@/components/ContactForm/ContactForm';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InfoWrapper = ({ data }) => {
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { width: '50vw', height: '50vh' },
        {
          width: '100vw',
          height: '100vh',
          right: 0,
          bottom: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <div className={styles.page}>
      <div ref={imageRef} className={styles.page__image}>
        <img src={data.profile} alt='Page builder image' />
      </div>
      <div ref={wrapperRef} className={styles.page__wrapper}>
        <div className={styles.page__wrapper__description}>
          <PortableText value={data.description} />
        </div>
      </div>
      <div className={styles.page__contactform}>
        <ContactForm />
      </div>
    </div>
  );
};

export default InfoWrapper;
