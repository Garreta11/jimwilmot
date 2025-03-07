import { projectType } from './projectType';
import { homeType } from './homeType';
import { workType } from './workType';
import { aboutType } from './aboutType';
import { studioType } from './studioType';
import { selectedProjectsType } from './selectedProjectsType';

export const schema = {
  types: [
    homeType,
    workType,
    aboutType,
    projectType,
    selectedProjectsType,
    studioType,
  ],
};
