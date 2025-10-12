---
layout: center
transition: slide-left
---

<script setup>
import { ref } from 'vue'

const gifEnded = ref(false)
const showText = ref(false)

function onGifEnd() {
  gifEnded.value = true
  setTimeout(() => {
    showText.value = true
  }, 100)
}
</script>

# Full-Bleed GIF with Kinetic Typography

<!-- Full-bleed background GIF with mask -->
<GifHook
  src="https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif"
  :duration="2.5"
  :mask-opacity="0.4"
  @ended="onGifEnd"
/>

<!-- Content on top of GIF -->
<div class="relative z-10 h-full flex flex-col justify-center items-center text-white">

<div v-if="showText" class="space-y-8 text-center">

<KineticText from="right" :duration="500" :delay="0">
<h2 class="text-6xl font-bold">The web isn't finished</h2>
</KineticText>

<KineticText from="bottom" :duration="500" :delay="500" :dissolve="true">
<p class="text-2xl opacity-90">Infrastructure as performance art</p>
</KineticText>

</div>

</div>

<!--
The GIF is now full-bleed (100% width/height) with an optional dark mask overlay.
Text appears on top with proper z-index positioning.
GIF stops playing after first loop (2.5 seconds).
-->

---
layout: center
transition: slide-up
---

# Character Animation Example

<TypewriterText
  text="Making infrastructure exciting"
  :duration="400"
  :delay="500"
  class="text-5xl font-bold"
/>

<v-click>
  <KineticText from="left" :delay="1000" class="mt-8">
    <p class="text-2xl">Through kinetic typography</p>
  </KineticText>
</v-click>

---
layout: two-cols
transition: fade
---

# Using with v-click

Combine with Slidev's built-in directives:

::right::

<v-click>
  <KineticText from="right">
    <div class="text-3xl">First click</div>
  </KineticText>
</v-click>

<v-click>
  <TypewriterText text="Second click" class="text-3xl mt-4" />
</v-click>

<v-click>
  <KineticText from="bottom" :dissolve="true">
    <div class="text-3xl mt-4">Third click</div>
  </KineticText>
</v-click>

---
layout: center
transition: slide-left
---

# Setup in your slides

```vue
<script setup>
import { GifHook, KineticText, TypewriterText } from '../components/kinetic'
</script>

<GifHook src="/gifs/reaction.gif" :duration="2.5" />

<KineticText from="right" :delay="2600">
  <h1>Your content here</h1>
</KineticText>

<TypewriterText
  text="Character by character"
  :delay="3100"
/>
```

Use Slidev's transitions for slide-to-slide motion:
- `transition: slide-left` (like apple:push)
- `transition: fade` (like apple:dissolve)
- Duration: 750ms matches the original