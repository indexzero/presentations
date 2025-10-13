import { defineAppSetup } from '@slidev/types'

// Import all kinetic components
import KineticProvider from '../components/KineticProvider.vue'
import WordBlock from '../components/WordBlock.vue'
import BandMode from '../components/BandMode.vue'
import SandwichMode from '../components/SandwichMode.vue'
import LabelMode from '../components/LabelMode.vue'
import CompressionZone from '../components/CompressionZone.vue'
import TypographicScaffold from '../components/TypographicScaffold.vue'

// Import new layout mode components
import OverlayMode from '../components/OverlayMode.vue'
import CollageMode from '../components/CollageMode.vue'
import SplitScreenMode from '../components/SplitScreenMode.vue'
import DataVizMode from '../components/DataVizMode.vue'
import StackedBandMode from '../components/StackedBandMode.vue'
import ProgressiveBuildMode from '../components/ProgressiveBuildMode.vue'
import MixedMediaMode from '../components/MixedMediaMode.vue'

export default defineAppSetup(({ app }) => {
  // Register core components globally
  app.component('KineticProvider', KineticProvider)
  app.component('WordBlock', WordBlock)
  app.component('CompressionZone', CompressionZone)
  app.component('TypographicScaffold', TypographicScaffold)

  // Register layout mode components
  app.component('BandMode', BandMode)
  app.component('SandwichMode', SandwichMode)
  app.component('LabelMode', LabelMode)
  app.component('OverlayMode', OverlayMode)
  app.component('CollageMode', CollageMode)
  app.component('SplitScreenMode', SplitScreenMode)
  app.component('DataVizMode', DataVizMode)
  app.component('StackedBandMode', StackedBandMode)
  app.component('ProgressiveBuildMode', ProgressiveBuildMode)
  app.component('MixedMediaMode', MixedMediaMode)
})