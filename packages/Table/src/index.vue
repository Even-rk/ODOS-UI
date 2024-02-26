<template>
  <div class="odos-table-container" ref="tableRef" @scroll="handleScroll">
    <table class="odos-table">
      <thead class="odos-table-thead">
        <tr class="odos-table-tr">
          <th
            class="odos-table-th"
            v-for="(column, index) in columns"
            :key="index"
            :class="{
              'odos-table-title-fixed': column.fixed,
              'odos-table-title-fixed-left': column.fixed === 'left',
              'odos-table-title-fixed-right': column.fixed === 'right',
              'shadow-left': column.fixed === 'left' && shadowLeft,
              'shadow-right': column.fixed === 'right' && shadowRight
            }"
            :style="{ width: column.width }"
          >
            <span class="odos-table-span" :style="{ width: column.width }">
              {{ column.title }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="odos-table-tbody">
        <tr class="odos-table-tr" v-for="(content, index) in data" :key="index">
          <td
            class="odos-table-td"
            v-for="(column, i) in columns"
            :key="i"
            :class="{
              'odos-table-content-fixed': column.fixed,
              'odos-table-content-fixed-left': column.fixed === 'left',
              'odos-table-content-fixed-right': column.fixed === 'right',
              'shadow-left': column.fixed === 'left' && shadowLeft,
              'shadow-right': column.fixed === 'right' && shadowRight
            }"
          >
            {{ content[column.prop] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const { data, columns } = defineProps<{
  data: { [key: string]: any }[]
  columns: {
    title: string
    prop: string
    width: string | number
    slotName: string
    fixed: true | 'left' | 'right'
  }[]
}>()
const lastScroll = ref(0)
const shadowLeft = ref(false)
const shadowRight = ref(false)
const handleScroll = (e: Event) => {
  const divRef = e.target as HTMLDivElement
  if (divRef.scrollLeft !== lastScroll.value) {
    lastScroll.value = divRef.scrollLeft
  }
  if (lastScroll.value === 0) {
    shadowLeft.value = false
    shadowRight.value = true
  } else if (lastScroll.value + divRef.clientWidth >= divRef.scrollWidth) {
    shadowLeft.value = true
    shadowRight.value = false
  } else {
    shadowLeft.value = true
    shadowRight.value = true
  }
}
const tableRef = ref()
onMounted(() => {
  if (tableRef.value.scrollLeft !== lastScroll.value) {
    lastScroll.value = tableRef.value.scrollLeft
  }
  const ScrollRight = lastScroll.value + tableRef.value.clientWidth >= tableRef.value.scrollWidth
  if (lastScroll.value === 0 && !ScrollRight) {
    shadowLeft.value = false
    shadowRight.value = true
  }
})
</script>

<style lang="scss">
@import '/styles/table.scss';
</style>
