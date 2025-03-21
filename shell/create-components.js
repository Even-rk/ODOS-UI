import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import inquirer from 'inquirer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取组件列表
const list = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'packages', 'list.json'), 'utf-8'))

// 组件模板
const componentTemplate = `<template>
  <div class="odos-{{name}}">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  // 属性定义
}>()

const emit = defineEmits<{
  // 事件定义
}>()
</script>

<style scoped lang="scss">
.odos-{{name}} {
  // 样式定义
}
</style>`

// 文档模板
const docTemplate = `<script setup>
import demo from './demo.vue'
import API from './api.vue'
</script>

# {{name}} {{zhName}}

## 基本使用

<Preview comp-name="{{name}}" demo-name="demo">
  <demo />
</Preview>

## {{name}} 属性

<API />`

// API文档模板
const apiTemplate = `<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'prop',
    default: '--',
    type: 'string',
    describe: '属性描述'
  }
]

const columns = [
  {
    title: '属性',
    dataIndex: 'attribute'
  },
  {
    title: '描述',
    dataIndex: 'describe'
  },
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '默认值',
    dataIndex: 'default'
  }
]
</script>`

// 示例模板
const demoTemplate = `<template>
  <odos-{{name}} />
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style scoped lang="scss">
</style>`

// 组件入口文件模板
const indexTemplate = `import type { App, Plugin } from 'vue'
import {{name}} from './src/index.vue'

export const {{name}}Plugin: Plugin = {
  install(app: App) {
    app.component('Odos{{name}}', {{name}})
  }
}

export { {{name}} }`

async function getInput() {
  // 让用户输入组件信息
  const { name, zhName, className } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '请输入组件名称（英文）[例：Button]：',
      validate: (input) => {
        if (!input) return '组件名称不能为空'
        if (!/^[A-Z][a-zA-Z]*$/.test(input)) return '组件名称必须以大写字母开头，只能包含字母'
        return true
      }
    },
    {
      type: 'input',
      name: 'zhName',
      message: '请输入组件中文名称[例：Button按钮]：',
      validate: (input) => {
        if (!input) return '中文名称不能为空'
        return true
      }
    },
    {
      type: 'input',
      name: 'className',
      message: '请输入组件类名（小写字母，多个单词用连字符连接）[例：button]：',
      validate: (input) => {
        if (!input) return '类名不能为空'
        if (!/^[a-z]+(-[a-z]+)*$/.test(input)) return '类名只能包含小写字母和连字符'
        return true
      }
    }
  ])

  return {
    name,
    zhName,
    className
  }
}

async function createComponent(component) {
  // 如果存在则退出
  if (list.some((item) => item.compName === component.name)) {
    console.log(`组件 ${component.name} 已存在！`)
    return
  }
  // 创建组件目录
  const componentDir = path.join(__dirname, '..', 'packages', component.name)
  const srcDir = path.join(componentDir, 'src')
  const docsDir = path.join(componentDir, 'docs')

  // 创建目录
  fs.mkdirSync(componentDir, { recursive: true })
  fs.mkdirSync(srcDir, { recursive: true })
  fs.mkdirSync(docsDir, { recursive: true })

  // 创建组件文件
  const componentContent = componentTemplate.replace(/{{name}}/g, component.name)
  fs.writeFileSync(path.join(srcDir, 'index.vue'), componentContent)

  // 创建文档文件
  const docContent = docTemplate.replace(/{{name}}/g, component.name).replace(/{{zhName}}/g, component.zhName)
  fs.writeFileSync(path.join(docsDir, 'README.md'), docContent)

  // 创建API文档
  fs.writeFileSync(path.join(docsDir, 'api.vue'), apiTemplate)

  // 创建示例文件
  const demoContent = demoTemplate.replace(/{{name}}/g, component.name)
  fs.writeFileSync(path.join(docsDir, 'demo.vue'), demoContent)

  // 创建入口文件
  const indexContent = indexTemplate.replace(/{{name}}/g, component.name)
  fs.writeFileSync(path.join(componentDir, 'index.ts'), indexContent)

  // 更新主入口文件
  const mainIndexPath = path.join(__dirname, '..', 'packages', 'index.ts')
  let mainIndexContent = fs.readFileSync(mainIndexPath, 'utf-8')

  // 添加导入语句
  const importStatement = `import { ${component.name}Plugin } from './${component.name}'\n`
  mainIndexContent = mainIndexContent.replace(
    /const Packages: Plugin\[\] = \[/,
    `${importStatement}const Packages: Plugin[] = [`
  )

  // 添加到Packages数组
  mainIndexContent = mainIndexContent.replace(
    /const Packages: Plugin\[\] = \[/,
    `const Packages: Plugin[] = [\n  ${component.name}Plugin,`
  )

  // 添加导出语句
  mainIndexContent = mainIndexContent.replace(
    /export \* from '\.\/[^']+';/g,
    `export * from './${component.name}';\n$&`
  )

  // 更新list.json
  list.push({
    compName: component.name,
    compZhName: component.zhName,
    compClassName: component.className
  })
  fs.writeFileSync(path.join(__dirname, '..', 'packages', 'list.json'), JSON.stringify(list, null, 2))
  console.log(`组件 ${component.name} 创建成功！`)
}

// // 执行创建组件
getInput(3).then((res) => {
  if (res) {
    createComponent(res)
  }
})

list.push({
  compName: 'Button',
  compZhName: '按钮',
  compClassName: 'button'
})
