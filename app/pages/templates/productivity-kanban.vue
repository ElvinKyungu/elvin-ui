<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

interface Card {
  id: number; title: string; priority: 'high' | 'medium' | 'low'; assignee: string
  avatar: string; color: string; tags: string[]; dueDate: string; comments: number
}
interface Column { id: string; title: string; color: string; cards: Card[] }

const columns = reactive<Column[]>([
  {
    id: 'backlog', title: 'Backlog', color: 'from-zinc-700 to-zinc-800',
    cards: [
      { id: 1, title: 'Research competitor pricing pages', priority: 'low', assignee: 'Vander Otis', avatar: 'VO', color: 'from-amber-500 to-orange-600', tags: ['Research'], dueDate: 'May 20', comments: 2 },
      { id: 2, title: 'Set up Storybook for component docs', priority: 'medium', assignee: 'Kevin Maginot', avatar: 'KM', color: 'from-emerald-500 to-green-600', tags: ['Docs', 'DX'], dueDate: 'May 22', comments: 0 },
    ],
  },
  {
    id: 'progress', title: 'In Progress', color: 'from-blue-700 to-indigo-800',
    cards: [
      { id: 3, title: 'Build UiModal component with GSAP', priority: 'high', assignee: 'Elvin Kyungu', avatar: 'EK', color: 'from-sky-500 to-blue-600', tags: ['Component', 'GSAP'], dueDate: 'May 15', comments: 5 },
      { id: 4, title: 'Dark mode token system refactor', priority: 'high', assignee: 'Gabriel Delattre', avatar: 'GD', color: 'from-violet-500 to-purple-600', tags: ['Design', 'CSS'], dueDate: 'May 14', comments: 8 },
      { id: 5, title: 'Accessibility audit — Button + Input', priority: 'medium', assignee: 'Sara López', avatar: 'SL', color: 'from-pink-500 to-rose-600', tags: ['A11y'], dueDate: 'May 16', comments: 3 },
    ],
  },
  {
    id: 'review', title: 'Review', color: 'from-amber-700 to-orange-800',
    cards: [
      { id: 6, title: 'UiToast notification component', priority: 'medium', assignee: 'Raphaël Kim', avatar: 'RK', color: 'from-cyan-500 to-blue-600', tags: ['Component'], dueDate: 'May 13', comments: 4 },
      { id: 7, title: 'Blog post: Copy-paste vs install', priority: 'low', assignee: 'Sara López', avatar: 'SL', color: 'from-pink-500 to-rose-600', tags: ['Content'], dueDate: 'May 18', comments: 1 },
    ],
  },
  {
    id: 'done', title: 'Done', color: 'from-emerald-700 to-green-800',
    cards: [
      { id: 8, title: 'UiButton — all 4 variants shipped', priority: 'high', assignee: 'Elvin Kyungu', avatar: 'EK', color: 'from-sky-500 to-blue-600', tags: ['Component', 'Done'], dueDate: 'May 10', comments: 12 },
      { id: 9, title: 'Landing page redesign', priority: 'high', assignee: 'Gabriel Delattre', avatar: 'GD', color: 'from-violet-500 to-purple-600', tags: ['Design'], dueDate: 'May 11', comments: 7 },
    ],
  },
])

const showAddCard = ref(false)
const addingTo = ref('')
const newTitle = ref('')
const newPriority = ref<'high' | 'medium' | 'low'>('medium')
const selectedFilter = ref('All')

const team = ['All', 'Elvin Kyungu', 'Gabriel Delattre', 'Sara López', 'Vander Otis', 'Kevin Maginot', 'Raphaël Kim']

const priorityColors = {
  high: 'text-red-400 bg-red-500/10',
  medium: 'text-amber-400 bg-amber-500/10',
  low: 'text-green-400 bg-green-500/10',
}

const priorityDot = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-green-400',
}

function filteredCards(col: Column) {
  if (selectedFilter.value === 'All') return col.cards
  return col.cards.filter(c => c.assignee === selectedFilter.value)
}

function openAddCard(colId: string) {
  addingTo.value = colId
  newTitle.value = ''
  showAddCard.value = true
  nextTick(() => gsap.from('.add-modal', { y: 30, opacity: 0, duration: 0.3, ease: 'back.out(1.5)' }))
}

function addCard() {
  if (!newTitle.value.trim()) return
  const col = columns.find(c => c.id === addingTo.value)
  if (!col) return
  col.cards.push({
    id: Date.now(), title: newTitle.value, priority: newPriority.value,
    assignee: 'Elvin Kyungu', avatar: 'EK', color: 'from-sky-500 to-blue-600',
    tags: [], dueDate: 'TBD', comments: 0,
  })
  showAddCard.value = false
  nextTick(() => {
    const lastCard = document.querySelector(`[data-col="${addingTo.value}"] .kanban-card:last-child`)
    if (lastCard) gsap.from(lastCard, { y: -16, opacity: 0, duration: 0.4, ease: 'back.out(2)' })
  })
}

onMounted(() => {
  gsap.from('.kanban-col', { y: 24, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' })
  gsap.from('.kanban-card', { y: 12, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power3.out', delay: 0.3 })
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
    <!-- Nav -->
    <nav class="h-14 border-b border-zinc-800/80 flex items-center justify-between px-6 bg-zinc-950/90 sticky top-0 z-40 backdrop-blur-sm">
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-xs font-black">K</div>
        <span class="font-bold text-sm">Elvin UI</span>
        <span class="text-zinc-700">/</span>
        <span class="text-sm text-zinc-400">Q2 Sprint</span>
      </div>
      <div class="flex items-center gap-3">
        <!-- Filter by assignee -->
        <select v-model="selectedFilter" class="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-500 transition-colors">
          <option v-for="m in team" :key="m" :value="m">{{ m }}</option>
        </select>
        <!-- Team avatars -->
        <div class="hidden sm:flex -space-x-2">
          <div v-for="(m, i) in [
            { a: 'EK', c: 'from-sky-500 to-blue-600' },
            { a: 'GD', c: 'from-violet-500 to-purple-600' },
            { a: 'SL', c: 'from-pink-500 to-rose-600' },
          ]" :key="i"
            :class="`w-7 h-7 rounded-full bg-gradient-to-br ${m.c} border-2 border-zinc-950 flex items-center justify-center text-[10px] font-bold`">
            {{ m.a }}
          </div>
        </div>
        <button class="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-xs font-bold rounded-lg transition-colors" @click="openAddCard('backlog')">+ Add card</button>
      </div>
    </nav>

    <!-- Board stats -->
    <div class="flex items-center gap-6 px-6 py-3 border-b border-zinc-800/60 text-xs text-zinc-500 bg-zinc-900/30">
      <span>{{ columns.reduce((a, c) => a + c.cards.length, 0) }} total</span>
      <span class="text-red-400">{{ columns.flatMap(c => c.cards).filter(c => c.priority === 'high').length }} high priority</span>
      <span class="text-amber-400">{{ columns.flatMap(c => c.cards).filter(c => c.priority === 'medium').length }} medium</span>
      <span class="text-emerald-400">{{ columns.find(c => c.id === 'done')?.cards.length || 0 }} done</span>
    </div>

    <!-- Kanban columns -->
    <div class="flex-1 overflow-x-auto">
      <div class="flex gap-4 p-6 h-full min-w-max">
        <div v-for="col in columns" :key="col.id" :data-col="col.id"
          class="kanban-col w-72 flex flex-col bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
          <!-- Column header -->
          <div :class="`bg-gradient-to-r ${col.color} px-4 py-3 flex items-center justify-between`">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold">{{ col.title }}</span>
              <span class="bg-black/20 text-white/80 text-xs px-1.5 py-0.5 rounded-md font-medium">{{ filteredCards(col).length }}</span>
            </div>
            <button @click="openAddCard(col.id)" class="w-6 h-6 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors text-sm">+</button>
          </div>

          <!-- Cards -->
          <div class="flex-1 p-3 space-y-2.5 overflow-y-auto">
            <div v-for="card in filteredCards(col)" :key="card.id"
              class="kanban-card bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-3.5 cursor-pointer transition-all hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 group">
              <!-- Priority + tags -->
              <div class="flex flex-wrap items-center gap-1.5 mb-2.5">
                <span :class="['text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1', priorityColors[card.priority]]">
                  <span :class="['w-1.5 h-1.5 rounded-full', priorityDot[card.priority]]" />
                  {{ card.priority }}
                </span>
                <span v-for="tag in card.tags" :key="tag" class="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">{{ tag }}</span>
              </div>
              <!-- Title -->
              <p class="text-sm font-medium leading-snug mb-3 group-hover:text-white transition-colors">{{ card.title }}</p>
              <!-- Footer -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div :class="`w-6 h-6 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center text-[10px] font-bold`">{{ card.avatar }}</div>
                  <span class="text-xs text-zinc-500 hidden sm:inline">{{ card.assignee.split(' ')[0] }}</span>
                </div>
                <div class="flex items-center gap-3 text-xs text-zinc-600">
                  <span class="flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                    {{ card.comments }}
                  </span>
                  <span>{{ card.dueDate }}</span>
                </div>
              </div>
            </div>
            <!-- Empty state -->
            <div v-if="filteredCards(col).length === 0" class="py-8 text-center text-zinc-700 text-xs">
              No cards
            </div>
          </div>

          <!-- Add button -->
          <div class="p-3 border-t border-zinc-800/60">
            <button @click="openAddCard(col.id)"
              class="w-full py-2 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-center gap-1.5">
              + Add card
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add card modal -->
    <Teleport to="body">
      <div v-if="showAddCard" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showAddCard = false">
        <div class="add-modal bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-bold">New Card</h3>
            <button @click="showAddCard = false" class="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 hover:text-white transition-colors">✕</button>
          </div>
          <div class="space-y-4">
            <div>
              <label class="text-xs text-zinc-500 block mb-1.5">Title</label>
              <input v-model="newTitle" placeholder="Card title..." @keydown.enter="addCard"
                class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors" />
            </div>
            <div>
              <label class="text-xs text-zinc-500 block mb-1.5">Priority</label>
              <div class="flex gap-2">
                <button v-for="p in ['high', 'medium', 'low'] as const" :key="p" @click="newPriority = p"
                  :class="['flex-1 py-2 text-xs font-semibold rounded-lg transition-colors', newPriority === p ? priorityColors[p] : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300']">
                  {{ p }}
                </button>
              </div>
            </div>
            <div>
              <label class="text-xs text-zinc-500 block mb-1.5">Column</label>
              <select v-model="addingTo" class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors">
                <option v-for="col in columns" :key="col.id" :value="col.id">{{ col.title }}</option>
              </select>
            </div>
          </div>
          <div class="flex gap-3 mt-5">
            <button @click="showAddCard = false" class="flex-1 py-2.5 border border-zinc-700 rounded-xl text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
            <button @click="addCard" class="flex-1 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-bold transition-colors">Add Card</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
