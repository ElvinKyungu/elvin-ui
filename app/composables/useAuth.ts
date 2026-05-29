interface AuthUser {
  licenseKey: string
  productId: string
  accessLevel: 'blocks' | 'full-access'
  unlockedAt: number
}

// Module-level state — shared across all composable calls (SPA, no SSR)
const user = ref<AuthUser | null>(null)
const initialized = ref(false)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  const hasBlocksAccess = computed(() =>
    user.value?.accessLevel === 'blocks' || user.value?.accessLevel === 'full-access',
  )

  const hasFullAccess = computed(() => user.value?.accessLevel === 'full-access')

  async function init() {
    if (initialized.value) return
    try {
      const data = await $fetch<AuthUser | null>('/api/auth/me')
      user.value = data ?? null
    }
    catch {
      user.value = null
    }
    finally {
      initialized.value = true
    }
  }

  async function login(licenseKey: string): Promise<{ success: boolean, accessLevel?: 'blocks' | 'full-access', error?: string }> {
    try {
      const data = await $fetch<AuthUser>('/api/auth/login', {
        method: 'POST',
        body: { licenseKey },
      })
      user.value = data
      return { success: true, accessLevel: data.accessLevel }
    }
    catch (e: any) {
      return { success: false, error: e.data?.message ?? 'Invalid license key' }
    }
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
    user.value = null
    initialized.value = false
  }

  return { user, isAuthenticated, hasBlocksAccess, hasFullAccess, init, login, logout }
}
