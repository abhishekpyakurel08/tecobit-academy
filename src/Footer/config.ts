import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slogan',
      type: 'text',
      required: true,
      defaultValue: 'Empowering the next generation of tech leaders with world-class education.',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      defaultValue: '+977 1234567890',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      defaultValue: 'info@tecobit.com',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      defaultValue: 'Kathmandu, Nepal',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'admissionButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Online Admission',
        },
        link({
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
