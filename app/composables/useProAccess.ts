export function useProAccess() {
  const { hasBlocksAccess, hasFullAccess } = useAuth()

  function isUnlocked(productId: string): boolean {
    if (!productId) return true
    // Blocks Pack slug
    if (productId === 'elvin-ui') return hasBlocksAccess.value
    // Any other pro product requires full access
    return hasFullAccess.value
  }

  return { isUnlocked }
}
