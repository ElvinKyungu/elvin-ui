<script setup lang="ts">
import { gsap } from 'gsap'

const card = useTemplateRef('card')

const form = reactive({ name: '', email: '', password: '', agree: false })
const errors = reactive({ name: '', email: '', password: '', agree: '' })
const showPassword = ref(false)
const status = ref<'idle' | 'loading' | 'success'>('idle')

const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return 0
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return score
})

const strengthLabel = computed(() => ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength.value])
const strengthColor = computed(() => ['', 'bg-red-500', 'bg-amber-500', 'bg-yellow-400', 'bg-emerald-500'][passwordStrength.value])

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Full name is required'
  errors.email = form.email.includes('@') ? '' : 'Valid email required'
  errors.password = form.password.length >= 8 ? '' : 'Password must be at least 8 characters'
  errors.agree = form.agree ? '' : 'You must accept the terms'
  return !Object.values(errors).some(Boolean)
}

async function submit() {
  if (!validate()) return
  status.value = 'loading'
  await new Promise(r => setTimeout(r, 1000))
  status.value = 'success'
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
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-3xl" />
    </div>

    <div ref="card" class="relative w-full max-w-sm">

      <Transition mode="out-in" enter-active-class="transition-all duration-400" enter-from-class="opacity-0 scale-95" leave-active-class="transition-all duration-200" leave-to-class="opacity-0 scale-95">

        <!-- Success -->
        <div v-if="status === 'success'" key="success" class="flex flex-col items-center gap-6 py-12 text-center p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/60">
          <div class="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
            <svg class="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m9 11 3 3L22 4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" />
            </svg>
          </div>
          <div>
            <p class="text-xl font-bold text-white">Account created!</p>
            <p class="text-sm text-zinc-500 mt-1">Welcome aboard, {{ form.name.split(' ')[0] }}. Check your inbox to verify your email.</p>
          </div>
        </div>

        <!-- Form -->
        <div v-else key="form" class="flex flex-col gap-6 p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke-linecap="round" /><circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-linecap="round" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">Create an account</h2>
              <p class="text-sm text-zinc-500 mt-0.5">Start building in minutes</p>
            </div>
          </div>

          <form @submit.prevent="submit" class="flex flex-col gap-4">
            <!-- Full name -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-zinc-400">Full name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Vander Otis"
                class="px-3.5 py-2.5 rounded-lg bg-zinc-900 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                :class="errors.name ? 'border-red-500/60' : 'border-zinc-800 focus:border-violet-500/50'"
              />
              <p v-if="errors.name" class="text-xs text-red-400">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-zinc-400">Email address</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="you@company.com"
                class="px-3.5 py-2.5 rounded-lg bg-zinc-900 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                :class="errors.email ? 'border-red-500/60' : 'border-zinc-800 focus:border-violet-500/50'"
              />
              <p v-if="errors.email" class="text-xs text-red-400">{{ errors.email }}</p>
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-zinc-400">Password</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Min. 8 characters"
                  class="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-zinc-900 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                  :class="errors.password ? 'border-red-500/60' : 'border-zinc-800 focus:border-violet-500/50'"
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path v-if="showPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke-linecap="round" />
                    <path v-if="showPassword" d="m1 1 22 22" stroke-linecap="round" />
                    <template v-else>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </template>
                  </svg>
                </button>
              </div>
              <!-- Strength meter -->
              <div v-if="form.password" class="flex flex-col gap-1">
                <div class="flex gap-1">
                  <div v-for="i in 4" :key="i" class="flex-1 h-1 rounded-full transition-all duration-200" :class="i <= passwordStrength ? strengthColor : 'bg-zinc-800'" />
                </div>
                <p class="text-xs" :class="['text-zinc-500', 'text-red-400', 'text-amber-400', 'text-yellow-400', 'text-emerald-400'][passwordStrength]">{{ strengthLabel }}</p>
              </div>
              <p v-if="errors.password" class="text-xs text-red-400">{{ errors.password }}</p>
            </div>

            <!-- Terms -->
            <label class="flex items-start gap-2.5 cursor-pointer select-none">
              <button
                type="button"
                @click="form.agree = !form.agree"
                class="mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all duration-150 flex-shrink-0"
                :class="form.agree ? 'bg-violet-500 border-violet-500' : errors.agree ? 'border-red-500/60' : 'border-zinc-700 hover:border-zinc-500'"
              >
                <svg v-if="form.agree" class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m20 6-11 11-5-5" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
              <span class="text-xs text-zinc-500 leading-relaxed">
                I agree to the <a href="#" class="text-violet-400 hover:text-violet-300">Terms of Service</a> and <a href="#" class="text-violet-400 hover:text-violet-300">Privacy Policy</a>
              </span>
            </label>
            <p v-if="errors.agree" class="text-xs text-red-400 -mt-2">{{ errors.agree }}</p>

            <button
              type="submit"
              :disabled="status === 'loading'"
              class="py-3 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <svg v-if="status === 'loading'" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" class="opacity-25" /><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
              </svg>
              <template v-else>Create account</template>
            </button>
          </form>

          <p class="text-center text-xs text-zinc-600">
            Already have an account?
            <a href="#" class="text-violet-400 hover:text-violet-300 transition-colors font-medium">Sign in</a>
          </p>
        </div>
      </Transition>
    </div>
  </section>
</template>
