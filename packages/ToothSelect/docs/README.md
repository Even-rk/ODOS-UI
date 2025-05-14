<script setup>
import demo from './demo.vue'
import Disabled from './disabled.vue'

</script>

# ToothSelect 牙位选择器

## 基本使用

<Preview comp-name="ToothSelect" demo-name="demo">
  <demo />
</Preview>

## ToothSelect 选择禁用

<Preview comp-name="ToothSelect" demo-name="disabled">
  <Disabled />
</Preview>

## ToothSelect 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| v-model:value | 指定当前选中的条目 | string[] | [] |
| multipleToothList | 多生牙列options | { label: string; value: string; }[] | [] |
| range-limit | 范围限制 (fullMouth: 全口牙; tooth: 全口; bitewing: 咬翼; all: 全口 + 咬翼) | 'fullMouth' \| 'tooth' \| 'bitewing' \| 'all' | -- |
| name | 唯一标识（当一个页面使用了多个牙位选择器的情况下，需要设置），确保当前牙位选择器唯一 | string | -- |

