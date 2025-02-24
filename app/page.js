import Hero from '@/components/Hero/Hero';
import styles from './page.module.scss';
import { getHomepage, getSelectedProjects } from './utils/sanity-utils';
import SelectedProjects from '@/components/SelectedProjects/SelectedProjects';

const Home = async () => {
  const home = await getHomepage('singleton-homepage');
  const selectedProjects = await getSelectedProjects('selectedProjects');

  console.log(selectedProjects);

  return (
    <div className={styles.page}>
      <Hero media={home.hero} />
      <SelectedProjects projects={selectedProjects} />
    </div>
  );
};

export default Home;
