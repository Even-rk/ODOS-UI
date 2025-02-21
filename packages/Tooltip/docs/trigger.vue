<template>
  <div class="trigger-demo">
    <odos-tooltip title="Hover 触发" placement="top">
      <odos-button>移入触发</odos-button>
    </odos-tooltip>

    <odos-tooltip title="Click 触发" placement="top" trigger="click">
      <odos-button>点击触发</odos-button>
    </odos-tooltip>
  </div>
</template>

<style scoped>
.trigger-demo {
  display: flex;
  gap: 16px;
}

button {
  min-width: 80px;
}
</style>
