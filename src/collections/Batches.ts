import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Batches: CollectionConfig = {
  slug: 'batches',
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
    { name: 'course', type: 'relationship', relationTo: 'courses', required: true },
    { name: 'startDate', type: 'date', required: true },
    { name: 'maxSeats', type: 'number', required: true },
    { name: 'seatsRemaining', type: 'number', required: true },
    { name: 'status', type: 'select', options: [{ label: 'Open', value: 'open' }, { label: 'Closed', value: 'closed' }], required: true, defaultValue: 'open' },
  ],
}
