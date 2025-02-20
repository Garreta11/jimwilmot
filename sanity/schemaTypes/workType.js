import { defineType, defineField } from 'sanity';

export const workType = defineType({
  name: 'work',
  title: 'Work',
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
      title: 'Title',
      type: 'string',
    }),
  ],
});
