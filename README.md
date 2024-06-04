# 快速上手

ODOSUI -- Vue.js 3 UI 库

## 介绍

- <img src="public/favicon.ico" alt="image" style="zoom:25%;" /> 基于antd vue 封装的一套用于极橙系统开发的组件库
-  💪 基于 Vue 3 Composition API
-  🔥 用 TypeScript 编写

## 用法

### 安装

```shell
# npm
npm install odos-ui
# yarn
yarn add odos-ui
# pnpm
pnpm install odos-ui
# bun
bun install odos-ui
```

### 完整引入

main.ts

```ts
import { createApp } from 'vue'
import App from './App.vue'
// 引入样式和组件
import 'odos-ui/lib/style.css'
import ODOSUI from 'odos-ui'

createApp(App).use(ODOSUI).mount('#app')
```

### 按需导入

main.ts

```ts
// odos-ui-style
import 'odos-ui/lib/style.css'
```

\*\*.vue

```vue
<template>
  <Button type="primary">按钮</Button>
</template>

<script lang="ts" setup>
import { Button } from 'odos-ui'
</script>
```
