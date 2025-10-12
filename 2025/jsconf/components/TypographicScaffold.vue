<template>
  <div class="typographic-scaffold" :style="scaffoldStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  gap?: string
  dashColor?: string
  align?: 'start' | 'center' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
  gap: '0',
  dashColor: 'rgba(255, 255, 255, 0.3)',
  align: 'center'
})

const scaffoldStyles = computed(() => ({
  '--scaffold-gap': props.gap,
  '--scaffold-color': props.dashColor,
  '--scaffold-align':
    props.align === 'start' ? 'flex-start' :
    props.align === 'end' ? 'flex-end' : 'center'
}))
</script>

<style scoped>
.typographic-scaffold {
  display: flex;
  align-items: center;
  justify-content: var(--scaffold-align);
  gap: var(--scaffold-gap);
  width: 100%;
  position: relative;
  flex-wrap: nowrap;
}

/* Global style for scaffold dashes */
:deep(.scaffold-dash) {
  display: inline-flex;
  align-items: center;
  padding: 0 0.5em;
  color: var(--scaffold-color);
  user-select: none;
  font-weight: 300;
  opacity: 0.8;
  transition: all 0.3s ease;
}

/* Hover effect for interactive scaffolds */
.typographic-scaffold:hover :deep(.scaffold-dash) {
  opacity: 1;
  transform: scaleX(1.2);
}
</style>