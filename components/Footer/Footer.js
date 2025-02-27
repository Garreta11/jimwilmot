import TextGlitch from '../TextGlitch/TextGlitch';
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
          <div className={styles.footer__socialmedia__item} key={index}>
            <Link href={item.src}>
              <TextGlitch>{item.name}</TextGlitch>
            </Link>
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
