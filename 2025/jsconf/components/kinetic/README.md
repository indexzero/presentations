# Kinetic Typography Components for Slidev

Clean, elegant Vue components that bring the motion design from DESIGNSYSTEM.md to life.
Inspired by Mikeal Rogers' "infrastructure as performance art" philosophy.

## Components

### GifHook
Full-bleed background GIF that plays once, then stops (no looping). Includes optional dark overlay for text contrast.

```vue
<GifHook
  src="/gifs/thinking.gif"
  :duration="2.5"
  :mask-opacity="0.4"
  @ended="startTextAnimations"
/>
```

Props:
- `src`: GIF URL
- `duration`: How long the GIF plays in seconds
- `maskOpacity`: Dark overlay opacity 0-1 (default: 0.3)
- `staticFrame`: Optional static image to show after GIF ends
- `autoplay`: Start automatically (default: true)

Features:
- **Full bleed**: Covers entire slide (100vw × 100vh)
- **Single play**: Stops after first loop at specified duration
- **Overlay mask**: Configurable dark overlay for text readability
- **Behind content**: Positioned with z-index: -1

### KineticText
Animates text entering from a direction with optional dissolve.

```vue
<KineticText from="right" :duration="500" :delay="0">
  <h1>The web isn't finished</h1>
</KineticText>
```

Props:
- `from`: 'left' | 'right' | 'top' | 'bottom' (default: 'right')
- `duration`: Animation duration in ms (default: 500)
- `delay`: Start delay in ms (default: 0)
- `dissolve`: Add opacity fade (default: false)

### TypewriterText
Reveals text character-by-character.

```vue
<TypewriterText
  text="Making infrastructure exciting"
  :duration="400"
  :delay="500"
/>
```

Props:
- `text`: The text to animate
- `duration`: Total duration for all characters (default: 400)
- `delay`: Start delay in ms (default: 0)

## Usage with Slidev

### 1. Full-Bleed GIF with Text Overlay

```vue
<script setup>
import { GifHook, KineticText, TypewriterText } from '../components/kinetic'
</script>

<!-- Full-bleed background GIF -->
<GifHook
  src="/gifs/reaction.gif"
  :duration="1.8"
  :mask-opacity="0.5"
/>

<!-- Content layered on top -->
<div class="relative z-10 h-full flex items-center justify-center text-white">
  <div class="text-center space-y-4">

    <KineticText from="right" :delay="1900">
      <h1 class="text-6xl font-bold">Your headline</h1>
    </KineticText>

    <TypewriterText
      text="Supporting text"
      :delay="2400"
      class="text-2xl"
    />

  </div>
</div>
```

### 2. With v-click Directives

```vue
<v-click>
  <KineticText from="bottom" :dissolve="true">
    <h2>Appears on click with motion</h2>
  </KineticText>
</v-click>

<v-click>
  <TypewriterText text="Types on next click" />
</v-click>
```

### 3. Reactive Choreography

```vue
<script setup>
import { ref } from 'vue'

const showAct2 = ref(false)

function onGifEnd() {
  // Trigger next act after GIF
  showAct2.value = true
}
</script>

<GifHook @ended="onGifEnd" />

<div v-if="showAct2">
  <KineticText from="right">
    <h1>Perfectly timed entrance</h1>
  </KineticText>
</div>
```

## Slide Transitions

Use Slidev's built-in transitions to match the Keynote style:

```yaml
---
transition: slide-left  # Like apple:push (0.75s)
---

---
transition: fade        # Like apple:dissolve
---
```

## The 0.5s Heartbeat

All text animations default to 500ms - the "heartbeat" of the presentation.
This creates a consistent rhythm that the audience internalizes.

## Philosophy

These components follow Evan You's principles:
- **Simple API** - Intuitive props, no complex configuration
- **Composable** - Mix and match components freely
- **Performant** - CSS animations, GPU accelerated
- **Progressive** - Use as much or as little as needed

Honor Mikeal Rogers: Make infrastructure exciting through motion.