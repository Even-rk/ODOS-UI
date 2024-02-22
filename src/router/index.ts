import { createRouter, createWebHashHistory } from 'vue-router'
import route from './route'
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
    children: route
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
