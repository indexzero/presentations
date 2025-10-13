<template>
  <span
    ref="blockRef"
    :class="['word-block', semanticClass, scaleClass]"
    :style="computedStyles"
    v-motion
    :initial="motionInitial"
    :enter="motionEnter"
    :leave="motionLeave"
  >
    <span v-if="typewriter" class="typewriter-text">
      <slot />
    </span>
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import type { KineticContext } from './KineticProvider.vue'

interface Props {
  semantic?: 'emphasis' | 'technical' | 'action' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
  delay?: number
  typewriter?: boolean
  dash?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  semantic: 'neutral',
  scale: 'large',
  direction: 'right',
  delay: 0,
  typewriter: false,
  dash: false
})

const blockRef = ref<HTMLElement>()
const kinetic = inject<KineticContext>('kinetic')

const DIRECTION_OFFSETS = {
  right: { x: 800, y: 0 },
  left: { x: -800, y: 0 },
  bottom: { x: 0, y: 100 },
  top: { x: 0, y: -100 }
}

const semanticClass = computed(() => `semantic-${props.semantic}`)
const scaleClass = computed(() => `scale-${props.scale}`)

const computedStyles = computed(() => ({
  '--delay': `${props.delay}ms`,
  '--typewriter-steps': blockRef.value ? blockRef.value.textContent?.length || 1 : 1
}))

const motionInitial = computed(() => ({
  ...DIRECTION_OFFSETS[props.direction],
  opacity: 0,
  scale: props.semantic === 'emphasis' ? 0.8 : 1
}))

const motionEnter = computed(() => ({
  x: 0,
  y: 0,
  opacity: 1,
  scale: 1,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
    delay: props.delay,
    duration: kinetic?.rhythm || 500
  }
}))

const motionLeave = computed(() => ({
  opacity: 0,
  scale: 0.8,
  transition: {
    duration: 300
  }
}))

onMounted(() => {
  if (kinetic && props.delay > 0) {
    kinetic.registerAnimation(() => {
      if (blockRef.value) {
        blockRef.value.classList.add('animate-in')
      }
    }, props.delay)
  }
})
</script>

<style scoped>
.word-block {
  display: inline-block;
  position: relative;
  transition: color 0.3s ease;
  will-change: transform, opacity;
}

/* Semantic Colors */
.semantic-emphasis {
  color: var(--color-emphasis, #f9c74f);
  font-weight: 900;
}
.semantic-technical {
  color: var(--color-technical, #4ecdc4);
}
.semantic-action {
  color: var(--color-action, #ff006e);
  font-weight: 700;
}
.semantic-neutral {
  color: var(--color-neutral, #ffffff);
}

/* Scale Classes */
.scale-massive {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 0.9;
}

.scale-large {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1;
}

.scale-medium {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 500;
  line-height: 1.2;
}

/* Typewriter Effect */
.typewriter-text {
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  animation: typewriter calc(var(--typewriter-steps) * 50ms) steps(var(--typewriter-steps), end);
}

@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}
</style>