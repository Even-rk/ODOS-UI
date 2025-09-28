<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>禁用状态</h4>
      <SmartSelect
        v-model:value="disabledValue"
        :options="disabledOptions"
        placeholder="禁用状态"
        :disabled="true"
        style="width: 200px"
      />
    </div>
    
    <div class="demo-item">
      <h4>部分选项禁用</h4>
      <SmartSelect
        v-model:value="partialDisabledValue"
        :options="partialDisabledOptions"
        placeholder="部分选项禁用"
        style="width: 200px"
      />
    </div>
    
    <p class="result">禁用状态选中值: {{ disabledValue }}</p>
    <p class="result">部分禁用选中值: {{ partialDisabledValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'

const disabledOptions = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' }
]

const partialDisabledOptions = [
  { label: '可选项1', value: 'available1' },
  { label: '禁用项1', value: 'disabled1', disabled: true },
  { label: '可选项2', value: 'available2' },
  { label: '禁用项2', value: 'disabled2', disabled: true },
  { label: '可选项3', value: 'available3' }
]

const disabledValue = ref('option1')
const partialDisabledValue = ref('')
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
  
  .demo-item {
    margin-bottom: 20px;
    
    h4 {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #1d2129;
    }
  }
  
  .result {
    margin-top: 10px;
    color: #86909c;
    font-size: 14px;
  }
}
</style>