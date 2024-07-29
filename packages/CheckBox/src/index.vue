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
  mutex?: boolean
  mutexOptionValue?: string[] | number[]
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
            // 如果props.value数组已经包含了当前项（it.props.value），则从数组中移除这个项。
            if (props.value?.includes(it.props.value as never)) {
              props.value.splice(props.value.indexOf(it.props.value as never), 1)
            }
            // 如果props.value数组中不包含当前项，则将这个项添加到数组的末尾。
            else {
              // 处理互斥内容
              if (props.mutex) {
                // 如果props.mutexOptionValue数组已经包含了当前项（it.props.value），则不对props.value进行修改，而是直接通过emit方法触发change和update:value事件，并将当前项作为参数传递。
                if (props.mutexOptionValue?.includes(it.props.value as never)) {
                  emit('change', [it.props.value as number])
                  emit('update:value', [it.props.value as number])
                  return
                }
                // 如果props.mutexOptionValue数组中不包含当前项，则将这个项添加到props.value数组的末尾。然后，创建一个新数组list，该数组包含props.value中所有不在props.mutexOptionValue中的元素。
                else {
                  props.value?.push(it.props.value as never)
                  const list = props.value?.filter((i) => !props.mutexOptionValue?.includes(i as never))
                  emit('change', list as unknown as string[])
                  emit('update:value', list as unknown as string[])
                  return
                }
              } else {
                props.value?.push(it.props.value as never)
              }
            }
            // 无论是添加还是删除操作，都会触发change和update:value事件，并将更新后的props.value数组作为参数传递。
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
