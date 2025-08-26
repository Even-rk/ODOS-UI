<script setup>
import Basic from './basic.vue'
</script>

# Calendar 日历组件

日历组件，用于展示和选择日期。

## 基础用法

<Preview comp-name="Calendar" demo-name="basic">
  <Basic />
</Preview>

## API

### Props

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选中的日期值 | `string \| Date` | - |
| showDate | 当前展示的月份 | `string \| Date` | - |
| disabledDate | 禁用日期的判断函数 | `(date: Date) => boolean` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:value | 选中日期变化时触发 | `(value: string) => void` |
| update:showDate | 当前展示月份变化时触发 | `(value: string) => void` |