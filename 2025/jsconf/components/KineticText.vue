<template>
  <component
    :is="tag"
    class="k-text"
    :class="[colorClass, sizeClass, { 'k-compressed': compressed }]"
    v-motion
    :initial="initial"
    :enter="enter"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'span'
  },
  color: String,
  size: String,
  compressed: {
    type: Boolean,
    default: true
  },
  from: {
    type: String,
    default: 'bottom'
  },
  delay: {
    type: Number,
    default: 0
  }
})

const colorClass = computed(() => props.color ? `k-${props.color}` : '')
const sizeClass = computed(() => props.size ? `k-${props.size}` : '')

const initial = computed(() => {
  const base = { opacity: 0 }
  switch(props.from) {
    case 'left':
      return { ...base, x: -100 }
    case 'right':
      return { ...base, x: 100 }
    case 'top':
      return { ...base, y: -50 }
    default:
      return { ...base, y: 50 }
  }
})

const enter = computed(() => ({
  opacity: 1,
  x: 0,
  y: 0,
  transition: {
    delay: props.delay,
    duration: 500,
    type: 'spring',
    stiffness: 250,
    damping: 25
  }
}))
</script>