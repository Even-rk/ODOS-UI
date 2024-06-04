<template>
  <div class="odos-pagination">
    <pagination
      :hideOnSinglePage="true"
      :showSizeChanger="false"
      @change="changePage"
      :current="current"
      :total="total"
      :page-size="pageSize"
    />
  </div>
</template>

<script setup lang="ts">
import { Pagination } from 'ant-design-vue'
const { current, pageSize, total } = defineProps<{
  current: number
  pageSize?: number
  total: number
}>()

const emit = defineEmits<{
  (e: 'update:current', data: number): void
  (e: 'update:pageSize', data: number): void
  (e: 'change', page: number, pageSize: number): void
}>()
const changePage = (page: number, pageSize: number) => {
  emit('update:current', page)
  emit('update:pageSize', pageSize)
  emit('change', page, pageSize)
}
</script>

<style lang="scss" scoped>
@import '/styles/pagination.scss';
</style>
