<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ layout: false })

interface Post {
  id: number; author: string; handle: string; avatar: string; time: string
  content: string; image?: string; likes: number; reposts: number; replies: number
  liked: boolean; reposted: boolean; bookmarked: boolean
}

const posts = reactive<Post[]>([
  {
    id: 1, author: 'Gabriel Delattre', handle: '@gabriel_d', avatar: 'GD', time: '2m',
    content: 'Just shipped a full redesign of our design system. 240 components, zero breaking changes. The secret? Obsessive token discipline from day one 🎨',
    likes: 847, reposts: 124, replies: 38, liked: false, reposted: false, bookmarked: false,
  },
  {
    id: 2, author: 'Sara López', handle: '@saralopez_dev', avatar: 'SL', time: '14m',
    content: 'Hot take: most "senior" engineers underestimate how much communication skill matters. Writing a clear RFC is harder than writing the code. And often more impactful.',
    likes: 2341, reposts: 412, replies: 97, liked: true, reposted: false, bookmarked: true,
  },
  {
    id: 3, author: 'Elvin Kyungu', handle: '@elvinkyungu', avatar: 'EK', time: '1h',
    content: 'Building Elvin UI — a Nuxt 4 component library focused on copy-paste simplicity over install-and-pray complexity. First 50 components are live ✨\n\nWhat UI patterns do you wish existed out of the box?',
    likes: 1204, reposts: 287, replies: 154, liked: false, reposted: false, bookmarked: false,
  },
  {
    id: 4, author: 'Vander Otis', handle: '@vander_otis', avatar: 'VO', time: '3h',
    content: 'Reminder: "It works on my machine" is not a deployment strategy. Containerize everything. Your future self will thank you.',
    likes: 3782, reposts: 891, replies: 203, liked: false, reposted: true, bookmarked: false,
  },
  {
    id: 5, author: 'Raphaël Kim', handle: '@raphaelkim', avatar: 'RK', time: '5h',
    content: 'GSAP 3.12 is out and the new ScrollSmoother API is absolutely wild. We went from 6 custom scroll files to 80 lines. Performance improved too.',
    likes: 952, reposts: 178, replies: 44, liked: true, reposted: false, bookmarked: true,
  },
])

const trending = [
  { tag: '#VueConf2026', posts: '14.2K' },
  { tag: '#Nuxt4', posts: '8.9K' },
  { tag: '#WebDev', posts: '45.1K' },
  { tag: '#TypeScript', posts: '22.7K' },
  { tag: '#TailwindCSS', posts: '11.3K' },
]

const suggestions = [
  { name: 'Kevin Maginot', handle: '@kevinmaginot', avatar: 'KM', color: 'from-violet-500 to-purple-600', followers: '12.4K' },
  { name: 'Yuki Tanaka',   handle: '@yukitanaka',   avatar: 'YT', color: 'from-cyan-500 to-blue-600',   followers: '8.7K'  },
  { name: 'Eric Ampire',   handle: '@ericampire',   avatar: 'EA', color: 'from-rose-500 to-pink-600',   followers: '31.2K' },
]

const following = reactive(new Set<string>())
const lightboxImage = ref<string | null>(null)

function toggleLike(post: Post) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
  const btn = document.querySelector(`[data-like="${post.id}"]`)
  if (btn && post.liked) {
    gsap.fromTo(btn, { scale: 0.6, rotate: -15 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2.5)' })
    // mini burst
    gsap.fromTo(btn, { color: '#ef4444' }, { color: '#ef4444', duration: 0 })
  }
}

function toggleRepost(post: Post) {
  post.reposted = !post.reposted
  post.reposts += post.reposted ? 1 : -1
  const btn = document.querySelector(`[data-repost="${post.id}"]`)
  if (btn && post.reposted) gsap.from(btn, { rotate: 360, duration: 0.5, ease: 'power3.out' })
}

function toggleBookmark(post: Post) {
  post.bookmarked = !post.bookmarked
  const btn = document.querySelector(`[data-bookmark="${post.id}"]`)
  if (btn && post.bookmarked) gsap.from(btn, { y: -4, duration: 0.4, ease: 'back.out(3)' })
}

function toggleFollow(handle: string) {
  if (following.has(handle)) following.delete(handle)
  else {
    following.add(handle)
    const btn = document.querySelector(`[data-follow="${handle}"]`)
    if (btn) gsap.from(btn, { scale: 0.85, duration: 0.3, ease: 'back.out(2)' })
  }
}

onMounted(() => {
  gsap.from('.post-card', { y: 24, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' })
  gsap.from('.trending-item', { x: 20, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.3 })
  gsap.from('.suggestion-card', { y: 16, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.4 })
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white font-sans">
    <!-- Nav -->
    <nav class="h-14 border-b border-zinc-800/80 flex items-center justify-between px-6 bg-zinc-950/90 sticky top-0 z-40 backdrop-blur-sm">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center font-black text-sm">X</div>
        <span class="font-bold text-sm tracking-wide">Signal</span>
      </div>
      <div class="relative">
        <input placeholder="Search..." class="hidden sm:block bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 text-sm text-zinc-400 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 w-56 transition-all" />
      </div>
      <div class="flex items-center gap-2">
        <button class="relative p-2 rounded-full hover:bg-zinc-800 transition-colors">
          <svg class="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
        </button>
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-xs font-bold">EK</div>
      </div>
    </nav>

    <div class="max-w-5xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">

      <!-- Left nav (desktop) -->
      <aside class="hidden lg:flex col-span-2 flex-col gap-1 pt-2 sticky top-20 self-start">
        <button v-for="(item, i) in [
          { icon: '⌂', label: 'Home', active: true },
          { icon: '🔍', label: 'Explore' },
          { icon: '🔔', label: 'Alerts' },
          { icon: '✉', label: 'Messages' },
          { icon: '🔖', label: 'Saved' },
          { icon: '👤', label: 'Profile' },
        ]" :key="i"
          :class="['flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors', item.active ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white hover:bg-zinc-900']">
          <span class="text-base">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </button>
        <button class="mt-4 w-full py-2.5 bg-sky-600 hover:bg-sky-500 rounded-xl text-sm font-bold transition-colors">Post</button>
      </aside>

      <!-- Feed -->
      <main class="col-span-12 lg:col-span-7 space-y-1">
        <!-- Compose -->
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 mb-4">
          <div class="flex gap-3">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-xs font-bold shrink-0">EK</div>
            <div class="flex-1">
              <input placeholder="What's happening?" class="w-full bg-transparent text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none py-1" />
              <div class="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                <div class="flex gap-3 text-sky-500">
                  <button class="p-1 hover:bg-zinc-800 rounded transition-colors text-lg">🖼</button>
                  <button class="p-1 hover:bg-zinc-800 rounded transition-colors text-lg">😊</button>
                  <button class="p-1 hover:bg-zinc-800 rounded transition-colors text-lg">📊</button>
                </div>
                <button class="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-sm font-bold rounded-full transition-colors">Post</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Posts -->
        <div v-for="post in posts" :key="post.id"
          class="post-card bg-zinc-900 rounded-2xl border border-zinc-800 p-4 hover:border-zinc-700 transition-colors">
          <div class="flex gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold shrink-0">{{ post.avatar }}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-sm">{{ post.author }}</span>
                  <span class="text-xs text-zinc-500">{{ post.handle }}</span>
                  <span class="text-xs text-zinc-600">·</span>
                  <span class="text-xs text-zinc-500">{{ post.time }}</span>
                </div>
                <button class="text-zinc-500 hover:text-white text-xs p-1 rounded hover:bg-zinc-800 transition-colors">···</button>
              </div>
              <p class="text-sm text-zinc-300 leading-relaxed whitespace-pre-line mb-3">{{ post.content }}</p>

              <!-- Actions -->
              <div class="flex items-center gap-6 text-zinc-500">
                <button class="flex items-center gap-1.5 text-xs hover:text-sky-400 transition-colors group">
                  <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  {{ post.replies }}
                </button>
                <button :data-repost="post.id" @click="toggleRepost(post)"
                  :class="['flex items-center gap-1.5 text-xs transition-colors', post.reposted ? 'text-green-400' : 'hover:text-green-400']">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  {{ post.reposts }}
                </button>
                <button :data-like="post.id" @click="toggleLike(post)"
                  :class="['flex items-center gap-1.5 text-xs transition-colors', post.liked ? 'text-red-400' : 'hover:text-red-400']">
                  <svg class="w-4 h-4" :fill="post.liked ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  {{ post.likes.toLocaleString() }}
                </button>
                <button :data-bookmark="post.id" @click="toggleBookmark(post)"
                  :class="['flex items-center gap-1.5 text-xs transition-colors ml-auto', post.bookmarked ? 'text-amber-400' : 'hover:text-amber-400']">
                  <svg class="w-4 h-4" :fill="post.bookmarked ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Load more -->
        <button class="w-full py-4 text-sm text-sky-400 hover:text-sky-300 transition-colors font-medium">
          Load more posts
        </button>
      </main>

      <!-- Right sidebar -->
      <aside class="hidden lg:block col-span-3 space-y-5 sticky top-20 self-start">
        <!-- Trending -->
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <h3 class="text-sm font-bold mb-4">Trending</h3>
          <div class="space-y-3">
            <div v-for="(t, i) in trending" :key="t.tag" class="trending-item">
              <button class="w-full text-left hover:bg-zinc-800 -mx-2 px-2 py-1.5 rounded-lg transition-colors">
                <p class="text-xs text-zinc-500">#{{ i + 1 }} · Tech</p>
                <p class="text-sm font-semibold">{{ t.tag }}</p>
                <p class="text-xs text-zinc-500">{{ t.posts }} posts</p>
              </button>
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div class="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
          <h3 class="text-sm font-bold mb-4">Who to follow</h3>
          <div class="space-y-4">
            <div v-for="s in suggestions" :key="s.handle" class="suggestion-card flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div :class="`w-9 h-9 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-xs font-bold shrink-0`">{{ s.avatar }}</div>
                <div>
                  <p class="text-sm font-semibold leading-tight">{{ s.name }}</p>
                  <p class="text-xs text-zinc-500">{{ s.followers }} followers</p>
                </div>
              </div>
              <button :data-follow="s.handle" @click="toggleFollow(s.handle)"
                :class="['px-3 py-1 text-xs font-semibold rounded-full transition-all', following.has(s.handle) ? 'bg-zinc-700 text-zinc-300' : 'bg-sky-600 hover:bg-sky-500 text-white']">
                {{ following.has(s.handle) ? 'Following' : 'Follow' }}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
