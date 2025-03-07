<template>
  <div class="demo-text-display">
    <!-- 省略号模式 -->
    <div class="display-row">
      <h4>省略号模式</h4>
      <div class="display-group">
        <odos-text-display 
          text="这是一段很长的文本，当文本超出指定宽度时将会显示省略号，鼠标悬停可查看完整内容" 
          :width="200"
        />
      </div>
    </div>

    <!-- 跑马灯模式 -->
    <div class="display-row">
      <h4>跑马灯模式</h4>
      <div class="display-group">
        <odos-text-display 
          text="这是一段很长的文本，当文本超出指定宽度时将会以跑马灯的形式滚动显示" 
          :width="200"
          mode="marquee"
        />
      </div>
    </div>

    <!-- 不同宽度展示 -->
    <div class="display-row">
      <h4>不同宽度展示</h4>
      <div class="display-group">
        <div class="width-demo">
          <span>200px：</span>
          <odos-text-display 
            text="这是一段文本，展示在200px宽度的容器中" 
            :width="200"
          />
        </div>
        <div class="width-demo">
          <span>300px：</span>
          <odos-text-display 
            text="这是一段文本，展示在300px宽度的容器中" 
            :width="300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.demo-text-display {
  .display-row {
    margin-bottom: 2rem;

    h4 {
      margin: 0 0 1rem;
      color: #1d2129;
      font-weight: 500;
    }

    .display-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .speed-demo,
    .width-demo {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      span {
        width: 60px;
        color: #86909c;
      }
    }
  }
}
</style>
