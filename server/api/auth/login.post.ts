import { getUserSession } from '../../utils/session'
import { resolveAccessLevel } from '../../utils/products'

export default defineEventHandler(async (event) => {
  const { licenseKey } = await readBody(event)

  if (!licenseKey?.trim()) {
    throw createError({ statusCode: 400, message: 'License key required' })
  }

  const config = useRuntimeConfig(event)

  const response = await $fetch<any>(`https://api.chariow.com/v1/licenses/${licenseKey.trim()}`, {
    headers: { Authorization: `Bearer ${config.chariowApiKey}` },
  }).catch(() => null)

  if (!response?.data) {
    throw createError({ statusCode: 401, message: 'License key not found' })
  }

  const license = response.data

  if (!license.is_active) {
    throw createError({ statusCode: 401, message: 'License is not active' })
  }

  if (license.is_expired) {
    throw createError({ statusCode: 401, message: 'License has expired' })
  }

  const productId = license.product?.id ?? ''
  const accessLevel = resolveAccessLevel(
    productId,
    config.blocksPackProductId as string,
    config.fullAccessProductId as string,
  )

  if (!accessLevel) {
    throw createError({ statusCode: 401, message: 'This license does not grant access to any Elvin UI product' })
  }

  const session = await getUserSession(event)
  await session.update({
    licenseKey: licenseKey.trim(),
    productId,
    accessLevel,
    unlockedAt: Date.now(),
  })

  return { licenseKey: licenseKey.trim(), productId, accessLevel, unlockedAt: Date.now() }
})
