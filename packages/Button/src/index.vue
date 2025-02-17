<template>
  <button ref="btnRef" @click="Click" class="odos-btn" :class="styleClass" :disabled="disabled">
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
import { computed, ref, useSlots, watchEffect, type SetupContext } from 'vue'

const { type, size, disabled, icon } = defineProps<{
  type?: 'primary' | 'default' | 'line' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  icon?: string
}>()

const slots = useSlots() as SetupContext['slots']
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
const emit = defineEmits(['click'])

const Click = (e: Event) => {
  if (disabled) return
  emit('click', e)
}
</script>

<style lang="scss" scoped>
@import '/styles/button.scss';
</style>
