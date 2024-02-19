import { createRouter, createWebHashHistory } from 'vue-router'
import type {
  RouteRecordRaw,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded
} from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/index.vue')
  },
  {
    name: 'layout',
    path: '/layout',
    redirect: '/components/useComp',
    component: () => import('@/layout/index.vue'),
    children: [
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
        name: 'Radio',
        path: '/components/Radio',
        component: () => import('packages/Radio/docs/README.md')
      },
      {
        name: 'Checkbox',
        path: '/components/Checkbox',
        component: () => import('packages/Checkbox/docs/README.md')
      }
    ]
  }
]

const routerConfig = {
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) {
    if (to.path !== from.path) {
      return { top: 0 }
    }
  }
}

const router = createRouter(routerConfig)

export default router
