import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'track', 'level', 'featured', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'fullDescription', type: 'textarea', required: true },
    { name: 'track', type: 'relationship', relationTo: 'tracks', required: true },
    { name: 'trackName', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'duration', type: 'text', required: true },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Intermediate', value: 'Intermediate' },
        { label: 'Advanced', value: 'Advanced' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      admin: { description: 'Course price in USD (0 = free)' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    {
      name: 'syllabus',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'lessons',
          type: 'array',
          fields: [
            {
              name: 'topic',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
