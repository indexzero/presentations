<template>
  <div
    ref="zoneRef"
    :class="['compression-zone', `pressure-${pressure}`]"
    :style="compressionStyles"
  >
    <div class="zone-boundary top" v-if="showBoundaries" />
    <div class="zone-content">
      <slot />
    </div>
    <div class="zone-boundary bottom" v-if="showBoundaries" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  pressure?: 'low' | 'medium' | 'high'
  animated?: boolean
  showBoundaries?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pressure: 'medium',
  animated: true,
  showBoundaries: true
})

const zoneRef = ref<HTMLElement>()
const isVisible = ref(false)

const compressionStyles = computed(() => {
  const compressionValue =
    props.pressure === 'high' ? '0.7' :
    props.pressure === 'medium' ? '0.85' : '1'

  return {
    '--compression': compressionValue,
    '--boundary-opacity': isVisible.value ? '1' : '0',
    '--content-padding':
      props.pressure === 'high' ? '0.5rem' :
      props.pressure === 'medium' ? '1rem' : '1.5rem'
  }
})

if (props.animated) {
  useIntersectionObserver(zoneRef, ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
  }, {
    threshold: 0.1
  })
} else {
  onMounted(() => {
    isVisible.value = true
  })
}
</script>

<style scoped>
.compression-zone {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.zone-boundary {
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 20%,
    rgba(255, 255, 255, 0.3) 80%,
    transparent 100%
  );
  opacity: var(--boundary-opacity);
  transition: opacity 0.5s ease;
}

.zone-boundary.top {
  position: absolute;
  top: 0;
  left: 0;
}

.zone-boundary.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
}

.zone-content {
  padding: var(--content-padding);
  transform: scaleY(var(--compression));
  transform-origin: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Pressure-specific styles */
.pressure-high .zone-content {
  letter-spacing: -0.02em;
  line-height: 0.9;
}

.pressure-medium .zone-content {
  letter-spacing: normal;
  line-height: 1;
}

.pressure-low .zone-content {
  letter-spacing: 0.02em;
  line-height: 1.2;
}

/* Animation when entering viewport */
.compression-zone:not(.is-visible) .zone-content {
  transform: scaleY(1);
}
</style>