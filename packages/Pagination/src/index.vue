<template>
  <div class="odos-pagination">
    <pagination
      v-bind="$attrs"
      :hideOnSinglePage="true"
      @change="changePage"
      :current="current"
      :total="total"
      :page-size="pageSize"
    >
      <template v-for="(_, name) in slots" #[name]="SlotProps">
        <slot :name="name" v-bind="SlotProps"></slot>
      </template>
    </pagination>
  </div>
</template>

<script setup lang="ts">
import { Pagination } from 'ant-design-vue'
import { useSlots, type SetupContext } from 'vue'
const { current, pageSize, total } = defineProps<{
  current: number
  pageSize?: number
  total: number
}>()

const slots = useSlots() as SetupContext['slots']

console.log(slots)

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
