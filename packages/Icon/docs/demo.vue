<template>
  <div class="demo-icon">
    <template v-for="item in list" :key="item">
      <div class="copy-icon" @click="copy(item)">
        <odos-icon :name="item" />
        <div class="value">{{ item }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useSuccessMessage, useErrorMessage } from '../../Message/index'

const copy = async (name: string) => {
  await navigator.clipboard.writeText(`<odos-icon name="${name}" />`)
  useSuccessMessage(`<odos-icon name="${name}" /> copied`)
}
const list: string[] = [
  'check',
  'Callender',
  'AdaptX',
  'Reset',
  'Colock',
  'Nurse',
  'DoubleArrowDown',
  'Download',
  'Search',
  'More',
  'Doctor',
  'AdaptY',
  'History',
  'PatientNum',
  'Fold',
  'Delete',
  'CancelCircle',
  'Tidy',
  'View',
  'Tag',
  'Send',
  'Drag',
  'ProfileView',
  'Unfold',
  'Upload',
  'FullScreen',
  'ZoomIn',
  'Transfer',
  'Disinfect',
  'Tooth',
  'Edit',
  'Copy',
  'Operations',
  'Add',
  'ArowDown',
  'ArowRight',
  'ArowLeft',
  'Cancel',
  'Call',
  'ArowUp'
]
</script>

<style lang="scss">
.demo-icon {
  display: flex;
  flex-wrap: wrap;
  .copy-icon {
    width: 16.66%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #7b7a7a;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
    .icon {
      width: 30px;
      height: 30px;
    }
    .value {
      margin-top: 10px;
      color: rgba(0, 0, 0, 0.88);
      font-size: 14px;
    }
    &:hover {
      background: #3f6bdc;
      border: 1px solid transparent;
      .icon {
        width: 40px;
        height: 40px;
        color: #fff;
      }
      .value {
        color: #fff;
        font-size: 18px;
      }
    }
  }
}
</style>
