import { defineType, defineField } from 'sanity';

export const studioType = defineType({
  name: 'studio',
  title: 'Studio',
  type: 'document',
  fieldsets: [
    {
      name: 'topRow',
      title: 'Studiio Project Info',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'topRow',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
      fieldset: 'topRow',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
