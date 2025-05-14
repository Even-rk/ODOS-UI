<script setup>
import Default from './default.vue'

</script>

# Message

<Preview comp-name="Message" demo-name="default">
  <Default />
</Preview>

## Message 配置

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| content/data | 消息内容 | (string \| VNode) / string | -- |
| time | 显示时间，单位为毫秒。 设为 0 则不会自动关闭 | number | 3000 |
| key | 当前提示的唯一标志 | string \| number | -- |


### 全局方法

useDestroyMessage()

也可通过 useDestroyMessage(key) 来关闭一条消息。
