<script setup>
import demo from './demo.vue'
import Position from './position.vue'



</script>

# Popconfirm 气泡确认框

## 基础使用

<Preview comp-name="Popconfirm" demo-name="demo">
  <demo />
</Preview>
 
## 位置方向

<Preview comp-name="Popconfirm" demo-name="position">
  <Position />
</Preview>

## Popconfirm API

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| width | 	弹层宽度，最小宽度 200px | number | 200 |
| position | 位置方向 | top\| left \| right \| bottom  | top |
| teleported | 	是否将 popover 的下拉列表插入至 body 元素 | boolean | false |
| persistent | 当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除 | boolean | false |
| hide-after | 关闭时的延迟 | number | 200 |
| persistent | 当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除 | boolean | false |
| css-bind | -- | -- | { padding:  |
| -- | -- | -- | -- |


## Popconfirm 事件

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| confirm | 点击确认按钮时触发 | Function:(e: MouseEvent) => void |
| cancel | 点击取消按钮时触发 | Function:(e: MouseEvent) => void |


## Popconfirm 插槽

| 插槽名 | 说明 | 类型 |
| ---- | ---- | ---- |
| reference | 	触发 Popconfirm 显示的 HTML 元素 | — |
| content | 非页脚内容 | — |
| actions | 页脚的内容 | Object : ({ confirm: (e: MouseEvent) => void, cancel: (e: MouseEvent) => void |

