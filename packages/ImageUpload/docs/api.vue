<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'prop',
    default: '--',
    type: 'string',
    describe: '属性描述'
  },
  {
    attribute: 'width',
    default: '350px',
    type: 'string',
    describe: '宽度'
  },
  {
    attribute: 'height',
    default: '219px',
    type: 'string',
    describe: '高度'
  },
  {
    attribute: 'limitSize',
    default: 20,
    type: 'number',
    describe: '限制大小',
  },
  {
    attribute: 'accept',
    default: '.png, .jpeg, .jpg',
    type: 'string',
    describe: '图片格式'
  },
  {
    attribute: 'imageData',
    default: '--',
    type:'ImageViewerProps',
    describe: '图片数据'
  },
  {
    attribute: 'upload-action',
    default: '--',
    type:'(imageType: "SOURCE" | "CROP", file: File, url?: string) => Promise<ImageUploadApiResponse>',
    describe: '上传图片接口'
  },{
    attribute: 'remove',
    default: '--',
    type:'(data: ImageViewerProps) => void',
    describe: '移除图片事件'
  },
  {
    attribute:'updateImage',
    default: '--',
    type:'(data: ImageViewerProps) => void',
    describe: '更新图片事件'
  },
]

const columns = [
  {
    title: '属性',
    dataIndex: 'attribute'
  },
  {
    title: '描述',
    dataIndex: 'describe'
  },
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '默认值',
    dataIndex: 'default'
  }
]
</script>