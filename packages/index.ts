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
import { RadioPlugin } from './Radio'
import { CheckboxPlugin } from './Checkbox'

const Packages = [
  ButtonPlugin,
  IconPlugin,
  InputPlugin,
  InputNumberPlugin,
  RadioPlugin,
  CheckboxPlugin
]

const OdosPlugin: Plugin = {
  install(app: App) {
    Packages.forEach((item) => {
      item.install?.(app)
    })
  }
}

export default OdosPlugin

export * from './Button'
export * from './Checkbox'
export * from './Icon'
export * from './Input'
export * from './InputNumber'
export * from './Radio'
