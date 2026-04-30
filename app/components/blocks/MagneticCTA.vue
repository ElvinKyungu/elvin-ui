<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const section = useTemplateRef("section");
const btnWrap = useTemplateRef("btnWrap");
const orb1 = useTemplateRef("orb1");
const orb2 = useTemplateRef("orb2");
const orb3 = useTemplateRef("orb3");

function setupMagnetic() {
  const btn = btnWrap.value;
  if (!btn) return;

  const onMove = (e: MouseEvent) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 140;

    if (dist < radius) {
      const strength = (radius - dist) / radius;
      gsap.to(btn, {
        x: dx * strength * 0.45,
        y: dy * strength * 0.45,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    }
  };

  window.addEventListener("mousemove", onMove);

  onUnmounted(() => {
    window.removeEventListener("mousemove", onMove);
    gsap.killTweensOf(btn);
  });
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Orb animations
  gsap.to(orb1.value, {
    x: 60,
    y: -40,
    duration: 6,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(orb2.value, {
    x: -50,
    y: 50,
    duration: 7.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 1,
  });
  gsap.to(orb3.value, {
    x: 30,
    y: 60,
    duration: 5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 2,
  });

  // Entry animation
  const children =
    section.value?.querySelectorAll<HTMLElement>(".cta-child");
  if (children?.length) {
    gsap.fromTo(
      children,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.value,
          start: "top 80%",
          once: true,
        },
      },
    );
  }

  setupMagnetic();
});
</script>

<template>
  <section ref="section" class="py-16 px-4">
    <div class="max-w-[95rem] mx-auto">
      <div class="p-px rounded-3xl bg-gradient-to-b from-zinc-700/60 to-zinc-900/60">
        <div
          class="rounded-3xl bg-zinc-950 px-8 py-24 text-center relative overflow-hidden"
        >
          <!-- Animated orbs -->
          <div
            ref="orb1"
            class="absolute top-[-60px] left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[90px] pointer-events-none"
          />
          <div
            ref="orb2"
            class="absolute bottom-[-40px] right-1/4 w-72 h-72 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none"
          />
          <div
            ref="orb3"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"
          />

          <div class="relative z-10">
            <p
              class="cta-child text-xs text-indigo-400 font-medium tracking-widest uppercase mb-5"
            >
              Get started
            </p>

            <h2
              class="cta-child text-5xl md:text-6xl font-bold text-white mb-5 leading-tight"
            >
              Start building<br />
              <span class="text-zinc-500">in minutes.</span>
            </h2>

            <p class="cta-child text-zinc-400 mb-12 max-w-md mx-auto text-base leading-relaxed">
              Browse the components, copy the code, paste it in your Nuxt
              project. No install. No config. Just working UI.
            </p>

            <!-- Magnetic button -->
            <div class="cta-child flex items-center justify-center gap-4 flex-wrap">
              <div ref="btnWrap" class="inline-block">
                <UiButton size="lg" class="shadow-lg shadow-indigo-500/20 px-10">
                  Browse components
                </UiButton>
              </div>
              <UiButton size="lg" variant="ghost">Read the docs →</UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
