import type { H3Event } from 'h3'

export interface SessionData {
  licenseKey: string
  productId: string
  accessLevel: 'blocks' | 'full-access'
  unlockedAt: number
}

export async function getUserSession(event: H3Event) {
  const config = useRuntimeConfig(event)
  return useSession<SessionData>(event, {
    password: config.sessionSecret as string,
    name: '__elvin_session',
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function requireSession(event: H3Event): Promise<SessionData> {
  const session = await getUserSession(event)
  if (!session.data?.licenseKey) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }
  return session.data as SessionData
}
