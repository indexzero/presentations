---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# Demo: Band Mode

<BandMode
  :bands="[
    {
      text: 'These days',
      color: 'purple',
      scale: 'large'
    },
    {
      blocks: [
        { text: 'I am a', semantic: 'neutral' },
        { dash: true },
      ],
      scaffold: true,
      color: 'dark'
    },
    {
      text: 'SOFTWARE ENGINEER',
      color: 'cyan',
      scale: 'massive'
    },
    {
      text: '&',
      color: 'dark',
      scale: 'medium'
    },
    {
      text: 'OPEN SOURCERER',
      color: 'pink',
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

# Demo: Sandwich Mode

<SandwichMode
  :top="{ text: 'In other words ...', class: 'band-green' }"
  :bottom="{ text: '... seriously', class: 'band-green' }"
  :top-delay="500"
  :bottom-delay="1500"
>
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    <img src="/img/blade-runner.gif" style="max-width: 80%; max-height: 80%;" />
  </div>
</SandwichMode>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# Demo: Label Mode

<LabelMode
  label="SONIC"
  semantic="technical"
  :character-animation="true"
  content-class="grid"
>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
    <img src="/img/sonic1.jpg" style="width: 100%; border-radius: 8px;" />
    <img src="/img/sonic2.jpg" style="width: 100%; border-radius: 8px;" />
    <img src="/img/sonic3.jpg" style="width: 100%; border-radius: 8px;" />
    <img src="/img/sonic4.jpg" style="width: 100%; border-radius: 8px;" />
  </div>
</LabelMode>

</KineticProvider>

---
layout: center
transition: slide-left
---

<KineticProvider :auto-start="true">

# Demo: Word Blocks with Scaffolding

<TypographicScaffold>
  <WordBlock semantic="neutral" scale="large" :delay="0">Speaking</WordBlock>
  <span class="scaffold-dash">—</span>
  <WordBlock semantic="emphasis" scale="massive" :delay="200">Truth</WordBlock>
  <span class="scaffold-dash">—</span>
  <WordBlock semantic="neutral" scale="medium" :delay="400">to</WordBlock>
  <span class="scaffold-dash">—</span>
  <WordBlock semantic="action" scale="massive" :delay="600">Power</WordBlock>
</TypographicScaffold>

<div style="margin-top: 2rem;">
  <WordBlock semantic="neutral" scale="medium" :delay="1000">(systems)</WordBlock>
</div>

</KineticProvider>

---
layout: center
---

# Component Structure

The **Word Block Atomic System** consists of:

<v-clicks>

### Core Components
- `KineticProvider` - Global rhythm and timing context
- `WordBlock` - Atomic typography unit with semantic colors
- `TypographicScaffold` - Em-dash grid system
- `CompressionZone` - Vertical space pressure creator

### Layout Modes
- `BandMode` - Vertical stacking of colored bands
- `SandwichMode` - Text bands framing media content
- `LabelMode` - Single word/phrase title cards

### Animation System
- `useKineticRhythm` - 0.5s heartbeat synchronization
- Progressive disclosure with configurable delays
- Spring-based motion with consistent timing

</v-clicks>

<style>
h1 {
  color: var(--color-emphasis, #f9c74f);
}

h3 {
  color: var(--color-technical, #4ecdc4);
  margin-top: 1.5rem;
}
</style>