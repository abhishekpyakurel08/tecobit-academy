import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'course', 'status', 'createdAt'],
  },
  access: {
    // Anyone can submit an application (public form)
    create: () => true,
    // Only authenticated admins can read/update/delete
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    {
      name: 'educationLevel',
      type: 'select',
      required: true,
      options: [
        { label: "High School", value: "high-school" },
        { label: "Bachelor's", value: "bachelor" },
        { label: "Master's", value: "master" },
        { label: "PhD", value: "phd" },
        { label: "Other", value: "other" },
      ],
    },
    { name: 'college', type: 'text' },
    { name: 'course', type: 'relationship', relationTo: 'courses', required: true },
    { name: 'batch', type: 'relationship', relationTo: 'batches' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    { name: 'notes', type: 'textarea', admin: { description: 'Internal admin notes' } },
  ],
  timestamps: true,
}
