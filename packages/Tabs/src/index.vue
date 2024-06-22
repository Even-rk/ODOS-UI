<template>
  <div class="odos-tabs">
    <div class="odos-tabbar">
      <randerTabBar />
    </div>
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import styles from './index.module.scss'
import Icon from '../../Icon/src/index.vue'
import { useSlots, type VNode } from 'vue'

const slots = useSlots()

interface Emit {
  (e: 'update:currentTab', val: string | number): void
}
const emit = defineEmits<Emit>()
const props = defineProps<{
  currentTab: string
}>()

const randerTabBar = () => {
  const list = slots.default && slots.default()
  return list?.map((i) => {
    const { value, tab, icon, disabled } = i.props as {
      value: string | number
      tab: string | VNode
      icon?: string
      disabled?: boolean
    }
    return (
      <div
        class={{
          [styles['odos-tab-selected']]: value === props.currentTab,
          [styles['odos-tab']]: true,
          [styles['odos-tab-disabled']]: disabled
        }}
        onClick={() => {
          if (disabled) return
          emit('update:currentTab', value)
        }}
      >
        {icon && (
          <Icon
            size="16px"
            name={icon as string}
            color={value === props.currentTab ? '#2E6CE4' : '#4E5969'}
          />
        )}
        <div class="label">{tab}</div>
      </div>
    )
  })
}

const randerContent = () => {
  const list = slots.default && slots.default()
  return list?.find((i) => {
    const { value } = i.props as {
      value: string | number
    }
    return value === props.currentTab
  })
}
</script>

<style scoped lang="scss">
.odos-tabbar {
  display: flex;
}
</style>
