<template>
  <ConfigProvider :locale="zhCN">
    <Table
      class="odos-table"
      :loading="loading"
      :data-source="data"
      :row-selection="rowSelection"
      :columns="columns as any"
      bordered
      :scroll="scroll"
    >
      <!-- 自定义表头 -->
      <template #headerCell="{ column }">
        <slot :name="(column as Column).headerSlotName" />
      </template>
    </Table>
  </ConfigProvider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { Table, ConfigProvider } from 'ant-design-vue'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
type Column = {
  align: 'left' | 'right' | 'center'
  title: string
  dataIndex: string
  width: string | number
  fixed: true | 'left' | 'right'
  maxWidth: number
  minWidth: number
  headerSlotName: string
  sorter?: (a: any, b: any) => void
}
const { data, columns, loading, rowSelection } = defineProps<{
  data: { [key: string]: any }[]
  columns: Column[]
  loading?: boolean
  scroll?: { x: number; y: number }
  rowSelection?: TableRowSelection
}>()
</script>

<style lang="scss">
@import '/styles/table.scss';
</style>
