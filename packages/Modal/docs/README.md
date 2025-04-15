<script setup>
import ModalDefault from './default.vue'
</script>
# Modal 对话框

## 基础使用

<Preview comp-name="Modal" demo-name="default">
  <ModalDefault />
</Preview>

## Modal API

### Modal 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 是否显示对话框 | boolean | false |
| title | 对话框标题 | string | - |

### Modal 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| cancel | 点击取消按钮时的回调 | () => void |
| ok | 点击确认按钮时的回调 | () => void |

### Modal 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 对话框内容content |
| header | 自定义标题区域 |
| footer | 自定义底部按钮区域 |