<template>
  <div class="label-mode-container" :style="containerStyles">
    <Transition name="label" @enter="onLabelEnter">
      <div v-if="showLabel" class="label-wrapper">
        <WordBlock
          v-if="!characterAnimation"
          :semantic="semantic"
          scale="massive"
          :direction="direction"
          :delay="labelDelay"
        >
          {{ label }}
        </WordBlock>

        <div v-else class="character-animated">
          <span
            v-for="(char, index) in labelCharacters"
            :key="index"
            class="label-character"
            :style="getCharacterStyle(index)"
          >
            {{ char }}
          </span>
        </div>
      </div>
    </Transition>

    <Transition name="content" @enter="onContentEnter">
      <div v-if="showContent" class="label-content" :class="contentClass">
        <slot>
          <component v-if="content" :is="content" v-bind="contentProps" />
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WordBlock from './WordBlock.vue'

interface Props {
  label: string
  semantic?: 'emphasis' | 'technical' | 'action' | 'neutral'
  direction?: 'right' | 'left' | 'top' | 'bottom'
  position?: 'top' | 'center' | 'bottom'
  characterAnimation?: boolean
  content?: any
  contentProps?: Record<string, any>
  contentClass?: string
  labelDelay?: number
  contentDelay?: number
  autoReveal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  semantic: 'neutral',
  direction: 'top',
  position: 'top',
  characterAnimation: false,
  labelDelay: 0,
  contentDelay: 500,
  autoReveal: true
})

const showLabel = ref(false)
const showContent = ref(false)

const labelCharacters = computed(() => props.label.split(''))

const containerStyles = computed(() => ({
  '--label-position':
    props.position === 'top' ? 'flex-start' :
    props.position === 'bottom' ? 'flex-end' : 'center',
  '--content-position':
    props.position === 'top' ? 'flex-end' :
    props.position === 'bottom' ? 'flex-start' : 'center'
}))

const getCharacterStyle = (index: number) => ({
  '--char-index': index,
  '--char-delay': `${props.labelDelay + index * 50}ms`,
  animation: `character-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--char-delay) backwards`
})

const onLabelEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  setTimeout(() => {
    element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    element.style.transform = 'scale(1)'
    element.style.opacity = '1'
    setTimeout(done, 500)
  }, props.labelDelay)
}

const onContentEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  setTimeout(() => {
    element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    element.style.transform = 'scale(1)'
    element.style.opacity = '1'
    setTimeout(done, 500)
  }, props.contentDelay)
}

onMounted(() => {
  if (props.autoReveal) {
    showLabel.value = true
    setTimeout(() => {
      showContent.value = true
    }, props.contentDelay - props.labelDelay)
  }
})

// Public API
const reveal = () => {
  showLabel.value = true
  setTimeout(() => {
    showContent.value = true
  }, props.contentDelay - props.labelDelay)
}

const hide = () => {
  showContent.value = false
  setTimeout(() => {
    showLabel.value = false
  }, 200)
}

defineExpose({ reveal, hide })
</script>

<style scoped>
.label-mode-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: var(--label-position);
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 3rem;
}

.label-wrapper {
  z-index: 10;
  margin-bottom: 2rem;
}

.character-animated {
  display: flex;
  justify-content: center;
  align-items: center;
}

.label-character {
  display: inline-block;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 900;
  color: var(--color-neutral, #fff);
  margin: 0 -0.05em;
  will-change: transform, opacity;
}

@keyframes character-pop {
  from {
    transform: translateY(50px) scale(0);
    opacity: 0;
  }
  50% {
    transform: translateY(-10px) scale(1.1);
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.label-content {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: var(--content-position);
  padding: 2rem;
}

/* Content grid styles */
.label-content.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 2rem;
}

.label-content.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

/* Transitions */
.label-enter-active,
.label-leave-active,
.content-enter-active,
.content-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.label-enter-from {
  transform: scale(0) translateY(-50px);
  opacity: 0;
}

.content-enter-from {
  transform: scale(0.8);
  opacity: 0;
}

.label-leave-to {
  transform: scale(0) translateY(-50px);
  opacity: 0;
}

.content-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>