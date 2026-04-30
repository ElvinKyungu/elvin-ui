<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const section = useTemplateRef("section");

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const cards = section.value?.querySelectorAll<HTMLElement>(".bento-card");
  if (!cards?.length) return;

  gsap.fromTo(
    cards,
    { y: 32, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section.value,
        start: "top 78%",
        once: true,
      },
    },
  );
});
</script>

<template>
  <section ref="section" class="py-20 px-6">
    <div class="max-w-6xl 2xl:max-w-[95rem] mx-auto">

      <div class="text-center mb-16">
        <p class="text-xs text-indigo-400 font-medium tracking-widest uppercase mb-3">
          The numbers
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-white">
          Less setup.<br />
          <span class="text-zinc-500">More shipping.</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 grid-rows-auto gap-4">

        <!-- Card 1 — large stat: components -->
        <div
          class="bento-card md:col-span-2 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden"
        >
          <div
            class="absolute -top-10 -right-10 w-48 h-48 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"
          />
          <p class="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-6">
            Component library
          </p>
          <div class="flex items-end gap-6 flex-wrap">
            <div>
              <span class="text-7xl md:text-8xl font-bold text-white leading-none">50+</span>
              <p class="text-sm text-zinc-400 mt-2">ready-to-paste components</p>
            </div>
            <div class="mb-2 flex flex-col gap-1.5">
              <UiBadge variant="indigo">Nuxt 4</UiBadge>
              <UiBadge variant="green">TypeScript</UiBadge>
              <UiBadge>GSAP</UiBadge>
            </div>
          </div>
        </div>

        <!-- Card 2 — zero dependencies -->
        <div
          class="bento-card rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-8 flex flex-col justify-between min-h-[200px]"
        >
          <div
            class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6"
          >
            <Icon name="lucide:package-x" class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p class="text-3xl font-bold text-white mb-1">0</p>
            <p class="text-sm text-zinc-400">hidden dependencies</p>
            <p class="text-xs text-zinc-600 mt-3 leading-relaxed">
              No CLI. No config. No surprise installs. Just your code.
            </p>
          </div>
        </div>

        <!-- Card 3 — TypeScript -->
        <div
          class="bento-card rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-8 flex flex-col justify-between min-h-[200px]"
        >
          <div
            class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6"
          >
            <Icon name="lucide:shield-check" class="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p class="text-base font-semibold text-white mb-1">Strict TypeScript</p>
            <p class="text-xs text-zinc-500 leading-relaxed">
              Every prop is typed. Every variant is inferred. No <code class="text-zinc-400 font-mono">any</code>.
            </p>
            <div class="mt-4 rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 font-mono text-xs text-blue-300 leading-loose">
              <span class="text-zinc-600">variant: </span><span class="text-emerald-400">"primary"</span><br />
              <span class="text-zinc-600">size: </span><span class="text-emerald-400">"md"</span>
            </div>
          </div>
        </div>

        <!-- Card 4 — copy-paste workflow -->
        <div
          class="bento-card md:col-span-2 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden"
        >
          <div
            class="absolute -bottom-8 -left-8 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"
          />
          <div
            class="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6"
          >
            <Icon name="lucide:clipboard-copy" class="w-5 h-5 text-violet-400" />
          </div>
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p class="text-base font-semibold text-white mb-1">
                Copy. Paste. Ship.
              </p>
              <p class="text-sm text-zinc-500 max-w-xs leading-relaxed">
                Every component is one file. No imports to wire, no providers to wrap. Paste it and it works.
              </p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <div class="flex items-center gap-2 rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5">
                <Icon name="lucide:terminal" class="w-4 h-4 text-zinc-500" />
                <span class="font-mono text-xs text-zinc-300">cp UiButton.vue ./components/</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
