<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section  = useTemplateRef('section')
const textCol  = useTemplateRef('textCol')
const codeCol  = useTemplateRef('codeCol')

const features = [
  'TypeScript strict mode',
  'GSAP micro-interactions built in',
  'SSR-safe for Nuxt 4',
  'Zero hidden dependencies',
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section.value, start: 'top 75%' },
    defaults: { ease: 'power3.out', duration: 0.8 },
  })

  tl.from(textCol.value, { x: -40, opacity: 0 })
    .from(codeCol.value, { x: 40, opacity: 0 }, '-=0.5')
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
            Every component is self-contained, fully typed, and ready to paste. No config, no install, no hidden dependencies. Just working code.
          </p>

          <ul class="space-y-3 mb-10">
            <li
              v-for="feature in features"
              :key="feature"
              class="flex items-center gap-3"
            >
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

          <!-- Syntax highlighted code — One Dark theme -->
          <pre class="p-6 text-[13px] font-mono leading-relaxed overflow-x-auto text-[#abb2bf] select-text"><span class="text-[#e06c75]">&lt;script</span> <span class="text-[#d19a66]">setup</span> <span class="text-[#d19a66]">lang</span><span class="text-[#abb2bf]">=</span><span class="text-[#98c379]">"ts"</span><span class="text-[#e06c75]">&gt;</span>
<span class="text-[#c678dd]">interface</span> <span class="text-[#e5c07b]">Props</span> <span class="text-[#abb2bf]">{</span>
  <span class="text-[#e06c75]">variant</span><span class="text-[#abb2bf]">?:</span> <span class="text-[#98c379]">'primary'</span> <span class="text-[#abb2bf]">|</span> <span class="text-[#98c379]">'secondary'</span> <span class="text-[#abb2bf]">|</span> <span class="text-[#98c379]">'ghost'</span>
  <span class="text-[#e06c75]">size</span><span class="text-[#abb2bf]">?:</span> <span class="text-[#98c379]">'sm'</span> <span class="text-[#abb2bf]">|</span> <span class="text-[#98c379]">'md'</span> <span class="text-[#abb2bf]">|</span> <span class="text-[#98c379]">'lg'</span>
  <span class="text-[#e06c75]">disabled</span><span class="text-[#abb2bf]">?:</span> <span class="text-[#c678dd]">boolean</span>
<span class="text-[#abb2bf]">}</span>

<span class="text-[#c678dd]">const</span> <span class="text-[#e5c07b]">props</span> <span class="text-[#abb2bf]">=</span> <span class="text-[#61afef]">withDefaults</span><span class="text-[#abb2bf]">(</span>
  <span class="text-[#61afef]">defineProps</span><span class="text-[#abb2bf]">&lt;</span><span class="text-[#e5c07b]">Props</span><span class="text-[#abb2bf]">&gt;(), {</span>
    <span class="text-[#d19a66]">variant</span><span class="text-[#abb2bf]">:</span> <span class="text-[#98c379]">'primary'</span><span class="text-[#abb2bf]">,</span>
    <span class="text-[#d19a66]">size</span><span class="text-[#abb2bf]">:</span> <span class="text-[#98c379]">'md'</span><span class="text-[#abb2bf]">,</span>
    <span class="text-[#d19a66]">disabled</span><span class="text-[#abb2bf]">:</span> <span class="text-[#c678dd]">false</span><span class="text-[#abb2bf]">,</span>
  <span class="text-[#abb2bf]">}</span>
<span class="text-[#abb2bf]">)</span>
<span class="text-[#e06c75]">&lt;/script&gt;</span>

<span class="text-[#e06c75]">&lt;template&gt;</span>
  <span class="text-[#e06c75]">&lt;button</span>
    <span class="text-[#d19a66]">:class</span><span class="text-[#abb2bf]">="[</span><span class="text-[#98c379]">'rounded-lg font-medium'</span><span class="text-[#abb2bf]">, {</span>
      <span class="text-[#98c379]">'bg-white text-zinc-950'</span><span class="text-[#abb2bf]">:</span> <span class="text-[#e5c07b]">variant</span> <span class="text-[#abb2bf]">===</span> <span class="text-[#98c379]">'primary'</span><span class="text-[#abb2bf]">,</span>
      <span class="text-[#98c379]">'border border-zinc-700'</span><span class="text-[#abb2bf]">:</span> <span class="text-[#e5c07b]">variant</span> <span class="text-[#abb2bf]">===</span> <span class="text-[#98c379]">'ghost'</span><span class="text-[#abb2bf]">,</span>
    <span class="text-[#abb2bf]">}]"</span>
    <span class="text-[#d19a66]">:disabled</span><span class="text-[#abb2bf]">="</span><span class="text-[#e5c07b]">disabled</span><span class="text-[#abb2bf]">"</span>
  <span class="text-[#e06c75]">&gt;</span>
    <span class="text-[#e06c75]">&lt;slot /&gt;</span>
  <span class="text-[#e06c75]">&lt;/button&gt;</span>
<span class="text-[#e06c75]">&lt;/template&gt;</span></pre>
        </div>

      </div>
    </div>
  </section>
</template>
