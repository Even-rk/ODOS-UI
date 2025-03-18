<template>
  <odos-button @click="showDrawer = true">打开抽屉</odos-button>
  <odos-drawer v-model:open="showDrawer" title="抽屉标题">
    <p>这是抽屉的内容</p>
  </odos-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDrawer = ref(false)
</script>

<style scoped lang="scss"></style>
