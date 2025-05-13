<template>
  <div class="upload-status">
    <Icon v-if="status === 'error'" name="Failed" :size="closeIconSize" class="errorCloseIcon"
      @click.stop="errorCloseHandle" />
    <template v-if="status === 'base'">
      <img src="./images/base.svg" alt="" />
      <span class="upload-text">点击上传图像</span>
      <span class="upload-tips">建议上传文件小于{{ limitSize }}mb</span>
    </template>
    <template v-if="status === 'empty'">
      <img src="./images/empty.svg" alt="" />
      <span class="upload-text">图像未上传哦</span>
    </template>
    <template v-if="status === 'error'">
      <img src="./images/error.svg" alt="" />
      <span class="upload-text">上传失败 请重新上传</span>
      <span class="upload-tips" style="color: #f65b56" v-if="errorType === 'size'">
        建议上传文件小于{{ limitSize }}mb
      </span>
      <span class="upload-tips" style="color: #f65b56" v-if="errorType === 'type'">
        文件格式仅限PNG、JPG
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import Icon from 'packages/Icon/src/index.vue'
import { ref, toRefs, watch } from 'vue';
const emit = defineEmits(['errorClose'])
const props = withDefaults(
  defineProps<{
    size: 'large' | 'medium' | 'small'
    status: 'empty' | 'error' | 'base'
    errorType: 'size' | 'type' | null
    limitSize: number
  }>(),
  {
    size: 'medium',
    status: 'base'
  }
)
const { status } = toRefs(props)
const initStyles = {
  imageWidth: '52px',
  imageHeight: '54px',
  textFontSize: '12px',
  tipsFontSize: '10px',
  closeIconSize: '16px'
}
const imageWidth = ref(initStyles.imageWidth)
const imageHeight = ref(initStyles.imageHeight)
const textFontSize = ref(initStyles.textFontSize)
const tipsFontSize = ref(initStyles.tipsFontSize)
const closeIconSize = ref(initStyles.closeIconSize)

watch(
  () => props.size,
  (newVal) => {
    if (newVal === 'large') {
      imageWidth.value = '75px'
      imageHeight.value = '80.23px'
      textFontSize.value = '16px'
      tipsFontSize.value = '14px'
      closeIconSize.value = '22px'
    } else if (newVal === 'medium') {
      imageWidth.value = initStyles.imageWidth
      imageHeight.value = initStyles.imageHeight
      textFontSize.value = initStyles.textFontSize
      tipsFontSize.value = initStyles.tipsFontSize
    }
  },
  {
    immediate: true
  }
)

const errorCloseHandle = () => {
  emit('errorClose')
}
</script>

<style scoped lang="scss">
.upload-status {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  img {
    width: v-bind(imageWidth);
    height: v-bind(imageHeight);
  }
}

.errorCloseIcon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #e5e6eb;
}

.upload-text {
  font-family: Source Han Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  text-align: justify;
  /* 浏览器可能不支持 */
  letter-spacing: normal;
  /* 文字/2级 */
  color: #4e5969;
  font-size: v-bind(textFontSize);
}

.upload-tips {
  font-family: Source Han Sans;
  font-size: 10px;
  font-weight: normal;
  line-height: normal;
  text-align: justify;
  /* 浏览器可能不支持 */
  letter-spacing: normal;
  /* 文字/3级 */
  color: #86909c;
  font-size: v-bind(tipsFontSize);
}
</style>
