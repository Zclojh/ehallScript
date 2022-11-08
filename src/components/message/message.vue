<template>
  <transition name="slide">
    <div :class="[type, center ? 'text-center' : '']" :style="{ ...style }" v-if="visible">
      <div v-if="messageArr.length">
        <div v-for="(item, index) in messageArr" :key="index">
          {{ item }}
        </div>
      </div>
      <div v-else>{{ message }}</div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'success',
    },
    duration: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    const messageArr: Array<string> = []
    const style = {}
    return {
      messageArr,
      visible: true,
      center: false,
      style,
    }
  },
  created(): void {
    const arr = this.message.split('\n')
    if (arr.length > 1) {
      this.messageArr = arr
    }
  },
  mounted(): void {
    this.startTimer()
  },
  methods: {
    startTimer(): void {
      const { duration } = this
      const timer = setTimeout(() => {
        this.visible = false
        clearTimeout(timer)
      }, duration)
    },
  },
})
</script>
