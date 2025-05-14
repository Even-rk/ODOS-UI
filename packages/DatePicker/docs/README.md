<script setup>
import Default from './default.vue'

import Disabled from './disabled.vue'
import TitleDemo from './title.vue'
</script>

# DatePicker 日期选择器

# 基础使用

<Preview comp-name="DatePicker" demo-name="default">
  <Default />
</Preview>

# 禁用

<Preview comp-name="DatePicker" demo-name="disabled">
  <Disabled />
</Preview>

# 设置title

<Preview comp-name="DatePicker" demo-name="title">
  <TitleDemo />
</Preview>

## DatePicker API

## DatePicker 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| v-model:value | 日期框绑定值 | string | -- |
| width | 输入框的宽度 | string \| number | 100% |
| title | 用于设置title | string | -- |
| disabled | 是否禁用 | boolean | false |

## DatePicker 事件

| 事件名 | 说明 | 类型 |
| ------ | ---- | ---- |
| change | 日期变化时触发 | Function(value: string) |
| focus | 获得焦点时触发 | Function(event) |
| blur | 失去焦点时触发 | Function(event) |

