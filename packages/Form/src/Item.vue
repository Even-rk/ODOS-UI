<template>
  <div class="odos-form-item">
    <label class="odos-form-item-required" :style="{ width: labelWidth }" :for="props" v-if="label">
      {{ label }}
    </label>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { props, label, labelWidth } = defineProps<{
  props?: string
  label?: string
  labelWidth?: string
}>()
</script>

<style scoped lang="scss">
.odos-form-item {
  display: flex;
  align-items: center;
  .odos-form-item-required {
    &::before {
      display: inline-block;
      margin-inline-end: 4px;
      color: #ff4d4f;
      font-size: 14px;
      line-height: 1;
      content: '*';
    }
  }
}
</style>
