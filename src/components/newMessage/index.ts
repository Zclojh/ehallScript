import RMessage from './Message.vue'
import { useToast } from './Message'
import Positions from './type.d'

const MessagePlugin = {
  install: (app: any, options = {}) => {
    let instance = useToast(options)
    app.config.globalProperties.$toast = instance
    app.provide('$toast', instance)
  },
}

export default MessagePlugin
export { useToast, MessagePlugin, RMessage, Positions }
