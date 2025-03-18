<template>
  <div>
    <odos-space size="large">
      <odos-button @click="showLarge = true" style="margin-right: 16px">大抽屉</odos-button>
      <odos-button @click="showSmall = true">小抽屉</odos-button>
    </odos-space>

    <odos-drawer v-model:open="showLarge" title="大抽屉" width="500px">
      <p>宽度为 500px 的抽屉</p>
    </odos-drawer>

    <odos-drawer v-model:open="showSmall" title="小抽屉" width="300px">
      <p>宽度为 300px 的抽屉</p>
    </odos-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showLarge = ref(false)
const showSmall = ref(false)
</script> 