<script setup lang="ts">
import type { ImageItem } from './index.vue'
interface Props {
  data: ImageItem
}
const props = defineProps<Props>()
</script>

<template>
  <div class="odos-ImageClassifyViewer-img-viewer">
    <div class="odos-ImageClassifyViewer-img-viewer-img">
      <div class="odos-ImageClassifyViewer-img-viewer-img-img">
        <img :src="data.thumbnailImageUrl" alt="" />
      </div>
      <p>{{ data.ljCreateDatetime }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.odos-ImageClassifyViewer-img-viewer {
  width: 146px;
  height: 118px;
  .odos-ImageClassifyViewer-img-viewer-img {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .odos-ImageClassifyViewer-img-viewer-img-img {
      border-radius: 12px;
      background: #ffffff;
      box-sizing: border-box;
      border: 1px solid #e5e6eb;
      width: 100%;
      height: 97px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      //   width: 100%;
      max-width: 146px;
      height: 97px;
      border-radius: 12px;
    }
    p {
      font-family: Alibaba PuHuiTi 3;
      font-size: 12px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: normal;
      /* 文字/2级 */
      color: #4e5969;
      margin: 0;
      padding: 0;
      text-align: center;
      width: 100%;
      height: 22px;
      box-sizing: border-box;
      line-height: 22px;
    }
  }
}
</style>
