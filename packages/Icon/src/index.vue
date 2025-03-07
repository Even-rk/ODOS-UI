<template>
  <svg class="icon" :style="{ width: IconSize, height: IconSize, fill: color }">
    <use :xlink:href="IconName"></use>
  </svg>
</template>

<script setup lang="ts">
import 'https://orange-odos.oss-cn-hangzhou.aliyuncs.com/assets/js/iconfont.js'
import { computed, ref, toRefs } from 'vue'
const props = defineProps<{
  name?: string
  size?: number | string
  color?: string
}>()
const { name, size, color } = toRefs(props)

const IconName = computed(() => `#icon-${name.value}`)
const IconSize = computed(() => {
  const iconSize = ref('')
  if (typeof size.value === 'number') {
    iconSize.value = `${size.value}px`
  } else if (typeof size.value === 'string') {
    iconSize.value = size.value
  }
  return iconSize.value
})
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
