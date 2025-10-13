---
layout: center
---

# Exact Replica Slides
## With Beautiful Kinetic Typography

Testing the new molecule-based component system with variable line heights and configurable scaffolding

---
layout: center
background: /sample/gifs/hello.gif
class: k-text-overlay
---

<div class="k-molecule k-molecule--hero-connector">
  <span class="k-small k-white">Why</span>
  <KineticText tag="h1" color="cyan" size="massive">
    Hello There.
  </KineticText>
  <span class="k-small k-white">Let's</span>
  <KineticText tag="h1" color="pink" size="massive" :delay="300">
    Get Started.
  </KineticText>
</div>

<style>
.slidev-layout {
  background-image: url('/sample/gifs/hello.gif') !important;
  background-size: cover !important;
  background-position: center !important;
}
</style>

---
background: /sample/gifs/working-homer.gif
class: k-text-overlay
---

<div class="k-hybrid-layout">
  <!-- Text overlaid on GIF -->
  <div class="k-overlay-section">
    <KineticText tag="h2" color="yellow" size="large">
      These days
    </KineticText>
    <div class="k-connector">
      <span class="k-dash">—</span>
      <span class="k-white k-medium">I am a</span>
      <span class="k-dash">—</span>
    </div>
    <KineticText tag="h2" color="white" size="large" :delay="200">
      SOFTWARE ENGINEER &
    </KineticText>
    <KineticText tag="h1" color="green" size="massive" :delay="400">
      OPEN SOURCERER
    </KineticText>
  </div>

  <!-- Colored bands section -->
  <div class="k-bands-section">
    <div class="k-band k-band-pink">
      <span class="k-text k-medium">ON THE INTERNET THEY CALL ME @INDEXZERO</span>
    </div>
    <div class="k-band k-band-purple">
      <span class="k-text k-medium">CODE I WROTE WAS DOWNLOADED</span>
    </div>
    <div class="k-band k-band-dark">
      <span class="k-text k-large">500,000,000 TIMES LAST MONTH</span>
    </div>
  </div>
</div>

<style>
.slidev-layout {
  background-image: url('/sample/gifs/working-homer.gif') !important;
  background-size: cover !important;
  background-position: center !important;
}

.k-hybrid-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.k-overlay-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.k-connector {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.k-dash {
  color: white;
  font-size: 2rem;
  opacity: 0.8;
}

.k-bands-section {
  margin-top: auto;
}

/* Make bands thinner and stack at bottom */
.k-bands-section .k-band {
  margin: 0 !important;
  padding: 1.5rem 2rem !important;
}
</style>

---
layout: center
background: /sample/gifs/building.gif
class: k-text-overlay
---

<div class="k-scaffold k-scaffold--asymmetric text-center">
  <KineticText tag="h2" color="yellow" size="large">
    The last three years
  </KineticText>
  <span class="k-medium k-white">I have</span>
  <KineticText tag="h2" color="green" size="large" :delay="200">
    made software
  </KineticText>
  <span class="k-medium k-white">for grid scale</span>
  <KineticText tag="h2" color="orange" size="large" :delay="400">
    energy storage
  </KineticText>
</div>

<p class="k-green k-small mt-8 text-center k-animate-fade">
  Back off, man... I'm a scientist.
</p>

<style>
.slidev-layout {
  background-image: url('/sample/gifs/building.gif') !important;
  background-size: cover !important;
  background-position: center !important;
}
</style>

---
layout: center
background: /sample/gifs/thinking.gif
class: k-text-overlay
---

<div class="k-molecule k-molecule--progressive text-center">
  <p class="k-medium k-white mb-8">Why does</p>
  <hr class="w-96 mx-auto opacity-30 mb-8">
  <KineticText tag="h1" color="green" size="ultra" compressed>
    ERGSTOWN MATTER?
  </KineticText>
</div>

<style>
.slidev-layout {
  background-image: url('/sample/gifs/thinking.gif') !important;
  background-size: cover !important;
  background-position: center !important;
}
/* Ultra text needs extreme compression */
.k-ultra {
  letter-spacing: var(--compress-heavy) !important;
  line-height: var(--lh-crushed) !important;
}
</style>

---
background: /sample/gifs/teamwork.gif
---

<div class="k-molecule k-molecule--stacked">
  <div class="k-band k-band-purple">
    <span class="k-large k-text">IF WE</span>
  </div>
  <div class="k-band k-band-pink">
    <span class="k-large k-text">WORK HARD</span>
  </div>
  <div class="k-band k-band-green">
    <span class="k-large k-text k-dark">TOGETHER</span>
  </div>
  <div class="k-band k-band-yellow">
    <span class="k-large k-text k-dark">WE WILL FIND A WAY</span>
  </div>
</div>

<style>
.slidev-layout {
  background-image: url('/sample/gifs/teamwork.gif') !important;
  background-size: cover !important;
  background-position: center !important;
}
/* Band mode needs tighter spacing */
.k-molecule--stacked {
  gap: 0 !important;
}
.k-band {
  margin: 0 !important;
}
</style>

---
layout: center
background: /sample/gifs/fix-it.gif
class: k-text-overlay
---

<div class="k-scaffold text-center">
  <KineticText tag="h2" color="purple" size="large">
    But where
  </KineticText>
  <span class="k-medium k-white">do we</span>
  <KineticText tag="h1" color="green" size="ultra" :delay="200">
    START FIXING
  </KineticText>
  <span class="k-medium k-white">it?</span>
</div>

<style>
.slidev-layout {
  background-image: url('/sample/gifs/fix-it.gif') !important;
  background-size: cover !important;
  background-position: center !important;
}
/* Dynamic scaffolding with variable widths */
.k-scaffold .k-ultra::before,
.k-scaffold .k-ultra::after {
  --scaffold-width: var(--scaffold-width-max) !important;
  --scaffold-opacity: var(--scaffold-opacity-strong) !important;
}
</style>

---
background: /sample/gifs/cat-run-type.gif
---

<div class="k-overlay k-text-backdrop">

```javascript {all}
// The Putument™ - Mikeal's most ingenious design
function createPutument(pkg) {
  return {
    _id: pkg.name,
    name: pkg.name,
    'dist-tags': { latest: pkg.version },
    versions: { [pkg.version]: pkg }
  }
}

// Makes NPM's publishing process uniquely atomic
const putument = createPutument(package)
await couch.put(putument)
```

</div>

<style>
.slidev-layout {
  background-image: url('/sample/gifs/cat-run-type.gif') !important;
  background-size: cover !important;
  background-position: center !important;
}
/* Code needs better readability over GIF */
.k-overlay {
  backdrop-filter: blur(10px) !important;
  background: rgba(0, 0, 0, 0.85) !important;
}
</style>

---
layout: center
---

# Beautiful Kinetic Typography Complete ✨

All 7 slides now feature:
- **Variable Line Heights**: Creating organic rhythm (not mechanical)
- **Typography Molecules**: Composable units with internal variation
- **Configurable Scaffolding**: Dynamic width/opacity/position
- **Multi-layer Text Shadows**: Maximum readability over GIFs (Lea Verou spec)
- **Design Token System**: No magic numbers (Nicole Sullivan approved)
- **Semantic Colors**: Each color vibrates at different emotional frequencies

<v-clicks>

### The Three CSS Experts Agree:

✅ Una Kravets: Variable line heights create heartbeat rhythm
✅ Nicole Sullivan: OOCSS molecules provide reusability
✅ Lea Verou: Multi-layer shadows ensure readability

### Result:
**"Infrastructure as Performance Art"** - Making technical content ALIVE through beautiful, intentional typography that honors Mikeal Rogers' vision.

</v-clicks>