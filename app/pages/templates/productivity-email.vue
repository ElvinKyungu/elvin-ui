<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

interface Email {
  id: number; from: string; avatar: string; color: string; subject: string
  preview: string; time: string; unread: boolean; starred: boolean; archived: boolean
  folder: string; body: string; tags: string[]
}

const emails = reactive<Email[]>([
  { id: 1, from: 'Gabriel Delattre', avatar: 'GD', color: 'from-violet-500 to-purple-600',
    subject: 'New UiModal component is ready for review',
    preview: 'Hey team! I just pushed the UiModal component. It has GSAP enter/leave animations, focus trap, and keyboard escape...',
    time: '10:32 AM', unread: true, starred: true, archived: false, folder: 'inbox', tags: ['dev'],
    body: 'Hey team!\n\nI just pushed the UiModal component. Here\'s what\'s included:\n\n• GSAP enter/leave animations (scale + opacity)\n• Focus trap for accessibility\n• Keyboard escape to close\n• Backdrop blur effect\n• Three size variants: sm, md, lg\n\nLet me know if you have feedback!\n\n— Gabriel' },
  { id: 2, from: 'Sara López', avatar: 'SL', color: 'from-pink-500 to-rose-600',
    subject: 'Accessibility audit results',
    preview: 'I finished the a11y audit on Button and Input components. Most things look good but there are a few contrast issues...',
    time: '9:15 AM', unread: true, starred: false, archived: false, folder: 'inbox', tags: ['a11y'],
    body: 'Hi everyone,\n\nI finished the accessibility audit on the Button and Input components. Here\'s a summary:\n\nButton:\n✅ ARIA roles correct\n✅ Keyboard focus visible\n⚠️ Ghost variant contrast ratio is 3.8:1 (needs 4.5:1)\n\nInput:\n✅ Labels associated properly\n✅ Error states announced to screen readers\n\nOverall in great shape! I\'ll open issues for the contrast fix.\n\nSara' },
  { id: 3, from: 'Elvin Kyungu', avatar: 'EK', color: 'from-sky-500 to-blue-600',
    subject: 'v1.0 launch plan — action items',
    preview: 'Hi team, here\'s the launch plan for v1.0. We\'re targeting May 20th. Please review the action items assigned to you...',
    time: 'Yesterday', unread: false, starred: true, archived: false, folder: 'inbox', tags: ['planning'],
    body: 'Hi everyone,\n\nWe\'re targeting May 20th for v1.0 launch. Here are the action items:\n\n**Elvin**: Finalize docs site, write launch post\n**Gabriel**: UiModal + UiDrawer\n**Sara**: A11y fixes, final audit\n**Vander**: Performance testing, bundle size\n**Kevin**: Storybook setup\n\nLet\'s sync Thursday at 2pm.\n\nElvin' },
  { id: 4, from: 'Vander Otis', avatar: 'VO', color: 'from-amber-500 to-orange-600',
    subject: 'Bundle size analysis — great news',
    preview: 'Ran the bundle analysis. Tree shaking works perfectly. The whole library is only 12kb gzipped when you import everything...',
    time: 'Yesterday', unread: false, starred: false, archived: false, folder: 'inbox', tags: ['perf'],
    body: 'Great news everyone!\n\nRan a full bundle analysis with Rollup visualizer:\n\n• Full library (all components): 12.4kb gzipped\n• Tree shaking works perfectly\n• Only importing UiButton: 1.8kb gzipped\n• GSAP is not bundled (peer dep)\n\nWe\'re in excellent shape. No optimizations needed before launch.\n\nVander' },
  { id: 5, from: 'Kevin Maginot', avatar: 'KM', color: 'from-emerald-500 to-green-600',
    subject: 'Storybook is live! 🎉',
    preview: 'Deployed Storybook to storybook.elvinui.com. All 50 components have stories with controls. Check it out!',
    time: 'May 10', unread: false, starred: false, archived: false, folder: 'inbox', tags: ['docs'],
    body: 'Storybook is live! 🎉\n\nI deployed it to storybook.elvinui.com. Here\'s what\'s included:\n\n• All 50 components with stories\n• Knobs/controls for every prop\n• Dark/light mode toggle\n• Accessibility panel enabled\n• Viewport testing\n\nFeel free to share the link with potential contributors!\n\nKevin' },
])

const folders = [
  { id: 'inbox',   label: 'Inbox',   icon: '📥', count: 2 },
  { id: 'starred', label: 'Starred', icon: '⭐', count: 2 },
  { id: 'sent',    label: 'Sent',    icon: '📤', count: 0 },
  { id: 'drafts',  label: 'Drafts',  icon: '📝', count: 1 },
  { id: 'trash',   label: 'Trash',   icon: '🗑',  count: 0 },
]

const activeFolder = ref('inbox')
const selectedEmail = ref<Email | null>(emails[0])
const showCompose = ref(false)
const composeTo = ref('')
const composeSubject = ref('')
const composeBody = ref('')
const searchQuery = ref('')

const filteredEmails = computed(() => {
  let list = emails.filter(e => !e.archived)
  if (activeFolder.value === 'starred') list = list.filter(e => e.starred)
  if (searchQuery.value) list = list.filter(e =>
    e.subject.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    e.from.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  return list
})

function selectEmail(email: Email) {
  email.unread = false
  selectedEmail.value = email
  gsap.from('.email-detail', { x: 20, opacity: 0, duration: 0.35, ease: 'power3.out' })
}

function toggleStar(email: Email, e: Event) {
  e.stopPropagation()
  email.starred = !email.starred
  const btn = (e.currentTarget as HTMLElement)
  if (email.starred) gsap.from(btn, { scale: 0.5, rotate: 20, duration: 0.4, ease: 'back.out(2)' })
}

function archiveEmail(email: Email, e: Event) {
  e.stopPropagation()
  email.archived = true
  if (selectedEmail.value?.id === email.id) selectedEmail.value = filteredEmails.value[0] || null
}

function openCompose() {
  showCompose.value = true
  composeTo.value = ''
  composeSubject.value = ''
  composeBody.value = ''
  nextTick(() => gsap.from('.compose-modal', { y: 60, opacity: 0, duration: 0.4, ease: 'back.out(1.5)' }))
}

function closeCompose() {
  gsap.to('.compose-modal', { y: 60, opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => { showCompose.value = false } })
}

function sendEmail() {
  gsap.to('.compose-send-btn', { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => closeCompose() })
}

onMounted(() => {
  gsap.from('.email-row', { x: -20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.2 })
  gsap.from('.email-detail', { x: 20, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.3 })
})
</script>

<template>
  <div class="h-screen bg-zinc-950 text-white font-sans flex flex-col overflow-hidden">
    <!-- Nav -->
    <nav class="h-14 border-b border-zinc-800/80 flex items-center justify-between px-6 bg-zinc-950/90 z-40 backdrop-blur-sm shrink-0">
      <div class="flex items-center gap-2.5">
        <UiLogo :size="24" color="white" />
        <span class="font-bold text-sm tracking-wide">NovaMail</span>
      </div>
      <div class="relative flex-1 max-w-sm mx-6">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input v-model="searchQuery" placeholder="Search mail..." class="w-full bg-zinc-900 border border-zinc-800 rounded-full px-10 py-1.5 text-sm text-zinc-400 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors" />
      </div>
      <div class="flex items-center gap-2">
        <button @click="openCompose" class="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5">
          ✏ Compose
        </button>
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-xs font-bold">EK</div>
      </div>
    </nav>

    <div class="flex flex-1 overflow-hidden">

      <!-- Left: folder list -->
      <div class="w-48 border-r border-zinc-800/60 bg-zinc-900/30 flex flex-col p-3 shrink-0">
        <div class="space-y-0.5">
          <button v-for="folder in folders" :key="folder.id" @click="activeFolder = folder.id; selectedEmail = filteredEmails[0] || null"
            :class="['w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors', activeFolder === folder.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900']">
            <span class="flex items-center gap-2.5">
              <span>{{ folder.icon }}</span>
              {{ folder.label }}
            </span>
            <span v-if="folder.count" class="bg-sky-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{{ folder.count }}</span>
          </button>
        </div>
        <div class="mt-4 pt-4 border-t border-zinc-800">
          <p class="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Labels</p>
          <div class="space-y-0.5">
            <button v-for="(label, i) in [
              { name: 'dev',      color: 'bg-violet-500' },
              { name: 'a11y',     color: 'bg-pink-500' },
              { name: 'planning', color: 'bg-sky-500' },
              { name: 'perf',     color: 'bg-amber-500' },
              { name: 'docs',     color: 'bg-emerald-500' },
            ]" :key="i"
              class="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
              <span :class="`w-2 h-2 rounded-full ${label.color}`" />
              {{ label.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Middle: email list -->
      <div class="w-72 border-r border-zinc-800/60 flex flex-col shrink-0 overflow-hidden">
        <div class="h-11 flex items-center justify-between px-4 border-b border-zinc-800 shrink-0">
          <span class="text-sm font-semibold capitalize">{{ activeFolder }}</span>
          <span class="text-xs text-zinc-500">{{ filteredEmails.length }} messages</span>
        </div>
        <div class="flex-1 overflow-y-auto">
          <button v-for="email in filteredEmails" :key="email.id" @click="selectEmail(email)"
            :class="['email-row w-full text-left px-4 py-3.5 border-b border-zinc-800/60 hover:bg-zinc-900/60 transition-colors relative', selectedEmail?.id === email.id ? 'bg-zinc-900' : '']">
            <div v-if="email.unread" class="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-500" />
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2">
                <div :class="`w-7 h-7 rounded-full bg-gradient-to-br ${email.color} flex items-center justify-center text-[10px] font-bold shrink-0`">{{ email.avatar }}</div>
                <span :class="['text-sm truncate max-w-[130px]', email.unread ? 'font-bold text-white' : 'font-medium text-zinc-300']">{{ email.from }}</span>
              </div>
              <span class="text-[10px] text-zinc-500 shrink-0">{{ email.time }}</span>
            </div>
            <p :class="['text-xs truncate mb-1', email.unread ? 'text-white font-semibold' : 'text-zinc-400']">{{ email.subject }}</p>
            <p class="text-[11px] text-zinc-600 truncate">{{ email.preview }}</p>
          </button>
          <div v-if="filteredEmails.length === 0" class="py-12 text-center text-zinc-600 text-sm">No messages</div>
        </div>
      </div>

      <!-- Right: email detail -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div v-if="selectedEmail" class="email-detail flex-1 overflow-y-auto">
          <!-- Header -->
          <div class="p-6 pb-4 border-b border-zinc-800">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h2 class="text-xl font-bold mb-3">{{ selectedEmail.subject }}</h2>
                <div class="flex items-center gap-3">
                  <div :class="`w-10 h-10 rounded-full bg-gradient-to-br ${selectedEmail.color} flex items-center justify-center text-sm font-bold shrink-0`">{{ selectedEmail.avatar }}</div>
                  <div>
                    <p class="text-sm font-semibold">{{ selectedEmail.from }}</p>
                    <p class="text-xs text-zinc-500">to me · {{ selectedEmail.time }}</p>
                  </div>
                </div>
              </div>
              <!-- Actions -->
              <div class="flex items-center gap-2 ml-4 shrink-0">
                <button @click="toggleStar(selectedEmail, $event)"
                  :class="['p-2 rounded-lg transition-colors', selectedEmail.starred ? 'text-amber-400 bg-amber-500/10' : 'text-zinc-500 hover:text-amber-400 hover:bg-zinc-800']">
                  ★
                </button>
                <button @click="archiveEmail(selectedEmail, $event)" class="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors text-sm">📥</button>
                <button class="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors text-sm">🗑</button>
              </div>
            </div>
            <!-- Tags -->
            <div class="flex gap-2 flex-wrap">
              <span v-for="tag in selectedEmail.tags" :key="tag"
                class="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full">
                {{ tag }}
              </span>
            </div>
          </div>
          <!-- Body -->
          <div class="p-6">
            <pre class="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-sans">{{ selectedEmail.body }}</pre>
          </div>
          <!-- Reply bar -->
          <div class="p-6 pt-0">
            <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors cursor-text">
              <p class="text-sm text-zinc-600">Click to reply to {{ selectedEmail.from.split(' ')[0] }}...</p>
            </div>
          </div>
        </div>
        <div v-else class="flex-1 flex items-center justify-center text-zinc-700">
          <div class="text-center">
            <p class="text-5xl mb-3">✉️</p>
            <p class="text-sm">Select a message to read</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Compose modal -->
    <Teleport to="body">
      <div v-if="showCompose" class="fixed bottom-6 right-6 z-50">
        <div class="compose-modal bg-zinc-900 border border-zinc-700 rounded-2xl w-[480px] shadow-2xl overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 bg-zinc-800/80 border-b border-zinc-700">
            <h3 class="text-sm font-semibold">New Message</h3>
            <div class="flex items-center gap-2">
              <button class="text-zinc-400 hover:text-white text-xs p-1">⤡</button>
              <button @click="closeCompose" class="text-zinc-400 hover:text-white text-sm p-1">✕</button>
            </div>
          </div>
          <div class="divide-y divide-zinc-800">
            <div class="flex items-center px-4 py-2.5">
              <span class="text-xs text-zinc-500 w-12 shrink-0">To</span>
              <input v-model="composeTo" placeholder="Recipients" class="flex-1 bg-transparent text-sm focus:outline-none placeholder-zinc-600" />
            </div>
            <div class="flex items-center px-4 py-2.5">
              <span class="text-xs text-zinc-500 w-12 shrink-0">Subject</span>
              <input v-model="composeSubject" placeholder="Subject" class="flex-1 bg-transparent text-sm focus:outline-none placeholder-zinc-600" />
            </div>
            <div class="px-4 py-3 h-48">
              <textarea v-model="composeBody" placeholder="Write your message..." class="w-full h-full bg-transparent text-sm focus:outline-none resize-none placeholder-zinc-600 text-zinc-300" />
            </div>
          </div>
          <div class="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
            <div class="flex gap-2 text-zinc-500">
              <button class="p-1.5 hover:bg-zinc-700 rounded transition-colors text-sm">📎</button>
              <button class="p-1.5 hover:bg-zinc-700 rounded transition-colors text-sm">🖼</button>
            </div>
            <div class="flex gap-2">
              <button @click="closeCompose" class="px-4 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors">Discard</button>
              <button @click="sendEmail" class="compose-send-btn px-5 py-1.5 bg-sky-600 hover:bg-sky-500 text-sm font-bold rounded-lg transition-all hover:scale-105">Send</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
