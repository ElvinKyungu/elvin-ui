<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const section = useTemplateRef("section");

const stats = [
  {
    end: 50,
    suffix: "+",
    label: "Components",
    desc: "Copy-paste into any Nuxt 4 project",
    color: "text-indigo-400",
    glow: "bg-indigo-500/10 border-indigo-500/20",
    icon: "lucide:layers",
  },
  {
    end: 0,
    suffix: "",
    label: "Hidden deps",
    desc: "No surprise installs, ever",
    color: "text-emerald-400",
    glow: "bg-emerald-500/10 border-emerald-500/20",
    icon: "lucide:package-x",
  },
  {
    end: 100,
    suffix: "%",
    label: "TypeScript",
    desc: "Strict mode, every prop typed",
    color: "text-blue-400",
    glow: "bg-blue-500/10 border-blue-500/20",
    icon: "lucide:shield-check",
  },
  {
    end: 1,
    suffix: " file",
    label: "Per component",
    desc: "Self-contained, drop-in ready",
    color: "text-violet-400",
    glow: "bg-violet-500/10 border-violet-500/20",
    icon: "lucide:file-code",
  },
];

const displayed = ref(stats.map(() => 0));

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const counts = stats.map(() => ({ val: 0 }));

  ScrollTrigger.create({
    trigger: section.value,
    start: "top 75%",
    once: true,
    onEnter() {
      stats.forEach((stat, i) => {
        const count = counts[i];
        if (!count) return;
        gsap.to(count, {
          val: stat.end,
          duration: 1.8,
          ease: "power2.out",
          delay: i * 0.12,
          onUpdate() {
            if (count) displayed.value[i] = Math.round(count.val);
          },
        });
      });

      const cards = section.value?.querySelectorAll<HTMLElement>(".stat-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
        );
      }
    },
  });
});
</script>

<template>
  <section ref="section" class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="stat-card rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-7 flex flex-col gap-4"
        >
          <div
            :class="[
              'w-10 h-10 rounded-xl border flex items-center justify-center',
              stat.glow,
            ]"
          >
            <Icon :name="stat.icon" :class="['w-5 h-5', stat.color]" />
          </div>

          <div>
            <p :class="['text-5xl font-bold tabular-nums leading-none', stat.color]">
              {{ displayed[i] }}{{ stat.suffix }}
            </p>
            <p class="text-sm font-semibold text-white mt-2">{{ stat.label }}</p>
            <p class="text-xs text-zinc-500 mt-1 leading-relaxed">{{ stat.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
