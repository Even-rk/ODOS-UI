<template>
  <div class="smart-select-demo">
    <h2>SmartSelect 智能选择器演示</h2>
    
    <!-- 基础使用 -->
    <div class="demo-section">
      <h3>基础使用</h3>
      <SmartSelect
        v-model:value="basicValue"
        :options="basicOptions"
        placeholder="请选择一个选项"
        style="width: 200px"
      />
      <p>选中值: {{ basicValue }}</p>
    </div>

    <!-- 带搜索功能 -->
    <div class="demo-section">
      <h3>带搜索功能</h3>
      <SmartSelect
        v-model:value="searchValue"
        :options="searchOptions"
        placeholder="可搜索选择"
        :show-search="true"
        style="width: 200px"
      />
      <p>选中值: {{ searchValue }}</p>
    </div>

    <!-- 多选模式 -->
    <div class="demo-section">
      <h3>多选模式</h3>
      <SmartSelect
        v-model:value="multipleValue"
        :options="multipleOptions"
        placeholder="多选模式"
        :multiple="true"
        :allow-clear="true"
        style="width: 300px"
      />
      <p>选中值: {{ multipleValue }}</p>
    </div>

    <!-- 带标题 -->
    <div class="demo-section">
      <h3>带标题</h3>
      <SmartSelect
        v-model:value="titleValue"
        :options="basicOptions"
        title="类型"
        placeholder="请选择类型"
        style="width: 200px"
      />
      <p>选中值: {{ titleValue }}</p>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h3>禁用状态</h3>
      <SmartSelect
        v-model:value="disabledValue"
        :options="basicOptions"
        placeholder="禁用状态"
        :disabled="true"
        style="width: 200px"
      />
    </div>

    <!-- 不同位置 -->
    <div class="demo-section">
      <h3>不同下拉位置</h3>
      <div style="display: flex; gap: 20px; margin-top: 100px;">
        <SmartSelect
          v-model:value="topValue"
          :options="basicOptions"
          placeholder="向上展开"
          position="top"
          style="width: 150px"
        />
        <SmartSelect
          v-model:value="bottomValue"
          :options="basicOptions"
          placeholder="向下展开"
          position="bottom"
          style="width: 150px"
        />
      </div>
    </div>

    <!-- 互斥选择 -->
    <div class="demo-section">
      <h3>互斥选择（多选模式下）</h3>
      <SmartSelect
        v-model:value="mutexValue"
        :options="mutexOptions"
        placeholder="互斥选择"
        :multiple="true"
        :mutex="true"
        :mutex-option-value="['all']"
        :allow-clear="true"
        style="width: 300px"
      />
      <p>选中值: {{ mutexValue }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'

// 基础选项
const basicOptions = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4' }
]

// 搜索选项
const searchOptions = [
  { label: 'Apple 苹果', value: 'apple' },
  { label: 'Banana 香蕉', value: 'banana' },
  { label: 'Cherry 樱桃', value: 'cherry' },
  { label: 'Date 枣子', value: 'date' },
  { label: 'Elderberry 接骨木果', value: 'elderberry' },
  { label: 'Fig 无花果', value: 'fig' },
  { label: 'Grape 葡萄', value: 'grape' }
]

// 多选选项
const multipleOptions = [
  { label: '前端开发', value: 'frontend' },
  { label: '后端开发', value: 'backend' },
  { label: '移动开发', value: 'mobile' },
  { label: '数据分析', value: 'data' },
  { label: '产品设计', value: 'design' },
  { label: '项目管理', value: 'pm' }
]

// 互斥选项
const mutexOptions = [
  { label: '全部', value: 'all' },
  { label: '选项A', value: 'a' },
  { label: '选项B', value: 'b' },
  { label: '选项C', value: 'c' }
]

// 响应式数据
const basicValue = ref('')
const searchValue = ref('')
const multipleValue = ref([])
const titleValue = ref('')
const disabledValue = ref('option1')
const topValue = ref('')
const bottomValue = ref('')
const mutexValue = ref([])
</script>

<style scoped lang="scss">
.smart-select-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    color: #1d2129;
    margin-bottom: 30px;
    text-align: center;
  }

  .demo-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e5e6eb;
    border-radius: 8px;
    background: #fff;

    h3 {
      color: #4e5969;
      margin-bottom: 15px;
      font-size: 16px;
    }

    p {
      margin-top: 10px;
      color: #86909c;
      font-size: 14px;
    }
  }
}
</style>