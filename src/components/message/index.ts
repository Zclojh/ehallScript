import { createApp, h, ref, reactive } from 'vue';
// 注意这里替换成存放路径
import rlMessage from './message.vue';

// 初始消息列表
interface MessageList {
  type: string;
  title: string;
}
const messageList = reactive<MessageList[]>([]);
// 消息显示时长
const timer = ref<number>(3000);

// 处理数据
function handleData(type: string, title: string): void {
  // 数据添加
  messageList.push({ type, title });

  // 数据删除
  setTimeout(() => {
    if (messageList.length > 0) {
      messageList.shift();
    }
  }, timer.value);
  
  // 创建
  const app = createApp({
    render() {
      return h(rlMessage, { messageList });
    }
  });

  // 容器挂载
  app.mount('.rl-message');
}

interface MessageImplements {
  info(title: string): void;
  warning(title: string): void;
  success(title: string): void;
  error(title: string): void;
}

class MessageClass implements MessageImplements {
  // 普通提示
  info(title: string): void {
    handleData('info', title);
  }

  // 警告提示
  warning(title: string): void {
    handleData('wraning', title);
  }

  // 成功提示
  success(title: string): void {
    handleData('success', title);
  }

  // 错误提示
  error(title: string): void {
    handleData('error', title);
  }
}

const Message = new MessageClass();

export default Message;
