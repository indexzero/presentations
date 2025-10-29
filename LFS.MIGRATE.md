# Git LFS Migration Guide

This guide helps you migrate files that should be in Git LFS but currently aren't, and resolve LFS pointer issues.

## Common Issues and Quick Fixes

### Issue: "Encountered files that should have been pointers, but weren't"
When running `git restore` commands, you might see:
```
Encountered 4 files that should have been pointers, but weren't:
        2016/chicago-nodejs/chicago-nodejs.key
        2016/chicago-nodejs/chicago-nodejs.pdf
        2016/nodejs-interactive-warehouse/nodejs-interactive-warehouse.key
        2016/nodejs-interactive-warehouse/nodejs-interactive-warehouse.pdf
```

#### Quick Fix for Specific Files
```bash
# Option 1: Force restore using checkout
git checkout HEAD -- 2016/chicago-nodejs/chicago-nodejs.pdf
git checkout HEAD -- 2016/nodejs-interactive-warehouse/nodejs-interactive-warehouse.key
git checkout HEAD -- 2016/nodejs-interactive-warehouse/nodejs-interactive-warehouse.pdf

# Option 2: Remove and restore
rm 2016/chicago-nodejs/chicago-nodejs.pdf
rm 2016/nodejs-interactive-warehouse/nodejs-interactive-warehouse.key
rm 2016/nodejs-interactive-warehouse/nodejs-interactive-warehouse.pdf
git restore 2016/

# Option 3: Use LFS pull
git lfs pull
```

## Full Migration Process

### Step 1: Check Current LFS Configuration

```bash
# View current LFS tracking rules
cat .gitattributes
# or
git lfs track

# List files currently in LFS
git lfs ls-files

# Check LFS status
git lfs status
```

### Step 2: Identify Files Needing Migration

```bash
# List all files currently in LFS
git lfs ls-files > /tmp/current-lfs-files.txt

# Find all files matching LFS patterns in .gitattributes
git ls-files | git check-attr --stdin filter | grep 'filter: lfs' | cut -d: -f1 > /tmp/should-be-lfs.txt

# Find files that should be LFS but aren't
comm -13 <(sort /tmp/current-lfs-files.txt | cut -d' ' -f3-) <(sort /tmp/should-be-lfs.txt)
```

### Step 3: Migration Options

#### Option A: Migrate Without Rewriting History (Recommended for Quick Fixes)
This is the safest option if you just want to fix the current state:

```bash
# Migrate specific files
git lfs migrate import --no-rewrite --include="2016/chicago-nodejs/chicago-nodejs.key,2016/chicago-nodejs/chicago-nodejs.pdf,2016/nodejs-interactive-warehouse/nodejs-interactive-warehouse.key,2016/nodejs-interactive-warehouse/nodejs-interactive-warehouse.pdf"

# Or migrate by file type
git lfs migrate import --no-rewrite --include="*.pdf,*.key"
```

#### Option B: Migrate Specific File Types Across All History
⚠️ **Warning:** This rewrites Git history and requires force pushing!

```bash
# Check what would be migrated (dry run)
git lfs migrate info --everything

# Migrate specific file types
git lfs migrate import --include="*.pdf,*.key,*.psd,*.ai,*.sketch" --everything
```

#### Option C: Comprehensive Migration with Multiple Patterns
```bash
# Migrate multiple file types across all branches and tags
git lfs migrate import --everything \
  --include="*.pdf" \
  --include="*.key" \
  --include="*.psd" \
  --include="*.ai" \
  --include="*.sketch" \
  --include="*.fig" \
  --include="*.zip" \
  --include="*.dmg" \
  --include="*.mp4" \
  --include="*.mov"
```

### Step 4: Verify Migration

```bash
# List files now in LFS
git lfs ls-files

# Verify specific file is a pointer
git lfs pointer --check --file <filename>

# Check LFS integrity
git lfs fsck

# View LFS status
git lfs status
```

### Step 5: Clean Up and Push

```bash
# Clean up old LFS objects
git lfs prune

# Push LFS objects to remote
git lfs push --all origin

# If history was rewritten, force push (coordinate with team first!)
git push --force-with-lease origin master
```

## Common LFS Tracking Patterns

Add these to your `.gitattributes` file to automatically track common binary files:

```gitattributes
# Documents
*.pdf filter=lfs diff=lfs merge=lfs -text
*.doc filter=lfs diff=lfs merge=lfs -text
*.docx filter=lfs diff=lfs merge=lfs -text

# Presentations
*.key filter=lfs diff=lfs merge=lfs -text
*.ppt filter=lfs diff=lfs merge=lfs -text
*.pptx filter=lfs diff=lfs merge=lfs -text

# Design files
*.psd filter=lfs diff=lfs merge=lfs -text
*.ai filter=lfs diff=lfs merge=lfs -text
*.sketch filter=lfs diff=lfs merge=lfs -text
*.fig filter=lfs diff=lfs merge=lfs -text
*.xd filter=lfs diff=lfs merge=lfs -text

# Archives
*.zip filter=lfs diff=lfs merge=lfs -text
*.tar filter=lfs diff=lfs merge=lfs -text
*.gz filter=lfs diff=lfs merge=lfs -text
*.7z filter=lfs diff=lfs merge=lfs -text
*.dmg filter=lfs diff=lfs merge=lfs -text

# Media
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.mov filter=lfs diff=lfs merge=lfs -text
*.avi filter=lfs diff=lfs merge=lfs -text
*.mp3 filter=lfs diff=lfs merge=lfs -text
*.wav filter=lfs diff=lfs merge=lfs -text

# Images (optional, for very large images)
*.jpg filter=lfs diff=lfs merge=lfs -text
*.jpeg filter=lfs diff=lfs merge=lfs -text
*.png filter=lfs diff=lfs merge=lfs -text
*.gif filter=lfs diff=lfs merge=lfs -text
```

## Important Considerations

### Before Migration

1. **Backup your repository** - Migration can rewrite history
2. **Coordinate with team** - If rewriting history, others will need to re-clone or rebase
3. **Check storage limits** - Large migrations might hit LFS storage limits
4. **Test on a branch first** - Try migrations on a test branch before applying to main

### Common Troubleshooting

#### LFS not initialized
```bash
git lfs install
git lfs install --local
```

#### Reset LFS hooks
```bash
git lfs install --force
```

#### Check for LFS issues
```bash
git lfs fsck
```

#### Skip LFS processing temporarily (use with caution)
```bash
GIT_LFS_SKIP_SMUDGE=1 git checkout <file>
```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `git lfs track` | View tracked patterns |
| `git lfs ls-files` | List LFS files |
| `git lfs status` | Check LFS status |
| `git lfs migrate import --no-rewrite` | Migrate without history rewrite |
| `git lfs migrate import --everything` | Migrate with history rewrite |
| `git lfs pull` | Download LFS objects |
| `git lfs push` | Upload LFS objects |
| `git lfs prune` | Clean up old objects |
| `git lfs fsck` | Check integrity |

## Getting Help

- [Git LFS Documentation](https://git-lfs.github.com/)
- [Migration Guide](https://github.com/git-lfs/git-lfs/wiki/Tutorial#migrating-existing-repository-data-to-lfs)
- Run `git lfs help migrate` for detailed migration options