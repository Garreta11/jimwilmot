import { getWorkpage, getProjectsList } from '../utils/sanity-utils';
import WorkPage from './work';

const Work = async () => {
  const work = await getWorkpage('singleton-work');
  const projects = await getProjectsList();

  console.log(projects);
  return <WorkPage projects={projects} />;
};

export default Work;
