import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'rating', 'course', 'featured', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'studentName', type: 'text', required: true },
    { name: 'rating', type: 'number', required: true, min: 1, max: 5 },
    { name: 'content', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'currentPosition', type: 'text', admin: { description: 'e.g. ML Engineer at Google' } },
    { name: 'graduationYear', type: 'number', admin: { description: 'Year the student graduated' } },
    { name: 'course', type: 'relationship', relationTo: 'courses' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
