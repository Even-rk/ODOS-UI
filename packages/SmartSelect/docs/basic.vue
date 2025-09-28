<template>
  <div class="demo-container">
    <SmartSelect
      v-model:value="basicValue"
      :options="basicOptions"
      placeholder="请选择一个选项"
      style="width: 200px"
    />
    <p class="result">选中值: {{ basicValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'

const basicOptions = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4' }
]

const basicValue = ref('')
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