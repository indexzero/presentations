<template>
  <div class="kinetic-provider" :style="rhythmStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, onMounted, onUnmounted } from 'vue'

export interface KineticContext {
  beat: number
  isPlaying: boolean
  registerAnimation: (fn: () => void, delay?: number) => void
  startSequence: () => void
  stopSequence: () => void
  rhythm: number
}

const props = withDefaults(defineProps<{
  autoStart?: boolean
  rhythm?: number // milliseconds per beat
}>(), {
  autoStart: false,
  rhythm: 500 // 0.5s heartbeat
})

const beat = ref(0)
const isPlaying = ref(false)
const animationQueue = ref<Array<{ fn: () => void; delay: number }>>([])
let intervalId: number | null = null

const rhythmStyles = computed(() => ({
  '--kinetic-rhythm': `${props.rhythm}ms`,
  '--kinetic-beat': beat.value
}))

const registerAnimation = (fn: () => void, delay = 0) => {
  animationQueue.value.push({ fn, delay })
}

const startSequence = () => {
  if (isPlaying.value) return
  isPlaying.value = true

  intervalId = window.setInterval(() => {
    beat.value++

    // Process animations scheduled for this beat
    animationQueue.value = animationQueue.value.filter(({ fn, delay }) => {
      if (delay <= beat.value * props.rhythm) {
        fn()
        return false
      }
      return true
    })
  }, props.rhythm)
}

const stopSequence = () => {
  isPlaying.value = false
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const context: KineticContext = {
  beat: beat.value,
  isPlaying: isPlaying.value,
  registerAnimation,
  startSequence,
  stopSequence,
  rhythm: props.rhythm
}

provide('kinetic', context)

onMounted(() => {
  if (props.autoStart) {
    startSequence()
  }
})

onUnmounted(() => {
  stopSequence()
})
</script>

<style scoped>
.kinetic-provider {
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--color-bg, #000000);
}
</style>