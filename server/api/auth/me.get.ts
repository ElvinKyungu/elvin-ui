import { getUserSession } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.data?.licenseKey) return null
  return session.data
})
