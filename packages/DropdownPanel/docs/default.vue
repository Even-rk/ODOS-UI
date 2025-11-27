<template>
  <div>
    <odos-button ref="trigger" type="primary" @click="visible = !visible">打开下拉面板</odos-button>

    <odos-dropdown-panel v-model="visible" :triggerEl="trigger" placement="bottom-start">
      <template #close>
        <span style="font-size: 14px">关闭</span>
      </template>
      <h3>根据内容自动变大变小（下拉面板）</h3>
      <p>当前内容段落：{{ paragraphs }}</p>
      <div style="display: flex; gap: 8px; margin: 12px 0">
        <odos-button size="small" @click="add">增加内容</odos-button>
        <odos-button size="small" @click="remove">减少内容</odos-button>
        <odos-button size="small" @click="visible = false">程序化关闭</odos-button>
      </div>
      <div>
        <p v-for="i in paragraphs" :key="i">
          这是一段示例文本，用于演示面板随内容自适应尺寸。内容越多，容器会在 maxWidth/maxHeight
          约束内自动扩展，且宽度默认适配触发元素。
        </p>
      </div>
    </odos-dropdown-panel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const trigger = ref()
const visible = ref(false)
const paragraphs = ref(2)
const add = () => (paragraphs.value += 1)
const remove = () => (paragraphs.value = Math.max(1, paragraphs.value - 1))
</script>

<style scoped></style>
