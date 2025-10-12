import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface KineticOptions {
  rhythm?: number // milliseconds
  autoStart?: boolean
  onBeat?: (beat: number) => void
}

export function useKineticRhythm(options: KineticOptions = {}) {
  const {
    rhythm = 500,
    autoStart = false,
    onBeat
  } = options

  const beat = ref(0)
  const isPlaying = ref(false)
  const startTime = ref<number | null>(null)
  let animationId: number | null = null

  const elapsedTime = computed(() => {
    if (!startTime.value) return 0
    return Date.now() - startTime.value
  })

  const currentPhase = computed(() => {
    if (!isPlaying.value) return 'idle'
    const phase = beat.value % 4
    return ['downbeat', 'weak', 'medium', 'weak'][phase]
  })

  const nextBeatIn = computed(() => {
    if (!isPlaying.value) return rhythm
    const elapsed = elapsedTime.value % rhythm
    return rhythm - elapsed
  })

  const tick = () => {
    if (!isPlaying.value) return

    const now = Date.now()
    if (!startTime.value) startTime.value = now

    const elapsed = now - startTime.value
    const newBeat = Math.floor(elapsed / rhythm)

    if (newBeat > beat.value) {
      beat.value = newBeat
      onBeat?.(newBeat)
    }

    animationId = requestAnimationFrame(tick)
  }

  const start = () => {
    if (isPlaying.value) return
    isPlaying.value = true
    startTime.value = Date.now()
    tick()
  }

  const stop = () => {
    isPlaying.value = false
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  const reset = () => {
    stop()
    beat.value = 0
    startTime.value = null
  }

  const syncTo = (targetBeat: number) => {
    beat.value = targetBeat
    startTime.value = Date.now() - (targetBeat * rhythm)
  }

  onMounted(() => {
    if (autoStart) {
      start()
    }
  })

  onUnmounted(() => {
    stop()
  })

  return {
    beat,
    isPlaying,
    currentPhase,
    nextBeatIn,
    elapsedTime,
    start,
    stop,
    reset,
    syncTo
  }
}