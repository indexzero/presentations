import { defineAppSetup } from '@slidev/types'

// Import the kinetic CSS utility system
import '../styles/kinetic.css'

// Import minimal kinetic components
import KineticText from '../components/KineticText.vue'
import KineticBand from '../components/KineticBand.vue'
import TypewriterText from '../components/kinetic/TypewriterText.vue'

// Import legacy components (to be removed after migration)
import WordBlock from '../components/WordBlock.vue'
import BandMode from '../components/BandMode.vue'

export default defineAppSetup(({ app }) => {
  // Register new minimal components
  app.component('KineticText', KineticText)
  app.component('KineticBand', KineticBand)
  app.component('TypewriterText', TypewriterText)

  // Keep legacy components temporarily for backward compatibility
  app.component('WordBlock', WordBlock)
  app.component('BandMode', BandMode)
})