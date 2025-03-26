<template>
  <div class="popconfirm-position">
    <div class="odos-btn-group">
      <odos-popconfirm position="left">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>left</odos-button>
      </odos-popconfirm>

      <odos-popconfirm position="top">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>top</odos-button>
      </odos-popconfirm>
    </div>

    <div class="odos-btn-group">
      <odos-popconfirm position="right">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>right</odos-button>
      </odos-popconfirm>

      <odos-popconfirm position="bottom">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>bottom</odos-button>
      </odos-popconfirm>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popconfirm-position {
  display: flex;
  flex-direction: column;

  .odos-btn-group {
    display: flex;
    gap: 10px;
    &:first-child {
      margin-bottom: 8px;
    }
  }

  .odos-btn {
    margin-right: 8px;
  }
}
</style>
