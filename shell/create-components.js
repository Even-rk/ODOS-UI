import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import inquirer from 'inquirer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取组件列表
const list = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'packages', 'list.json'), 'utf-8'))

// 组件分类
const componentCategories = {
  basic: '基础组件',
  display: '展示组件',
  feedback: '反馈组件',
  navigation: '导航组件',
  special: '特殊组件',
  other: '其他组件'
}

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
  const { name, zhName, className, category } = await inquirer.prompt([
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
    },
    {
      type: 'list',
      name: 'category',
      message: '请选择组件分类：',
      choices: Object.entries(componentCategories).map(([key, value]) => ({
        name: value,
        value: key
      }))
    }
  ])

  return {
    name,
    zhName,
    className,
    category
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
  // 找到最后一个导入语句的位置
  const lastImportIndex = mainIndexContent.lastIndexOf('import')
  const lastImportLineEndIndex = mainIndexContent.indexOf('\n', lastImportIndex)

  if (lastImportIndex !== -1 && lastImportLineEndIndex !== -1) {
    // 在最后一个导入语句后添加新的导入语句
    mainIndexContent =
      mainIndexContent.slice(0, lastImportLineEndIndex + 1) +
      importStatement +
      mainIndexContent.slice(lastImportLineEndIndex + 1)
  }

  // 添加到Packages数组
  const packagesDeclarationRegex = /const\s+Packages\s*:\s*Plugin\[\]\s*=\s*\[/
  const packagesDeclarationMatch = mainIndexContent.match(packagesDeclarationRegex)

  if (packagesDeclarationMatch) {
    const insertIndex = packagesDeclarationMatch.index + packagesDeclarationMatch[0].length
    mainIndexContent =
      mainIndexContent.slice(0, insertIndex) +
      `\n  ${component.name}Plugin,` +
      mainIndexContent.slice(insertIndex)
  }

  // 添加导出语句
  const exportSection = mainIndexContent.indexOf('// 统一导出')
  if (exportSection !== -1) {
    const lastExportIndex = mainIndexContent.lastIndexOf('export *')
    const lastExportLineEndIndex = mainIndexContent.indexOf('\n', lastExportIndex)

    if (lastExportIndex !== -1 && lastExportLineEndIndex !== -1) {
      // 在最后一个导出语句后添加新的导出语句
      const newExportStatement = `export * from './${component.name}'\n`
      mainIndexContent =
        mainIndexContent.slice(0, lastExportLineEndIndex + 1) +
        newExportStatement +
        mainIndexContent.slice(lastExportLineEndIndex + 1)
    }
  }

  // 写入更新后的内容
  fs.writeFileSync(mainIndexPath, mainIndexContent)

  // 更新分类配置文件
  updateComponentCategory(component.name, component.category)

  // 更新list.json
  list.push({
    compName: component.name,
    compZhName: component.zhName,
    compClassName: component.className,
    category: component.category
  })
  fs.writeFileSync(path.join(__dirname, '..', 'packages', 'list.json'), JSON.stringify(list, null, 2))
  console.log(`组件 ${component.name} 创建成功！分类为：${componentCategories[component.category]}`)
}

// 更新组件分类配置
function updateComponentCategory(componentName, category) {
  const layoutPath = path.join(__dirname, '..', 'src', 'layout', 'component-categories.ts')
  let categoryContent

  // 检查文件是否存在，不存在则创建
  if (!fs.existsSync(layoutPath)) {
    // 创建初始分类配置文件
    categoryContent = `// 组件分类配置
export const componentGroups = {
  basic: [],
  display: [],
  feedback: [],
  navigation: [],
  special: [],
  other: []
}

// 分类名称
export const categoryNames = {
  basic: '基础组件',
  display: '展示组件',
  feedback: '反馈组件',
  navigation: '导航组件',
  special: '特殊组件',
  other: '其他组件'
}
`
  } else {
    categoryContent = fs.readFileSync(layoutPath, 'utf-8')
  }

  // 将组件添加到对应分类
  const categoryRegex = new RegExp(`(${category}:\\s*\\[)([^\\]]*)\\]`)
  const match = categoryContent.match(categoryRegex)

  if (match) {
    // 有现有组件列表
    let componentsList = match[2].trim()
    const newComponent = `'${componentName}'`

    // 添加组件到列表
    if (componentsList) {
      // 检查组件是否已存在
      if (!componentsList.includes(newComponent)) {
        componentsList += `, ${newComponent}`
      }
    } else {
      componentsList = newComponent
    }

    // 更新分类配置
    categoryContent = categoryContent.replace(categoryRegex, `$1${componentsList}]`)
  }

  // 写入更新后的分类配置
  fs.writeFileSync(layoutPath, categoryContent)
  console.log(`已将组件 ${componentName} 添加到 ${componentCategories[category]} 分类中`)
}

// 执行创建组件
getInput().then((res) => {
  if (res) {
    createComponent(res)
  }
})
