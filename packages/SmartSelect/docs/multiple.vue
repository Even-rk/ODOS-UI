<template>
  <div class="demo-container">
    <SmartSelect
      v-model:value="multipleValue"
      :options="multipleOptions"
      placeholder="多选模式"
      :multiple="true"
      :allow-clear="true"
    />
    <p class="result">选中值: {{ multipleValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'

const multipleOptions = [
  { label: '前端开发', value: 'frontend' },
  { label: '后端开发', value: 'backend' },
  { label: '移动开发', value: 'mobile' },
  { label: '数据分析', value: 'data' },
  { label: '产品设计', value: 'design' },
  { label: '项目管理', value: 'pm' }
]

const multipleValue = ref([])
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;

  .result {
    margin-top: 10px;
    color: #86909c;
    font-size: 14px;
  }
}
</style>
