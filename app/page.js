import Hero from '@/components/Hero/Hero';
import styles from './page.module.scss';
import { getHomepage } from './utils/sanity-utils';

const Home = async () => {
  const home = await getHomepage('singleton-homepage');

  return (
    <div className={styles.page}>
      <Hero img={home.heroImage} />
    </div>
  );
};

export default Home;
