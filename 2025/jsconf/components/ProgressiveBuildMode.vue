<template>
  <div class="progressive-build-container">
    <!-- Static background media -->
    <div class="static-background">
      <slot name="background">
        <img
          v-if="backgroundImage"
          :src="backgroundImage"
          :alt="backgroundAlt"
          class="background-media"
        />
        <video
          v-else-if="backgroundVideo"
          :src="backgroundVideo"
          autoplay
          loop
          muted
          class="background-media"
        />
      </slot>
    </div>

    <!-- Progressive text overlay -->
    <div class="progressive-overlay">
      <TransitionGroup
        name="build"
        tag="div"
        class="text-layers"
      >
        <div
          v-for="(layer, index) in visibleLayers"
          :key="`layer-${index}`"
          class="text-layer"
          :style="getLayerStyles(layer, index)"
        >
          <TypographicScaffold v-if="layer.scaffold">
            <template v-for="(item, itemIndex) in layer.items" :key="`item-${index}-${itemIndex}`">
              <WordBlock
                v-if="!item.dash"
                :semantic="item.semantic || layer.semantic || 'neutral'"
                :scale="item.scale || layer.scale || 'medium'"
                :delay="getItemDelay(index, itemIndex)"
                :direction="item.direction || layer.direction || 'right'"
              >
                {{ item.text }}
              </WordBlock>
              <span v-else class="scaffold-dash">—</span>
            </template>
          </TypographicScaffold>

          <div v-else class="layer-content">
            <WordBlock
              v-if="layer.text"
              :semantic="layer.semantic || 'neutral'"
              :scale="layer.scale || 'medium'"
              :delay="index * layerDelay"
              :direction="layer.direction || 'right'"
            >
              {{ layer.text }}
            </WordBlock>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Controls for manual progression (optional) -->
    <div
      v-if="showControls && !autoPlay"
      class="controls"
    >
      <button
        @click="previousFrame"
        :disabled="currentFrame === 0"
        class="control-button"
      >
        ←
      </button>
      <span class="frame-indicator">
        {{ currentFrame + 1 }} / {{ layers.length }}
      </span>
      <button
        @click="nextFrame"
        :disabled="currentFrame >= layers.length - 1"
        class="control-button"
      >
        →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { inject } from 'vue'
import WordBlock from './WordBlock.vue'
import TypographicScaffold from './TypographicScaffold.vue'

interface LayerItem {
  text?: string
  dash?: boolean
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
}

interface TextLayer {
  text?: string
  items?: LayerItem[]
  scaffold?: boolean
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
  position?: { x?: string; y?: string }
  accumulate?: boolean // Whether this layer stays visible
}

interface Props {
  backgroundImage?: string
  backgroundVideo?: string
  backgroundAlt?: string
  layers: TextLayer[]
  autoPlay?: boolean
  layerDelay?: number
  frameDelay?: number
  showControls?: boolean
  accumulative?: boolean // All layers accumulate by default
}

const props = withDefaults(defineProps<Props>(), {
  backgroundAlt: 'Static background',
  autoPlay: false,
  layerDelay: 200,
  frameDelay: 1500,
  showControls: false,
  accumulative: true
})

const rhythm = inject<any>('kinetic-rhythm', null)
const currentFrame = ref(0)
const isPlaying = ref(false)

const visibleLayers = computed(() => {
  if (props.accumulative) {
    // Show all layers up to current frame
    return props.layers.slice(0, currentFrame.value + 1)
  } else {
    // Only show layers marked to accumulate plus current
    const accumulated = props.layers
      .slice(0, currentFrame.value)
      .filter(layer => layer.accumulate)

    if (currentFrame.value < props.layers.length) {
      accumulated.push(props.layers[currentFrame.value])
    }

    return accumulated
  }
})

const getLayerStyles = (layer: TextLayer, index: number) => {
  const styles: any = {}

  if (layer.position) {
    if (layer.position.x) styles.left = layer.position.x
    if (layer.position.y) styles.top = layer.position.y
  } else {
    // Default positioning based on index
    styles.top = `${20 + (index * 15)}%`
    styles.left = '50%'
    styles.transform = 'translateX(-50%)'
  }

  return styles
}

const getItemDelay = (layerIndex: number, itemIndex: number) => {
  return (layerIndex * props.frameDelay) + (itemIndex * 100)
}

const nextFrame = () => {
  if (currentFrame.value < props.layers.length - 1) {
    currentFrame.value++
  }
}

const previousFrame = () => {
  if (currentFrame.value > 0) {
    currentFrame.value--
  }
}

const play = async () => {
  isPlaying.value = true
  currentFrame.value = 0

  for (let i = 0; i < props.layers.length; i++) {
    currentFrame.value = i
    await new Promise(resolve => setTimeout(resolve, props.frameDelay))
  }

  isPlaying.value = false
}

onMounted(() => {
  if (props.autoPlay) {
    // Use rhythm if available
    if (rhythm?.isPlaying) {
      watch(() => rhythm.beat, (newBeat: number) => {
        if (newBeat < props.layers.length) {
          currentFrame.value = newBeat
        }
      })
    } else {
      play()
    }
  }
})
</script>

<style scoped>
.progressive-build-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.static-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.background-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.progressive-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.text-layers {
  width: 100%;
  height: 100%;
  position: relative;
}

.text-layer {
  position: absolute;
  padding: 1rem;
  pointer-events: auto;
}

.layer-content {
  display: inline-block;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

.scaffold-dash {
  color: rgba(255, 255, 255, 0.6);
  padding: 0 0.5em;
}

/* Build animation */
.build-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.build-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.build-leave-active {
  transition: all 0.3s ease-out;
}

.build-leave-to {
  opacity: 0;
}

/* Controls */
.controls {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  z-index: 10;
}

.control-button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.control-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.control-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.frame-indicator {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}
</style>