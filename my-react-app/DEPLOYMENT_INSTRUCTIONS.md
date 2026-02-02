# Image Fix Deployment Instructions

## What Was Fixed

Your images were broken on Vercel because you were using paths like `/src/assets/image1.jpg` which don't work in production builds.

**The Fix:**

1. Moved all images from `src/assets/` to `public/images/` (Vercel serves public folder at root)
2. Updated all image paths from `/src/assets/xxx.jpg` to `/images/xxx.jpg`
3. Added `vercel.json` for SPA routing and image caching

## Files Modified

- `src/contexts/ShoppingContext.jsx` - 26 product images
- `src/App.jsx` - 5 category grid images
- `src/components/HeroSection.jsx` - 3 hero images
- Created `public/images/` folder with all images
- Created `public/images/icons/` folder with carousel images
- Created `vercel.json` for Vercel configuration

## How to Deploy

### Step 1: Commit Changes

```bash
git add .
git commit -m "Fix image paths for Vercel deployment - move assets to public folder"
```

### Step 2: Push to Deploy

```bash
git push origin main
```

Vercel will automatically deploy when you push.

### Step 3: Verify

1. Wait for Vercel build to complete (check your Vercel dashboard)
2. Visit your live site
3. Check that all images load correctly

## Important Notes

### Image Path Reference (for future use)

| Old Path (Broken)                 | New Path (Working)            |
| --------------------------------- | ----------------------------- |
| `/src/assets/image1.jpg`          | `/images/image1.jpg`          |
| `/src/assets/photo1.jpg`          | `/images/photo1.jpg`          |
| `/src/assets/icons/carousel1.jpg` | `/images/icons/carousel1.jpg` |

### For New Images

**If adding images to `public/images/`:**

- Just drop the file in `public/images/`
- Reference as `/images/your-image.jpg`

**If keeping images in `src/assets/` (not recommended):**

- Must import them: `import myImage from "./assets/my-image.jpg"`
- Use the imported variable: `<img src={myImage} />`

### Vercel-Specific Tips

1. **Case Sensitivity**: Vercel is case-sensitive. `Photo1.jpg` ≠ `photo1.jpg`
2. **Cache**: Images are cached for 1 year (configured in vercel.json)
3. **Build**: Run `npm run build` locally to verify everything works before pushing

### Troubleshooting

If images still don't work after deployment:

1. **Check the Network tab** in browser DevTools:
   - Look for 404 errors
   - Verify the image URLs are correct

2. **Verify files in public folder:**

   ```bash
   ls public/images/
   ```

3. **Check Vercel build output:**
   - Go to Vercel dashboard → your project → Deployments
   - Check the build logs for errors

4. **Clear browser cache** and hard reload (Ctrl+Shift+R or Cmd+Shift+R)

## Carousel Component Note

The `Carousel.jsx` component uses ES module imports (like `import carousel1 from "./assets/icons/carousel1.jpg"`). This pattern still works because Vite bundles those imports correctly. The carousel images have been copied to `public/images/icons/` for consistency, but the component can keep using imports if preferred.

## Summary

Your images will now work on Vercel because:

- ✅ Images are in `public/` folder (served at root)
- ✅ Paths use `/images/` prefix (correct for public assets)
- ✅ vercel.json handles SPA routing
- ✅ Long-term caching enabled for images
