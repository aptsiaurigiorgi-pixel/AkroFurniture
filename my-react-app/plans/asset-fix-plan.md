# Image Asset Fix Plan for Vercel Deployment

## Problem Summary

Your images work locally but fail on Vercel because you're using **string paths** like `/src/assets/image1.jpg` instead of **ES module imports**. In Vite (your build tool), assets in `src/` must be imported to be bundled correctly.

## Current Broken Patterns Found

### 1. ShoppingContext.jsx (28 products with broken image paths)

```javascript
// ❌ BROKEN - String paths don't work in production
image: "/src/assets/image1.jpg";
```

### 2. App.jsx (CategoryGrid items)

```javascript
// ❌ BROKEN
image: "/src/assets/photo1.jpg";
```

### 3. HeroSection.jsx

```javascript
// ❌ BROKEN
<img src="/src/assets/photo1.jpg" alt="Luxury Sofa" />
```

### 4. Working Pattern (Carousel.jsx)

```javascript
// ✅ CORRECT - ES module import
import carousel1 from "./assets/icons/carousel1.jpg";
// ...
image: carousel1; // Use the imported variable
```

## Solution: Two Options

### Option A: Move Assets to `public/` Folder (RECOMMENDED)

**Best for:** Static images that don't need processing

**How it works:**

- Files in `public/` are served at the root URL
- Reference them with absolute paths like `/images/photo1.jpg`
- No imports needed, works everywhere

**Steps:**

1. Move all images from `src/assets/` to `public/images/`
2. Update all paths from `/src/assets/xxx.jpg` to `/images/xxx.jpg`

### Option B: Use ES Module Imports (Current Carousel pattern)

**Best for:** When you want Vite to process/optimize images

**How it works:**

- Import each image: `import image1 from "./assets/image1.jpg"`
- Use the imported variable: `image: image1`
- Vite handles bundling and cache-busting

**Steps:**

1. Add import statements for every image
2. Replace string paths with imported variables

## Recommended Approach: Option A (Move to public/)

This is simpler and more reliable for your use case.

### Files to Update

1. **Move files:**

   ```bash
   # All .jpg files in src/assets/ → public/images/
   # Keep src/assets/react.svg and src/assets/towel-svgrepo-com.svg (imported in components)
   ```

2. **Update ShoppingContext.jsx:**
   - Change all `image: "/src/assets/xxx.jpg"` → `image: "/images/xxx.jpg"`

3. **Update App.jsx:**
   - Change CategoryGrid items image paths

4. **Update HeroSection.jsx:**
   - Change `<img src="/src/assets/xxx.jpg"` → `<img src="/images/xxx.jpg"`

5. **Update vite.config.js:**
   - Add base configuration if needed

6. **Create vercel.json:**
   - Add SPA fallback for React Router

## Vercel-Specific Gotchas

1. **Case Sensitivity:** Vercel is case-sensitive. `Photo1.jpg` ≠ `photo1.jpg`
2. **Cache:** Vercel caches aggressively. Use `?v=2` query params or rename files to bust cache
3. **Build Output:** Check that images are in the `dist/` folder after `npm run build`

## Deployment Steps

1. Apply all code changes
2. Run `npm run build` locally to verify
3. Check `dist/` folder contains images
4. Commit and push
5. Vercel will auto-deploy
