<template>
  <ConfigProvider :locale="zhCN">
    <Table
      class="odos-table"
      :loading="loading"
      :data-source="data"
      :pagination="false"
      :row-selection="isSelection ? (rowSelection as any) : null"
      :columns="columns as any"
      @change="sorter"
      bordered
      :scroll="scroll"
    >
      <!-- 自定义表头 -->
      <template #headerCell="{ column }">
        <slot :name="(column as Column).headerSlotName" />
      </template>
      <template #bodyCell="{ column, record }">
        <slot :name="(column as Column).slotName" :record="record" />
      </template>
    </Table>
  </ConfigProvider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { Table, ConfigProvider } from 'ant-design-vue'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
export type Column = {
  align?: 'left' | 'right' | 'center'
  title?: string
  dataIndex?: string
  width?: string | number
  maxWidth?: number
  minWidth?: number
  headerSlotName?: string
  slotName?: string
  sorter?: Function | boolean
  fixed?: boolean | string
}
const { data, columns, loading, isSelection } = defineProps<{
  data: { [key: string]: any }[]
  columns: Column[]
  loading?: boolean
  scroll?: { x?: number; y?: number }
  isSelection?: boolean
}>()

const emit = defineEmits<{
  (e: 'selectChange', row: any[]): void
  (e: 'sorter', row: { field: string; order: string }): void
}>()
const rowSelection: TableRowSelection = {
  onChange: (_, row) => {
    emit('selectChange', row)
  }
}
const sorter = (_: any, __: any, sorter: any) => {
  emit('sorter', sorter)
}
</script>

<style lang="scss">
@import '/styles/table.scss';
</style>
