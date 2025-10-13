<template>
  <component
    :is="tag"
    class="k-text"
    :class="[colorClass, sizeClass, { 'k-compressed': compressed }]"
    v-motion
    :initial="initial"
    :enter="enter"
  >
    <!-- Single line mode -->
    <template v-if="!lines">
      <slot />
    </template>

    <!-- Multi-line mode with :lines prop -->
    <template v-else>
      <div v-for="(line, index) in lines" :key="index"
        class="k-text-line"
        :class="[getLineColorClass(line), getLineSizeClass(line)]"
        v-motion
        :initial="getLineInitial()"
        :enter="getLineEnter(index)"
      >
        <template v-if="line.dash">
          <span class="k-dash">{{ line.dash }}</span>
        </template>
        {{ line.text }}
        <template v-if="line.dashAfter">
          <span class="k-dash">{{ line.dashAfter }}</span>
        </template>
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Line {
  text: string
  color?: string
  size?: string
  compressed?: boolean
  dash?: string
  dashAfter?: string
}

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
  },
  lines: {
    type: Array as () => Line[],
    default: null
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

// Helper functions for multi-line mode
const getLineColorClass = (line: Line) => line.color ? `k-${line.color}` : colorClass.value
const getLineSizeClass = (line: Line) => line.size ? `k-${line.size}` : sizeClass.value

const getLineInitial = () => initial.value

const getLineEnter = (index: number) => ({
  opacity: 1,
  x: 0,
  y: 0,
  transition: {
    delay: props.delay + (index * 200),
    duration: 500,
    type: 'spring',
    stiffness: 250,
    damping: 25
  }
})
</script>