# Authentication

## Philosophy

Elvin UI uses **license keys as authentication** — no traditional email/password accounts. This is called "email as identity" (Option A):

- The payment processor (Chariow) holds the source of truth for who purchased what
- After payment, Chariow emails a license key to the buyer
- The user enters their license key on `/login`
- The server validates the key with Chariow and creates a session
- The session cookie grants access for 30 days

There is no password, no email verification, and no database — Chariow is the backend.

---

## Authentication Flow

```
User → /login → enters license key
  → POST /api/auth/login
    → Chariow validates key
    → resolveAccessLevel() determines 'blocks' | 'full-access'
    → h3 useSession creates encrypted cookie
  → Redirect to /dashboard
```

---

## Session Management

Sessions are managed by h3's built-in `useSession` (Nuxt 4 / Nitro).

**Cookie name:** `__elvin_session`  
**Encryption:** AES-256-GCM via Web Crypto API (Cloudflare Workers compatible)  
**Duration:** 30 days  
**Type:** httpOnly — not accessible from JavaScript

**Session payload:**
```ts
interface SessionData {
  licenseKey: string          // The Chariow license key
  productId: string           // Chariow product ID
  accessLevel: 'blocks' | 'full-access'
  unlockedAt: number          // Unix timestamp of when access was granted
}
```

---

## Client-Side State

Auth state is managed by `useAuth()` composable (`app/composables/useAuth.ts`).

**Module-level refs** (shared across all composable calls in SPA mode):
```ts
const user = ref<AuthUser | null>(null)
const initialized = ref(false)
```

**Initialized** on app startup via `app/plugins/auth.ts` (async plugin — blocks route rendering until resolved).

**API:**
```ts
const {
  user,             // Reactive: null | AuthUser
  isAuthenticated,  // Computed: !!user
  hasBlocksAccess,  // Computed: blocks or full-access
  hasFullAccess,    // Computed: full-access only
  init,             // Fetches session from server (called once)
  login,            // POST /api/auth/login — sets user on success
  logout,           // POST /api/auth/logout — clears cookie + user ref
} = useAuth()
```

---

## Protected Routes

Use Nuxt route middleware via `definePageMeta`:

```ts
// Require any authenticated user
definePageMeta({ middleware: 'require-auth' })

// Require blocks or full-access
definePageMeta({ middleware: 'require-blocks' })

// Require full-access only
definePageMeta({ middleware: 'require-full-access' })
```

**Currently protected:**
- `/dashboard` → `require-auth`

**Content-gated (modal, not full redirect):**
- `/blocks/{id}` Source tab → modal if `!hasBlocksAccess`
- `/templates/{id}` → modal if `!hasFullAccess`

---

## Server API Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Validates license key with Chariow, creates session |
| `POST` | `/api/auth/logout` | Clears session cookie |
| `GET` | `/api/auth/me` | Returns current session data or null |

---

## How Purchases Are Attached to Users

There is no user record in a database. The link is:

```
Email → Chariow stores purchase → Chariow emails license key → User has the key
```

When the user enters the key on `/login`:
- Server calls Chariow API with the key
- Chariow returns which product was purchased
- Session is created with that access level

The license key IS the user identity. Whoever has the key gets the access.

---

## Security Considerations

- Session cookies are httpOnly (not accessible from JS) and encrypted
- License key validation happens server-side on every login attempt
- No sensitive data is stored client-side (only the reactive `user` ref in memory, reset on page reload)
- The `SESSION_SECRET` must be at least 32 characters in production
- Logging out clears the server-side session (cookie is cleared)

---

## Environment Variables Required

```env
SESSION_SECRET=your-random-secret-min-32-characters-long
CHARIOW_API_KEY=your_chariow_api_key
BLOCKS_PACK_PRODUCT_ID=your_chariow_blocks_product_id
FULL_ACCESS_PRODUCT_ID=your_chariow_full_access_product_id
```
