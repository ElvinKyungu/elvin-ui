<script setup lang="ts">
import { gsap } from 'gsap'

const card = useTemplateRef('card')

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const remember = ref(false)
const status = ref<'idle' | 'loading' | 'error'>('idle')
const errorMsg = ref('')

async function submit() {
  errorMsg.value = ''
  if (!email.value.includes('@') || password.value.length < 6) {
    status.value = 'error'
    errorMsg.value = 'Invalid credentials. Please try again.'
    if (card.value) {
      gsap.fromTo(card.value, { x: 0 }, { x: -8, duration: 0.07, ease: 'power1.out', yoyo: true, repeat: 5 })
    }
    return
  }
  status.value = 'loading'
  await new Promise(r => setTimeout(r, 1000))
  status.value = 'idle'
}

onMounted(() => {
  if (!card.value) return
  gsap.fromTo(card.value,
    { y: 32, opacity: 0, scale: 0.97 },
    { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
  )
})
</script>

<template>
  <section class="py-24 px-6 bg-zinc-950 flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-emerald-600/6 rounded-full blur-3xl" />
    </div>

    <div ref="card" class="relative w-full max-w-sm flex flex-col gap-6 p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm">

      <!-- Logo & heading -->
      <div class="flex flex-col items-center gap-4 text-center">
        <UiLogo :size="40" color="white" />
        <div>
          <h2 class="text-xl font-bold text-white">Welcome back</h2>
          <p class="text-sm text-zinc-500 mt-0.5">Sign in to your account</p>
        </div>
      </div>

      <!-- Socials -->
      <div class="grid grid-cols-2 gap-2.5">
        <button class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 text-sm font-medium transition-all duration-150">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 text-sm font-medium transition-all duration-150">
          <svg class="w-4 h-4 text-zinc-200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </button>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex-1 h-px bg-zinc-800" />
        <span class="text-xs text-zinc-600">or continue with email</span>
        <div class="flex-1 h-px bg-zinc-800" />
      </div>

      <!-- Error -->
      <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150" leave-to-class="opacity-0">
        <div v-if="status === 'error'" class="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs -mt-2">
          <svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" stroke-linecap="round" /></svg>
          {{ errorMsg }}
        </div>
      </Transition>

      <!-- Fields -->
      <form @submit.prevent="submit" class="flex flex-col gap-4 -mt-2">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-zinc-400">Email address</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@company.com"
            class="px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-zinc-400">Password</label>
            <button type="button" class="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Forgot password?</button>
          </div>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <template v-if="showPassword">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke-linecap="round" />
                  <path d="m1 1 22 22" stroke-linecap="round" />
                </template>
                <template v-else>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </template>
              </svg>
            </button>
          </div>
        </div>

        <label class="flex items-center gap-2.5 cursor-pointer select-none">
          <button
            type="button"
            @click="remember = !remember"
            class="w-4 h-4 rounded border flex items-center justify-center transition-all duration-150 flex-shrink-0"
            :class="remember ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-700 hover:border-zinc-500'"
          >
            <svg v-if="remember" class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m20 6-11 11-5-5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <span class="text-xs text-zinc-500">Remember me for 30 days</span>
        </label>

        <button
          type="submit"
          :disabled="status === 'loading'"
          class="py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <svg v-if="status === 'loading'" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" class="opacity-25" /><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
          </svg>
          <template v-else>Sign in</template>
        </button>
      </form>

      <p class="text-center text-xs text-zinc-600">
        Don't have an account?
        <a href="#" class="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">Create one free</a>
      </p>

    </div>
  </section>
</template>
