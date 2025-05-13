<template>
  <div class="modal-overlay">
    <div class="modal-content" style="color: white">
      <div class="cropper-content" style="max-width: 600px">
        <img
          v-if="type === 'view'"
          :src="cropUrl || sourceUrl"
          alt=""
          width="600px"
          height="400px"
        />
        <vue-cropper
          v-else
          ref="cropperRef"
          :img="sourceUrl"
          @imgLoad="imgLoadHandle"
          @cropMoving="cropMovingHandle"
          v-bind="cropperOptions"
        />
      </div>
      <div
        class="rotation-controls w-[520px] h-[42px] bg-[#8F8F8F] border-rd-[8px] py-[18px] px-[20px] flex"
      >
        <div @click="resetRotation" class="color-[#fff] font-500 mr-[24px] iconImg2">重置</div>
        <div class="h-[16px] w-[1px] bg-[#fff]! mr-[20px]"></div>
        <div class="iconImg1 mr-[24px]">
          <a-tooltip content="逆时针旋转90">
            <span @click="sourceImageRotateHandle('L', 90)"
              ><Icon name="a-left90" size="28px"
            /></span>
          </a-tooltip>
        </div>
        <div class="mr-[20px] iconImg1">
          <a-tooltip content="逆时针旋转1">
            <span @click="sourceImageRotateHandle('L', 1)"
              ><Icon name="a-left1" size="28px"
            /></span>
          </a-tooltip>
        </div>
        <a-slider
          class="rotateSlider"
          v-model="rotation"
          :min="-180"
          :max="360"
          :tooltipVisible="false"
          :format-tooltip="formatterRotate"
        />
        <div class="ml-[24px] iconImg1">
          <a-tooltip content="顺时针旋转1">
            <span @click.stop="sourceImageRotateHandle('R', 1)"
              ><Icon name="a-right1" size="28px"
            /></span>
          </a-tooltip>
        </div>
        <div class="ml-[20px] iconImg1">
          <a-tooltip content="顺时针旋转90">
            <span @click="sourceImageRotateHandle('R', 90)"
              ><Icon name="a-right90" size="28px"
            /></span>
          </a-tooltip>
        </div>
      </div>
      <div class="zoom-controls">
        <div
          @click="sourceImageZoomHandle('RESET')"
          class="color-[#fff] font-500 mb-[20px] iconImg3"
        >
          重置
        </div>
        <div class="gap"></div>
        <div class="iconImg mb-[20px] mt-[20px]">
          <a-tooltip content="放大">
            <span @click="sourceImageZoomHandle('UP')"><Icon name="ZoomIn" size="28px" /></span>
          </a-tooltip>
        </div>
        <a-slider
          class="zoom"
          direction="vertical"
          v-model="zoom"
          :min="5"
          :max="800"
          :tooltipVisible="false"
          :format-tooltip="formatterZoom"
        />

        <div class="iconImg mt-[20px]">
          <a-tooltip content="缩小">
            <span @click="sourceImageZoomHandle('DOWN')"><Icon name="zoomOut" size="28px" /></span>
          </a-tooltip>
        </div>
      </div>
      <div class="modal-actions">
        <a-button class="action-button cancel" @click="cancelHandle">取消</a-button>
        <a-button class="action-button save" type="primary" @click="confirmHandle">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const formatterRotate = (value: number) => {
  return `${value}°`
}
const formatterZoom = (value: number) => {
  return `${value}%`
}
</script>

<script setup lang="ts">
import 'vue-cropper/dist/index.css'
import { Icon } from 'odos-ui'
import { VueCropper } from 'vue-cropper'
export interface CropAxisType {
  x1: number
  y1: number
  x2: number
  y2: number
}
export interface ImageViewerProps {
  cropUrl: string | null // 裁剪图片地址
  sourceUrl: string
  cropBoxData: CropAxisType | null
  type: 'edit' | 'view'
}
const props = withDefaults(
  defineProps<{
    sourceUrl: string
    cropUrl: string | null
    cropBoxData: CropAxisType | null
    type: 'edit' | 'view'
  }>(),
  {}
)
const emit = defineEmits(['cancel', 'confirm'])

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

onMounted(() => {
  // 初始化框位置
  if (props.cropBoxData) {
    cropperOptions.autoCropWidth = props.cropBoxData.x2 - props.cropBoxData.x1
  }
})
const cropMovingHandle = (data: { moving: boolean; axis: CropAxisType }) => {
  cropperBoxData.value = data.axis
}

const cancelHandle = () => {
  emit('cancel')
}

const confirmHandle = () => {
  if (props.type === 'edit') {
    // 获取裁剪后的图片Blob对象，并转换为URL
    cropperRef.value.getCropBlob((blob: Blob) => {
      const cropImageUrl = URL.createObjectURL(blob)
      emit('confirm', { cropImageUrl, cropImageAxis: cropperBoxData.value })
    })
    return
  }
  emit('confirm')
}

// 旋转 放大

const rotation = ref(0)
const zoom = ref(5)
// 旋转
const applyRotation = (flag: boolean) => {
  // if (cropperRef.value) {
  //   cropperRef.value.rotateTo(rotation.value)
  //   cropperRef.value.zoomTo((zoom.value / 100) * scaleFactor.value) // Ensure the zoom is reapplied
  //   // 获取图片和容器的数据
  //   if (flag) {
  //     const containerData = cropperRef.value.getContainerData()
  //     const imageData = cropperRef.value.getImageData()
  //     // 计算水平居中的偏移量
  //     const leftOffset = (containerData.width - imageData.width) / 2
  //     const topOffset = (containerData.height - imageData.height) / 2
  //     // 设置图片的偏移位置，确保居中
  //     cropperRef.value.moveTo(leftOffset, topOffset)
  //   }
  // }
}

const resetRotation = () => {
  rotation.value = 0
  applyRotation(true)
}

const sourceImageRotateHandle = (position: 'L' | 'R', angle: number) => {
  if (position === 'L') {
    rotation.value = rotation.value - angle
  }
  if (position === 'R') {
    rotation.value = rotation.value + angle > 360 ? 360 : rotation.value + angle
  }
  console.log('sourceImageRotateHandle', {
    cropperRef: cropperRef.value,
    rotate: cropperRef.value.rotate,
    rotateLeft: cropperRef.value.rotateLeft,
    rotateRight: cropperRef.value.rotateRight
  })

  // applyRotation(true)
}

watch([rotation, zoom], (newv, oldv) => {
  cropperRef.value.rotate = newv[0]
  if (newv[1] !== oldv[1]) {
    cropperRef.value.changeScale(newv[1] - oldv[1])
  }
})

const sourceImageZoomHandle = (type: 'UP' | 'DOWN' | 'RESET') => {
  if (type === 'UP') {
    if (zoom.value < 800) {
      zoom.value = zoom.value + 1
    }
  }
  if (type === 'DOWN') {
    if (zoom.value > 5) {
      zoom.value = zoom.value - 1
    }
  }
  if (type === 'RESET') {
    zoom.value = 5
    cropperRef.value.cancelScale()
  }
}

// import { ref, defineProps, watch, defineEmits, onMounted, nextTick } from 'vue'

// import VueCropper from 'vue-cropperjs'
// // import 'cropperjs/dist/cropper.css'
// const emit = defineEmits(['cancel', 'save'])
// const props = defineProps({
//   processingImageUrl: {
//     type: String,
//     default: ''
//   },
//   predBbox: {
//     type: Array,
//     // eslint-disable-next-line vue/require-valid-default-prop
//     default: []
//   },
//   initialRotation: {
//     type: Number,
//     default: 0
//   },
//   initialZoom: {
//     type: Number,
//     default: 100
//   },
//   caption: {
//     type: String,
//     default: ''
//   },
//   openCount: {
//     type: Number,
//     default: 0
//   },
//   predBboxStr: {
//     type: Array,
//     // eslint-disable-next-line vue/require-valid-default-prop
//     default: []
//   }
// })

// const processingImageUrl = ref(props.processingImageUrl)

// const predBbox = ref(props.predBbox)
// const predBboxStr = ref(props.predBboxStr)

// // watch(
// //   () => props.processingImageUrl,
// //   (newValue) => {
// //     processingImageUrl.value = newValue
// //   }
// // )

// // const isDraggingZoom = ref(false)
// const cropper = ref(null)

// const drawCropBox = () => {
//   const cropperInstance = cropperRef.value
//   if (!cropperInstance) {
//     return
//   }
//   cropperInstance.setCropBoxData({
//     left: +predBbox.value[0],
//     top: +predBbox.value[1],
//     width: predBbox.value[2] - predBbox.value[0],
//     height: predBbox.value[3] - predBbox.value[1]
//   })
// }

// onMounted(function () {
//   const element = document.querySelector('.cropper-content')
//   element.addEventListener('zoom', (event) => {
//     if (event.detail.originalEvent) {
//       // 将当前缩放比例同步到zoom.value
//       const newZoomValue = Math.min(Math.max(event.detail.ratio * 100, 5), 800)
//       zoom.value = newZoomValue
//     }
//   })
//   nextTick(() => {
//     drawCropBox()
//   })
// })
// // @ts-ignore
// // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

// watch(zoom, (newValue) => {
//   console.log(newValue)
// })
// // 监听鼠标滚轮的缩放事件

// const stopDraggingZoom = () => {
//   isDraggingZoom.value = false
// }
// const startDraggingZoom = (event) => {
//   isDraggingZoom.value = true
//   updateZoomDisplay(event)
// }

// const closeModal = () => {
//   emit('cancel')
// }

// const getCropBoxCoordinates = () => {
//   const cropperInstance = cropperRef.value
//   if (!cropperInstance) {
//     return ''
//   }
//   const cropBoxData = cropperInstance.getCropBoxData()

//   const x1 = cropBoxData.left
//   const y1 = cropBoxData.top
//   const x2 = cropBoxData.left + cropBoxData.width
//   const y2 = cropBoxData.top + cropBoxData.height

//   // 将坐标转换为字符串并拼接
//   return [x1, y1, x2, y2]
// }

// const save = () => {
//   const finalAngle = rotation.value
//   const finalScaleRatio = zoom.value
//   cropperRef.value.getCroppedCanvas().toBlob((blob) => {
//     console.log(finalAngle, finalScaleRatio)
//     emit(
//       'save',
//       {
//         finalAngle,
//         finalScaleRatio,
//         finalBbox: getCropBoxCoordinates(),
//         blob: blob,
//         imageChanged: true,
//         imageSaved: true
//       },
//       'image/jpeg'
//     )
//   })
// }

// const onReady = () => {
//   const cropperInstance = cropperRef.value
//   if (!cropperInstance) {
//     return
//   }
//   // 获取图片的原始尺寸
//   const imageData = cropperInstance.getImageData()
//   // 判断图片宽度是否大于 maxWidth，如果是，则调整图片尺寸
//   // 其实不管图片宽度大小，都要计算，小于600也要算
//   scaleFactor.value = maxWidth / imageData.naturalWidth
//   applyZoom()
//   applyRotation()
//   predBboxStr.value.forEach((item, index) => {
//     if (predBbox.value[index] !== item) {
//       drawCropBox()
//     }
//   })
// }

// watch(
//   () => props.initialRotation,
//   (newVal) => {
//     rotation.value = newVal
//     applyRotation()
//   }
// )

// watch(
//   () => props.initialZoom,
//   (newZoom) => {
//     zoom.value = newZoom
//     applyZoom()
//   }
// )
</script>
<style>
.arco-tooltip-content {
  background-color: #fff;
  color: #30241c;
  width: auto;
  height: 24px;
  border-radius: 7px !important;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style scoped lang="scss">
.cropper-content {
  width: 600px;
  height: 400px;
  border: 3px solid white;
}

.iconImg {
  height: 28px !important;
  width: 28px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  &:hover {
    background-color: #b2b2b2;
  }
  &:active {
    background-color: #575757;
  }
}
.iconImg1 {
  height: 28px !important;
  width: 28px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  &:hover {
    background-color: #b2b2b2;
  }
  &:active {
    background-color: #575757;
  }
}
.iconImg2,
.iconImg3 {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  &:hover {
    background-color: #b2b2b2;
  }
  &:active {
    background-color: #575757;
  }
}
.iconImg2 {
  width: 54px !important;
  height: 28px !important;
}
.iconImg3 {
  height: 38px !important;
  width: 22px;
  text-align: center;
}
.caption {
  position: absolute;
  left: 20px;
  top: 20px;
  color: #fff;
  font-weight: bold;
}
:deep(.arco-slider-vertical) {
  min-width: 0 !important;
}
.gap {
  width: 16px;
  height: 1px;
  opacity: 1;

  background: #d8d8d8;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(14, 14, 14, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.rotation-controls,
.zoom-controls {
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.zoom-controls {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: auto;
  border-radius: 12px;
  padding: 18px 20px;
  background: #8f8f8f;
}

.rotation-controls {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.rotation-display,
.zoom-display {
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  position: absolute;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 20px;
  top: 16px;
}

.action-button {
  margin: 0 10px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.action-button.cancel {
  background-color: #777;
  color: #fff;
}
</style>
