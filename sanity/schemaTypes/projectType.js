import { defineField, defineType, defineArrayMember } from 'sanity';

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
      name: 'subtitle',
      type: 'string',
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
        layout: 'dropdown',
      },
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
