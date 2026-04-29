<template>
  <footer class="border-t border-zinc-800/60 py-8 px-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-md bg-indigo-500 flex items-center justify-center flex-shrink-0">
          <span class="text-white text-[10px] font-bold leading-none">E</span>
        </span>
        <span class="text-sm font-semibold text-zinc-300">elvin ui</span>
      </div>

      <p class="text-xs text-zinc-600 order-last md:order-none">
        Built for Nuxt devs who ship fast. © {{ new Date().getFullYear() }}
      </p>

      <div class="flex items-center gap-5">
        <a href="#" class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">GitHub</a>
        <a href="#" class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Components</a>
        <a href="#" class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Docs</a>
      </div>
    </div>
  </footer>
</template>
