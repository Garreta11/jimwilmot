import { defineField, defineType } from 'sanity';

export const selectedProjectsType = defineType({
  name: 'selectedProjects',
  title: 'Selected Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'projects' }] }],
      validation: (rule) =>
        rule.max(5).error('You can select up to 5 projects.'),
    }),
  ],
  __experimental_actions: ['update', 'publish'], // Removes "create" and "delete" actions
});
