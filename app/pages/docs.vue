<script setup lang="ts">
const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'Docs — Elvin UI',
  description: 'Learn how to install, use, and customise Elvin UI components in your Nuxt 4 project.',
  ogTitle: 'Docs — Elvin UI',
  ogDescription: 'Learn how to install, use, and customise Elvin UI components in your Nuxt 4 project.',
  ogImage: `${siteUrl}/home_screen.png`,
  ogUrl: `${siteUrl}/docs`,
  ogType: 'website',
  ogSiteName: 'Elvin UI',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Docs — Elvin UI',
  twitterDescription: 'Learn how to install, use, and customise Elvin UI components in your Nuxt 4 project.',
  twitterImage: `${siteUrl}/home_screen.png`,
})

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: 'lucide:book-open',
  },
  {
    id: 'installation',
    title: 'Installation',
    icon: 'lucide:terminal',
  },
  {
    id: 'theming',
    title: 'Theming',
    icon: 'lucide:palette',
  },
  {
    id: 'contributing',
    title: 'Contributing',
    icon: 'lucide:git-pull-request',
  },
]

const active = ref('introduction')

function scrollTo(id: string) {
  active.value = id
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white">

    <!-- Grid background -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_0.3px,transparent_0.8px)] bg-[size:64px_64px]" />
      <div class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff12_0.3px,transparent_0.8px)] bg-[size:60px_60px]" />
    </div>

    <BlocksNavBar />

    <div class="pt-14 flex justify-center relative z-10">
      <div class="flex w-full max-w-5xl 2xl:max-w-[80rem] mx-auto border-x border-zinc-800/60 min-h-[calc(100vh-56px)]">

        <!-- Sidebar -->
        <aside class="hidden md:block w-56 shrink-0 sticky top-14 self-start h-[calc(100vh-56px)] border-r border-zinc-800/60 overflow-y-auto">
          <div class="p-5 flex flex-col gap-1">
            <p class="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3 px-2">Documentation</p>
            <button
              v-for="s in sections"
              :key="s.id"
              @click="scrollTo(s.id)"
              :class="[
                'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-left transition-all duration-150',
                active === s.id
                  ? 'bg-zinc-800/80 text-white'
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/60',
              ]"
            >
              <span class="w-1.5 h-1.5 rounded-full shrink-0 transition-colors" :class="active === s.id ? 'bg-accent' : 'bg-zinc-700'" />
              {{ s.title }}
            </button>
          </div>
        </aside>

        <!-- Content -->
        <main class="flex-1 min-w-0 px-6 sm:px-10 py-12 flex flex-col gap-16 max-w-2xl">

          <!-- INTRODUCTION -->
          <section id="introduction" class="flex flex-col gap-6 scroll-mt-20">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Getting started</span>
              <h1 class="text-3xl font-bold text-white tracking-tight">Introduction</h1>
              <p class="text-zinc-400 leading-relaxed">
                Elvin UI is a collection of production-ready components and blocks built for <span class="text-zinc-200 font-medium">Nuxt 4</span>.
                The philosophy is simple: <span class="text-zinc-200 font-medium">copy, paste, ship</span>.
                No npm install, no version conflicts, no black box.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="flex flex-col gap-2 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <Icon name="lucide:layers" class="w-5 h-5 text-emerald-400" />
                <p class="text-sm font-medium text-white">23 Components</p>
                <p class="text-xs text-zinc-500">Buttons, forms, overlays, data display and more.</p>
              </div>
              <div class="flex flex-col gap-2 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <Icon name="lucide:zap" class="w-5 h-5 text-amber-400" />
                <p class="text-sm font-medium text-white">GSAP animations</p>
                <p class="text-xs text-zinc-500">Micro-interactions on every interactive element.</p>
              </div>
              <div class="flex flex-col gap-2 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <Icon name="lucide:shield-check" class="w-5 h-5 text-green-400" />
                <p class="text-sm font-medium text-white">TypeScript</p>
                <p class="text-xs text-zinc-500">Strict typed props and emits on every component.</p>
              </div>
            </div>

            <div class="flex flex-col gap-2 p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <p class="text-sm font-semibold text-white">Tech stack</p>
              <ul class="flex flex-col gap-1.5">
                <li v-for="item in ['Nuxt 4', 'Vue 3 (Composition API)', 'TypeScript (strict)', 'TailwindCSS', 'GSAP']" :key="item" class="flex items-center gap-2 text-sm text-zinc-400">
                  <span class="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                  {{ item }}
                </li>
              </ul>
            </div>
          </section>

          <div class="border-t border-zinc-800/60" />

          <!-- INSTALLATION -->
          <section id="installation" class="flex flex-col gap-6 scroll-mt-20">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Setup</span>
              <h2 class="text-2xl font-bold text-white tracking-tight">Installation</h2>
              <p class="text-zinc-400 leading-relaxed">
                Elvin UI is not an npm package. You copy components directly into your Nuxt 4 project.
                Here's how to set up your project to receive components.
              </p>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <p class="text-sm font-medium text-zinc-300">1. Create a Nuxt 4 project</p>
                <UiCodeBlock lang="bash" code="npx nuxi@latest init my-app
cd my-app" />
              </div>

              <div class="flex flex-col gap-2">
                <p class="text-sm font-medium text-zinc-300">2. Install dependencies</p>
                <UiCodeBlock lang="bash" code="npm install gsap @nuxt/icon" />
              </div>

              <div class="flex flex-col gap-2">
                <p class="text-sm font-medium text-zinc-300">3. Configure nuxt.config.ts</p>
                <UiCodeBlock lang="vue" code="export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  css: ['~/assets/main.css'],
})" />
              </div>

              <div class="flex flex-col gap-2">
                <p class="text-sm font-medium text-zinc-300">4. Copy a component</p>
                <p class="text-sm text-zinc-500">
                  Browse the <NuxtLink to="/components" class="text-emerald-400 hover:text-emerald-300 transition-colors">Components</NuxtLink> page,
                  click on a component, copy the code and paste it into <code class="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">app/components/ui/</code>.
                </p>
              </div>
            </div>
          </section>

          <div class="border-t border-zinc-800/60" />

          <!-- THEMING -->
          <section id="theming" class="flex flex-col gap-6 scroll-mt-20">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Customisation</span>
              <h2 class="text-2xl font-bold text-white tracking-tight">Theming</h2>
              <p class="text-zinc-400 leading-relaxed">
                The entire colour palette is driven by a single CSS variable. Changing the accent colour rethemes the whole project.
              </p>
            </div>

            <UiCodeBlock lang="vue" code="/* assets/main.css */
:root {
  /* Accent — change here to retheme the entire project */
  --color-accent: 66 184 131;    /* Vue green / #42b883  */
  --color-accent-dim: 45 158 107; /* Vue green dim */
}" />

            <p class="text-sm text-zinc-500">
              The Tailwind classes <code class="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">bg-accent</code>,
              <code class="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">text-accent</code> and
              <code class="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">border-accent</code>
              consume this variable automatically.
            </p>
          </section>

          <div class="border-t border-zinc-800/60" />

          <!-- CONTRIBUTING -->
          <section id="contributing" class="flex flex-col gap-6 scroll-mt-20">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Open source</span>
              <h2 class="text-2xl font-bold text-white tracking-tight">Contributing</h2>
              <p class="text-zinc-400 leading-relaxed">
                Elvin UI is open source. Want to add a component or fix a bug? Here's the structure to follow.
              </p>
            </div>

            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-2 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <p class="text-sm font-semibold text-white">Component structure</p>
                <ol class="flex flex-col gap-1.5 mt-1">
                  <li v-for="(step, i) in ['TypeScript props with withDefaults', 'Composition API logic', 'Template', 'GSAP animations (optional)']" :key="i" class="flex items-start gap-2 text-sm text-zinc-400">
                    <span class="text-[10px] font-bold text-emerald-400 mt-0.5 shrink-0">{{ i + 1 }}.</span>
                    {{ step }}
                  </li>
                </ol>
              </div>

              <div class="flex flex-col gap-2 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <p class="text-sm font-semibold text-white">Pre-PR checklist</p>
                <ul class="flex flex-col gap-1.5 mt-1">
                  <li v-for="item in ['Component in app/components/ui/UiXxx.vue', 'Entry in app/data/ui-components.ts (props + usage)', 'Preview template in pages/components/[id].vue', 'Tested on mobile']" :key="item" class="flex items-start gap-2 text-sm text-zinc-400">
                    <Icon name="lucide:check" class="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <a
              href="https://github.com/Elvinkyungu/elvin-ui"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex"
            >
              <UiButton variant="secondary">
                <Icon name="lucide:github" class="w-4 h-4 mr-2" />
                View on GitHub
              </UiButton>
            </a>
          </section>

        </main>
      </div>
    </div>

    <div class="border-t border-zinc-800/60 relative z-10">
      <BlocksFooterSection />
    </div>
  </div>
</template>
