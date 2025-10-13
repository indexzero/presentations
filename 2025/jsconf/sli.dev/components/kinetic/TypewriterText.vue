<template>
  <div class="typewriter-text">
    <span
      v-for="(char, index) in characters"
      :key="index"
      class="typewriter-char"
      :style="getCharStyle(index)"
    >{{ char === ' ' ? '\u00A0' : char }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  text: string
  duration?: number
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 400,
  delay: 0
})

const isAnimating = ref(false)
const characters = computed(() => props.text.split(''))
const charDelay = computed(() => props.duration / characters.value.length)

function getCharStyle(index: number) {
  return {
    '--char-delay': `${props.delay + (index * charDelay.value)}ms`,
    '--anim-duration': '200ms'
  }
}

onMounted(() => {
  requestAnimationFrame(() => {
    isAnimating.value = true
  })
})
</script>

<style scoped>
.typewriter-text {
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.typewriter-char {
  --char-delay: 0ms;
  --anim-duration: 200ms;
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: char-reveal var(--anim-duration) ease-out var(--char-delay) forwards;
}

@keyframes char-reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>