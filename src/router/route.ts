import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
  {
    name: 'useCopm',
    path: '/components/useComp',
    component: () => import('packages/README.md')
  }
]

const modules = import.meta.glob('packages/*/docs/README.md')
for (const path in modules) {
  // 提取组件名称
  const componentName = path.split('/').filter(part => part)[1]
  route.push({
    name: componentName,
    path: `/components/${componentName}`,
    component: modules[path]
  })
}

export default route
