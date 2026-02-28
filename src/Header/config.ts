import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topBar',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'text',
          defaultValue: 'info@tecobit.cloud',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+977 974-5697694',
        },
        {
          name: 'address',
          type: 'text',
          defaultValue: 'Pragatinagar Marga, Sankhamul-31, Kathmandu, Nepal',
        },
      ],
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
