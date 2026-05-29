export function useProAccess() {
  const { hasBlocksAccess, hasFullAccess } = useAuth()
  const { public: { blocksPackProductId } } = useRuntimeConfig()

  function isUnlocked(productId: string): boolean {
    if (!productId) return true
    if (productId === blocksPackProductId) return hasBlocksAccess.value
    return hasFullAccess.value
  }

  return { isUnlocked }
}
