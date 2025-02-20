import styles from './page.module.scss';
import { getAboutpage } from '../utils/sanity-utils';

const About = async () => {
  const about = await getAboutpage('singleton-about');
  console.log(about);
  return (
    <div className={styles.page}>
      <h1>{about.title}</h1>
    </div>
  );
};

export default About;
