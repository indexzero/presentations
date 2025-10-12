<template>
  <div class="gif-hook" :class="{ 'gif-hook--playing': isPlaying, 'gif-hook--ended': hasEnded }">
    <!-- Full bleed background GIF -->
    <div class="gif-hook__media">
      <img
        :src="src"
        :alt="alt"
        @load="onLoad"
        class="gif-hook__img"
      />
    </div>

    <!-- Optional overlay mask for text contrast -->
    <div
      v-if="maskOpacity > 0"
      class="gif-hook__mask"
      :style="{ '--mask-opacity': maskOpacity }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  duration: number // in seconds
  alt?: string
  autoplay?: boolean
  maskOpacity?: number // 0-1, opacity of dark overlay
  staticFrame?: string // Optional static image to show after GIF ends
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'reaction gif',
  autoplay: true,
  maskOpacity: 0.3,
  staticFrame: ''
})

const emit = defineEmits<{
  ended: []
  started: []
}>()

const isPlaying = ref(false)
const hasEnded = ref(false)
let timeout: ReturnType<typeof setTimeout>

function onLoad() {
  if (props.autoplay) {
    start()
  }
}

function start() {
  isPlaying.value = true
  hasEnded.value = false
  emit('started')

  timeout = setTimeout(() => {
    isPlaying.value = false
    hasEnded.value = true
    emit('ended')
  }, props.duration * 1000)
}

function stop() {
  isPlaying.value = false
  hasEnded.value = true
  if (timeout) clearTimeout(timeout)
}

function reset() {
  isPlaying.value = false
  hasEnded.value = false
  if (timeout) clearTimeout(timeout)
}

onMounted(() => {
  // Preload the GIF
  const img = new Image()
  img.src = props.src
})

onUnmounted(() => {
  stop()
})

defineExpose({ start, stop, reset })
</script>

<style scoped>
.gif-hook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Above background, below content */
}

.gif-hook__media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gif-hook__img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Full bleed */
}

.gif-hook__mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, var(--mask-opacity, 0.3));
  pointer-events: none;
}
</style>