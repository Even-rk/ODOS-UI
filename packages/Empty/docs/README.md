<script setup>
import demo from './demo.vue'
import SIMPLE from './SIMPLE.vue'
import description from './description.vue'

</script>

# Empty 空状态

## 基本使用

<Preview comp-name="Empty" demo-name="demo">
  <demo />
</Preview>

## SIMPLE 风格

<Preview comp-name="Empty" demo-name="SIMPLE">
  <SIMPLE />
</Preview>

## 自定义内容

<Preview comp-name="Empty" demo-name="description">
  <description />
</Preview>

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| width | 空状态的宽 | string | -- |
| height | 空状态的高 | string | -- |
| description | 自定义文本内容 | string \| v-slot | 暂无数据 |
| image | 设置显示图片，为 string 时表示自定义图片地址 | DEFAULT \| SIMPLE \| string | DEFAULT |
