<template>
  <div class="demo-container">
    <SmartSelect
      v-model:value="searchValue"
      :options="searchOptions"
      placeholder="可搜索选择"
      :show-search="true"
      style="width: 200px"
    />
    <p class="result">选中值: {{ searchValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'

const searchOptions = [
  { label: 'Apple 苹果', value: 'apple' },
  { label: 'Banana 香蕉', value: 'banana' },
  { label: 'Cherry 樱桃', value: 'cherry' },
  { label: 'Date 枣子', value: 'date' },
  { label: 'Elderberry 接骨木果', value: 'elderberry' },
  { label: 'Fig 无花果', value: 'fig' },
  { label: 'Grape 葡萄', value: 'grape' }
]

const searchValue = ref('')
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