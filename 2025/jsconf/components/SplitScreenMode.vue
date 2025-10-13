<template>
  <div class="split-screen-container">
    <!-- Left panel -->
    <div class="panel panel-left" :style="leftPanelStyles">
      <slot name="left">
        <div
          v-if="leftContent"
          class="panel-content"
        >
          <img
            v-if="leftContent.type === 'image'"
            :src="leftContent.src"
            :alt="leftContent.alt || 'Left content'"
            class="media-content"
          />
          <video
            v-else-if="leftContent.type === 'video'"
            :src="leftContent.src"
            autoplay
            loop
            muted
            class="media-content"
          />
          <div
            v-else-if="leftContent.type === 'text'"
            class="text-content"
          >
            <WordBlock
              v-for="(block, index) in leftContent.blocks"
              :key="`left-${index}`"
              :semantic="block.semantic || 'neutral'"
              :scale="block.scale || 'medium'"
              :delay="leftDelay + (index * 200)"
              direction="right"
            >
              {{ block.text }}
            </WordBlock>
          </div>
        </div>
      </slot>
    </div>

    <!-- Central dividing band (optional) -->
    <div
      v-if="centerBand"
      class="center-band"
      :style="centerBandStyles"
    >
      <div class="band-content">
        <WordBlock
          v-for="(line, index) in centerBand.lines"
          :key="`center-${index}`"
          :semantic="centerBand.semantic || 'emphasis'"
          :scale="centerBand.scale || 'large'"
          :delay="centerDelay + (index * 300)"
          :direction="centerBand.direction || 'bottom'"
          class="band-line"
        >
          {{ line }}
        </WordBlock>
      </div>
    </div>

    <!-- Right panel -->
    <div class="panel panel-right" :style="rightPanelStyles">
      <slot name="right">
        <div
          v-if="rightContent"
          class="panel-content"
        >
          <img
            v-if="rightContent.type === 'image'"
            :src="rightContent.src"
            :alt="rightContent.alt || 'Right content'"
            class="media-content"
          />
          <video
            v-else-if="rightContent.type === 'video'"
            :src="rightContent.src"
            autoplay
            loop
            muted
            class="media-content"
          />
          <div
            v-else-if="rightContent.type === 'text'"
            class="text-content"
          >
            <WordBlock
              v-for="(block, index) in rightContent.blocks"
              :key="`right-${index}`"
              :semantic="block.semantic || 'neutral'"
              :scale="block.scale || 'medium'"
              :delay="rightDelay + (index * 200)"
              direction="left"
            >
              {{ block.text }}
            </WordBlock>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { inject } from 'vue'
import WordBlock from './WordBlock.vue'

interface TextBlock {
  text: string
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
}

interface PanelContent {
  type: 'image' | 'video' | 'text'
  src?: string
  alt?: string
  blocks?: TextBlock[]
}

interface CenterBand {
  lines: string[]
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
  color?: string
}

interface Props {
  leftContent?: PanelContent
  rightContent?: PanelContent
  centerBand?: CenterBand
  split?: 'even' | 'left-heavy' | 'right-heavy' | 'custom'
  leftWidth?: string
  rightWidth?: string
  centerWidth?: string
  leftDelay?: number
  centerDelay?: number
  rightDelay?: number
  gap?: string
}

const props = withDefaults(defineProps<Props>(), {
  split: 'even',
  leftWidth: '1fr',
  rightWidth: '1fr',
  centerWidth: 'auto',
  leftDelay: 0,
  centerDelay: 500,
  rightDelay: 1000,
  gap: '0'
})

const rhythm = inject<any>('kinetic-rhythm', null)

const gridTemplate = computed(() => {
  if (props.split === 'custom') {
    return props.centerBand
      ? `${props.leftWidth} ${props.centerWidth} ${props.rightWidth}`
      : `${props.leftWidth} ${props.rightWidth}`
  }

  const splits = {
    'even': props.centerBand ? '1fr auto 1fr' : '1fr 1fr',
    'left-heavy': props.centerBand ? '2fr auto 1fr' : '2fr 1fr',
    'right-heavy': props.centerBand ? '1fr auto 2fr' : '1fr 2fr'
  }

  return splits[props.split]
})

const leftPanelStyles = computed(() => ({
  gridColumn: 1
}))

const centerBandStyles = computed(() => ({
  gridColumn: 2,
  background: props.centerBand?.color || 'linear-gradient(90deg, rgba(0,0,0,0.9), rgba(0,0,0,0.9))'
}))

const rightPanelStyles = computed(() => ({
  gridColumn: props.centerBand ? 3 : 2
}))
</script>

<style scoped>
.split-screen-container {
  display: grid;
  grid-template-columns: v-bind(gridTemplate);
  gap: v-bind(gap);
  width: 100%;
  height: 100%;
  position: relative;
}

.panel {
  position: relative;
  overflow: hidden;
}

.panel-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.center-band {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  position: relative;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.band-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.band-line {
  white-space: nowrap;
}

/* Asymmetric balance styles */
.panel-left {
  animation: slideFromLeft 0.5s ease-out;
}

.panel-right {
  animation: slideFromRight 0.5s ease-out;
}

@keyframes slideFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>