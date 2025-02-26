import styles from './page.module.scss';
import { getAboutpage } from '../utils/sanity-utils';

const Info = async () => {
  const about = await getAboutpage('singleton-about');
  console.log(about);
  return (
    <div className={styles.page}>
      <p>[&emsp;INFO&emsp;]</p>
    </div>
  );
};

export default Info;
