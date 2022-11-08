import { App, render, createVNode } from 'vue'
import Message from './Message.vue'

const defaultOpt = {
  // 创建默认参数
  duration: 2000,
  type: 'success',
}

// 消息数组
const stack: Array<HTMLDivElement> = []

/**
 * @description: 销毁 body 上的 Message 实例
 * @param {HTMLDivElement} ele
 * @return {*}
 */
const removeContainer = (ele: HTMLDivElement): void => {
  const index = stack.findIndex(item => item === ele)
  if (~index) {
    stack.splice(index, 1)
    setStyle()
  }
}
/**
 * @description: 把实例加到实例队列 stack 中，并设置队列中搜有实例的 style
 * @param {HTMLDivElement} ele
 * @return {*}
 */
const addContainer = (ele: HTMLDivElement): void => {
  stack.push(ele)
  setStyle()
}
/**
 * @description: 设置 stack 中所有实例的 style
 * @param {*}
 * @return {*}
 */
const setStyle = () => {
  stack.forEach((item, index) => {
    if (item?.getElementsByClassName('message-wrap')?.[0]) {
      let top = 0
      if (index > 0) {
        top += (stack[index - 1].getElementsByClassName('message-wrap')[0] as HTMLElement)?.getBoundingClientRect()?.bottom || 0
      }
      // eslint-disable-next-line
      ;(item.getElementsByClassName('message-wrap')[0] as HTMLElement).style.marginTop = `${top}px`
    }
  })
}

// 创建挂载实例
// eslint-disable-next-line
const createMount = (opts: { [key: string]: any }) => {
  const { duration } = opts
  // 创建一个 div 容器
  const container = document.createElement('div')
  // 创建 Message 实例，createVNode 的性能比 h 更好
  const vm = createVNode(Message, opts)
  // 把实例 render 到容器上
  render(vm, container)
  addContainer(container)
  // 把容器渲染到 body 上
  document.body.appendChild(container)
  const destory = () => {
    const timer = setTimeout(() => {
      render(null, container)
      removeContainer(container)
      document.body.removeChild(container)
      clearTimeout(timer)
    }, 500) // 500 为动画结束时间，根据情况修改
  }

  const timer = setTimeout(() => {
    destory()
    clearTimeout(timer)
  }, duration || defaultOpt.duration)

  return { destory }
}

function Toast(options: { message: string; duration?: number } | string): {
  destory: () => void
} {
  if (typeof options === 'string') {
    // eslint-disable-next-line
    options = {
      ...defaultOpt,
      message: options || '',
    }
  } else {
    // eslint-disable-next-line
    options = {
      ...defaultOpt,
      ...options,
    }
  }
  return createMount(options)
}

Toast.install = (app: App<Element>) => {
  app.component('toast', Message)
  app.provide('Toast', Toast)
  // 挂载 Toast 为全局方法 $toast
  // eslint-disable-next-line
  app.config.globalProperties.$toast = Toast
}

export default Toast
