'use client'; // Required for hooks in client components

import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname(); // Get the current URL path
  const isStudioPage = pathname === '/studio'; // Check if current path is "/studio"

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

  return (
    <div className={styles.header}>
      <Link className={styles.header__logo} href='/'>
        <div className={styles.header__logo__wrapper}>
          <h1>{isStudioPage ? 'Wilberg.studio' : 'Jim Wilberg'}</h1>
          <h3>
            {isStudioPage
              ? 'CREATIVE SERVICES FOR BRANDS, ARTISTS AND LIVE SPACES'
              : 'FILM DIRECTOR FOR MUSIC, COMMERCIAL AND LIVE PROJECTS'}
          </h3>
        </div>
      </Link>
      <Link className={styles.header__icon} href='/'>
        <Image src='/logo.svg' width={63} height={65} alt='logo' />
      </Link>
      <div className={styles.header__links}>
        {links.map((link, index) => (
          <div key={index} className={styles.header__links__item}>
            <Link href={link.href}>{link.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
