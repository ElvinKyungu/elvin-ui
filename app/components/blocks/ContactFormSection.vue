<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const form = reactive<FormState>({ name: '', email: '', subject: '', message: '' })
const errors = reactive<Partial<FormState>>({})
const status = ref<'idle' | 'loading' | 'success'>('idle')

function validate(): boolean {
  errors.name = form.name.trim() ? undefined : 'Name is required'
  errors.email = form.email.includes('@') ? undefined : 'Valid email required'
  errors.subject = form.subject.trim() ? undefined : 'Subject is required'
  errors.message = form.message.trim().length >= 10 ? undefined : 'Message must be at least 10 characters'
  return !Object.values(errors).some(Boolean)
}

async function submit() {
  if (!validate()) return
  status.value = 'loading'
  await new Promise(r => setTimeout(r, 1000))
  status.value = 'success'
}

function reset() {
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
  Object.assign(errors, { name: undefined, email: undefined, subject: undefined, message: undefined })
  status.value = 'idle'
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const cols = section.value?.querySelectorAll<HTMLElement>('.cf-col')
  if (cols?.length) {
    gsap.fromTo(cols,
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: section.value, start: 'top bottom', once: true },
      },
    )
  }
})
</script>

<template>
  <section ref="section" class="py-24 px-6 bg-zinc-950">
    <div class="max-w-5xl 2xl:max-w-[80rem] mx-auto flex flex-col gap-14">

      <!-- Header -->
      <div class="flex flex-col gap-2 text-center">
        <div class="flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Contact</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Get in touch</h2>
        <p class="text-sm text-zinc-500 max-w-md mx-auto">Have a question or want to work together? Drop us a message and we'll get back to you within 24 hours.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">

        <!-- Left panel -->
        <div class="cf-col lg:col-span-2 flex flex-col gap-6">
          <div class="flex flex-col gap-5">
            <div
              v-for="item in [
                { icon: '📧', label: 'Email', value: 'hello@elvin-ui.com' },
                { icon: '💬', label: 'Discord', value: 'discord.gg/elvinui' },
                { icon: '🐙', label: 'GitHub', value: 'github.com/elvinkyungu' },
              ]"
              :key="item.label"
              class="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60"
            >
              <span class="text-xl flex-shrink-0">{{ item.icon }}</span>
              <div>
                <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">{{ item.label }}</p>
                <p class="text-sm text-zinc-300">{{ item.value }}</p>
              </div>
            </div>
          </div>

          <div class="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex flex-col gap-2">
            <p class="text-sm font-semibold text-white">Response time</p>
            <p class="text-xs text-zinc-500 leading-relaxed">We typically respond within 24 hours on business days. For urgent matters, reach out via Discord.</p>
          </div>
        </div>

        <!-- Form -->
        <div class="cf-col lg:col-span-3">
          <Transition mode="out-in" enter-active-class="transition-all duration-300" enter-from-class="opacity-0 scale-98" leave-active-class="transition-all duration-200" leave-to-class="opacity-0">

            <div v-if="status === 'success'" key="success" class="h-full flex flex-col items-center justify-center gap-5 py-16 text-center">
              <div class="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                <svg class="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m9 11 3 3L22 4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" />
                </svg>
              </div>
              <div class="flex flex-col gap-1.5">
                <p class="text-lg font-semibold text-white">Message sent!</p>
                <p class="text-sm text-zinc-500">Thanks for reaching out. We'll be in touch soon.</p>
              </div>
              <button @click="reset" class="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">Send another message →</button>
            </div>

            <form v-else key="form" @submit.prevent="submit" class="flex flex-col gap-5 p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/30">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-semibold text-zinc-400">Name</label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Elvin Code"
                    class="px-3.5 py-2.5 rounded-lg bg-zinc-900 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    :class="errors.name ? 'border-red-500/60' : 'border-zinc-800 focus:border-emerald-500/50'"
                  />
                  <p v-if="errors.name" class="text-xs text-red-400">{{ errors.name }}</p>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-semibold text-zinc-400">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="you@company.com"
                    class="px-3.5 py-2.5 rounded-lg bg-zinc-900 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                    :class="errors.email ? 'border-red-500/60' : 'border-zinc-800 focus:border-emerald-500/50'"
                  />
                  <p v-if="errors.email" class="text-xs text-red-400">{{ errors.email }}</p>
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-400">Subject</label>
                <input
                  v-model="form.subject"
                  type="text"
                  placeholder="How can we help?"
                  class="px-3.5 py-2.5 rounded-lg bg-zinc-900 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                  :class="errors.subject ? 'border-red-500/60' : 'border-zinc-800 focus:border-emerald-500/50'"
                />
                <p v-if="errors.subject" class="text-xs text-red-400">{{ errors.subject }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-zinc-400">Message</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  placeholder="Tell us about your project..."
                  class="px-3.5 py-2.5 rounded-lg bg-zinc-900 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                  :class="errors.message ? 'border-red-500/60' : 'border-zinc-800 focus:border-emerald-500/50'"
                />
                <p v-if="errors.message" class="text-xs text-red-400">{{ errors.message }}</p>
              </div>

              <button
                type="submit"
                :disabled="status === 'loading'"
                class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <svg v-if="status === 'loading'" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" class="opacity-25" /><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
                </svg>
                <template v-else>
                  Send message
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m22 2-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </template>
              </button>
            </form>
          </Transition>
        </div>

      </div>
    </div>
  </section>
</template>
