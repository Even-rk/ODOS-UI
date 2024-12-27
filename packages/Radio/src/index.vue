<template>
  <div class="odos-radio" :class="styleClass">
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import { computed, ref, useSlots, type VNode } from 'vue'

const props = defineProps<{
  size?: 'small' | 'medium' | 'large'
  value?: string | number
  itemWidth?: string
}>()

const emit = defineEmits<{
  (e: 'update:value' | 'change', data?: string | number): void
}>()

type Item = {
  props: {
    label?: string | number
    value?: string | number
    alarm?: boolean
    disabled?: boolean
  }
}

const slots = useSlots() as { default: () => VNode[] }
const randerContent = () => {
  const list = ref([] as Item[])
  list.value = (slots.default && slots.default()) as Item[]
  if (list.value.length <= 1 && slots.default()[0].children) {
    return RadioItem((slots.default && slots.default()[0].children) as Item[])
  } else {
    return RadioItem(list.value)
  }
}
const RadioItem = (list: Item[]) => {
  return (
    <>
      {list?.map((it: Item, index: number) => (
        <div
          class={{
            'odos-radio-item': true,
            'active-alarm': it.props.alarm,
            active: it.props.value == props.value,
            disabled: it.props.disabled
          }}
          style={{ width: props.itemWidth }}
          onClick={() => {
            if (it.props.disabled) return
            if (it.props.value === props.value) {
              emit('update:value', undefined)
              emit('change', undefined)
            } else {
              emit('update:value', it.props.value)
              emit('change', it.props.value)
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
