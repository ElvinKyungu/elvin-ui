export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, hasBlocksAccess } = useAuth()
  if (!isAuthenticated.value) return navigateTo('/login')
  if (!hasBlocksAccess.value) return navigateTo('/pricing')
})
