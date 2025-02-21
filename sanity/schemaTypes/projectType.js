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
    defineField({
      title: 'Hero',
      name: 'hero',
      type: 'file',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Live Promo', value: 'live-promo' },
          { title: 'Music Video', value: 'music-video' },
          { title: 'Narrative', value: 'narrative' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Editorial', value: 'editorial' },
        ],
        layout: 'dropdown', // You can change this to 'radio' if you prefer
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
