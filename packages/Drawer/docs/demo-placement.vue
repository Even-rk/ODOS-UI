<template>
  <div>
    <odos-space size="large">
      <odos-button @click="showRight = true" style="margin-right: 16px">右侧抽屉</odos-button>
      <odos-button @click="showLeft = true" style="margin-right: 16px">左侧抽屉</odos-button>
      <odos-button @click="showTop = true" style="margin-right: 16px">顶部抽屉</odos-button>
      <odos-button @click="showBottom = true">底部抽屉</odos-button>
    </odos-space>

    <odos-drawer v-model:open="showRight" title="右侧抽屉" placement="right">
      <p>从右侧滑出的抽屉</p>
    </odos-drawer>

    <odos-drawer v-model:open="showLeft" title="左侧抽屉" placement="left">
      <p>从左侧滑出的抽屉</p>
    </odos-drawer>

    <odos-drawer v-model:open="showTop" title="顶部抽屉" placement="top">
      <p>从顶部滑出的抽屉</p>
    </odos-drawer>

    <odos-drawer v-model:open="showBottom" title="底部抽屉" placement="bottom">
      <p>从底部滑出的抽屉</p>
    </odos-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showRight = ref(false)
const showLeft = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
</script> 