<template>
  <div class="odos-tabs">
    <div class="odos-tabbar">
      <randerTabBar />
      <slot name="tabbar-right"></slot>
    </div>
    <div class="odos-tab-content">
      <randerContent />
    </div>
  </div>
</template>

<script setup lang="tsx">
import Icon from '../../Icon/src/index.vue'
import { ref, useSlots, type SetupContext, type VNode } from 'vue'

const slots = useSlots() as SetupContext['slots']

interface Emit {
  (e: 'update:currentTab', val: string | number): void
}

const emit = defineEmits<Emit>()
const props = defineProps<{
  currentTab: string
  type?: 'btn' | 'line' | 'btn-line' | 'block'
}>()

type Item = {
  props: Object
  type: Object
}

const randerTabBar = () => {
  const list = ref([] as Item[])
  list.value = (slots.default && slots.default()) as Item[]
  if (list.value.length <= 1) {
    return Tabbar((slots.default && slots.default()[0].children) as Item[])
  } else {
    return Tabbar(list.value)
  }
}
const Tabbar = (list: Item[]) => {
  const VNodeList = list?.filter((i) => {
    const { name } = i.type as { name: string }
    return name === 'odos-tab'
  })
  return VNodeList?.map((i) => {
    const { value, tab, icon, disabled } = i.props as {
      value: string | number
      tab: string | VNode
      icon?: string
      disabled?: boolean
    }
    return (
      <div
        class={{
          'odos-tab-line-selected': value === props.currentTab && props.type === 'line',
          'odos-tab-block-selected': value === props.currentTab && props.type === 'block',
          'odos-tab-selected': value === props.currentTab && props.type !== 'line' && props.type !== 'block',
          'odos-tab': true,
          'odos-tab-line': props.type === 'line',
          'odos-tab-block': props.type === 'block',
          'odos-tab-disabled': disabled
        }}
        onClick={() => {
          if (disabled) return
          emit('update:currentTab', value)
        }}
      >
        {props.type === 'line' && <div class="line" />}
        {icon && (
          <Icon
            size="16px"
            name={icon as string}
            color={value === props.currentTab ? (props.type === 'block' ? '#fff' : '#2E6CE4') : '#4E5969'}
          />
        )}
        <div class="label">{tab}</div>
      </div>
    )
  })
}

const randerContent = () => {
  const list = ref([] as Item[])
  list.value = (slots.default && slots.default()) as Item[]
  if (list.value.length <= 1) {
    return Content((slots.default && slots.default()[0].children) as Item[])
  } else {
    return Content(list.value)
  }
}
const Content = (list: Item[]) => {
  const VNodeList = list?.filter((i) => {
    const { name } = i.type as { name: string }
    return name === 'odos-tab'
  })
  return VNodeList?.find((i) => {
    const { value } = i.props as {
      value: string | number
    }
    return value === props.currentTab
  })
}
</script>

<style scoped lang="scss">
.odos-tabs {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.odos-tabbar {
  width: fit-content;
  display: flex;
  min-width: min-content;
}

.odos-tab-content {
  width: 100%;
  overflow-x: auto;
}
</style>
<style lang="scss">
.odos-tab {
  height: 30px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 6px;
  color: #4e5969;
  cursor: pointer;
  &.odos-tab-line {
    border: none;
  }
  &.odos-tab-block {
    border: none;
    border-radius: 0;
    flex: 1;
    justify-content: center;
    margin: 0;
    position: relative;
    height: 40px;
    font-size: 16px;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  &.odos-tab-selected {
    border: 1px solid #2e6ce4;
    color: #2e6ce4;
  }
  &.odos-tab-line-selected {
    position: relative;
    border: none;
    color: #2e6ce4;
    :global .line {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 80%;
      height: 2px;
      border-radius: 20px;
      background-color: #2e6ce4;
    }
  }
  &.odos-tab-block-selected {
    background-color: #eaf0fc;
    color: #2e6ce4;
    border: none;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #2e6ce4;
    }
  }
  .icon {
    margin-right: 4px;
  }
  &.odos-tab-disabled {
    color: #86909c;
    border: 1px solid #f7f8fa;
    cursor: not-allowed;
  }
}
</style>
