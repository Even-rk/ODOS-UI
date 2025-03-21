<template>
  <div class="popover-position">
    <div class="odos-btn-group">
      <odos-popover position="left" trigger="click">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>left</odos-button>
      </odos-popover>

      <odos-popover position="leftTop" trigger="click">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>leftTop</odos-button>
      </odos-popover>

      <odos-popover position="top" trigger="click">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>top</odos-button>
      </odos-popover>

      <odos-popover position="rightTop" trigger="click">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>rightTop</odos-button>
      </odos-popover>
    </div>

    <div class="odos-btn-group">
      <odos-popover position="right" trigger="click">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>right</odos-button>
      </odos-popover>

      <odos-popover position="rightBottom" trigger="click">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>rightBottom</odos-button>
      </odos-popover>

      <odos-popover position="bottom" trigger="click">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>bottom</odos-button>
      </odos-popover>

      <odos-popover position="leftBottom" trigger="click">
        <template #content>
          <div>Content</div>
        </template>
        <odos-button>leftBottom</odos-button>
      </odos-popover>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popover-position {
  display: flex;
  flex-direction: column;

  .odos-btn-group {
    display: flex;
    &:first-child {
      margin-bottom: 8px;
    }
  }

  .odos-btn {
    margin-right: 8px;
  }
}
</style>
