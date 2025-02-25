<template>
  <odos-button @click="showLoading">loading</odos-button>
  <odos-button @click="useLoadingShow(2000)">set time</odos-button>
</template>

<script setup lang="ts">
import { useLoadingHide, useLoadingShow } from '../utils/loading.jsx'
const showLoading = async () => {
  useLoadingShow()
  // 模拟数据请求
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000))
  useLoadingHide()
}
</script>

<style>
.odos-btn {
  margin-right: 10px;
}
</style>
