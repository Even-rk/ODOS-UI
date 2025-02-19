<template>
  <Modal v-bind="$attrs" class="odos-modal">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <template v-if="name !== 'default'">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue'
import { ref } from 'vue'
</script>