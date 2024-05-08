import { message } from 'ant-design-vue'
import info from './../icon/info.svg'
import success from './../icon/success.svg'
import warning from './../icon/warning.svg'
import error from './../icon/error.svg'
import '../../../styles/message.scss'
// info
export const useInfoMessage = (data?: { content: string; time?: number } | string) => {
  if (typeof data === 'string') {
    message.info({
      content: data,
      icon: () => <img class="icon" src={info} />,
      class: 'odos-info-msg'
    })
  } else if (typeof data === 'object') {
    message.info({
      content: data.content,
      icon: () => <img class="icon" src={info} />,
      duration: data.time,
      class: 'odos-info-msg'
    })
  } else {
    throw Error('内容不能为空')
  }
}
// error
export const useErrorMessage = (data?: { content: string; time?: number } | string) => {
  if (typeof data === 'string') {
    message.error({
      content: data,
      icon: () => <img class="icon" src={error} />,
      class: 'odos-error-msg'
    })
  } else if (typeof data === 'object') {
    message.error({
      content: data.content,
      icon: () => <img class="icon" src={error} />,
      duration: data.time,
      class: 'odos-error-msg'
    })
  } else {
    throw Error('内容不能为空')
  }
}
// success
export const useSuccessMessage = (data?: { content: string; time?: number } | string) => {
  if (typeof data === 'string') {
    message.success({
      content: data,
      icon: () => <img class="icon" src={success} />,
      class: 'odos-success-msg'
    })
  } else if (typeof data === 'object') {
    message.success({
      content: data.content,
      icon: () => <img class="icon" src={success} />,
      duration: data.time,
      class: 'odos-success-msg'
    })
  } else {
    throw Error('内容不能为空')
  }
}

// success
export const useWarningMessage = (data?: { content: string; time?: number } | string) => {
  if (typeof data === 'string') {
    message.warning({
      content: data,
      icon: () => <img class="icon" src={warning} />,
      class: 'odos-warning-msg'
    })
  } else if (typeof data === 'object') {
    message.warning({
      content: data.content,
      icon: () => <img class="icon" src={warning} />,
      duration: data.time,
      class: 'odos-warning-msg'
    })
  } else {
    throw Error('内容不能为空')
  }
}

// success
export const useLoadingMessage = (data?: { content: string; time?: number } | string) => {
  if (typeof data === 'string') {
    message.loading({
      content: data,
      class: 'odos-loading-msg'
    })
  } else if (typeof data === 'object') {
    message.loading({
      content: data.content,
      duration: data.time,
      class: 'odos-loading-msg'
    })
  } else {
    throw Error('内容不能为空')
  }
}
