<template>
  <odos-button @click="showLoading">loading</odos-button>
  <odos-button @click="loading.show(2000)">set time</odos-button>
</template>

<script setup lang="ts">
import { loading } from '../../Loading/src/index'
const showLoading = async () => {
  loading.show()
  // 模拟数据请求
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))
  loading.hide()
}
</script>

<style>
.odos-btn {
  margin-right: 10px;
}
</style>
