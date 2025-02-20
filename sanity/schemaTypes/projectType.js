import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
});
