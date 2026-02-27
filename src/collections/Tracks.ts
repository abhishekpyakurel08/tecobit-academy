import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Tracks: CollectionConfig = {
  slug: 'tracks',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'icon', type: 'text', required: true },
    { name: 'courseCount', type: 'number', required: true, defaultValue: 0 },
  ],
}
