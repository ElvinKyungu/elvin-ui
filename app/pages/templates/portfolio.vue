<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── Role cycling ──────────────────────────────────────────────────────────────
const roles = ['Frontend Developer', 'UI Designer', 'Creative Coder', 'Nuxt Enthusiast']
const roleIndex = ref(0)
const currentRole = ref(roles[0])
const roleVisible = ref(true)

let roleInterval: ReturnType<typeof setInterval> | null = null

function cycleRole() {
  roleVisible.value = false
  setTimeout(() => {
    roleIndex.value = (roleIndex.value + 1) % roles.length
    currentRole.value = roles[roleIndex.value]
    roleVisible.value = true
  }, 300)
}

// ─── Projects data ─────────────────────────────────────────────────────────────
interface Project {
  name: string
  desc: string
  tags: string[]
  category: string
  gradient: string
  link: string
}

const projects: Project[] = [
  { name: 'Elvin UI',         desc: 'A Nuxt 4 component system with 50+ copy-paste components and interactive templates.',          tags: ['Vue', 'Nuxt', 'TailwindCSS'], category: 'Design', gradient: 'from-indigo-600 to-violet-600',  link: '#' },
  { name: 'Nova App',         desc: 'A cross-platform mobile app for real-time team collaboration with offline-first sync.',         tags: ['React Native', 'TypeScript'],  category: 'Mobile', gradient: 'from-emerald-600 to-teal-600',  link: '#' },
  { name: 'Forge Agency',     desc: 'Bold agency website with GSAP scroll animations, 3D typography, and a magnetic cursor.',        tags: ['Nuxt', 'GSAP', 'Three.js'],    category: 'Web',    gradient: 'from-violet-600 to-fuchsia-600', link: '#' },
  { name: 'Signal Blog',      desc: 'A content platform with MDX rendering, real-time comments, and an adaptive reading layout.',   tags: ['Nuxt', 'Supabase', 'TypeScript'], category: 'Web',  gradient: 'from-sky-600 to-blue-600',      link: '#' },
  { name: 'Orbit Dashboard',  desc: 'A SaaS analytics dashboard with live charts, heatmaps, and multi-workspace management.',       tags: ['Vue', 'D3.js', 'Pinia'],       category: 'Web',    gradient: 'from-rose-600 to-pink-600',     link: '#' },
  { name: 'Spark Mobile',     desc: 'A fitness tracking app with animated progress rings, workout logging, and Apple Health sync.', tags: ['Swift', 'HealthKit'],           category: 'Mobile', gradient: 'from-amber-600 to-orange-600',  link: '#' },
]

const filterCategories = ['All', 'Web', 'Mobile', 'Design']
const activeFilter = ref('All')

const filteredProjects = computed(() =>
  activeFilter.value === 'All' ? projects : projects.filter(p => p.category === activeFilter.value)
)

// ─── Stats ─────────────────────────────────────────────────────────────────────
const statsData = [
  { target: 4,   suffix: '+',   label: 'Years exp.'      },
  { target: 30,  suffix: '+',   label: 'Projects shipped' },
  { target: 18,  suffix: '',    label: 'Happy clients'   },
]
const statsDisplay = reactive(statsData.map(s => ({ ...s, current: 0 })))

// ─── Skills ────────────────────────────────────────────────────────────────────
const skillGroups = [
  { label: 'Frontend', color: 'from-indigo-500 to-violet-500', items: ['Vue 3', 'Nuxt 4', 'React', 'TypeScript', 'TailwindCSS', 'GSAP'] },
  { label: 'Design',   color: 'from-rose-500 to-pink-500',     items: ['Figma', 'Motion Design', 'Design Systems', 'Framer'] },
  { label: 'Tools',    color: 'from-emerald-500 to-teal-500',  items: ['Git', 'Docker', 'Vercel', 'Supabase', 'PostgreSQL'] },
]

// ─── Contact form ──────────────────────────────────────────────────────────────
const form = reactive({ name: '', email: '', subject: '', message: '' })
const formErrors = reactive({ name: '', email: '', message: '' })
const formSent = ref(false)

function validateForm() {
  formErrors.name    = form.name.trim()    ? '' : 'Name is required'
  formErrors.email   = /\S+@\S+\.\S+/.test(form.email) ? '' : 'Valid email required'
  formErrors.message = form.message.trim() ? '' : 'Message is required'
  return !formErrors.name && !formErrors.email && !formErrors.message
}

function submitContact() {
  if (!validateForm()) return
  formSent.value = true
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
const mobileOpen = ref(false)

// ─── Grid ref for filter animation ────────────────────────────────────────────
const projectGrid = useTemplateRef<HTMLElement>('projectGrid')

function animateProjects() {
  if (!projectGrid.value) return
  const cards = Array.from(projectGrid.value.children) as HTMLElement[]
  gsap.killTweensOf(cards)
  gsap.fromTo(cards,
    { opacity: 0, y: 28, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out', clearProps: 'transform,opacity' }
  )
}

watch(activeFilter, () => nextTick(animateProjects))

// ─── GSAP ──────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Start role cycling
  roleInterval = setInterval(cycleRole, 2800)

  // Hero stagger
  const heroChildren = document.querySelectorAll('.hero-item')
  gsap.fromTo(heroChildren,
    { opacity: 0, y: 36 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
  )

  // Orb animation
  const orb = document.querySelector('.hero-orb') as HTMLElement
  if (orb) {
    gsap.to(orb, { rotation: 360, duration: 12, repeat: -1, ease: 'none' })
    gsap.fromTo(orb, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' })
  }

  // Section reveals
  document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 87%' } }
    )
  })

  // Stats count-up
  const statsSection = document.querySelector('.stats-section')
  if (statsSection) {
    ScrollTrigger.create({
      trigger: statsSection,
      start: 'top 80%',
      onEnter: () => {
        statsDisplay.forEach((stat, i) => {
          gsap.to(stat, { current: stat.target, duration: 1.5, delay: i * 0.15, ease: 'power2.out',
            onUpdate() { stat.current = Math.round(stat.current) }
          })
        })
      },
    })
  }

  // Initial projects animation
  nextTick(animateProjects)
})

onUnmounted(() => {
  if (roleInterval) clearInterval(roleInterval)
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white overflow-x-hidden">

    <!-- ─── Navbar ─────────────────────────────────────────────────────────── -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <span class="font-black tracking-tight text-base">Alex Rivera</span>

        <div class="hidden md:flex items-center gap-7 text-sm text-zinc-400">
          <a href="#work"    class="hover:text-white transition-colors">Work</a>
          <a href="#about"   class="hover:text-white transition-colors">About</a>
          <a href="#skills"  class="hover:text-white transition-colors">Skills</a>
          <a href="#contact" class="hover:text-white transition-colors">Contact</a>
        </div>

        <a href="#contact" class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border border-indigo-500/50 text-indigo-400 rounded-full hover:bg-indigo-500/10 transition-colors">
          Hire me
        </a>

        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 text-zinc-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
            <path v-else d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150" leave-to-class="opacity-0">
        <div v-if="mobileOpen" class="md:hidden border-t border-zinc-800/60 px-6 py-4 flex flex-col gap-3 text-sm text-zinc-400">
          <a href="#work"    @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Work</a>
          <a href="#about"   @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">About</a>
          <a href="#skills"  @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Skills</a>
          <a href="#contact" @click="mobileOpen=false" class="hover:text-white py-1 transition-colors">Contact</a>
        </div>
      </Transition>
    </nav>

    <!-- ─── Hero ───────────────────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px] -translate-y-1/2" />
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_0.5px,transparent_0.5px),linear-gradient(to_bottom,#ffffff05_0.5px,transparent_0.5px)] bg-[size:72px_72px]" />
      </div>

      <div class="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left -->
        <div>
          <div class="hero-item flex items-center gap-2 mb-6">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-sm text-emerald-400 font-medium">Available for work</span>
          </div>
          <h1 class="hero-item text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-4">
            Alex<br>Rivera
          </h1>
          <div class="hero-item h-10 mb-4 overflow-hidden flex items-center">
            <Transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 translate-y-4"
              leave-active-class="transition-all duration-200"
              leave-to-class="opacity-0 -translate-y-4"
            >
              <span :key="currentRole" v-if="roleVisible" class="text-xl md:text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {{ currentRole }}
              </span>
            </Transition>
          </div>
          <p class="hero-item text-zinc-400 text-base leading-relaxed mb-8 max-w-md">
            I build beautiful, fast web experiences using Vue, Nuxt, and TailwindCSS.
            Obsessed with clean code and delightful micro-interactions.
          </p>
          <div class="hero-item flex flex-wrap gap-3">
            <a href="#work" class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-900 font-semibold text-sm rounded-full hover:bg-zinc-100 transition-colors">
              View my work
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="#" class="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-700 text-zinc-300 font-semibold text-sm rounded-full hover:border-zinc-500 hover:text-white transition-colors">
              Download CV
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>

        <!-- Right — animated orb + tech stack -->
        <div class="hidden lg:flex items-center justify-center">
          <div class="relative w-72 h-72">
            <!-- Rotating orb -->
            <div class="hero-orb absolute inset-4 rounded-full border border-indigo-500/20" style="background: conic-gradient(from 0deg, transparent 70%, #6366f133 80%, transparent 90%);" />
            <div class="absolute inset-8 rounded-full bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 flex items-center justify-center">
              <div class="text-center">
                <div class="text-3xl font-black">AR</div>
                <div class="text-xs text-zinc-500 mt-1">Portfolio</div>
              </div>
            </div>
            <!-- Tech badges -->
            <div v-for="(badge, i) in ['Vue 3','Nuxt 4','GSAP','TypeScript','Tailwind','Figma']" :key="badge"
              class="absolute text-xs font-semibold px-2.5 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-zinc-300"
              :style="`
                top: ${50 + 48 * Math.sin(i * Math.PI / 3 - Math.PI / 6)}%;
                left: ${50 + 48 * Math.cos(i * Math.PI / 3 - Math.PI / 6)}%;
                transform: translate(-50%, -50%);
              `"
            >
              {{ badge }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Work ───────────────────────────────────────────────────────────── -->
    <section id="work" class="py-24">
      <div class="max-w-6xl mx-auto px-6">
        <div class="reveal flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p class="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">Work</p>
            <h2 class="text-4xl font-black tracking-tight">Selected projects</h2>
          </div>
          <!-- Filter tabs -->
          <div class="flex items-center gap-2 flex-wrap">
            <button
              v-for="cat in filterCategories"
              :key="cat"
              @click="activeFilter = cat"
              :class="[
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                activeFilter === cat
                  ? 'bg-indigo-500 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div ref="projectGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="project in filteredProjects"
            :key="project.name"
            class="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300"
          >
            <div :class="`bg-gradient-to-br ${project.gradient} h-40 relative overflow-hidden`">
              <div class="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
              <div class="absolute bottom-3 left-4 text-white/20 text-4xl font-black">{{ project.name[0] }}</div>
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                <a :href="project.link" class="px-3 py-1.5 bg-white text-zinc-900 text-xs font-bold rounded-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  View →
                </a>
                <a :href="project.link" class="px-3 py-1.5 bg-zinc-900/80 border border-zinc-600 text-white text-xs font-semibold rounded-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  Code
                </a>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-bold mb-1 group-hover:text-indigo-300 transition-colors">{{ project.name }}</h3>
              <p class="text-xs text-zinc-500 leading-relaxed mb-3">{{ project.desc }}</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tag in project.tags" :key="tag" class="text-[10px] px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-400">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── About ──────────────────────────────────────────────────────────── -->
    <section id="about" class="py-24 bg-zinc-900/30">
      <div class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <!-- Photo placeholder -->
        <div class="reveal flex flex-col items-center lg:items-start gap-4">
          <div class="w-48 h-48 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 relative flex items-center justify-center shadow-2xl shadow-indigo-900/40">
            <span class="text-4xl font-black text-white/80">AR</span>
            <div class="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-500 text-zinc-900 text-xs font-bold rounded-full border-2 border-zinc-950">
              Open to work
            </div>
          </div>
          <!-- Stats -->
          <div class="stats-section flex gap-8 mt-4">
            <div v-for="stat in statsDisplay" :key="stat.label" class="text-center lg:text-left">
              <div class="text-2xl font-black text-white tabular-nums">{{ stat.current }}{{ stat.suffix }}</div>
              <div class="text-xs text-zinc-500 mt-0.5">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        <!-- Text -->
        <div class="reveal">
          <p class="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">About me</p>
          <h2 class="text-4xl font-black tracking-tight mb-5">I build things people love to use</h2>
          <p class="text-zinc-400 leading-relaxed mb-4">
            I'm a frontend developer and UI designer based in Brussels, Belgium. I specialize in Vue/Nuxt ecosystems and have a deep love for animation, interaction design, and the craft of building polished, accessible web experiences.
          </p>
          <p class="text-zinc-400 leading-relaxed mb-6">
            When I'm not coding, I'm usually exploring new design patterns, contributing to open-source projects, or writing about developer experience and UI craft.
          </p>
          <div class="space-y-2.5">
            <div v-for="[icon, value] in [['📍','Brussels, Belgium'],['📧','alex@alexrivera.dev'],['⚡','Usually responds within 24h']]" :key="value" class="flex items-center gap-2.5 text-sm text-zinc-400">
              <span>{{ icon }}</span>
              <span>{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Skills ─────────────────────────────────────────────────────────── -->
    <section id="skills" class="py-24">
      <div class="max-w-6xl mx-auto px-6">
        <div class="reveal mb-12">
          <p class="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">Skills</p>
          <h2 class="text-4xl font-black tracking-tight">What I work with</h2>
        </div>
        <div class="reveal grid sm:grid-cols-3 gap-6">
          <div
            v-for="group in skillGroups"
            :key="group.label"
            class="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors"
          >
            <div class="flex items-center gap-2 mb-4">
              <div :class="`w-2 h-2 rounded-full bg-gradient-to-br ${group.color}`" />
              <h3 class="font-bold text-sm">{{ group.label }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in group.items"
                :key="skill"
                class="text-xs px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300 hover:border-zinc-500 transition-colors cursor-default"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Contact ────────────────────────────────────────────────────────── -->
    <section id="contact" class="py-24 bg-zinc-900/30">
      <div class="max-w-2xl mx-auto px-6">
        <div class="reveal text-center mb-12">
          <p class="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">Contact</p>
          <h2 class="text-4xl font-black tracking-tight mb-3">Let's work together</h2>
          <p class="text-zinc-400">Have a project in mind? I'd love to hear about it.</p>
        </div>

        <div class="reveal">
          <Transition enter-active-class="transition-all duration-400" enter-from-class="opacity-0 scale-95">
            <div v-if="formSent" class="text-center py-12">
              <div class="w-14 h-14 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Message sent!</h3>
              <p class="text-zinc-400 text-sm mb-6">I'll get back to you within 24 hours.</p>
              <button @click="formSent = false" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Send another message</button>
            </div>
            <form v-else @submit.prevent="submitContact" class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-zinc-400 mb-1.5">Name <span class="text-red-500">*</span></label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Your name"
                    :class="['w-full bg-zinc-900 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors', formErrors.name ? 'border-red-500/60' : 'border-zinc-800 focus:border-indigo-500']"
                  />
                  <p v-if="formErrors.name" class="text-xs text-red-400 mt-1">{{ formErrors.name }}</p>
                </div>
                <div>
                  <label class="block text-xs font-medium text-zinc-400 mb-1.5">Email <span class="text-red-500">*</span></label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="you@example.com"
                    :class="['w-full bg-zinc-900 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors', formErrors.email ? 'border-red-500/60' : 'border-zinc-800 focus:border-indigo-500']"
                  />
                  <p v-if="formErrors.email" class="text-xs text-red-400 mt-1">{{ formErrors.email }}</p>
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-zinc-400 mb-1.5">Subject</label>
                <input
                  v-model="form.subject"
                  type="text"
                  placeholder="Project inquiry, collaboration..."
                  class="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-zinc-400 mb-1.5">Message <span class="text-red-500">*</span></label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  :class="['w-full bg-zinc-900 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none', formErrors.message ? 'border-red-500/60' : 'border-zinc-800 focus:border-indigo-500']"
                />
                <p v-if="formErrors.message" class="text-xs text-red-400 mt-1">{{ formErrors.message }}</p>
              </div>
              <button type="submit" class="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                Send message
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </form>
          </Transition>
        </div>
      </div>
    </section>

    <!-- ─── Footer ─────────────────────────────────────────────────────────── -->
    <footer class="border-t border-zinc-800/60 py-10">
      <div class="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p class="font-bold">Alex Rivera</p>
          <p class="text-xs text-zinc-600 mt-0.5">Built with Nuxt 4 &amp; Elvin UI</p>
        </div>
        <div class="flex items-center gap-3 text-zinc-600">
          <a href="#" class="hover:text-white transition-colors" title="GitHub">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="#" class="hover:text-white transition-colors" title="Twitter">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.738-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" class="hover:text-white transition-colors" title="LinkedIn">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
        <p class="text-xs text-zinc-600">© 2025 Alex Rivera</p>
      </div>
    </footer>
  </div>
</template>
