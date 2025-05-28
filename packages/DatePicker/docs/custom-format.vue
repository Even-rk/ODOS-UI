<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- 美式格式 -->
    <div>
      <h4 style="margin-bottom: 10px;">美式格式</h4>
      <OdosDatePicker 
        v-model:value="usDate" 
        format="MM/DD/YYYY"
        title="美式格式"
      />
    </div>
    
    <!-- 中文格式 -->
    <div>
      <h4 style="margin-bottom: 10px;">中文格式</h4>
      <OdosDatePicker 
        v-model:value="cnDate" 
        format="YYYY年MM月DD日"
        title="中文格式"
      />
    </div>
    
    <!-- 自定义时间格式 -->
    <div>
      <h4 style="margin-bottom: 10px;">自定义时间格式</h4>
      <OdosDatePicker 
        v-model:value="customTime" 
        mode="datetime"
        format="YYYY-MM-DD HH:mm"
        title="自定义"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const usDate = ref('')
const cnDate = ref('')
const customTime = ref('')
</script> 