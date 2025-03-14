<template>
  <ConfigProvider :locale="zhCN">
    <Table
      v-bind="$attrs"
      class="odos-table"
      :loading="loading"
      :data-source="data"
      :rowClassName="rowClassName"
      :pagination="false"
      :expandIcon="expandIcon"
      :row-selection="isSelection ? rowSelection : undefined"
      :columns="columns"
      @change="sorter"
      :scroll="scroll"
    >
      <!-- 自定义表头 -->
      <template #headerCell="{ title, column }">
        <slot :name="(column as Column).headerSlotName" :title="title" />
      </template>
      <template #bodyCell="{ column, record, index, text }">
        <slot :name="(column as Column).slotName" :record="record" :index="index" :text="text" />
      </template>
      <!-- 自定义空数据时的显示内容 -->
      <template #emptyText>
        <Empty :description="emptyText" />
      </template>
      <!-- 镶嵌子表格 -->
      <template v-for="(_, name) in slots" #[name]="SlotProps">
        <slot :name="name" v-bind="SlotProps"></slot>
      </template>
    </Table>
  </ConfigProvider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider, Empty, Table } from 'ant-design-vue'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import { useSlots, type SetupContext, type VNode } from 'vue'
export type Column = {
  align?: 'left' | 'right' | 'center'
  title?: string
  dataIndex?: string
  width?: string | number
  headerSlotName?: string
  slotName?: string
  sorter?: Function | boolean
  fixed?: boolean | string
}
const { data, columns, loading, isSelection, emptyText, expandIcon } = defineProps<{
  data: { [key: string]: any }[]
  columns: Column[] | any
  loading?: boolean
  scroll?: { x?: number; y?: number }
  isSelection?: boolean
  emptyText?: string
  expandedRowRender?: boolean
  expandIcon?: () => VNode
}>()

const slots = useSlots() as SetupContext['slots']

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
const rowClassName = (_: Column, index: number) => {
  // 条件判断基于索引index决定是否添加特定的类名
  return index % 2 === 0 ? 'odos-table-even-row' : 'odos-table-odd-row'
}
</script>

<style lang="scss" scoped>
@mixin borderNone {
  border: none !important;
  border-inline-end: none !important;
}

.odos-table {
  width: 100%;
  :deep .ant-table {
    .ant-table-container {
      table {
        .ant-table-thead {
          .ant-table-cell {
            background-color: #f1f5ff;
          }
        }
        tr {
          td,
          th {
            @include borderNone();
          }
        }
        .odos-table-even-row {
          background-color: #fff;
          .ant-table-cell {
            background-color: #fff;
          }
          .ant-table-cell-row-hover {
            transition: all 0.8s;
            background-color: #f2f3f5;
          }
        }
        .odos-table-odd-row {
          background-color: #f8faff;
          .ant-table-cell {
            background-color: #f8faff;
          }
          .ant-table-cell-row-hover {
            transition: all 0.8s;
            background-color: #f2f3f5;
          }
        }
        .ant-table-expanded-row {
          * {
            background-color: #f2f3f5 !important;
          }
        }
      }
    }
  }
}
</style>
