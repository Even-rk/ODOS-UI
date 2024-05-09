/* eslint-disable */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App, Plugin } from 'vue'
import { ButtonPlugin } from './Button'
import { IconPlugin } from './Icon'
import { InputPlugin } from './Input'
import { InputNumberPlugin } from './InputNumber'
import { PopoverPlugin } from './Popover'
import { RadioPlugin } from './Radio'
import { CheckBoxPlugin } from './CheckBox'
import { TablePlugin } from './Table'
import { TextareaPlugin } from './Textarea'

const Packages = [
  ButtonPlugin,
  IconPlugin,
  InputPlugin,
  InputNumberPlugin,
  PopoverPlugin,
  RadioPlugin,
  CheckBoxPlugin,
  TablePlugin,
  TextareaPlugin
]

const OdosPlugin: Plugin = {
  install(app: App) {
    Packages.forEach((item) => {
      item.install?.(app)
    })
  }
}

export default OdosPlugin
// message
export * from './Message'
// 统一导出
export * from './Button'
export * from './Icon'
export * from './Input'
export * from './InputNumber'
export * from './Popover'
export * from './Radio'
export * from './CheckBox'
export * from './Table'
export * from './Textarea'
