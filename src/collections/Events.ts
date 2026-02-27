import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'type', 'location', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'time', type: 'text', admin: { description: 'e.g. 10:00 AM – 12:00 PM' } },
    { name: 'description', type: 'textarea', required: true },
    { name: 'location', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Workshop', value: 'workshop' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Hackathon', value: 'hackathon' },
        { label: 'Meetup', value: 'meetup' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'course', type: 'relationship', relationTo: 'courses' },
    { name: 'link', type: 'text' },
  ],
}
