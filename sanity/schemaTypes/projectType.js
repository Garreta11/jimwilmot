import { defineField, defineType, defineArrayMember } from 'sanity';

export const projectType = defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fieldsets: [
    {
      name: 'topRow',
      title: 'Project Info',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      fieldset: 'topRow',
    }),
    defineField({
      name: 'client',
      type: 'string',
      fieldset: 'topRow',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      fieldset: 'topRow',
      options: {
        list: [
          { title: 'Live Promo', value: 'live-promo' },
          { title: 'Short Video', value: 'short-video' },
          { title: 'Music Video', value: 'music-video' },
          { title: 'Performance Film', value: 'performance-film' },
          { title: 'Live To Air Multicam', value: 'live-to-air-multicam' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Editorial', value: 'editorial' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      fieldset: 'topRow',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Hero',
      name: 'hero',
      type: 'file',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'credits',
      type: 'array',
      title: 'Credits',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        defineArrayMember({
          name: 'imageBlock',
          title: 'Image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        }),
        defineArrayMember({
          name: 'textBlock',
          title: 'Text',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        }),
      ],
    }),
  ],
});
