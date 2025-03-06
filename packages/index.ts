/* eslint-disable */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App } from 'vue'
import { AudioPlugin } from './Audio'
import { ButtonPlugin } from './Button'
import { CheckBoxPlugin } from './CheckBox'
import { DatePickerPlugin } from './DatePicker'
import { EmptyPlugin } from './Empty'
import { IconPlugin } from './Icon'
import { InputPlugin } from './Input'
import { InputNumberPlugin } from './InputNumber'
import { LoadingPlugin } from './Loading'
import { ModalPlugin } from './Modal'
import { PaginationPlugin } from './Pagination'
import { PopoverPlugin } from './Popover'
import { RadioPlugin } from './Radio'
import { SelectPlugin } from './Select'
import { TablePlugin } from './Table'
import { TabsPlugin } from './Tabs'
import { TagPlugin } from './Tag'
import { TextareaPlugin } from './Textarea'
import { ToothSelectPlugin } from './ToothSelect'
import { ToothChartPlugin } from './ToothChart'
import { TooltipPlugin } from './Tooltip'
import type { Plugin } from 'vue'

const Packages: Plugin[] = [
  AudioPlugin,
  ButtonPlugin,
  CheckBoxPlugin,
  DatePickerPlugin,
  EmptyPlugin,
  IconPlugin,
  InputPlugin,
  InputNumberPlugin,
  LoadingPlugin,
  ModalPlugin,
  PaginationPlugin,
  PopoverPlugin,
  RadioPlugin,
  SelectPlugin,
  TablePlugin,
  TabsPlugin,
  TagPlugin,
  TextareaPlugin,
  ToothSelectPlugin,
  ToothChartPlugin,
  TooltipPlugin
]

const OdosPlugin: Plugin = {
  install(app: App) {
    Packages.forEach((item) => {
      item.install?.(app)
    })
  }
}

export default OdosPlugin

// 统一导出
export * from './Audio'
export * from './Button'
export * from './CheckBox'
export * from './DatePicker'
export * from './ToothSelect'
export * from './ToothChart'
export * from './Empty'
export * from './Icon'
export * from './Input'
export * from './InputNumber'
export * from './Loading'
export * from './Message'
export * from './Modal'
export * from './Pagination'
export * from './Popover'
export * from './Radio'
export * from './Select'
export * from './Table'
export * from './Tabs'
export * from './Tag'
export * from './Textarea'
export * from './Tooltip'
