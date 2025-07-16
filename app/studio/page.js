import StudioWrapper from './StudioWrapper';
import { getStudioProjects } from '../utils/sanity-utils';

export const dynamic = 'force-dynamic';

const Studios = async () => {
  const projects = await getStudioProjects();
  return <StudioWrapper projects={projects} />;
};

export default Studios;
