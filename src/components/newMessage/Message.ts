import { createComponent, eventBus } from './utils'
import RMessage from './Message.vue'
export const useToast = (globalProps = {}) => {
  return {
    open(options: any) {
      let message = null
      if (typeof options === 'string') message = options

      const defaultProps = {
        message,
      }

      const propsData = Object.assign({}, defaultProps, globalProps, options)

      const instance = createComponent(RMessage, propsData, document.body) as any

      return {
        dismiss: instance?.ctx?.dismiss,
      }
    },
    clear() {
      eventBus.emit('toast-clear')
    },
    success(message: any, options = {}) {
      return this.open(
        Object.assign(
          {},
          {
            message,
            type: 'success',
          },
          options
        )
      )
    },
    error(message: any, options = {}) {
      return this.open(
        Object.assign(
          {},
          {
            message,
            type: 'error',
          },
          options
        )
      )
    },
    info(message: any, options = {}) {
      return this.open(
        Object.assign(
          {},
          {
            message,
            type: 'info',
          },
          options
        )
      )
    },
    warning(message: any, options = {}) {
      return this.open(
        Object.assign(
          {},
          {
            message,
            type: 'warning',
          },
          options
        )
      )
    },
    default(message: any, options = {}) {
      return this.open(
        Object.assign(
          {},
          {
            message,
            type: 'default',
          },
          options
        )
      )
    },
  }
}
