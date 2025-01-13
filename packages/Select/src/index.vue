<template>
  <RenderContent />
</template>

<script setup lang="tsx">
import Icon from '../../Icon/src/index.vue'
import { Empty, Select } from 'ant-design-vue'
import { computed, useSlots } from 'vue'
const {
  value,
  width,
  placeholder,
  options,
  title,
  allowClear,
  disabled,
  multiple,
  maxTagCount,
  showSearch,
  height,
  filterProp,
  mutex,
  mutexOptionValue
} = defineProps<{
  value?: string | number | string[] | number[]
  title?: string
  width?: string
  height?: string
  placeholder?: string
  options?: { [key: string]: string | number }[]
  allowClear?: boolean
  disabled?: boolean
  multiple?: boolean
  maxTagCount?: number
  showSearch?: boolean
  dropdown?: boolean
  filterProp?: string
  mutex?: boolean
  mutexOptionValue?: string[] | number[]
}>()

interface Emit {
  (e: 'update:value' | 'change', data?: string | number | string[] | number[]): void
  (e: 'blur' | 'focus', data?: Event): void
}

const emit = defineEmits<Emit>()

const selectChange = (Val?: string | number | string[] | number[]) => {
  // 多选且是互斥
  if (multiple && mutex) {
    if (mutexOptionValue?.includes((Val as string)[(Val as string[]).length - 1] as never)) {
      emit('update:value', (Val as string)[(Val as string[]).length - 1])
      emit('change', (Val as string)[(Val as string[]).length - 1])
    } else {
      const target = (Val as string[]).filter((i) => !mutexOptionValue?.includes(i as never))
      emit('update:value', target)
      emit('change', target)
    }
  } else {
    emit('update:value', Val)
    emit('change', Val)
  }
}

const mode = computed(() => {
  return multiple ? 'multiple' : undefined
})

const getPopupContainer = (triggerNode: Element) => {
  return triggerNode.parentElement || document.body
}

// 渲染的内容
const RenderContent = computed(() => {
  const slots = useSlots()
  return (
    <div class={{ 'odos-select': true, 'odos-select-disabled': disabled }} style={{ width, height }}>
      {title && <div class="odos-select-title">{title}</div>}
      <Select
        class={{ 'odos-select-isTitle': title }}
        onChange={($event) => selectChange($event as string | number | string[] | number[])}
        onBlur={($event: Event) => emit('blur', $event)}
        onFocus={($event: Event) => emit('focus', $event)}
        showArrow
        optionFilterProp={filterProp || 'label'}
        value={value}
        style={{ width, height }}
        placeholder={placeholder || '请选择'}
        options={options}
        allowClear={allowClear}
        bordered={false}
        disabled={disabled}
        mode={mode.value}
        max-tag-count={maxTagCount}
        show-search={showSearch}
        defaultActiveFirstOption={false}
        getPopupContainer={($event: Element) => getPopupContainer($event)}
        suffixIcon={<Icon name="ArowDown" size="20px" />}
        notFoundContent={<Empty />}
        // 下拉选项
        v-slots={{
          ...(slots.option
            ? {
                option: (option: { value: string | number; label: string }) => {
                  return slots.option && slots.option({ option })
                }
              }
            : {})
        }}
        // 下拉菜单
        {...(slots.dropdownRender
          ? {
              dropdownRender: (menuNode) => {
                return slots.dropdownRender && slots.dropdownRender({ menuNode: menuNode?.menuNode })
              }
            }
          : {})}
      />
    </div>
  )
})
</script>

<style lang="scss" scoped>
@import '/styles/select.scss';
</style>
