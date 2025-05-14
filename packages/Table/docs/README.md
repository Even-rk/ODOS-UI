<script setup>

import Default from './default.vue'
import Selection from './select.vue'
import Children from './children.vue'
import Fixed from './fixed.vue'

</script>

# Table表格

## 基础使用

<Preview comp-name="Table" demo-name="default">
  <Default />
</Preview>

## 可选择

<Preview comp-name="Table" demo-name="select">
  <Selection />
</Preview>

## 固定列

<Preview comp-name="Table" demo-name="fixed">
  <Fixed />
</Preview>

## 镶嵌子表格

<Preview comp-name="Table" demo-name="children">
  <Children />
</Preview>

# Table API

## Table 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| data | 数据数组 | Object[] | -- |
| columns | 表格列的配置描述 | array | -- |
| loading | 表格是否加载中 | boolean | false |
| scroll | 表格是否可滚动，也可以指定滚动区域的宽、高 | { x: number, y: number } | -- |
| isSelection | 是否开始多选模式 | boolean | false |
| emptyText | 自定义空数据时的显示文字 | string | -- |
| expandedRowRender | 控制镶嵌子表格 | boolean | false |


## Table slot

| 插槽名 | 说明 |
| ---- | ---- |
| expandedRowRender | 自定义镶嵌子表格 |


## Columns 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| align | 设置列的对齐方式 | left \| right \| center | left |
| title | 列头显示文字 | string | -- |
| width | 列宽度 | string \| number | -- |
| fixed | 列是否固定，可选 true(等效于 left) 'left' 'right' 需配合scroll属性使用 | boolean \| string | false |
| headerSlotName | 当前列自定义表头插槽名 v-slot:[headerSlotName]="{ title }" | string | -- |
| slotName | 当前列自定义表格内容插槽名 v-slot:[slotName]="{ record }" | string | -- |
