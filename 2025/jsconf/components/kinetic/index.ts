// Export all kinetic typography components
export { default as GifHook } from './GifHook.vue'
export { default as KineticText } from './KineticText.vue'
export { default as TypewriterText } from './TypewriterText.vue'

// Re-export composables for convenience
export { useKineticMotion, DIRECTIONS, type DirectionName } from '../../composables/useKineticMotion'
export { useTimeline, MOTION_DURATION, CHAR_DURATION, TRANSITION_DURATION } from '../../composables/useTimeline'