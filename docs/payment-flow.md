# Payment Flow

## Overview

Elvin UI uses **Chariow** as the payment processor. There is no traditional user account system — a **license key** is the authentication token. After payment, Chariow emails the key to the buyer, who uses it to unlock access.

---

## Checkout Flow

1. User clicks a purchase button on `/pricing`
2. `UiProModal` opens (buy view)
3. User fills in: first name, last name, email, phone number
4. Frontend POSTs to `POST /api/checkout` with the product ID and form data
5. Server calls `POST https://api.chariow.com/v1/checkout`
6. Chariow returns a `checkout_url`
7. User is redirected to Chariow's hosted payment page
8. User completes payment on Chariow

---

## Redirect Flow (Post-Payment)

After successful payment on Chariow:

1. Chariow redirects the user back to `redirectUrl?enter-key=true`
   - For Blocks Pack: `/pricing?enter-key=true`
   - For Full Access: `/pricing?product=full&enter-key=true`
2. The pricing page detects the `enter-key` query param and auto-opens the modal
3. Modal shows the "Enter license key" view
4. Chariow also emails the license key to the buyer

---

## License Key Validation & Session Creation

When the user enters their license key:

1. `UiProModal` calls `useAuth().login(licenseKey)`
2. Frontend POSTs to `POST /api/auth/login` with `{ licenseKey }`
3. Server calls `GET https://api.chariow.com/v1/licenses/{licenseKey}`
4. Chariow returns license data: `is_active`, `is_expired`, `product.id`
5. Server maps `product.id` → `accessLevel` using env var product IDs
6. Server creates an **httpOnly session cookie** (`__elvin_session`) via h3 `useSession`
7. Session contains: `{ licenseKey, productId, accessLevel, unlockedAt }`
8. API returns the session data to the client
9. `useAuth` updates the reactive `user` ref
10. User is redirected to `/dashboard`

---

## Access Control Logic

| Access Level | Unlocks |
|---|---|
| `blocks` | Source code for all blocks (`/blocks/*`) |
| `full-access` | Blocks source code + all premium templates (`/templates/*`) |

Access is checked via `useAuth()`:
- `hasBlocksAccess` → `accessLevel === 'blocks' || accessLevel === 'full-access'`
- `hasFullAccess` → `accessLevel === 'full-access'`

---

## Session Details

- **Storage**: httpOnly cookie (`__elvin_session`), encrypted via h3 `useSession`
- **Duration**: 30 days
- **Secret**: `SESSION_SECRET` env var (must be ≥32 chars in production)
- **Initialized**: On app startup via `app/plugins/auth.ts` (async plugin)

---

## Future Upgrade Possibilities

- **Multi-product sessions**: Store an array of `{ productId, accessLevel }` objects to support users who buy multiple products
- **Subscriptions**: Add `expiresAt` field to session, validate on each request
- **Webhooks**: Chariow webhooks for automatic access revocation on refund
- **Email-based lookup**: If Chariow adds an endpoint to list licenses by email, enable "Forgot license key" flow
