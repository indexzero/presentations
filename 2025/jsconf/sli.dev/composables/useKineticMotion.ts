import { ref, computed, CSSProperties } from 'vue'

/**
 * Direction mapping from Keynote codes
 */
export const DIRECTIONS = {
  left: { code: 11, x: -800, y: 0 },
  right: { code: 12, x: 800, y: 0 },
  top: { code: 13, x: 0, y: -450 },
  bottom: { code: 14, x: 0, y: 450 }
} as const

export type DirectionName = keyof typeof DIRECTIONS

export interface MotionOptions {
  from?: DirectionName | { x: number; y: number }
  duration?: number
  delay?: number
  dissolve?: boolean
}

/**
 * Composable for kinetic motion animations
 * Clean API inspired by Evan You's design principles
 */
export function useKineticMotion(options: MotionOptions = {}) {
  const {
    from = 'right',
    duration = 500,
    delay = 0,
    dissolve = false
  } = options

  const isActive = ref(false)
  const hasStarted = ref(false)

  // Get starting position
  const startPosition = computed(() => {
    if (typeof from === 'string') {
      return DIRECTIONS[from]
    }
    return { code: 0, ...from }
  })

  // Compute animation styles
  const animationStyles = computed<CSSProperties>(() => {
    if (!hasStarted.value) {
      return {
        opacity: dissolve ? 0 : 1,
        transform: `translate(${startPosition.value.x}px, ${startPosition.value.y}px)`,
        transition: 'none'
      }
    }

    return {
      opacity: 1,
      transform: 'translate(0, 0)',
      transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`
    }
  })

  // CSS classes for GPU optimization
  const motionClasses = computed(() => ({
    'kinetic-motion': true,
    'kinetic-motion--active': isActive.value,
    'kinetic-motion--dissolve': dissolve,
    [`kinetic-motion--from-${typeof from === 'string' ? from : 'custom'}`]: true
  }))

  function trigger() {
    hasStarted.value = false
    // Force reflow for animation reset
    void document.body.offsetHeight
    requestAnimationFrame(() => {
      hasStarted.value = true
      isActive.value = true
      setTimeout(() => {
        isActive.value = false
      }, duration + delay)
    })
  }

  function reset() {
    hasStarted.value = false
    isActive.value = false
  }

  return {
    // State
    isActive,
    hasStarted,
    // Computed
    animationStyles,
    motionClasses,
    // Methods
    trigger,
    reset
  }
}

/**
 * Composable for character-by-character animation
 * Uses CSS custom properties for performance
 */
export function useCharacterAnimation(text: string, duration: number = 400) {
  const characters = ref<string[]>([])
  const isAnimating = ref(false)
  const charDelay = computed(() => duration / text.length)

  function splitText(newText?: string) {
    const targetText = newText || text
    characters.value = targetText.split('')
  }

  function getCharacterStyle(index: number): CSSProperties {
    if (!isAnimating.value) {
      return {
        opacity: 0,
        transform: 'translateY(20px)'
      }
    }

    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: `all 200ms ease-out`,
      transitionDelay: `${index * charDelay.value}ms`
    }
  }

  function trigger() {
    isAnimating.value = false
    requestAnimationFrame(() => {
      isAnimating.value = true
    })
  }

  function reset() {
    isAnimating.value = false
  }

  // Initialize
  splitText()

  return {
    characters,
    isAnimating,
    charDelay,
    splitText,
    getCharacterStyle,
    trigger,
    reset
  }
}