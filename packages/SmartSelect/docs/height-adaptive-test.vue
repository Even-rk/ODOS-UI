<template>
  <div class="height-adaptive-test">
    <h3>SmartSelect 高度自适应测试</h3>
    
    <div class="test-section">
      <h4>1. 少量标签（不换行）</h4>
      <SmartSelect
        v-model="value1"
        :options="shortOptions"
        :multiple="true"
        :max-tag-count="0"
        placeholder="选择选项（少量标签）"
      />
      <p>当前选中: {{ value1 }}</p>
    </div>

    <div class="test-section">
      <h4>2. 中等数量标签（可能换行）</h4>
      <SmartSelect
        v-model="value2"
        :options="mediumOptions"
        :multiple="true"
        :max-tag-count="0"
        placeholder="选择选项（中等数量标签）"
      />
      <p>当前选中: {{ value2 }}</p>
    </div>

    <div class="test-section">
      <h4>3. 大量标签（多行显示）</h4>
      <SmartSelect
        v-model="value3"
        :options="longOptions"
        :multiple="true"
        :max-tag-count="0"
        placeholder="选择选项（大量标签）"
      />
      <p>当前选中: {{ value3 }}</p>
    </div>

    <div class="test-section">
      <h4>4. 带maxTagCount限制（3个）</h4>
      <SmartSelect
        v-model="value4"
        :options="longOptions"
        :multiple="true"
        :max-tag-count="3"
        placeholder="选择选项（最多显示3个标签）"
      />
      <p>当前选中: {{ value4 }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SmartSelect from '../src/index.vue'

const value1 = ref([])
const value2 = ref([])
const value3 = ref([])
const value4 = ref([])

const shortOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]

const mediumOptions = [
  { label: '北京市', value: 'beijing' },
  { label: '上海市', value: 'shanghai' },
  { label: '广州市', value: 'guangzhou' },
  { label: '深圳市', value: 'shenzhen' },
  { label: '杭州市', value: 'hangzhou' },
  { label: '南京市', value: 'nanjing' }
]

const longOptions = [
  { label: '北京市海淀区', value: 'beijing-haidian' },
  { label: '上海市浦东新区', value: 'shanghai-pudong' },
  { label: '广州市天河区', value: 'guangzhou-tianhe' },
  { label: '深圳市南山区', value: 'shenzhen-nanshan' },
  { label: '杭州市西湖区', value: 'hangzhou-xihu' },
  { label: '南京市鼓楼区', value: 'nanjing-gulou' },
  { label: '成都市锦江区', value: 'chengdu-jinjiang' },
  { label: '武汉市江汉区', value: 'wuhan-jianghan' },
  { label: '西安市雁塔区', value: 'xian-yanta' },
  { label: '重庆市渝中区', value: 'chongqing-yuzhong' }
]
</script>

<style scoped>
.height-adaptive-test {
  padding: 20px;
  max-width: 800px;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  background: #fff;
}

.test-section h4 {
  margin: 0 0 15px 0;
  color: #1d2129;
  font-size: 16px;
  font-weight: 600;
}

.test-section p {
  margin: 10px 0 0 0;
  font-size: 14px;
  color: #86909c;
}
</style>