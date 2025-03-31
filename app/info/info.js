'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import { PortableText } from '@portabletext/react';
import ContactForm from '@/components/ContactForm/ContactForm';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Gradient from '@/components/Gradient/Gradient';

gsap.registerPlugin(ScrollTrigger);

const InfoWrapper = ({ data }) => {
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);

  /* Check if user uses GMAIL */
  const [emailHref, setEmailHref] = useState('');
  useEffect(() => {
    const gmailHref =
      'https://mail.google.com/mail/u/0/?fs=1&to=jim@wilberg.studio&tf=cm';
    const mailtoHref = 'mailto:jim@wilberg.studio';

    // Check if the user is using Gmail (basic check)
    const isGmailUser = navigator.userAgent.includes('Gmail');

    setEmailHref(isGmailUser ? gmailHref : mailtoHref);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { width: '10vw', height: '10dvh' },
        {
          width: '100vw',
          height: '100dvh',
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
      <Gradient />
      <div ref={imageRef} className={styles.page__image}>
        <img src={data.profile} alt='Page builder image' />
      </div>
      <div ref={wrapperRef} className={styles.page__wrapper}>
        <div className={styles.page__wrapper__description}>
          <PortableText value={data.description} />
        </div>

        <div className={styles.page__wrapper__items}>
          {data.items.map((item, index) => (
            <div className={styles.page__wrapper__items__data} key={index}>
              <p className={styles.page__wrapper__items__data__number}>
                {item.title}
              </p>
              <p className={styles.page__wrapper__items__data__text}>
                {item.number}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.page__contactform}>
        {/* <p className={styles.page__contactform__title}>[ Contact Form ]</p>
        <ContactForm /> */}
        <a
          className={styles.page__contactform__link}
          href={emailHref}
          target='_blank'
        >
          [ CONTACT ME ]
        </a>
      </div>
    </div>
  );
};

export default InfoWrapper;
