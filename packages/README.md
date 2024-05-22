# 快速上手

介绍如何在项目中使用 ODOS—UI

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
// sass 使用改为  odos-ui/styles/index.scss
import 'odos-ui/lib/style.css' 
import ODOSUI from 'odos-ui'

createApp(App).use(ODOSUI).mount('#app')
```

### 按需导入

utils/odos-ui.ts

```ts
import 'odos-ui/styles/button.scss'
import 'odos-ui/styles/xx.scss'
```

main.ts

```ts
import '@/utils/odos-ui.ts'
```

**.vue

```vue
<template>
  <Button type="primary">按钮</Button>
</template>

<script lang="ts" setup>
import { Button } from 'odos-ui'
</script>
```

