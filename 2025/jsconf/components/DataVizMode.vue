<template>
  <div class="data-viz-container">
    <!-- Vertical text bands on sides -->
    <div
      v-if="leftBand"
      class="vertical-band band-left"
      :style="leftBandStyles"
    >
      <div class="band-text">
        <WordBlock
          v-for="(word, index) in leftBand.words"
          :key="`left-${index}`"
          :semantic="leftBand.semantic || 'technical'"
          :scale="leftBand.scale || 'large'"
          :delay="leftBandDelay + (index * 150)"
          direction="bottom"
          class="vertical-text"
        >
          {{ word }}
        </WordBlock>
      </div>
    </div>

    <!-- Main visualization area -->
    <div class="viz-area">
      <slot name="visualization">
        <div
          v-if="chartImage"
          class="chart-container"
        >
          <img
            :src="chartImage"
            :alt="chartAlt || 'Data visualization'"
            class="chart-image"
          />
        </div>
      </slot>

      <!-- Colored annotation callouts -->
      <div
        v-for="(annotation, index) in annotations"
        :key="`annotation-${index}`"
        class="annotation"
        :style="getAnnotationStyles(annotation, index)"
      >
        <div class="annotation-arrow" v-if="annotation.arrow" />
        <div class="annotation-content">
          <WordBlock
            :semantic="annotation.semantic || 'action'"
            :scale="annotation.scale || 'medium'"
            :delay="annotationDelay + (index * 200)"
            :direction="annotation.direction || 'right'"
          >
            {{ annotation.text }}
          </WordBlock>
        </div>
      </div>
    </div>

    <!-- Right vertical band -->
    <div
      v-if="rightBand"
      class="vertical-band band-right"
      :style="rightBandStyles"
    >
      <div class="band-text">
        <WordBlock
          v-for="(word, index) in rightBand.words"
          :key="`right-${index}`"
          :semantic="rightBand.semantic || 'technical'"
          :scale="rightBand.scale || 'large'"
          :delay="rightBandDelay + (index * 150)"
          direction="top"
          class="vertical-text"
        >
          {{ word }}
        </WordBlock>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { inject } from 'vue'
import WordBlock from './WordBlock.vue'

interface VerticalBand {
  words: string[]
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  color?: string
}

interface Annotation {
  text: string
  x?: string | number
  y?: string | number
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
  color?: string
  arrow?: boolean
  arrowDirection?: 'left' | 'right' | 'up' | 'down'
}

interface Props {
  leftBand?: VerticalBand
  rightBand?: VerticalBand
  annotations?: Annotation[]
  chartImage?: string
  chartAlt?: string
  leftBandDelay?: number
  rightBandDelay?: number
  annotationDelay?: number
  bandWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  annotations: () => [],
  leftBandDelay: 0,
  rightBandDelay: 200,
  annotationDelay: 500,
  bandWidth: '120px'
})

const rhythm = inject<any>('kinetic-rhythm', null)

const leftBandStyles = computed(() => ({
  width: props.bandWidth,
  background: props.leftBand?.color || 'linear-gradient(180deg, #ff006e, #ff6b35)'
}))

const rightBandStyles = computed(() => ({
  width: props.bandWidth,
  background: props.rightBand?.color || 'linear-gradient(180deg, #4ecdc4, #44a08d)'
}))

const getAnnotationStyles = (annotation: Annotation, index: number) => {
  const styles: any = {
    '--annotation-color': annotation.color || '#ff006e',
    '--annotation-index': index
  }

  // Handle position presets
  if (annotation.position) {
    const positions: Record<string, any> = {
      'top-left': { top: '10%', left: '10%' },
      'top-right': { top: '10%', right: '10%' },
      'bottom-left': { bottom: '10%', left: '10%' },
      'bottom-right': { bottom: '10%', right: '10%' },
      'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }
    Object.assign(styles, positions[annotation.position])
  } else {
    // Custom positioning
    if (annotation.x !== undefined) {
      styles.left = typeof annotation.x === 'number' ? `${annotation.x}px` : annotation.x
    }
    if (annotation.y !== undefined) {
      styles.top = typeof annotation.y === 'number' ? `${annotation.y}px` : annotation.y
    }
  }

  return styles
}
</script>

<style scoped>
.data-viz-container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  width: 100%;
  height: 100%;
  position: relative;
}

.vertical-band {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.band-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.vertical-text {
  transform: rotate(180deg);
}

.band-left {
  border-right: 2px solid rgba(255, 255, 255, 0.2);
}

.band-right {
  border-left: 2px solid rgba(255, 255, 255, 0.2);
}

.viz-area {
  position: relative;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.annotation {
  position: absolute;
  background: var(--annotation-color);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: annotationPulse 2s ease-in-out infinite;
  animation-delay: calc(var(--annotation-index) * 0.2s);
}

.annotation-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.annotation-arrow::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  background: var(--annotation-color);
  top: -10px;
  left: -20px;
}

.annotation-content {
  position: relative;
  z-index: 1;
}

@keyframes annotationPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Mixed static and dynamic elements */
.static-element {
  transition: none;
}

.dynamic-element {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>