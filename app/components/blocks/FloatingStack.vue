<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const section = useTemplateRef("section");
const card0 = useTemplateRef("card0");
const card1 = useTemplateRef("card1");
const card2 = useTemplateRef("card2");

function addTilt(el: HTMLElement) {
  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = -((e.clientY - cy) / (rect.height / 2)) * 8;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
    gsap.to(el, {
      rotateX: rx,
      rotateY: ry,
      scale: 1.04,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };
  const onLeave = () => {
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };
  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const configs = [
    { el: card0.value, delay: 0, floatAmp: 10, floatDur: 3.8 },
    { el: card1.value, delay: 0.25, floatAmp: 14, floatDur: 4.5 },
    { el: card2.value, delay: 0.5, floatAmp: 8, floatDur: 3.2 },
  ];

  configs.forEach(({ el, delay, floatAmp, floatDur }) => {
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: section.value, start: "top 75%", once: true },
      },
    );

    gsap.to(el, {
      y: `+=${floatAmp}`,
      duration: floatDur,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.9 + delay,
    });

    addTilt(el);
  });
});

onUnmounted(() => {
  [card0.value, card1.value, card2.value].forEach(
    (el) => el && gsap.killTweensOf(el),
  );
});
</script>

<template>
  <section ref="section" class="py-20 px-6 overflow-hidden">
    <div class="max-w-6xl 2xl:max-w-[95rem] mx-auto">
      <div class="text-center mb-16">
        <p
          class="text-xs text-indigo-400 font-medium tracking-widest uppercase mb-3"
        >
          Component preview
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-white">
          Feel the quality.<br />
          <span class="text-zinc-500">Before you paste.</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8 items-start">
        <!-- Card 1: Code snippet -->
        <div
          ref="card0"
          class="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-xl shadow-black/40 cursor-default"
          style="rotate: -2deg"
        >
          <div
            class="flex items-center gap-1.5 px-4 py-3 bg-[#161b22] border-b border-zinc-800"
          >
            <span class="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span class="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span class="ml-3 text-xs text-zinc-500 font-mono">UiCard.vue</span>
          </div>
          <pre
            class="p-5 text-xs font-mono leading-loose text-left overflow-hidden"
          ><span class="text-[#e06c75]">&lt;UiCard</span><span class="text-[#abb2bf]">
  variant=</span><span class="text-[#98c379]">"elevated"</span><span class="text-[#abb2bf]">
  padding=</span><span class="text-[#98c379]">"md"</span>
<span class="text-[#e06c75]">&gt;</span><span class="text-[#f8f8f2]">
  &lt;template #header&gt;
    Title
  &lt;/template&gt;
  Content here
</span><span class="text-[#e06c75]">&lt;/UiCard&gt;</span></pre>
        </div>

        <!-- Card 2: Button variants -->
        <div
          ref="card1"
          class="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl shadow-black/40 cursor-default mt-10"
          style="rotate: 1.5deg"
        >
          <div class="flex items-center gap-1.5 mb-5">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span class="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span class="ml-3 text-xs text-zinc-500 font-mono">UiButton.vue</span>
          </div>
          <p class="text-xs text-zinc-600 font-mono uppercase tracking-wider mb-3">
            Variants
          </p>
          <div class="flex flex-wrap gap-2 mb-5">
            <UiButton variant="primary" size="sm">Primary</UiButton>
            <UiButton variant="secondary" size="sm">Secondary</UiButton>
            <UiButton variant="ghost" size="sm">Ghost</UiButton>
            <UiButton variant="danger" size="sm">Danger</UiButton>
          </div>
          <p class="text-xs text-zinc-600 font-mono uppercase tracking-wider mb-3">
            Sizes
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <UiButton size="sm">Small</UiButton>
            <UiButton size="md">Medium</UiButton>
            <UiButton size="lg">Large</UiButton>
          </div>
        </div>

        <!-- Card 3: Badges -->
        <div
          ref="card2"
          class="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl shadow-black/40 cursor-default mt-5"
          style="rotate: -1deg"
        >
          <div class="flex items-center gap-1.5 mb-5">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span class="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span class="ml-3 text-xs text-zinc-500 font-mono">UiBadge.vue</span>
          </div>
          <p class="text-xs text-zinc-600 font-mono uppercase tracking-wider mb-3">
            Variants
          </p>
          <div class="flex flex-wrap gap-2 mb-4">
            <UiBadge>Default</UiBadge>
            <UiBadge variant="indigo">Indigo</UiBadge>
            <UiBadge variant="green">Green</UiBadge>
            <UiBadge variant="red">Red</UiBadge>
            <UiBadge variant="zinc">Zinc</UiBadge>
          </div>
          <div class="mt-4 pt-4 border-t border-zinc-800">
            <p
              class="text-xs text-zinc-600 font-mono uppercase tracking-wider mb-3"
            >
              In context
            </p>
            <div class="flex flex-wrap items-center gap-2">
              <UiBadge variant="green">
                <Icon name="lucide:check" class="w-3 h-3" />
                SSR-safe
              </UiBadge>
              <UiBadge variant="indigo">
                <Icon name="lucide:zap" class="w-3 h-3" />
                GSAP
              </UiBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
