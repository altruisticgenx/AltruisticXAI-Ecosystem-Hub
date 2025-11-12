# Migration Notes - GitHub Pages Deployment Fix

**Date**: 2025-01-XX  
**Status**: ✅ Complete  
**Scope**: GitHub Actions workflow update for reliable Pages deployment

---

## What Changed

### 1. Updated GitHub Pages Workflow

**File**: `.github/workflows/deploy-pages.yml`

#### Changes Made:

✅ **Split build and deploy into separate jobs**
- Better failure isolation
- Cleaner logs
- Follows GitHub's recommended pattern

✅ **Added `BUILD_DIR` environment variable**
```yaml
env:
  BUILD_DIR: dist
```
- Fixes "undefined variable" issue
- Makes workflow more maintainable

✅ **Updated to latest action versions**
- `upload-artifact@v4` (was no version)
- `upload-pages-artifact@v3` (was v1)
- `deploy-pages@v4` (was v2)

✅ **Removed `configure-pages` step**
- This was causing "resource not accessible by integration" 403 errors
- Not needed when using GitHub Actions as deployment source

✅ **Added `workflow_dispatch` trigger**
- Enables manual deployment from GitHub UI
- Useful for hotfixes or rollbacks

✅ **Set production environment**
```yaml
env:
  NODE_ENV: production
```
- Ensures optimized build

✅ **Added concurrency control**
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true
```
- Prevents simultaneous deployments
- Cancels stale runs

✅ **Added build artifact upload**
- Optional step for debugging
- Downloadable from Actions tab
- 7-day retention

---

## Required Manual Configuration

### ⚠️ Must Do Before Deployment Works:

1. **Enable GitHub Pages with Actions**
   - Go to: **Repo → Settings → Pages**
   - Under **Source**, select: **GitHub Actions**
   - Click **Save**

2. **Set Workflow Permissions**
   - Go to: **Repo → Settings → Actions → General**
   - Scroll to **Workflow permissions**
   - Select: **Read and write permissions**
   - Check: **Allow GitHub Actions to create and approve pull requests**
   - Click **Save**

---

## Documentation Added

### 1. DEPLOYMENT_GUIDE.md

Comprehensive guide covering:
- Quick start setup
- Troubleshooting common errors
- Custom domain configuration
- Environment variables
- Performance optimization
- CI/CD best practices
- Security considerations

### 2. SUPABASE_SETUP.md

Future-proofing guide for when/if Supabase is integrated:
- Privacy-first architecture with public views
- Row-level security policies
- Edge function security patterns
- Pseudonymous IDs for user content
- Realtime subscription strategies

### 3. Updated README.md

Added references to new documentation files in the Development section.

---

## Testing Checklist

Before marking this complete, verify:

- [ ] Workflow file syntax is valid (GitHub will show errors if not)
- [ ] Settings → Pages is set to "GitHub Actions"
- [ ] Settings → Actions has "Read and write permissions"
- [ ] Push to `main` triggers the workflow
- [ ] Build job completes successfully
- [ ] Deploy job completes successfully
- [ ] Site is accessible at `https://username.github.io/repo-name/`
- [ ] All pages load correctly
- [ ] Router navigation works
- [ ] Assets (images, fonts, etc.) load
- [ ] Console shows no errors

---

## Rollback Plan

If deployment fails:

### Option 1: Revert Workflow
```bash
git revert HEAD
git push origin main
```

### Option 2: Manual Deploy via Actions
1. Go to **Actions** tab
2. Find last working workflow run
3. Click **Re-run all jobs**

### Option 3: Restore Previous Workflow
The old workflow is preserved in git history:
```bash
git log -p .github/workflows/deploy-pages.yml
```

---

## What We Didn't Change

❌ **No changes to application code** - All changes are CI/CD only
❌ **No changes to build process** - Still using `npm run build`
❌ **No changes to Vite config** - Build settings unchanged
❌ **No changes to dependencies** - No package updates

---

## Future Considerations

### If Using Supabase

When/if you add Supabase for analytics or user-generated content:

1. **Implement public views** (see SUPABASE_SETUP.md)
2. **Enable RLS policies**
3. **Use pseudonymous `public_id`**
4. **Add environment variables** to GitHub Secrets/Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### If Using Custom Domain

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/',  // Root path for custom domain
})
```

### If Deploying to Subdirectory

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repo-name/',  // Match GitHub Pages URL
})
```

And update React Router:
```typescript
<BrowserRouter basename={import.meta.env.BASE_URL}>
```

---

## Known Issues

None at time of migration.

---

## References

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## Questions?

- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for troubleshooting
- Review workflow logs in **Actions** tab
- Test locally with `npm run build && npm run preview`
