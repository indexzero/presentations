# AI Agent Instructions for Kinetic Typography System

## Overview
This is an AI-first kinetic typography system for Slidev presentations. As an AI agent, you will convert user outlines into beautiful animated slides using a simple, predictable pattern.

## Your Role
1. User provides markdown outlines or content descriptions
2. You generate Vue components using ONLY the KineticSlide component
3. The system handles all complexity internally

## CRITICAL RULES
- **ALWAYS** use the KineticSlide component - no exceptions
- **NEVER** write custom CSS or animations
- **NEVER** create new components
- **ALWAYS** output the exact same Vue structure
- **DEFAULT** to safe values when uncertain

---

## Component Structure (USE THIS EXACTLY)

```vue
<template>
  <KineticSlide :spec="spec" />
</template>

<script setup>
const spec = {
  // Slide configuration object
}
</script>
```

That's it. Nothing else. Ever.

---

## Spec Object Structure

```javascript
const spec = {
  // OPTIONAL: Background image (from /sample/gifs/)
  background: "filename.gif",

  // OPTIONAL: Animation timing
  timing: "normal",  // instant | fast | normal | dramatic | slow

  // OPTIONAL: Line spacing default
  lineSpacing: "md",  // sm | md | lg | xl | xxl

  // OPTIONAL: Text alignment default
  align: "center",  // left | center | right

  // OPTIONAL: Background overlay opacity
  overlay: 0.7,  // 0-1

  // REQUIRED: Content sections
  sections: [
    // Section objects (see below)
  ]
}
```

---

## Section Types

### 1. Overlay Section (Text over background)
```javascript
{
  type: "overlay",
  lines: [
    {
      text: "The actual text",
      role: "hero",  // hero | connector | normal

      // OPTIONAL modifiers:
      color: "cyan",  // cyan | pink | green | yellow | purple | white
      size: "lg",  // sm | md | lg | xl | xxl (overrides role default)
      wings: "md",  // sm | md | lg | xl | xxl (scaffolding lines)
      align: "center",  // left | center | right
      spaceAfter: "xl",  // sm | md | lg | xl | xxl
      spaceBefore: "md",  // sm | md | lg | xl | xxl
      prefix: "—",  // Text before (like dashes)
      suffix: "—"   // Text after
    }
  ]
}
```

### 2. Bands Section (Full-width colored bands)
```javascript
{
  type: "bands",
  spacing: "md",  // sm | md | lg | xl | xxl
  bands: [
    {
      text: "BAND TEXT",
      background: "pink",  // pink | purple | green | yellow | dark
      size: "lg"  // sm | md | lg | xl | xxl
    }
  ]
}
```

---

## Conversion Examples

### User Input:
```markdown
Big dramatic opening with "Hello There" in cyan
Then "Let's Get Started" in pink
Over a hello.gif background
```

### Your Output:
```vue
<template>
  <KineticSlide :spec="spec" />
</template>

<script setup>
const spec = {
  background: "hello.gif",
  timing: "dramatic",
  overlay: 0.7,
  sections: [
    {
      type: "overlay",
      lines: [
        { text: "Hello There", role: "hero", color: "cyan", align: "center" },
        { text: "Let's Get Started", role: "hero", color: "pink", align: "center" }
      ]
    }
  ]
}
</script>
```

---

## Text Role Guidelines

### hero
- Large, compressed, uppercase text
- Use for main points, emphasis
- Default size: xl

### connector
- Small scaffolding text
- Use for transitions, connectors ("and", "but", "with")
- Often has wings (scaffolding lines)
- Default size: sm

### normal
- Standard text
- Use for regular content
- Default size: md

---

## Common Patterns

### Hero with Connector
```javascript
lines: [
  { text: "Why", role: "connector", wings: "md" },
  { text: "HELLO THERE", role: "hero", color: "cyan" },
  { text: "Let's", role: "connector", wings: "md" },
  { text: "GET STARTED", role: "hero", color: "pink" }
]
```

### Progressive Build
```javascript
lines: [
  { text: "First this appears", role: "normal" },
  { text: "Then this", role: "normal", spaceAfter: "lg" },
  { text: "THEN THIS", role: "hero", color: "green" }
]
```

### Mixed Sections (Overlay + Bands)
```javascript
sections: [
  {
    type: "overlay",
    lines: [
      { text: "Text over background", role: "hero", color: "white" }
    ]
  },
  {
    type: "bands",
    spacing: "sm",
    bands: [
      { text: "FIRST BAND", background: "pink", size: "lg" },
      { text: "SECOND BAND", background: "purple", size: "lg" }
    ]
  }
]
```

---

## Timing Considerations

- **instant**: All elements appear at once (0ms delay)
- **fast**: Quick succession (150ms between elements)
- **normal**: Standard pacing (300ms between elements)
- **dramatic**: Slow reveal (500ms between elements)
- **slow**: Very slow (750ms between elements)

Choose based on content:
- Technical details: fast/normal
- Dramatic reveals: dramatic/slow
- Lists/bands: fast/instant

---

## Color Semantics

- **cyan**: Primary emphasis, positive
- **pink**: Secondary emphasis, important
- **green**: Success, achievement, positive
- **yellow**: Warning, attention, highlight
- **purple**: Special, unique, premium
- **white**: Default, neutral

---

## Common Mistakes to Avoid

❌ **DON'T** create custom components
❌ **DON'T** write CSS
❌ **DON'T** use HTML elements directly
❌ **DON'T** try to control animations manually
❌ **DON'T** use colors not in the palette

✅ **DO** use the KineticSlide component
✅ **DO** stick to the predefined options
✅ **DO** default to "normal" and "center" when unsure
✅ **DO** use roles appropriately
✅ **DO** test with actual GIF files in /sample/gifs/

---

## Frontmatter Integration

Each slide can have frontmatter for page-level settings:

```markdown
---
background: hello.gif
timing: dramatic
lineSpacing: lg
align: center
---
```

Then use these values in your spec object.

---

## Complete Working Example

### User Request:
"Create a slide introducing Charlie Robbins as a software engineer and open sourcerer with his handle @indexzero and that his code was downloaded 500M times. Use working-homer.gif as background."

### Your Response:

```vue
<template>
  <KineticSlide :spec="spec" />
</template>

<script setup>
const spec = {
  background: "working-homer.gif",
  timing: "normal",
  overlay: 0.7,
  sections: [
    {
      type: "overlay",
      lines: [
        { text: "SOFTWARE ENGINEER", role: "hero", color: "white", align: "center" },
        { text: "&", role: "connector", wings: "sm", align: "center" },
        { text: "OPEN SOURCERER", role: "hero", color: "green", align: "center", spaceAfter: "xl" }
      ]
    },
    {
      type: "bands",
      spacing: "sm",
      bands: [
        { text: "@INDEXZERO", background: "pink", size: "md" },
        { text: "CODE DOWNLOADED", background: "purple", size: "md" },
        { text: "500M TIMES", background: "dark", size: "lg" }
      ]
    }
  ]
}
</script>
```

---

## Code Blocks and Shiki Magic Move

### Standard Code Blocks

For slides with code, use Slidev's native code block support OUTSIDE of KineticSlide:

```markdown
---
background: cat-run-type.gif
---

<div class="k-overlay k-text-backdrop">

```javascript
// The Putument™ - Mikeal's most ingenious design
function createPutument(pkg) {
  return {
    _id: pkg.name,
    name: pkg.name,
    'dist-tags': { latest: pkg.version },
    versions: { [pkg.version]: pkg }
  }
}
```

</div>
```

### Shiki Magic Move

For animated code transitions, use the magic-move directive:

````markdown
---
layout: center
---

# Code Evolution

````md magic-move
```js
console.log(`Step ${1}`)
```
```js
console.log(`Step ${1 + 1}`)
```
```ts
console.log(`Step ${3}` as string)
```
````
````

### Mixing Code with Kinetic Elements

You can combine both on the same slide:

```markdown
---
timing: fast
---

<template>
  <KineticSlide :spec="heroSpec" />
</template>

<script setup>
const heroSpec = {
  sections: [
    {
      type: "overlay",
      lines: [
        { text: "THE PUTUMENT™", role: "hero", color: "green", align: "center" },
        { text: "Mikeal's most ingenious design", role: "connector", align: "center", spaceAfter: "xl" }
      ]
    }
  ]
}
</script>

```javascript
// Actual implementation
function createPutument(pkg) {
  return {
    _id: pkg.name,
    name: pkg.name,
    'dist-tags': { latest: pkg.version },
    versions: { [pkg.version]: pkg }
  }
}
```
```

### Code Highlighting

Use Shiki's line highlighting syntax:

```markdown
```js {2-4,6}
const spec = {
  background: "hello.gif",  // This line highlighted
  timing: "dramatic",       // This line highlighted
  overlay: 0.7,            // This line highlighted
  sections: [
    // This line highlighted
  ]
}
```
```

### Guidelines for Code Slides

1. **Simple code examples**: Use standard markdown code blocks
2. **Code evolution**: Use magic-move for step-by-step changes
3. **Code with context**: Combine KineticSlide header + code block
4. **Background with code**: Wrap in `<div class="k-overlay k-text-backdrop">` for readability

### Common Code Patterns

#### Pattern 1: Feature Introduction
```markdown
<KineticSlide with hero text: "THE FEATURE">
<Code block showing implementation>
```

#### Pattern 2: Progressive Reveal
```markdown
````md magic-move
```js
// Step 1: Basic structure
function myFunction() {}
```
```js
// Step 2: Add logic
function myFunction(data) {
  return process(data)
}
```
````
```

#### Pattern 3: Code Over GIF
```markdown
---
background: coding.gif
---

<div class="k-overlay k-text-backdrop">

```javascript
// Code with enhanced readability
```

</div>
```

---

## Summary

Your job is simple:
1. Parse user intent
2. Map to spec structure
3. Output KineticSlide component
4. Never deviate from the pattern

The system handles all the complexity. You just describe what should appear, in what order, with what styling from the predefined options.

**Remember**: This is infrastructure as performance art. Make technical content exciting through motion, but always within the constraints of the system.

---

## Quick Reference

### Sizes (5 levels)
`sm` | `md` | `lg` | `xl` | `xxl`

### Colors (6 options)
`cyan` | `pink` | `green` | `yellow` | `purple` | `white`

### Roles (3 types)
`hero` | `connector` | `normal`

### Timing (5 speeds)
`instant` | `fast` | `normal` | `dramatic` | `slow`

### Alignment (3 options)
`left` | `center` | `right`

### Backgrounds (5 options)
`pink` | `purple` | `green` | `yellow` | `dark`

---

*"The user writes stories. Claude writes code. The system creates magic."*