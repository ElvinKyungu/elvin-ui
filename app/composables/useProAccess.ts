const STORAGE_KEY = 'elvin:licenses'

function loadLicenses(): Record<string, string> {
  if (import.meta.server) return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  }
  catch {
    return {}
  }
}

function saveLicenses(licenses: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(licenses))
}

// Reactive store shared across all composable instances
const licenses = ref<Record<string, string>>({})

export function useProAccess() {
  onMounted(() => {
    licenses.value = loadLicenses()
  })

  function isUnlocked(productId: string): boolean {
    return !!licenses.value[productId]
  }

  function getStoredKey(productId: string): string | null {
    return licenses.value[productId] ?? null
  }

  async function unlockWithKey(licenseKey: string): Promise<{ success: boolean, productId?: string, error?: string }> {
    const data = await $fetch<{ valid: boolean, productId?: string, error?: string }>('/api/validate-license', {
      method: 'POST',
      body: { licenseKey },
    }).catch(() => null)

    if (!data?.valid) {
      return { success: false, error: data?.error ?? 'Invalid license key' }
    }

    if (data.productId) {
      const updated = { ...licenses.value, [data.productId]: licenseKey }
      licenses.value = updated
      saveLicenses(updated)
    }

    return { success: true, productId: data.productId }
  }

  return { isUnlocked, getStoredKey, unlockWithKey }
}
