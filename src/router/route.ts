import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
  {
    name: 'useCopm',
    path: '/components/useComp',
    component: () => import('packages/README.md')
  },
  {
    name: 'Button',
    path: '/components/Button',
    component: () => import('packages/Button/docs/README.md')
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
    name: 'CheckBox',
    path: '/components/CheckBox',
    component: () => import('packages/CheckBox/docs/README.md')
  },
  {
    name: 'Table',
    path: '/components/Table',
    component: () => import('packages/Table/docs/README.md')
  },
  {
    name: 'Textarea',
    path: '/components/Textarea',
    component: () => import('packages/Textarea/docs/README.md')
  }
]

export default route
