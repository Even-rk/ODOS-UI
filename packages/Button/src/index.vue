<template>
  <button ref="btnRef" @click="$emit('click', $event)" class="odos-btn" :class="styleClass" :disabled="disabled">
    <slot name="icon">
      <div :class="styleIconClass" v-if="icon">
        <Icon :name="icon" :color="iconColor" />
      </div>
    </slot>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import Icon from 'packages/Icon/src/index.vue'
import { computed, ref, useSlots, watchEffect } from 'vue'

const { type, size, disabled, icon } = defineProps<{
  type?: 'primary' | 'default' | 'line' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  icon?: string
}>()

const slots = useSlots()
const iconColor = ref('')

const styleClass = computed(() => {
  return {
    ['odos-btn--icon']: !slots.default,
    [`odos-btn--${type}`]: type,
    [`odos-btn-size--${size}`]: size,
    'is-disabled': disabled
  }
})

const styleIconClass = computed(() => {
  return {
    'odos-icon': slots.default,
    [`odos-icon--${type}`]: type
  }
})

watchEffect(() => {
  if (!slots.default) iconColor.value = '#4E5969'
})
defineEmits(['click'])
</script>

<style lang="scss">
@import '/styles/button.scss';
</style>
