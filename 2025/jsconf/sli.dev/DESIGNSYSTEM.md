# Kinetic Typography Design System
## JSConf Presentation Motion Language

This document captures the motion design and aesthetic principles from the analyzed Keynote presentation export in `past.1/`. Use this as a reference for creating dynamic, engaging technical presentations that transform static information into choreographed kinetic typography theater.

## Core Philosophy

**"Infrastructure as Performance Art"** - Making complex technical topics exciting through deliberate motion design. As Mikeal Rogers would appreciate: it's not about information density, it's about creating an experience where each point lands with physical impact.

### The Variable Line Height Revolution
**CRITICAL INSIGHT**: Line heights are NOT uniform - they're VARIABLE from line to line to achieve an organic, kinetic feel. This isn't mechanical typography, it's living, breathing text that creates rhythm through intentional variation:
- Small connector text: line-height 2.0-3.0 (breathing room)
- Medium emphasis: line-height 1.2-1.5 (normal reading)
- Large statements: line-height 0.9-1.1 (slight compression)
- Massive hero text: line-height 0.7-0.85 (extreme compression)
- This creates a HEARTBEAT rhythm, not robotic spacing

## Visual Aesthetic

### Color Palette
- **Backgrounds**: Dark/black (#000000)
- **Primary Accents**:
  - Purple gradients (corporate/intro slides)
  - Hot pink/magenta (#FF00FF range)
  - Electric green (GoDaddy brand green)
- **Typography**: White on dark for maximum contrast
- **Style**: "Cyberpunk-meets-conference" - bold, unapologetic, high contrast

### Typography
- **Scale**: Massive, oversized text
- **Weight**: Bold, heavy fonts
- **Philosophy**: Text as visual element, not just information carrier
- **Layout**: Minimal text per slide - each slide makes ONE statement

## The Word Block Atomic System

Based on comprehensive analysis of 100+ slide transitions, this presentation uses a sophisticated typographic system where text is treated as discrete, animatable blocks that can be composed in multiple ways. This is pure Atomic Design applied to kinetic typography at scale.

### Typography Molecules Pattern
Text groups form "molecules" - semantic units with internal rhythm:
```
Molecule Example:
┌─────────────────────────────────┐
│ Small connector: "Why"          │ line-height: 2.5
│ MASSIVE HERO: "HELLO THERE."    │ line-height: 0.75
│ Small connector: "Let's"        │ line-height: 2.5
│ MASSIVE HERO: "GET STARTED."    │ line-height: 0.75
└─────────────────────────────────┘
```
Each molecule has:
- **Internal variation**: Different line heights within
- **External consistency**: Predictable spacing between molecules
- **Configurable properties**: All aspects can be customized per instance

### Atomic Components

1. **Word Blocks**: Individual words or short phrases as discrete visual units
2. **Semantic Colors**: Expanded color assignments that carry meaning at the word level
   - Yellow (#f9c74f): Emphasis, warning, urgency ("2.5 TRILLION TONS OF CO²")
   - Cyan/Green (#4ecdc4): Technical, positive terms ("electrical & computer engineering")
   - Hot Pink (#ff006e): Action, energy ("Power", "Get Started")
   - Orange (#ff6b35): Urgent action required ("PUT IT BACK", "LOWER OUR CARBON OUTPUT")
   - White (#ffffff): Neutral, supporting text
   - Purple gradients: Corporate/intro backgrounds
   - Dark/Black: Separation and visual breaks
3. **Typographic Scaffolding**: CONFIGURABLE dynamic connectors
   - **Variable width**: 100px-300px depending on text size
   - **Variable opacity**: 0.2-0.5 based on emphasis
   - **Variable position**: top/middle/baseline of text
   - **Selective appearance**: Only between certain elements for rhythm
   - **Asymmetric patterns**: Different lengths on left/right sides
   - Creates visual connections WITHOUT boxing in content
4. **Multi-Directional Compression Zones**:
   - Vertical compression (top/bottom boundaries)
   - Horizontal compression (left/right boundaries)
   - Diagonal compression (angular layouts)
   - Radial compression (center-focused)
   - Temporal compression (rapid succession)

### Typography Hierarchy (SHOUT/speak/whisper/annotate)

- **MASSIVE SCALE**: Primary statements that demand attention ("ELECTRICAL", "SONIC", "2.5 TRILLION TONS")
- **Large Scale**: Supporting phrases that provide context
- **Medium Scale**: Metadata and contextual information
- **Annotation Scale**: Small callouts on data visualizations
- Each level serves a performative function rather than a structural one

### Ten Core Layout Modes

#### 1. Band Mode
Full-width colored bands stacking vertically, each containing a complete thought:
```
═══════════════════════════════════════
    These days — I am a —
    SOFTWARE ENGINEER &
═══════════════════════════════════════
    OPEN SOURCERER
═══════════════════════════════════════
    ON THE INTERNET THEY CALL ME @INDEXZERO
═══════════════════════════════════════
```
- Creates horizontal reading zones
- Progressive disclosure through sequential band animation
- Each band is a temporal container controlling information flow

#### 2. Sandwich Mode
Text bands appear above and below media content:
```
═══════ In other words ... ═══════
        [GIF/IMAGE CONTENT]
═══════ ... seriously ═══════
```
- Typography becomes a frame for visual content
- Text takes supporting role when visuals dominate
- Creates vertical compression around media

#### 3. Label Mode
Single word or phrase acts as title card for visual grids:
```
           SONIC
    [Grid of Sonic images]
```
- Minimal text, maximum visual impact
- Typography as wayfinding rather than content

#### 4. Overlay Mode
Text directly overlaid on full-screen media with typographic scaffolding:
```
[Full-screen GIF/Image]
    We — all must say — it
```
- Text integrated within image space
- Semi-transparent backgrounds for legibility
- Scaffolding creates structure over chaos

#### 5. Collage Mode
Multiple media items in grid with overlaid labels:
```
ELECTRICAL          MECHANICAL
[GIF 1]            [GIF 2]
[GIF 3]            [GIF 4]
```
- Grid-based media layout
- Labels as categorical markers
- Mixed media types in single composition

#### 6. Split Screen Mode
Side-by-side content with central dividing band:
```
[Neil deGrasse GIF]  |  I AM HERE TO TALK ABOUT  |  [White space]
[Jesse Pinkman GIF]  |  SAY IT WITH ME NOW ...    |  [Content area]
```
- Dual content streams
- Central text band as bridge
- Asymmetric balance

#### 7. Data Visualization Mode
Charts with vertical text bands and colored annotations:
```
BREAKING ║  [Chart with data]  ║ BREAKING
SCIENCE  ║  Pink callout →    ║ SCIENCE
NEWS     ║  Blue callout →    ║ NEWS
```
- Vertical text columns frame data
- Colored callout boxes for annotations
- Mixed static and dynamic elements

#### 8. Stacked Band Mode
Multiple message bands with different semantic colors:
```
═══════════════════════════════════════
We have moved 2.5 TRILLION TONS OF CO²
═══════════════════════════════════════
to the Fast Carbon Cycle
═══════════════════════════════════════
from the Slow Carbon Cycle
═══════════════════════════════════════
AND WE HAVE TO PUT IT BACK
═══════════════════════════════════════
```
- Each band carries distinct message
- Color coding for semantic emphasis
- Progressive information reveal

#### 9. Progressive Build Mode
Text building progressively on static background:
```
[Static Bender GIF throughout]
Frame 1: (GIF alone)
Frame 2: — Basically —
Frame 3: — Basically —
         I know a few things
Frame 4: — Basically —
         I know a few things
         — about —
         a few things
```
- Static media with dynamic text overlay
- Text accumulates rather than replaces
- Creates narrative through addition

#### 10. Mixed Media Mode
Text interwoven within and around multiple media elements:
```
[Diagram 1] ←→ But where ←→ [Diagram 2]
                  ↓
           [Central content]
```
- Text as connective tissue between media
- Multiple focal points
- Non-linear reading paths

## Creating "Tight Space" Through Typographic Pressure

Unlike traditional layouts that use whitespace for breathing room, this system creates visual density through constraint and compression:

### Five Core Techniques

1. **Typographic Scaffolding**
   - Horizontal dashes create rigid grid structures
   - Example: "Speaking — Truth — to — Power"
   - Dashes establish equal spacing zones that force deliberate word placement

2. **Compression Zones**
   - Colored bands and boundaries squeeze content vertically
   - Text must fit within defined containers
   - Creates visual pressure without cramming

3. **Word Block Stacking**
   - Words treated as stackable LEGO blocks rather than flowing text
   - Each block has independent color, position, and animation properties
   - Example: "made software" (green) / "for grid scale" (white) / "energy storage" (orange)

4. **Edge Mounting**
   - When data visualizations dominate, typography moves to screen edges
   - "BREAKING SCIENCE NEWS" wraps around charts like a frame
   - Adaptive system that changes role based on content type

5. **Temporal Compression**
   - Rapid 0.5s animation cycles create psychological pressure
   - Consistent rhythm becomes the presentation's heartbeat
   - Motion creates urgency even in static moments

### The Progressive Disclosure Pattern

Animation sequences reveal information strategically:
1. **GIF/Image appears** (emotional context)
2. **Primary text enters from right** (natural reading flow)
3. **Secondary text rises/descends** (importance indicators)
4. **Color blocks animate separately** (layered motion)

This choreography ensures "tight space" feels dynamic rather than cluttered.

## The Three-Act Motion Choreography

Every slide follows a consistent three-act structure:

### Act 1: The GIF Hook (0.3s - 17s)
**Purpose**: Emotional punctuation that sets mood before content

**Timing Distribution**:
```
Quick hits:     0.3-0.6s   (Zoidberg, Kermit typing)
Standard:       1-3s       (Most reaction GIFs)
Extended:       5-6s       (Thinking/processing GIFs)
Epic:          13-17s      (Why.gif, chalkboard.gif)
```

**Technical Specs**:
- `automaticPlay: true` - GIF starts immediately on slide load
- `loopMode: "looping"` - Continuous motion while active
- Popular GIFs: reaction shots from Futurama, Kermit, Star Wars
- Purpose: Break tension, add humor, create emotional connection

### Act 2: Text Entrance Choreography (After GIF ends)
**Purpose**: Text doesn't just appear - it PERFORMS

**Animation Types & Usage**:

1. **Character-by-Character** (54 slides)
   - Animation: `apple:move in character`
   - Duration: `0.4s`
   - Effect: Text types itself onto screen
   - Use: Headlines, key statements

2. **Directional Move-In** (76 slides)
   - Animation: `apple:move in`
   - Duration: `0.5s`
   - Direction codes:
     - `12`: From right (92 uses) - primary flow
     - `14`: From bottom (52 uses) - emphasis
     - `11`: From left (27 uses) - contrast
     - `13`: From top (17 uses) - surprise
   - Movement: 800+ pixels dramatic entrances

3. **Dissolve** (79 slides)
   - Animation: `apple:dissolve`
   - Duration: `0.5s`
   - Effect: Fade in with opacity 0→1
   - Use: Softer entrances, layered with position animations

### Act 3: Transition to Next (0.75s)
**Purpose**: Maintain forward momentum

- Animation: `apple:push`
- Duration: `0.75s`
- Effect: Entire screen slides away revealing next
- Creates continuous narrative flow

## The Rhythm Pattern

```
[GIF PLAYS: Variable 0.3-17s]
    ↓
[TEXT ENTERS: Consistent 0.4-0.5s]
    ↓
[TRANSITION: 0.75s push]
    ↓
[NEXT SLIDE]
```

### Key Timing Principles
1. **Variable GIF timing** creates unpredictable pacing, keeps attention
2. **Consistent text timing** (0.5s) creates subconscious rhythm/heartbeat
3. **Never stop moving** - perpetual motion maintains energy
4. **0.5 second cadence** - This becomes the presentation's heartbeat

## Design Tokens System (Nicole Sullivan Approved)

### Core Token Categories
```css
:root {
  /* Line Height Scale */
  --lh-crushed: 0.75;      /* Massive hero text */
  --lh-compressed: 0.9;     /* Large statements */
  --lh-normal: 1.2;         /* Standard reading */
  --lh-loose: 2.5;          /* Small connectors */
  --lh-breath: 3.0;         /* Maximum spacing */

  /* Letter Spacing Compression */
  --compress-none: 0;
  --compress-light: -0.02em;   /* Readable compression */
  --compress-medium: -0.04em;  /* Noticeable compression */
  --compress-heavy: -0.08em;   /* Dramatic compression */

  /* Scaffold Configuration */
  --scaffold-width-min: 100px;
  --scaffold-width-max: 300px;
  --scaffold-opacity-min: 0.2;
  --scaffold-opacity-max: 0.5;

  /* Spacing Rhythm */
  --space-molecule: 3rem;      /* Between molecules */
  --space-internal: 0.5rem;    /* Within molecules */
  --space-compressed: -0.25rem;/* Overlapping elements */

  /* Text Shadow Layers (Lea Verou Spec) */
  --shadow-glow: 0 0 40px rgba(0,0,0,0.9);
  --shadow-soft: 0 0 20px rgba(0,0,0,0.8);
  --shadow-hard: 0 2px 4px rgba(0,0,0,0.7);
  --shadow-sharp: 0 1px 2px rgba(0,0,0,0.9);
  --shadow-stack: var(--shadow-glow), var(--shadow-soft),
                   var(--shadow-hard), var(--shadow-sharp);
}
```

## Implementation in Slidev with Vue 3 Components

To bring this kinetic typography system to life in Slidev, we need a component architecture that treats words as first-class reactive entities:

### Core Component Architecture

```vue
<!-- components/WordBlock.vue -->
<template>
  <span
    :class="['word-block', semanticClass]"
    :style="computedStyles"
    v-motion
    :initial="motionInitial"
    :enter="motionEnter"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWordBlockAnimation } from '@/composables/useWordBlockAnimation'

interface Props {
  semantic?: 'emphasis' | 'technical' | 'action' | 'neutral'
  delay?: number
  direction?: 'right' | 'left' | 'top' | 'bottom'
  scale?: 'massive' | 'large' | 'medium'
}

const props = withDefaults(defineProps<Props>(), {
  semantic: 'neutral',
  delay: 0,
  direction: 'right',
  scale: 'large'
})

const { motionInitial, motionEnter } = useWordBlockAnimation(props)

const semanticClass = computed(() => `semantic-${props.semantic}`)
const computedStyles = computed(() => ({
  '--delay': `${props.delay}ms`,
  '--scale': props.scale
}))
</script>
```

### Layout Mode Components

```vue
<!-- components/BandMode.vue -->
<template>
  <div class="band-mode-container">
    <TransitionGroup
      name="band"
      tag="div"
      class="bands"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
    >
      <div
        v-for="(band, index) in bands"
        :key="band.id"
        :class="['band', band.color]"
        :data-index="index"
      >
        <TypographicScaffold v-if="band.scaffold">
          <template v-for="block in band.blocks" :key="block.id">
            <WordBlock
              :semantic="block.semantic"
              :delay="index * 500 + block.delay"
              :scale="block.scale"
            >
              {{ block.text }}
            </WordBlock>
            <span v-if="block.dash" class="scaffold-dash">—</span>
          </template>
        </TypographicScaffold>
        <div v-else class="band-content">
          <component :is="band.content" v-bind="band.props" />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Band } from '@/types/typography'

interface Props {
  bands: Band[]
  progressive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  progressive: true
})

const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.transform = 'translateY(100%)'
  element.style.opacity = '0'
}

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  const index = parseInt(element.dataset.index || '0')

  setTimeout(() => {
    element.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
    element.style.transform = 'translateY(0)'
    element.style.opacity = '1'
    done()
  }, index * 200) // Progressive disclosure timing
}
</script>
```

### Composables for Animation Logic

```typescript
// composables/useWordBlockAnimation.ts
import { computed } from 'vue'
import type { MotionVariants } from '@vueuse/motion'

export interface WordBlockProps {
  direction: 'right' | 'left' | 'top' | 'bottom'
  delay: number
  semantic: string
}

const DIRECTION_OFFSETS = {
  right: { x: 800, y: 0 },
  left: { x: -800, y: 0 },
  bottom: { x: 0, y: 100 },
  top: { x: 0, y: -100 }
}

export function useWordBlockAnimation(props: WordBlockProps) {
  const motionInitial = computed(() => ({
    ...DIRECTION_OFFSETS[props.direction],
    opacity: 0,
    scale: props.semantic === 'emphasis' ? 0.8 : 1
  }))

  const motionEnter = computed(() => ({
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: props.delay,
      duration: 500
    }
  }))

  return { motionInitial, motionEnter }
}
```

### Typographic Scaffolding Component

```vue
<!-- components/TypographicScaffold.vue -->
<template>
  <div class="typographic-scaffold">
    <slot />
  </div>
</template>

<style scoped>
.typographic-scaffold {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.scaffold-dash {
  display: inline-flex;
  align-items: center;
  padding: 0 0.5em;
  color: var(--scaffold-color, #666);
  user-select: none;
}
</style>
```

### Compression Zone System

```vue
<!-- components/CompressionZone.vue -->
<template>
  <div
    ref="zoneRef"
    class="compression-zone"
    :style="compressionStyles"
  >
    <div class="zone-boundary top" />
    <div class="zone-content">
      <slot />
    </div>
    <div class="zone-boundary bottom" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  pressure?: 'low' | 'medium' | 'high'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pressure: 'medium',
  animated: true
})

const zoneRef = ref<HTMLElement>()
const isVisible = ref(false)

const compressionStyles = computed(() => ({
  '--compression': props.pressure === 'high' ? '0.7' :
                   props.pressure === 'medium' ? '0.85' : '1',
  '--boundary-opacity': isVisible.value ? '1' : '0'
}))

if (props.animated) {
  useIntersectionObserver(zoneRef, ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
  })
}
</script>
```

### Progressive Disclosure Controller

```typescript
// composables/useProgressiveDisclosure.ts
import { ref, computed, watch } from 'vue'

export function useProgressiveDisclosure() {
  const currentStep = ref(0)
  const steps = ref<Array<() => void>>([])
  const isPlaying = ref(false)

  const play = async () => {
    isPlaying.value = true
    for (let i = 0; i < steps.value.length; i++) {
      currentStep.value = i
      await steps.value[i]()
      await new Promise(resolve => setTimeout(resolve, 500)) // 0.5s heartbeat
    }
    isPlaying.value = false
  }

  const registerStep = (stepFn: () => void) => {
    steps.value.push(stepFn)
  }

  return {
    currentStep,
    isPlaying,
    play,
    registerStep
  }
}
```

### Semantic Color System Implementation

```css
/* styles/semantic-colors.css */
:root {
  --color-emphasis: #f9c74f;
  --color-technical: #4ecdc4;
  --color-action: #ff006e;
  --color-neutral: #ffffff;
  --color-bg: #000000;
}

.semantic-emphasis { color: var(--color-emphasis); }
.semantic-technical { color: var(--color-technical); }
.semantic-action { color: var(--color-action); }
.semantic-neutral { color: var(--color-neutral); }

/* Scale modifiers */
.word-block[style*="--scale='massive'"] {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 900;
}

.word-block[style*="--scale='large'"] {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
}

.word-block[style*="--scale='medium'"] {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 500;
}
```

## Motion Direction Language

### Horizontal Movement (Primary)
- **From Right (Direction 12)**: Default entry, natural reading flow
- **From Left (Direction 11)**: Contrast, "going back" feeling

### Vertical Movement (Emphasis)
- **From Bottom (Direction 14)**: Rising importance, revelation
- **From Top (Direction 13)**: Descending insight, conclusion

## GIF Selection Strategy

### Emotional Arc Mapping
- **Opening**: Friendly/welcoming (hello.gif, wave.mp4)
- **Problem Statement**: Confusion (confused.gif, thinking GIFs)
- **Building Tension**: Concern (kermit-scared.gif, wtf.gif)
- **Solution**: Confidence (force-with-you.gif, fix-it.gif)
- **Celebration**: Joy (teamwork.gif, mountains.gif)

### Duration by Purpose
- **Punctuation** (0.3-0.8s): Quick emotional hits
- **Processing** (1-3s): Give audience time to absorb
- **Contemplation** (5-6s): Major concept introduction
- **Epic Moments** (13-17s): Climactic points

## Design Principles

1. **Motion Never Stops**: Even when static, GIFs loop to maintain visual energy
2. **Text as Performance**: Every word entrance is choreographed
3. **Emotional Before Logical**: GIF sets mood before content appears
4. **Consistent Rhythm**: 0.5s becomes the heartbeat audience internalizes
5. **High Contrast Always**: Dark backgrounds, bright accents - no subtlety
6. **One Point Per Slide**: Each slide is a statement, not a document

## Technical Implementation Notes

### Keynote JSON Structure
```json
{
  "events": [
    {
      "automaticPlay": true,
      "effects": [{
        "name": "apple:movie-start",
        "duration": 0.01,
        "effects": [{
          "movie": {
            "asset": "reaction.gif",
            "endTime": 2.5,
            "loopMode": "looping"
          }
        }]
      }]
    },
    {
      "automaticPlay": false,
      "effects": [{
        "name": "apple:move in",
        "duration": 0.5,
        "attributes": {"direction": 12}
      }]
    }
  ]
}
```

## The "Developer Theater" Effect

This design system creates what can be called "Developer Theater" - presentations that mirror the dynamism of live coding:

- **Terminal-like flow**: Text entering from right mimics terminal output
- **Processing visualization**: Thinking GIFs = code compilation
- **Error states**: Confusion GIFs = debugging moments
- **Success states**: Celebration GIFs = successful builds

## Usage Guidelines

1. **Never rush the GIFs** - Let them play fully for emotional impact
2. **Maintain the 0.5s rhythm** - Consistency creates professional polish
3. **Use direction meaningfully** - Right = forward, Bottom = important
4. **One animated element at a time** - Never compete for attention
5. **Dark mode always** - This aesthetic requires high contrast

## Result

When properly implemented, this system transforms a static presentation into a living, breathing performance where:
- Ideas feel urgent and alive
- Complex topics become accessible through personality
- The audience feels the rhythm and anticipates the beat
- Technical content gains emotional resonance
- Infrastructure becomes exciting

As Mikeal Rogers would say: "The web isn't finished" - and neither should your slides be static.