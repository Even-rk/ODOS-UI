<template>
  <odos-popconfirm>
    <template #content>
      <div>Content</div>
    </template>
    <odos-button>default</odos-button>
    <template #actions="{ cancel, confirm }">
      <odos-button @click="cancel">取消</odos-button>
      <odos-button type="primary" @click="confirm">确定</odos-button>
    </template>
  </odos-popconfirm>
</template>
