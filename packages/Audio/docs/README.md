<script setup>
import demo from './demo.vue'
</script>

# Audio音频组件

音频组件提供了一个简洁美观的音频播放器界面，支持播放、暂停、进度控制等基本功能。组件基于HTML5 audio元素开发，并集成了进度条控制功能。

## 功能特点

- 支持音频播放和暂停控制
- 支持正常速度(1x)和二倍速(2x)播放
- 显示音频播放进度条，支持拖动调节播放进度
- 实时显示音频时长/当前播放时间（MM:SS格式）
- 支持自动播放功能
- 支持指定播放起始时间点
- 优雅的播放器界面，包含播放/暂停，速率播放按钮和进度条

## 基础使用

<Preview comp-name="Audio" demo-name="demo">
  <demo />
</Preview>

## Audio API

组件支持以下属性配置：
| 参数 | 说明 | 类型 | 默认值 |
| -------- | --------------------------- | ------ | ------ |
| src | 音频源文件地址 | string | - |
| autoPlay | 是否自动播放音频 | boolean | false |
| currentTime | 指定音频从特定时间点开始播放，单位为秒 | number | 0 |

### 事件

| 事件名称 | 说明           | 回调参数                                                                    |
| -------- | -------------- | --------------------------------------------------------------------------- |
| pause    | 音频暂停时触发 | (time: number, src: string) - time: 暂停时的播放时间（秒），src: 音频源地址 |

### 播放速率控制

组件提供两种播放速率控制：

- 正常速度(1x)播放：点击左侧的正常速度图标进行播放
- 二倍速(2x)播放：点击右侧的二倍速图标进行播放

组件会根据选择的播放速率自动调整播放速度。正常播放和二倍速播放互斥，一次只能选择其中一种速率播放。

### 进度条操作

进度条支持以下操作：

- 点击：直接跳转到点击位置对应的播放时间
- 拖动：拖动进度条到目标位置，释放后开始从该位置播放
- 实时显示：播放过程中，进度条会实时更新显示当前播放进度

### 注意事项

1. 使用`src`属性指定音频源时，请确保音频链接的有效性
2. `autoPlay`属性在某些浏览器中可能受到限制，需要用户手动触发才能播放
3. `currentTime`属性允许您指定音频从特定时间点开始播放，单位为秒
4. 组件会自动处理音频加载和播放状态，包括：
   - 加载元数据时获取音频总时长
   - 实时更新当前播放时间
   - 自动处理播放结束状态
5. 时间显示格式为MM:SS（分:秒），自动补零对齐
