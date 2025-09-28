<template>
  <div class="demo-container">
    <SmartSelect
      v-model:value="titleValue"
      :options="titleOptions"
      title="类型"
      multiple
      placeholder="请选择类型"
    />
    <p class="result">选中值: {{ titleValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'

const titleOptions = [
  { label: '个人用户', value: 'personal' },
  { label: '企业用户', value: 'enterprise' },
  { label: '政府机构', value: 'government' },
  { label: '教育机构', value: 'education' }
]

const titleValue = ref('')
</script>

<style scoped lang="scss">
.demo-container {
  width: 100%;
  padding: 20px;

  .result {
    margin-top: 10px;
    color: #86909c;
    font-size: 14px;
  }
}
</style>
