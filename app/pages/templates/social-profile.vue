<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({ layout: false })

gsap.registerPlugin(ScrollTrigger)

const activeTab = ref('Posts')
const isFollowing = ref(false)
const displayFollowers = ref(0)
const displayFollowing = ref(0)
const displayPosts = ref(0)

const tabs = ['Posts', 'Replies', 'Media', 'Likes']

const stats = [
  { label: 'Posts',     value: 482,    key: 'posts'     },
  { label: 'Followers', value: 24_800, key: 'followers' },
  { label: 'Following', value: 312,    key: 'following' },
]

const highlights = [
  { label: 'Work', emoji: '💼', color: 'from-violet-600 to-purple-700' },
  { label: 'Travel', emoji: '✈️', color: 'from-sky-600 to-blue-700' },
  { label: 'Code', emoji: '💻', color: 'from-emerald-600 to-green-700' },
  { label: 'Food', emoji: '🍜', color: 'from-amber-600 to-orange-700' },
  { label: 'UI', emoji: '🎨', color: 'from-pink-600 to-rose-700' },
]

interface Post {
  id: number; content: string; likes: number; time: string
  media?: string; color: string
}

const posts: Post[] = [
  { id: 1, content: 'Just shipped Elvin UI v1.0 — 50 components, zero compromises ✨', likes: 1204, time: '2h', color: 'from-violet-600 to-purple-700' },
  { id: 2, content: 'GSAP + Nuxt 4 is the combo I never knew I needed', likes: 847, time: '1d', color: 'from-sky-600 to-blue-700' },
  { id: 3, content: 'Dark mode done right is an art form', likes: 2341, time: '3d', color: 'from-zinc-700 to-zinc-800' },
  { id: 4, content: 'Component libraries should be copy-paste, not install-and-pray', likes: 3782, time: '5d', color: 'from-emerald-600 to-teal-700' },
  { id: 5, content: 'Accessibility is not optional. It never was.', likes: 1563, time: '1w', color: 'from-amber-600 to-orange-700' },
  { id: 6, content: 'Vue 3 Composition API + TypeScript = developer joy', likes: 924, time: '2w', color: 'from-pink-600 to-rose-700' },
]

const mediaItems = [
  { id: 1, color: 'from-violet-600 to-purple-800', emoji: '🎨' },
  { id: 2, color: 'from-sky-600 to-blue-800',     emoji: '💻' },
  { id: 3, color: 'from-emerald-600 to-teal-800', emoji: '🚀' },
  { id: 4, color: 'from-amber-600 to-orange-800', emoji: '⚡' },
  { id: 5, color: 'from-pink-600 to-rose-800',    emoji: '✨' },
  { id: 6, color: 'from-indigo-600 to-violet-800',emoji: '🔥' },
  { id: 7, color: 'from-teal-600 to-cyan-800',    emoji: '🌊' },
  { id: 8, color: 'from-red-600 to-rose-800',     emoji: '❤️' },
  { id: 9, color: 'from-yellow-600 to-amber-800', emoji: '⭐' },
]

const coverRef = useTemplateRef<HTMLElement>('coverRef')
const followBtn = useTemplateRef<HTMLElement>('followBtn')

function toggleFollow() {
  isFollowing.value = !isFollowing.value
  if (followBtn.value) {
    gsap.fromTo(followBtn.value,
      { scale: 0.85 },
      { scale: 1, duration: 0.4, ease: 'back.out(2.5)' }
    )
  }
  // update display
  if (isFollowing.value) displayFollowers.value++
  else displayFollowers.value--
}

function switchTab(tab: string) {
  activeTab.value = tab
  gsap.from('.tab-content > *', { y: 12, opacity: 0, stagger: 0.04, duration: 0.4, ease: 'power3.out' })
}

onMounted(() => {
  // Cover parallax
  if (coverRef.value) {
    ScrollTrigger.create({
      trigger: coverRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (coverRef.value) gsap.set(coverRef.value.querySelector('.cover-bg'), { y: self.progress * 60 })
      },
    })
  }

  // Stat counters
  const counters = [
    { target: 482, setter: (v: number) => { displayPosts.value = Math.round(v) } },
    { target: 24800, setter: (v: number) => { displayFollowers.value = Math.round(v) } },
    { target: 312, setter: (v: number) => { displayFollowing.value = Math.round(v) } },
  ]
  counters.forEach(({ target, setter }) => {
    const obj = { v: 0 }
    gsap.to(obj, { v: target, duration: 1.5, ease: 'power2.out', delay: 0.3, onUpdate() { setter(obj.v) } })
  })

  // Profile entrance
  gsap.from('.profile-card', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 })
  gsap.from('.highlight-item', { scale: 0, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'back.out(2)', delay: 0.4 })
  gsap.from('.post-item', { y: 16, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.5 })
})

onUnmounted(() => ScrollTrigger.getAll().forEach(t => t.kill()))
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white font-sans">
    <!-- Nav -->
    <nav class="h-14 border-b border-zinc-800/80 flex items-center justify-between px-6 bg-zinc-950/90 sticky top-0 z-40 backdrop-blur-sm">
      <button class="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        Back
      </button>
      <span class="font-bold text-sm">Elvin Kyungu</span>
      <button class="p-2 rounded-full hover:bg-zinc-800 transition-colors">
        <svg class="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </button>
    </nav>

    <!-- Cover -->
    <div ref="coverRef" class="relative h-48 overflow-hidden">
      <div class="cover-bg absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900">
        <div class="absolute inset-0 opacity-30">
          <div v-for="n in 12" :key="n" class="absolute rounded-full bg-white/10 blur-xl"
            :style="`width:${60 + n * 20}px;height:${60 + n * 15}px;top:${(n * 31) % 80}%;left:${(n * 19) % 90}%;animation-duration:${4 + n * 0.5}s`" />
        </div>
      </div>
    </div>

    <!-- Profile card -->
    <div class="profile-card max-w-2xl mx-auto px-4">
      <div class="relative -mt-16 flex items-end justify-between mb-4">
        <!-- Avatar -->
        <div class="w-28 h-28 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 border-4 border-zinc-950 flex items-center justify-center text-3xl font-black">EK</div>
        <!-- Actions -->
        <div class="flex items-center gap-2 pb-1">
          <button class="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors">
            <svg class="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
          </button>
          <button ref="followBtn" @click="toggleFollow"
            :class="['px-5 py-2 text-sm font-bold rounded-full transition-all', isFollowing ? 'border border-zinc-600 text-zinc-300 hover:border-red-500 hover:text-red-400' : 'bg-white text-zinc-900 hover:bg-zinc-100']">
            {{ isFollowing ? 'Following' : 'Follow' }}
          </button>
        </div>
      </div>

      <!-- Info -->
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-0.5">
          <h1 class="text-xl font-black">Elvin Kyungu</h1>
          <svg class="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <p class="text-sm text-zinc-500 mb-3">@elvinkyungu</p>
        <p class="text-sm text-zinc-300 leading-relaxed mb-3">
          Building <strong class="text-white">Elvin UI</strong> — Nuxt 4 components for developers who care about craft. Designer turned dev. GSAP enthusiast. Dark mode evangelist.
        </p>
        <div class="flex flex-wrap gap-4 text-xs text-zinc-500">
          <span class="flex items-center gap-1">📍 Montréal, Canada</span>
          <span class="flex items-center gap-1">🔗 elvinui.com</span>
          <span class="flex items-center gap-1">📅 Joined January 2021</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="flex gap-6 mb-5">
        <div class="text-center">
          <p class="font-black text-lg tabular-nums">{{ displayPosts.toLocaleString() }}</p>
          <p class="text-xs text-zinc-500">Posts</p>
        </div>
        <div class="text-center">
          <p class="font-black text-lg tabular-nums">{{ displayFollowers.toLocaleString() }}</p>
          <p class="text-xs text-zinc-500">Followers</p>
        </div>
        <div class="text-center">
          <p class="font-black text-lg tabular-nums">{{ displayFollowing.toLocaleString() }}</p>
          <p class="text-xs text-zinc-500">Following</p>
        </div>
      </div>

      <!-- Highlights -->
      <div class="flex gap-4 overflow-x-auto pb-2 mb-6 scrollbar-none">
        <div v-for="h in highlights" :key="h.label" class="highlight-item flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
          <div :class="`w-14 h-14 rounded-full bg-gradient-to-br ${h.color} flex items-center justify-center text-2xl ring-2 ring-zinc-800 hover:ring-violet-500 transition-all`">{{ h.emoji }}</div>
          <span class="text-xs text-zinc-400">{{ h.label }}</span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-zinc-800 mb-6">
        <button v-for="tab in tabs" :key="tab" @click="switchTab(tab)"
          :class="['flex-1 py-3 text-sm font-medium transition-colors relative', activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300']">
          {{ tab }}
          <div v-if="activeTab === tab" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-violet-500 rounded-full" />
        </button>
      </div>

      <!-- Tab content -->
      <div class="tab-content pb-12">
        <!-- Posts tab -->
        <div v-if="activeTab === 'Posts'" class="space-y-3">
          <div v-for="post in posts" :key="post.id" class="post-item bg-zinc-900 rounded-2xl border border-zinc-800 p-4 hover:border-zinc-700 transition-colors cursor-pointer">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold shrink-0">EK</div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-sm font-semibold">Elvin Kyungu</span>
                  <span class="text-xs text-zinc-500">· {{ post.time }}</span>
                </div>
                <p class="text-sm text-zinc-300 leading-relaxed mb-3">{{ post.content }}</p>
                <div class="flex items-center gap-5 text-xs text-zinc-500">
                  <span class="flex items-center gap-1 hover:text-red-400 cursor-pointer transition-colors">❤ {{ post.likes.toLocaleString() }}</span>
                  <span class="flex items-center gap-1 hover:text-sky-400 cursor-pointer transition-colors">↩ Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Media tab -->
        <div v-if="activeTab === 'Media'" class="grid grid-cols-3 gap-2">
          <div v-for="m in mediaItems" :key="m.id"
            :class="`post-item aspect-square rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-3xl cursor-pointer hover:opacity-90 transition-opacity hover:scale-[0.98]`">
            {{ m.emoji }}
          </div>
        </div>

        <!-- Likes / Replies placeholder -->
        <div v-if="activeTab === 'Likes' || activeTab === 'Replies'" class="py-12 text-center text-zinc-600">
          <p class="text-4xl mb-3">{{ activeTab === 'Likes' ? '❤️' : '↩' }}</p>
          <p class="text-sm">No {{ activeTab.toLowerCase() }} yet</p>
        </div>
      </div>
    </div>
  </div>
</template>
