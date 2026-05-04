<script setup lang="ts">
const props = withDefaults(defineProps<{ code: string; lang?: string }>(), { lang: 'vue' })

const copied = ref(false)

async function copy(code: string) {
  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1800)
}

// ─── Syntax tokenizer ────────────────────────────────────────────────────────

const COLORS = {
  comment:   '#6b7280',  // zinc-500
  component: '#7dd3fc',  // sky-300  — PascalCase tags
  tag:       '#94a3b8',  // slate-400 — lowercase HTML tags
  attr:      '#86efac',  // green-300 — plain attributes
  vdir:      '#818cf8',  // indigo-400 — v-model, v-for, v-if…
  vbind:     '#67e8f9',  // cyan-300  — :prop
  von:       '#fde047',  // yellow-300 — @event
  string:    '#fca5a5',  // red-300   — "plain string"
  vexpr:     '#fdba74',  // orange-300 — "expression in binding"
  tmplExpr:  '#c084fc',  // purple-400 — {{ }}
  punct:     '#52525b',  // zinc-600  — < > = / →
  text:      '#d4d4d8',  // zinc-300  — text content
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function span(color: string, content: string) {
  return `<span style="color:${color}">${content}</span>`
}

function tokenize(code: string): string {
  let html = ''
  let pos = 0
  const len = code.length

  while (pos < len) {
    // ── HTML comment ─────────────────────────────────────────────
    if (code.startsWith('<!--', pos)) {
      const end = code.indexOf('-->', pos + 4)
      const s = end >= 0 ? code.slice(pos, end + 3) : code.slice(pos)
      html += span(COLORS.comment, esc(s))
      pos = end >= 0 ? end + 3 : len
      continue
    }

    // ── Template expression {{ }} ─────────────────────────────────
    if (code.startsWith('{{', pos)) {
      const end = code.indexOf('}}', pos + 2)
      if (end >= 0) {
        html += span(COLORS.tmplExpr, esc(code.slice(pos, end + 2)))
        pos = end + 2
        continue
      }
    }

    // ── Tags ─────────────────────────────────────────────────────
    if (code[pos] === '<' && pos + 1 < len) {
      const next = code[pos + 1]
      if (next === '/' || /[A-Za-z]/.test(next)) {
        pos++ // consume <
        const isClose = code[pos] === '/'
        if (isClose) pos++

        // tag name
        const nameStart = pos
        while (pos < len && /[A-Za-z0-9.-]/.test(code[pos])) pos++
        const tagName = code.slice(nameStart, pos)
        const isPascal = /^[A-Z]/.test(tagName)

        html += span(COLORS.punct, '&lt;' + (isClose ? '/' : ''))
        html += span(isPascal ? COLORS.component : COLORS.tag, esc(tagName))

        if (!isClose) {
          while (pos < len) {
            if (/\s/.test(code[pos])) { html += code[pos++]; continue }
            if (code[pos] === '>' || (code[pos] === '/' && code[pos + 1] === '>')) break

            const isVBind = code[pos] === ':'
            const isVOn   = code[pos] === '@'
            const prefix  = isVBind ? ':' : isVOn ? '@' : ''
            if (isVBind || isVOn) pos++

            const attrStart = pos
            while (pos < len && !/[\s=/>]/.test(code[pos])) pos++
            const attrName = code.slice(attrStart, pos)
            const isVDir   = attrName.startsWith('v-')

            const attrColor = isVBind ? COLORS.vbind
              : isVOn  ? COLORS.von
              : isVDir ? COLORS.vdir
              : COLORS.attr

            html += span(attrColor, esc(prefix + attrName))

            if (pos < len && code[pos] === '=') {
              html += span(COLORS.punct, '=')
              pos++
              if (pos < len && (code[pos] === '"' || code[pos] === "'")) {
                const q = code[pos]
                const valStart = pos
                pos++
                while (pos < len && code[pos] !== q) pos++
                pos++
                const valColor = (isVBind || isVOn || isVDir) ? COLORS.vexpr : COLORS.string
                html += span(valColor, esc(code.slice(valStart, pos)))
              }
            }
          }
        }

        if (pos < len && code[pos] === '/') { html += span(COLORS.punct, '/'); pos++ }
        if (pos < len && code[pos] === '>') { html += span(COLORS.punct, '&gt;'); pos++ }
        continue
      }
    }

    // ── Fallback: regular character ───────────────────────────────
    const ch = code[pos++]
    html += ch === '\n' ? '\n' : `<span style="color:${COLORS.text}">${esc(ch)}</span>`
  }

  return html
}

const highlighted = computed(() => tokenize(props.code))
</script>

<template>
  <div class="rounded-xl overflow-hidden border border-zinc-800/80 bg-[#0d0d10]">
    <!-- Header bar -->
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/60 bg-zinc-900/40">
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div class="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div class="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <span class="text-xs font-medium text-zinc-600 ml-1">{{ lang }}</span>
      </div>
      <button
        @click="copy(code)"
        class="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all duration-150"
        :class="copied
          ? 'text-green-400 border-green-500/30 bg-green-500/10'
          : 'text-zinc-500 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800/50'"
      >
        <svg v-if="!copied" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke-linecap="round" />
        </svg>
        <svg v-else class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <!-- Code -->
    <pre
      class="overflow-x-auto p-5 text-[13px] leading-[1.8] font-mono"
      v-html="highlighted"
    />
  </div>
</template>
