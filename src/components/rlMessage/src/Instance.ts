import { createApp, h, render } from 'vue'
import Message from './Message.vue'

const createInstance = (cfg:any) =>{
    const config = cfg || {}

    // 1. 创建包裹容器并设置外层div
    let messageNode = document.createElement('div')
    let attr = document.createAttribute("class")
    attr.value = "rl-message-div"
    messageNode.setAttributeNode(attr)

    //2. 消息计数
    const height = 54; //单个消息高度
    const messageList = document.getElementsByClassName("rl-message-div")
    messageNode.style.top = `${messageList.length * height}px`;

    // 3.创建实例并挂在到body

    const vNode = h(Message,{
        config,
        remove: ()=>{
            handleRemove()// 移除元素，消息关闭后从 Dom 上取消挂载并移除
        }
    })

    render(vNode,messageNode)


    document.body.appendChild(messageNode)




    const handleRemove = ()=>{
        document.body.removeChild(messageNode)
        resetMsgTop()
       }
      
      const resetMsgTop = () => {
        for (let i = 0; i < messageList.length; i++) {
          (messageList[i] as HTMLDivElement).style.top = `${i * height}px`
        }
      }
}

export default createInstance