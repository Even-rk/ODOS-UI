<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>向上展开</h4>
      <SmartSelect
        v-model:value="topValue"
        :options="positionOptions"
        placeholder="向上展开"
        placement="top"
        style="width: 200px"
      />
    </div>
    
    <div class="demo-item">
      <h4>向下展开（默认）</h4>
      <SmartSelect
        v-model:value="bottomValue"
        :options="positionOptions"
        placeholder="向下展开"
        placement="bottom"
        style="width: 200px"
      />
    </div>
    
    <div class="demo-item">
      <h4>自动判断位置</h4>
      <SmartSelect
        v-model:value="autoValue"
        :options="positionOptions"
        placeholder="自动判断位置"
        placement="auto"
        style="width: 200px"
      />
    </div>
    
    <p class="result">向上展开选中值: {{ topValue }}</p>
    <p class="result">向下展开选中值: {{ bottomValue }}</p>
    <p class="result">自动位置选中值: {{ autoValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'

const positionOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
]

const topValue = ref('')
const bottomValue = ref('')
const autoValue = ref('')
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
  
  .demo-item {
    margin-bottom: 30px;
    
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