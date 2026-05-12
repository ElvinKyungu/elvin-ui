<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

const activeServer = ref('elvin')
const activeChannel = ref('general')
const messageInput = ref('')
const showEmoji = ref(false)
const typingUsers = ref<string[]>([])

const servers = [
  { id: 'elvin', name: 'Elvin UI', emoji: '⚡', color: 'from-violet-600 to-purple-700', unread: 3 },
  { id: 'vue',   name: 'Vue.js',   emoji: '💚', color: 'from-green-600 to-emerald-700',  unread: 0 },
  { id: 'nuxt',  name: 'Nuxt',     emoji: '🌿', color: 'from-teal-600 to-cyan-700',      unread: 12 },
  { id: 'gsap',  name: 'GSAP',     emoji: '🎯', color: 'from-amber-600 to-orange-700',   unread: 0 },
]

const channels = [
  { id: 'general',     name: 'general',     type: 'text', unread: 2 },
  { id: 'showcase',    name: 'showcase',    type: 'text', unread: 1 },
  { id: 'help',        name: 'help',        type: 'text', unread: 0 },
  { id: 'components',  name: 'components',  type: 'text', unread: 0 },
  { id: 'voice-main',  name: 'Main Stage',  type: 'voice', unread: 0, users: 3 },
  { id: 'voice-work',  name: 'Work Session',type: 'voice', unread: 0, users: 1 },
]

interface Message {
  id: number; author: string; avatar: string; color: string; time: string
  content: string; reactions: { emoji: string; count: number; reacted: boolean }[]
  pinned?: boolean
}

const messages = reactive<Message[]>([
  {
    id: 1, author: 'Gabriel Delattre', avatar: 'GD', color: 'from-violet-500 to-purple-600', time: '10:24 AM',
    content: 'Hey everyone! Just pushed the new UiButton variants. Check out the ghost and danger states 🎉',
    reactions: [{ emoji: '🔥', count: 8, reacted: true }, { emoji: '👏', count: 5, reacted: false }], pinned: true,
  },
  {
    id: 2, author: 'Sara López', avatar: 'SL', color: 'from-pink-500 to-rose-600', time: '10:31 AM',
    content: 'The ghost variant is chef\'s kiss. Loving the subtle border animation on hover',
    reactions: [{ emoji: '❤️', count: 4, reacted: false }, { emoji: '✅', count: 2, reacted: true }],
  },
  {
    id: 3, author: 'Elvin Kyungu', avatar: 'EK', color: 'from-sky-500 to-blue-600', time: '10:35 AM',
    content: 'Thanks! Next up is the UiModal component. Anyone want to help spec it out?',
    reactions: [{ emoji: '🙋', count: 6, reacted: false }],
  },
  {
    id: 4, author: 'Vander Otis', avatar: 'VO', color: 'from-amber-500 to-orange-600', time: '10:42 AM',
    content: 'I can help! I was thinking we\'d need: open/close animation, backdrop blur, focus trap, and keyboard escape. Also maybe a drawer variant?',
    reactions: [{ emoji: '🎯', count: 3, reacted: false }, { emoji: '💯', count: 7, reacted: true }],
  },
  {
    id: 5, author: 'Kevin Maginot', avatar: 'KM', color: 'from-emerald-500 to-green-600', time: '10:48 AM',
    content: 'Drawer variant is a must! Side panels are everywhere in modern apps. Would love to see smooth slide-in/out with GSAP',
    reactions: [{ emoji: '💬', count: 2, reacted: false }],
  },
])

const members = [
  { name: 'Elvin Kyungu',   avatar: 'EK', color: 'from-sky-500 to-blue-600',    status: 'online',  role: 'admin' },
  { name: 'Gabriel D.',     avatar: 'GD', color: 'from-violet-500 to-purple-600',status: 'online',  role: 'mod'   },
  { name: 'Sara L.',        avatar: 'SL', color: 'from-pink-500 to-rose-600',    status: 'online',  role: null    },
  { name: 'Vander O.',      avatar: 'VO', color: 'from-amber-500 to-orange-600', status: 'online',  role: null    },
  { name: 'Kevin M.',       avatar: 'KM', color: 'from-emerald-500 to-green-600',status: 'away',    role: null    },
  { name: 'Raphaël K.',     avatar: 'RK', color: 'from-cyan-500 to-blue-600',    status: 'away',    role: null    },
  { name: 'Yuki T.',        avatar: 'YT', color: 'from-indigo-500 to-blue-600',  status: 'offline', role: null    },
]

const emojis = ['👍','❤️','🔥','🎉','✅','🚀','💯','👏','😂','🙏','⭐','💡']

function addReaction(msg: Message, emoji: string) {
  const existing = msg.reactions.find(r => r.emoji === emoji)
  if (existing) {
    existing.reacted = !existing.reacted
    existing.count += existing.reacted ? 1 : -1
    if (existing.count <= 0) msg.reactions.splice(msg.reactions.indexOf(existing), 1)
  } else {
    msg.reactions.push({ emoji, count: 1, reacted: true })
  }
  showEmoji.value = false
}

function sendMessage() {
  if (!messageInput.value.trim()) return
  const newMsg: Message = {
    id: Date.now(), author: 'Elvin Kyungu', avatar: 'EK',
    color: 'from-sky-500 to-blue-600', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    content: messageInput.value, reactions: [],
  }
  messages.push(newMsg)
  messageInput.value = ''
  nextTick(() => {
    const list = document.querySelector('.msg-list')
    if (list) list.scrollTop = list.scrollHeight
    gsap.from('.msg-item:last-child', { y: 12, opacity: 0, duration: 0.3, ease: 'power3.out' })
  })
}

function switchChannel(id: string) {
  activeChannel.value = id
  gsap.from('.msg-item', { y: 10, opacity: 0, stagger: 0.04, duration: 0.35, ease: 'power3.out' })
}

function simulateTyping() {
  typingUsers.value = ['Sara L.']
  setTimeout(() => { typingUsers.value = [] }, 3000)
}

onMounted(() => {
  gsap.from('.server-btn', { scale: 0, stagger: 0.06, duration: 0.4, ease: 'back.out(2)', delay: 0.1 })
  gsap.from('.channel-item', { x: -16, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'power3.out', delay: 0.2 })
  gsap.from('.msg-item', { y: 12, opacity: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out', delay: 0.3 })
  gsap.from('.member-item', { x: 16, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'power3.out', delay: 0.4 })
})
</script>

<template>
  <div class="h-screen bg-zinc-950 text-white font-sans flex overflow-hidden">

    <!-- Server list -->
    <div class="w-16 bg-zinc-950 border-r border-zinc-800/60 flex flex-col items-center py-3 gap-2 shrink-0">
      <div v-for="srv in servers" :key="srv.id">
        <button @click="activeServer = srv.id" class="server-btn relative">
          <div :class="[`w-11 h-11 rounded-2xl bg-gradient-to-br ${srv.color} flex items-center justify-center text-lg transition-all hover:scale-110`,
            activeServer === srv.id ? 'rounded-xl' : 'rounded-3xl hover:rounded-xl']">
            {{ srv.emoji }}
          </div>
          <div v-if="srv.unread" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">{{ srv.unread }}</div>
          <div v-if="activeServer === srv.id" class="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-7 bg-white rounded-full" />
        </button>
      </div>
      <div class="w-8 h-px bg-zinc-800 my-1" />
      <button class="w-11 h-11 rounded-3xl hover:rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xl hover:bg-emerald-600 hover:border-emerald-500 transition-all">+</button>
    </div>

    <!-- Channel sidebar -->
    <div class="w-52 bg-zinc-900/80 border-r border-zinc-800/60 flex flex-col shrink-0">
      <!-- Server header -->
      <div class="h-12 border-b border-zinc-800 flex items-center justify-between px-4">
        <span class="font-bold text-sm truncate">Elvin UI</span>
        <svg class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </div>
      <!-- Channels -->
      <div class="flex-1 overflow-y-auto p-2 space-y-0.5">
        <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 py-2">Text Channels</p>
        <button v-for="ch in channels.filter(c => c.type === 'text')" :key="ch.id"
          @click="switchChannel(ch.id)"
          :class="['channel-item w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors group', activeChannel === ch.id ? 'bg-zinc-700/80 text-white' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60']">
          <span class="flex items-center gap-1.5">
            <span class="text-zinc-500 group-hover:text-zinc-300">#</span>
            {{ ch.name }}
          </span>
          <span v-if="ch.unread" class="w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">{{ ch.unread }}</span>
        </button>
        <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 py-2 mt-3">Voice Channels</p>
        <div v-for="ch in channels.filter(c => c.type === 'voice')" :key="ch.id"
          class="channel-item flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 cursor-pointer transition-colors">
          <span class="flex items-center gap-1.5">
            <span class="text-zinc-500">🔊</span>{{ ch.name }}
          </span>
          <span class="text-xs text-zinc-600">{{ ch.users }}</span>
        </div>
      </div>
      <!-- User status -->
      <div class="h-14 border-t border-zinc-800 flex items-center gap-2.5 px-3">
        <div class="relative">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-xs font-bold">EK</div>
          <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold truncate">Elvin Kyungu</p>
          <p class="text-[10px] text-zinc-500">Online</p>
        </div>
        <button class="p-1 rounded hover:bg-zinc-700 transition-colors">
          <svg class="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Channel header -->
      <div class="h-12 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-900/40">
        <div class="flex items-center gap-2">
          <span class="text-zinc-400 font-bold">#</span>
          <span class="font-semibold text-sm">{{ activeChannel }}</span>
          <span class="hidden sm:inline text-xs text-zinc-500 border-l border-zinc-700 pl-2 ml-1">The main channel — say hi!</span>
        </div>
        <div class="flex items-center gap-1">
          <button @click="simulateTyping" class="px-3 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 transition-colors">Simulate typing</button>
        </div>
      </div>

      <!-- Message list -->
      <div class="msg-list flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="msg in messages" :key="msg.id" class="msg-item flex gap-3 group">
          <div :class="`w-9 h-9 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`">{{ msg.avatar }}</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-semibold">{{ msg.author }}</span>
              <span class="text-xs text-zinc-600">{{ msg.time }}</span>
              <span v-if="msg.pinned" class="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-medium">📌 pinned</span>
            </div>
            <p class="text-sm text-zinc-300 leading-relaxed mb-2">{{ msg.content }}</p>
            <!-- Reactions -->
            <div class="flex flex-wrap gap-1.5">
              <button v-for="r in msg.reactions" :key="r.emoji" @click="addReaction(msg, r.emoji)"
                :class="['flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs transition-all hover:scale-110', r.reacted ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300' : 'bg-zinc-800 border border-zinc-700 text-zinc-400 hover:border-zinc-500']">
                {{ r.emoji }} {{ r.count }}
              </button>
              <button @click="showEmoji = !showEmoji" class="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs bg-zinc-800/50 border border-transparent hover:border-zinc-700 text-zinc-500 hover:text-zinc-300 transition-all opacity-0 group-hover:opacity-100">
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <Transition name="fade">
        <div v-if="typingUsers.length" class="px-4 pb-1">
          <span class="text-xs text-zinc-500">
            <span class="inline-flex gap-0.5 mr-1">
              <span v-for="n in 3" :key="n" class="w-1 h-1 rounded-full bg-zinc-500 animate-bounce" :style="`animation-delay:${n * 0.15}s`" />
            </span>
            {{ typingUsers.join(', ') }} {{ typingUsers.length > 1 ? 'are' : 'is' }} typing...
          </span>
        </div>
      </Transition>

      <!-- Emoji picker -->
      <Transition name="slide-up">
        <div v-if="showEmoji" class="mx-4 mb-2 p-3 bg-zinc-800 border border-zinc-700 rounded-xl flex flex-wrap gap-2">
          <button v-for="e in emojis" :key="e" @click="messages.length && addReaction(messages[messages.length-1], e)"
            class="text-xl hover:scale-125 transition-transform">{{ e }}</button>
        </div>
      </Transition>

      <!-- Input -->
      <div class="p-4 pt-0">
        <div class="flex items-center gap-2 bg-zinc-800 rounded-xl px-4 py-2.5 border border-zinc-700 focus-within:border-zinc-500 transition-colors">
          <input v-model="messageInput" @keydown.enter="sendMessage" placeholder="Message #general"
            class="flex-1 bg-transparent text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none" />
          <div class="flex items-center gap-1.5 text-zinc-500">
            <button @click="showEmoji = !showEmoji" class="hover:text-white transition-colors text-lg">😊</button>
            <button class="hover:text-white transition-colors text-lg">📎</button>
            <button @click="sendMessage" class="w-8 h-8 bg-violet-600 hover:bg-violet-500 rounded-lg flex items-center justify-center transition-colors ml-1">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Member list -->
    <div class="hidden xl:flex w-48 bg-zinc-900/60 border-l border-zinc-800/60 flex-col p-3">
      <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 py-2">Online — {{ members.filter(m => m.status === 'online').length }}</p>
      <div class="space-y-0.5">
        <div v-for="m in members.filter(x => x.status === 'online')" :key="m.name"
          class="member-item flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/60 cursor-pointer transition-colors">
          <div class="relative">
            <div :class="`w-7 h-7 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-[10px] font-bold`">{{ m.avatar }}</div>
            <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-zinc-900" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium truncate">{{ m.name }}</p>
            <p v-if="m.role" class="text-[10px] text-violet-400">{{ m.role }}</p>
          </div>
        </div>
      </div>
      <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 py-2 mt-2">Away / Offline</p>
      <div class="space-y-0.5">
        <div v-for="m in members.filter(x => x.status !== 'online')" :key="m.name"
          class="member-item flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-800/60 cursor-pointer transition-colors opacity-50">
          <div class="relative">
            <div :class="`w-7 h-7 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-[10px] font-bold grayscale`">{{ m.avatar }}</div>
            <div :class="['absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-zinc-900', m.status === 'away' ? 'bg-amber-500' : 'bg-zinc-600']" />
          </div>
          <p class="text-xs font-medium truncate">{{ m.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.2s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(8px); }
</style>
