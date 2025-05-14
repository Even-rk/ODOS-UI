<script setup>
import Default from './default.vue'
import Size from './size.vue'
import Alarm from './alarm.vue'
import Mutex from './mutex.vue'
import ItemWidth from './itemWidth.vue'
</script>

# CheckBox 多选框

## 基础使用

<Preview comp-name="CheckBox" demo-name="default">
  <Default />
</Preview>

## 大小

<Preview comp-name="CheckBox" demo-name="size">
  <Size />
</Preview>

## 警示

<Preview comp-name="CheckBox" demo-name="alarm">
  <Alarm />
</Preview>

## 固定宽

<Preview comp-name="CheckBox" demo-name="itemWidth">
  <ItemWidth />
</Preview>

# 互斥

<Preview comp-name="CheckBox" demo-name="mutex">
  <Mutex />
</Preview>

# CheckBox API

## CheckBox 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| v-model:value | 关联选中的值 | string[] \| number[] | -- |
| size | 多选按钮大小 | small \| medium \| large | large |
| itemWidth | 设置多选按钮固定宽度 | string | auto |
| mutex | 是否开启互斥 | boolean | false |
| mutexOptionValue | 互斥的选项value值 | string[] \| number[] | [] |

## CheckBox event

| 事件名 | 说明 | 类型 |
| ------ | ---- | ---- |
| change | 选中内容改变后触发 | Function($event) |

## CheckBoxItem 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| label | 多选按钮的内容 | string \| number | -- |
| value | modul:value 绑定的值 | string \| number | -- |
| alarm | 是否设定当前按钮为警示按钮 | boolean | false |
| disabled | 禁用 | boolean | false |

## CheckBoxItem slot

| 插槽名 | 说明 |
| ------ | ---- |
| -- | 自定义默认内容 |
