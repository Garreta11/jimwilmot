/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.jsx` route
 */

import { visionTool } from '@sanity/vision';
import { buildLegacyTheme, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

import Logo from './components/Logo/Logo';

const props = {
  '--white': '#F3EFD2',
  '--black': '#171717',
  '--brown': '#3B3429',
  '--red': '#FF0022',
  '--green': '#00B295',
  '--yellow': '#FDE74C',
};

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  // '--black': props['--black'],
  // '--white': props['--white'],

  // '--gray': '#666',
  // '--gray-base': '#666',

  '--component-bg': props['--black'],
  '--component-text-color': props['--white'],

  /* Brand */
  '--brand-primary': props['--brown'],

  // Default button
  '--default-button-color': props['--white'],
  '--default-button-primary-color': props['--brown'],
  '--default-button-success-color': props['--green'],
  '--default-button-warning-color': props['--yellow'],
  '--default-button-danger-color': props['--red'],

  /* State */
  '--state-info-color': props['--brown'],
  '--state-success-color': props['--green'],
  '--state-warning-color': props['--yellow'],
  '--state-danger-color': props['--red'],

  /* Navbar */
  '--main-navigation-color': props['--black'],
  '--main-navigation-color--inverted': props['--white'],
});

export default defineConfig({
  basePath: '/dashboard',
  projectId: 'w3dlp9lz',
  dataset: 'production',
  title: 'Wilberg - Dashboard',
  useCdn: true,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  icon: Logo,

  theme: myTheme,
});
