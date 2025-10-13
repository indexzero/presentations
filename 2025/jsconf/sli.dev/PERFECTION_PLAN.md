# PERFECTION PLAN
## AI-First Kinetic Typography System for Slidev

*A collaboration between Anthony Fu (Vue/Slidev), Una Kravets (CSS), and Lea Verou (UX/Eigensolutions)*

---

## Core Insight
**The user writes simple markdown outlines. Claude (the AI) generates beautiful kinetic slides.**

This is not a framework for human developers - it's a framework optimized for AI generation patterns. Every design decision prioritizes predictability, forgiveness, and deterministic output.

---

## 1. INPUT LAYER: The Markdown DSL

### Basic Syntax
```markdown
---
background: hello.gif
timing: dramatic       # slow (500ms), normal (300ms), fast (150ms), instant (0ms)
transition: fade       # fade, slide-up, slide-left, slide-right, bounce
line-spacing: lg       # sm, md, lg, xl, xxl - space between lines
align: center          # left, center, right - default alignment
---
__Why__ [align:center, space-after:xl]     # Centered with extra space after
*Hello There* [cyan, align:center]         # Hero text centered
__Let's__ [align:center, space-after:xl]   # Another connector with spacing
*Get Started* [pink, align:center]         # Another hero

---
background: working-homer.gif
timing: fast
line-spacing: sm       # Tight spacing for this slide
---
These days [align:center]                  # Regular text centered
_— I am a —_ [align:center, space-after:md]  # Text with dashes
SOFTWARE ENGINEER & [align:center]         # Regular emphasis
*OPEN SOURCERER* [green, align:center, space-after:xl]  # Hero with space
---                                        # Separator = switch to bands
@INDEXZERO [band:pink]                     # Band section
CODE DOWNLOADED [band:purple]
500M TIMES [band:dark]
```

### Notation System
- `*text*` = Hero/emphasized text (large, compressed)
- `_text_` = Small scaffolding lines
- `__text__` = Medium scaffolding lines
- `___text___` = Large scaffolding lines
- `[color]` = Color annotation (cyan, pink, green, yellow, purple, white)
- `[align:left/center/right]` = Text alignment for that line
- `[space-after:sm/md/lg/xl/xxl]` = Extra space after this line
- `[space-before:sm/md/lg/xl/xxl]` = Extra space before this line
- `[band:color]` = Full-width band with background
- `---` = Section separator (switches from overlay to bands)
- `// comment` = Notes (ignored in output)

### Frontmatter Options
```yaml
background: filename.gif   # GIF/image background
timing: dramatic          # Animation pacing preset
transition: fade          # Entry animation style
overlay: 0.7             # Background overlay opacity
theme: vibrant           # Color theme preset
line-spacing: md         # Default spacing between lines (sm/md/lg/xl/xxl)
align: center            # Default text alignment (left/center/right)
```

---

## 2. PARSING LAYER: AI Understanding

Claude reads the markdown and creates a structured spec:

```javascript
{
  background: "hello.gif",
  timing: "dramatic",
  transition: "fade",
  lineSpacing: "lg",      // Default from frontmatter
  align: "center",        // Default from frontmatter
  sections: [
    {
      type: "overlay",
      lines: [
        { text: "Why", role: "connector", wings: "md", align: "center", spaceAfter: "xl" },
        { text: "Hello There", role: "hero", color: "cyan", align: "center" },
        { text: "Let's", role: "connector", wings: "md", align: "center", spaceAfter: "xl" },
        { text: "Get Started", role: "hero", color: "pink", align: "center" }
      ]
    }
  ]
}
```

**Key Rules for AI:**
1. ALWAYS parse into this exact structure
2. NEVER create custom CSS or animations
3. ALWAYS use predefined roles and colors
4. DEFAULT to safe values when uncertain

---

## 3. OUTPUT LAYER: Single Component

Claude ALWAYS generates the same Vue component structure:

```vue
<template>
  <KineticSlide :spec="spec" />
</template>

<script setup>
const spec = {
  background: "hello.gif",
  timing: "dramatic",
  sections: [
    {
      type: "overlay",
      lines: [
        { text: "Why", role: "connector", scaffold: "medium" },
        { text: "Hello There", role: "hero", color: "cyan" },
        { text: "Let's", role: "connector", scaffold: "medium" },
        { text: "Get Started", role: "hero", color: "pink" }
      ]
    }
  ]
}
</script>
```

**No variations. No conditions. Always KineticSlide with a spec.**

---

## 4. COMPONENT IMPLEMENTATION

### The Master Component: KineticSlide.vue

```vue
<template>
  <div class="kinetic-slide" :class="slideClasses">
    <!-- Background -->
    <div class="k-background" v-if="spec.background">
      <img :src="`/sample/gifs/${spec.background}`" />
      <div class="k-overlay" :style="{opacity: spec.overlay || 0.7}" />
    </div>

    <!-- Content -->
    <div class="k-content">
      <template v-for="(section, idx) in spec.sections" :key="idx">

        <!-- Overlay Section -->
        <div v-if="section.type === 'overlay'" class="k-overlay-section">
          <div v-for="(line, lineIdx) in section.lines" :key="lineIdx"
               class="k-line"
               :class="getLineClasses(line)"
               :style="getLineStyle(lineIdx)">

            <!-- Scaffolding -->
            <span v-if="line.scaffold"
                  class="k-scaffold"
                  :class="`k-scaffold-${line.scaffold}`" />

            <!-- Text -->
            <span class="k-text">{{ line.text }}</span>

            <!-- Right scaffold -->
            <span v-if="line.scaffold"
                  class="k-scaffold k-scaffold-right"
                  :class="`k-scaffold-${line.scaffold}`" />
          </div>
        </div>

        <!-- Band Section -->
        <div v-if="section.type === 'bands'" class="k-bands-section">
          <div v-for="(band, bandIdx) in section.bands" :key="bandIdx"
               class="k-band"
               :class="`k-band-${band.color}`"
               :style="getBandStyle(bandIdx)">
            {{ band.text }}
          </div>
        </div>

      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['spec'])

// Timing presets
const timingMap = {
  instant: 0,
  fast: 150,
  normal: 300,
  dramatic: 500
}

const getLineClasses = (line) => {
  return [
    `k-role-${line.role}`,
    line.color ? `k-color-${line.color}` : '',
    line.scaffold ? 'has-scaffold' : ''
  ]
}

const getLineStyle = (index) => {
  const delay = timingMap[props.spec.timing || 'normal']
  return {
    animationDelay: `${index * delay}ms`
  }
}

const getBandStyle = (index) => {
  const delay = timingMap[props.spec.timing || 'normal']
  const baseDelay = props.spec.sections[0].lines.length * delay
  return {
    animationDelay: `${baseDelay + (index * delay)}ms`
  }
}
</script>
```

---

## 5. CSS UTILITY SYSTEM

### Core Classes (in kinetic.css)

```css
/* Roles */
.k-role-hero {
  font-size: var(--size-massive);
  line-height: var(--lh-crushed);
  letter-spacing: var(--compress-medium);
  font-weight: 900;
  text-transform: uppercase;
}

.k-role-connector {
  font-size: var(--size-small);
  line-height: var(--lh-loose);
  opacity: 0.9;
}

/* Colors */
.k-color-cyan { color: #00ffff; }
.k-color-pink { color: #ff006e; }
.k-color-green { color: #00ff00; }
.k-color-yellow { color: #ffff00; }
.k-color-purple { color: #9945ff; }
.k-color-white { color: #ffffff; }

/* Scaffolding */
.k-scaffold-small::before { width: 100px; }
.k-scaffold-medium::before { width: 200px; }
.k-scaffold-large::before { width: 300px; }

/* Bands */
.k-band-pink { background: #ff006e; }
.k-band-purple { background: linear-gradient(135deg, #667eea, #764ba2); }
.k-band-dark { background: rgba(0,0,0,0.8); }

/* Animations */
@keyframes k-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes k-slide-up {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.k-line {
  animation: k-slide-up 0.5s backwards;
}

.k-band {
  animation: k-slide-in 0.5s backwards;
}
```

---

## 6. ERROR HANDLING & DEFAULTS

### Every Input Works
- Missing color? Default to white
- Missing role? Infer from text size/position
- Missing timing? Default to "normal"
- Missing background? Solid dark background
- Typo in color? Closest match

### AI Instructions Template

```markdown
When converting user markdown to slides:

1. Parse the markdown into sections
2. Identify text roles (hero vs connector)
3. Extract color and scaffold annotations
4. Create the spec object
5. Always use KineticSlide component
6. Never write custom CSS
7. Never add custom animations
8. If unsure, use defaults
```

---

## 7. Example Conversions

### Input (User Writes):
```markdown
---
background: hello.gif
timing: dramatic
---
__Why__
*Hello There* [cyan]
__Let's__
*Get Started* [pink]
```

### Output (Claude Generates):
```vue
<template>
  <KineticSlide :spec="spec" />
</template>

<script setup>
const spec = {
  background: "hello.gif",
  timing: "dramatic",
  sections: [
    {
      type: "overlay",
      lines: [
        { text: "Why", role: "connector", scaffold: "medium" },
        { text: "Hello There", role: "hero", color: "cyan" },
        { text: "Let's", role: "connector", scaffold: "medium" },
        { text: "Get Started", role: "hero", color: "pink" }
      ]
    }
  ]
}
</script>
```

---

## 8. Benefits of This Approach

### For the User:
- Write simple, readable markdown
- Focus on content, not code
- Consistent, beautiful results
- Easy to maintain and update

### For Claude (AI):
- Deterministic output pattern
- No complex decisions
- Clear parsing rules
- Forgiving error handling

### For the System:
- One component handles everything
- CSS utilities provide all variations
- Predictable animation timing
- Maintainable and extensible

---

## 9. Implementation Checklist

- [ ] Create KineticSlide.vue master component
- [ ] Update kinetic.css with role-based classes
- [ ] Create markdown parser helper
- [ ] Write AI instruction template
- [ ] Test with all example slides
- [ ] Document edge cases
- [ ] Create slide templates library

---

## Conclusion

This is **Eigensolution thinking** applied to AI-first development:
- The user describes WHAT they want in natural patterns
- The AI converts reliably to HOW it's implemented
- The component system handles ALL complexity internally
- Every combination produces beautiful results

**The user writes stories. Claude writes code. The system creates magic.**

---

*"The best interface is no interface - just intention made manifest."*
- Synthesized wisdom of Anthony Fu, Una Kravets, and Lea Verou