import Hero from '@/components/Hero/Hero';
import styles from './page.module.scss';
import { getHomepage } from './utils/sanity-utils';

const Home = async () => {
  const home = await getHomepage('singleton-homepage');

  console.log(home);

  return (
    <div className={styles.page}>
      <Hero media={home.hero} />
    </div>
  );
};

export default Home;
