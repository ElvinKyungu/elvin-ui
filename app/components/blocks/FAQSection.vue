<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = useTemplateRef('section')

const faqs = [
  { q: 'Is Elvin UI free to use?', a: 'Yes, completely free and open-source under the MIT license. Copy, modify, ship — no attribution required.' },
  { q: 'Does it work with Nuxt 4?', a: 'Elvin UI is built specifically for Nuxt 4 with the Composition API. Every component uses <script setup>, auto-imports, and follows Nuxt 4 conventions.' },
  { q: 'Do I need to install a package?', a: "No package to install. Just copy the component source code into your project and you're done. It's the copy-paste philosophy." },
  { q: 'Are the animations performance-friendly?', a: 'All animations use GSAP with hardware-accelerated transforms. They\'re designed to be micro-interactions only — subtle, purposeful, never distracting.' },
  { q: 'Can I customize the styles?', a: 'Absolutely. Everything is plain Tailwind CSS. Change colors, spacing, sizes — it\'s all inline and predictable.' },
  { q: 'Is TypeScript support included?', a: 'Every component is written in TypeScript strict mode with fully typed props, emits, and composables. No any escapes.' },
]

const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const items = section.value?.querySelectorAll<HTMLElement>('.faq-item')
  if (items?.length) {
    gsap.fromTo(items,
      { y: 24, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: section.value, start: 'top 75%', once: true },
      },
    )
  }
})
</script>

<template>
  <section ref="section" class="py-24 px-6 bg-zinc-950">
    <div class="max-w-3xl 2xl:max-w-[72rem] mx-auto flex flex-col gap-14">

      <!-- Header -->
      <div class="flex flex-col gap-2 text-center">
        <div class="flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest">FAQ</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">Frequently asked questions</h2>
        <p class="text-sm text-zinc-500 max-w-md mx-auto">Everything you need to know about Elvin UI. Can't find an answer? Open an issue on GitHub.</p>
      </div>

      <!-- Accordion -->
      <div class="flex flex-col gap-3">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="faq-item rounded-xl border border-zinc-800/80 bg-zinc-900/30 overflow-hidden transition-colors duration-200"
          :class="openIndex === i ? 'border-zinc-700/60' : 'hover:border-zinc-800'"
        >
          <button
            @click="toggle(i)"
            class="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
          >
            <span class="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{{ faq.q }}</span>
            <span
              class="flex-shrink-0 w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center transition-all duration-300"
              :class="openIndex === i ? 'bg-emerald-500 border-emerald-500 rotate-45' : 'group-hover:border-zinc-500'"
            >
              <svg class="w-2.5 h-2.5" :class="openIndex === i ? 'text-white' : 'text-zinc-500'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 5v14M5 12h14" stroke-linecap="round" />
              </svg>
            </span>
          </button>

          <Transition
            @enter="(el) => { const e = el as HTMLElement; e.style.height = '0'; e.style.overflow = 'hidden'; requestAnimationFrame(() => { gsap.to(e, { height: e.scrollHeight, duration: 0.32, ease: 'power3.out', onComplete: () => { e.style.height = 'auto'; e.style.overflow = '' } }) }) }"
            @leave="(el, done) => { const e = el as HTMLElement; e.style.overflow = 'hidden'; gsap.to(e, { height: 0, duration: 0.22, ease: 'power3.in', onComplete: done }) }"
            :css="false"
          >
            <div v-if="openIndex === i">
              <p class="px-6 pb-5 text-sm text-zinc-400 leading-relaxed">{{ faq.a }}</p>
            </div>
          </Transition>
        </div>
      </div>

    </div>
  </section>
</template>
