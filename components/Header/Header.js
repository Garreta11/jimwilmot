import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const links = [
    {
      name: 'work',
      href: '/work',
    },
    {
      name: 'info',
      href: '/info',
    },
    {
      name: 'studios',
      href: '/studios',
    },
  ];
  return (
    <div className={styles.header}>
      <Link className={styles.header__logo} href='/'>
        <div>
          <h1>Jim Wilberg</h1>
          <h3>Filmmaker & Creative Director</h3>
        </div>
      </Link>
      <Link href='/'>
        <Image src='/logo.svg' width={63} height={65} alt='logo' />
      </Link>
      <div className={styles.header__links}>
        {links.map((link, index) => (
          <div key={index}>
            <Link href={link.href}>{link.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
