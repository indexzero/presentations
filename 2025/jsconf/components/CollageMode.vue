<template>
  <div class="collage-mode-container">
    <!-- Grid of media items -->
    <div
      class="collage-grid"
      :style="gridStyles"
    >
      <div
        v-for="(item, index) in items"
        :key="`item-${index}`"
        class="collage-item"
        :style="getItemStyles(item)"
      >
        <!-- Media content -->
        <div class="media-wrapper">
          <img
            v-if="item.type === 'image'"
            :src="item.src"
            :alt="item.alt || `Item ${index + 1}`"
            class="media-content"
          />
          <video
            v-else-if="item.type === 'video'"
            :src="item.src"
            autoplay
            loop
            muted
            class="media-content"
          />
          <div
            v-else-if="item.type === 'gif'"
            class="media-content gif-container"
          >
            <img
              :src="item.src"
              :alt="item.alt || `GIF ${index + 1}`"
            />
          </div>
        </div>

        <!-- Overlaid label -->
        <div
          v-if="item.label"
          class="item-label"
          :class="getLabelClass(item)"
        >
          <WordBlock
            :semantic="item.semantic || 'technical'"
            :scale="item.labelScale || 'medium'"
            :delay="baseDelay + (index * itemDelay)"
            :direction="item.labelDirection || 'bottom'"
          >
            {{ item.label }}
          </WordBlock>
        </div>
      </div>
    </div>

    <!-- Optional category labels -->
    <div
      v-if="categories && categories.length"
      class="category-labels"
    >
      <div
        v-for="(category, index) in categories"
        :key="`cat-${index}`"
        class="category-label"
        :style="getCategoryPosition(index)"
      >
        <WordBlock
          :semantic="category.semantic || 'emphasis'"
          :scale="category.scale || 'large'"
          :delay="categoryDelay + (index * 200)"
          direction="right"
        >
          {{ category.text }}
        </WordBlock>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { inject } from 'vue'
import WordBlock from './WordBlock.vue'

interface CollageItem {
  type: 'image' | 'video' | 'gif'
  src: string
  alt?: string
  label?: string
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  labelScale?: 'massive' | 'large' | 'medium'
  labelDirection?: 'right' | 'left' | 'top' | 'bottom'
  labelPosition?: 'overlay' | 'bottom' | 'top'
  span?: number
  row?: number
  column?: number
}

interface Category {
  text: string
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
}

interface Props {
  items: CollageItem[]
  categories?: Category[]
  columns?: number
  rows?: number
  gap?: string
  baseDelay?: number
  itemDelay?: number
  categoryDelay?: number
  gridTemplate?: string
}

const props = withDefaults(defineProps<Props>(), {
  columns: 2,
  rows: 2,
  gap: '1rem',
  baseDelay: 300,
  itemDelay: 150,
  categoryDelay: 0
})

const rhythm = inject<any>('kinetic-rhythm', null)

const gridStyles = computed(() => {
  if (props.gridTemplate) {
    return {
      display: 'grid',
      gridTemplate: props.gridTemplate,
      gap: props.gap
    }
  }

  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gridTemplateRows: `repeat(${props.rows}, 1fr)`,
    gap: props.gap
  }
})

const getItemStyles = (item: CollageItem) => {
  const styles: any = {}

  if (item.span) {
    styles.gridColumn = `span ${item.span}`
  }

  if (item.row && item.column) {
    styles.gridRow = item.row
    styles.gridColumn = item.column
  }

  return styles
}

const getLabelClass = (item: CollageItem) => {
  const position = item.labelPosition || 'overlay'
  return `label-position-${position}`
}

const getCategoryPosition = (index: number) => {
  // Position categories at strategic points around the grid
  const positions = [
    { top: '0', left: '0' },
    { top: '0', right: '0' },
    { bottom: '0', left: '0' },
    { bottom: '0', right: '0' }
  ]

  return {
    position: 'absolute',
    ...positions[index % positions.length]
  }
}
</script>

<style scoped>
.collage-mode-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2rem;
}

.collage-grid {
  width: 100%;
  height: 100%;
}

.collage-item {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
}

.media-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.media-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gif-container {
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gif-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-label {
  position: absolute;
  padding: 0.5rem 1rem;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.6)
  );
}

.label-position-overlay {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.label-position-bottom {
  bottom: 0;
  left: 0;
  right: 0;
}

.label-position-top {
  top: 0;
  left: 0;
  right: 0;
}

.category-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.category-label {
  padding: 1rem;
  z-index: 10;
}
</style>