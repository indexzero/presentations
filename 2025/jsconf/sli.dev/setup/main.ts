import { defineAppSetup } from '@slidev/types'

// Import the kinetic CSS utility system
import '../styles/kinetic.css'

// Import minimal kinetic components
import KineticText from '../components/KineticText.vue'
import KineticBand from '../components/KineticBand.vue'
import TypewriterText from '../components/kinetic/TypewriterText.vue'

// Import legacy components (to be removed after migration)
import WordBlock from '../components/WordBlock.vue'

// Import the master component
import KineticSlide from '../components/KineticSlide.vue'

export default defineAppSetup(({ app }) => {
  // Register the master component
  app.component('KineticSlide', KineticSlide)

  // Register new minimal components
  app.component('KineticText', KineticText)
  app.component('KineticBand', KineticBand)
  app.component('TypewriterText', TypewriterText)

  // Keep legacy components temporarily for backward compatibility
  app.component('WordBlock', WordBlock)
})