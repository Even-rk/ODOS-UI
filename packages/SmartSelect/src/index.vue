<template>
  <div
    class="odos-smart-select"
    :class="{ 'odos-smart-select-disabled': disabled }"
    :style="{ width: WidthSize }"
  >
    <div class="odos-smart-select-title" v-if="title">{{ title }}</div>

    <!-- 多选标签容器 -->
    <div v-if="multiple && hasValue" class="odos-smart-select-tags" :style="tagsStyle">
      <div
        v-for="(value, index) in selectedValues as (string | number)[]"
        :key="String(value)"
        class="odos-smart-select-tag"
        :class="{ 'tag-hidden': shouldHideTag(index) }"
      >
        <span class="tag-label">{{ getOptionLabel(value as string | number) }}</span>
        <Icon name="Cancel" class="tag-close" @click.stop="removeTag(value as string | number)" />
      </div>
      <!-- 显示更多标签 -->
      <div v-if="hasMoreTags" class="odos-smart-select-tag tag-more">+{{ hiddenTagsCount }}</div>
    </div>

    <!-- 输入框 -->
    <input
      ref="inputRef"
      :style="inputStyle"
      :class="{
        'odos-smart-select-isTitle': title,
        'odos-smart-select-with-tags': multiple && hasValue
      }"
      type="text"
      :value="inputDisplayValue"
      :disabled="disabled"
      :placeholder="inputPlaceholder"
      :readonly="!showSearch"
      @click="handleInputClick"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
    />

    <!-- 清空按钮 -->
    <div v-if="allowClear && hasValue && !disabled" class="odos-clear-icon" @click="handleClear">
      <Icon name="Close" color="#86909c" />
    </div>

    <!-- 下拉箭头 -->
    <div class="odos-arrow-icon" :class="{ 'odos-arrow-open': dropdownVisible }">
      <Icon name="ArowDown" color="#86909c" />
    </div>

    <!-- 下拉选项 - 使用 Popover 方式 -->
    <Teleport to="body">
      <div
        v-show="dropdownVisible"
        ref="dropdownRef"
        class="odos-smart-select-dropdown"
        :class="{ 'dropdown-show': dropdownVisible }"
        :style="dropdownStyles"
        @mousedown.prevent
      >
        <!-- 搜索结果为空 -->
        <div v-if="filteredOptions.length === 0" class="odos-select-empty">
          <Empty />
        </div>

        <!-- 选项列表 -->
        <div v-else class="odos-select-options">
          <div
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            class="odos-select-option"
            :class="{
              'option-selected': isSelected(option.value),
              'option-highlighted': highlightedIndex === index
            }"
            @click="handleOptionClick(option)"
            @mouseenter="highlightedIndex = index"
          >
            <span class="option-label">{{ option.label }}</span>
            <Icon v-if="isSelected(option.value)" name="Check" color="#2e6ce4" />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift, type Placement } from '@floating-ui/vue'
import Icon from '../../Icon/src/index.vue'
import { Empty } from 'ant-design-vue'

interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

// 定义CSS样式类型
type StyleObject = CSSProperties & Record<string, string | number>

// 定义事件数据类型
interface SelectEventData {
  option: Option
  value: string | number | string[] | number[]
}

interface FocusBlurEventData {
  event: Event
  value?: string | number | string[] | number[]
}

const props = withDefaults(
  defineProps<{
    // 基础属性
    value?: string | number | string[] | number[]
    options?: Option[]
    placeholder?: string
    disabled?: boolean

    // 尺寸和样式
    width?: string | number
    title?: string

    // 功能属性
    multiple?: boolean
    allowClear?: boolean
    showSearch?: boolean
    maxTagCount?: number

    // 过滤属性
    filterProp?: string

    // 互斥选择
    mutex?: boolean
    mutexOptionValue?: string[] | number[]

    // 下拉框位置
    position?: 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  }>(),
  {
    options: () => [],
    showSearch: false,
    allowClear: false,
    multiple: false,
    position: 'bottom'
  }
)

const emit = defineEmits<{
  (e: 'update:value', data?: string | number | string[] | number[]): void
  (e: 'change', data?: string | number | string[] | number[]): void
  (e: 'blur', data?: FocusBlurEventData): void
  (e: 'focus', data?: FocusBlurEventData): void
  (e: 'select', data?: Option): void
  (e: 'deselect', data?: Option): void
  (e: 'search', query: string): void
  (e: 'ime-status', status: boolean): void
}>()

// 引用
const inputRef = ref<HTMLInputElement>()
const dropdownRef = ref<HTMLElement>()

// 状态
const dropdownVisible = ref(false)
const searchQuery = ref('')
const highlightedIndex = ref(-1)
const isComposing = ref(false)
const cleanupAutoUpdate = ref<(() => void) | null>(null)

// 位置映射
const placementMap: Record<string, Placement> = {
  top: 'top-start',
  bottom: 'bottom-start',
  topLeft: 'top-start',
  topRight: 'top-end',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end'
}

// 获取 placement
const placement = computed((): Placement => {
  return placementMap[props.position] || 'bottom-start'
})

// 使用 floating-ui
const { floatingStyles, update } = useFloating(inputRef, dropdownRef, {
  placement: placement.value,
  middleware: [
    offset(4),
    flip({
      fallbackPlacements: ['top-start', 'bottom-start', 'top-end', 'bottom-end']
    }),
    shift({
      padding: 8
    })
  ]
})

// 下拉框样式
const dropdownStyles = computed((): StyleObject => {
  const styles: StyleObject = { ...floatingStyles.value }
  if (inputRef.value) {
    styles.minWidth = inputRef.value.offsetWidth + 'px'
  }
  return styles
})

// 计算属性
const hasValue = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.value) && props.value.length > 0
  }
  return props.value !== undefined && props.value !== null && props.value !== ''
})

const selectedValues = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.value) ? props.value : []
  }
  return props.value !== undefined && props.value !== null ? [props.value] : []
})

const displayValue = computed(() => {
  if (props.showSearch && dropdownVisible.value) {
    return searchQuery.value
  }

  if (props.multiple) {
    // 多选模式下，输入框不显示选中值，由tag显示
    return ''
  } else {
    if (!hasValue.value) return ''
    const option = props.options.find((opt) => opt.value === props.value)
    return option ? option.label : String(props.value)
  }
})

// 输入框显示值（用于多选tag模式）
const inputDisplayValue = computed(() => {
  if (props.showSearch && dropdownVisible.value) {
    return searchQuery.value
  }

  if (props.multiple) {
    // 多选模式下，输入框不显示选中值
    return ''
  } else {
    if (!hasValue.value) return ''
    const option = props.options.find((opt) => opt.value === props.value)
    return option ? option.label : String(props.value)
  }
})

// 输入框占位符
const inputPlaceholder = computed(() => {
  if (props.multiple && hasValue.value) {
    return props.showSearch ? '搜索...' : ''
  }
  return placeholder.value || '请选择'
})

// 占位符
const placeholder = computed(() => props.placeholder)

// 获取选项标签
const getOptionLabel = (value: string | number) => {
  const option = props.options.find((opt) => opt.value === value)
  return option ? option.label : String(value)
}

// 移除标签
const removeTag = (value: string | number) => {
  if (props.disabled) return

  const currentValues = Array.isArray(props.value) ? [...props.value] : []
  const newValue = currentValues.filter((val) => val !== value)

  const option = props.options.find((opt) => opt.value === value)
  if (option) {
    emit('deselect', option)
  }

  emit('update:value', newValue as string | number | string[] | number[])
  emit('change', newValue as string | number | string[] | number[])
}

// 是否应该隐藏标签
const shouldHideTag = (index: number) => {
  if (!props.maxTagCount) return false
  return index >= props.maxTagCount
}

// 是否有更多标签
const hasMoreTags = computed(() => {
  if (!props.multiple || !props.maxTagCount) return false
  const values = Array.isArray(props.value) ? props.value : []
  return values.length > props.maxTagCount
})

// 隐藏的标签数量
const hiddenTagsCount = computed(() => {
  if (!props.multiple || !props.maxTagCount) return 0
  const values = Array.isArray(props.value) ? props.value : []
  return Math.max(0, values.length - props.maxTagCount)
})

// 标签容器样式
const tagsStyle = computed((): StyleObject => {
  const style: StyleObject = {}

  // 处理标题
  if (props.title) {
    style.paddingLeft = '88px'
  }

  return style
})

const filteredOptions = computed(() => {
  if (!props.showSearch || !searchQuery.value) {
    return props.options
  }

  const query = searchQuery.value.toLowerCase()
  return props.options.filter((option) => {
    const searchField = props.filterProp || 'label'
    const searchValue = String(option[searchField as keyof Option] || option.label).toLowerCase()
    return searchValue.includes(query)
  })
})

const WidthSize = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  } else if (typeof props.width === 'string') {
    return props.width
  }
  return ''
})

const inputStyle = computed((): StyleObject => {
  const style: StyleObject = {}

  // 处理标题
  if (props.title) {
    style.paddingLeft = '88px'
  }

  // 计算右侧图标占用的空间
  let rightPadding = 16 // 基础右边距
  if (props.allowClear && hasValue.value) {
    rightPadding += 24 // 清空按钮
  }
  rightPadding += 24 // 下拉箭头
  style.paddingRight = rightPadding + 'px'

  return style
})

// 方法
const isSelected = (value: string | number) => {
  return selectedValues.value.includes(value)
}

const showDropdown = async () => {
  if (props.disabled) return

  dropdownVisible.value = true
  highlightedIndex.value = -1

  await nextTick()
  update()
  setupAutoUpdate()

  // 如果是搜索模式，清空搜索内容并聚焦
  if (props.showSearch) {
    searchQuery.value = ''
    inputRef.value?.focus()
  }
}

const hideDropdown = () => {
  dropdownVisible.value = false
  highlightedIndex.value = -1
  cleanupUpdate()

  // 清空搜索内容
  if (props.showSearch) {
    searchQuery.value = ''
  }
}

const setupAutoUpdate = () => {
  if (inputRef.value && dropdownRef.value) {
    cleanupAutoUpdate.value = autoUpdate(inputRef.value, dropdownRef.value, update, {
      elementResize: true,
      animationFrame: false
    })
  }
}

const cleanupUpdate = () => {
  if (cleanupAutoUpdate.value) {
    cleanupAutoUpdate.value()
    cleanupAutoUpdate.value = null
  }
}

const handleInputClick = () => {
  if (!dropdownVisible.value) {
    showDropdown()
  }
}

const handleInput = (e: Event) => {
  if (!props.showSearch || isComposing.value) return

  const target = e.target as HTMLInputElement
  searchQuery.value = target.value
  emit('search', searchQuery.value)

  if (!dropdownVisible.value) {
    showDropdown()
  }
}

const handleFocus = (e: Event) => {
  emit('focus', { event: e, value: props.value })
}

const handleBlur = (e: Event) => {
  // 延迟隐藏，允许点击选项
  setTimeout(() => {
    hideDropdown()
  }, 150)
  emit('blur', { event: e, value: props.value })
}

const handleClear = () => {
  if (props.disabled) return

  const newValue = props.multiple ? [] : undefined
  emit('update:value', newValue)
  emit('change', newValue)
  hideDropdown()
}

const handleOptionClick = (option: Option) => {
  if (option.disabled) return

  let newValue: string | number | (string | number)[] | undefined

  if (props.multiple) {
    const currentValues = Array.isArray(props.value) ? [...props.value] : []

    if (props.mutex && props.mutexOptionValue?.includes(option.value as never)) {
      // 互斥选择
      newValue = [option.value]
    } else {
      if (isSelected(option.value)) {
        // 取消选择
        newValue = currentValues.filter((val) => val !== option.value)
        emit('deselect', option)
      } else {
        // 添加选择
        if (props.mutex) {
          // 移除互斥选项
          const filteredValues = currentValues.filter(
            (val) => !props.mutexOptionValue?.includes(val as never)
          )
          newValue = [...filteredValues, option.value]
        } else {
          newValue = [...currentValues, option.value]
        }
        emit('select', option)
      }
    }
  } else {
    newValue = option.value
    emit('select', option)
    hideDropdown()
  }

  emit('update:value', newValue as string | number | string[] | number[])
  emit('change', newValue as string | number | string[] | number[])
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!dropdownVisible.value) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      showDropdown()
    }
    return
  }

  switch (e.key) {
    case 'Escape':
      e.preventDefault()
      hideDropdown()
      break
    case 'ArrowDown':
      e.preventDefault()
      highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredOptions.value.length - 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      break
    case 'Enter':
      e.preventDefault()
      if (highlightedIndex.value >= 0 && highlightedIndex.value < filteredOptions.value.length) {
        handleOptionClick(filteredOptions.value[highlightedIndex.value])
      }
      break
  }
}

// 输入法处理
const handleCompositionStart = () => {
  isComposing.value = true
  emit('ime-status', true)
}

const handleCompositionUpdate = () => {
  isComposing.value = true
  emit('ime-status', true)
}

const handleCompositionEnd = (e: Event) => {
  isComposing.value = false
  emit('ime-status', false)
  handleInput(e)
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (!dropdownVisible.value) return

  const target = event.target as Node
  if (
    inputRef.value &&
    dropdownRef.value &&
    !inputRef.value.contains(target) &&
    !dropdownRef.value.contains(target)
  ) {
    hideDropdown()
  }
}

// 监听器
watch(
  () => props.position,
  async () => {
    if (dropdownVisible.value) {
      await nextTick()
      update()
    }
  }
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  cleanupUpdate()
})

// 暴露方法
defineExpose({
  showDropdown,
  hideDropdown,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>

<style scoped lang="scss">
.odos-smart-select {
  position: relative;
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: flex-start; /* 改为顶部对齐，支持多行 */
  background: #f2f3f5;
  border: 1px solid #f2f3f5;
  border-radius: 8px;

  &:hover {
    background: #e5e6eb;
  }

  &:focus-within {
    border: 1px solid #2e6ce4;
    background: #fff;
  }

  &.odos-smart-select-disabled {
    background: #f2f3f5;
    cursor: not-allowed;

    &:hover {
      background: #f2f3f5;
    }

    input {
      cursor: not-allowed;
    }
  }

  input {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    min-height: 40px; /* 改为最小高度 */
    padding: 10px 16px;
    font-size: 14px;
    color: #1d2129;

    &::placeholder {
      color: #86909c;
    }

    &.odos-smart-select-isTitle {
      padding-left: 88px;
    }

    &[readonly] {
      cursor: pointer;
    }
  }

  .odos-smart-select-title {
    position: absolute;
    width: 80px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 14px;
    color: #4e5969;
    border-right: 1px solid #c9cdd4;
    z-index: 1;
  }

  .odos-clear-icon {
    position: absolute;
    right: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;

    &:hover {
      background: #f2f3f5;
    }
  }

  .odos-arrow-icon {
    position: absolute;
    display: flex;
    align-items: center;
    right: 12px;
    height: 100%;
    cursor: pointer;
    transition: transform 0.2s ease;

    &.odos-arrow-open {
      transform: rotate(180deg);
    }
  }

  .odos-smart-select-tags {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: flex-start; /* 改为顶部对齐 */
    flex-wrap: wrap; /* 允许换行 */
    gap: 4px 6px; /* 水平和垂直间距 */
    padding: 6px 50px 6px 16px;
    overflow: visible; /* 允许内容显示 */
    pointer-events: none;
    min-height: 24px; /* 最小高度 */

    &.odos-smart-select-isTitle {
      padding-left: 88px;
    }
  }

  .odos-smart-select-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background: #fff;
    border: 1px solid #c9cdd4;
    color: #1d2129;
    border-radius: 6px;
    font-size: 12px;
    margin: 2px 0; /* 添加垂直间距 */
    max-width: 120px;
    pointer-events: auto;
    transition: all 0.2s ease;

    &:hover {
      background: #d4edfd;
      border-color: #9cc8ff;
    }

    &.tag-hidden {
      display: none;
    }

    &.tag-more {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 22px;
      padding: 0 8px;
      background: #fff;
      border: 1px solid #c9cdd4;
      color: #1d2129;
      border-radius: 6px;
      font-size: 12px;
      max-width: 120px;
      pointer-events: auto;
    }

    .tag-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
      line-height: 1.2;
    }

    .tag-close {
      cursor: pointer;
      font-size: 12px;
      color: #86909c;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border-radius: 50%;

      &:hover {
        color: #f53f3f;
        background: rgba(245, 63, 63, 0.1);
      }
    }
  }

  input.odos-smart-select-with-tags {
    color: transparent;

    &::placeholder {
      color: #86909c;
    }

    &:focus {
      color: #1d2129;
    }
  }
}

.odos-smart-select-dropdown {
  position: fixed;
  z-index: 1050;
  background: #fff;
  border-radius: 8px;
  box-shadow:
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  max-height: 256px;
  overflow-y: auto;

  &.dropdown-show {
    opacity: 1;
    transform: scale(1);
  }

  .odos-select-empty {
    padding: 20px;
    text-align: center;
    color: #86909c;
  }

  .odos-select-options {
    padding: 4px 0;
  }

  .odos-select-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    color: #1d2129;
    transition: background-color 0.2s ease;

    &:hover,
    &.option-highlighted {
      background: #f7f8fa;
    }

    &.option-selected {
      color: #2e6ce4;
      background: #f0f5ff;
    }

    &.option-disabled {
      color: #c9cdd4;
      cursor: not-allowed;
    }

    .option-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
