<template>
  <div class="k-bands-container">
    <div
      v-for="(band, index) in bands"
      :key="index"
      class="k-band"
      :class="bandClass(band)"
      v-motion
      :initial="{ x: -100, opacity: 0 }"
      :enter="{
        x: 0,
        opacity: 1,
        transition: {
          delay: index * 200,
          duration: 500
        }
      }"
    >
      <component
        :is="band.tag || 'div'"
        class="k-text k-compressed"
        :class="sizeClass(band)"
      >
        {{ band.text }}
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Band {
  text: string
  color?: string
  size?: string
  tag?: string
}

const props = defineProps<{
  bands: Band[]
}>()

const bandClass = (band: Band) => band.color ? `k-band-${band.color}` : ''
const sizeClass = (band: Band) => band.size ? `k-${band.size}` : 'k-large'
</script>

<style scoped>
.k-bands-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>