import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const links = [
    {
      name: 'Work',
      href: '/work',
    },
    {
      name: 'About',
      href: '/about',
    },
  ];
  return (
    <div className={styles.header}>
      <Link href='/'>
        {/* <h1>Logo</h1> */}
        <Image src='logo.svg' width={63} height={65} alt='logo' />
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
