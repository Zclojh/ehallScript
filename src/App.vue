<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import rlButton from './components/Button.vue'
import Toast from './components/message/index'
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
const { proxy } = useCurrentInstance()
const cl = () => {
  console.log('12345')
  console.log(proxy)
  proxy.$toast('essss')
  console.log('123')
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
