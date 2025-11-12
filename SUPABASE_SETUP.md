# Supabase Security Setup

This document outlines the security measures to implement if/when integrating Supabase for user-generated content and analytics.

## Privacy-First Architecture

### Problem
Exposing raw `user_id` (UUIDs) in public APIs creates privacy and security risks:
- Enables user tracking across sessions
- Reveals internal user identifiers
- Potential for enumeration attacks

### Solution
Use **public views** with pseudonymous IDs for all public-facing data.

---

## Database Schema Setup

### 1) Add Public IDs to Profiles

```sql
-- Ensure RLS on the base table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add pseudonymous public_id column
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS public_id UUID;

-- Populate existing records
UPDATE public.profiles
SET public_id = gen_random_uuid()
WHERE public_id IS NULL;

-- Make it required and unique
ALTER TABLE public.profiles
  ALTER COLUMN public_id SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_public_id_key 
  ON public.profiles(public_id);
```

### 2) Add Public Flag to Content

```sql
-- Optional: control what content appears in public feeds
ALTER TABLE public.translations
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT false;
```

### 3) Create Public View

This view exposes only non-sensitive data:

```sql
-- Public view with no user_id exposure
CREATE OR REPLACE VIEW public.translations_public AS
SELECT
  t.id,
  t.text,
  t.source_lang,
  t.target_lang,
  DATE_TRUNC('hour', t.created_at) AS created_at,  -- Coarsen timestamps
  p.public_id AS author_public_id
FROM public.translations t
JOIN public.profiles p ON p.user_id = t.user_id
WHERE t.is_public = true;
```

**Key privacy features:**
- ✅ No `user_id` exposed
- ✅ Timestamps rounded to the hour
- ✅ Only public content visible
- ✅ Pseudonymous author ID

### 4) Grant Permissions

```sql
-- Revoke direct access to base table
REVOKE ALL ON TABLE public.translations FROM anon;

-- Grant read-only access to public view
GRANT SELECT ON public.translations_public TO anon, authenticated;
```

### 5) Row-Level Security Policies

Owner-only access to base table:

```sql
-- SELECT: Users can only read their own translations
DROP POLICY IF EXISTS "select own translations" ON public.translations;
CREATE POLICY "select own translations"
  ON public.translations FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: Users can only create their own translations
DROP POLICY IF EXISTS "insert own translations" ON public.translations;
CREATE POLICY "insert own translations"
  ON public.translations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own translations
DROP POLICY IF EXISTS "update own translations" ON public.translations;
CREATE POLICY "update own translations"
  ON public.translations FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own translations
DROP POLICY IF EXISTS "delete own translations" ON public.translations;
CREATE POLICY "delete own translations"
  ON public.translations FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
```

---

## Edge Function Security

### Config: `supabase/config.toml`

```toml
[functions.analyze-data]
verify_jwt = true  # Enforce authentication
```

### Function Code Pattern

```typescript
// supabase/functions/analyze-data/index.ts
import { createClient } from '@supabase/supabase-js'

Deno.serve(async (req) => {
  // Get auth token from request
  const authHeader = req.headers.get('Authorization')
  
  // Create authenticated client
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: authHeader ?? '' }
      }
    }
  )

  // Query PUBLIC VIEW (not base table)
  const { data: translations, error } = await supabaseClient
    .from('translations_public')
    .select('id, text, source_lang, target_lang, created_at, author_public_id')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Process and return data
  return new Response(
    JSON.stringify({ data: translations }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

---

## Client-Side Integration

### Reading Public Feed

```typescript
// For unauthenticated public feed
const { data, error } = await supabase
  .from('translations_public')
  .select('id, text, source_lang, target_lang, created_at, author_public_id')
  .order('created_at', { ascending: false })
  .limit(20)
```

### User's Own Content

```typescript
// For authenticated user's own content
const { data: myTranslations, error } = await supabase
  .from('translations')
  .select('*')
  .eq('user_id', user.id)
```

### Realtime Considerations

⚠️ **Important**: You cannot subscribe to views with Realtime.

**Solution**: Create a mirrored table for public feed:

```sql
-- Public feed table (anonymized copy)
CREATE TABLE public.public_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  translation_id UUID NOT NULL,
  text TEXT NOT NULL,
  source_lang TEXT NOT NULL,
  target_lang TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  author_public_id UUID NOT NULL
);

-- Trigger to populate on insert
CREATE OR REPLACE FUNCTION mirror_to_public_feed()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_public = true THEN
    INSERT INTO public.public_feed (
      translation_id,
      text,
      source_lang,
      target_lang,
      created_at,
      author_public_id
    )
    SELECT
      NEW.id,
      NEW.text,
      NEW.source_lang,
      NEW.target_lang,
      DATE_TRUNC('hour', NEW.created_at),
      p.public_id
    FROM public.profiles p
    WHERE p.user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER mirror_public_translations
  AFTER INSERT ON public.translations
  FOR EACH ROW EXECUTE FUNCTION mirror_to_public_feed();
```

Then subscribe to `public_feed` instead:

```typescript
const subscription = supabase
  .channel('public-feed')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'public_feed'
  }, (payload) => {
    console.log('New public translation:', payload.new)
  })
  .subscribe()
```

---

## Environment Variables

### Supabase Dashboard
**Project Settings → Functions → Environment Variables**

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
LOVABLE_API_KEY=your-api-key-here
```

### GitHub Secrets (for build-time vars)
**Repo → Settings → Secrets and variables → Actions → Variables**

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Note: These are public client-side values, so using `Variables` (not `Secrets`) is fine.

---

## Security Checklist

- [ ] RLS enabled on all user tables
- [ ] Public views use `public_id` instead of `user_id`
- [ ] Timestamps coarsened to reduce tracking precision
- [ ] Edge functions have `verify_jwt = true`
- [ ] Direct table access revoked for `anon` role
- [ ] RLS policies enforce owner-only access
- [ ] No `user_id` rendered in UI components
- [ ] Realtime subscriptions use mirrored public tables

---

## Testing

```sql
-- Test 1: Verify anon cannot read base table
SET ROLE anon;
SELECT * FROM public.translations LIMIT 1;  -- Should fail

-- Test 2: Verify anon CAN read public view
SELECT * FROM public.translations_public LIMIT 1;  -- Should succeed

-- Test 3: Verify no user_id in view
\d+ public.translations_public  -- Should not show user_id column

-- Reset
RESET ROLE;
```

---

## Migration Path

If you already have exposed data:

1. **Immediately** revoke anon access to base tables
2. Deploy public views
3. Update all client code to use views
4. Add `public_id` to existing profiles
5. Rotate API keys if `user_id` values were compromised
6. Notify users of privacy update

---

## References

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Views](https://www.postgresql.org/docs/current/sql-createview.html)
- [OWASP Privacy Guidelines](https://owasp.org/www-project-top-10-privacy-risks/)
