---
layout: center
transition: slide-left
---

# Complete Component Test Suite

Testing all 10 layout modes from the kinetic typography system

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 1. Band Mode Test

<BandMode
  :bands="[
    {
      text: 'Opening Statement',
      color: 'purple',
      scale: 'large'
    },
    {
      blocks: [
        { text: 'Multiple', semantic: 'emphasis' },
        { dash: true },
        { text: 'Word', semantic: 'technical' },
        { dash: true },
        { text: 'Blocks', semantic: 'action' }
      ],
      scaffold: true,
      color: 'dark'
    },
    {
      text: 'MASSIVE IMPACT',
      color: 'cyan',
      scale: 'massive'
    }
  ]"
  :progressive="true"
  :band-delay="300"
/>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 2. Overlay Mode Test

<OverlayMode
  background-image="/img/photo/MJM_7738.jpg"
  :text-blocks="[
    { text: 'Text', semantic: 'emphasis', scale: 'large' },
    { dash: true },
    { text: 'Over', semantic: 'technical', scale: 'massive' },
    { dash: true },
    { text: 'Media', semantic: 'action', scale: 'large' }
  ]"
  :scaffold="true"
  position="center"
  :overlay="true"
  :overlay-opacity="0.4"
/>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 3. Collage Mode Test

<CollageMode
  :items="[
    { type: 'image', src: '/img/photo/MJM_7738.jpg', label: 'ELECTRICAL', semantic: 'technical' },
    { type: 'image', src: '/img/photo/MJM_7757.jpg', label: 'MECHANICAL', semantic: 'action' },
    { type: 'image', src: '/img/photo/MJM_7805.jpg', label: 'DIGITAL', semantic: 'emphasis' },
    { type: 'image', src: '/img/photo/MJM_7818.jpg', label: 'PHYSICAL', semantic: 'urgent' }
  ]"
  :columns="2"
  :rows="2"
  gap="1.5rem"
/>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 4. Split Screen Mode Test

<SplitScreenMode
  :left-content="{
    type: 'image',
    src: '/img/photo/MJM_7738.jpg'
  }"
  :center-band="{
    lines: ['DIVIDING', 'CONTENT', 'STREAMS'],
    semantic: 'emphasis',
    scale: 'large'
  }"
  :right-content="{
    type: 'text',
    blocks: [
      { text: 'Right', semantic: 'technical', scale: 'large' },
      { text: 'Side', semantic: 'action', scale: 'massive' },
      { text: 'Content', semantic: 'neutral', scale: 'medium' }
    ]
  }"
  split="even"
/>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 5. Data Viz Mode Test

<DataVizMode
  chart-image="/img/photo/MJM_7757.jpg"
  :left-band="{
    words: ['BREAKING', 'SCIENCE', 'NEWS'],
    semantic: 'urgent',
    scale: 'large'
  }"
  :right-band="{
    words: ['DATA', 'DRIVEN', 'INSIGHTS'],
    semantic: 'technical',
    scale: 'large'
  }"
  :annotations="[
    { text: 'Critical Point', x: '30%', y: '40%', semantic: 'action', arrow: true },
    { text: 'Peak Value', x: '60%', y: '25%', semantic: 'emphasis', arrow: true },
    { text: 'Anomaly', x: '75%', y: '60%', semantic: 'urgent', arrow: true }
  ]"
/>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 6. Stacked Band Mode Test

<StackedBandMode
  :bands="[
    { text: 'We have moved 2.5 TRILLION TONS OF CO²', semantic: 'urgent', scale: 'large' },
    { text: 'to the Fast Carbon Cycle', semantic: 'technical', scale: 'medium' },
    { text: 'from the Slow Carbon Cycle', semantic: 'neutral', scale: 'medium' },
    { text: 'AND WE HAVE TO PUT IT BACK', semantic: 'action', scale: 'massive' }
  ]"
  :progressive="true"
  :band-delay="500"
/>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 7. Progressive Build Mode Test

<ProgressiveBuildMode
  background-image="/img/photo/MJM_7805.jpg"
  :layers="[
    { text: 'First Layer', semantic: 'neutral', scale: 'medium' },
    { text: 'Building Up', semantic: 'technical', scale: 'large', position: { x: '60%', y: '40%' } },
    { text: 'More Content', semantic: 'emphasis', scale: 'large', position: { x: '40%', y: '60%' } },
    { text: 'Final Impact', semantic: 'action', scale: 'massive', position: { x: '50%', y: '80%' } }
  ]"
  :auto-play="true"
  :frame-delay="1000"
  :accumulative="true"
/>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 8. Mixed Media Mode Test

<MixedMediaMode
  :elements="[
    { type: 'media', mediaType: 'image', src: '/img/photo/MJM_7738.jpg', gridArea: '1 / 1 / 2 / 2' },
    { type: 'connector', text: 'But where', semantic: 'emphasis', showLine: true, gridArea: '1 / 2 / 2 / 3' },
    { type: 'media', mediaType: 'image', src: '/img/photo/MJM_7757.jpg', gridArea: '1 / 3 / 2 / 4' },
    { type: 'central', blocks: [
      { text: 'CENTRAL', semantic: 'action', scale: 'massive' },
      { text: 'FOCUS', semantic: 'technical', scale: 'large' }
    ], gridArea: '2 / 2 / 3 / 3' },
    { type: 'connector', text: 'does it go?', semantic: 'neutral', arrow: true, gridArea: '3 / 2 / 4 / 3' }
  ]"
  layout="custom"
  grid-template="repeat(3, 1fr) / repeat(3, 1fr)"
/>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 9. Sandwich Mode Test

<SandwichMode
  :top="{ text: 'Before the media...', class: 'band-purple' }"
  :bottom="{ text: '...after the media', class: 'band-green' }"
  :top-delay="300"
  :bottom-delay="1200"
>
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    <img src="/img/photo/MJM_7818.jpg" style="max-width: 70%; max-height: 70%; border-radius: 1rem;" />
  </div>
</SandwichMode>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# 10. Label Mode Test

<LabelMode
  label="INFRASTRUCTURE"
  semantic="action"
  :character-animation="true"
  content-class="grid"
>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
    <img src="/img/photo/MJM_7738.jpg" style="width: 100%; border-radius: 8px;" />
    <img src="/img/photo/MJM_7757.jpg" style="width: 100%; border-radius: 8px;" />
    <img src="/img/photo/MJM_7805.jpg" style="width: 100%; border-radius: 8px;" />
    <img src="/img/photo/MJM_7818.jpg" style="width: 100%; border-radius: 8px;" />
    <img src="/img/photo/MJM_7738.jpg" style="width: 100%; border-radius: 8px;" />
    <img src="/img/photo/MJM_7757.jpg" style="width: 100%; border-radius: 8px;" />
  </div>
</LabelMode>

</KineticProvider>

---
layout: center
---

# Test Complete

All 10 layout modes have been tested:

<v-clicks>

1. ✅ Band Mode - Horizontal colored bands
2. ✅ Overlay Mode - Text over media
3. ✅ Collage Mode - Grid with labels
4. ✅ Split Screen Mode - Dual streams
5. ✅ Data Viz Mode - Charts with annotations
6. ✅ Stacked Band Mode - Message bands
7. ✅ Progressive Build Mode - Accumulating text
8. ✅ Mixed Media Mode - Non-linear layout
9. ✅ Sandwich Mode - Text framing media
10. ✅ Label Mode - Title cards

</v-clicks>