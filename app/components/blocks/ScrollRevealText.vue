<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const section = useTemplateRef("section");

const sentence =
  "We built Elvin UI so you never have to choose between speed and quality. Every component ships with TypeScript, GSAP animations, and zero configuration — ready to paste into your project and ship.";

const words = sentence.split(" ");

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const wordEls =
    section.value?.querySelectorAll<HTMLElement>(".reveal-word");
  if (!wordEls?.length) return;

  gsap.fromTo(
    wordEls,
    { color: "#3f3f46", opacity: 0.4 },
    {
      color: "#ffffff",
      opacity: 1,
      ease: "none",
      stagger: { each: 0.04 },
      scrollTrigger: {
        trigger: section.value,
        start: "top 70%",
        end: "bottom 40%",
        scrub: 1.2,
      },
    },
  );
});
</script>

<template>
  <section ref="section" class="py-28 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <p
        class="text-xs text-indigo-400 font-medium tracking-widest uppercase mb-10"
      >
        Our philosophy
      </p>

      <p class="text-3xl md:text-[2.6rem] font-bold leading-snug">
        <span
          v-for="(word, i) in words"
          :key="i"
          class="reveal-word inline-block mr-[0.28em] text-zinc-700"
        >
          {{ word }}
        </span>
      </p>
    </div>
  </section>
</template>
