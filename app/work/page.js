import styles from './page.module.scss';
import Link from 'next/link';
import { getWorkpage, getProjectsList } from '../utils/sanity-utils';

const Work = async () => {
  const work = await getWorkpage('singleton-work');
  const projects = await getProjectsList();
  console.log(projects);
  return (
    <div className={styles.page}>
      <h1>{work.title}</h1>

      <div>
        {projects.map((item, index) => (
          <div key={index}>
            <Link href={`/work/${item.slug}`}>
              <h3>{item.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
