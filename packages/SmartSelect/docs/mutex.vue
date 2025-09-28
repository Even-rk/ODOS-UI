<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>互斥选择模式</h4>
      <SmartSelect
        v-model:value="mutexValue"
        :options="mutexOptions"
        placeholder="互斥选择"
        :mutex="true"
        :multiple="true"
        :mutexOptionValue="mutexOptionValue"
      />
      <p class="description">在多选模式下，启用互斥选择，某些选项之间不能同时选择</p>
    </div>

    <p class="result">选中值: {{ mutexValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'

const mutexOptions = [
  { label: '全职工作', value: 'fulltime' },
  { label: '兼职工作', value: 'parttime' },
  { label: '实习', value: 'intern' },
  { label: '远程工作', value: 'remote' },
  { label: '现场工作', value: 'onsite' },
  { label: '混合工作', value: 'hybrid' }
]

const mutexOptionValue = ['fulltime', 'parttime', 'intern']

const mutexValue = ref([])
</script>

<style scoped lang="scss">
.demo-container {
  width: 100%;
  padding: 20px;

  .demo-item {
    margin-bottom: 20px;

    h4 {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #1d2129;
    }

    .description {
      margin-top: 10px;
      color: #86909c;
      font-size: 12px;
      line-height: 1.5;
    }
  }

  .result {
    margin-top: 10px;
    color: #86909c;
    font-size: 14px;
  }
}
</style>
