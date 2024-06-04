<template>
  <div class="odos-radio" :class="styleClass">
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import { computed, useSlots } from 'vue'

const props = defineProps<{
  size?: 'small' | 'medium' | 'large'
  value?: string | number
  itemWidth?: string
}>()

const emit = defineEmits<{
  (e: 'update:value', data?: string | number): void
}>()

type Item = {
  props: {
    label?: string | number
    value?: string | number
    alarm?: boolean
  }
}

const slots = useSlots()
const randerContent = () => {
  const list = slots.default && (slots.default() as Item[])
  return (
    <>
      {list?.map((it: Item, index: number) => (
        <div
          class={{
            'odos-radio-item': true,
            'active-alarm': it.props.alarm,
            active: it.props.value == props.value
          }}
          style={{ width: props.itemWidth }}
          onClick={() => {
            if (it.props.value === props.value) {
              emit('update:value', undefined)
            } else {
              emit('update:value', it.props.value)
            }
          }}
        >
          {it.props.label}
          {list[index]}
        </div>
      ))}
    </>
  )
}

const styleClass = computed(() => {
  return {
    [`odos-radio-size--${props.size}`]: props.size
  }
})
</script>

<style lang="scss" scoped>
@import '/styles/radio.scss';
</style>
