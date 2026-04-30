<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const section = useTemplateRef("section");
const textCol = useTemplateRef("textCol");
const codeCol = useTemplateRef("codeCol");
const codeContainer = useTemplateRef("codeContainer");

const features = [
  "TypeScript strict mode",
  "GSAP micro-interactions built in",
  "SSR-safe for Nuxt 4",
  "Zero hidden dependencies",
];

let loopTimer: ReturnType<typeof setTimeout> | null = null;

const startTypewriter = async () => {
  if (!codeContainer.value) return;

  const { animate, splitText, stagger } = await import("animejs");

  // Apply splitText to each colored token individually, collect all chars
  const tokenEls = codeContainer.value.querySelectorAll<HTMLElement>(".token");
  const allChars: Element[] = [];

  tokenEls.forEach((el) => {
    const split = splitText(el, { chars: true });
    allChars.push(...split.chars);
  });

  if (!allChars.length) return;

  const play = () => {
    // Type in left → right
    animate(allChars, {
      opacity: [{ from: 0 }, { to: 1 }],
      duration: 1,
      delay: stagger(44),
      ease: "linear",
      onComplete: () => {
        // Pause 3s then backspace right → left
        loopTimer = setTimeout(() => {
          animate(allChars, {
            opacity: 0,
            duration: 1,
            delay: stagger(16, { from: "last" }),
            ease: "linear",
            onComplete: () => {
              loopTimer = setTimeout(play, 500);
            },
          });
        }, 3000);
      },
    });
  };

  play();
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section.value, start: "top 75%", once: true },
    defaults: { ease: "power3.out", duration: 0.8 },
  });

  tl.from(textCol.value, { x: -40, opacity: 0 })
    .from(codeCol.value, { x: 40, opacity: 0 }, "-=0.5")
    .add(() => startTypewriter());
});

onUnmounted(() => {
  if (loopTimer) clearTimeout(loopTimer);
});
</script>

<template>
  <section ref="section" class="py-20 px-6">
    <div class="max-w-6xl 2xl:max-w-[95rem] mx-auto">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <!-- Left: Text -->
        <div ref="textCol">
          <p
            class="text-xs text-indigo-400 font-medium tracking-widest uppercase mb-4"
          >
            Built for speed
          </p>
          <h2
            class="text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
          >
            Grab a component.<br />
            <span class="text-zinc-500">Drop it in your project.</span>
          </h2>
          <p class="text-zinc-400 leading-relaxed mb-8 text-base">
            Every component is self-contained, fully typed, and ready to paste.
            No config, no install, no hidden dependencies. Just working code.
          </p>

          <ul class="space-y-3 mb-10">
            <li
              v-for="feature in features"
              :key="feature"
              class="flex items-center gap-3"
            >
              <span
                class="w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0"
              >
                <Icon name="lucide:check" class="w-3 h-3 text-indigo-400" />
              </span>
              <span class="text-sm text-zinc-300">{{ feature }}</span>
            </li>
          </ul>

          <UiButton size="lg">Browse components →</UiButton>
        </div>

        <!-- Right: Code editor -->
        <div
          ref="codeCol"
          class="rounded-2xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-2xl shadow-black/60"
        >
          <!-- Mac window bar -->
          <div
            class="flex items-center gap-1.5 px-4 py-3 bg-[#161b22] border-b border-zinc-800"
          >
            <span class="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span class="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span class="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span class="ml-3 text-xs text-zinc-500 font-mono"
              >UiButton.vue</span
            >
          </div>

          <!--
            Each .token span has one color.
            splitText({ chars: true }) wraps each char in a data-char span
            that inherits the parent's color — syntax highlighting preserved.
            No whitespace between spans so the <pre> renders correctly.
          -->
          <pre
            ref="codeContainer"
            class="p-6 text-sm font-mono leading-loose min-h-[220px] select-none overflow-hidden"
          ><span class="token text-[#e06c75]">&lt;UiButton</span><span class="token text-[#abb2bf]">&#10;  variant=</span><span class="token text-[#98c379]">"primary"</span><span class="token text-[#abb2bf]">&#10;  size=</span><span class="token text-[#98c379]">"md"</span><span class="token text-[#e06c75]">&#10;&gt;</span><span class="token text-[#f8f8f2]">&#10;  Get started &#8594;&#10;</span><span class="token text-[#e06c75]">&lt;/UiButton&gt;</span><span class="cursor-blink text-indigo-400"> ▋</span></pre>
        </div>
      </div>
    </div>
  </section>
</template>
