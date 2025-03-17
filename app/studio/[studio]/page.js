import { getStudioProject } from '@/app/utils/sanity-utils';
import StudioProjectWrapper from './StudioProjectWrapper';

const StudioProject = async ({ params }) => {
  const { studio } = await params;
  const studioProject = await getStudioProject(studio);

  return <StudioProjectWrapper project={studioProject} />;
};

export default StudioProject;
