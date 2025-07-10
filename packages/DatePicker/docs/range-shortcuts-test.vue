<template>
  <div class="test-container">
    <h3>区间选择测试</h3>
    
    <div class="test-section">
      <h4>年份月份选择约束测试</h4>
      <p>测试年份月份选择时的约束逻辑：</p>
      <ul>
        <li>选择年份后，下拉框应该自动关闭</li>
        <li>右侧日历的年份不能早于左侧日历的年份</li>
        <li>当左右日历是同一年时，右侧日历的月份不能早于或等于左侧日历的月份</li>
      </ul>
      
      <DatePicker
        v-model:value="testRange"
        mode="range"
        :shortcuts="testShortcuts"
        placeholder="测试年份月份选择约束"
        width="450px"
      />
      
      <div class="result">
        <strong>选择结果：</strong>
        <span>{{ testRange.length === 2 ? `${testRange[0]} 至 ${testRange[1]}` : '未选择' }}</span>
      </div>
    </div>
    
    <div class="test-section">
      <h4>操作说明</h4>
      <div class="instructions">
        <p><strong>测试步骤：</strong></p>
        <ol>
          <li>点击日期输入框打开日历</li>
          <li>点击左侧日历的年份，选择一个年份后观察下拉框保持打开状态</li>
          <li>可以继续选择其他年份，或点击年份标题关闭下拉框</li>
          <li>点击右侧日历的年份，尝试选择一个早于左侧日历的年份（会自动调整）</li>
          <li>将左右日历设置为同一年，然后点击右侧日历的月份</li>
          <li>观察右侧日历的月份选择是否正确禁用了早于或等于左侧日历月份的选项</li>
          <li>选择月份后，下拉框同样保持打开状态</li>
          <li>再次点击月份标题可以关闭下拉框</li>
        </ol>
        
        <p><strong>新的交互特性：</strong></p>
        <ul>
          <li>✅ 选择年份后，年份选择器保持打开</li>
          <li>✅ 选择月份后，月份选择器保持打开</li>
          <li>✅ 点击相同标题可以关闭选择器</li>
          <li>✅ 点击不同标题可以切换选择器</li>
          <li>✅ 右侧日历始终不早于左侧日历</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { DatePicker } from '../index'

const testRange = ref([])

const testShortcuts = [
  {
    text: '近7天',
    value: () => [
      dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '近30天',
    value: () => [
      dayjs().subtract(29, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  },
  {
    text: '本月',
    value: () => [
      dayjs().startOf('month').format('YYYY-MM-DD'),
      dayjs().endOf('month').format('YYYY-MM-DD')
    ]
  }
]
</script>

<style scoped>
.test-container {
  padding: 20px;
  max-width: 800px;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
}

.test-section h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #1d2129;
  font-size: 16px;
  font-weight: 500;
}

.test-section p {
  margin-bottom: 15px;
  color: #4e5969;
  font-size: 14px;
  line-height: 1.5;
}

.test-section ul {
  margin-bottom: 15px;
  padding-left: 20px;
}

.test-section li {
  margin-bottom: 5px;
  color: #4e5969;
  font-size: 14px;
  line-height: 1.5;
}

.result {
  margin-top: 15px;
  padding: 12px;
  background-color: #f7f8fa;
  border-radius: 4px;
  font-size: 14px;
  color: #1d2129;
}

.result strong {
  color: #2e6ce4;
}

.instructions {
  background-color: #f0f8ff;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #2e6ce4;
}

.instructions p {
  margin-bottom: 10px;
  color: #1d2129;
}

.instructions ol {
  margin-bottom: 0;
  padding-left: 20px;
}

.instructions li {
  margin-bottom: 8px;
  color: #4e5969;
  font-size: 14px;
  line-height: 1.5;
}
</style> 