<template>
  <div class="block-tabs-demo">
    <odos-tabs v-model:currentTab="activeTab" type="block">
      <odos-tab value="tab1" tab="待挂号">
        <div class="content-box">待挂号的患者列表内容</div>
      </odos-tab>
      <odos-tab value="tab2" tab="待接诊">
        <div class="content-box">待接诊的患者列表内容</div>
      </odos-tab>
      <odos-tab value="tab3" tab="待结束">
        <div class="content-box">待结束的患者列表内容</div>
      </odos-tab>
      <odos-tab value="tab4" tab="待收费">
        <div class="content-box">待收费的患者列表内容</div>
      </odos-tab>
      <odos-tab value="tab5" tab="已离开">
        <div class="content-box">已离开的患者列表内容</div>
      </odos-tab>
    </odos-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>