# Deployment Flow Diagram

## Current Workflow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    TRIGGER EVENTS                        │
│  • Push to main branch                                   │
│  • Manual workflow_dispatch via GitHub UI                │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  BUILD JOB                               │
│  Environment: ubuntu-latest                              │
├─────────────────────────────────────────────────────────┤
│  1. Checkout code (actions/checkout@v4)                  │
│     └─ Fetches latest from repository                    │
│                                                           │
│  2. Setup Node.js 20 (actions/setup-node@v4)            │
│     └─ With npm cache enabled                            │
│                                                           │
│  3. Install dependencies                                 │
│     └─ npm ci (clean install from lockfile)             │
│                                                           │
│  4. Build application                                    │
│     └─ npm run build (Vite production build)            │
│     └─ NODE_ENV=production                               │
│     └─ Output: dist/ directory                           │
│                                                           │
│  5. Upload build artifact (actions/upload-artifact@v4)   │
│     └─ Name: build-dist                                  │
│     └─ Retention: 7 days                                 │
│     └─ Purpose: Debugging & manual download              │
│                                                           │
│  6. Upload Pages artifact (upload-pages-artifact@v3)     │
│     └─ Path: dist/                                       │
│     └─ Purpose: GitHub Pages deployment                  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ Artifact passed to next job
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  DEPLOY JOB                              │
│  Environment: github-pages                               │
│  Needs: build (waits for build job to complete)         │
├─────────────────────────────────────────────────────────┤
│  1. Deploy to GitHub Pages (deploy-pages@v4)            │
│     └─ Deploys artifact from build job                   │
│     └─ Uses GitHub Pages infrastructure                  │
│     └─ Outputs deployment URL                            │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ Success!
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  DEPLOYED SITE                           │
│  URL: https://username.github.io/repo-name/              │
│  Status: Live and accessible                             │
│  CDN: GitHub's global edge network                       │
└─────────────────────────────────────────────────────────┘
```

---

## Concurrency Control

```
Push #1 to main → Workflow Run A starts
      │
      ├─ Build job running...
      │
Push #2 to main → Workflow Run B starts
                       │
                       └─ Run A is CANCELLED (cancel-in-progress: true)
                       └─ Run B continues (latest code)
```

**Benefit**: Prevents simultaneous deployments and wasted resources.

---

## Permissions Model

```
┌──────────────────────────┐
│  Workflow Permissions    │
├──────────────────────────┤
│  contents: read          │ ← Read repository code
│  pages: write            │ ← Deploy to GitHub Pages
│  id-token: write         │ ← OIDC authentication
└──────────────────────────┘
```

**Security**: Minimal permissions following principle of least privilege.

---

## Build Output Structure

```
dist/
├── index.html              ← Entry point (served at root)
├── assets/
│   ├── index-[hash].js     ← Application bundle
│   ├── index-[hash].css    ← Compiled styles
│   └── [images/fonts]      ← Static assets
└── [other pages/routes]    ← SPA routing handled client-side
```

**Cache Strategy**: Hash-based filenames enable long-term caching.

---

## Error Flow

```
Build Job FAILS
      │
      ├─ Error logs shown in Actions UI
      │
      └─ Deploy job SKIPPED (needs: build requirement not met)
            │
            └─ Previous deployment remains live (no downtime)
```

**Benefit**: Failed builds never reach production.

---

## Manual Deployment Flow

```
GitHub UI → Actions Tab → Deploy to GitHub Pages
                             │
                             └─ Click "Run workflow"
                                   │
                                   └─ Select branch: main
                                         │
                                         └─ Triggers same workflow as push
```

**Use Cases**: Hotfixes, rollbacks, scheduled deploys.

---

## Comparison: Old vs New Workflow

### Old Workflow (Broken)
```
┌─────────────────────────────┐
│  Single Job: build-and-deploy │
├─────────────────────────────┤
│  1. Checkout                 │
│  2. Setup Node               │
│  3. Install                  │
│  4. Build                    │
│  5. Configure Pages ❌       │ ← Caused 403 errors
│  6. Upload (v1) ⚠️          │ ← Old version
│  7. Deploy (v2) ⚠️          │ ← Old version
└─────────────────────────────┘
```

### New Workflow (Fixed)
```
┌──────────────────────┐     ┌───────────────────┐
│   Build Job          │ ──▶ │   Deploy Job      │
├──────────────────────┤     ├───────────────────┤
│  1. Checkout         │     │  1. Deploy (v4) ✅│
│  2. Setup Node       │     └───────────────────┘
│  3. Install          │
│  4. Build            │     Better isolation ✅
│  5. Upload (v4) ✅   │     Latest versions ✅
│  6. Upload Pages ✅  │     No configure step ✅
└──────────────────────┘     Separate concerns ✅
```

---

## Deployment Timeline

```
00:00  ─  Trigger (push to main)
00:05  ─  Build job starts
00:45  ─  Dependencies installed
02:30  ─  Build completes
02:35  ─  Artifacts uploaded
02:40  ─  Deploy job starts
03:00  ─  Deployment complete
03:05  ─  CDN propagation complete ✓

Total: ~3 minutes from push to live
```

---

## Troubleshooting Decision Tree

```
Deployment Failed?
      │
      ├─ Build Job Failed?
      │     │
      │     ├─ Install error → Check package-lock.json
      │     ├─ Build error → Check TypeScript/lint errors
      │     └─ Upload error → Check dist/ exists
      │
      └─ Deploy Job Failed?
            │
            ├─ 403 error → Check workflow permissions
            ├─ 404 error → Check Pages source setting
            └─ Timeout → Check GitHub status page
```

---

## Future: Multi-Environment Strategy

```
┌─────────────────────────────────────────────────┐
│               main branch                        │
└───────────┬─────────────────────────────────────┘
            │
            ├─▶ Production Deployment
            │   └─ https://altruisticxai.com/
            │
develop ────┼─▶ Staging Deployment
branch      │   └─ https://staging.altruisticxai.com/
            │
PR #123 ────┴─▶ Preview Deployment
                └─ https://preview-pr-123.altruisticxai.com/
```

*(Not implemented yet - for future reference)*

---

## References

- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Deploy Pages Action](https://github.com/actions/deploy-pages)
- [Vite Build Options](https://vitejs.dev/guide/build.html)
