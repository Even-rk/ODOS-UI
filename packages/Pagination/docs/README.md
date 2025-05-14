<script setup>
import Default from './default.vue'


</script>

# Pagination分页器

<Preview comp-name="Pagination" demo-name="default">
  <Default />
</Preview>

## Pagination API

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| v-model:current | 当前页码 | number | -- |
| v-model:pageSize | 每页条数 | number | 10 |
| total | 数据总数 | number | -- |


## Pagination 事件

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| change | current 或 pageSize 改变的回调，参数是改变后的页码及每页条数 | Function(page,pageSize) |

