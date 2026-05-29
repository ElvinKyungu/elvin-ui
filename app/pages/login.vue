<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({ title: 'Login — Elvin UI', robots: 'noindex' })

const { isAuthenticated, login } = useAuth()

if (isAuthenticated.value) await navigateTo('/dashboard')

const route = useRoute()
const licenseKey = ref('')
const error = ref('')
const loading = ref(false)
const success = ref(false)

// Auto-show key entry when redirected from Chariow checkout
const autoFocus = computed(() => !!route.query['enter-key'])

async function handleLogin() {
  if (!licenseKey.value.trim()) {
    error.value = 'Please enter your license key'
    return
  }

  loading.value = true
  error.value = ''

  const result = await login(licenseKey.value.trim())

  if (!result.success) {
    error.value = result.error ?? 'Invalid license key'
    loading.value = false
    return
  }

  success.value = true
  await navigateTo('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">

    <!-- Grid bg -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_0.3px,transparent_0.8px)] bg-[size:64px_64px]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff08_0.3px,transparent_0.8px)] bg-[size:60px_60px]" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(66,184,131,0.08),transparent)]" />
    </div>

    <div class="w-full max-w-sm relative z-10 flex flex-col items-center gap-8">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <UiLogo class="w-7 h-7" />
        <span class="text-base font-bold text-white tracking-tight">Elvin UI</span>
      </NuxtLink>

      <!-- Card -->
      <div class="w-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 flex flex-col gap-6 shadow-2xl shadow-black/50">

        <div class="flex flex-col gap-1.5">
          <h1 class="text-xl font-bold text-white tracking-tight">Welcome back</h1>
          <p class="text-sm text-zinc-500 leading-relaxed">
            Enter your license key to access your purchased products.
          </p>
        </div>

        <div v-if="route.query['enter-key']" class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-accent/10 border border-accent/20">
          <svg class="w-4 h-4 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="text-xs text-accent font-medium">Payment confirmed. Enter your license key below.</p>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-zinc-400">License key</label>
            <input
              v-model="licenseKey"
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              :disabled="loading || success"
              :autofocus="autoFocus"
              @keydown.enter="handleLogin"
              class="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-600 font-mono tracking-wider focus:outline-none focus:border-zinc-500 transition-colors disabled:opacity-50"
            />
            <p class="text-xs text-zinc-600">Check your email from Chariow after purchase.</p>
          </div>

          <p v-if="error" class="text-xs text-red-400 text-center">{{ error }}</p>

          <button
            v-if="!success"
            @click="handleLogin"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round" />
            </svg>
            <span>{{ loading ? 'Verifying...' : 'Unlock access' }}</span>
          </button>

          <div
            v-else
            class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Access granted — redirecting...
          </div>
        </div>

        <div class="border-t border-zinc-800/60 pt-5 flex flex-col gap-2 text-center">
          <p class="text-xs text-zinc-500">
            Don't have a license key?
            <NuxtLink to="/pricing" class="text-zinc-300 hover:text-white transition-colors underline underline-offset-2">
              View pricing
            </NuxtLink>
          </p>
          <p class="text-xs text-zinc-600">
            Need help?
            <a href="mailto:elvinkyungu.75@gmail.com" class="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2">
              Contact support
            </a>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
