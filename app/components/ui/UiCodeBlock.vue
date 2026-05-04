<script setup lang="ts">
interface Props {
  code: string
  lang?: string
}

withDefaults(defineProps<Props>(), { lang: 'vue' })

const copied = ref(false)

async function copy(code: string) {
  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1800)
}
</script>

<template>
  <div class="relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
      <span class="text-xs font-medium text-zinc-500 uppercase tracking-wider">{{ lang }}</span>
      <button
        @click="copy(code)"
        class="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all duration-150"
      >
        <svg v-if="!copied" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke-linecap="round" />
        </svg>
        <svg v-else class="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <pre class="overflow-x-auto p-4 text-sm text-zinc-300 leading-relaxed font-mono">{{ code }}</pre>
  </div>
</template>

<!--
USAGE:
<UiCodeBlock :code="`<UiButton variant='primary'>Click me</UiButton>`" />
-->
