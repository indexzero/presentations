import { defineAppSetup } from '@slidev/types'
import '../styles/index.css'

// Import kinetic typography components
import GifHook from '../components/kinetic/GifHook.vue'
import KineticText from '../components/kinetic/KineticText.vue'
import TypewriterText from '../components/kinetic/TypewriterText.vue'

export default defineAppSetup(({ app }) => {
  // Register kinetic typography components globally
  app.component('GifHook', GifHook)
  app.component('KineticText', KineticText)
  app.component('TypewriterText', TypewriterText)
})