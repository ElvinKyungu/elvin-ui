<script setup lang="ts">
import { gsap } from "gsap";

const track1 = useTemplateRef("track1");
const track2 = useTemplateRef("track2");

const row1 = [
  "UiButton", "UiBadge", "UiCard", "UiInput", "UiModal",
  "UiTooltip", "UiDropdown", "UiTable", "UiToggle", "UiTabs",
  "UiAlert", "UiAvatar", "UiSelect", "UiTextarea", "UiAccordion",
];
const row2 = [
  "TypeScript", "Nuxt 4", "GSAP", "Tailwind CSS", "Copy-paste",
  "SSR-safe", "Strict mode", "Vue 3", "Auto-import", "Composition API",
  "ScrollTrigger", "Micro-interactions", "Zero config",
];

onMounted(() => {
  gsap.to(track1.value, {
    xPercent: -50,
    duration: 22,
    ease: "none",
    repeat: -1,
  });

  gsap.fromTo(
    track2.value,
    { xPercent: -50 },
    { xPercent: 0, duration: 28, ease: "none", repeat: -1 },
  );
});

onUnmounted(() => {
  gsap.killTweensOf([track1.value, track2.value]);
});
</script>

<template>
  <div
    class="py-10 overflow-hidden border-y border-zinc-800/50 bg-zinc-950/60 select-none"
    style="mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);"
  >
    <!-- Row 1 — moves left -->
    <div ref="track1" class="flex gap-4 mb-3 whitespace-nowrap w-max">
      <span
        v-for="(item, i) in [...row1, ...row1]"
        :key="i"
        class="px-4 py-1.5 rounded-full border border-zinc-800 text-sm text-zinc-400 font-mono bg-zinc-900/50 flex-shrink-0"
      >
        {{ item }}
      </span>
    </div>

    <!-- Row 2 — moves right -->
    <div ref="track2" class="flex gap-4 whitespace-nowrap w-max">
      <span
        v-for="(item, i) in [...row2, ...row2]"
        :key="i"
        class="px-4 py-1.5 rounded-full border border-zinc-800/40 text-sm text-zinc-600 font-mono flex-shrink-0 flex items-center gap-2"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500/50 flex-shrink-0" />
        {{ item }}
      </span>
    </div>
  </div>
</template>
