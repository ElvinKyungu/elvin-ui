export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { licenseKey } = await readBody(event)

  if (!licenseKey) {
    throw createError({ statusCode: 400, message: 'License key required' })
  }

  const response = await $fetch<any>(`https://api.chariow.com/v1/licenses/${licenseKey}`, {
    headers: { 'Authorization': `Bearer ${config.chariowApiKey}` },
  }).catch(() => null)

  if (!response?.data) {
    return { valid: false, error: 'License not found' }
  }

  const license = response.data

  if (!license.is_active) {
    return { valid: false, error: 'License is not active' }
  }

  if (license.is_expired) {
    return { valid: false, error: 'License has expired' }
  }

  return {
    valid: true,
    productId: license.product?.id ?? null,
    productSlug: license.product?.slug ?? null,
  }
})
