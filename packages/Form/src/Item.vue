<template>
  <div class="odos-form-item">
    <div class="odos-form-item-content" :class="{ isError }">
      <label
        class="odos-form-item-label"
        :class="{ 'odos-form-item-required': rule?.required }"
        :style="{ width: labelWidth }"
        :for="prop"
        v-if="label"
      >
        {{ label }}
      </label>
      <div :style="{ width: labelWidth || '100px' }" v-else />
      <slot />
    </div>
    <div class="odos-form-item-error" v-if="isError">{{ rule?.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const { model, prop, label, rule, labelWidth } = defineProps<{
  model?: Record<string, unknown>
  prop?: string
  label?: string
  labelWidth?: string
  rule?: {
    required?: boolean
    message?: string
    trigger?: 'blur' | 'change' | 'input'
    validator?: () => boolean
  }
}>()

const isError = ref(false)

watch(
  () => model,
  () => {
    console.log(model)
    if (rule?.required && model?.[prop!]) {
      if (rule?.validator) {
        isError.value = rule?.validator!()
      } else {
        isError.value = false
      }
    } else {
      isError.value = true
    }
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.odos-form-item {
  position: relative;
  margin-bottom: 24px;
  .odos-form-item-content {
    display: flex;
    align-items: center;
    .odos-form-item-label {
      text-align: right;
      width: 100px;
      flex-shrink: 0;
      white-space: nowrap;
      &::after {
        content: ':';
        position: relative;
        margin-block: 0;
        margin-inline-start: 2px;
        margin-inline-end: 8px;
      }
    }
    &.isError {
      // 针对odos-input
      :deep > *[class*='odos-']:nth-child(n + 2) {
        > *:first-child {
          color: #ff4d4f;
          border: 1px solid #ff4d4f;
        }
        > *::placeholder {
          color: #ff4d4f;
        }
      }
    }
  }
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

  .odos-form-item-error {
    position: absolute;
    left: 100px;
    bottom: -24px;
    margin-top: 4px;
    color: #ff4d4f;
    font-size: 12px;
  }
}
</style>
