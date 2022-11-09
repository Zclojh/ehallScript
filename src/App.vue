<script setup lang="ts">
import rlButton from './components/Button.vue'
import { useToast } from './components/newMessage'
// import Message from './components/message';
const cl = () => {
  // alert('1')
  // Message.warning("测试效果");
  const $toast = useToast()
  $toast.error('发送成功', {
    duration: 3000,
  })
}
</script>

<template>
  <!-- <h3>anniu</h3> -->
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
