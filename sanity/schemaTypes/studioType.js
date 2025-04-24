import { defineType, defineField, defineArrayMember } from 'sanity';

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
      name: 'client',
      title: 'Client',
      type: 'string',
      fieldset: 'topRow',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
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
    defineField({
      name: 'audio',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'descriptions',
      type: 'array',
      title: 'Descriptions',
      of: [
        defineArrayMember({
          name: 'description',
          title: 'Description',
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
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        defineArrayMember({
          name: 'media',
          title: 'Media',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'image.asset.originalFilename',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
});
