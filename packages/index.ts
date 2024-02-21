/* eslint-disable */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App, Plugin } from 'vue'
import { ButtonPlugin } from './Button'
import { IconPlugin } from './Icon'
import { RadioPlugin } from './Radio'

const Packages = [ButtonPlugin, IconPlugin, RadioPlugin]

const OdosPlugin: Plugin = {
  install(app: App) {
    Packages.forEach((item) => {
      item.install?.(app)
    })
  }
}

export default OdosPlugin
// 统一导出
export * from './Button'
export * from './Icon'
export * from './Radio'
