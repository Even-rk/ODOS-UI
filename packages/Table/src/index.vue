<template>
  <div class="odos-table">
    <div class="odos-table-title-cell">
      <div
        class="odos-table-title"
        v-for="(column, index) in columns"
        :key="index"
        :style="{ width: column.width }"
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
