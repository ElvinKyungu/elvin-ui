export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, hasFullAccess } = useAuth()
  if (!isAuthenticated.value) return navigateTo('/login')
  if (!hasFullAccess.value) return navigateTo('/pricing')
})
