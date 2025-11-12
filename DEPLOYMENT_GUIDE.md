# GitHub Pages Deployment Guide

This guide explains how to deploy the AltruisticXAI application to GitHub Pages.

## Quick Start

### One-Time Setup

1. **Enable GitHub Pages**
   - Go to: **Repo → Settings → Pages**
   - Under **Source**, select: **GitHub Actions**
   - Click **Save**

2. **Configure Workflow Permissions**
   - Go to: **Repo → Settings → Actions → General**
   - Scroll to **Workflow permissions**
   - Select: **Read and write permissions**
   - Check: **Allow GitHub Actions to create and approve pull requests**
   - Click **Save**

3. **Push to main**
   ```bash
   git add .
   git commit -m "fix: update GitHub Pages deployment workflow"
   git push origin main
   ```

That's it! Your site will deploy automatically.

---

## What Changed

### Previous Issues

The old workflow had several problems:

1. **Missing `BUILD_DIR` environment variable** - Used but never defined
2. **Outdated action versions** - Using v1/v2 instead of v3/v4
3. **Unnecessary `configure-pages` step** - Causes 403 errors
4. **Single job mixing build and deploy** - No separation of concerns
5. **Missing `workflow_dispatch`** - Could only deploy on push

### New Workflow Structure

```yaml
jobs:
  build:
    - Checkout code
    - Setup Node.js 20
    - Install dependencies with `npm ci`
    - Build production bundle
    - Upload build artifact (optional, for debugging)
    - Upload Pages artifact (required)

  deploy:
    needs: build
    - Deploy artifact to GitHub Pages
    - Output deployment URL
```

### Key Improvements

✅ **Separated build and deploy** - Cleaner failure isolation
✅ **Defined `BUILD_DIR=dist`** - Matches Vite output directory
✅ **Latest action versions** - More stable and secure
✅ **Concurrency control** - Prevents simultaneous deployments
✅ **Manual trigger** - Can deploy via UI with `workflow_dispatch`
✅ **Production environment flag** - `NODE_ENV=production`

---

## Workflow File Location

```
.github/workflows/deploy-pages.yml
```

---

## Deployment Process

### Automatic Deployment

Every push to `main` triggers:

1. ✓ Install dependencies
2. ✓ Run build (`npm run build`)
3. ✓ Upload to GitHub Pages
4. ✓ Deploy to production URL

**Build time**: ~2-4 minutes

### Manual Deployment

You can also trigger deployments manually:

1. Go to: **Actions → Deploy to GitHub Pages**
2. Click: **Run workflow**
3. Select branch: `main`
4. Click: **Run workflow**

---

## Troubleshooting

### Error: "Resource not accessible by integration"

**Cause**: Workflow doesn't have write permissions

**Fix**:
1. Go to **Settings → Actions → General**
2. Set **Workflow permissions** to **Read and write**
3. Re-run the workflow

---

### Error: "No Pages artifact found"

**Cause**: Build directory (`dist`) is empty or wrong path

**Fix**:
1. Verify `npm run build` creates a `dist` folder locally
2. Check `vite.config.ts` for custom `outDir`
3. Update `BUILD_DIR` in workflow if needed

---

### Error: 404 on deployed site

**Cause**: Router mode mismatch or missing base path

**Fix for React Router**:

```tsx
// src/App.tsx
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* routes */}
    </BrowserRouter>
  )
}
```

**Fix for Vite Config** (if deploying to a subdirectory):

```typescript
// vite.config.ts
export default defineConfig({
  base: '/repo-name/',  // Only if not using custom domain
})
```

---

### Site works locally but not on Pages

**Causes**:
- Case-sensitive imports (Linux servers are case-sensitive)
- Missing `index.html` in `dist`
- Absolute paths instead of relative

**Fix**:
1. Check import casing:
   ```typescript
   // ❌ Wrong if file is Component.tsx
   import Component from './component'
   
   // ✅ Correct
   import Component from './Component'
   ```

2. Use relative or root-relative paths:
   ```typescript
   // ❌ Avoid
   import logo from '/src/assets/logo.png'
   
   // ✅ Use alias
   import logo from '@/assets/logo.png'
   ```

---

## Custom Domain Setup

### Using GitHub Subdomain

Your site is automatically available at:
```
https://username.github.io/repo-name/
```

### Using Custom Domain

1. **Add DNS records** (with your domain provider):
   ```
   Type  Name        Value
   A     @           185.199.108.153
   A     @           185.199.109.153
   A     @           185.199.110.153
   A     @           185.199.111.153
   CNAME www         username.github.io
   ```

2. **Configure in GitHub**:
   - Go to **Settings → Pages**
   - Under **Custom domain**, enter: `yourdomain.com`
   - Check **Enforce HTTPS** (after DNS propagates)

3. **Update Vite config**:
   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/',  // Root path for custom domain
   })
   ```

4. **Commit and push** - Redeploy with new base path

---

## Environment Variables

### Build-Time Variables

For client-side configuration (API keys, URLs):

1. **Add to GitHub**:
   - Go to: **Settings → Secrets and variables → Actions → Variables**
   - Add variables (e.g., `VITE_API_URL`)

2. **Update workflow**:
   ```yaml
   - name: Build
     run: npm run build
     env:
       NODE_ENV: production
       VITE_API_URL: ${{ vars.VITE_API_URL }}
   ```

3. **Use in code**:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

⚠️ **Never use `Secrets` for client-side values** - They're visible in the compiled bundle. Use `Variables` instead.

---

## Monitoring Deployments

### Via GitHub UI

1. Go to **Actions** tab
2. Click on latest workflow run
3. View logs for each step

### Via Commit Status

Each commit shows deployment status with ✓ or ✗

### Via Deployment Tab

**Repo → Environments → github-pages** shows:
- Deployment history
- Active deployment URL
- Rollback options

---

## Rollback

If a deployment breaks production:

1. Go to **Actions** tab
2. Find last working workflow run
3. Click **Re-run all jobs**

Or:

1. Revert the breaking commit locally
2. Push to `main`
3. New deployment will replace broken one

---

## Performance Optimization

### Pre-deployment Checklist

- [ ] Run `npm run build` locally to verify
- [ ] Check bundle size: `du -sh dist`
- [ ] Test production build: `npm run preview`
- [ ] Verify all assets load correctly
- [ ] Check console for errors

### Bundle Size Tips

```json
// package.json
{
  "scripts": {
    "build": "vite build --sourcemap=false",
    "analyze": "vite-bundle-visualizer"
  }
}
```

### Asset Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})
```

---

## CI/CD Best Practices

### Branch Protection

Set up branch protection rules:

1. **Settings → Branches → Add rule**
2. Branch name pattern: `main`
3. Enable:
   - ✓ Require status checks before merging
   - ✓ Require branches to be up to date
   - ✓ Include administrators

### Pre-merge Checks

The `ci.yml` workflow runs on PRs:
- ✓ Linting
- ✓ Tests
- ✓ Build verification

Only merge if all checks pass.

---

## Security Considerations

### Permissions

The workflow uses minimal permissions:
```yaml
permissions:
  contents: read      # Read repo code
  pages: write        # Deploy to Pages
  id-token: write     # OIDC authentication
```

### Secrets Management

- ✅ Use GitHub Actions secrets/variables
- ✅ Never commit `.env` files
- ✅ Rotate tokens periodically
- ❌ Don't log sensitive values

### Content Security

The deployed site is static, so:
- ✅ No server-side code execution
- ✅ No database to compromise
- ✅ All data in client-side storage only
- ⚠️ Be careful with XSS in user-generated content

---

## Advanced: Preview Deployments

To deploy PR previews to separate URLs:

```yaml
# .github/workflows/preview.yml
name: Preview Deployment

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --dir=dist --alias=pr-${{ github.event.number }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

(Requires Netlify or similar service for preview hosting)

---

## Support

If you encounter issues:

1. Check **Actions** logs for error messages
2. Review this guide's **Troubleshooting** section
3. Verify **Settings → Pages** configuration
4. Test build locally with `npm run build && npm run preview`

---

## Changelog

### 2025-01-XX - v2.0
- ✅ Split build and deploy into separate jobs
- ✅ Updated to latest action versions (v3/v4)
- ✅ Added `BUILD_DIR` environment variable
- ✅ Removed problematic `configure-pages` step
- ✅ Added `workflow_dispatch` for manual triggers
- ✅ Added build artifact upload for debugging
- ✅ Set `NODE_ENV=production` explicitly

### Previous - v1.0
- Initial deployment workflow
- Basic build and deploy in single job
