# Architecture Documentation

## Server vs. Client Separation

This application uses Next.js App Router with a clear separation between server-side and client-side code.

### File Organization

```
lib/
  ├── types.ts          → Shared types & constants (server + client safe)
  ├── config.ts         → Server-only config loader (uses 'fs')
  └── brand-content.ts  → Server-only content loader (uses 'fs')

app/
  ├── api/
  │   ├── chat/route.ts    → Server-only API route
  │   └── config/route.ts  → Server-only API route
  ├── useConfig.ts         → Client-side config hook
  └── page.tsx             → Client component
```

### Import Rules

#### ✅ SERVER-SIDE (API routes, Server Components)

**Can import:**
- `lib/config.ts` - Loads config from disk
- `lib/brand-content.ts` - Loads markdown files from disk
- `lib/types.ts` - Shared types and constants

**Example:**
```typescript
// app/api/chat/route.ts
import { loadBrandContent } from '@/lib/brand-content';
import { loadConfig } from '@/lib/config';
```

#### ✅ CLIENT-SIDE (Client Components, hooks)

**Can import:**
- `lib/types.ts` - Shared types and constants
- `app/useConfig.ts` - Hook that fetches config via API

**Cannot import:**
- ❌ `lib/config.ts` - Uses Node.js 'fs' module
- ❌ `lib/brand-content.ts` - Uses Node.js 'fs' module

**Example:**
```typescript
// app/page.tsx
'use client';

import { useConfig } from './useConfig'; // ✅ Correct
import type { AppConfig } from '@/lib/types'; // ✅ Correct
// import { loadConfig } from '@/lib/config'; // ❌ ERROR: Node.js only
```

### Safety Mechanisms

#### 1. `server-only` Package

Both `lib/config.ts` and `lib/brand-content.ts` import `'server-only'` at the top:

```typescript
import 'server-only';
```

**What this does:**
- Throws a build error if accidentally imported on the client
- Prevents hard-to-debug runtime errors
- Makes server-only intent explicit

#### 2. Shared Types File

`lib/types.ts` contains:
- Type definitions (safe for both server and client)
- Constants that don't require Node.js APIs
- No Node.js imports (like 'fs', 'path', etc.)

**Why this matters:**
- Types are compile-time only (no runtime code)
- Constants can be safely tree-shaken
- Both server and client can import without issues

### Data Flow

#### Server → Client Configuration

```
config.json (disk)
    ↓
lib/config.ts (loadConfig) ← Server reads from disk
    ↓
app/api/config/route.ts ← API endpoint
    ↓
HTTP Response (JSON)
    ↓
app/useConfig.ts (fetch) ← Client fetches via API
    ↓
app/page.tsx (useConfig hook) ← Client component uses hook
```

**Why this architecture:**
- ✅ Config not bundled in JavaScript (smaller bundle)
- ✅ Config can change without rebuilding
- ✅ Clear separation of concerns
- ✅ No Node.js dependencies on client

#### Server → Client Brand Content

```
content/*.md (disk)
    ↓
lib/brand-content.ts (loadBrandContent) ← Server reads markdown
    ↓
app/api/chat/route.ts ← API endpoint sends to Claude
    ↓
Claude API (with brand guidelines)
    ↓
Streaming response
    ↓
app/page.tsx ← Client displays response
```

**Why this architecture:**
- ✅ Brand content never sent to client (stays on server)
- ✅ Smaller client bundle (no markdown processing)
- ✅ Content only loaded when needed (API call)
- ✅ Caching happens server-side (efficient)

### Common Mistakes to Avoid

#### ❌ Importing server-only code on client

```typescript
// app/page.tsx
'use client';

import { loadConfig } from '@/lib/config'; // ERROR!
```

**Error you'll see:**
```
Module not found: Can't resolve 'fs'
```

**Fix:**
```typescript
// app/page.tsx
'use client';

import { useConfig } from './useConfig'; // ✅ Correct
```

#### ❌ Forgetting 'use client' directive

```typescript
// app/page.tsx
// Missing 'use client' directive
import { useState } from 'react'; // ERROR!
```

**Error you'll see:**
```
You're importing a component that needs useState. It only works in a Client Component...
```

**Fix:**
```typescript
// app/page.tsx
'use client'; // ✅ Add this at the top

import { useState } from 'react';
```

#### ❌ Duplicating types in multiple files

```typescript
// Before (BAD):
// lib/config.ts
export type AppConfig = { ... }

// app/useConfig.ts
type AppConfig = { ... } // Duplicate!
```

**Fix:**
```typescript
// After (GOOD):
// lib/types.ts
export type AppConfig = { ... }

// lib/config.ts
import type { AppConfig } from './types';

// app/useConfig.ts
import type { AppConfig } from '@/lib/types';
```

### Benefits of This Architecture

1. **Type Safety**
   - Single source of truth for types
   - Compile-time errors if used incorrectly
   - IntelliSense works everywhere

2. **Performance**
   - Smaller client bundles (no Node.js polyfills)
   - Server-side caching (config and brand content)
   - Efficient data loading

3. **Security**
   - File system access only on server
   - No accidental exposure of server-side code
   - Clear separation of concerns

4. **Maintainability**
   - Clear file organization
   - Explicit server-only markers
   - Easy to understand data flow

### Testing This Separation

#### Test server-only protection:

```bash
# Try to import lib/config.ts in a client component
# Should fail at build time with clear error
npm run build
```

#### Test client-side config loading:

```bash
# Start dev server
npm run dev

# Open browser console
# Should see single fetch to /api/config
# Config should load and display correctly
```

### Future Considerations

If adding new features:

1. **New shared types?**
   - Add to `lib/types.ts`
   - Import from there in both server and client

2. **New server-only logic?**
   - Create in `lib/` folder
   - Add `import 'server-only'` at top
   - Only import from API routes

3. **New client-side data?**
   - Create custom hook in `app/`
   - Fetch from API endpoint
   - Use the hook in components

### Related Files

- `lib/types.ts` - Shared types and constants
- `lib/config.ts` - Server-only config loader
- `lib/brand-content.ts` - Server-only content loader
- `app/useConfig.ts` - Client-side config hook
- `.github/ARCHITECTURE.md` - This file

---

**Last updated:** 2025-02-08
**Next review:** When adding new server/client separation patterns
