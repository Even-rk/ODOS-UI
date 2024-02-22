<template>
  <div class="odos-table">
    <div class="odos-table-title-cell">
      <div
        class="odos-table-title"
        v-for="(column, index) in columns"
        :key="index"
        :style="{ width: column.width }"
        :class="{
          'odos-table-title-fixed': column.fixed,
          'odos-table-title-fixed-left': column.fixed === 'left',
          'odos-table-title-fixed-right': column.fixed === 'right'
        }"
      >
        {{ column.title }}
      </div>
    </div>
    <div class="odos-table-content-cell" v-for="(content, index) in data" :key="index">
      <div
        class="odos-table-content"
        v-for="(column, index) in columns"
        :key="index"
        :style="{ width: column.width }"
        :class="{
          'odos-table-content-fixed': column.fixed,
          'odos-table-content-fixed-left': column.fixed === 'left',
          'odos-table-content-fixed-right': column.fixed === 'right'
        }"
      >
        {{ content[column.prop] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss">
@import '/styles/table.scss';
</style>
