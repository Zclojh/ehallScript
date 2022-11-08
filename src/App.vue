<script setup lang="ts">

import rlButton from './components/Button.vue'
import rlMessage from './components/rlMessage';
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
// import Message from './components/message';
const cl = () => {
  // alert('1')
  // Message.warning("测试效果");
  rlMessage.error({
    content: "网络错误，请稍后再试",
    duration: 3000,
    close: false
});
}

function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const proxy = appContext.config.globalProperties
  return {
    proxy,
  }
}
</script>

<template>
  <!-- <h3>anniu</h3> -->
  <rl-message message="测试消息"></rl-message>
  <rl-button size="small" @click="cl">按钮测试</rl-button>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
</template>

<style scoped></style>
