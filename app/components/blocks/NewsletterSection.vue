<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')

async function submit() {
  errorMsg.value = ''
  if (!email.value.trim() || !email.value.includes('@')) {
    status.value = 'error'
    errorMsg.value = 'Please enter a valid email address.'
    if (inputRef.value) {
      gsap.fromTo(inputRef.value, { x: 0 }, { x: -6, duration: 0.06, ease: 'power1.out', yoyo: true, repeat: 5 })
    }
    return
  }
  status.value = 'loading'
  await new Promise(r => setTimeout(r, 900))
  status.value = 'success'
  email.value = ''
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const els = section.value?.querySelectorAll<HTMLElement>('.nl-enter')
  if (!els?.length) return

  gsap.fromTo(els,
    { y: 28, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: section.value, start: 'top bottom', once: true },
    },
  )
})
</script>

<template>
  <section ref="section" class="py-24 px-6 bg-zinc-950 relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/8 rounded-full blur-3xl" />
    </div>

    <div class="max-w-2xl mx-auto flex flex-col items-center gap-8 text-center relative z-10">

      <!-- Badge -->
      <div class="nl-enter flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        <span class="text-xs font-semibold text-indigo-400 tracking-wide">Stay in the loop</span>
      </div>

      <!-- Headline -->
      <div class="nl-enter flex flex-col gap-3">
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
          New components,<br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">every week.</span>
        </h2>
        <p class="text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
          Get notified when new blocks, templates, and components drop. No spam — unsubscribe anytime.
        </p>
      </div>

      <!-- Form -->
      <div class="nl-enter w-full">
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          leave-active-class="transition-all duration-200"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="status !== 'success'" key="form" class="flex flex-col gap-3 sm:flex-row sm:gap-2">
            <div class="relative flex-1">
              <input
                ref="inputRef"
                v-model="email"
                type="email"
                placeholder="you@company.com"
                @keydown.enter="submit"
                :disabled="status === 'loading'"
                class="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border text-sm text-white placeholder-zinc-600 focus:outline-none focus:bg-zinc-900 transition-all duration-200 disabled:opacity-60"
                :class="status === 'error' ? 'border-red-500/60 focus:border-red-500/80' : 'border-zinc-800 focus:border-indigo-500/50'"
              />
            </div>
            <button
              @click="submit"
              :disabled="status === 'loading'"
              class="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white text-sm font-semibold transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0 whitespace-nowrap"
            >
              <svg v-if="status === 'loading'" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" class="opacity-25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
              </svg>
              <template v-else>
                Subscribe
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m5 12 14 0M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </template>
            </button>
          </div>

          <div v-else key="success" class="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" />
              <path d="m9 11 3 3L22 4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-sm font-medium">You're in! We'll be in touch soon.</span>
          </div>
        </Transition>

        <!-- Validation error -->
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          leave-active-class="transition-all duration-150"
          leave-to-class="opacity-0"
        >
          <p v-if="status === 'error' && errorMsg" class="text-xs text-red-400 mt-2 text-left">{{ errorMsg }}</p>
        </Transition>
      </div>

      <!-- Social proof -->
      <div class="nl-enter flex items-center gap-2.5 text-xs text-zinc-600">
        <div class="flex -space-x-1.5">
          <div
            v-for="(c, i) in ['bg-indigo-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500']"
            :key="i"
            class="w-5 h-5 rounded-full border-2 border-zinc-950 flex items-center justify-center text-[7px] font-bold text-white"
            :class="c"
          >{{ ['A', 'B', 'C', 'D'][i] }}</div>
        </div>
        <span>Join 800+ developers already subscribed</span>
      </div>

    </div>
  </section>
</template>
