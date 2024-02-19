<template>
  <div class="odos-radio" :class="styleClass">
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import { computed, toRefs, useSlots } from 'vue'

const props = defineProps<{
  size?: 'small' | 'medium' | 'large'
  value?: string | number
}>()

const { size, value } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:value', data: string | number): void
}>()

const slots = useSlots()
const randerContent = () => {
  const list = slots.default && slots.default()
  return (
    <>
      {list?.map((it: any) => (
        <div
          class={{
            'odos-radio-item': true,
            'active-alarm': it.props.alarm === '' || it.props.alarm,
            active: it.props.value == value.value
          }}
          onClick={() => {
            emit('update:value', it.props.value)
          }}
        >
          {it.props.label}
        </div>
      ))}
    </>
  )
}

const styleClass = computed(() => {
  return {
    [`odos-radio-size--${size.value}`]: size.value
  }
})
</script>

<style lang="scss">
@import '/styles/radio.scss';
</style>
