<template>
  <div class="demo-container">
    <div class="demo-item">
      <h4>单选搜索</h4>
      <SmartSelect
        v-model:value="searchValue"
        :options="searchOptions"
        placeholder="可搜索选择"
        :show-search="true"
        style="width: 200px"
      />
      <p class="result">选中值: {{ searchValue }}</p>
    </div>
    
    <div class="demo-item">
      <h4>多选搜索</h4>
      <SmartSelect
        v-model:value="multipleSearchValue"
        :options="searchOptions"
        placeholder="多选可搜索"
        :show-search="true"
        :multiple="true"
        :max-tag-count="3"
        style="width: 300px"
      />
      <p class="result">选中值: {{ multipleSearchValue }}</p>
    </div>
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
  { label: 'Grape 葡萄', value: 'grape' },
  { label: 'Honeydew 蜜瓜', value: 'honeydew' },
  { label: 'Kiwi 猕猴桃', value: 'kiwi' },
  { label: 'Lemon 柠檬', value: 'lemon' }
]

const searchValue = ref('')
const multipleSearchValue = ref([])
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
  
  .demo-item {
    margin-bottom: 30px;
    
    h4 {
      margin-bottom: 10px;
      color: #1d2129;
      font-size: 16px;
    }
  }
  
  .result {
    margin-top: 10px;
    color: #86909c;
    font-size: 14px;
  }
}
</style>