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

const Value = ref([])
const emit = defineEmits<{
  (e: 'update:value', data?: string[] | number[]): void
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
            'odos-check-box-item': true,
            'active-alarm': it.props.alarm,
            active: props.value?.includes(it.props.value as never)
          }}
          onClick={() => {
            if (props.value?.includes(it.props.value as never)) {
              Value.value.splice(Value.value.indexOf(it.props.value as never), 1)
            } else {
              Value.value.push(it.props.value as never)
            }
            emit('update:value', Value.value)
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

<style lang="scss">
@import '/styles/checkBox.scss';
</style>
