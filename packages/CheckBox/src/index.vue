<template>
  <div class="odos-check-box" :class="styleClass">
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import { computed, ref, useSlots } from 'vue'

const props = defineProps<{
  size?: 'small' | 'medium' | 'large'
  value?: string[] | number[]
}>()

const emit = defineEmits<{
  (e: 'update:value' | 'change', data?: string[] | number[]): void
}>()

type Item = {
  props: {
    label?: string | number
    value?: string | number
    alarm?: boolean
    disabled?: boolean
  }
}

const slots = useSlots()
const randerContent = () => {
  const list = ref([] as Item[])
  list.value = (slots.default && slots.default()) as Item[]
  if (list.value.length <= 1) {
    return CheckBoxItem((slots.default && slots.default()[0].children) as Item[])
  } else {
    return CheckBoxItem(list.value)
  }
}

const CheckBoxItem = (list: Item[]) => {
  return (
    <>
      {list?.map((it: Item, index: number) => (
        <div
          class={{
            'odos-check-box-item': true,
            'active-alarm': it.props.alarm,
            active: props.value?.includes(it.props.value as never),
            disabled: it.props.disabled
          }}
          onClick={() => {
            if (it.props.disabled) return
            if (props.value?.includes(it.props.value as never)) {
              props.value.splice(props.value.indexOf(it.props.value as never), 1)
            } else if (props.value) {
              props.value?.push(it.props.value as never)
            } else {
              emit('update:value', [it.props.value as never])
              emit('change', [it.props.value as never])
              return
            }
            emit('change', props.value)
            emit('update:value', props.value)
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
    [`odos-check-box-size--${props.size}`]: props.size
  }
})
</script>

<style lang="scss" scoped>
@import '/styles/checkBox.scss';
</style>
