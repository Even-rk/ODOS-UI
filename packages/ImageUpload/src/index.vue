<!-- 图片上传组件 -->
<template>
  <!-- 上传容器，支持自定义宽高 -->
  <div
    class="image-upload"
    :style="{
      width: width,
      height: height,
      border: fildUploadStatus === 'empty' ? '1px solid #F65B56' : '1px solid transparent',
    }"
  >
    <el-upload
      ref="uploadRef"
      action="#"
      v-model:file-list="targetFile"
      :accept="accept"
      :auto-upload="false"
      :limit="1"
      :showUploadList="false"
      :show-file-list="false"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :on-change="handleChange"
    >
      <div class="upload-trigger" v-if="!editorImage.sourceUrl">
        <UploadStatus
          :error-type="fildUploadStatusErrorType"
          :status="fildUploadStatus"
          :size="componentsSizeType"
          :limitSize="props.limitSize"
          @error-close="errorCloseHandle"
        />
      </div>
      <!-- 已上传状态显示 -->
      <div v-else class="upload-item">
        <img
          class="upload-item-thumbnail"
          :src="editorImage.cropUrl || editorImage.sourceUrl"
          :alt="editorImage.cropUrl || editorImage.sourceUrl"
        />
        <!-- 图片操作按钮组 -->
        <div class="upload-item-actions" @click.stop>
          <!-- 关闭按钮 -->
          <Icon
            @click.stop="handleRemove"
            name="CancelCircle"
            class="upload-item-actions-close-icon"
            color="white"
            :size="componentsSizeType === 'large' ? '22px' : '17px'"
          />
          <div class="image-options-btns">
            <!-- 放大查看按钮 -->
            <span
              class="upload-item-actions-enlarge"
              :style="{
                fontSize: componentsSizeType === 'large' ? '16px' : '10px'
              }"
              @click="handlePicturePreview"
            >
              <Icon name="FullScreen" />
              <span>放大查看</span>
            </span>
            <!-- 编辑图片按钮 -->
            <span
              class="upload-item-actions-edit"
              :style="{
                fontSize: componentsSizeType === 'large' ? '16px' : '10px'
              }"
              @click="handlePictureEdit"
            >
              <Icon name="Edit" />
              <span>编辑图片</span>
            </span>
          </div>
        </div>
      </div>
    </el-upload>
  </div>
  <!-- 图片编辑器组件 -->
  <image-viewer
    ref="viewerModalRef"
    :cropUrl="editorImage.cropUrl"
    :sourceUrl="editorImage.sourceUrl"
    @confirm="imageViewerConfirm"
  />
  <image-cropper
    ref="cropperModalRef"
    :cropUrl="editorImage.cropUrl"
    :sourceUrl="editorImage.sourceUrl"
    :cropBoxData="editorImage.cropBoxData"
    :target-crop-url="null"
    :target-source-url="null"
    @confirm="imageViewerConfirm"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue'
import type { UploadFile, UploadUserFile } from 'element-plus'
import { ElUpload } from 'element-plus'
import Icon from 'packages/Icon/src/index.vue'
import UploadStatus from './components/upload-status/index.vue'
import ImageCropper from './components/image-cropper.vue'
import ImageViewer from './components/image-viewer.vue'
export interface CropAxisType {
  x1: number
  y1: number
  x2: number
  y2: number
}
export interface ImageViewerProps {
  cropUrl: string | null // 裁剪图片地址
  sourceUrl: string | null
  cropBoxData: CropAxisType | null
  targetSourceUrl: string | null
  targetCropUrl: string | null
}
// 组件属性定义，支持自定义宽高
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    action?: string
    imageData?: ImageViewerProps | null
    uploadAction: Function // 上传接口方法
    limitSize?: number
    accept?: string
  }>(), 
  {
    width: '350px',
    height: '219px',
    action: '#',
    limitSize: 20,
    accept: '.png, .jpeg, .jpg'
  }
)
type ImageUploadStatus = 'empty' | 'error' | 'base'
const emit = defineEmits(['updateImage', 'remove', 'exceed', 'change'])
// 状态变量定义
const uploadRef = ref() // 上传组件引用
const viewerModalRef = ref() // 预览模态框引用
const cropperModalRef = ref() // 编辑器模态框引用
const targetFile = ref<any[]>() // 当前上传的文件对象
const fildUploadStatus = ref<ImageUploadStatus>('base') // 上传状态
const fildUploadStatusErrorType = ref<'size' | 'type' | null>(null)
const initEditorImage: ImageViewerProps = {
  sourceUrl: '',
  cropUrl: null,
  cropBoxData: null,
  targetCropUrl: null,
  targetSourceUrl: null
}
// 编辑器相关数据
const uploadImageInfo = ref<{ name: string; url: string }>()
const editorImage = reactive<ImageViewerProps>(initEditorImage)
const componentsSizeType = computed(() => {
  const widthNum = props.width ? Number(props.width.replace('px', '')) : 0
  if (widthNum > 250) {
    return 'large'
  }
  return 'medium'
})
const imageViewerConfirm = async (data?: {
  cropImageUrl: string
  cropImageAxis: CropAxisType
  file: Blob
}) => {
  // data 为空时，则为预览，不更新数据
  if (data) {
    editorImage.cropUrl = data.cropImageUrl
    editorImage.cropBoxData = data.cropImageAxis
    // 取文件名
    const cropImgName = editorImage.targetSourceUrl?.split('/')?.pop()?.split('.')[0]
    // 取图片类型
    const cropImgType = editorImage.targetSourceUrl?.split('/')?.pop()?.split('.')?.pop()

    if (uploadImageInfo.value?.name || (cropImgName && cropImgType)) {
      const sourceInfo = uploadImageInfo.value?.name.split('.') || [cropImgName, cropImgType]
      const file = new File([data.file], sourceInfo[0] + '_crop.' + sourceInfo[1])
      const res = await props.uploadAction('CROP', file, editorImage.targetCropUrl || undefined)
      if (res.data.code === 200) {
        editorImage.targetCropUrl = res.data.data.url
        emit('updateImage', editorImage)
        return
      }
    }
    emit('updateImage', editorImage)
  }
}

const errorCloseHandle = () => {
  uploadRef.value.clearFiles()
  emit('updateImage', editorImage)
  fildUploadStatus.value = 'base'
  editorImage.targetSourceUrl = null
  editorImage.targetCropUrl = null
  editorImage.cropBoxData = null
  editorImage.cropUrl = null
  editorImage.sourceUrl = null
}
// 处理超出限制的情况
const handleExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
  emit('exceed', {
    files,
    uploadFiles
  })
  // ElMessage.warning('只能上传一张图片')
}
// 处理文件变化
const handleChange = async (file: UploadFile, fileList: UploadFile[]) => {
  fildUploadStatusErrorType.value = null
  if (file.size && file.size > props.limitSize * 1024 * 1024) {
    fildUploadStatus.value = 'error'
    fildUploadStatusErrorType.value = 'size'
    uploadRef.value.clearFiles()
    return
  }
  if (file.raw?.type && !['image/png', 'image/jpeg', 'image/jpg'].includes(file.raw?.type)) {
    fildUploadStatus.value = 'error'
    fildUploadStatusErrorType.value = 'type'
    uploadRef.value.clearFiles()
    return
  }
  const {
    data: { data, code }
  } = await props.uploadAction('SOURCE', file.raw, undefined)
  if (code === 200) {
    editorImage.sourceUrl = URL.createObjectURL(file.raw!)
    targetFile.value = fileList as any
    editorImage.targetSourceUrl = data.url
    uploadImageInfo.value = data
    emit('updateImage', editorImage)
    fildUploadStatus.value = 'base'
    cropperModalRef.value.open()
  } else {
    uploadRef.value.clearFiles()
  }
  emit('change', {
    file,
    fileList,
    editorImage,
    uploadResult: {
      code,
      data
    }
  })
}

// 处理文件移除
const handleRemove = () => {
  targetFile.value = []
  emit('remove', editorImage)
  fildUploadStatus.value = 'base'
}

// 处理图片预览
const handlePicturePreview = () => {
  viewerModalRef.value.open()
}

// 处理图片编辑
const handlePictureEdit = () => {
  cropperModalRef.value.open()
}

watch(
  () => props.imageData,
  (newVal) => {
    if (newVal) {
      editorImage.sourceUrl = newVal.sourceUrl
      editorImage.cropUrl = newVal.cropUrl
      editorImage.cropBoxData = newVal.cropBoxData
      editorImage.targetCropUrl = newVal.targetCropUrl
      editorImage.targetSourceUrl = newVal.targetSourceUrl
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const validate = async () => {
  if (
    !editorImage.sourceUrl ||
    !editorImage.targetSourceUrl ||
    !editorImage.cropUrl ||
    !editorImage.targetCropUrl
  ) {
    fildUploadStatus.value = 'empty'
    return false
  }
  fildUploadStatus.value = 'base'
  return true
}
const removeValidateStatus = () => {
  fildUploadStatus.value = 'base'
  return true
}
defineExpose({
  validate,
  removeValidateStatus
})
</script>

<style lang="scss" scoped>
// 上传容器样式
.image-upload {
  position: relative;
  border-radius: 12px;
  // background-color: #DCE4EE;
  background-color: #ffffff;
  overflow: hidden;
  box-sizing: border-box;
  // 上传触发器样式
  .upload-trigger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: v-bind(width);
    height: v-bind(height);
    color: #909399;
    background-color: #ffffff;
    .upload-icon {
      font-size: 24px;
    }

    .upload-text {
      font-size: 14px;
    }
  }

  // 已上传项目样式
  .upload-item {
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(width);
    height: v-bind(height);
    background-color: #ecf0f8;
    // 缩略图样式
    .upload-item-thumbnail {
      width: v-bind(width);
      height: v-bind(height);
      object-fit: cover;
      border-radius: 8px;
    }

    // 操作按钮组样式
    .upload-item-actions {
      cursor: auto;
      position: absolute;
      top: 0;
      left: 0;
      width: v-bind(width);
      height: v-bind(height);

      // 关闭图标样式
      .upload-item-actions-close-icon {
        position: absolute;
        top: 8px;
        right: 10px;
        cursor: pointer;
      }
      &:hover > .image-options-btns {
        display: flex;
      }
      // 底部操作按钮容器
      .image-options-btns {
        display: none;
        position: absolute;
        width: 100%;
        bottom: 0;
        justify-content: center;
        gap: 7px;
        margin-bottom: 12px;
        color: white;

        // 放大和编辑按钮样式
        .upload-item-actions-enlarge,
        .upload-item-actions-edit {
          cursor: pointer;
          height: 22px;
          display: flex;
          align-items: center;
          padding: 4px 8px;
          gap: 4px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
      }
    }
  }
}

// 预览对话框样式
.preview-dialog {
  :deep(.el-dialog) {
    border-radius: 8px;
    overflow: hidden;
  }

  .preview-image {
    width: 100%;
    height: 100%;
    height: auto;
    display: block;
  }
}
</style>
