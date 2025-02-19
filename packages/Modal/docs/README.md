<script setup>
import ModalDefault from './default.vue'
</script>
# Modal 对话框

## 基础使用

<Preview comp-name="Modal" demo-name="default">
  <ModalDefault />
</Preview>

##  Modal API

### Modal 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| afterClose | Modal 完全关闭后的回调 | () => void | - |
| bodyStyle | Modal body 样式 | CSSProperties | - |
| cancelButtonProps | 取消按钮 props | ButtonProps | - |
| cancelText | 取消按钮文字 | string | Cancel |
| centered | 垂直居中展示 Modal | boolean | false |
| closable | 是否显示右上角的关闭按钮 | boolean | true |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | boolean | false |
| footer | 底部内容,当不需要默认底部_buttons时,可以设为 footer={null} | string | HTMLElement | () => ReactNode | null | - |
| forceRender | 强制渲染 Modal | boolean | false |
| getContainer | 指定 Modal 挂载的 HTML 节点, false 为挂在于 body 上 | HTMLElement | () => HTMLElement | false | document.body |
| mask | 是否展示遮罩层 | boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| maskStyle | 遮罩层样式 | CSSProperties | - |
| okButtonProps | 确认按钮 props | ButtonProps | - |
| okText | 确认按钮文字 | string | OK |
| okType | 确认按钮类型 | 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default' |
| style | 可用于设置浮层的样式,调整浮层位置等 | CSSProperties | - |
| title | 标题 | string | ReactNode | - |
| visible | 是否可见 | boolean | false |
| width | 宽度 | number | string | 520 |
| wrapClassName | 对话框外层容器的类名 | string | - |
| zIndex | 设置 Modal 的 z-index | number | 1000 |

### Modal 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| afterClose | Modal 完全关闭后的回调 | () => void |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | (e: MouseEvent) => void |
| onOk | 点击确定按钮的回调 | (e: MouseEvent) => void |