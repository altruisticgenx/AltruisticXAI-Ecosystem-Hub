# Shared Packages Migration

## Completed Work

### 1. Created `packages/lib` - Shared TypeScript Types and API Client

**Location**: `/workspaces/spark-template/packages/lib/`

**Structure**:
```
packages/lib/
├── package.json
├── README.md
└── src/
    ├── index.ts              # Main entry point
    ├── types/
    │   ├── index.ts          # Type exports
    │   ├── schema.ts         # Core domain types
    │   └── api.ts            # API request/response types
    └── api/
        ├── index.ts          # API exports
        └── client.ts         # API client implementation
```

**Shared Types** (`@repo/lib/types`):
- `SourceSystem` - Data source enum
- `Provenance` - Data lineage tracking
- `LocationInfo` - Geographic information
- `ProjectMetric` - Project measurement data
- `Project` - Core project entity
- `GrantOpportunity` - Grant data structure
- `PolicyMemo` - Policy document structure
- `ImpactEvent` - Impact tracking events
- `OpenDataset` - Open dataset metadata
- API types for requests/responses

**API Client** (`@repo/lib/api`):
- `APIClient` class with methods for:
  - Grants.gov search
  - USASpending.gov search
  - Dataset discovery
  - Project management
  - Grant management
  - Crawler control
- Singleton `apiClient` instance

**Configuration Updates**:
- Updated `tsconfig.json` with path aliases:
  - `@repo/lib` → `./packages/lib/src/index.ts`
  - `@repo/lib/*` → `./packages/lib/src/*`
- Updated `vite.config.ts` with alias:
  - `@repo/lib` → `./packages/lib/src`

### 2. Usage Examples

```typescript
// Import types
import type { Project, GrantOpportunity, APIResponse } from '@repo/lib/types'

// Import API client
import { apiClient } from '@repo/lib/api'

// Use in components
const response = await apiClient.searchGrantsGov({
  keyword: 'renewable energy',
  limit: 20
})

if (response.success && response.data) {
  const grants = response.data.data
  // Process grants...
}
```

## Notes on Task Requirements

The task mentioned "Update all import statements in apps/govxai/src/ from '@/components/ui/*' to '@repo/ui'". However:

1. The current codebase structure is `/workspaces/spark-template/src/` not `apps/govxai/src/`
2. The UI components are located in `src/components/ui/` and are shadcn components
3. There is no existing `@repo/ui` package structure

If a shared UI package is desired, it would require:
- Moving `src/components/ui/` to `packages/ui/`
- Creating package structure similar to `packages/lib/`
- Updating all component imports across pages

**Current approach maintains the existing UI component structure** while adding the shared types and API client library as requested in the first part of the task.

## Benefits

1. **Code Reuse**: Types and API client can be shared across multiple apps if the monorepo expands
2. **Type Safety**: Centralized type definitions ensure consistency
3. **Maintainability**: Single source of truth for API interfaces
4. **Scalability**: Ready for multi-app monorepo structure
5. **Documentation**: Clear API surface with TypeScript types

## Next Steps (Optional)

If you want to create a shared UI package:
1. Create `packages/ui/` structure
2. Move shadcn components to shared package
3. Update all imports from `@/components/ui/*` to `@repo/ui`
4. Add UI package configuration to tsconfig and vite.config
