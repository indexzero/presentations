import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

/**
 * Core timeline constants matching the Keynote choreography
 */
export const MOTION_DURATION = 500 // 0.5s heartbeat
export const CHAR_DURATION = 400  // 0.4s for character animations
export const TRANSITION_DURATION = 750 // 0.75s for slide transitions

export interface TimelineEvent {
  id: string
  startTime: number
  duration: number
  type: 'gif' | 'text' | 'character' | 'transition'
  onStart?: () => void
  onComplete?: () => void
}

/**
 * Composable for managing animation timeline
 * Inspired by Evan You's clean composition patterns
 */
export function useTimeline() {
  const events = reactive<TimelineEvent[]>([])
  const currentTime = ref(0)
  const isPlaying = ref(false)
  const startTime = ref(0)
  let animationFrame: number | null = null

  const totalDuration = computed(() => {
    if (events.length === 0) return 0
    const lastEvent = events[events.length - 1]
    return lastEvent.startTime + lastEvent.duration
  })

  const activeEvents = computed(() => {
    return events.filter(event => {
      const eventEnd = event.startTime + event.duration
      return currentTime.value >= event.startTime && currentTime.value < eventEnd
    })
  })

  function addEvent(event: Omit<TimelineEvent, 'id'>) {
    const id = `event-${Date.now()}-${Math.random()}`
    events.push({ ...event, id })
    return id
  }

  function addSequentialEvent(
    type: TimelineEvent['type'],
    duration: number = MOTION_DURATION,
    callbacks?: Pick<TimelineEvent, 'onStart' | 'onComplete'>
  ) {
    const lastEvent = events[events.length - 1]
    const startTime = lastEvent ? lastEvent.startTime + lastEvent.duration : 0
    return addEvent({
      startTime,
      duration,
      type,
      ...callbacks
    })
  }

  function play() {
    if (isPlaying.value) return

    isPlaying.value = true
    startTime.value = performance.now() - currentTime.value

    const tick = () => {
      if (!isPlaying.value) return

      const now = performance.now()
      const elapsed = now - startTime.value
      const previousTime = currentTime.value
      currentTime.value = elapsed

      // Trigger event callbacks
      events.forEach(event => {
        const wasActive = previousTime >= event.startTime && previousTime < event.startTime + event.duration
        const isActive = elapsed >= event.startTime && elapsed < event.startTime + event.duration

        if (!wasActive && isActive && event.onStart) {
          event.onStart()
        }

        if (wasActive && !isActive && event.onComplete) {
          event.onComplete()
        }
      })

      if (elapsed < totalDuration.value) {
        animationFrame = requestAnimationFrame(tick)
      } else {
        pause()
        currentTime.value = totalDuration.value
      }
    }

    animationFrame = requestAnimationFrame(tick)
  }

  function pause() {
    isPlaying.value = false
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
  }

  function reset() {
    pause()
    currentTime.value = 0
    events.length = 0
  }

  function seek(time: number) {
    currentTime.value = Math.max(0, Math.min(time, totalDuration.value))
    if (isPlaying.value) {
      startTime.value = performance.now() - currentTime.value
    }
  }

  onUnmounted(() => {
    pause()
  })

  return {
    // State
    events,
    currentTime,
    isPlaying,
    totalDuration,
    activeEvents,
    // Methods
    addEvent,
    addSequentialEvent,
    play,
    pause,
    reset,
    seek
  }
}