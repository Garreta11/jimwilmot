import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
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

  return (
    <div className={styles.footer}>
      <div className={styles.footer__socialmedia}>
        {socialmedia.map((item, index) => (
          <div key={index}>
            <Link href={item.src}>{item.name}</Link>
          </div>
        ))}
      </div>

      <div className={styles.footer__contact}>
        <div>
          <p>jim@wilberg.studio</p>
        </div>
        <div>
          <p>+44 7710 196424</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
