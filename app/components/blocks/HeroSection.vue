<script setup lang="ts">
import { gsap } from "gsap";

const badge = useTemplateRef("badge");
const line1 = useTemplateRef("line1");
const line2 = useTemplateRef("line2");
const desc = useTemplateRef("desc");
const ctas = useTemplateRef("ctas");
const card = useTemplateRef("card");

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(badge.value, { y: 16, opacity: 0, duration: 0.6 })
    .from(line1.value, { y: 28, opacity: 0, duration: 0.7 }, "-=0.35")
    .from(line2.value, { y: 28, opacity: 0, duration: 0.7 }, "-=0.55")
    .from(desc.value, { y: 16, opacity: 0, duration: 0.6 }, "-=0.4")
    .from(ctas.value, { y: 12, opacity: 0, duration: 0.6 }, "-=0.35")
    .from(
      card.value,
      { y: 40, opacity: 0, duration: 1, ease: "power4.out" },
      "-=0.45",
    );

  gsap.to(card.value, {
    y: -12,
    duration: 3.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 1.4,
  });
});
</script>

<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center pt-14 overflow-hidden"
  >
    <!-- Glow -->
    <div
      class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/30 rounded-full blur-[140px] pointer-events-none"
    />

    <div
      class="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full"
    >
      <!-- Badge -->
      <div
        ref="badge"
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700/80 bg-zinc-900/80 text-xs text-zinc-400 mb-8 backdrop-blur-sm"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        Open source · Nuxt 4 · Copy-paste ready
      </div>

      <!-- Headline -->
      <h1 class="font-bold tracking-tight leading-none mb-6">
        <span ref="line1" class="block text-6xl md:text-8xl text-white"
          >Don't install.</span
        >
        <span ref="line2" class="block text-6xl md:text-8xl text-zinc-600"
          >Just copy.</span
        >
      </h1>

      <!-- Description -->
      <p
        ref="desc"
        class="text-lg text-zinc-400 max-w-lg mx-auto mb-10 leading-relaxed"
      >
        Production-ready Nuxt 4 components. TypeScript, Tailwind, GSAP
        micro-interactions — grab the code and ship.
      </p>

      <!-- CTAs -->
      <div
        ref="ctas"
        class="flex items-center justify-center gap-3 flex-wrap mb-24"
      >
        <UiButton size="lg">Browse components</UiButton>
        <UiButton size="lg" variant="ghost">View on GitHub →</UiButton>
      </div>

      <!-- Preview card -->
      <div
        ref="card"
        class="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-5 shadow-2xl shadow-black/60 text-left"
      >
        <!-- Window chrome -->
        <div class="flex items-center gap-1.5 mb-5">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span class="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span class="ml-3 text-xs text-zinc-600 font-mono">UiButton.vue</span>
        </div>

        <!-- Components preview -->
        <div class="flex flex-wrap gap-2 mb-4">
          <UiButton variant="primary" size="sm">Primary</UiButton>
          <UiButton variant="secondary" size="sm">Secondary</UiButton>
          <UiButton variant="ghost" size="sm">Ghost</UiButton>
          <UiButton variant="danger" size="sm">Danger</UiButton>
        </div>

        <div class="flex flex-wrap gap-2">
          <UiBadge>Nuxt 4</UiBadge>
          <UiBadge variant="indigo">TypeScript</UiBadge>
          <UiBadge variant="green">GSAP</UiBadge>
          <UiBadge variant="zinc">Copy-paste</UiBadge>
        </div>
      </div>
    </div>
  </section>
</template>
