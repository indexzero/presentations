<template>
  <div class="kinetic-slide" :class="slideClasses" :data-timing="spec.timing || 'normal'">
    <!-- Background Layer -->
    <div class="k-background" v-if="spec.background">
      <div class="k-background-image" :style="backgroundStyle" />
      <div class="k-background-overlay" :style="overlayStyle" />
    </div>

    <!-- Content Layer -->
    <div class="k-content">
      <template v-for="(section, sectionIdx) in spec.sections" :key="sectionIdx">

        <!-- Overlay Section (text over background) -->
        <div v-if="section.type === 'overlay'" class="k-overlay-section">
          <div v-for="(line, lineIdx) in section.lines" :key="lineIdx"
               class="k-line"
               :class="getLineClasses(line)"
               :style="getAnimationStyle(lineIdx, 0)"
               :data-role="line.role"
               :data-color="line.color">

            <!-- Left Wing (scaffolding) -->
            <span v-if="line.wings"
                  class="k-wing k-wing-left"
                  :class="`k-wing-${line.wings}`" />

            <!-- Main Text -->
            <span class="k-text-content">
              <template v-if="line.prefix">
                <span class="k-prefix">{{ line.prefix }}</span>
              </template>
              {{ line.text }}
              <template v-if="line.suffix">
                <span class="k-suffix">{{ line.suffix }}</span>
              </template>
            </span>

            <!-- Right Wing (scaffolding) -->
            <span v-if="line.wings"
                  class="k-wing k-wing-right"
                  :class="`k-wing-${line.wings}`" />
          </div>
        </div>

        <!-- Bands Section (full-width colored bands) -->
        <div v-if="section.type === 'bands'"
             class="k-bands-section"
             :class="`k-bands-spacing-${section.spacing || 'md'}`">
          <div v-for="(band, bandIdx) in section.bands" :key="bandIdx"
               class="k-band"
               :class="`k-band-${band.background}`"
               :style="getAnimationStyle(bandIdx, sectionIdx)">
            <span class="k-band-text" :class="`k-text-${band.size || 'lg'}`">
              {{ band.text }}
            </span>
          </div>
        </div>

      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Line {
  text: string
  role: 'hero' | 'connector' | 'normal'
  color?: string
  wings?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  prefix?: string
  suffix?: string
}

interface Band {
  text: string
  background: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

interface Section {
  type: 'overlay' | 'bands'
  lines?: Line[]
  bands?: Band[]
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

interface Spec {
  background?: string
  timing?: 'instant' | 'fast' | 'normal' | 'dramatic' | 'slow'
  transition?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'bounce'
  overlay?: number
  theme?: string
  sections: Section[]
}

const props = defineProps<{
  spec: Spec
}>()

// Timing presets (in milliseconds)
const timingMap = {
  instant: 0,
  fast: 150,
  normal: 300,
  dramatic: 500,
  slow: 750
}

// Compute classes for the slide container
const slideClasses = computed(() => {
  return [
    `k-transition-${props.spec.transition || 'fade'}`,
    `k-theme-${props.spec.theme || 'default'}`,
    props.spec.background ? 'has-background' : ''
  ]
})

// Background image style
const backgroundStyle = computed(() => {
  if (!props.spec.background) return {}
  return {
    backgroundImage: `url('/sample/gifs/${props.spec.background}')`
  }
})

// Overlay opacity style
const overlayStyle = computed(() => {
  return {
    opacity: props.spec.overlay || 0.7
  }
})

// Get classes for each line
const getLineClasses = (line: Line) => {
  const classes = [
    `k-role-${line.role || 'normal'}`,
    line.color ? `k-color-${line.color}` : '',
    line.size ? `k-text-${line.size}` : `k-text-${getDefaultSize(line.role)}`,
    line.wings ? 'has-wings' : ''
  ]
  return classes.filter(Boolean)
}

// Get default size based on role
const getDefaultSize = (role?: string): string => {
  switch(role) {
    case 'hero': return 'xl'
    case 'connector': return 'sm'
    default: return 'md'
  }
}

// Calculate animation delay for each element
const getAnimationStyle = (index: number, sectionIndex: number) => {
  const baseDelay = timingMap[props.spec.timing || 'normal']

  // Calculate cumulative delay from previous sections
  let cumulativeDelay = 0
  for (let i = 0; i < sectionIndex; i++) {
    const section = props.spec.sections[i]
    const itemCount = section.type === 'overlay'
      ? (section.lines?.length || 0)
      : (section.bands?.length || 0)
    cumulativeDelay += itemCount * baseDelay
  }

  const totalDelay = cumulativeDelay + (index * baseDelay)

  return {
    animationDelay: `${totalDelay}ms`
  }
}
</script>

<style scoped>
.kinetic-slide {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Background Layer */
.k-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.k-background-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.k-background-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
}

/* Content Layer */
.k-content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Overlay Section */
.k-overlay-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--line-gap, 1.5rem);
  padding: 2rem;
  width: 100%;
  max-width: 1400px;
}

/* Line Container */
.k-line {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  animation: var(--line-animation) 0.5s backwards;
}

/* Default line animation */
.k-line {
  --line-animation: k-slide-up;
}

/* Bands Section */
.k-bands-section {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  display: flex;
  flex-direction: column;
}

/* Band Spacing Variants (5 sizes) */
.k-bands-spacing-sm { gap: 0; }
.k-bands-spacing-md { gap: 2px; }
.k-bands-spacing-lg { gap: 4px; }
.k-bands-spacing-xl { gap: 8px; }
.k-bands-spacing-xxl { gap: 16px; }

/* Band Container */
.k-band {
  width: 100%;
  padding: var(--band-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: k-slide-in 0.5s backwards;
}

/* Text Content */
.k-text-content {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.k-prefix,
.k-suffix {
  opacity: 0.8;
  font-size: 0.8em;
}

/* Band Text */
.k-band-text {
  text-align: center;
  text-transform: uppercase;
  font-weight: 900;
}

/* Animations */
@keyframes k-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes k-slide-up {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes k-slide-in {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes k-bounce {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(50px);
  }
  50% {
    transform: scale(1.05) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Transition Variants */
.k-transition-fade .k-line { --line-animation: k-fade; }
.k-transition-slide-up .k-line { --line-animation: k-slide-up; }
.k-transition-slide-left .k-line { --line-animation: k-slide-in; }
.k-transition-bounce .k-line { --line-animation: k-bounce; }
</style>