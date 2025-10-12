<template>
  <div class="sandwich-mode-container">
    <Transition name="band-top" @enter="onTopEnter">
      <div v-if="showTop" class="sandwich-top" :class="topClass">
        <CompressionZone pressure="high" :show-boundaries="false">
          <TypographicScaffold v-if="top.scaffold">
            <WordBlock
              v-for="(block, index) in top.blocks"
              :key="index"
              :semantic="block.semantic"
              :scale="block.scale || top.scale"
              :direction="block.direction || 'right'"
              :delay="topDelay + index * 100"
            >
              {{ block.text }}
            </WordBlock>
          </TypographicScaffold>
          <div v-else class="sandwich-text">{{ top.text }}</div>
        </CompressionZone>
      </div>
    </Transition>

    <div
      ref="contentRef"
      class="sandwich-content"
      :style="contentStyles"
    >
      <slot>
        <component v-if="content" :is="content" v-bind="contentProps" />
      </slot>
    </div>

    <Transition name="band-bottom" @enter="onBottomEnter">
      <div v-if="showBottom" class="sandwich-bottom" :class="bottomClass">
        <CompressionZone pressure="high" :show-boundaries="false">
          <TypographicScaffold v-if="bottom.scaffold">
            <WordBlock
              v-for="(block, index) in bottom.blocks"
              :key="index"
              :semantic="block.semantic"
              :scale="block.scale || bottom.scale"
              :direction="block.direction || 'bottom'"
              :delay="bottomDelay + index * 100"
            >
              {{ block.text }}
            </WordBlock>
          </TypographicScaffold>
          <div v-else class="sandwich-text">{{ bottom.text }}</div>
        </CompressionZone>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue'
import WordBlock from './WordBlock.vue'
import CompressionZone from './CompressionZone.vue'
import TypographicScaffold from './TypographicScaffold.vue'
import type { KineticContext } from './KineticProvider.vue'

interface TextBand {
  text?: string
  blocks?: Array<{
    text: string
    semantic?: 'emphasis' | 'technical' | 'action' | 'neutral'
    scale?: 'massive' | 'large' | 'medium'
    direction?: 'right' | 'left' | 'top' | 'bottom'
  }>
  scaffold?: boolean
  scale?: 'massive' | 'large' | 'medium'
  class?: string
}

interface Props {
  top: TextBand
  bottom: TextBand
  content?: any
  contentProps?: Record<string, any>
  contentHeight?: string
  topDelay?: number
  bottomDelay?: number
  autoReveal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  contentHeight: '60%',
  topDelay: 0,
  bottomDelay: 500,
  autoReveal: true
})

const kinetic = inject<KineticContext>('kinetic')
const contentRef = ref<HTMLElement>()
const showTop = ref(false)
const showBottom = ref(false)

const topClass = computed(() => props.top.class || 'band-green')
const bottomClass = computed(() => props.bottom.class || 'band-green')

const contentStyles = computed(() => ({
  '--content-height': props.contentHeight
}))

const onTopEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  setTimeout(() => {
    element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    element.style.transform = 'translateY(0)'
    element.style.opacity = '1'
    setTimeout(done, 500)
  }, props.topDelay)
}

const onBottomEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  setTimeout(() => {
    element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    element.style.transform = 'translateY(0)'
    element.style.opacity = '1'
    setTimeout(done, 500)
  }, props.bottomDelay)
}

onMounted(() => {
  if (props.autoReveal) {
    showTop.value = true
    setTimeout(() => {
      showBottom.value = true
    }, props.bottomDelay - props.topDelay)
  }

  if (kinetic && kinetic.autoStart) {
    kinetic.startSequence()
  }
})

// Public API for manual control
const reveal = () => {
  showTop.value = true
  setTimeout(() => {
    showBottom.value = true
  }, props.bottomDelay - props.topDelay)
}

const hide = () => {
  showBottom.value = false
  setTimeout(() => {
    showTop.value = false
  }, 200)
}

defineExpose({ reveal, hide })
</script>

<style scoped>
.sandwich-mode-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}

.sandwich-top,
.sandwich-bottom {
  width: 100%;
  padding: 1.5rem 2rem;
  position: relative;
  z-index: 10;
}

.sandwich-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: var(--content-height);
  padding: 2rem;
  position: relative;
  z-index: 5;
}

.sandwich-text {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  text-align: center;
  width: 100%;
}

/* Band color classes */
.band-green {
  background: var(--color-technical, #4ecdc4);
  color: #000;
}

.band-pink {
  background: var(--color-action, #ff006e);
}

.band-yellow {
  background: var(--color-emphasis, #f9c74f);
  color: #000;
}

.band-dark {
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Transitions */
.band-top-enter-active,
.band-top-leave-active,
.band-bottom-enter-active,
.band-bottom-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.band-top-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.band-bottom-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.band-top-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.band-bottom-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>