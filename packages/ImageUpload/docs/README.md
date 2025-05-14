<script setup>
import demo from './demo.vue'

</script>

# ImageUpload 图片上传

## 基本使用

<Preview comp-name="ImageUpload" demo-name="demo">
  <demo />
</Preview>

## ImageUpload 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| prop | 属性描述 | string | -- |
| width | 宽度 | string | 350px |
| height | 高度 | string | 219px |
| limitSize | 限制大小 | number | -- |
| accept | 图片格式 | string | .png, .jpeg, .jpg |
| imageData | 图片数据 | ImageViewerProps | -- |
| upload-action | 上传图片接口 | (imageType:  | -- |
| remove | 移除图片事件 | (data: ImageViewerProps) => void | -- |
| updateImage | 更新图片事件 | (data: ImageViewerProps) => void | -- |
