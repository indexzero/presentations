<template>
  <div class="overlay-mode-container">
    <!-- Background media -->
    <div class="overlay-background">
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

    <!-- Overlay text with optional scaffolding -->
    <div
      class="overlay-content"
      :style="contentStyles"
    >
      <TypographicScaffold v-if="scaffold">
        <template v-for="(block, index) in textBlocks" :key="`block-${index}`">
          <WordBlock
            v-if="!block.dash"
            :semantic="block.semantic || 'neutral'"
            :scale="block.scale || scale"
            :delay="baseDelay + (index * blockDelay)"
            :direction="block.direction || direction"
          >
            {{ block.text }}
          </WordBlock>
          <span v-else class="scaffold-dash">—</span>
        </template>
      </TypographicScaffold>

      <div v-else class="overlay-text">
        <slot>
          <WordBlock
            v-for="(block, index) in textBlocks"
            :key="`text-${index}`"
            :semantic="block.semantic || 'neutral'"
            :scale="block.scale || scale"
            :delay="baseDelay + (index * blockDelay)"
            :direction="block.direction || direction"
          >
            {{ block.text }}
          </WordBlock>
        </slot>
      </div>
    </div>

    <!-- Optional semi-transparent background for legibility -->
    <div
      v-if="overlay"
      class="overlay-scrim"
      :style="scrimStyles"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { inject } from 'vue'
import WordBlock from './WordBlock.vue'
import TypographicScaffold from './TypographicScaffold.vue'

interface TextBlock {
  text?: string
  dash?: boolean
  semantic?: 'emphasis' | 'technical' | 'action' | 'urgent' | 'neutral'
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
}

interface Props {
  backgroundImage?: string
  backgroundVideo?: string
  backgroundAlt?: string
  textBlocks?: TextBlock[]
  scaffold?: boolean
  scale?: 'massive' | 'large' | 'medium'
  direction?: 'right' | 'left' | 'top' | 'bottom'
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
  overlay?: boolean
  overlayOpacity?: number
  baseDelay?: number
  blockDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  backgroundAlt: 'Background media',
  textBlocks: () => [],
  scaffold: false,
  scale: 'large',
  direction: 'right',
  position: 'center',
  overlay: true,
  overlayOpacity: 0.3,
  baseDelay: 500,
  blockDelay: 200
})

const rhythm = inject<any>('kinetic-rhythm', null)

const contentStyles = computed(() => {
  const positions: Record<string, any> = {
    center: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    top: {
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    bottom: {
      bottom: '10%',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    left: {
      top: '50%',
      left: '10%',
      transform: 'translateY(-50%)'
    },
    right: {
      top: '50%',
      right: '10%',
      transform: 'translateY(-50%)'
    }
  }

  return positions[props.position]
})

const scrimStyles = computed(() => ({
  opacity: props.overlayOpacity
}))
</script>

<style scoped>
.overlay-mode-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.overlay-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.background-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.6)
  );
  z-index: 2;
}

.overlay-content {
  position: absolute;
  z-index: 3;
  max-width: 90%;
  text-align: center;
}

.overlay-text {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  justify-content: center;
  align-items: center;
}
</style>