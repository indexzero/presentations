<template>
  <div
    class="kinetic-text"
    :class="`kinetic-text--from-${from}`"
    :style="animationStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  from?: 'left' | 'right' | 'top' | 'bottom'
  duration?: number
  delay?: number
  dissolve?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  from: 'right',
  duration: 500,
  delay: 0,
  dissolve: false
})

const isVisible = ref(false)

const distances = {
  left: { x: -800, y: 0 },
  right: { x: 800, y: 0 },
  top: { x: 0, y: -450 },
  bottom: { x: 0, y: 450 }
}

const animationStyle = computed(() => {
  const { x, y } = distances[props.from]

  return {
    '--initial-x': `${x}px`,
    '--initial-y': `${y}px`,
    '--duration': `${props.duration}ms`,
    '--delay': `${props.delay}ms`,
    '--opacity-start': props.dissolve ? '0' : '1',
    '--opacity-end': '1'
  }
})

onMounted(() => {
  // Trigger animation after mount
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})
</script>

<style scoped>
.kinetic-text {
  --initial-x: 0;
  --initial-y: 0;
  --duration: 500ms;
  --delay: 0ms;
  --opacity-start: 1;
  --opacity-end: 1;

  opacity: var(--opacity-start);
  transform: translate(var(--initial-x), var(--initial-y));
  animation: kinetic-entrance var(--duration) cubic-bezier(0.4, 0, 0.2, 1) var(--delay) forwards;
  will-change: transform, opacity;
}

@keyframes kinetic-entrance {
  to {
    opacity: var(--opacity-end);
    transform: translate(0, 0);
  }
}
</style>