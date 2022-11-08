<!--
 * button模板
 * @author: becomer
 * @since: 2022-11-08
 * Button.vue
-->
<template>
  <button class="rl-button" :class="[props.type, props.size, props.disabled && 'disabled']" @click="cli">
    <slot></slot>
  </button>
</template>

<script setup lang="ts" name="rl-button">
import { defineProps, defineEmits } from 'vue'
const props = withDefaults(defineProps<{ type: string; size: string; disabled: boolean }>(), { type: 'primary', size: 'normal', disabled: false })

const emit = defineEmits(['click'])
const cli = () => {
  if (!props.disabled) {
    emit('click', null)
  }
}

console.log(props)
</script>

<style scoped></style>
