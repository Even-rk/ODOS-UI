<template>
  <Drawer v-bind="$attrs" class="odos-drawer">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <template v-if="name !== 'default'">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </template>
  </Drawer>
</template>

<script lang="ts" setup>
import { Drawer } from 'ant-design-vue'
</script>
