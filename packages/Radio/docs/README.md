<script setup>
import Default from './default.vue'
import Size from './size.vue'
import Alarm from './alarm.vue'
import ItemWidth from './itemWidth.vue'
import CircleView from './circle-view.vue'

</script>

# Radio 单选框

## 基础使用

<Preview comp-name="Radio" demo-name="default">
  <Default />
</Preview>

## 圆形

<Preview comp-name="Radio" demo-name="circle-view">
  <CircleView />
</Preview>

## 大小

<Preview comp-name="Radio" demo-name="size">
  <Size />
</Preview>

## 警示

<Preview comp-name="Radio" demo-name="alarm">
  <Alarm />
</Preview>

## 固定宽

<Preview comp-name="Radio" demo-name="itemWidth">
  <ItemWidth />
</Preview>

# Radio API

## Radio 属性

| 属性          | 描述                 | 类型                     | 默认值 |
| ------------- | -------------------- | ------------------------ | ------ |
| v-model:value | 关联选中的值         | string                   | --     |
| size          | 单选按钮大小         | small \| medium \| large | large  |
| itemWidth     | 设置单选按钮固定宽度 | string                   | auto   |

## Radio event

| 事件名 | 说明               | 类型             |
| ------ | ------------------ | ---------------- |
| change | 选中内容改变后触发 | Function($event) |

## RadioItem 属性

| 属性     | 描述                       | 类型             | 默认值 |
| -------- | -------------------------- | ---------------- | ------ |
| label    | 单选按钮的内容             | string \| number | --     |
| value    | modul:value 绑定的值       | string \| number | --     |
| alarm    | 是否设定当前按钮为警示按钮 | boolean          | false  |
| disabled | 禁用                       | boolean          | false  |

## RadioItem slot

| 插槽名 | 说明           |
| ------ | -------------- |
| --     | 自定义默认内容 |
