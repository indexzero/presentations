<template>
  <div class="band-mode-container">
    <TransitionGroup
      name="band"
      tag="div"
      class="bands"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
    >
      <div
        v-for="(band, index) in bands"
        :key="band.id || index"
        :class="['band', band.color]"
        :data-index="index"
        :style="{ '--band-color': band.customColor }"
      >
        <!-- Scaffold mode with blocks -->
        <div v-if="band.scaffold && band.blocks" class="band-scaffold">
          <template v-for="(block, blockIndex) in band.blocks" :key="blockIndex">
            <WordBlock
              v-if="block.text"
              :semantic="block.semantic"
              :scale="block.scale || band.scale"
              :direction="block.direction || 'right'"
              :delay="calculateDelay(index, blockIndex)"
              :typewriter="block.typewriter"
            >
              {{ block.text }}
            </WordBlock>
            <span v-if="block.dash" class="scaffold-dash">—</span>
          </template>
        </div>

        <!-- Custom content mode -->
        <div v-else-if="band.content" class="band-content">
          <component :is="band.content" v-bind="band.props" />
        </div>

        <!-- Simple text mode -->
        <div v-else class="band-text">
          {{ band.text }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import WordBlock from './WordBlock.vue'

export interface Band {
  id?: string
  text?: string
  blocks?: Array<{
    text: string
    semantic?: 'emphasis' | 'technical' | 'action' | 'neutral'
    scale?: 'massive' | 'large' | 'medium'
    direction?: 'right' | 'left' | 'top' | 'bottom'
    typewriter?: boolean
    dash?: boolean
  }>
  scaffold?: boolean
  color?: string
  customColor?: string
  pressure?: 'low' | 'medium' | 'high'
  scale?: 'massive' | 'large' | 'medium'
  content?: any
  props?: Record<string, any>
}

interface Props {
  bands: Band[]
  progressive?: boolean
  baseDelay?: number
  bandDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  progressive: true,
  baseDelay: 0,
  bandDelay: 200 // ms between bands
})

// Kinetic context removed - no longer needed

const calculateDelay = (bandIndex: number, blockIndex: number) => {
  if (!props.progressive) return props.baseDelay
  const bandOffset = bandIndex * props.bandDelay
  const blockOffset = blockIndex * 100 // 100ms between blocks
  return props.baseDelay + bandOffset + blockOffset
}

const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  if (props.progressive) {
    element.style.transform = 'translateY(100%)'
    element.style.opacity = '0'
  }
}

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  const index = parseInt(element.dataset.index || '0')

  if (!props.progressive) {
    done()
    return
  }

  setTimeout(() => {
    element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    element.style.transform = 'translateY(0)'
    element.style.opacity = '1'

    setTimeout(done, 500)
  }, index * props.bandDelay)
}
</script>

<style scoped>
.band-mode-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.bands {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.band {
  position: relative;
  width: 100%;
  padding: 2rem 3rem;
  background: var(--band-color, transparent);
  will-change: transform, opacity;
}

/* Band Color Classes */
.band.purple {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.band.pink {
  background: var(--color-action, #ff006e);
}

.band.yellow {
  background: var(--color-emphasis, #f9c74f);
  color: #000;
}

.band.cyan {
  background: var(--color-technical, #4ecdc4);
  color: #000;
}

.band.dark {
  background: rgba(0, 0, 0, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.band-scaffold {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.scaffold-dash {
  font-size: 2rem;
  opacity: 0.5;
}

.band-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.band-text {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
}

/* Band transition */
.band-enter-active,
.band-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.band-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.band-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>