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
  circle?: boolean
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
            'odos-radio-item--circle': props.circle,
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
.odos-radio {
  display: inline-flex;
  user-select: none;

  :deep .odos-radio-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    font-size: 14px;
    padding: 0 20px;
    margin: 0 1px;
    color: #4e5969;
    background: #f2f3f5;

    &.disabled {
      cursor: not-allowed;
      color: #c9cdd4;

      &:hover {
        background: #f2f3f5;
      }
    }

    &:first-child {
      border-radius: 6px 0px 0px 6px;
      margin-left: 0;
    }

    &:last-child {
      border-radius: 0px 6px 6px 0px;
      margin-right: 0;
    }

    &.odos-radio-item--circle {
      border-radius: 6px;
    }

    &:hover {
      background: #e5e6eb;
    }

    &.active {
      background: #e7efff;
      color: #2e6ce4;
      font-weight: bold;

      &.active-alarm {
        background: #feefef;
        color: #ff4f49;
      }
    }
  }
}

.odos-radio {
  &.odos-radio-size--medium {
    :deep .odos-radio-item {
      height: 32px;
      padding: 0 16px;
    }
  }

  &.odos-radio-size--small {
    :deep .odos-radio-item {
      height: 28px;
      padding: 0 12px;
    }
  }
}
</style>
