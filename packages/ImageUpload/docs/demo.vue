<template>
  <odos-ImageUpload
    ref="imageUploadRef"
    width="300px"
    height="200px"
    :imageData="imageDataInfo"
    :upload-action="uploadActionHandle"
    @remove="removeImageHandle"
    @updateImage="updateImageHandle"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ImageViewerProps } from '../src/index.vue'
const imageDataInfo = ref<ImageViewerProps | null>()
const imageUploadRef = ref()
const uploadActionHandle = (imageType: 'SOURCE' | 'CROP', file: File, url?: string) => {
  // 上传图片 接口，进行特殊操作，如重命名
  return {
    data: {
      data: {
        name: 'fileName',
        url: 'fileUrl'
      },
      code: 200
    }
  }
}
const removeImageHandle = (data: ImageViewerProps) => {
  imageDataInfo.value = {
    sourceUrl: null,
    cropUrl: null,
    cropBoxData: null,
    targetCropUrl: null,
    targetSourceUrl: null
  }
}
const updateImageHandle = (data: ImageViewerProps) => {
  imageDataInfo.value = data
}
</script>

<style scoped lang="scss"></style>
