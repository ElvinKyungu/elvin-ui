<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section  = useTemplateRef('section')
const textCol  = useTemplateRef('textCol')
const codeCol  = useTemplateRef('codeCol')
const codeText = useTemplateRef('codeText')

const features = [
  'TypeScript strict mode',
  'GSAP micro-interactions built in',
  'SSR-safe for Nuxt 4',
  'Zero hidden dependencies',
]

let loopTimer: ReturnType<typeof setTimeout> | null = null

const startTypewriter = async () => {
  if (!codeText.value) return

  const { animate, splitText, stagger } = await import('animejs')

  const split = splitText(codeText.value, { chars: true })
  if (!split.chars.length) return

  const play = () => {
    animate(split.chars, {
      opacity: [{ from: 0 }, { to: 1 }],
      duration: 1,
      delay: stagger(44),
      ease: 'linear',
      onComplete: () => {
        loopTimer = setTimeout(() => {
          animate(split.chars, {
            opacity: 0,
            duration: 1,
            delay: stagger(18, { from: 'last' }),
            ease: 'linear',
            onComplete: () => {
              loopTimer = setTimeout(play, 500)
            },
          })
        }, 3000)
      },
    })
  }

  play()
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section.value, start: 'top 75%', once: true },
    defaults: { ease: 'power3.out', duration: 0.8 },
  })

  tl.from(textCol.value, { x: -40, opacity: 0 })
    .from(codeCol.value, { x: 40, opacity: 0 }, '-=0.5')
    .add(() => startTypewriter())
})

onUnmounted(() => {
  if (loopTimer) clearTimeout(loopTimer)
})
</script>

<template>
  <section ref="section" class="py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-16 items-center">

        <!-- Left: Text -->
        <div ref="textCol">
          <p class="text-xs text-indigo-400 font-medium tracking-widest uppercase mb-4">Built for speed</p>
          <h2 class="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Grab a component.<br>
            <span class="text-zinc-500">Drop it in your project.</span>
          </h2>
          <p class="text-zinc-400 leading-relaxed mb-8 text-base">
            Every component is self-contained, fully typed, and ready to paste.
            No config, no install, no hidden dependencies. Just working code.
          </p>

          <ul class="space-y-3 mb-10">
            <li v-for="feature in features" :key="feature" class="flex items-center gap-3">
              <span class="w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                <Icon name="lucide:check" class="w-3 h-3 text-indigo-400" />
              </span>
              <span class="text-sm text-zinc-300">{{ feature }}</span>
            </li>
          </ul>

          <UiButton size="lg">Browse components →</UiButton>
        </div>

        <!-- Right: Code editor -->
        <div ref="codeCol" class="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-2xl shadow-black/60">

          <!-- Mac window bar -->
          <div class="flex items-center gap-1.5 px-4 py-3 bg-[#161b22] border-b border-zinc-800">
            <span class="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span class="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span class="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span class="ml-3 text-xs text-zinc-500 font-mono">UiButton.vue</span>
          </div>

          <!-- Code block — splitText operates on plain text node only -->
          <pre class="p-6 text-sm font-mono leading-loose min-h-[210px] select-none overflow-hidden"><!--
         --><span ref="codeText" class="text-[#abb2bf]">&lt;UiButton
  variant="primary"
  size="md"
&gt;
  Get started &#8594;
&lt;/UiButton&gt;</span><!--
         --><span class="cursor-blink text-indigo-400"> ▋</span></pre>
        </div>

      </div>
    </div>
  </section>
</template>
