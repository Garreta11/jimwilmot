'use client';

import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import TextGlitch from '../TextGlitch/TextGlitch';
import TextGlitchHeader from '../TextGlitchHeader/TextGlitchHeader';
import useMousePosition from '@/app/hooks/useMousePosition';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const pathname = usePathname(); // Get the current URL path
  const isStudioPage = pathname.includes('/studio'); // Check if pathname contains '/studio'

  const { x, y } = useMousePosition();

  const headerRef = useRef();
  const iconRef = useRef();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    if (pathname === '/') {
      headerRef.current.style.opacity = 0;
    } else {
      headerRef.current.style.opacity = 1;
    }
  }, [pathname]);

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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div ref={headerRef} className={`header ${styles.header}`}>
        <div className={styles.header__logo}>
          <Link className={styles.header__logo__wrapper} href='/'>
            <TextGlitchHeader>
              <h1>{isStudioPage ? 'Wilberg.studio' : 'Jim Wilberg'}</h1>

              <h3>
                {isStudioPage
                  ? 'CREATIVE SERVICES FOR BRANDS, ARTISTS AND LIVE SPACES'
                  : 'FILM DIRECTOR FOR MUSIC, COMMERCIAL AND LIVE PROJECTS'}
              </h3>
            </TextGlitchHeader>
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
        {/* Mobile burger button */}
        <div className={styles.header__burger} onClick={toggleMobileMenu}>
          <span className={styles.header__burger__dot}></span>
          <span className={styles.header__burger__dot}></span>
          <span className={styles.header__burger__dot}></span>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.header__mobile}>
          {/* Close Menu */}
          <div
            className={styles.header__mobile__close}
            onClick={toggleMobileMenu}
          >
            <span className={styles.header__mobile__close__line}></span>
            <span className={styles.header__mobile__close__line}></span>
          </div>

          {/* Description */}
          <div className={styles.header__mobile__text}>
            <p>
              {isStudioPage
                ? 'CREATIVE SERVICES FOR BRANDS, ARTISTS AND LIVE SPACES'
                : 'FILM DIRECTOR FOR MUSIC, COMMERCIAL AND LIVE PROJECTS'}
            </p>
          </div>

          {/* Links Mobile */}
          <div className={styles.header__mobile__links}>
            <div className={`${styles.header__mobile__links__item}`}>
              <a href='/' onClick={toggleMobileMenu}>
                <TextGlitch>HOME</TextGlitch>
              </a>
            </div>
            {links.map((link, index) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href);
              return (
                <div
                  key={index}
                  className={`${styles.header__mobile__links__item}`}
                >
                  {link.href.startsWith('/studio') ? (
                    <a href={link.href} onClick={toggleMobileMenu}>
                      <TextGlitch>{link.name}</TextGlitch>
                    </a>
                  ) : (
                    <Link href={link.href} onClick={toggleMobileMenu}>
                      <TextGlitch>{link.name}</TextGlitch>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.header__mobile__footer}>
            <div className={styles.header__mobile__socialmedia}>
              {socialmedia.map((item, index) => (
                <div
                  className={styles.header__mobile__socialmedia__item}
                  key={index}
                >
                  <Link href={item.src}>
                    <TextGlitch>{item.name}</TextGlitch>
                  </Link>
                </div>
              ))}
            </div>
            <Link href='/' onClick={toggleMobileMenu}>
              <Image
                src={isStudioPage ? '/logo-rainbow.png' : '/logo.svg'}
                width={63}
                height={65}
                alt='logo'
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
