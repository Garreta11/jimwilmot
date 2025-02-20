import { defineType, defineField } from 'sanity';
import { PlayIcon } from '@sanity/icons';

export const aboutType = defineType({
  name: 'about',
  title: 'About page',
  type: 'document',
  icon: PlayIcon,
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
