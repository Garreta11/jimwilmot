import styles from './page.module.scss';
import { getProject } from '@/app/utils/sanity-utils.js';
import ProjectWrapper from './ProjectWrapper';

const Project = async ({ params }) => {
  const { work } = await params;
  const project = await getProject(work);

  return <ProjectWrapper project={project} />;
};

export default Project;
