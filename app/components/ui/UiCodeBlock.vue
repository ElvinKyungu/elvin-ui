<script setup lang="ts">
const props = withDefaults(defineProps<{ code: string; lang?: string }>(), { lang: 'vue' })

const copied = ref(false)

async function copy(code: string) {
  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1800)
}

// ─── Colors ──────────────────────────────────────────────────────────────────

const C = {
  // shared
  comment:   '#6b7280',
  string:    '#fca5a5',
  punct:     '#52525b',
  text:      '#d4d4d8',
  // template
  component: '#7dd3fc',
  tag:       '#94a3b8',
  attr:      '#86efac',
  vdir:      '#818cf8',
  vbind:     '#67e8f9',
  von:       '#fde047',
  vexpr:     '#fdba74',
  tmplExpr:  '#c084fc',
  // script
  keyword:   '#818cf8',
  macro:     '#c084fc',
  typeName:  '#7dd3fc',
  number:    '#fdba74',
  property:  '#86efac',
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function span(color: string, content: string) {
  return `<span style="color:${color}">${content}</span>`
}

// ─── JS/TS tokenizer (used for <script> bodies) ───────────────────────────────

const JS_KEYWORDS = new Set([
  'interface','type','const','let','var','function','return','if','else','for',
  'while','do','import','from','export','default','class','extends','implements',
  'async','await','new','typeof','keyof','in','of','true','false','null',
  'undefined','void','never','readonly','as','satisfies','try','catch','finally',
  'throw','switch','case','break','continue','this','super','static','abstract',
  'enum','namespace','declare','override','public','private','protected',
])

const VUE_MACROS = new Set([
  'defineProps','defineEmits','withDefaults','defineExpose','defineModel',
  'ref','computed','reactive','shallowRef','shallowReactive',
  'watch','watchEffect','watchSyncEffect',
  'onMounted','onUnmounted','onBeforeMount','onBeforeUnmount','onUpdated',
  'useTemplateRef','inject','provide','nextTick',
  'useRoute','useRouter','useHead','useState','useFetch','useAsyncData',
  'navigateTo','useRuntimeConfig','useNuxtApp',
])

function tokenizeScript(code: string): string {
  let html = ''
  let pos = 0
  const len = code.length

  while (pos < len) {
    const ch = code[pos]

    // Newline — preserve as-is
    if (ch === '\n') { html += '\n'; pos++; continue }

    // Single-line comment
    if (code.startsWith('//', pos)) {
      const end = code.indexOf('\n', pos)
      const s = end >= 0 ? code.slice(pos, end) : code.slice(pos)
      html += span(C.comment, esc(s))
      pos += s.length
      continue
    }

    // Multi-line comment
    if (code.startsWith('/*', pos)) {
      const end = code.indexOf('*/', pos + 2)
      const raw = end >= 0 ? code.slice(pos, end + 2) : code.slice(pos)
      // preserve newlines inside comment
      html += raw.split('\n').map(line => span(C.comment, esc(line))).join('\n')
      pos += raw.length
      continue
    }

    // Template literal
    if (ch === '`') {
      let s = '`'; pos++
      while (pos < len && code[pos] !== '`') {
        if (code[pos] === '\\') s += code[pos++]
        s += code[pos++]
      }
      if (pos < len) { s += '`'; pos++ }
      // preserve newlines inside template literal
      html += s.split('\n').map(line => span(C.string, esc(line))).join('\n')
      continue
    }

    // String (single or double quote)
    if (ch === '"' || ch === "'") {
      let s = ch; pos++
      while (pos < len && code[pos] !== ch && code[pos] !== '\n') {
        if (code[pos] === '\\') s += code[pos++]
        s += code[pos++]
      }
      if (pos < len && code[pos] === ch) { s += ch; pos++ }
      html += span(C.string, esc(s))
      continue
    }

    // Number
    if (/[0-9]/.test(ch) && (pos === 0 || !/[A-Za-z_$]/.test(code[pos - 1]))) {
      let s = ''
      while (pos < len && /[0-9._xXa-fA-F]/.test(code[pos])) s += code[pos++]
      html += span(C.number, esc(s))
      continue
    }

    // Identifier
    if (/[A-Za-z_$]/.test(ch)) {
      const start = pos
      while (pos < len && /[A-Za-z0-9_$]/.test(code[pos])) pos++
      const word = code.slice(start, pos)

      if (JS_KEYWORDS.has(word)) {
        html += span(C.keyword, esc(word))
      } else if (VUE_MACROS.has(word)) {
        html += span(C.macro, esc(word))
      } else if (/^[A-Z]/.test(word)) {
        html += span(C.typeName, esc(word))
      } else {
        // peek: if followed by '(' it's a function call, else text
        html += span(C.text, esc(word))
      }
      continue
    }

    // Whitespace (not newline)
    if (/[ \t\r]/.test(ch)) { html += ch; pos++; continue }

    // Everything else — punctuation / operators
    html += span(C.punct, esc(ch))
    pos++
  }

  return html
}

// ─── Vue template tokenizer ───────────────────────────────────────────────────

function tokenizeTemplate(code: string): string {
  let html = ''
  let pos = 0
  const len = code.length

  while (pos < len) {
    // HTML comment
    if (code.startsWith('<!--', pos)) {
      const end = code.indexOf('-->', pos + 4)
      const s = end >= 0 ? code.slice(pos, end + 3) : code.slice(pos)
      html += span(C.comment, esc(s))
      pos = end >= 0 ? end + 3 : len
      continue
    }

    // Template expression {{ }}
    if (code.startsWith('{{', pos)) {
      const end = code.indexOf('}}', pos + 2)
      if (end >= 0) {
        html += span(C.tmplExpr, esc(code.slice(pos, end + 2)))
        pos = end + 2
        continue
      }
    }

    // Tags
    if (code[pos] === '<' && pos + 1 < len) {
      const next = code[pos + 1]
      if (next === '/' || /[A-Za-z]/.test(next)) {
        pos++
        const isClose = code[pos] === '/'
        if (isClose) pos++

        const nameStart = pos
        while (pos < len && /[A-Za-z0-9.-]/.test(code[pos])) pos++
        const tagName = code.slice(nameStart, pos)
        const isPascal = /^[A-Z]/.test(tagName)

        html += span(C.punct, '&lt;' + (isClose ? '/' : ''))
        html += span(isPascal ? C.component : C.tag, esc(tagName))

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

            const attrColor = isVBind ? C.vbind : isVOn ? C.von : isVDir ? C.vdir : C.attr
            html += span(attrColor, esc(prefix + attrName))

            if (pos < len && code[pos] === '=') {
              html += span(C.punct, '=')
              pos++
              if (pos < len && (code[pos] === '"' || code[pos] === "'")) {
                const q = code[pos]
                const valStart = pos
                pos++
                while (pos < len && code[pos] !== q) pos++
                pos++
                const valColor = (isVBind || isVOn || isVDir) ? C.vexpr : C.string
                html += span(valColor, esc(code.slice(valStart, pos)))
              }
            }
          }
        }

        if (pos < len && code[pos] === '/') { html += span(C.punct, '/'); pos++ }
        if (pos < len && code[pos] === '>') { html += span(C.punct, '&gt;'); pos++ }
        continue
      }
    }

    const ch = code[pos++]
    html += ch === '\n' ? '\n' : `<span style="color:${C.text}">${esc(ch)}</span>`
  }

  return html
}

// ─── Top-level dispatcher ─────────────────────────────────────────────────────

const SCRIPT_OPEN_RE = new RegExp('<' + 'script(\\s[^>]*)?>')
const SCRIPT_CLOSE   = '</' + 'script>'

function tokenize(code: string): string {
  const scriptOpenMatch = SCRIPT_OPEN_RE.exec(code)
  if (!scriptOpenMatch) return tokenizeTemplate(code)

  const scriptTagEnd = scriptOpenMatch.index + scriptOpenMatch[0].length
  const scriptBodyEnd = code.indexOf(SCRIPT_CLOSE, scriptTagEnd)

  let html = ''

  // Before <script> tag
  if (scriptOpenMatch.index > 0) {
    html += tokenizeTemplate(code.slice(0, scriptOpenMatch.index))
  }
  // The <script ...> opening tag
  html += tokenizeTemplate(code.slice(scriptOpenMatch.index, scriptTagEnd))

  if (scriptBodyEnd >= 0) {
    html += tokenizeScript(code.slice(scriptTagEnd, scriptBodyEnd))
    html += tokenizeTemplate(code.slice(scriptBodyEnd))
  } else {
    html += tokenizeScript(code.slice(scriptTagEnd))
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
          <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div class="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
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
