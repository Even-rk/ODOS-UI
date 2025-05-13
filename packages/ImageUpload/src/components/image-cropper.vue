<template>
  <div class="cropper-container">
    <Modal v-model:open="isModalVisible" @cancel="cancelHandle" :title="''">
      <template #header>
        <div class="cropper-header">
          <span>裁剪图片调整合适的大小</span>
        </div>
      </template>
      <vue-cropper
        ref="cropperRef"
        style="width: 480px; height: 243px"
        :img="sourceUrl"
        @imgLoad="imgLoadHandle"
        @cropMoving="cropMovingHandle"
        v-bind="cropperOptions"
      />
      <template #footer>
        <div class="cropper-footer">
          <Button @click="cancelHandle">取消</Button>
          <Button type="primary" @click="confirmHandle">确认</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import Modal from 'packages/Modal/src/index.vue'
import Button from 'packages/Button/src/index.vue'
import type { CropAxisType, ImageViewerProps } from '../index.vue'
import { ref, reactive, onMounted, nextTick } from 'vue'

const props = withDefaults(defineProps<ImageViewerProps>(), {})
const emit = defineEmits(['cancel', 'confirm'])
const isModalVisible = ref(false) // 模态框显示状态
const cropperRef = ref<any>(null)
const cropperOptions = reactive({
  autoCropWidth: 200, // 默认生成截图框宽度 默认容器的 80%
  autoCropHeight: 200, // 默认生成截图框高度 默认容器的 80%
  autoCrop: true, // 是否默认生成截图框
  canMove: false, // 图片是否可以移动
  canScale: false, // 图片是否可以鼠标滚轮缩放
  fixedNumber: [3, 2], // 截图框比例
  fixed: true, // 截图框是否固定
  info: true, // 是否显示截图框信息
  centerBox: true // 截图框是否被限制在图片里
})
const cropperBoxData = ref<{
  x1: number
  y1: number
  x2: number
  y2: number
}>()

const imgLoadHandle = () => {
  nextTick(() => {
    if (props.cropBoxData) {
      cropperRef.value.cropOffsertX = props.cropBoxData.x1
      cropperRef.value.cropOffsertY = props.cropBoxData.y1
    }
  })
}
const cancelHandle = () => {
  emit('cancel')
  isModalVisible.value = false
}

const confirmHandle = () => {
  // 获取裁剪后的图片Blob对象，并转换为URL
  cropperRef.value.getCropBlob((blob: Blob) => {
    const cropImageUrl = URL.createObjectURL(blob)
    emit('confirm', { cropImageUrl, cropImageAxis: cropperBoxData.value, file: blob })
    isModalVisible.value = false
  })
}

onMounted(() => {
  // 初始化框位置
  if (props.cropBoxData) {
    cropperOptions.autoCropWidth = props.cropBoxData.x2 - props.cropBoxData.x1
  }
})
const cropMovingHandle = (data: { moving: boolean; axis: CropAxisType }) => {
  cropperBoxData.value = data.axis
}
const open = () => {
  console.log('open',props)
  if (props.cropBoxData) {
    cropperOptions.autoCropWidth = props.cropBoxData.x2 - props.cropBoxData.x1
    cropperOptions.autoCropHeight = props.cropBoxData.y2 - props.cropBoxData.y1
  }
  isModalVisible.value = true
}
defineExpose({
  open
})
</script>

<style scoped lang="scss">
:deep(.drawer-wrapper) {
  .drawer-container {
    width: 550px !important;
    height: 365px !important;
  }
  .drawer-header {
    border: none !important;
  }
  .drawer-body {
    padding: 0 25.5px !important;
  }
  .drawer-footer {
    border: none !important;
    margin-top: 8px;
  }
}
.cropper-header {
  width: 100%;
  font-family: Source Han Sans CN;
  font-size: 16px;
  font-weight: normal;
  line-height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: normal;
  color: #86909c;
}
.cropper-footer {
  display: flex;
  gap: 16px;
}
</style>
