import styles from './page.module.scss';
import { getProject } from '@/app/utils/sanity-utils.js';
import { notFound } from 'next/navigation';

const Project = async ({ params }) => {
  const slug = params.work;
  const project = await getProject(slug);

  return (
    <div className={styles.page}>
      {project ? <h1>{project.title}</h1> : <h1>NO PROJECT FOUND</h1>}
    </div>
  );
};

export default Project;
