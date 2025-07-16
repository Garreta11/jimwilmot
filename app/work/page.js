import { getAllCategories, getProjectsList } from '../utils/sanity-utils';
import WorkPage from './work';

export const dynamic = 'force-dynamic';

const Work = async () => {
  const projects = await getProjectsList();
  const categories = await getAllCategories();

  return <WorkPage projects={projects} categories={categories} />;
};

export default Work;
