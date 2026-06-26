<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

// ── Custom directive: set innerHTML once on mount, update only when not focused ──
const vContent = {
  mounted(el: HTMLElement, { value }: { value: string }) {
    el.innerHTML = value || ''
  },
  updated(el: HTMLElement, { value, oldValue }: { value: string; oldValue: string }) {
    if (document.activeElement !== el && value !== oldValue) {
      el.innerHTML = value || ''
    }
  },
}

// ── Types ────────────────────────────────────────────────────────────────────
type BlockType =
  | 'text' | 'h1' | 'h2' | 'h3'
  | 'bullet' | 'numbered' | 'todo'
  | 'quote' | 'divider' | 'callout' | 'code' | 'toggle' | 'image'

interface Block {
  id: string
  type: BlockType
  content: string
  indent: number
  checked?: boolean
  expanded?: boolean
  language?: string
  calloutIcon?: string
  imageUrl?: string
  imageCaption?: string
}

interface Page {
  id: string
  title: string
  icon: string
  cover?: string
  blocks: Block[]
}

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

// ── Pages ────────────────────────────────────────────────────────────────────
const pages = ref<Page[]>([
  {
    id: 'p1', title: 'Getting Started', icon: '🚀', cover: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #533483 100%)',
    blocks: [
      { id: uid(), type: 'h1', content: 'Getting Started', indent: 0 },
      { id: uid(), type: 'callout', content: 'Press <strong>/</strong> for blocks · Drag <strong>⠿</strong> to reorder · <strong>⌘K</strong> for commands · Select text for formatting', indent: 0, calloutIcon: '💡' },
      { id: uid(), type: 'h2', content: 'Block editor', indent: 0 },
      { id: uid(), type: 'text', content: 'Every line is a block. Click anywhere to start typing. This editor works like Notion.', indent: 0 },
      { id: uid(), type: 'todo', content: 'Try typing "/" for slash commands', indent: 0, checked: true },
      { id: uid(), type: 'todo', content: 'Open command palette (⌘K)', indent: 0, checked: false },
      { id: uid(), type: 'todo', content: 'Drag the ⠿ handle to reorder blocks', indent: 0, checked: false },
      { id: uid(), type: 'todo', content: 'Select text to see the formatting toolbar', indent: 0, checked: false },
      { id: uid(), type: 'h2', content: 'Markdown shortcuts', indent: 0 },
      { id: uid(), type: 'bullet', content: 'Type <code style="background:rgba(135,131,120,.15);padding:0 4px;border-radius:3px">#</code> then space → Heading 1', indent: 0 },
      { id: uid(), type: 'bullet', content: 'Type <code style="background:rgba(135,131,120,.15);padding:0 4px;border-radius:3px">-</code> then space → Bullet list', indent: 0 },
      { id: uid(), type: 'bullet', content: 'Type <code style="background:rgba(135,131,120,.15);padding:0 4px;border-radius:3px">[]</code> → Todo · <code style="background:rgba(135,131,120,.15);padding:0 4px;border-radius:3px">&gt;</code> → Quote', indent: 0 },
      { id: uid(), type: 'code', content: '// Press / then type to filter block types\nconst editor = "Notion-like"\nconsole.log(`${editor} — fully interactive`)', indent: 0, language: 'javascript' },
      { id: uid(), type: 'quote', content: 'The best tool is the one that gets out of your way.', indent: 0 },
      { id: uid(), type: 'toggle', content: 'Click the arrow to expand this toggle block', indent: 0, expanded: false },
      { id: uid(), type: 'divider', content: '', indent: 0 },
      { id: uid(), type: 'text', content: 'Right-click any block for more options.', indent: 0 },
    ],
  },
  {
    id: 'p2', title: 'Design System', icon: '🎨', cover: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&q=80&auto=format&fit=crop')`,
    blocks: [
      { id: uid(), type: 'h1', content: 'Design System', indent: 0 },
      { id: uid(), type: 'text', content: 'Document your tokens, components, and patterns here.', indent: 0 },
      { id: uid(), type: 'h2', content: 'Color tokens', indent: 0 },
      { id: uid(), type: 'code', content: '--bg: #191919;\n--surface: #252525;\n--border: #2e2e2e;\n--text: #e5e5e5;\n--muted: #787878;', indent: 0, language: 'css' },
      { id: uid(), type: 'h2', content: 'Typography', indent: 0 },
      { id: uid(), type: 'bullet', content: 'System font stack — no web fonts for performance', indent: 0 },
      { id: uid(), type: 'bullet', content: 'H1: 32px / 800 weight · H2: 20px / 700 · Body: 14px / 400', indent: 0 },
    ],
  },
  {
    id: 'p3', title: 'Project Roadmap', icon: '🗺️',
    blocks: [
      { id: uid(), type: 'h1', content: 'Project Roadmap', indent: 0 },
      { id: uid(), type: 'todo', content: 'Q1 — Core block editor with slash commands', indent: 0, checked: true },
      { id: uid(), type: 'todo', content: 'Q2 — Real-time collaboration (Yjs)', indent: 0, checked: false },
      { id: uid(), type: 'todo', content: 'Q3 — AI writing assistant', indent: 0, checked: false },
      { id: uid(), type: 'todo', content: 'Q4 — Mobile apps (Capacitor)', indent: 0, checked: false },
    ],
  },
  {
    id: 'p4', title: 'Meeting Notes', icon: '📝',
    blocks: [
      { id: uid(), type: 'h1', content: 'Weekly Sync — May 2025', indent: 0 },
      { id: uid(), type: 'h2', content: 'Attendees', indent: 0 },
      { id: uid(), type: 'bullet', content: 'Elvin Kyungu — Lead dev', indent: 0 },
      { id: uid(), type: 'bullet', content: 'Team — Design & Backend', indent: 0 },
      { id: uid(), type: 'h2', content: 'Action items', indent: 0 },
      { id: uid(), type: 'todo', content: 'Review PR #42 — block editor refactor', indent: 0, checked: false },
      { id: uid(), type: 'todo', content: 'Update docs with new slash commands', indent: 0, checked: true },
      { id: uid(), type: 'todo', content: 'Ship v1.2 by Friday', indent: 0, checked: false },
    ],
  },
  {
    id: 'p5', title: 'Reading List', icon: '📚',
    blocks: [
      { id: uid(), type: 'h1', content: 'Reading List', indent: 0 },
      { id: uid(), type: 'h2', content: 'Books', indent: 0 },
      { id: uid(), type: 'todo', content: 'Refactoring UI — Adam Wathan & Steve Schoger', indent: 0, checked: true },
      { id: uid(), type: 'todo', content: 'The Design of Everyday Things — Don Norman', indent: 0, checked: false },
      { id: uid(), type: 'todo', content: 'Clean Code — Robert C. Martin', indent: 0, checked: false },
      { id: uid(), type: 'h2', content: 'Articles', indent: 0 },
      { id: uid(), type: 'todo', content: 'GSAP ScrollTrigger deep dive — GreenSock blog', indent: 0, checked: false },
      { id: uid(), type: 'todo', content: 'Building Radix UI — Pedro Duarte', indent: 0, checked: true },
    ],
  },
])

// ── App state ─────────────────────────────────────────────────────────────────
const darkMode = ref(true)
const sidebarOpen = ref(true)
const sidebarWidth = ref(240)
const currentPageId = ref('p1')
const cmdOpen = ref(false)
const cmdQuery = ref('')
const autoSave = ref<'saved' | 'saving'>('saved')
const focusedBlockId = ref<string | null>(null)
const draggingId = ref<string | null>(null)
const dragOverId = ref<string | null>(null)
const emojiOpen = ref(false)
const slashMenu = ref({ open: false, blockId: '', x: 0, y: 0, filter: '' })
const floatingBar = ref({ open: false, x: 0, y: 0 })
const ctxMenu = ref({ open: false, blockId: '', x: 0, y: 0 })
const coverPickerOpen = ref(false)
const fullWidth = ref(false)
const showCoverHint = ref(false)

// ── Computed ──────────────────────────────────────────────────────────────────
const page = computed(() => pages.value.find(p => p.id === currentPageId.value)!)
const blocks = computed(() => page.value?.blocks ?? [])
const wordCount = computed(() => {
  const text = blocks.value.map(b => b.content.replace(/<[^>]*>/g, '')).join(' ')
  return text.split(/\s+/).filter(Boolean).length
})

// ── Block helpers ──────────────────────────────────────────────────────────────
function contentEl(id: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-block="${id}"] .bc`)
}

function placeholder(type: BlockType): string {
  const m: Partial<Record<BlockType, string>> = {
    text: "Type '/' for commands…", h1: 'Heading 1', h2: 'Heading 2', h3: 'Heading 3',
    bullet: 'List item', numbered: 'List item', todo: 'To-do',
    quote: 'Quote', callout: 'Callout', code: '// Code', toggle: 'Toggle',
  }
  return m[type] ?? ''
}

// ── Block operations ───────────────────────────────────────────────────────────
function addAfter(id: string, type: BlockType = 'text') {
  const idx = blocks.value.findIndex(b => b.id === id)
  const indent = blocks.value[idx]?.indent ?? 0
  const nb: Block = { id: uid(), type, content: '', indent }
  if (type === 'todo') nb.checked = false
  if (type === 'toggle') nb.expanded = false
  if (type === 'callout') nb.calloutIcon = '💡'
  if (type === 'code') nb.language = 'javascript'
  if (type === 'image') { nb.imageUrl = ''; nb.imageCaption = '' }
  page.value.blocks.splice(idx + 1, 0, nb)
  nextTick(() => {
    const el = document.querySelector(`[data-block="${nb.id}"]`)
    if (el) gsap.from(el, { y: -4, opacity: 0, duration: 0.18, ease: 'power2.out' })
    focusEnd(nb.id, false)
  })
  save()
}

function deleteBlock(id: string) {
  const arr = page.value.blocks
  const idx = arr.findIndex(b => b.id === id)
  if (arr.length <= 1) { const el = contentEl(id); if (el) el.innerHTML = ''; arr[0].content = ''; return }
  arr.splice(idx, 1)
  nextTick(() => focusEnd(arr[Math.max(0, idx - 1)].id, true))
  save()
}

function setType(id: string, type: BlockType) {
  const b = page.value.blocks.find(b => b.id === id)
  if (!b) return
  b.type = type; b.content = ''
  if (type === 'todo') b.checked = false
  if (type === 'toggle') b.expanded = false
  if (type === 'callout') b.calloutIcon = '💡'
  if (type === 'code') b.language = 'javascript'
  if (type === 'image') { b.imageUrl = ''; b.imageCaption = '' }
  nextTick(() => { const el = contentEl(id); if (el) { el.innerHTML = ''; focusEnd(id, false) } })
  slashMenu.value.open = false
  save()
}

function setCover(value: string) {
  page.value.cover = value
  coverPickerOpen.value = false
  save()
}

function removeCover() {
  page.value.cover = undefined
  coverPickerOpen.value = false
  save()
}

function duplicate(id: string) {
  const arr = page.value.blocks
  const idx = arr.findIndex(b => b.id === id)
  const src = arr[idx]
  const copy: Block = { ...src, id: uid(), content: contentEl(id)?.innerHTML || src.content }
  arr.splice(idx + 1, 0, copy)
  nextTick(() => { const el = document.querySelector(`[data-block="${copy.id}"]`); if (el) gsap.from(el, { y: -4, opacity: 0, duration: 0.18, ease: 'power2.out' }) })
  save()
}

function moveBlock(fromId: string, toId: string) {
  const arr = page.value.blocks
  const fi = arr.findIndex(b => b.id === fromId)
  const ti = arr.findIndex(b => b.id === toId)
  if (fi === ti) return
  const [rm] = arr.splice(fi, 1)
  arr.splice(ti > fi ? ti - 1 : ti, 0, rm)
  save()
}

// ── Focus ──────────────────────────────────────────────────────────────────────
function focusEnd(id: string, atEnd = false) {
  const el = contentEl(id)
  if (!el) return
  el.focus()
  if (!atEnd) return
  const r = document.createRange(), s = window.getSelection()
  r.selectNodeContents(el); r.collapse(false)
  s?.removeAllRanges(); s?.addRange(r)
}

// ── Keyboard ───────────────────────────────────────────────────────────────────
function onKey(e: KeyboardEvent, b: Block) {
  const el = e.target as HTMLElement
  const empty = !el.textContent?.trim()

  if (e.metaKey || e.ctrlKey) {
    if (e.key === 'b') { e.preventDefault(); document.execCommand('bold'); return }
    if (e.key === 'i') { e.preventDefault(); document.execCommand('italic'); return }
    if (e.key === 'u') { e.preventDefault(); document.execCommand('underline'); return }
    if (e.key === 'k') { e.preventDefault(); cmdOpen.value = true; cmdQuery.value = ''; return }
    if (e.key === 'd') { e.preventDefault(); b.content = el.innerHTML; duplicate(b.id); return }
  }

  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    b.content = el.innerHTML
    if (b.type === 'toggle') { b.expanded = !b.expanded; return }
    if (empty && b.type !== 'text') { setType(b.id, 'text'); return }
    const cont: BlockType = ['bullet', 'numbered', 'todo'].includes(b.type) ? b.type : 'text'
    addAfter(b.id, cont); return
  }

  if (e.key === 'Backspace' && empty) {
    e.preventDefault()
    if (b.type !== 'text') { setType(b.id, 'text'); return }
    deleteBlock(b.id); return
  }

  if (e.key === 'Tab') {
    e.preventDefault()
    const blk = page.value.blocks.find(x => x.id === b.id)
    if (!blk) return
    if (e.shiftKey) { if (blk.indent > 0) blk.indent-- }
    else { if (blk.indent < 6) blk.indent++ }
    return
  }

  if (e.key === 'ArrowUp') {
    const idx = blocks.value.findIndex(x => x.id === b.id)
    const sel = window.getSelection()
    if (idx > 0 && sel?.getRangeAt(0)?.startOffset === 0) { e.preventDefault(); focusEnd(blocks.value[idx - 1].id, false) }
  }
  if (e.key === 'ArrowDown') {
    const idx = blocks.value.findIndex(x => x.id === b.id)
    const sel = window.getSelection()
    if (idx < blocks.value.length - 1 && sel?.getRangeAt(0)?.startOffset === (el.textContent?.length ?? 0)) {
      e.preventDefault(); focusEnd(blocks.value[idx + 1].id)
    }
  }
}

// ── Input ──────────────────────────────────────────────────────────────────────
function onInput(e: Event, b: Block) {
  const el = e.target as HTMLElement
  const plain = el.textContent?.trim() ?? ''

  // Markdown shortcuts
  if (plain === '#') { el.textContent = ''; b.content = ''; setType(b.id, 'h1'); return }
  if (plain === '##') { el.textContent = ''; b.content = ''; setType(b.id, 'h2'); return }
  if (plain === '###') { el.textContent = ''; b.content = ''; setType(b.id, 'h3'); return }
  if (plain === '-' || plain === '*') { el.textContent = ''; b.content = ''; setType(b.id, 'bullet'); return }
  if (plain === '1.') { el.textContent = ''; b.content = ''; setType(b.id, 'numbered'); return }
  if (plain === '[]' || plain === '[ ]') { el.textContent = ''; b.content = ''; setType(b.id, 'todo'); return }
  if (plain === '>') { el.textContent = ''; b.content = ''; setType(b.id, 'quote'); return }
  if (plain === '---') { b.content = ''; setType(b.id, 'divider'); return }

  // Slash detection
  const text = el.textContent ?? ''
  if (text.endsWith('/')) {
    const rect = el.getBoundingClientRect()
    slashMenu.value = { open: true, blockId: b.id, x: rect.left, y: rect.bottom, filter: '' }
  } else if (slashMenu.value.open && slashMenu.value.blockId === b.id) {
    const si = text.lastIndexOf('/')
    if (si < 0) slashMenu.value.open = false
    else slashMenu.value.filter = text.slice(si + 1).toLowerCase()
  }

  b.content = el.innerHTML
  save()
}

// ── Slash commands ─────────────────────────────────────────────────────────────
const slashCmds = [
  { label: 'Text', desc: 'Plain paragraph', type: 'text' as BlockType, kbd: '' },
  { label: 'Heading 1', desc: 'Large section title', type: 'h1' as BlockType, kbd: '#' },
  { label: 'Heading 2', desc: 'Medium section title', type: 'h2' as BlockType, kbd: '##' },
  { label: 'Heading 3', desc: 'Sub-section title', type: 'h3' as BlockType, kbd: '###' },
  { label: 'Bullet list', desc: 'Unordered list', type: 'bullet' as BlockType, kbd: '-' },
  { label: 'Numbered list', desc: 'Ordered list', type: 'numbered' as BlockType, kbd: '1.' },
  { label: 'To-do', desc: 'Checkbox task', type: 'todo' as BlockType, kbd: '[]' },
  { label: 'Toggle', desc: 'Collapsible block', type: 'toggle' as BlockType, kbd: '' },
  { label: 'Quote', desc: 'Highlighted blockquote', type: 'quote' as BlockType, kbd: '>' },
  { label: 'Callout', desc: 'Info callout box', type: 'callout' as BlockType, kbd: '' },
  { label: 'Code', desc: 'Code snippet', type: 'code' as BlockType, kbd: '```' },
  { label: 'Image', desc: 'Embed an image by URL', type: 'image' as BlockType, kbd: '' },
  { label: 'Divider', desc: 'Horizontal rule', type: 'divider' as BlockType, kbd: '---' },
]

const filteredSlash = computed(() => {
  const f = slashMenu.value.filter
  if (!f) return slashCmds
  return slashCmds.filter(c => c.label.toLowerCase().includes(f) || c.desc.toLowerCase().includes(f))
})

function pickSlash(type: BlockType) {
  const b = blocks.value.find(x => x.id === slashMenu.value.blockId)
  if (!b) return
  const el = contentEl(b.id)
  if (el) { const si = (el.textContent ?? '').lastIndexOf('/'); el.textContent = si >= 0 ? (el.textContent ?? '').slice(0, si) : ''; b.content = el.textContent }
  if (!el?.textContent?.trim()) setType(b.id, type)
  else addAfter(b.id, type)
  slashMenu.value.open = false
}

// ── Floating toolbar ───────────────────────────────────────────────────────────
function onEditorMouseup() {
  setTimeout(() => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) { floatingBar.value.open = false; return }
    const r = sel.getRangeAt(0).getBoundingClientRect()
    if (!r.width) { floatingBar.value.open = false; return }
    floatingBar.value = { open: true, x: r.left + r.width / 2, y: r.top }
  }, 10)
}

function fmt(cmd: string, val?: string) { document.execCommand(cmd, false, val) }

// ── Drag & drop ────────────────────────────────────────────────────────────────
function onDragStart(e: DragEvent, id: string) {
  draggingId.value = id
  if (e.dataTransfer) { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', id) }
}
function onDragOver(e: DragEvent, id: string) { e.preventDefault(); if (id !== draggingId.value) dragOverId.value = id }
function onDrop(e: DragEvent, id: string) { e.preventDefault(); if (draggingId.value && draggingId.value !== id) moveBlock(draggingId.value, id); draggingId.value = null; dragOverId.value = null }
function onDragEnd() { draggingId.value = null; dragOverId.value = null }

// ── Sidebar resize ─────────────────────────────────────────────────────────────
function startResize(e: MouseEvent) {
  const sx = e.clientX, sw = sidebarWidth.value
  const mv = (ev: MouseEvent) => { sidebarWidth.value = Math.max(180, Math.min(420, sw + ev.clientX - sx)) }
  const up = () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up) }
  window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up)
}

// ── Auto-save ──────────────────────────────────────────────────────────────────
let st: ReturnType<typeof setTimeout> | null = null
function save() {
  autoSave.value = 'saving'
  if (st) clearTimeout(st)
  st = setTimeout(() => { autoSave.value = 'saved' }, 900)
}

// ── Navigation ─────────────────────────────────────────────────────────────────
function goPage(id: string) {
  if (id === currentPageId.value) return
  currentPageId.value = id
  nextTick(() => {
    const el = document.querySelector('.editor-scroll')
    if (el) gsap.from(el, { opacity: 0, y: 10, duration: 0.22, ease: 'power2.out' })
  })
}

function addPage() {
  const p: Page = { id: uid(), title: 'Untitled', icon: '📄', blocks: [{ id: uid(), type: 'text', content: '', indent: 0 }] }
  pages.value.push(p)
  goPage(p.id)
}

// ── Numbered list index ────────────────────────────────────────────────────────
function numIdx(id: string): number {
  const arr = blocks.value, i = arr.findIndex(b => b.id === id)
  let n = 1
  for (let j = i - 1; j >= 0; j--) { if (arr[j].type === 'numbered') n++; else break }
  return n
}

// ── Command palette ────────────────────────────────────────────────────────────
const cmdList = computed(() => [
  { icon: '🌓', label: 'Toggle dark / light mode', run: () => { darkMode.value = !darkMode.value } },
  { icon: '📄', label: 'New page', run: addPage },
  ...pages.value.map(p => ({ icon: p.icon, label: `Open "${p.title}"`, run: () => goPage(p.id) })),
  { icon: '📤', label: 'Export as Markdown', run: () => {} },
  { icon: '🔍', label: 'Find in page', run: () => {} },
])

const filteredCmds = computed(() => {
  const q = cmdQuery.value.toLowerCase()
  return q ? cmdList.value.filter(c => c.label.toLowerCase().includes(q)) : cmdList.value
})

// ── Context menu ───────────────────────────────────────────────────────────────
function openCtx(e: MouseEvent, id: string) {
  e.preventDefault()
  ctxMenu.value = { open: true, blockId: id, x: e.clientX, y: e.clientY }
}

// ── Close menus on outside click ───────────────────────────────────────────────
function closeMenus(e: Event) {
  const t = e.target as HTMLElement
  if (!t.closest('.slash-menu')) slashMenu.value.open = false
  if (!t.closest('.ctx-menu')) ctxMenu.value.open = false
  if (!t.closest('.emoji-picker') && !t.closest('.emoji-btn')) emojiOpen.value = false
  if (!t.closest('.cover-picker') && !t.closest('.cover-btn')) coverPickerOpen.value = false
  if (!t.closest('.floating-bar') && window.getSelection()?.isCollapsed) floatingBar.value.open = false
}

// ── Emojis ─────────────────────────────────────────────────────────────────────
const emojiCategories = [
  { label: 'Common', icons: ['📄','📝','📌','📎','🗒️','🗂️','📁','📂','🗃️','📋'] },
  { label: 'Objects', icons: ['💡','🔑','🔮','🧪','🔬','💊','🎯','📊','📈','🏆'] },
  { label: 'Nature', icons: ['🌍','🌸','🌿','🍀','🌊','🔥','⚡','🌙','⭐','☀️'] },
  { label: 'Activities', icons: ['🚀','✈️','🏗️','🎬','🎵','🎮','⚽','🏋️','🎸','🎨'] },
  { label: 'People', icons: ['🧠','👁️','✍️','🤝','💪','🙌','👋','🧑‍💻','🎓','🏆'] },
  { label: 'Tech', icons: ['💻','📱','🖥️','⌨️','🖱️','📡','🔧','⚙️','🛠️','🔩'] },
]
const emojiTab = ref(0)
const emojis = computed(() => emojiCategories[emojiTab.value]?.icons ?? [])

const coverOptions: Array<{ type: 'gradient' | 'photo'; value: string; thumb: string }> = [
  { type: 'gradient', value: 'linear-gradient(135deg,#1a1a2e,#0f3460 50%,#533483)', thumb: 'linear-gradient(135deg,#1a1a2e,#533483)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#667eea,#764ba2)', thumb: 'linear-gradient(135deg,#667eea,#764ba2)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#f093fb,#f5576c)', thumb: 'linear-gradient(135deg,#f093fb,#f5576c)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#4facfe,#00f2fe)', thumb: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#43e97b,#38f9d7)', thumb: 'linear-gradient(135deg,#43e97b,#38f9d7)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#fa709a,#fee140)', thumb: 'linear-gradient(135deg,#fa709a,#fee140)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#a18cd1,#fbc2eb)', thumb: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#fd746c,#ff9068)', thumb: 'linear-gradient(135deg,#fd746c,#ff9068)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#2d3436,#636e72)', thumb: 'linear-gradient(135deg,#2d3436,#636e72)' },
  { type: 'gradient', value: 'linear-gradient(135deg,#ffecd2,#fcb69f)', thumb: 'linear-gradient(135deg,#ffecd2,#fcb69f)' },
  { type: 'photo', value: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop')`, thumb: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=60&auto=format&fit=crop')` },
  { type: 'photo', value: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&q=80&auto=format&fit=crop')`, thumb: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=60&auto=format&fit=crop')` },
  { type: 'photo', value: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80&auto=format&fit=crop')`, thumb: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=60&auto=format&fit=crop')` },
  { type: 'photo', value: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop')`, thumb: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=60&auto=format&fit=crop')` },
  { type: 'photo', value: `url('https://images.unsplash.com/photo-1682685797208-c741d58c2eff?w=1600&q=80&auto=format&fit=crop')`, thumb: `url('https://images.unsplash.com/photo-1682685797208-c741d58c2eff?w=400&q=60&auto=format&fit=crop')` },
  { type: 'photo', value: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop')`, thumb: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=60&auto=format&fit=crop')` },
]

function blockTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    text: `<svg viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="2.5" rx="1.25"/><rect x="1" y="6.75" width="11" height="2.5" rx="1.25"/><rect x="1" y="11.5" width="7" height="2.5" rx="1.25"/></svg>`,
    h1: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.5h2v4.5h3.5V2.5h2V13H6.5V9H3v4H1V2.5z"/><text x="10" y="13" font-size="6" font-weight="800" font-family="system-ui,sans-serif" fill="currentColor">1</text></svg>`,
    h2: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.5h2v4.5h3.5V2.5h2V13H6.5V9H3v4H1V2.5z"/><text x="10" y="13" font-size="6" font-weight="800" font-family="system-ui,sans-serif" fill="currentColor">2</text></svg>`,
    h3: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.5h2v4.5h3.5V2.5h2V13H6.5V9H3v4H1V2.5z"/><text x="10" y="13" font-size="6" font-weight="800" font-family="system-ui,sans-serif" fill="currentColor">3</text></svg>`,
    bullet: `<svg viewBox="0 0 16 16" fill="currentColor"><circle cx="2.5" cy="5" r="1.5"/><rect x="5.5" y="3.75" width="9" height="2.5" rx="1.25"/><circle cx="2.5" cy="11" r="1.5"/><rect x="5.5" y="9.75" width="9" height="2.5" rx="1.25"/></svg>`,
    numbered: `<svg viewBox="0 0 16 16" fill="currentColor"><text x="0.5" y="6.5" font-size="5" font-weight="700" font-family="system-ui,sans-serif" fill="currentColor">1.</text><text x="0.5" y="13.5" font-size="5" font-weight="700" font-family="system-ui,sans-serif" fill="currentColor">2.</text><rect x="6" y="3.75" width="9.5" height="2.5" rx="1.25"/><rect x="6" y="9.75" width="9.5" height="2.5" rx="1.25"/></svg>`,
    todo: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2.5" width="11" height="11" rx="2"/><path d="M5 8l2.5 2.5L11 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    toggle: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 4l5 4-5 4z"/><rect x="4" y="14" width="8" height="1.5" rx="0.75"/></svg>`,
    quote: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 3c-.6 0-1 .4-1 1v3.5c0 .6.4 1 1 1h1l-1.5 3H3L5 8V4c0-.6-.4-1-1-1H2zm7 0c-.6 0-1 .4-1 1v3.5c0 .6.4 1 1 1h1l-1.5 3h1.5L12 8V4c0-.6-.4-1-1-1H9z"/></svg>`,
    callout: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="8" cy="8" r="6.5"/><line x1="8" y1="6.5" x2="8" y2="11" stroke-linecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="currentColor" stroke="none"/></svg>`,
    code: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5L2 8l3 3M11 5l3 3-3 3M9.5 4l-3 8"/></svg>`,
    divider: `<svg viewBox="0 0 16 16" fill="currentColor"><rect x="0.5" y="7" width="15" height="2" rx="1"/></svg>`,
    image: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><circle cx="5.5" cy="6" r="1.25"/><path d="M1.5 11l3.5-3 3 2.5 2-2 3.5 3"/></svg>`,
  }
  return icons[type] ?? `<svg viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="12" height="12" rx="2" fill-opacity=".4"/></svg>`
}

// ── Global keyboard ────────────────────────────────────────────────────────────
function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); cmdOpen.value = !cmdOpen.value; cmdQuery.value = '' }
  if (e.key === 'Escape') { cmdOpen.value = false; slashMenu.value.open = false; ctxMenu.value.open = false; floatingBar.value.open = false; emojiOpen.value = false; coverPickerOpen.value = false }
}

// ── Lifecycle ──────────────────────────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('keydown', onGlobalKey)
  window.addEventListener('click', closeMenus)
  gsap.from('.sidebar', { x: -20, opacity: 0, duration: 0.35, ease: 'power3.out' })
  gsap.from('.editor-scroll', { y: 16, opacity: 0, duration: 0.35, delay: 0.08, ease: 'power3.out' })
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKey)
  window.removeEventListener('click', closeMenus)
  if (st) clearTimeout(st)
})
</script>

<template>
  <div
    class="notes-root h-screen flex flex-col overflow-hidden"
    :class="darkMode ? 'dark' : 'light'"
    @mouseup="onEditorMouseup"
  >

    <!-- ── Topbar ────────────────────────────────────────────────────────────── -->
    <div class="topbar h-11 flex items-center justify-between px-3 shrink-0">
      <div class="flex items-center gap-1.5">
        <button @click="sidebarOpen = !sidebarOpen" class="ib" title="Toggle sidebar (⌘\\)">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div class="flex items-center gap-1 text-[13px] font-semibold tracking-tight" :class="darkMode ? 'text-zinc-100' : 'text-gray-900'">
          <span class="opacity-50 text-xs">✦</span> Notes
        </div>
      </div>

      <!-- Breadcrumb -->
      <div class="hidden sm:flex items-center gap-1 text-xs" :class="darkMode ? 'text-zinc-600' : 'text-gray-400'">
        <span>Workspace</span>
        <span class="mx-0.5">/</span>
        <span :class="darkMode ? 'text-zinc-300' : 'text-gray-600'" class="font-medium">{{ page?.title }}</span>
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-1.5">
        <span class="text-[11px] transition-all" :class="autoSave === 'saving' ? (darkMode ? 'text-zinc-600' : 'text-gray-400') : (darkMode ? 'text-zinc-800' : 'text-gray-200')">
          {{ autoSave === 'saving' ? 'Saving…' : 'Saved' }}
        </span>
        <span class="text-[11px] hidden sm:block" :class="darkMode ? 'text-zinc-700' : 'text-gray-300'">{{ wordCount }} words</span>
        <button @click="darkMode = !darkMode" class="ib" title="Toggle theme">
          <svg v-if="darkMode" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
        </button>
        <button @click="cmdOpen = true; cmdQuery = ''" class="cmd-trigger hidden sm:flex items-center gap-1.5 px-2 py-1 text-xs rounded-md">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Search
          <kbd class="text-[9px] px-1 py-0.5 rounded font-mono opacity-60 ml-0.5" :class="darkMode ? 'bg-zinc-700' : 'bg-gray-200'">⌘K</kbd>
        </button>
        <button @click="fullWidth = !fullWidth" class="ib hidden sm:flex" :title="fullWidth ? 'Narrow view' : 'Full width'">
          <svg v-if="!fullWidth" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 9L4 4m0 0v5m0-5h5M15 9l5-5m0 0v5m0-5h-5M9 15l-5 5m0 0v-5m0 5h5M15 15l5 5m0 0v-5m0 5h-5"/></svg>
        </button>
        <button class="share-btn px-2.5 py-1 text-xs rounded-md font-medium">Share</button>
      </div>
    </div>

    <!-- ── Main layout ───────────────────────────────────────────────────────── -->
    <div class="flex flex-1 overflow-hidden">

      <!-- ── Sidebar ───────────────────────────────────────────────────────── -->
      <Transition name="sidebar">
        <aside v-if="sidebarOpen" class="sidebar flex flex-col shrink-0 overflow-hidden relative" :style="{ width: sidebarWidth + 'px' }">

          <!-- Quick actions -->
          <div class="p-2 space-y-0.5 shrink-0">
            <button @click="cmdOpen = true; cmdQuery = ''" class="sb w-full">
              <svg class="w-3.5 h-3.5 shrink-0 op" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <span>Search</span>
              <kbd class="ml-auto text-[9px] px-1 py-0.5 rounded font-mono op" :class="darkMode ? 'bg-zinc-700' : 'bg-gray-200'">⌘K</kbd>
            </button>
            <button class="sb w-full">
              <svg class="w-3.5 h-3.5 shrink-0 op" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
              <span @click="addPage">New page</span>
            </button>
          </div>

          <!-- Pages -->
          <div class="flex-1 overflow-y-auto px-2 pb-2 custom-scroll">
            <p class="text-[10px] font-semibold uppercase tracking-widest px-2 py-2 op">Private</p>
            <div class="space-y-0.5">
              <button
                v-for="p in pages"
                :key="p.id"
                @click="goPage(p.id)"
                class="sb w-full group"
                :class="{ 'active': p.id === currentPageId }"
              >
                <span class="shrink-0">{{ p.icon }}</span>
                <span class="flex-1 text-left truncate text-[13px]">{{ p.title }}</span>
                <span class="opacity-0 group-hover:opacity-40 text-xs transition-opacity">•••</span>
              </button>
            </div>
            <button @click="addPage" class="sb w-full mt-1 op hover:!opacity-100 transition-opacity">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span class="text-[13px]">Add a page</span>
            </button>
          </div>

          <!-- User -->
          <div class="p-2 shrink-0 border-t" :class="darkMode ? 'border-[#2e2e2e]' : 'border-[#ededed]'">
            <div class="sb w-full cursor-default">
              <div class="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">EK</div>
              <div class="flex-1 min-w-0">
                <p class="text-[13px] font-medium truncate" :class="darkMode ? 'text-zinc-300' : 'text-gray-700'">Elvin Kyungu</p>
                <p class="text-[11px] op">Free plan</p>
              </div>
            </div>
          </div>

          <!-- Resize handle -->
          <div class="resize-handle absolute top-0 right-0 w-1 h-full cursor-col-resize z-10 hover:bg-blue-500/40 transition-colors" @mousedown.prevent="startResize" />
        </aside>
      </Transition>

      <!-- ── Editor ────────────────────────────────────────────────────────── -->
      <main class="flex-1 overflow-hidden" :class="darkMode ? 'bg-[#191919]' : 'bg-white'">
        <div class="editor-scroll h-full overflow-y-auto custom-scroll" @click.self="addAfter(blocks[blocks.length - 1]?.id)">

          <!-- ── Cover image ─────────────────────────────────────────────────── -->
          <div
            class="cover-area relative group"
            :class="page?.cover ? 'h-52' : 'h-0'"
            @mouseenter="showCoverHint = true"
            @mouseleave="showCoverHint = false"
          >
            <div
              v-if="page?.cover"
              class="absolute inset-0 bg-center bg-cover"
              :style="{ background: page.cover, backgroundSize: 'cover', backgroundPosition: 'center' }"
            />
            <!-- Cover controls -->
            <Transition name="pop">
              <div v-if="page?.cover && showCoverHint" class="absolute bottom-3 right-4 flex items-center gap-2">
                <button class="cover-btn cover-ctrl" @click.stop="coverPickerOpen = !coverPickerOpen">Change cover</button>
                <button class="cover-btn cover-ctrl" @click.stop="removeCover">Remove</button>
              </div>
            </Transition>
          </div>

          <div :class="fullWidth ? 'px-6 sm:px-16 pt-8 pb-48' : 'max-w-[720px] mx-auto px-4 sm:px-14 pt-8 pb-48'">

            <!-- Add cover / icon row (shown when no cover or on hover) -->
            <div v-if="!page?.cover" class="flex items-center gap-2 mb-4 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity">
              <button class="cover-btn" @click.stop="coverPickerOpen = !coverPickerOpen">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Add cover
              </button>
              <button v-if="!page?.icon" class="cover-btn" @click.stop="emojiOpen = true">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Add icon
              </button>
            </div>

            <!-- Page icon -->
            <div class="relative inline-block mb-3" :class="page?.cover ? '-mt-10' : ''">
              <button class="emoji-btn text-5xl hover:scale-110 transition-transform" @click.stop="emojiOpen = !emojiOpen" :title="page?.icon ? 'Change icon' : 'Add icon'">
                {{ page?.icon || '📄' }}
              </button>
              <Transition name="pop">
                <div v-if="emojiOpen" class="emoji-picker absolute top-full left-0 mt-2 rounded-xl shadow-2xl z-50 overflow-hidden w-56" :class="darkMode ? 'bg-[#252525] border border-[#3a3a3a]' : 'bg-white border border-[#ededed] shadow-xl'" @click.stop>
                  <!-- Tabs -->
                  <div class="flex border-b overflow-x-auto custom-scroll" :class="darkMode ? 'border-[#333]' : 'border-[#ededed]'">
                    <button
                      v-for="(cat, ci) in emojiCategories"
                      :key="ci"
                      @click="emojiTab = ci"
                      class="px-2.5 py-1.5 text-[10px] shrink-0 font-medium transition-colors whitespace-nowrap"
                      :class="emojiTab === ci ? (darkMode ? 'text-white border-b-2 border-white' : 'text-gray-900 border-b-2 border-gray-900') : 'op'"
                    >{{ cat.label }}</button>
                  </div>
                  <div class="p-2 grid grid-cols-5 gap-0.5">
                    <button v-for="e in emojis" :key="e" @click="page.icon = e; emojiOpen = false" class="text-xl hover:scale-125 transition-transform p-1.5 rounded hover:bg-black/10">{{ e }}</button>
                  </div>
                  <div class="border-t p-2" :class="darkMode ? 'border-[#333]' : 'border-[#ededed]'">
                    <button @click="page.icon = ''; emojiOpen = false" class="w-full text-[11px] py-1 text-center op hover:opacity-100 transition-opacity">Remove icon</button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Page title -->
            <div
              class="page-title text-[38px] font-black mb-8 w-full outline-none leading-tight"
              contenteditable="true"
              data-ph="Untitled"
              :class="darkMode ? 'text-white' : 'text-gray-900'"
              v-content="page?.title"
              @input="(e) => { page.title = (e.target as HTMLElement).textContent ?? ''; save() }"
              @keydown.enter.prevent="focusEnd(blocks[0]?.id)"
            />

            <!-- Blocks -->
            <div class="blocks-area">
              <div
                v-for="b in blocks"
                :key="b.id"
                :data-block="b.id"
                class="bw group relative"
                :class="{ 'drop-here': dragOverId === b.id, 'dragging': draggingId === b.id }"
                :style="{ paddingLeft: (b.indent * 24) + 'px' }"
                draggable="true"
                @dragstart="onDragStart($event, b.id)"
                @dragover.prevent="onDragOver($event, b.id)"
                @drop="onDrop($event, b.id)"
                @dragend="onDragEnd"
                @contextmenu.prevent="openCtx($event, b.id)"
              >
                <!-- Drag handle -->
                <div class="drag-handle absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab select-none text-xs" :class="darkMode ? 'text-zinc-700 hover:text-zinc-400' : 'text-gray-300 hover:text-gray-500'" style="left:-20px">⠿</div>

                <!-- DIVIDER -->
                <template v-if="b.type === 'divider'">
                  <hr class="my-3" :class="darkMode ? 'border-[#2e2e2e]' : 'border-gray-200'" />
                </template>

                <!-- CODE -->
                <template v-else-if="b.type === 'code'">
                  <div class="rounded-lg overflow-hidden my-1.5" :class="darkMode ? 'bg-[#0d0d0d] border border-[#252525]' : 'bg-gray-50 border border-gray-200'">
                    <div class="flex items-center justify-between px-4 py-2 border-b text-[11px]" :class="darkMode ? 'border-[#252525] text-zinc-600' : 'border-gray-200 text-gray-400'">
                      <span>{{ b.language }}</span>
                      <button @click.prevent="(navigator as any).clipboard?.writeText(contentEl(b.id)?.textContent || b.content)" class="hover:opacity-100 opacity-40 transition-opacity">Copy</button>
                    </div>
                    <pre class="px-4 py-3 overflow-x-auto text-[13px] font-mono leading-relaxed m-0" :class="darkMode ? 'text-emerald-400' : 'text-gray-800'"><code
                      class="bc outline-none block"
                      contenteditable="true"
                      spellcheck="false"
                      v-content="b.content"
                      @keydown="onKey($event, b)"
                      @input="onInput($event, b)"
                      @focus="focusedBlockId = b.id"
                      @blur="b.content = ($event.target as HTMLElement).innerHTML"
                    /></pre>
                  </div>
                </template>

                <!-- CALLOUT -->
                <template v-else-if="b.type === 'callout'">
                  <div class="flex items-start gap-3 px-4 py-3 rounded-lg my-0.5" :class="darkMode ? 'bg-[#252525] border border-[#333]' : 'bg-amber-50 border border-amber-200'">
                    <span class="shrink-0 text-lg mt-0.5">{{ b.calloutIcon ?? '💡' }}</span>
                    <div class="bc flex-1 outline-none text-sm leading-relaxed" :class="darkMode ? 'text-zinc-300' : 'text-gray-700'" contenteditable="true" :data-ph="placeholder(b.type)" v-content="b.content" @keydown="onKey($event, b)" @input="onInput($event, b)" @focus="focusedBlockId = b.id" @blur="b.content = ($event.target as HTMLElement).innerHTML" />
                  </div>
                </template>

                <!-- QUOTE -->
                <template v-else-if="b.type === 'quote'">
                  <div class="flex items-start gap-3 my-0.5 py-1">
                    <div class="w-[3px] rounded-full self-stretch shrink-0" :class="darkMode ? 'bg-zinc-600' : 'bg-gray-300'" style="min-height:1.4rem" />
                    <div class="bc flex-1 outline-none text-sm leading-relaxed italic" :class="darkMode ? 'text-zinc-400' : 'text-gray-500'" contenteditable="true" :data-ph="placeholder(b.type)" v-content="b.content" @keydown="onKey($event, b)" @input="onInput($event, b)" @focus="focusedBlockId = b.id" @blur="b.content = ($event.target as HTMLElement).innerHTML" />
                  </div>
                </template>

                <!-- TOGGLE -->
                <template v-else-if="b.type === 'toggle'">
                  <div class="my-0.5">
                    <div class="flex items-start gap-2">
                      <button @click="b.expanded = !b.expanded" class="shrink-0 mt-[5px] text-[10px] transition-transform duration-150" :class="[darkMode ? 'text-zinc-500' : 'text-gray-400', b.expanded ? 'rotate-90' : '']" style="width:14px;line-height:1">▶</button>
                      <div class="bc flex-1 outline-none text-sm leading-relaxed font-medium" :class="darkMode ? 'text-zinc-200' : 'text-gray-800'" contenteditable="true" :data-ph="placeholder(b.type)" v-content="b.content" @keydown="onKey($event, b)" @input="onInput($event, b)" @focus="focusedBlockId = b.id" @blur="b.content = ($event.target as HTMLElement).innerHTML" />
                    </div>
                    <Transition name="expand">
                      <div v-if="b.expanded" class="ml-5 pl-4 mt-1 border-l py-1 text-sm" :class="darkMode ? 'border-[#2e2e2e] text-zinc-500' : 'border-gray-200 text-gray-400'">
                        Toggle content — click to edit this text.
                      </div>
                    </Transition>
                  </div>
                </template>

                <!-- TODO -->
                <template v-else-if="b.type === 'todo'">
                  <div class="flex items-start gap-2.5 py-0.5">
                    <button @click="b.checked = !b.checked; save()" class="shrink-0 mt-[3px] w-[15px] h-[15px] rounded border-[1.5px] flex items-center justify-center transition-all" :class="b.checked ? 'bg-blue-500 border-blue-500' : (darkMode ? 'border-zinc-600 hover:border-zinc-400' : 'border-gray-300 hover:border-gray-500')">
                      <svg v-if="b.checked" class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="m5 13 4 4L19 7"/></svg>
                    </button>
                    <div class="bc flex-1 outline-none text-sm leading-relaxed transition-all" :class="b.checked ? (darkMode ? 'text-zinc-600 line-through' : 'text-gray-400 line-through') : (darkMode ? 'text-zinc-200' : 'text-gray-800')" contenteditable="true" :data-ph="placeholder(b.type)" v-content="b.content" @keydown="onKey($event, b)" @input="onInput($event, b)" @focus="focusedBlockId = b.id" @blur="b.content = ($event.target as HTMLElement).innerHTML" />
                  </div>
                </template>

                <!-- BULLET -->
                <template v-else-if="b.type === 'bullet'">
                  <div class="flex items-start gap-2.5 py-0.5">
                    <span class="shrink-0 mt-[8px] w-[5px] h-[5px] rounded-full" :class="darkMode ? 'bg-zinc-500' : 'bg-gray-400'" />
                    <div class="bc flex-1 outline-none text-sm leading-relaxed" :class="darkMode ? 'text-zinc-200' : 'text-gray-800'" contenteditable="true" :data-ph="placeholder(b.type)" v-content="b.content" @keydown="onKey($event, b)" @input="onInput($event, b)" @focus="focusedBlockId = b.id" @blur="b.content = ($event.target as HTMLElement).innerHTML" />
                  </div>
                </template>

                <!-- NUMBERED -->
                <template v-else-if="b.type === 'numbered'">
                  <div class="flex items-start gap-2.5 py-0.5">
                    <span class="shrink-0 text-sm mt-px w-5 text-right" :class="darkMode ? 'text-zinc-500' : 'text-gray-400'">{{ numIdx(b.id) }}.</span>
                    <div class="bc flex-1 outline-none text-sm leading-relaxed" :class="darkMode ? 'text-zinc-200' : 'text-gray-800'" contenteditable="true" :data-ph="placeholder(b.type)" v-content="b.content" @keydown="onKey($event, b)" @input="onInput($event, b)" @focus="focusedBlockId = b.id" @blur="b.content = ($event.target as HTMLElement).innerHTML" />
                  </div>
                </template>

                <!-- IMAGE -->
                <template v-else-if="b.type === 'image'">
                  <div class="my-1.5">
                    <div v-if="b.imageUrl" class="relative group/img rounded-lg overflow-hidden">
                      <img :src="b.imageUrl" alt="Block image" class="w-full rounded-lg object-cover max-h-[480px]" @error="b.imageUrl = ''" />
                      <div class="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors rounded-lg" />
                      <button @click="b.imageUrl = ''" class="absolute top-2 right-2 opacity-0 group-hover/img:opacity-100 transition-opacity text-[10px] px-2 py-1 rounded-md font-medium" :class="darkMode ? 'bg-black/60 text-white' : 'bg-white/90 text-gray-700'">Replace</button>
                    </div>
                    <div v-else class="flex flex-col items-center justify-center gap-2 py-8 rounded-lg border-2 border-dashed cursor-pointer" :class="darkMode ? 'border-[#333] hover:border-[#444]' : 'border-gray-200 hover:border-gray-300'">
                      <svg class="w-8 h-8 op" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <p class="text-xs op">Paste image URL below</p>
                      <input
                        type="url"
                        class="w-full max-w-xs px-3 py-1.5 text-xs rounded-lg outline-none"
                        :class="darkMode ? 'bg-[#333] text-zinc-200 placeholder-zinc-600' : 'bg-gray-100 text-gray-800 placeholder-gray-400'"
                        placeholder="https://..."
                        @keydown.enter.prevent="(e) => { const v = (e.target as HTMLInputElement).value.trim(); if (v) { b.imageUrl = v; save() } }"
                        @blur="(e) => { const v = (e.target as HTMLInputElement).value.trim(); if (v) { b.imageUrl = v; save() } }"
                        @click.stop
                      />
                    </div>
                    <div class="mt-1 text-center">
                      <div class="bc inline-block min-w-[200px] outline-none text-xs italic text-center py-1" :class="darkMode ? 'text-zinc-600' : 'text-gray-400'" contenteditable="true" :data-ph="'Add a caption…'" v-content="b.imageCaption || ''" @blur="b.imageCaption = ($event.target as HTMLElement).textContent || ''" />
                    </div>
                  </div>
                </template>

                <!-- TEXT / H1 / H2 / H3 -->
                <template v-else>
                  <div
                    class="bc outline-none leading-relaxed py-px w-full"
                    :class="[
                      b.type === 'h1' ? 'text-[28px] font-black mt-7 mb-1' : '',
                      b.type === 'h2' ? 'text-[20px] font-bold mt-5 mb-0.5' : '',
                      b.type === 'h3' ? 'text-[16px] font-semibold mt-4 mb-0.5' : '',
                      b.type === 'text' ? 'text-sm' : '',
                      darkMode
                        ? (b.type === 'text' ? 'text-zinc-200' : 'text-[#e5e5e5]')
                        : (b.type === 'text' ? 'text-gray-700' : 'text-gray-900'),
                    ]"
                    contenteditable="true"
                    :data-ph="placeholder(b.type)"
                    v-content="b.content"
                    @keydown="onKey($event, b)"
                    @input="onInput($event, b)"
                    @focus="focusedBlockId = b.id"
                    @blur="b.content = ($event.target as HTMLElement).innerHTML"
                  />
                </template>

              </div>

              <!-- Add block hint -->
              <div @click="addAfter(blocks[blocks.length - 1]?.id)" class="mt-6 flex items-center gap-2 text-xs opacity-0 hover:opacity-100 transition-opacity cursor-text py-2 px-1 rounded-md" :class="darkMode ? 'text-zinc-700 hover:bg-[#232323]' : 'text-gray-300 hover:bg-gray-50'">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                Click to add a block, or press / inside any block
              </div>
            </div>

          </div>
        </div>

        <!-- ── Cover picker ──────────────────────────────────────────────────── -->
        <Transition name="pop">
          <div v-if="coverPickerOpen" class="cover-picker fixed z-[80] bottom-auto left-1/2 -translate-x-1/2 w-80 rounded-xl shadow-2xl overflow-hidden" style="top: 25%" :class="darkMode ? 'bg-[#252525] border border-[#3a3a3a]' : 'bg-white border border-[#e5e5e5]'" @click.stop>
            <div class="px-4 pt-3 pb-2 flex items-center justify-between">
              <span class="text-xs font-semibold op uppercase tracking-wider">Page cover</span>
              <button @click="coverPickerOpen = false" class="ib text-xs">✕</button>
            </div>
            <div class="px-3 pb-3">
              <p class="text-[10px] op font-medium uppercase tracking-wider mb-2 px-1">Gradients</p>
              <div class="grid grid-cols-5 gap-1.5 mb-3">
                <button
                  v-for="(opt, i) in coverOptions.filter(o => o.type === 'gradient')"
                  :key="i"
                  @click="setCover(opt.value)"
                  class="h-10 rounded-md border-2 transition-all hover:scale-105"
                  :class="page?.cover === opt.value ? 'border-blue-500' : (darkMode ? 'border-transparent' : 'border-transparent')"
                  :style="{ background: opt.thumb }"
                />
              </div>
              <p class="text-[10px] op font-medium uppercase tracking-wider mb-2 px-1">Photos</p>
              <div class="grid grid-cols-3 gap-1.5">
                <button
                  v-for="(opt, i) in coverOptions.filter(o => o.type === 'photo')"
                  :key="i"
                  @click="setCover(opt.value)"
                  class="h-16 rounded-md border-2 bg-cover bg-center transition-all hover:scale-[1.02]"
                  :class="page?.cover === opt.value ? 'border-blue-500' : 'border-transparent'"
                  :style="{ backgroundImage: opt.thumb }"
                />
              </div>
              <button v-if="page?.cover" @click="removeCover" class="mt-3 w-full py-1.5 text-xs rounded-lg text-center transition-colors" :class="darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-50 text-red-500 hover:bg-red-100'">Remove cover</button>
            </div>
          </div>
        </Transition>
      </main>
    </div>

    <!-- ── Slash menu ────────────────────────────────────────────────────────── -->
    <Transition name="pop">
      <div v-if="slashMenu.open" class="slash-menu fixed z-[60] rounded-xl overflow-hidden shadow-2xl w-72" :style="{ left: slashMenu.x + 'px', top: slashMenu.y + 8 + 'px' }" :class="darkMode ? 'bg-[#252525] border border-[#3a3a3a]' : 'bg-white border border-[#e5e5e5] shadow-xl'" @click.stop>
        <div class="px-3 pt-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider op">Block type</div>
        <div class="max-h-72 overflow-y-auto custom-scroll py-1">
          <button v-for="c in filteredSlash" :key="c.type" class="slash-item w-full flex items-center gap-3 px-3 py-2 text-left" @mousedown.prevent="pickSlash(c.type)">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center p-1.5 shrink-0" :class="darkMode ? 'bg-[#333] text-zinc-400' : 'bg-gray-100 text-gray-600'" v-html="blockTypeIcon(c.type)" />
            <div>
              <div class="text-[13px] font-medium" :class="darkMode ? 'text-zinc-200' : 'text-gray-800'">{{ c.label }}</div>
              <div class="text-[11px]" :class="darkMode ? 'text-zinc-600' : 'text-gray-400'">{{ c.desc }}</div>
            </div>
            <span v-if="c.kbd" class="ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono op" :class="darkMode ? 'bg-[#3a3a3a]' : 'bg-gray-100'">{{ c.kbd }}</span>
          </button>
          <div v-if="!filteredSlash.length" class="px-3 py-5 text-xs text-center op">No results</div>
        </div>
      </div>
    </Transition>

    <!-- ── Floating toolbar ──────────────────────────────────────────────────── -->
    <Transition name="pop">
      <div v-if="floatingBar.open" class="floating-bar fixed z-[60] flex items-center gap-0.5 px-1.5 py-1 rounded-lg shadow-2xl" :style="{ left: floatingBar.x + 'px', top: floatingBar.y + 'px', transform: 'translate(-50%, calc(-100% - 10px))' }" :class="darkMode ? 'bg-[#2a2a2a] border border-[#3a3a3a]' : 'bg-white border border-[#e5e5e5] shadow-lg'">
        <button @mousedown.prevent="fmt('bold')" class="tb font-bold">B</button>
        <button @mousedown.prevent="fmt('italic')" class="tb italic">I</button>
        <button @mousedown.prevent="fmt('underline')" class="tb underline">U</button>
        <button @mousedown.prevent="fmt('strikeThrough')" class="tb line-through">S</button>
        <div class="w-px h-4 mx-0.5" :class="darkMode ? 'bg-[#3a3a3a]' : 'bg-gray-200'" />
        <button @mousedown.prevent="fmt('foreColor','#f97316')" class="tb" style="color:#f97316">A</button>
        <button @mousedown.prevent="fmt('foreColor','#3b82f6')" class="tb" style="color:#3b82f6">A</button>
        <button @mousedown.prevent="fmt('foreColor','#22c55e')" class="tb" style="color:#22c55e">A</button>
        <button @mousedown.prevent="fmt('foreColor','#ef4444')" class="tb" style="color:#ef4444">A</button>
        <div class="w-px h-4 mx-0.5" :class="darkMode ? 'bg-[#3a3a3a]' : 'bg-gray-200'" />
        <button @mousedown.prevent="fmt('removeFormat')" class="tb text-[10px] op">✕</button>
      </div>
    </Transition>

    <!-- ── Command palette ───────────────────────────────────────────────────── -->
    <Transition name="cmd">
      <div v-if="cmdOpen" class="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh]" :class="darkMode ? 'bg-black/60' : 'bg-black/25'" @click.self="cmdOpen = false">
        <div class="w-full max-w-[480px] rounded-2xl overflow-hidden shadow-2xl mx-4" :class="darkMode ? 'bg-[#252525] border border-[#3a3a3a]' : 'bg-white border border-[#e5e5e5]'">
          <div class="flex items-center gap-3 px-4 py-3 border-b" :class="darkMode ? 'border-[#333]' : 'border-[#ededed]'">
            <svg class="w-4 h-4 shrink-0 op" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input v-model="cmdQuery" class="flex-1 bg-transparent text-sm outline-none" :class="darkMode ? 'text-white placeholder-zinc-600' : 'text-gray-900 placeholder-gray-400'" placeholder="Search or jump to…" autofocus @keydown.escape="cmdOpen = false" @keydown.enter="filteredCmds[0]?.run(); cmdOpen = false" />
            <kbd class="text-[10px] px-1.5 py-0.5 rounded font-mono op shrink-0" :class="darkMode ? 'bg-[#333] text-zinc-400' : 'bg-gray-100 text-gray-500'">Esc</kbd>
          </div>
          <div class="max-h-80 overflow-y-auto custom-scroll py-1.5">
            <button v-for="c in filteredCmds" :key="c.label" @click="c.run(); cmdOpen = false" class="cmd-item w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm" :class="darkMode ? 'text-zinc-200 hover:bg-[#333]' : 'text-gray-800 hover:bg-gray-100'">
              <span class="text-base shrink-0">{{ c.icon }}</span>
              {{ c.label }}
            </button>
            <div v-if="!filteredCmds.length" class="px-4 py-8 text-xs text-center op">No results for "{{ cmdQuery }}"</div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── Context menu ──────────────────────────────────────────────────────── -->
    <Transition name="pop">
      <div v-if="ctxMenu.open" class="ctx-menu fixed z-[60] rounded-xl overflow-hidden shadow-2xl w-52 py-1" :style="{ left: ctxMenu.x + 'px', top: ctxMenu.y + 'px' }" :class="darkMode ? 'bg-[#252525] border border-[#3a3a3a]' : 'bg-white border border-[#e5e5e5]'" @click.stop>
        <button @click="duplicate(ctxMenu.blockId); ctxMenu.open = false" class="ctx w-full">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          Duplicate
        </button>
        <div class="h-px my-1" :class="darkMode ? 'bg-[#333]' : 'bg-[#ededed]'" />
        <button @click="setType(ctxMenu.blockId,'h1'); ctxMenu.open=false" class="ctx w-full">Turn into Heading 1</button>
        <button @click="setType(ctxMenu.blockId,'h2'); ctxMenu.open=false" class="ctx w-full">Turn into Heading 2</button>
        <button @click="setType(ctxMenu.blockId,'callout'); ctxMenu.open=false" class="ctx w-full">Turn into Callout</button>
        <button @click="setType(ctxMenu.blockId,'quote'); ctxMenu.open=false" class="ctx w-full">Turn into Quote</button>
        <button @click="setType(ctxMenu.blockId,'code'); ctxMenu.open=false" class="ctx w-full">Turn into Code</button>
        <div class="h-px my-1" :class="darkMode ? 'bg-[#333]' : 'bg-[#ededed]'" />
        <button @click="deleteBlock(ctxMenu.blockId); ctxMenu.open=false" class="ctx w-full !text-red-400">Delete block</button>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* ── Theme variables ── */
.dark { --bg: #191919; --sidebar-bg: #1f1f1f; --border: #2e2e2e; --text: #e5e5e5; --muted: #606060; --hover: #2a2a2a; --surface: #252525; }
.light { --bg: #ffffff; --sidebar-bg: #f7f7f5; --border: #ededed; --text: #1a1a1a; --muted: #8a8a8a; --hover: #f0f0ef; --surface: #ffffff; }

/* ── Layout ── */
.notes-root { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); }
.topbar { background: var(--bg); border-bottom: 1px solid var(--border); }
.sidebar { background: var(--sidebar-bg); border-right: 1px solid var(--border); }
.op { opacity: 0.45; }

/* ── Scrollbar ── */
.custom-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
.custom-scroll::-webkit-scrollbar-thumb:hover { background: var(--muted); opacity: 0.4; }

/* ── Sidebar button ── */
.sb { display: flex; align-items: center; gap: 8px; padding: 5px 8px; border-radius: 6px; font-size: 13px; color: var(--muted); cursor: pointer; transition: all 0.12s; white-space: nowrap; }
.sb:hover, .sb.active { background: var(--hover); color: var(--text); }
.sb.active { color: var(--text); }

/* ── Icon button ── */
.ib { padding: 5px; border-radius: 6px; color: var(--muted); cursor: pointer; display: flex; transition: all 0.12s; }
.ib:hover { background: var(--hover); color: var(--text); }

/* ── Topbar buttons ── */
.cmd-trigger { background: transparent; border: 1px solid var(--border); color: var(--muted); transition: all 0.12s; cursor: pointer; }
.cmd-trigger:hover { background: var(--hover); color: var(--text); }
.share-btn { background: var(--hover); color: var(--text); cursor: pointer; transition: all 0.12s; }
.share-btn:hover { background: var(--border); }

/* ── Block wrapper ── */
.bw { transition: opacity 0.12s; }
.bw:hover > .drag-handle { opacity: 1 !important; }
.bw.drop-here { box-shadow: 0 -2px 0 0 rgba(59,130,246,0.6); border-radius: 2px; }
.bw.dragging { opacity: 0.35; }

/* ── Block content placeholder ── */
.bc:empty::before { content: attr(data-ph); color: var(--muted); opacity: 0.4; pointer-events: none; }
.bc { caret-color: var(--text); }

/* ── Page title placeholder ── */
.page-title:empty::before { content: attr(data-ph); opacity: 0.2; pointer-events: none; }

/* ── Toolbar buttons ── */
.tb { padding: 3px 7px; border-radius: 4px; font-size: 12px; cursor: pointer; color: var(--text); transition: background 0.1s; }
.tb:hover { background: var(--hover); }

/* ── Context menu button ── */
.ctx { display: flex; align-items: center; gap: 8px; padding: 6px 12px; font-size: 12px; color: var(--text); cursor: pointer; transition: background 0.1s; width: 100%; }
.ctx:hover { background: var(--hover); }

/* ── Slash item ── */
.slash-item { transition: background 0.1s; cursor: pointer; }
.slash-item:hover { background: var(--hover); }

/* ── Command item ── */
.cmd-item { transition: background 0.1s; cursor: pointer; }

/* ── Transitions ── */
.sidebar-enter-active, .sidebar-leave-active { transition: width 0.22s cubic-bezier(.4,0,.2,1), opacity 0.18s ease; overflow: hidden; }
.sidebar-enter-from, .sidebar-leave-to { width: 0 !important; opacity: 0; }

.pop-enter-active { transition: all 0.15s cubic-bezier(.34,1.56,.64,1); }
.pop-leave-active { transition: all 0.1s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: scale(0.94) translateY(-4px); }

.cmd-enter-active { transition: opacity 0.18s ease; }
.cmd-leave-active { transition: opacity 0.12s ease; }
.cmd-enter-from, .cmd-leave-to { opacity: 0; }

.expand-enter-active { transition: all 0.2s ease; max-height: 300px; overflow: hidden; }
.expand-leave-active { transition: all 0.15s ease; max-height: 300px; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }

/* ── Cover ── */
.cover-area { transition: height 0.25s ease; overflow: hidden; }
.cover-btn { display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 500; cursor: pointer; transition: all 0.12s; background: var(--hover); color: var(--muted); border: 1px solid var(--border); }
.cover-btn:hover { color: var(--text); background: var(--surface); }
.cover-ctrl { background: rgba(0,0,0,0.55); color: rgba(255,255,255,0.9); border-color: transparent; backdrop-filter: blur(4px); }
.cover-ctrl:hover { background: rgba(0,0,0,0.75); color: white; }

/* ── Selection ── */
.dark ::selection { background: rgba(99,102,241,0.3); }
.light ::selection { background: rgba(99,102,241,0.2); }

/* ── Code ── */
pre { margin: 0; }
code { white-space: pre-wrap; word-break: break-word; }
</style>
