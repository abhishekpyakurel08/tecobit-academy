import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Tecobit Academy',
    },
    {
      name: 'heroAdmissionText',
      type: 'text',
      required: true,
      defaultValue: 'Spring 2026 Admissions Now Open',
    },
    {
      name: 'heroEngineeringText',
      type: 'text',
      required: true,
      defaultValue: 'Engineering',
    },
    {
      name: 'heroDescription',
      type: 'text',
      required: true,
      defaultValue: 'Industry-leading programs designed to transform ambitious learners into world-class engineers.',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'iconType',
          type: 'select',
          options: [
            { label: 'Users', value: 'Users' },
            { label: 'BookOpen', value: 'BookOpen' },
            { label: 'Award', value: 'Award' },
            { label: 'Globe', value: 'Globe' },
          ],
          defaultValue: 'Users',
        },
      ],
      maxRows: 4,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'whyFeatures',
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
          name: 'iconType',
          type: 'select',
          options: [
            { label: 'Rocket', value: 'Rocket' },
            { label: 'Shield', value: 'ShieldCheck' },
            { label: 'Users', value: 'Users' },
            { label: 'Zap', value: 'Zap' },
          ],
          defaultValue: 'Rocket',
        },
      ],
      maxRows: 4,
    },
  ],
}
