import mitt from 'mitt'
import { h, render } from 'vue'
class Timer {
  startedAt: number
  callback: Function
  delay: number
  timer: number
  constructor(callback: Function, delay: number) {
    this.startedAt = Date.now()
    this.callback = callback
    this.delay = delay

    this.timer = setTimeout(callback, delay)
  }
  pause() {
    this.stop()
    this.delay -= Date.now() - this.startedAt
  }

  resume() {
    this.stop()
    this.startedAt = Date.now()
    this.timer = setTimeout(this.callback, this.delay)
  }

  stop() {
    clearTimeout(this.timer)
  }
}

const removeElement = (el: any) => {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode?.removeChild(el)
  }
}
const createComponent = (component: any, props: any, parentContainer: any, slots = {}) => {
  const vNode = h(component, props, slots)
  const container = document.createElement('div')
  container.classList.add('r-message--pending')
  parentContainer.appendChild(container)
  render(vNode, container)

  return vNode.component
}

const eventBus = mitt()

export { Timer, removeElement, eventBus, createComponent }
