import 'vuetify/styles'
import { createVuetify, type IconSet, type IconProps } from 'vuetify'
import { en, id } from 'vuetify/locale'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { md3 } from 'vuetify/blueprints'
import type { VDataTable } from 'vuetify/lib/components/index.mjs'
export type DataTableHeaders = InstanceType<
  typeof VDataTable
>['$props']['headers']

function filename(path: string) {
  return path
    .split(/(\\|\/)/g)
    .pop()!
    .replace(/\.[^/.]+$/, '')
}

const svgIcons = Object.fromEntries(
  Object.entries(
    import.meta.glob('@/assets/icons/*.svg', {
      eager: true,
      query: '?raw',
      import: 'default',
    }),
  ).map(([k, v]) => [filename(k), v]),
)

const custom: IconSet = {
  component: (props: IconProps) =>
    h(props.tag, { innerHTML: svgIcons[props.icon as string] }),
}

const theme = {
  primary: localStorage.getItem('theme-primary') || '#0E9CA1',
}

export default createVuetify({
  blueprint: md3,
  locale: {
    locale: 'id',
    fallback: 'en',
    messages: { id, en },
  },
  defaults: {
    VSwitch: {
      color: 'primary',
    },
    VDataTable: {
      fixedHeader: true,
      hover: true,
    },
    VCard: {
      flat: true,
      border: true,
    },
    VBtn: { color: undefined },
    VNavigationDrawer: {
      VList: {
        nav: true,
        VListItem: {
          rounded: 'xl',
        },
      },
    },
    VChip: { rounded: 'lg' },
  },
  theme: {
    themes: {
      light: {
        colors: theme,
      },
      dark: {
        colors: theme,
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi, custom },
  },
  display: {
    mobileBreakpoint: 'sm',
  },
})
