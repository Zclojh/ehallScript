<!--
 * Message组件 封装
 * @author: becomer
 * @since: 2022-11-09
 * Message.vue
-->
<template>
  <transition :enter-active-class="transition.enter" :leave-active-class="transition.leave">
    <div
      ref="root"
      role="alert"
      v-show="isActive"
      class="r-message__item"
      :class="[`r-message__item--${type}`, `r-message__item--${position}`]"
      @mouseover="toggleTimer(true)"
      @mouseleave="toggleTimer(false)"
      @click="whenClicked"
    >
      <!-- <div class="c"></div> -->
      <i class="r-message__icon" :class="iconClass"></i>
      <p class="r-message__text" v-html="message"></p>
    </div>
  </transition>
</template>

<script setup lang="ts" name="RMessage">
import { computed, defineProps, getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, Ref, ref, render } from 'vue'
import { Positions } from './type.d'
import { Timer, removeElement, eventBus } from './utils'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success',
  },
  position: {
    type: String,
    default: Positions.TOP,
    // validator(value: string) {
    //   return !value || value in Positions
    // },
  },
  duration: {
    type: Number,
    default: 3000,
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
  onDismiss: {
    type: Function,
    default: () => {},
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  queue: Boolean,
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
})
const queueTimer: Ref<number | null> = ref(null)
const isActive = ref(false)
const parentTop: Ref<any> = ref(null)
const parentBottom: Ref<any> = ref(null)
const isHovered = ref(false)
const instance = getCurrentInstance()
const timer: Ref<Timer | null> = ref(null)

const iconClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'ri-checkbox-circle-fill'
    case 'warning':
      return 'ri-alert-fill'
    case 'error':
      return 'ri-close-circle-fill'
    case 'info':
      return 'ri-error-warning-fill'
    case 'default':
      return 'ri-error-warning-fill'
  }
})

// 设置顶部和底部div
const setupContainer = () => {
  parentTop.value = document.querySelector('.r-message.r-message--top')
  parentBottom.value = document.querySelector('.r-message.r-message--bottom')
  if (parentTop.value && parentBottom.value) return
  const container = document.body
  if (!parentTop.value) {
    parentTop.value = document.createElement('div')
    parentTop.value.className = 'r-message r-message--top'
    container.appendChild(parentTop.value)
  }

  if (!parentBottom.value) {
    parentBottom.value = document.createElement('div')
    parentBottom.value.className = 'r-message r-message--bottom'
    container.appendChild(parentBottom.value)
  }
}

// 只显示一个消息
const shouldQueue = () => {
  if (!props.queue) {
    return false
  }
  return parentTop.value.childElementCount > 0 || parentBottom.value.childElementCount
}

const dismiss = () => {
  if (timer) timer.value?.stop()
  clearTimeout(queueTimer?.value ?? undefined)
  isActive.value = false

  // Timeout for the animation complete before destroying
  setTimeout(() => {
    props.onDismiss.apply(null, null)
    const wrapper = root.value as unknown as Element
    render(null, wrapper)
    removeElement(wrapper)
  }, 150)
}

const showNotice = () => {
  if (shouldQueue()) {
    queueTimer.value = setTimeout(showNotice, 250)
  }
  const wrapper = (root.value as any).parentElement
  currentParent.value.insertAdjacentElement('afterbegin', root.value)
  removeElement(wrapper)

  isActive.value = true

  if (props.duration) {
    timer.value = new Timer(dismiss, props.duration)
  }
}
const whenClicked = () => {
  if (!props.dismissible) return
  props.onClick.apply(null, [])
  dismiss()
}

const toggleTimer = (newVal: boolean) => {
  if (!props.pauseOnHover || !timer) return
  newVal ? timer.value?.pause() : timer.value?.resume()
}

const currentParent = computed(() => {
  switch (props.position) {
    case Positions.TOP:
    case Positions.TOP_RIGHT:
    case Positions.TOP_LEFT:
      return parentTop.value

    case Positions.BOTTOM:
    case Positions.BOTTOM_RIGHT:
    case Positions.BOTTOM_LEFT:
      return parentBottom.value
  }
})
const transition = computed(() => {
  switch (props.position) {
    case Positions.TOP:
    case Positions.TOP_RIGHT:
    case Positions.TOP_LEFT:
      return {
        enter: 'r-message--fade-in-down',
        leave: 'r-message--fade-out',
      }

    case Positions.BOTTOM:
    case Positions.BOTTOM_RIGHT:
    case Positions.BOTTOM_LEFT:
      return {
        enter: 'r-message--fade-in-up',
        leave: 'r-message--fade-out',
      }
  }
})
onBeforeMount(() => {
  setupContainer()
})
const root = ref(null)
onMounted(() => {
  showNotice()
})
onBeforeUnmount(() => {
  eventBus.off('toast-clear', dismiss)
})
</script>

<style lang="less">
@import './theme/default/index.less';
</style>
