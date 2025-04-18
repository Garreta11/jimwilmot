'use client';
import { usePathname } from 'next/navigation';
import TextGlitch from '../TextGlitch/TextGlitch';
import styles from './Footer.module.scss';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Footer = () => {
  const pathname = usePathname();
  const socialmedia = [
    {
      name: 'INSTAGRAM',
      src: 'https://instagram.com',
    },
    {
      name: 'LINKEDIN',
      src: 'https://linkedin.com',
    },
  ];

  const footerRef = useRef();

  useEffect(() => {
    if (pathname === '/') {
      footerRef.current.style.opacity = 0;
    } else {
      footerRef.current.style.opacity = 1;
    }
  }, [pathname]);

  return (
    <div ref={footerRef} className={`footer ${styles.footer}`}>
      <div className={styles.footer__contact}>
        <div>
          <p>contact@wilberg.studio</p>
        </div>
        <div>
          <p>+44 7710 196424</p>
        </div>
      </div>

      <div className={styles.footer__socialmedia}>
        {socialmedia.map((item, index) => (
          <div className={styles.footer__socialmedia__item} key={index}>
            <Link href={item.src}>
              <TextGlitch>{item.name}</TextGlitch>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
