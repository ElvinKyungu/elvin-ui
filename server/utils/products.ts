export type AccessLevel = 'blocks' | 'full-access'

export function resolveAccessLevel(
  productId: string,
  blocksPackProductId: string,
  fullAccessProductId: string,
): AccessLevel | null {
  if (fullAccessProductId && productId === fullAccessProductId) return 'full-access'
  if (blocksPackProductId && productId === blocksPackProductId) return 'blocks'
  return null
}
