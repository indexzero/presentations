# Kinetic Typography Design Tokens
## 5-Level System for JSConf Presentation

This document outlines the 5-level design token system used in the KineticSlide component for consistent, scalable typography and spacing.

---

## Font Sizes (5 Levels: sm, md, lg, xl, xxl)

These sizes use CSS `clamp()` for responsive scaling between minimum and maximum values.

| Level | CSS Value | Min → Max | Use Case |
|-------|-----------|-----------|----------|
| **sm** | `clamp(1.25rem, 2.5vw, 1.75rem)` | 20px → 28px | Connectors, small text |
| **md** | `clamp(2rem, 4vw, 3rem)` | 32px → 48px | Normal text, paragraphs |
| **lg** | `clamp(3rem, 6vw, 5rem)` | 48px → 80px | Large statements |
| **xl** | `clamp(5rem, 10vw, 8rem)` | 80px → 128px | Hero text |
| **xxl** | `clamp(7rem, 14vw, 12rem)` | 112px → 192px | Massive impact |

### Role-Based Defaults
- **hero**: xl (80-128px)
- **connector**: sm (20-28px)
- **normal**: md (32-48px)

---

## Line Spacing (5 Levels: sm, md, lg, xl, xxl)

Controls the vertical gap between lines in a section.

| Level | CSS Value | Pixels | Use Case |
|-------|-----------|--------|----------|
| **sm** | `0.5rem` | 8px | Tight grouping |
| **md** | `1rem` | 16px | Default spacing |
| **lg** | `1.5rem` | 24px | Comfortable reading |
| **xl** | `2.5rem` | 40px | Section breaks |
| **xxl** | `4rem` | 64px | Major separations |

---

## Space Before/After (5 Levels: sm, md, lg, xl, xxl)

Individual line margins for fine control.

| Level | Before (margin-top) | After (margin-bottom) | Use Case |
|-------|-------------------|---------------------|----------|
| **sm** | `0.25rem` (4px) | `0.25rem` (4px) | Minimal spacing |
| **md** | `0.5rem` (8px) | `0.5rem` (8px) | Subtle separation |
| **lg** | `1rem` (16px) | `1rem` (16px) | Clear separation |
| **xl** | `2rem` (32px) | `2rem` (32px) | Section divider |
| **xxl** | `3rem` (48px) | `3rem` (48px) | Major break |

---

## Wings/Scaffolding (5 Levels: sm, md, lg, xl, xxl)

Horizontal lines extending from connector text for visual hierarchy.

| Level | Width | Opacity | Use Case |
|-------|-------|---------|----------|
| **sm** | `50px` | 0.3 | Subtle connection |
| **md** | `100px` | 0.3 | Standard connector |
| **lg** | `150px` | 0.3 | Emphasis connector |
| **xl** | `200px` | 0.3 | Strong division |
| **xxl** | `300px` | 0.3 | Maximum extension |

### Wing Characteristics
- **Height**: 1px (consistent across all levels)
- **Color**: White with 30% opacity
- **Position**: Center-aligned with text baseline
- **Spacing**: 1.5rem gap from text

---

## Band Spacing (5 Levels: sm, md, lg, xl, xxl)

Vertical gaps between full-width colored bands.

| Level | Gap Value | Pixels | Use Case |
|-------|-----------|--------|----------|
| **sm** | `0` | 0px | No gap (touching) |
| **md** | `2px` | 2px | Hairline separation |
| **lg** | `4px` | 4px | Clear distinction |
| **xl** | `8px` | 8px | Strong separation |
| **xxl** | `16px` | 16px | Major gaps |

---

## Animation Timing (5 Levels: instant, fast, normal, dramatic, slow)

Controls the delay between animated elements appearing.

| Level | Delay (ms) | Use Case |
|-------|------------|----------|
| **instant** | 0ms | No animation |
| **fast** | 150ms | Quick succession |
| **normal** | 300ms | Standard pacing |
| **dramatic** | 500ms | Build tension |
| **slow** | 750ms | Maximum drama |

---

## Usage Examples

```javascript
// Hero text with large spacing
{
  text: "MIKEAL ROGERS",
  role: "hero",        // → xl font size
  color: "green",
  spaceAfter: "xl"     // → 32px margin after
}

// Connector with wings
{
  text: "taught me about",
  role: "connector",   // → sm font size
  wings: "md",         // → 100px horizontal lines
  align: "center"
}

// Section with custom sizing
{
  type: "overlay",
  lineSpacing: "lg",   // → 24px between lines
  lines: [...]
}
```

---

## Design Philosophy

This 5-level system provides:

1. **Consistency**: Same scale across all properties
2. **Predictability**: sm < md < lg < xl < xxl always
3. **Flexibility**: Mix and match for any design need
4. **Responsiveness**: Clamp() functions ensure mobile-friendly scaling
5. **Accessibility**: Minimum sizes ensure readability

The system honors Mikeal Rogers' vision: infrastructure should be simple, scalable, and universally accessible.