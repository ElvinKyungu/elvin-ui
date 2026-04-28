<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const section = useTemplateRef('section')
const textCol = useTemplateRef('textCol')
const codeCol = useTemplateRef('codeCol')
const codeContent = useTemplateRef('codeContent') // Nouveau ref direct sur le texte

let split: SplitType | null = null
let ctx: gsap.Context | null = null

const startTyping = () => {
  if (!split) return

  // On remet tout à zéro avant de commencer
  gsap.set(split.chars, { opacity: 0, y: 5 })

  const tl = gsap.timeline({
    repeat: -1, // Boucle infinie
    repeatDelay: 3 // Pause de 3s avant de recommencer
  })

  tl.to(split.chars, {
    opacity: 1,
    y: 0,
    duration: 0.1,
    stagger: 0.03, // Effet machine à écrire
    ease: "power1.out"
  })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // On initialise SplitType
  if (codeContent.value) {
    split = new SplitType(codeContent.value, { types: 'chars' })
  }

  // Utilisation de gsap.context pour un nettoyage facile
  ctx = gsap.context(() => {
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: section.value,
        start: 'top 75%',
        once: true,
      },
    })

    mainTl.from(textCol.value, { x: -40, opacity: 0, duration: 0.8 })
    mainTl.from(codeCol.value, { x: 40, opacity: 0, duration: 0.8 }, '-=0.4')
    mainTl.add(() => startTyping())
  })
})

onUnmounted(() => {
  ctx?.revert() // Nettoie toutes les animations GSAP
  split?.revert() // Remet le texte d'origine
})

const features = ["Fully Typed", "Zero Dependencies", "Tailwind CSS", "Copy & Paste"]
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
            Every component is self-contained, fully typed, and ready to paste. No config, no install, no hidden dependencies. Just working code.
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

        <!-- Right: Code editor with typewriter effect -->
        <div ref="codeCol" class="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-2xl">
    <div class="flex items-center gap-1.5 px-4 py-3 bg-[#161b22] border-b border-zinc-800">
      <span class="w-3 h-3 rounded-full bg-[#ff5f56]" />
      <span class="w-3 h-3 rounded-full bg-[#ffbd2e]" />
      <span class="w-3 h-3 rounded-full bg-[#27c93f]" />
      <span class="ml-3 text-xs text-zinc-500 font-mono">UiButton.vue</span>
    </div>

    <pre ref="codeContent" class="p-6 text-sm font-mono leading-loose text-[#abb2bf] min-h-[200px]">&lt;UiButton variant="primary"
  size="md"
&gt;
  Get started &rarr;
&lt;/UiButton&gt;<span class="cursor-blink text-indigo-400">▋</span></pre>
  </div>

      </div>
    </div>
  </section>
</template>
<style scoped>
.cursor-blink {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
/* Important pour garder les couleurs après le SplitType */
:deep(.char) {
  display: inline-block;
}
</style>