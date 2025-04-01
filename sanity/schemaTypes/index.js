import { projectType } from './projectType';
import { homeType } from './homeType';
import { aboutType } from './aboutType';
import { studioType } from './studioType';
import { selectedProjectsType } from './selectedProjectsType';

export const schema = {
  types: [homeType, aboutType, projectType, selectedProjectsType, studioType],
};
