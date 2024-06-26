import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
  {
    name: 'useCopm',
    path: '/components/useComp',
    component: () => import('packages/README.md')
  },
  {
    name: 'Audio',
    path: '/components/Audio',
    component: () => import('packages/Audio/docs/README.md')
  },
  {
    name: 'Button',
    path: '/components/Button',
    component: () => import('packages/Button/docs/README.md')
  },
  {
    name: 'CheckBox',
    path: '/components/CheckBox',
    component: () => import('packages/CheckBox/docs/README.md')
  },
  {
    name: 'DatePicker',
    path: '/components/DatePicker',
    component: () => import('packages/DatePicker/docs/README.md')
  },
  {
    name: 'Empty',
    path: '/components/Empty',
    component: () => import('packages/Empty/docs/README.md')
  },
  {
    name: 'Icon',
    path: '/components/Icon',
    component: () => import('packages/Icon/docs/README.md')
  },
  {
    name: 'Input',
    path: '/components/Input',
    component: () => import('packages/Input/docs/README.md')
  },
  {
    name: 'InputNumber',
    path: '/components/InputNumber',
    component: () => import('packages/InputNumber/docs/README.md')
  },
  {
    name: 'Message',
    path: '/components/Message',
    component: () => import('packages/Message/docs/README.md')
  },
  {
    name: 'Pagination',
    path: '/components/Pagination',
    component: () => import('packages/Pagination/docs/README.md')
  },
  {
    name: 'Popover',
    path: '/components/Popover',
    component: () => import('packages/Popover/docs/README.md')
  },
  {
    name: 'Radio',
    path: '/components/Radio',
    component: () => import('packages/Radio/docs/README.md')
  },
  {
    name: 'Select',
    path: '/components/Select',
    component: () => import('packages/Select/docs/README.md')
  },
  {
    name: 'Table',
    path: '/components/Table',
    component: () => import('packages/Table/docs/README.md')
  },
  {
    name: 'Tabs',
    path: '/components/Tabs',
    component: () => import('packages/Tabs/docs/README.md')
  },
  {
    name: 'Tag',
    path: '/components/Tag',
    component: () => import('packages/Tag/docs/README.md')
  },
  {
    name: 'Textarea',
    path: '/components/Textarea',
    component: () => import('packages/Textarea/docs/README.md')
  }
]

export default route
