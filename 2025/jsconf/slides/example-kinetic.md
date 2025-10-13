---
layout: center
transition: slide-left
---

# Kinetic Typography Demo

<KineticProvider :auto-start="true">
  <BandMode
    :bands="[
      {
        blocks: [
          { text: 'Speaking', semantic: 'neutral' },
          { dash: true },
          { text: 'Truth', semantic: 'emphasis', scale: 'massive' },
          { dash: true },
          { text: 'to', semantic: 'neutral', scale: 'medium' },
          { dash: true },
          { text: 'Power', semantic: 'action', scale: 'massive' }
        ],
        scaffold: true,
        color: 'dark'
      }
    ]"
    :progressive="true"
    :band-delay="300"
  />
</KineticProvider>

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