import StudioWrapper from './StudioWrapper';
import { getStudioProjects } from '../utils/sanity-utils';

const Studios = async () => {
  const projects = await getStudioProjects();
  return <StudioWrapper projects={projects} />;
};

export default Studios;
