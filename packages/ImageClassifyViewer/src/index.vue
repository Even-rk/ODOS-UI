<script setup lang="ts">
import Icon from 'packages/Icon/src/index.vue'
import { computed, onMounted, ref, watch } from 'vue'
import ImgViewer from './img-viewer.vue'
export interface ImageItem {
  imageUrl: string
  patientId?: number
  aptmId?: number
  startTime?: string
  thumbnailImageUrl?: string
  typeName?: string
  ljCreateDatetime?: string
}
interface Props {
  data: {
    [key: string]: ImageItem[]
  }
  title?: string
  showSync?: boolean
  showUpload?: boolean
  defaultType?: 'date' | 'category'
}
const props = defineProps<Props>()

const emit = defineEmits([
  'sync',
  'upload',
  'change',
  'dragstart',
  'dragend',
  'dragover',
  'drop',
  'dragenter',
  'dragleave'
])
const currentType = ref<'date' | 'category'>('date')
const openItems = ref<string[]>([])
const expandedItems = ref<string[]>([])
// 为"按类别"视图下的每个分类跟踪其展开级别
const categoryExpansionLevels = ref<{ [key: string]: number }>({})

// 核心计算属性，为视图准备统一的数据结构
const processedData = computed(() => {
  if (!props.data) return []

  // 基础数据转换
  const baseData = Object.keys(props.data).map((key) => ({
    title: key,
    data: props.data[key]
  }))

  if (currentType.value === 'date') {
    // "按日期"视图的逻辑
    return baseData.map((item) => ({
      ...item,
      imagesToDisplay: expandedItems.value.includes(item.title) ? item.data : item.data.slice(0, 6),
      isMoreAvailable: item.data.length > 6 && !expandedItems.value.includes(item.title)
    }))
  }

  // "按类别"视图的逻辑
  return baseData.map((item) => {
    const { title, data: images } = item

    // 按预约ID分组并排序
    const groups: { [key: number]: ImageItem[] } = {}
    images.forEach((img) => {
      const aptmId = img.aptmId || 0
      if (!groups[aptmId]) groups[aptmId] = []
      groups[aptmId].push(img)
    })
    const appointments = Object.keys(groups)
      .map((id) => ({ aptmId: Number(id), images: groups[Number(id)] }))
      .sort((a, b) => b.aptmId - a.aptmId)

    // 根据展开级别决定要显示的图片
    const level = categoryExpansionLevels.value[title] || 0
    let imagesToDisplay: ImageItem[]
    let isMoreAvailable: boolean

    if (title === '口内照') {
      // "口内照"的特殊逻辑
      const latestApptHasLessThanSix = appointments.length > 0 && appointments[0].images.length < 6

      if (level === 0) {
        // 初始状态: 最新预约的6张
        imagesToDisplay = appointments.length > 0 ? appointments[0].images.slice(0, 6) : images.slice(0, 6)
        // 判断是否可展开：如果最新预约本身就超过6张，或者总预约数大于1
        isMoreAvailable =
          (appointments.length > 0 && appointments[0].images.length > 6) || appointments.length > 1
      } else {
        // 展开状态
        // 如果最新预约不足6张，则展开的预约数要比level多1，实现"跳级"效果
        const appointmentsToShowCount = latestApptHasLessThanSix ? level + 1 : level
        imagesToDisplay = appointments.slice(0, appointmentsToShowCount).flatMap((g) => g.images)
        isMoreAvailable = appointmentsToShowCount < appointments.length
      }
    } else {
      // 其他类别的逻辑: 初始展示最新预约的全部
      if (appointments.length === 0) {
        imagesToDisplay = images // 无预约信息则全部展示
        isMoreAvailable = false
      } else {
        const groupsToShow = appointments.slice(0, level + 1)
        imagesToDisplay = groupsToShow.flatMap((g) => g.images)
        isMoreAvailable = level + 1 < appointments.length
      }
    }

    return {
      ...item,
      imagesToDisplay,
      isMoreAvailable
    }
  })
})

watch(
  () => props.data,
  (newData) => {
    // 数据变化时重置所有展开状态
    expandedItems.value = []
    categoryExpansionLevels.value = {}
    if (!newData) {
      openItems.value = []
      return
    }
    const keys = Object.keys(newData)
    if (keys.length === 0) {
      openItems.value = []
      return
    }

    if (currentType.value === 'category') {
      openItems.value = keys
    } else {
      const newOpenItems = openItems.value.filter((item) => keys.includes(item))
      if (newOpenItems.length === 0) {
        newOpenItems.push(keys[0])
      }
      openItems.value = newOpenItems
    }
  },
  { immediate: true, deep: true }
)

watch(
  currentType,
  (newType) => {
    // 切换视图时重置所有展开状态
    expandedItems.value = []
    categoryExpansionLevels.value = {}
    const dataKeys = props.data ? Object.keys(props.data) : []

    if (newType === 'category') {
      openItems.value = dataKeys
    } else {
      // 切换回日期时，默认打开第一个
      if (dataKeys.length > 0) {
        openItems.value = [dataKeys[0]]
      } else {
        openItems.value = []
      }
    }
  },
  {
    immediate: true
  }
)

const syncHandler = () => {
  emit('sync')
}
const uploadHandler = () => {
  emit('upload')
}
const dragStartHandler = (image: ImageItem, e: DragEvent) => {
  emit('dragstart', image, e)
}
const dragOverHandler = (image: ImageItem, e: DragEvent) => {
  emit('dragover', image, e)
}
const dropHandler = (image: ImageItem, e: DragEvent) => {
  emit('drop', image, e)
}
const dragEnterHandler = (image: ImageItem, e: DragEvent) => {
  emit('dragenter', image, e)
}
const dragLeaveHandler = (image: ImageItem, e: DragEvent) => {
  emit('dragleave', image, e)
}
const classifyHandler = (type: 'date' | 'category') => {
  currentType.value = type
  emit('change', type)
}
const clissifyItemClick = (title: string) => {
  if (currentType.value === 'category') {
    return
  }
  const index = openItems.value.indexOf(title)
  if (index > -1) {
    openItems.value.splice(index, 1)
  } else {
    openItems.value.push(title)
  }
}
const showMoreHandler = (title: string) => {
  if (currentType.value === 'category') {
    // "按类别"视图下的展开逻辑
    const currentLevel = categoryExpansionLevels.value[title] || 0
    categoryExpansionLevels.value[title] = currentLevel + 1
  } else {
    // "按日期"视图下的展开逻辑
    if (!expandedItems.value.includes(title)) {
      expandedItems.value.push(title)
    }
  }
}
onMounted(() => {
  if (props.defaultType) {
    classifyHandler(props.defaultType)
  }
})
</script>

<template>
  <div class="odos-ImageClassifyViewer">
    <!-- 组件内容 -->
    <div class="odos-ImageClassifyViewer-header">
      <div v-if="title || showSync || showUpload" class="odos-ImageClassifyViewer-header-left">
        <span v-if="title">{{ title }}</span>
        <button v-if="showSync" @click="syncHandler">
          <Icon name="sync" />
          <span>同步</span>
        </button>
        <button v-if="showUpload" @click="uploadHandler">
          <Icon name="Upload" />
          <span>上传</span>
        </button>
      </div>
      <div class="odos-ImageClassifyViewer-header-right">
        <button @click="classifyHandler('date')" :class="{ 'classify-active': currentType === 'date' }">
          按日期
        </button>
        <button
          @click="classifyHandler('category')"
          :class="{ 'classify-active': currentType === 'category' }"
        >
          按类别
        </button>
      </div>
    </div>
    <div class="odos-ImageClassifyViewer-content">
      <div
        class="odos-ImageClassifyViewer-content-item"
        v-for="(item, index) in processedData"
        :key="item.title"
      >
        <div
          class="odos-ImageClassifyViewer-content-item-title"
          :style="{
            marginTop: index === 0 ? '0' : '16px',
            cursor: currentType === 'category' ? 'default' : 'pointer'
          }"
          @click="clissifyItemClick(item.title)"
        >
          <Icon v-if="currentType === 'date'" name="Callender" />
          <span>{{ item.title }}</span>
          <Icon
            v-if="currentType === 'date'"
            :name="openItems.includes(item.title) ? 'ArrowUp' : 'ArrowDown'"
          />
        </div>
        <div
          v-if="item.data.length > 0 && openItems.includes(item.title)"
          class="odos-ImageClassifyViewer-content-item-list"
        >
          <ImgViewer
            draggable="true"
            @dragstart="dragStartHandler(image, $event)"
            @dragover="dragOverHandler(image, $event)"
            @drop="dropHandler(image, $event)"
            @dragenter="dragEnterHandler(image, $event)"
            @dragleave="dragLeaveHandler(image, $event)"
            v-for="image in item.imagesToDisplay"
            :key="image.imageUrl"
            :data="image"
          />
          <div v-if="item.isMoreAvailable" class="showMore" @click="showMoreHandler(item.title)">
            查看更多{{ currentType === 'category' ? item.title : '' }}

            <Icon name="DoubleArrowDown" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.odos-ImageClassifyViewer {
  // 样式定义
  background-color: transparent;
  border-radius: 8px;
  padding: 20px 16px 16px 16px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  // overflow-y: auto;
  .odos-ImageClassifyViewer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    background-color: transparent;
    box-sizing: border-box;
    .odos-ImageClassifyViewer-header-left {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      & > span {
        position: static;
        font-family: Alibaba PuHuiTi 3;
        font-size: 20px;
        font-weight: 600;
        line-height: normal;
        text-align: center;
        letter-spacing: 0px;
        font-feature-settings: 'kern' on;
        color: #1d2129;
      }
      & > button {
        width: 52px;
        height: 32px;
        border: none;
        background: none;
        cursor: pointer;
        font-family: Alibaba PuHuiTi 3;
        font-size: 14px;
        font-weight: normal;
        line-height: normal;
        text-align: center;
        letter-spacing: normal;
        /* 主色/100% */
        color: #2e6ce4;
        padding: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: center;
      }
    }
    .odos-ImageClassifyViewer-header-right {
      box-sizing: border-box;
      width: 129px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-radius: 8px;
      padding: 4px;
      /* 填充/常规 */
      background: #f2f3f5;
      & > button {
        flex: 1;
        width: 60.5px;
        height: 24px;
        border: none;
        background: transparent;
        font-family: Source Han Sans;
        font-size: 12px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: normal;
        /* 文字/2级 */
        color: #4e5969;
        box-sizing: border-box;
        cursor: pointer;
        line-height: 20px;
        &.classify-active {
          border-radius: 6px;
          background: #ffffff;
          font-family: 思源黑体;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: normal;
          /* 主色/100% */
          color: #2e6ce4;
        }
      }
    }
  }
  .odos-ImageClassifyViewer-content {
    position: relative;
    // margin-top: 16px;
    box-sizing: border-box;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    /* 隐藏滚动条但保持滚动功能 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE */
    .odos-ImageClassifyViewer-content-item {
      .odos-ImageClassifyViewer-content-item-title {
        height: 22px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: Alibaba PuHuiTi 3;
        font-size: 16px;
        font-weight: 500;
        line-height: normal;
        text-align: center;
        letter-spacing: normal;
        /* 文字/2级 */
        color: #4e5969;
        margin: 16px 0;
        position: sticky;
        top: 0;
        z-index: 5;
        background-color: transparent;
      }
      .odos-ImageClassifyViewer-content-item-list {
        min-width: 463px;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
    }
    .showMore {
      cursor: pointer;
      width: 100%;
      height: 20px;
      font-family: Alibaba PuHuiTi 3;
      font-size: 14px;
      font-weight: normal;
      line-height: normal;
      text-align: center;
      letter-spacing: normal;
      /* 主色/100% */
      color: #2e6ce4;
    }
  }
}
</style>
