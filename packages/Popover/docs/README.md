<script setup>
import demo from './demo.vue'
import Position from './position.vue'



</script>

# Popover 气泡框

## 基础使用

<Preview comp-name="Popover" demo-name="demo">
  <demo />
</Preview>

## 位置方向

<Preview comp-name="Popover" demo-name="position">
  <Position />
</Preview>

## Popover API

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| position | 位置方向 | top\| left \| right \| bottom \| topLeft \| topRight \| bottomLeft \| bottomRight \| leftTop \| leftBottom \| rightTop \| rightBottom | top |
| trigger | 触发 | hover \| click | hover |


## Popover 事件

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| openChange | 显示隐藏的回调 | Function(visible) |


## Popover 插槽

| 插槽名 | 说明 |
| ---- | ---- |
| -- | 触发 Popover 显示的 HTML 元素 |
| content | Popover 内容 |

