import type { Project } from '@repo/lib/types'

export const sampleProjectUsingSharedTypes: Project = {
  id: 'demo-shared-types',
  title: 'Demo Project Using Shared Types',
  description: 'This demonstrates using the new @repo/lib shared types package',
  sector: 'Technology',
  origin: 'labs',
  status: 'active',
  tags: ['shared-types', 'monorepo', 'typescript'],
  provenance: {
    source: 'manual',
    capturedAt: new Date().toISOString()
  }
}
