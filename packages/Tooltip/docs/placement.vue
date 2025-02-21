<template>
  <div class="placement-demo">
    <div class="top">
      <odos-tooltip title="Top" placement="top">
        <odos-button>Top</odos-button>
      </odos-tooltip>
    </div>
    <div class="left-right">
      <odos-tooltip title="Left" placement="left">
        <odos-button>Left</odos-button>
      </odos-tooltip>
      <odos-tooltip title="Right" placement="right">
        <odos-button>Right</odos-button>
      </odos-tooltip>
    </div>
    <div class="bottom">
      <odos-tooltip title="Bottom" placement="bottom">
        <odos-button>Bottom</odos-button>
      </odos-tooltip>
    </div>
  </div>
</template>

<style scoped>
.placement-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.top,
.bottom {
  margin: 8px 0;
}

.left-right {
  display: flex;
  gap: 60px;
}

odos-button {
  min-width: 70px;
}
</style>
