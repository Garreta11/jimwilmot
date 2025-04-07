'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import { PortableText } from '@portabletext/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Gradient from '@/components/Gradient/Gradient';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

gsap.registerEffect({
  name: 'counter',
  extendTimeline: true,
  defaults: {
    end: 0,
    duration: 0.5,
    ease: 'power1',
    increment: 1,
    delay: 0,
  },
  effect: (targets, config) => {
    let tl = gsap.timeline();
    let num = targets[0].innerText.replace(/\,/g, '');
    targets[0].innerText = num;

    tl.to(
      targets,
      {
        duration: config.duration,
        innerText: config.end,
        delay: config.delay,
        //snap:{innerText:config.increment},
        modifiers: {
          innerText: function (innerText) {
            return gsap.utils
              .snap(config.increment, innerText)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          },
        },
        ease: config.ease,
      },
      0
    );

    return tl;
  },
});

const InfoWrapper = ({ data }) => {
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);
  const descriptionRef = useRef(null);
  const itemsRef = useRef([]);
  const numberRefs = useRef([]);

  /* Check if user uses GMAIL */
  const [emailHref, setEmailHref] = useState('');

  // Check Mail
  useEffect(() => {
    const gmailHref =
      'https://mail.google.com/mail/u/0/?fs=1&to=jim@wilberg.studio&tf=cm';
    const mailtoHref = 'mailto:jim@wilberg.studio';

    // Check if the user is using Gmail (basic check)
    const isGmailUser = navigator.userAgent.includes('Gmail');

    setEmailHref(isGmailUser ? gmailHref : mailtoHref);
  }, []);

  // Animations
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    // Description
    const text = new SplitType(descriptionRef.current, {
      types: 'chars,words',
    });
    const CHARS = text.chars;
    gsap.fromTo(
      CHARS,
      {
        autoAlpha: 0,
        y: 0,
      },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.1,
        onComplete: () => {
          if (imageRef.current) {
            gsap.to(imageRef.current, {
              opacity: 1,
              duration: 1,
              onComplete: () => {
                gsap.fromTo(
                  itemsRef.current,
                  {
                    opacity: 0,
                    y: 10,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                  }
                );
                // Numbers
                numberRefs.current.forEach((ref, index) => {
                  const endValue = parseInt(data.items[index].number, 10);

                  gsap.effects.counter(ref, {
                    end: endValue,
                    duration: 2,
                    ease: 'power2.out',
                    increment: 1,
                    delay: index,
                  });
                });
              },
            });
          }
        },
      }
    );
    // Image
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
  }, [data.items]);

  const addToRefs = (el) => {
    if (el && !numberRefs.current.includes(el)) {
      numberRefs.current.push(el);
    }
  };

  return (
    <div className={styles.page}>
      <Gradient />
      <div ref={imageRef} className={styles.page__image}>
        <img src={data.profile} alt='Page builder image' />
      </div>
      <div ref={wrapperRef} className={styles.page__wrapper}>
        <div ref={descriptionRef} className={styles.page__wrapper__description}>
          <PortableText value={data.description} />
        </div>

        <div className={styles.page__wrapper__items}>
          {data.items.map((item, index) => (
            <div
              key={index}
              className={styles.page__wrapper__items__data}
              ref={(ref) => {
                itemsRef.current[index] = ref;
              }}
            >
              <div className={styles.page__wrapper__items__data__number}>
                <p ref={addToRefs}>0</p>
                <span>{item.title === 'VIEWS' ? 'm+' : '+'}</span>
              </div>
              <p className={styles.page__wrapper__items__data__text}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.page__contactform}>
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
