# The Content Addressable Web

**Lessons from NPM, CouchDB, and Mikeal Rogers**

A presentation by Charlie Robbins at JSConf

## About This Talk

After almost 20 years of npm, what have we learned? This talk explores Mikeal Rogers' vision that "the web isn't finished" and how it applies to modern infrastructure challenges, from npm's scaling journey to federated registries and climate data.

## Key Topics

- **Mikeal's Vision**: The unfinished web and public infrastructure
- **The Putument™**: NPM's atomic publishing design
- **CouchDB Architecture**: `_changes`, `_all_docs`, and tombstones
- **Federated Registries**: Building shared infrastructure
- **Scaling Challenges**: From 340k to 3.4M packages
- **Partition Solutions**: Breaking down `_all_docs` with lexicographic pivots
- **Climate Data Parallels**: Immutable data and Zarr
- **Download Counts**: 124 billion data points problem

## Running the Presentation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Export to PDF
npm run export

# Deploy to Cloudflare Pages
npm run deploy
```

## Deployment to Cloudflare Pages

### Option 1: Using Wrangler CLI
```bash
npm run deploy
```

### Option 2: Git Integration
Connect your repository in Cloudflare Pages Dashboard with:
- Build command: `npm run build`
- Build output directory: `dist`

## Development

The presentation is built with [Slidev](https://sli.dev) using:
- `slides.md` - Main entry point that imports all slides
- `/slides/` - Individual slide files organized by section:
  - `00-intro/` - Introduction and title slides
  - `01-mikeal-tribute/` - Mikeal Rogers' vision
  - `02-npm-history/` - NPM origins and The Putument™
  - `03-couchdb-tech/` - CouchDB technical foundations
  - `04-federation/` - Federation concepts
  - `05-scale-problems/` - Scaling challenges
  - `06-solutions/` - Technical solutions
  - `07-climate-data/` - Climate data connections
  - `08-closing/` - MikealConf and resources

## Structure

The talk follows a narrative arc:
1. Opening with Mikeal's vision
2. Technical foundations (CouchDB, NPM)
3. Scaling challenges and solutions
4. Future vision for federated infrastructure
5. Emotional close honoring Mikeal

## Speaker Notes

Each slide includes speaker notes in HTML comments to guide the presentation. Press `P` to enter presenter mode to see them.

## About the Speaker

**Charlie Robbins** (@indexzero)
- Principal Engineer @ Chainguard
- Founder of Nodejitsu 🥷
- ~20 years in the npm ecosystem

## Resources

- [@_all_docs/cache](https://github.com/indexzero/_all_docs)
- [PKV Manifesto](https://github.com/mikeal/pkv)
- [Original npm registry](https://github.com/npm/npm-registry-couchapp)

## MikealConf

A tribute event to remember and celebrate Mikeal Rogers' contributions to the web.

---

*"The web isn't finished"* - Mikeal Rogers