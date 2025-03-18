<template>
  <div>
    <odos-button @click="showFooter = true">带页脚的抽屉</odos-button>

    <odos-drawer v-model:open="showFooter" title="抽屉标题">
      <p>抽屉内容</p>
      <template #footer>
        <odos-space size="large">
          <odos-button @click="showFooter = false" style="margin-right: 16px">取消</odos-button>
          <odos-button type="primary" @click="showFooter = false">确定</odos-button>
        </odos-space>
      </template>
    </odos-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showFooter = ref(false)
</script> 