export type AccessLevel = 'blocks' | 'full-access'

const SLUG_MAP: Record<string, AccessLevel> = {
  'elvin-ui': 'blocks',
  'elvin-ui-full-access': 'full-access',
}

export function resolveAccessLevel(productSlug: string): AccessLevel | null {
  return SLUG_MAP[productSlug] ?? null
}
