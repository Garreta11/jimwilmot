import Image from 'next/image';
import styles from './Hero.module.scss';
import { getImageDimensions } from '@sanity/asset-utils';

const Hero = (props) => {
  const { img } = props;

  // Get width & height dynamically
  const { width, height } = getImageDimensions(img);
  return (
    <div className={styles.hero}>
      <Image
        className={styles.hero__img}
        src={img}
        width={width}
        height={height}
        alt='Hero Image'
      />
    </div>
  );
};

export default Hero;
