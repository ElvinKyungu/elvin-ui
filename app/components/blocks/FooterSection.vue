<template>
  <footer class="border-t border-zinc-800/60 pt-16 pb-10 px-6">
    <div class="max-w-6xl 2xl:max-w-[95rem] mx-auto">

      <!-- Top row: brand + columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/60">

        <!-- Brand -->
        <div class="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center flex-shrink-0">
              <span class="text-white text-xs font-bold leading-none">E</span>
            </span>
            <span class="text-base font-semibold text-zinc-200">elvin ui</span>
          </div>
          <p class="text-sm text-zinc-500 leading-relaxed max-w-[220px]">
            Copy-paste Nuxt 4 components. No CLI, no config, no hidden deps.
          </p>
          <!-- Social -->
          <div class="flex items-center gap-3 mt-1">
            <a
              href="https://github.com/Elvinkyungu/elvin-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://x.com/ElvinKyungu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/elvin-kyungu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Resources -->
        <div class="flex flex-col gap-4">
          <p class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Resources</p>
          <ul class="flex flex-col gap-2.5">
            <li><NuxtLink to="/components" class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">Components</NuxtLink></li>
            <li><NuxtLink to="/blocks"     class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">Blocks</NuxtLink></li>
            <li><NuxtLink to="/templates"  class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">Templates</NuxtLink></li>
            <li><NuxtLink to="/docs"       class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">Documentation</NuxtLink></li>
          </ul>
        </div>

        <!-- Get started -->
        <div class="flex flex-col gap-4">
          <p class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Get started</p>
          <ul class="flex flex-col gap-2.5">
            <li><NuxtLink to="/docs#installation"  class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">Installation</NuxtLink></li>
            <li><NuxtLink to="/docs#theming"        class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">Theming</NuxtLink></li>
            <li><NuxtLink to="/docs#contributing"   class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">Contributing</NuxtLink></li>
            <li>
              <a
                href="https://github.com/Elvinkyungu/elvin-ui/issues"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
              >Report an issue</a>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div class="flex flex-col gap-4">
          <p class="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Connect</p>
          <ul class="flex flex-col gap-2.5">
            <li>
              <a href="https://github.com/Elvinkyungu/elvin-ui" target="_blank" rel="noopener noreferrer" class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">GitHub</a>
            </li>
            <li>
              <a href="https://x.com/ElvinKyungu" target="_blank" rel="noopener noreferrer" class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">X (Twitter)</a>
            </li>
            <li>
              <a href="https://linkedin.com/in/elvin-kyungu" target="_blank" rel="noopener noreferrer" class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">LinkedIn</a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom row -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
        <p class="text-xs text-zinc-600">
          © {{ new Date().getFullYear() }} Elvin UI. Released under the
          <a
            href="https://github.com/Elvinkyungu/elvin-ui/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-zinc-400 transition-colors underline underline-offset-2"
          >MIT License</a>.
        </p>
        <p class="text-xs text-zinc-600">Built for Nuxt devs who ship fast.</p>
      </div>

    </div>
  </footer>
</template>
