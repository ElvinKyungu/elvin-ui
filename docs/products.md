# Products

## Available Products

### 1. Blocks Pack

| Field | Value |
|---|---|
| Price | $39 one-time |
| Access level | `blocks` |
| Chariow product ID | Set via `BLOCKS_PACK_PRODUCT_ID` env var |
| Public env var | `NUXT_PUBLIC_BLOCKS_PACK_PRODUCT_ID` |

**What it unlocks:**
- Source code for all UI blocks in `/app/components/blocks/`
- Viewable at `/blocks/{id}` → Source tab

**What it does NOT unlock:**
- Premium page templates (requires Full Access)

---

### 2. Full Access (UI Kit Full Access)

| Field | Value |
|---|---|
| Price | $99 one-time |
| Access level | `full-access` |
| Chariow product ID | Set via `FULL_ACCESS_PRODUCT_ID` env var |
| Public env var | `NUXT_PUBLIC_FULL_ACCESS_PRODUCT_ID` |

**What it unlocks:**
- Everything in Blocks Pack
- All premium page templates in `/app/pages/templates/`
- All future templates added to the project

---

## Access Permissions Matrix

| Route | Blocks Pack | Full Access |
|---|---|---|
| `/blocks` (index) | Public | Public |
| `/blocks/{id}` — Preview tab | Public | Public |
| `/blocks/{id}` — Source tab | Unlocked | Unlocked |
| `/templates` (index) | Public | Public |
| `/templates/{id}` — Preview | Public | Public |
| `/templates/{id}` — Source/Download | Locked | Unlocked |
| `/dashboard` | Authenticated | Authenticated |
| `/pricing` | Public | Public |
| `/login` | Public | Public |

---

## Pricing Structure

```
Blocks Pack      $39   →  blocks source code only
Full Access      $99   →  blocks + all templates
```

---

## Configuration

Set these environment variables (server-side + public):

```env
# Server-only (for Chariow license validation)
BLOCKS_PACK_PRODUCT_ID=your_chariow_blocks_product_id
FULL_ACCESS_PRODUCT_ID=your_chariow_full_access_product_id

# Public (for client-side UI: Pro badge display, modal product ID)
NUXT_PUBLIC_BLOCKS_PACK_PRODUCT_ID=your_chariow_blocks_product_id
NUXT_PUBLIC_FULL_ACCESS_PRODUCT_ID=your_chariow_full_access_product_id
```

> Note: Both private and public vars use the same Chariow product ID values. The private ones are used server-side for license validation, the public ones for client-side UI logic.

---

## Future Products

When adding a new product:

1. Create the product in Chariow dashboard
2. Add a new `AccessLevel` variant in `server/utils/products.ts`
3. Update `resolveAccessLevel()` to handle the new product ID
4. Add the new env vars to `nuxt.config.ts` runtimeConfig
5. Update `useAuth` composable with the new access computed
6. Add middleware if needed
