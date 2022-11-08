<template>
  <transition name="slide-fade">
    <ul class="message-list">
      <li
        :class="`message-item ${setClass(item.type)}`"
        v-for="(item, index) in messageList"
        :key="index"
      >
        <i class="ri-information-line"></i>
        {{ item.title }}
      </li>
    </ul>
  </transition>
</template>

<script lang="ts" setup="props" name="rlMessage">
import { reactive,defineProps, onMounted } from 'vue';

interface MessageList {
  type: string;
  title: string;
}

const props = defineProps({
  messageList: {
    type: Array<MessageList[]>,
    default: []
  }
})
onMounted(()=>{
  console.log(props.messageList)
})
const setClass =(type: string): string => {
  if (type === 'info') {
    return 'message-info-item';
  } else if (type === 'wraning') {
    return 'message-wraning-item';
  } else if (type === 'success') {
    return 'message-success-item';
  } else if (type === 'error') {
    return 'message-error-item';
  }

  return '';
}
</script>

<style lang="less" scoped>
.message-list {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  margin: 0 auto;
  text-align: right;
  .message-item {
    display: block;
    padding: 12px 24px;
    border: 1px solid #b3d0cf;
    margin-left: 8px;
    margin-bottom: 12px;
    background-color: #e6f3ff;
    font-size: 14p;
    color: #007bff;
    text-align: left;
    box-shadow: 0 1px 1px 0 hsla(0, 0%, 80.4%, 0.5);
    border-radius: 2px;
    cursor: default;
  }
  .message-info-item {
    border: 1px solid #b3d0cf;
    background-color: #e6f3ff;
    color: #007bff;
  }
  .message-error-item {
    border: 1px solid #e99;
    background-color: #f6e3e3;
    color: #e33;
  }
}
.slide-fade-enter-active {
    transition: all .2s ease-out;
  }

  .slide-fade-leave-active {
    transition: all .2s ease;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>
