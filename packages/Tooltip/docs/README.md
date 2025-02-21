<script setup>
import Default from './default.vue'
import Placement from './placement.vue'
import Trigger from './trigger.vue'
</script>

# Tooltip 文字提示

简单的文字提示气泡框。

## 何时使用

- 用于展示文字提示、帮助信息或其他需要悬浮显示的内容
- 当目标元素有进一步的描述和相关操作时，可以收纳到气泡中

## 基本使用

最简单的用法，鼠标移入显示提示，移出消失。

<Preview comp-name="Tooltip" demo-name="default">
  <Default />
</Preview>

## 位置

支持 12 个不同的方位，分别为：`top`、`bottom`、`left`、`right`。

<Preview comp-name="Tooltip" demo-name="placement">
  <Placement />
</Preview>

## 触发方式

支持鼠标移入和点击两种触发方式。

<Preview comp-name="Tooltip" demo-name="trigger">
  <Trigger />
</Preview>

## API

### Props

| 参数               | 说明                                         | 类型                                   | 默认值  |
| ------------------ | -------------------------------------------- | -------------------------------------- | ------- |
| title              | 提示文字                                     | string \| slot                         | -       |
| placement          | 气泡框位置                                   | `top` \| `bottom` \| `left` \| `right` | `top`   |
| trigger            | 触发行为                                     | `hover` \| `click`                     | `hover` |
| mouseEnterDelay    | 鼠标移入后延时多少才显示 Tooltip，单位：毫秒 | number                                 | 100     |
| mouseLeaveDelay    | 鼠标移出后延时多少才隐藏 Tooltip，单位：毫秒 | number                                 | 100     |
| open(v-model)      | 用于手动控制浮层显隐                         | boolean                                | false   |
| defaultOpen        | 默认是否显隐                                 | boolean                                | false   |
| overlayClassName   | 卡片类名                                     | string                                 | -       |
| overlayStyle       | 卡片样式                                     | object                                 | -       |
| arrowPointAtCenter | 箭头是否指向目标元素中心                     | boolean                                | false   |
| autoAdjustOverflow | 气泡被遮挡时自动调整位置                     | boolean                                | true    |

### Events

| 事件名称   | 说明           | 回调参数                |
| ---------- | -------------- | ----------------------- |
| openChange | 显示隐藏的回调 | (open: boolean) => void |

### Slots

| 名称    | 说明                            |
| ------- | ------------------------------- |
| default | 触发 Tooltip 显示的元素         |
| title   | 提示文字内容，会覆盖 title 属性 |
