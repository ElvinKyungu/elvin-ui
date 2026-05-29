<script setup lang="ts">
definePageMeta({ middleware: 'require-auth' })

useSeoMeta({ title: 'Dashboard — Elvin UI', robots: 'noindex' })

const { user, hasBlocksAccess, hasFullAccess, logout } = useAuth()

const accessLabel = computed(() => {
  if (hasFullAccess.value) return 'Full Access'
  if (hasBlocksAccess.value) return 'Blocks Pack'
  return null
})

const unlockedDate = computed(() => {
  if (!user.value?.unlockedAt) return null
  return new Date(user.value.unlockedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
})

const maskedKey = computed(() => {
  const key = user.value?.licenseKey ?? ''
  if (key.length <= 8) return key
  return key.slice(0, 4) + '-••••-••••-' + key.slice(-4)
})

const blocksFeatures = [
  'All 20+ blocks source code',
  'GSAP animations included',
  'TailwindCSS — no custom CSS',
  'Nuxt 4 ready — copy-paste',
  'Lifetime access',
]

const templatesFeatures = [
  'SaaS, Dashboard, E-commerce',
  'Marketing, Finance, Social',
  'Productivity templates',
  'All future templates',
  'Lifetime access',
]

async function handleLogout() {
  await logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white">

    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_0.3px,transparent_0.8px)] bg-[size:64px_64px]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff08_0.3px,transparent_0.8px)] bg-[size:60px_60px]" />
    </div>

    <BlocksNavBar />

    <div class="pt-20 pb-24 px-6 relative z-10 max-w-4xl mx-auto">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2.5 mb-1">
            <h1 class="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
            <span
              v-if="accessLabel"
              :class="[
                'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border',
                hasFullAccess
                  ? 'bg-accent/15 text-accent border-accent/20'
                  : 'bg-amber-400/15 text-amber-400 border-amber-400/20',
              ]"
            >{{ accessLabel }}</span>
          </div>
          <p class="text-sm text-zinc-500">Manage your purchased products and access.</p>
        </div>
        <button
          @click="handleLogout"
          class="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:border-zinc-500 hover:text-white transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke-linecap="round" stroke-linejoin="round" />
            <polyline points="16 17 21 12 16 7" stroke-linecap="round" stroke-linejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke-linecap="round" />
          </svg>
          Sign out
        </button>
      </div>

      <!-- Products grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

        <!-- Blocks Pack -->
        <div
          :class="[
            'rounded-2xl border p-6 flex flex-col gap-5 transition-colors',
            hasBlocksAccess
              ? 'bg-zinc-900/60 border-zinc-800'
              : 'bg-zinc-900/30 border-zinc-800/50 opacity-50',
          ]"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <h2 class="text-sm font-semibold text-white">Blocks Pack</h2>
              </div>
              <p class="text-xs text-zinc-500">All UI blocks source code</p>
            </div>
            <span
              :class="[
                'flex-shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border',
                hasBlocksAccess
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                  : 'bg-zinc-800 text-zinc-600 border-zinc-700/50',
              ]"
            >{{ hasBlocksAccess ? 'Unlocked' : 'Locked' }}</span>
          </div>

          <ul class="flex flex-col gap-2">
            <li
              v-for="feature in blocksFeatures"
              :key="feature"
              class="flex items-center gap-2 text-xs text-zinc-400"
            >
              <svg
                :class="['w-3.5 h-3.5 flex-shrink-0', hasBlocksAccess ? 'text-emerald-400' : 'text-zinc-700']"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              >
                <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ feature }}
            </li>
          </ul>

          <NuxtLink
            v-if="hasBlocksAccess"
            to="/blocks"
            class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            Browse blocks
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
          <NuxtLink
            v-else
            to="/pricing"
            class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-500 text-sm font-medium hover:border-zinc-600 hover:text-zinc-300 transition-colors"
          >
            Unlock for $39
          </NuxtLink>
        </div>

        <!-- Full Access -->
        <div
          :class="[
            'rounded-2xl border p-6 flex flex-col gap-5 transition-colors',
            hasFullAccess
              ? 'bg-zinc-900/60 border-zinc-800'
              : 'bg-zinc-900/30 border-zinc-800/50 opacity-50',
          ]"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h2 class="text-sm font-semibold text-white">Full Access</h2>
              </div>
              <p class="text-xs text-zinc-500">Blocks + all premium templates</p>
            </div>
            <span
              :class="[
                'flex-shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border',
                hasFullAccess
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                  : 'bg-zinc-800 text-zinc-600 border-zinc-700/50',
              ]"
            >{{ hasFullAccess ? 'Unlocked' : 'Locked' }}</span>
          </div>

          <ul class="flex flex-col gap-2">
            <li
              v-for="feature in templatesFeatures"
              :key="feature"
              class="flex items-center gap-2 text-xs text-zinc-400"
            >
              <svg
                :class="['w-3.5 h-3.5 flex-shrink-0', hasFullAccess ? 'text-emerald-400' : 'text-zinc-700']"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              >
                <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ feature }}
            </li>
          </ul>

          <NuxtLink
            v-if="hasFullAccess"
            to="/templates"
            class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            Browse templates
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
          <NuxtLink
            v-else
            to="/pricing"
            class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-500 text-sm font-medium hover:border-zinc-600 hover:text-zinc-300 transition-colors"
          >
            Unlock for $99
          </NuxtLink>
        </div>
      </div>

      <!-- Account info -->
      <div class="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
        <h2 class="text-sm font-semibold text-white mb-4">Account</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-xs text-zinc-500 uppercase tracking-widest font-medium">License key</span>
            <span class="text-sm text-zinc-300 font-mono tracking-wider">{{ maskedKey }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-zinc-500 uppercase tracking-widest font-medium">Access level</span>
            <span class="text-sm text-zinc-300">{{ accessLabel ?? '—' }}</span>
          </div>
          <div v-if="unlockedDate" class="flex flex-col gap-1">
            <span class="text-xs text-zinc-500 uppercase tracking-widest font-medium">Unlocked on</span>
            <span class="text-sm text-zinc-300">{{ unlockedDate }}</span>
          </div>
        </div>
      </div>

    </div>

    <div class="border-t border-zinc-800/60 relative z-10">
      <BlocksFooterSection />
    </div>
  </div>
</template>
