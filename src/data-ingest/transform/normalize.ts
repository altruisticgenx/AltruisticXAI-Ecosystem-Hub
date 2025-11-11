import type { IngestedProject, GrantOpportunity } from '../schema'

declare const spark: {
  llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string
  llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>
}

export function normalizeProject(raw: IngestedProject): IngestedProject {
  return {
    ...raw,
    title: cleanText(raw.title),
    description: cleanText(raw.description),
    tags: deduplicateTags(raw.tags),
    relevance_score: raw.relevance_score || 0,
    capture_date: raw.capture_date || new Date().toISOString()
  }
}

export function normalizeGrant(raw: GrantOpportunity): GrantOpportunity {
  return {
    ...raw,
    title: cleanText(raw.title),
    description: cleanText(raw.description),
    keywords: deduplicateTags(raw.keywords),
    relevance_score: raw.relevance_score || 0,
    capture_date: raw.capture_date || new Date().toISOString()
  }
}

export async function enrichWithAI(
  item: IngestedProject | GrantOpportunity,
  apiKey?: string
): Promise<IngestedProject | GrantOpportunity> {
  if (!apiKey) return item

  try {
    const prompt = spark.llmPrompt`Analyze this ${isProject(item) ? 'project' : 'grant opportunity'} and provide:
1. A 1-sentence summary focusing on innovation and impact
2. Relevance score (0-1) for local-first AI, campus energy, or regenerative systems
3. Primary sector classification

Title: ${item.title}
Description: ${item.description.slice(0, 500)}

Return as JSON with fields: summary, relevance_score, sectorGreat — I'll give you a prioritized, practical roadmap of the best ideas to enhance your GitHub-hosted site (ecosystemxai--altruisticgenx.github.app), plus a set of concrete files you can add to the repo right away to make progress quickly (CI, deploy, workspaces, SEO, PWA, Lighthouse, basic tooling). After the files I’ll list recommended next steps and offer to apply the changes for you.

High-level priorities (why each matters)
- Immediate (low effort, big wins): workspace wiring, CI for lint/test/build, deploy pipeline to Pages, basic SEO (robots/sitemap/OG), analytics/error monitoring.
- Short term (improve UX & reliability): share packages (types/API/@repo/ui), component design system or Storybook, image optimization, caching & client data fetching (SWR/react-query).
- Medium term (quality, observability): tests (unit & e2e), Lighthouse CI, performance budgets, Sentry/observability, typed API client (OpenAPI if available).
- Long term (product & scale): A/B testing, personalization, feature flags, internationalization, accessibility-first audits, design tokens and versioned component library releases.

Concrete files you can add now
- Root workspace update (ensures packages/lib and packages/ui are part of the monorepo)
- CI workflow: lint/test/build + Lighthouse CI
- Deploy workflow: build and deploy to GitHub Pages
- Next config (if using Next.js) with image domains, SWC, and recommended headers
- robots.txt, sitemap.xml template
- Web manifest for PWA
- Lighthouse CI config
- Basic .eslintrc.json
- CONTRIBUTING.md

Below are the files. Add/adjust content to match your repo structure and chosen framework (most govxai apps use Next.js or Vite; I wrote Next.js-friendly config — tell me if you're using something else and I'll adapt).

```json name=package.json
{
  "name": "ecosystemxai-monorepo",
  "private": true,
  "version": "0.0.0",
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "build": "pnpm -w -r run build --filter ./...",
    "lint": "pnpm -w -r run lint --filter ./...",
    "test": "pnpm -w -r run test --filter ./...",
    "format": "pnpm -w -r run format --filter ./..."
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

```yaml name=.github/workflows/ci.yml
name: CI

on:
  push:
    branches:
      - main
      - master
  pull_request:
    branches:
      - main
      - master

jobs:
  install-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install pnpm
        run: corepack enable && corepack prepare pnpm@latest --activate

      - name: Install
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm -w -r run lint --reporter=stylish || true

      - name: Run tests
        run: pnpm -w -r run test --silent

      - name: Build all
        run: pnpm -w -r run build
```

```yaml name=.github/workflows/deploy-pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install pnpm
        run: corepack enable && corepack prepare pnpm@latest --activate

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build (monorepo)
        run: pnpm -w -r run build

      - name: Configure Pages
        uses: actions/configure-pages@v3

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: apps/govxai/out || apps/govxai/.next/static || apps/govxai/dist

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

```js name=next.config.js
/** Next.js recommended configuration (adjust if you use Vite/Svelte/etc.) */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Add your allowed external domains here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

```text name=public/robots.txt
User-agent: *
Allow: /

Sitemap: https://ecosystemxai--altruisticgenx.github.app/sitemap.xml
```

```xml name=public/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Add your dynamic pages during build or generate a sitemap with next-sitemap -->
  <url>
    <loc>https://ecosystemxai--altruisticgenx.github.app/</loc>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
```

```json name=public/manifest.webmanifest
{
  "short_name": "EcosystemXAI",
  "name": "Ecosystem X AI",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0b4d88"
}
```

```js name=.lighthouseci.js
module.exports = {
  ci: {
    collect: {
      url: [
        'https://ecosystemxai--altruisticgenx.github.app/',
      ],
      startServerCommand: '',
      numberOfRuns: 3,
      settings: {
        emulatedFormFactor: 'desktop',
      },
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

```json name=.eslintrc.json
{
  "root": true,
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react"],
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "rules": {
    "no-console": "warn",
    "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

````markdown name=CONTRIBUTING.md
```markdown
# Contributing

Thank you for contributing to Ecosystem X AI!

Quick start:
- Install dependencies: corepack enable && corepack prepare pnpm@latest --activate && pnpm install
- Build: pnpm -w -r run build
- Lint: pnpm -w -r run lint
- Test: pnpm -w -r run test

Workspaces:
- This repo uses workspace roots (packages/* and apps/*). Shared code should live in packages/* and be consumed by apps.

Shared packages:
- packages/lib — shared types & API client
- packages/ui — shared UI components (barrels for /button, /card, etc.)
- When updating shared packages run `pnpm -w -r build` to rebuild before testing apps.

Branch & PR:
- Create feature branches off main.
- Open PRs with a small scope; include screenshots for UI changes.
```
````

A few short examples and guidance (how to use/apply changes)
- Make packages discoverable:
  - Add the package entries (packages/lib and packages/ui). I already gave packages/lib earlier in our prior message — include it and run pnpm install then pnpm -w -r build.
- Replace imports in apps/govxai/src:
  - Use the replacement script I provided earlier (scripts/replace-imports.js) to replace '@/components/ui/*' with '@repo/ui/*'. After running it, ensure that @repo/ui exposes the same export paths (barrel files or re-exports).
- API client & types:
  - If you have an OpenAPI spec, generate a strongly-typed client and replace the lightweight client with generated code to avoid runtime mismatches.
- Performance:
  - Use Next/Image or an image CDN, preconnect to important origins, and lazy-load offscreen images.
  - Use route-level code-splitting and dynamic imports for heavy components.
- Observability:
  - Add Sentry/LogRocket/Apollo Engine depending on stack. Start with Sentry for errors + frontend traces.
- Testing:
  - Unit testing with vitest/jest; e2e testing with Playwright (CI job runs on PRs).
- Accessibility:
  - Add Axe checks in CI for critical pages; use Lighthouse a11y and manual keyboard/contrast checks.`

    const result = await spark.llm(prompt, 'gpt-4o', true)
    const enriched = JSON.parse(result)
    
    return {
      ...item,
      ai_summary: enriched.summary,
      relevance_score: Math.max(item.relevance_score || 0, enriched.relevance_score || 0),
      ...(isProject(item) && enriched.sector ? { sector: enriched.sector } : {})
    }
  } catch (error) {
    console.error('AI enrichment failed:', error)
    return item
  }
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')
    .trim()
}

function deduplicateTags(tags: string[]): string[] {
  return [...new Set(tags.map(t => t.toLowerCase()))]
}

function isProject(item: any): item is IngestedProject {
  return 'sector' in item && !('opportunity_number' in item)
}
