import { getProjectsList } from '../utils/sanity-utils';
import WorkPage from './work';

const Work = async () => {
  const projects = await getProjectsList();

  return <WorkPage projects={projects} />;
};

export default Work;
