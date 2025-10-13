<template>
  <div class="mixed-media-container">
    <!-- Dynamic layout grid -->
    <div
      class="media-layout"
      :style="layoutStyles"
    >
      <div
        v-for="(element, index) in elements"
        :key="`element-${index}`"
        :class="['layout-element', getElementClass(element)]"
        :style="getElementStyles(element, index)"
      >
        <!-- Media elements -->
        <div v-if="element.type === 'media'" class="media-element">
          <img
            v-if="element.mediaType === 'image'"
            :src="element.src"
            :alt="element.alt || `Media ${index + 1}`"
            class="media-content"
          />
          <video
            v-else-if="element.mediaType === 'video'"
            :src="element.src"
            autoplay
            loop
            muted
            class="media-content"
          />
          <div
            v-else-if="element.mediaType === 'diagram'"
            class="diagram-content"
          >
            <slot :name="`diagram-${index}`">
              <img
                :src="element.src"
                :alt="element.alt || `Diagram ${index + 1}`"
              />
            </slot>
          </div>
        </div>

        <!-- Text connectors -->
        <div v-else-if="element.type === 'connector'" class="text-connector">
          <div class="connector-line" v-if="element.showLine" />
          <WordBlock
            :semantic="element.semantic || 'neutral'"
            :scale="element.scale || 'medium'"
            :delay="baseDelay + (index * elementDelay)"
            :direction="element.direction || getConnectorDirection(element)"
          >
            {{ element.text }}
          </WordBlock>
          <div class="connector-arrow" v-if="element.arrow" />
        </div>

        <!-- Central content area -->
        <div v-else-if="element.type === 'central'" class="central-content">
          <slot name="central">
            <div v-if="element.blocks" class="content-blocks">
              <WordBlock
                v-for="(block, blockIndex) in element.blocks"
                :key="`block-${blockIndex}`"
                :semantic="block.semantic || 'emphasis'"
                :scale="block.scale || 'large'"
                :delay="centralDelay + (blockIndex * 150)"
                direction="bottom"
              >
                {{ block.text }}
              </WordBlock>
            </div>
          </slot>
        </div>
      </div>
    </div>

    <!-- Non-linear reading paths indicators -->
    <svg
      v-if="showPaths"
      class="reading-paths"
      :viewBox="`0 0 ${viewportWidth} ${viewportHeight}`"
    >
      <path
        v-for="(path, index) in readingPaths"
        :key="`path-${index}`"
        :d="path.d"
        :stroke="path.color || '#4ecdc4'"
        stroke-width="2"
        fill="none"
        :stroke-dasharray="path.dash || '5,5'"
        :opacity="path.opacity || 0.3"
        class="reading-path"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { inject } from 'vue'
import WordBlock from './WordBlock.vue'

interface TextBlock {
  text: string
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
}

interface LayoutElement {
  type: 'media' | 'connector' | 'central'
  // For media elements
  mediaType?: 'image' | 'video' | 'diagram'
  src?: string
  alt?: string
  // For connector elements
  text?: string
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
  showLine?: boolean
  arrow?: boolean
  // For central content
  blocks?: TextBlock[]
  // Positioning
  gridArea?: string
  position?: { row?: number; column?: number; span?: number }
}

interface ReadingPath {
  d: string // SVG path data
  color?: string
  dash?: string
  opacity?: number
}

interface Props {
  elements: LayoutElement[]
  layout?: 'flow' | 'grid' | 'circular' | 'custom'
  gridTemplate?: string
  baseDelay?: number
  elementDelay?: number
  centralDelay?: number
  showPaths?: boolean
  readingPaths?: ReadingPath[]
  viewportWidth?: number
  viewportHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'flow',
  baseDelay: 0,
  elementDelay: 200,
  centralDelay: 1000,
  showPaths: false,
  readingPaths: () => [],
  viewportWidth: 1920,
  viewportHeight: 1080
})

const rhythm = inject<any>('kinetic-rhythm', null)

const layoutStyles = computed(() => {
  if (props.layout === 'custom' && props.gridTemplate) {
    return {
      display: 'grid',
      gridTemplate: props.gridTemplate
    }
  }

  const layouts: Record<string, any> = {
    flow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      alignItems: 'center',
      justifyContent: 'center'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    circular: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  return layouts[props.layout] || layouts.flow
})

const getElementClass = (element: LayoutElement) => {
  return `element-type-${element.type}`
}

const getElementStyles = (element: LayoutElement, index: number) => {
  const styles: any = {}

  if (element.gridArea) {
    styles.gridArea = element.gridArea
  }

  if (element.position) {
    if (element.position.row) styles.gridRow = element.position.row
    if (element.position.column) styles.gridColumn = element.position.column
    if (element.position.span) styles.gridColumn = `span ${element.position.span}`
  }

  // Circular layout positioning
  if (props.layout === 'circular' && element.type !== 'central') {
    const angle = (index * 360) / (props.elements.length - 1)
    const radius = 300
    const x = Math.cos((angle * Math.PI) / 180) * radius
    const y = Math.sin((angle * Math.PI) / 180) * radius

    styles.position = 'absolute'
    styles.transform = `translate(${x}px, ${y}px)`
  }

  return styles
}

const getConnectorDirection = (element: LayoutElement): 'right' | 'left' | 'top' | 'bottom' => {
  // Auto-detect best direction based on position
  // This is a simplified version; could be more sophisticated
  return element.direction || 'right'
}
</script>

<style scoped>
.mixed-media-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2rem;
  overflow: hidden;
}

.media-layout {
  width: 100%;
  height: 100%;
  position: relative;
}

.layout-element {
  position: relative;
}

/* Media elements */
.media-element {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.media-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.diagram-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.diagram-content img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* Text connectors */
.text-connector {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.connector-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
}

.connector-arrow {
  width: 0;
  height: 0;
  border-left: 8px solid rgba(255, 255, 255, 0.5);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

/* Central content */
.central-content {
  padding: 2rem;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.8),
    transparent
  );
  border-radius: 1rem;
  z-index: 3;
}

.content-blocks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
}

/* Non-linear reading paths */
.reading-paths {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.reading-path {
  animation: pathPulse 3s ease-in-out infinite;
}

@keyframes pathPulse {
  0%, 100% {
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dashoffset: 10;
  }
}

/* Multiple focal points */
.element-type-media {
  transition: transform 0.3s ease-out;
}

.element-type-media:hover {
  transform: scale(1.05);
  z-index: 10;
}

.element-type-central {
  animation: centralPulse 2s ease-in-out infinite;
}

@keyframes centralPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
</style>