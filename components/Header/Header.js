'use client'; // Required for hooks in client components

import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import TextGlitch from '../TextGlitch/TextGlitch';
import useMousePosition from '@/app/hooks/useMousePosition';
import { useEffect, useRef } from 'react';

const Header = () => {
  const pathname = usePathname(); // Get the current URL path
  const isStudioPage = pathname === '/studio'; // Check if current path is "/studio"

  const { x, y } = useMousePosition();

  const iconRef = useRef();

  const links = [
    {
      name: 'WORK',
      href: '/work',
    },
    {
      name: 'INFO',
      href: '/info',
    },
    {
      name: 'STUDIO',
      href: '/studio',
    },
  ];

  useEffect(() => {
    if (!iconRef.current) return;

    const intensity = 50;

    const icon = iconRef.current;
    const rect = icon.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;

    const deltaX = x - iconCenterX;
    const deltaY = y - iconCenterY;

    const rotateX = -(deltaY / window.innerHeight) * intensity;
    const rotateY = (deltaX / window.innerWidth) * intensity;

    gsap.to(icon, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 5000,
      ease: 'power2.out',
      duration: 1, // Smooth transition effect
    });
  }, [x, y]);

  return (
    <div className={`header ${styles.header}`}>
      <div className={styles.header__logo}>
        <Link className={styles.header__logo__wrapper} href='/'>
          <h1>{isStudioPage ? 'Wilberg.studio' : 'Jim Wilberg'}</h1>
          <h3>
            {isStudioPage
              ? 'CREATIVE SERVICES FOR BRANDS, ARTISTS AND LIVE SPACES'
              : 'FILM DIRECTOR FOR MUSIC, COMMERCIAL AND LIVE PROJECTS'}
          </h3>
        </Link>
      </div>
      <div className={styles.header__icon}>
        <Link ref={iconRef} href='/'>
          <Image
            src={isStudioPage ? '/logo-rainbow.png' : '/logo.svg'}
            width={63}
            height={65}
            alt='logo'
          />
        </Link>
      </div>
      <div className={styles.header__links}>
        {links.map((link, index) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href);
          return (
            <div
              key={index}
              className={`${styles.header__links__item} ${isActive ? styles.header__links__item__active : ''}`}
            >
              {link.href.startsWith('/studio') ? (
                <a href={link.href}>
                  <TextGlitch>{link.name}</TextGlitch>
                </a>
              ) : (
                <Link href={link.href}>
                  <TextGlitch>{link.name}</TextGlitch>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
