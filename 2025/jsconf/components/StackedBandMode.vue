<template>
  <div class="stacked-band-container">
    <TransitionGroup
      name="band-stack"
      tag="div"
      class="band-stack"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
    >
      <div
        v-for="(band, index) in bands"
        :key="`band-${index}`"
        :class="['message-band', getBandClass(band)]"
        :style="getBandStyles(band)"
        :data-index="index"
      >
        <div class="band-inner">
          <WordBlock
            v-if="band.text"
            :semantic="band.semantic"
            :scale="band.scale"
            :delay="baseDelay + (index * bandDelay)"
            :direction="band.direction || 'right'"
          >
            {{ band.text }}
          </WordBlock>

          <div v-else-if="band.blocks" class="band-blocks">
            <template v-for="(block, blockIndex) in band.blocks" :key="`block-${index}-${blockIndex}`">
              <WordBlock
                v-if="!block.dash"
                :semantic="block.semantic || band.semantic || 'neutral'"
                :scale="block.scale || band.scale || 'large'"
                :delay="baseDelay + (index * bandDelay) + (blockIndex * 100)"
                :direction="block.direction || band.direction || 'right'"
              >
                {{ block.text }}
              </WordBlock>
              <span v-else class="scaffold-dash">—</span>
            </template>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { inject } from 'vue'
import WordBlock from './WordBlock.vue'

interface TextBlock {
  text?: string
  dash?: boolean
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
}

interface MessageBand {
  text?: string
  blocks?: TextBlock[]
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
  color?: string
  background?: string
  padding?: string
}

interface Props {
  bands: MessageBand[]
  progressive?: boolean
  baseDelay?: number
  bandDelay?: number
  gap?: string
}

const props = withDefaults(defineProps<Props>(), {
  progressive: true,
  baseDelay: 0,
  bandDelay: 300,
  gap: '0'
})

const rhythm = inject<any>('kinetic-rhythm', null)

const getBandClass = (band: MessageBand) => {
  const classes = []

  if (band.semantic) {
    classes.push(`band-semantic-${band.semantic}`)
  }

  if (band.scale === 'massive') {
    classes.push('band-massive')
  }

  return classes.join(' ')
}

const getBandStyles = (band: MessageBand) => {
  const styles: any = {}

  if (band.background) {
    styles.background = band.background
  } else if (band.color) {
    styles.backgroundColor = band.color
  }

  if (band.padding) {
    styles.padding = band.padding
  }

  return styles
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

  if (props.progressive) {
    setTimeout(() => {
      element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      element.style.transform = 'translateY(0)'
      element.style.opacity = '1'
      done()
    }, index * props.bandDelay)
  } else {
    done()
  }
}
</script>

<style scoped>
.stacked-band-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.band-stack {
  display: flex;
  flex-direction: column;
  gap: v-bind(gap);
}

.message-band {
  width: 100%;
  padding: 1.5rem 2rem;
  position: relative;
  overflow: hidden;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.band-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.band-blocks {
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.scaffold-dash {
  color: rgba(255, 255, 255, 0.4);
  padding: 0 0.25em;
}

/* Semantic color backgrounds */
.band-semantic-emphasis {
  background: linear-gradient(90deg, #f9c74f, #f8961e);
}

.band-semantic-technical {
  background: linear-gradient(90deg, #4ecdc4, #44a08d);
}

.band-semantic-action {
  background: linear-gradient(90deg, #ff006e, #c9184a);
}

.band-semantic-urgent {
  background: linear-gradient(90deg, #ff6b35, #f77b1c);
}

.band-semantic-neutral {
  background: rgba(255, 255, 255, 0.05);
}

/* Special styling for massive bands */
.band-massive {
  padding: 2rem 3rem;
  min-height: 120px;
}

/* Progressive reveal animation */
.band-stack-enter-active,
.band-stack-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.band-stack-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.band-stack-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Distinct message emphasis */
.message-band::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: currentColor;
  opacity: 0.6;
}
</style>