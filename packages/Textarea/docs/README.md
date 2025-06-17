<script setup>
import Default from './default.vue'


</script>

# Textarea 文本域

## 基础使用

<Preview comp-name="Textarea" demo-name="default">
  <Default />
</Preview>

# Textarea API

## Textarea 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| v-model:value | 输入框内容 | string | -- |
| maxlength | 最大长度 | number | 500 |
| disabled | 是否禁用状态 | boolean | false |
| autoSize | 自适应内容高度 | boolean \| { minRows: number, maxRows: number } | -- |
| placeholder | 占位符 | string | 请输入 |
| showCount | 是否显示字数统计(需设置maxlength) | boolean | false |


## Textarea 事件

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| input | 在 Input 值改变时触发 | Function |
| change | 当绑定值变化时触发 | Function |
| focus | 当选择器的输入框获得焦点时触发 | Function |
| blur | 当选择器的输入框失去焦点时触发 | Function |

