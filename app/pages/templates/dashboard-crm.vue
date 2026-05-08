<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Contact {
  id: number
  name: string
  company: string
  email: string
  stage: 'Customer' | 'Prospect' | 'Lead' | 'Churned'
  value: string
  lastContact: string
  initials: string
  color: string
}

interface Deal {
  id: number
  company: string
  contact: string
  value: string
  date: string
  dots: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const contacts: Contact[] = [
  { id:1,  name:'Gabriel Delattre', company:'Stripe',       email:'gabriel@stripe.com',        stage:'Customer', value:'$24,000', lastContact:'Today',       initials:'GD', color:'from-emerald-500 to-teal-500' },
  { id:2,  name:'Vander Otis',      company:'Vercel',        email:'vander@vercel.com',         stage:'Prospect', value:'$8,500',  lastContact:'Yesterday',   initials:'VO', color:'from-blue-500 to-blue-600' },
  { id:3,  name:'Kevin Maginot',    company:'GitHub',        email:'kevin@github.com',          stage:'Lead',     value:'$3,200',  lastContact:'2 days ago',  initials:'KM', color:'from-amber-500 to-amber-600' },
  { id:4,  name:'Eric Ampire',      company:'Linear',        email:'eric@linear.app',           stage:'Customer', value:'$48,000', lastContact:'3 days ago',  initials:'EA', color:'from-rose-500 to-rose-600' },
  { id:5,  name:'Antfu',            company:'Nuxt Labs',     email:'antfu@nuxt.com',            stage:'Customer', value:'$18,000', lastContact:'1 week ago',  initials:'AF', color:'from-zinc-400 to-zinc-600' },
  { id:6,  name:'Elvin Kyungu',     company:'Elvin UI',      email:'elvin@elvinui.com',         stage:'Prospect', value:'$12,000', lastContact:'1 week ago',  initials:'EK', color:'from-emerald-500 to-teal-600' },
  { id:7,  name:'Alice Martin',     company:'Shopify',       email:'alice@shopify.com',         stage:'Lead',     value:'$5,600',  lastContact:'2 weeks ago', initials:'AM', color:'from-purple-500 to-purple-600' },
  { id:8,  name:'Tom K',            company:'Tailwind CSS',  email:'tom@tailwindcss.com',       stage:'Customer', value:'$32,000', lastContact:'3 weeks ago', initials:'TK', color:'from-cyan-500 to-blue-500' },
  { id:9,  name:'Sara López',       company:'PlanetScale',   email:'sara@planetscale.com',      stage:'Churned',  value:'$0',      lastContact:'1 month ago', initials:'SL', color:'from-pink-500 to-rose-500' },
  { id:10, name:'Bob Chen',         company:'Supabase',      email:'bob@supabase.io',           stage:'Lead',     value:'$4,100',  lastContact:'5 min ago',   initials:'BC', color:'from-indigo-500 to-blue-600' },
]

const pipelineColumns = [
  {
    label: 'Prospecting', dot: 'bg-blue-400', count: 4, total: '$28,200',
    deals: [
      { id:1, company:'Notion', contact:'Priya Patel', value:'$8,500', date:'Jun 1', dots: 1 },
      { id:2, company:'Figma', contact:'Tom Bradley', value:'$12,000', date:'Jun 3', dots: 1 },
      { id:3, company:'GitHub', contact:'Elena Rodriguez', value:'$3,200', date:'Jun 5', dots: 1 },
      { id:4, company:'Supabase', contact:'Noah Garcia', value:'$4,500', date:'Jun 7', dots: 1 },
    ] as Deal[],
  },
  {
    label: 'Proposal Sent', dot: 'bg-amber-400', count: 3, total: '$44,000',
    deals: [
      { id:5, company:'Vercel', contact:'Marcus Williams', value:'$18,000', date:'May 28', dots: 2 },
      { id:6, company:'Shopify', contact:'Aisha Johnson', value:'$14,000', date:'May 30', dots: 2 },
      { id:7, company:'PlanetScale', contact:'Yuki Tanaka', value:'$12,000', date:'Jun 2', dots: 2 },
    ] as Deal[],
  },
  {
    label: 'Negotiation', dot: 'bg-emerald-400', count: 2, total: '$72,000',
    deals: [
      { id:8, company:'Stripe', contact:'Sarah Chen', value:'$24,000', date:'May 22', dots: 3 },
      { id:9, company:'Linear', contact:'David Kim', value:'$48,000', date:'May 25', dots: 3 },
    ] as Deal[],
  },
]

const notifications = [
  { id:1, text:'Sarah Chen signed contract', sub:'$24k deal closed successfully', time:'2 min ago', dot:'bg-emerald-500' },
  { id:2, text:'New lead from website', sub:'Incoming inquiry from Shopify', time:'15 min ago', dot:'bg-blue-500' },
  { id:3, text:'Deal pipeline update', sub:'3 deals moved to Negotiation', time:'1 hr ago', dot:'bg-amber-500' },
]

const activityTimeline = [
  { id:1, type:'won',     icon:'check', color:'bg-emerald-500', label:'Contract signed', time:'Today 10:30am' },
  { id:2, type:'meeting', icon:'cal',   color:'bg-blue-500',    label:'Demo call completed', time:'Yesterday 3pm' },
  { id:3, type:'note',    icon:'note',  color:'bg-zinc-600',    label:'Follow-up note added', time:'Jun 10' },
  { id:4, type:'meeting', icon:'cal',   color:'bg-blue-500',    label:'Discovery call', time:'Jun 8' },
  { id:5, type:'note',    icon:'note',  color:'bg-zinc-600',    label:'Initial outreach sent', time:'Jun 5' },
]

// ─── State ────────────────────────────────────────────────────────────────────
const activeNav        = ref('contacts')
const filterTab        = ref('All')
const contactSearch    = ref('')
const showContactDrawer = ref(false)
const selectedContact  = ref<Contact | null>(null)
const showAddContact   = ref(false)
const showNotifs       = ref(false)
const openActionsId    = ref<number | null>(null)

const addForm = reactive({
  firstName: '', lastName: '', email: '', company: '',
  phone: '', stage: 'Lead', value: ''
})

// ─── Counters ─────────────────────────────────────────────────────────────────
const counter = reactive({ contacts: 0, deals: 0, won: 0, rate: 0 })

// ─── Computed ─────────────────────────────────────────────────────────────────
const filterTabs = ['All', 'Leads', 'Prospects', 'Customers', 'Churned']

const filteredContacts = computed(() => {
  let list = contacts
  if (filterTab.value !== 'All') {
    const map: Record<string, Contact['stage']> = {
      Leads: 'Lead', Prospects: 'Prospect', Customers: 'Customer', Churned: 'Churned',
    }
    list = list.filter(c => c.stage === map[filterTab.value])
  }
  if (contactSearch.value.trim()) {
    const q = contactSearch.value.toLowerCase()
    list = list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    )
  }
  return list
})

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { id:'dashboard', label:'Dashboard', icon:'M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z' },
  { id:'contacts',  label:'Contacts',  icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  { id:'deals',     label:'Deals',     icon:'M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9 5H7m6 0h-2' },
  { id:'tasks',     label:'Tasks',     icon:'M9 11l3 3 8-8M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7M5 12V7a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v5' },
  { id:'reports',   label:'Reports',   icon:'M18 20V10M12 20V4M6 20v-6' },
  { id:'settings',  label:'Settings',  icon:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' },
]

function stageBadge(stage: Contact['stage']) {
  const map = {
    Customer: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
    Prospect: 'text-blue-400 bg-blue-500/10 border border-blue-500/20',
    Lead:     'text-amber-400 bg-amber-500/10 border border-amber-500/20',
    Churned:  'text-zinc-400 bg-zinc-800 border border-zinc-700',
  }
  return map[stage]
}

function openDrawer(contact: Contact) {
  selectedContact.value = contact
  showContactDrawer.value = true
  openActionsId.value = null
}

function closeDrawer() {
  showContactDrawer.value = false
  setTimeout(() => { selectedContact.value = null }, 300)
}

// ─── GSAP ──────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.to(counter, { contacts: 1284, deals: 47, won: 128400, rate: 24.3, duration: 1.6, ease: 'power2.out', delay: 0.2 })
  gsap.from('.stat-card',     { y: 14, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.15 })
  gsap.from('.contact-row',   { x: -10, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out', delay: 0.4 })
  gsap.from('.pipeline-card', { y: 10, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out', delay: 0.6 })
  gsap.from('.pipeline-col',  { y: -8, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.55 })

  document.querySelectorAll<HTMLElement>('.contact-row').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { y: -1, duration: 0.18, ease: 'power2.out' }))
    el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: 0.18, ease: 'power2.out' }))
  })
})

onUnmounted(() => {
  gsap.killTweensOf(['.stat-card', '.contact-row', '.pipeline-card', '.pipeline-col', counter])
})
</script>

<template>
  <div class="flex h-screen text-white overflow-hidden" style="background:#080808;font-family:Inter,system-ui,sans-serif">

    <!-- ─── Sidebar ───────────────────────────────────────────────────────────── -->
    <aside class="fixed inset-y-0 left-0 z-30 flex flex-col w-60 shrink-0 border-r border-zinc-800/60 bg-zinc-950">

      <!-- Logo -->
      <div class="flex items-center gap-2.5 h-14 px-5 border-b border-zinc-800/60 shrink-0">
        <div class="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <span class="text-sm font-bold text-white tracking-tight">Elvin CRM</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 mb-2">Menu</p>
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="activeNav = item.id"
          :class="[
            'group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left border',
            activeNav === item.id
              ? 'text-white bg-zinc-800 border-zinc-700/60'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border-transparent'
          ]"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.icon"/>
          </svg>
          {{ item.label }}
        </button>
      </nav>

      <!-- User -->
      <div class="p-4 border-t border-zinc-800/60 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white shrink-0 ring-2 ring-emerald-500/20">EC</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-white truncate">Elvin Code</p>
            <p class="text-xs text-zinc-500 truncate">Account Manager</p>
          </div>
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shrink-0">Pro</span>
        </div>
      </div>
    </aside>

    <!-- ─── Main ──────────────────────────────────────────────────────────────── -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden ml-60">

      <!-- Topbar -->
      <header class="h-14 flex items-center gap-3 px-5 border-b border-zinc-800/60 shrink-0 sticky top-0 z-10 backdrop-blur-sm" style="background:rgba(8,8,8,0.9)">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-1.5 text-sm">
          <span class="text-zinc-500">CRM</span>
          <svg class="w-3.5 h-3.5 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          <span class="text-white font-medium capitalize">{{ activeNav }}</span>
        </div>

        <div class="flex items-center gap-2 ml-auto">
          <!-- Search -->
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>

          <!-- Bell -->
          <div class="relative">
            <button @click="showNotifs = !showNotifs; showNotifs && (openActionsId = null)"
              class="relative w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span class="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-[9px] font-bold text-white flex items-center justify-center leading-none">3</span>
            </button>

            <!-- Notif dropdown -->
            <Transition
              enter-active-class="transition-all duration-200 origin-top-right"
              leave-active-class="transition-all duration-150 origin-top-right"
              enter-from-class="opacity-0 scale-95"
              leave-to-class="opacity-0 scale-95"
            >
              <div v-if="showNotifs" class="absolute right-0 top-10 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                  <p class="text-sm font-semibold text-white">Notifications</p>
                  <button class="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Mark all read</button>
                </div>
                <div v-for="n in notifications" :key="n.id" class="flex items-start gap-3 px-4 py-3 hover:bg-zinc-800/50 transition-colors cursor-pointer border-b border-zinc-800/50 last:border-0">
                  <span :class="['w-2 h-2 rounded-full mt-1.5 shrink-0', n.dot]" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-white truncate">{{ n.text }}</p>
                    <p class="text-xs text-zinc-500 truncate">{{ n.sub }}</p>
                  </div>
                  <span class="text-[10px] text-zinc-600 shrink-0 mt-0.5 whitespace-nowrap">{{ n.time }}</span>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Avatar -->
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-zinc-800 cursor-pointer hover:ring-emerald-500/30 transition-all">EC</div>
        </div>
      </header>

      <!-- Scrollable content -->
      <main class="flex-1 overflow-y-auto" @click="showNotifs = false; openActionsId = null">
        <div class="p-6 max-w-[1400px] mx-auto flex flex-col gap-6">

          <!-- ── Stats Row ──────────────────────────────────────────────────── -->
          <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <div class="stat-card group p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 hover:border-zinc-700/60 cursor-default transition-colors overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 group-hover:from-blue-500/5 transition-all duration-300 rounded-2xl" />
              <div class="relative">
                <p class="text-xs text-zinc-500 font-medium mb-3">Total Contacts</p>
                <p class="text-2xl font-bold text-white tabular-nums leading-none">{{ Math.round(counter.contacts).toLocaleString() }}</p>
                <p class="text-xs text-emerald-400 mt-2 font-medium">+48 this month</p>
              </div>
            </div>
            <div class="stat-card group p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 hover:border-zinc-700/60 cursor-default transition-colors overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-amber-500/0 group-hover:from-amber-500/5 transition-all duration-300 rounded-2xl" />
              <div class="relative">
                <p class="text-xs text-zinc-500 font-medium mb-3">Open Deals</p>
                <p class="text-2xl font-bold text-white tabular-nums leading-none">{{ Math.round(counter.deals) }}</p>
                <p class="text-xs text-amber-400 mt-2 font-medium">9 in negotiation</p>
              </div>
            </div>
            <div class="stat-card group p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 hover:border-zinc-700/60 cursor-default transition-colors overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/0 group-hover:from-emerald-500/5 transition-all duration-300 rounded-2xl" />
              <div class="relative">
                <p class="text-xs text-zinc-500 font-medium mb-3">Won This Month</p>
                <p class="text-2xl font-bold text-white tabular-nums leading-none">${{ Math.round(counter.won).toLocaleString() }}</p>
                <p class="text-xs text-emerald-400 mt-2 font-medium">+22% vs last month</p>
              </div>
            </div>
            <div class="stat-card group p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/60 hover:border-zinc-700/60 cursor-default transition-colors overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500/0 group-hover:from-purple-500/5 transition-all duration-300 rounded-2xl" />
              <div class="relative">
                <p class="text-xs text-zinc-500 font-medium mb-3">Conversion Rate</p>
                <p class="text-2xl font-bold text-white tabular-nums leading-none">{{ counter.rate.toFixed(1) }}%</p>
                <p class="text-xs text-rose-400 mt-2 font-medium">-1.2% vs last month</p>
              </div>
            </div>
          </div>

          <!-- ── Contacts Table ─────────────────────────────────────────────── -->
          <div class="rounded-2xl bg-zinc-900/50 border border-zinc-800/60 overflow-hidden">
            <!-- Table header controls -->
            <div class="flex items-center justify-between gap-3 px-5 py-4 border-b border-zinc-800/60 flex-wrap">
              <div class="flex items-center gap-1 flex-wrap">
                <button
                  v-for="tab in filterTabs"
                  :key="tab"
                  @click.stop="filterTab = tab"
                  :class="[
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    filterTab === tab
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                  ]"
                >{{ tab }}</button>
              </div>
              <div class="flex items-center gap-2">
                <label class="relative">
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input
                    v-model="contactSearch"
                    @click.stop
                    type="text"
                    placeholder="Search contacts..."
                    class="pl-9 pr-3 py-1.5 bg-zinc-800 border border-zinc-700/60 rounded-lg text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all w-44"
                  />
                </label>
                <button
                  @click.stop="showAddContact = true"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  Add Contact
                </button>
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full min-w-[700px]">
                <thead>
                  <tr class="border-b border-zinc-800/60">
                    <th class="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-5 py-3">Name</th>
                    <th class="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3">Company</th>
                    <th class="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Email</th>
                    <th class="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3">Stage</th>
                    <th class="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Value</th>
                    <th class="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Last Contact</th>
                    <th class="text-left text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="contact in filteredContacts"
                    :key="contact.id"
                    class="contact-row border-b border-zinc-800/40 last:border-0 hover:bg-zinc-900/60 cursor-pointer transition-colors"
                    @click="openDrawer(contact)"
                  >
                    <td class="px-5 py-3.5">
                      <div class="flex items-center gap-3">
                        <div :class="['w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shrink-0', contact.color]">{{ contact.initials }}</div>
                        <span class="text-sm font-medium text-white whitespace-nowrap">{{ contact.name }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3.5">
                      <span class="text-sm text-zinc-400">{{ contact.company }}</span>
                    </td>
                    <td class="px-4 py-3.5 hidden md:table-cell">
                      <span class="text-sm text-zinc-500">{{ contact.email }}</span>
                    </td>
                    <td class="px-4 py-3.5">
                      <span :class="['text-xs font-semibold px-2 py-0.5 rounded-lg', stageBadge(contact.stage)]">{{ contact.stage }}</span>
                    </td>
                    <td class="px-4 py-3.5 hidden lg:table-cell">
                      <span class="text-sm font-semibold text-white tabular-nums">{{ contact.value }}</span>
                    </td>
                    <td class="px-4 py-3.5 hidden lg:table-cell">
                      <span class="text-xs text-zinc-500">{{ contact.lastContact }}</span>
                    </td>
                    <td class="px-4 py-3.5" @click.stop>
                      <div class="relative">
                        <button
                          @click.stop="openActionsId = openActionsId === contact.id ? null : contact.id"
                          class="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                        >
                          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                        </button>
                        <Transition
                          enter-active-class="transition-all duration-150 origin-top-right"
                          leave-active-class="transition-all duration-100 origin-top-right"
                          enter-from-class="opacity-0 scale-95"
                          leave-to-class="opacity-0 scale-95"
                        >
                          <div v-if="openActionsId === contact.id" class="absolute right-0 top-8 w-36 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                            <button @click.stop="openDrawer(contact)" class="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                              View
                            </button>
                            <button @click.stop="openActionsId = null" class="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              Edit
                            </button>
                            <div class="border-t border-zinc-800/60" />
                            <button @click.stop="openActionsId = null" class="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors">
                              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                              Delete
                            </button>
                          </div>
                        </Transition>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredContacts.length === 0">
                    <td colspan="7" class="px-5 py-10 text-center text-zinc-500 text-sm">No contacts found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ── Deal Pipeline ──────────────────────────────────────────────── -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-sm font-bold text-white">Deal Pipeline</h2>
                <p class="text-xs text-zinc-500 mt-0.5">Active opportunities by stage</p>
              </div>
              <button class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-emerald-500/10">View all →</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div v-for="col in pipelineColumns" :key="col.label" class="pipeline-col">
                <!-- Column header -->
                <div class="flex items-center gap-2 mb-3">
                  <span :class="['w-2 h-2 rounded-full shrink-0', col.dot]" />
                  <span class="text-sm font-semibold text-white">{{ col.label }}</span>
                  <span class="ml-auto text-xs font-bold px-2 py-0.5 rounded-lg bg-zinc-800 text-zinc-400">{{ col.count }}</span>
                </div>
                <div class="flex flex-col gap-2.5">
                  <div
                    v-for="deal in col.deals"
                    :key="deal.id"
                    class="pipeline-card group p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 cursor-pointer transition-colors"
                  >
                    <div class="flex items-start justify-between mb-2">
                      <div>
                        <p class="text-sm font-semibold text-white group-hover:text-emerald-50 transition-colors">{{ deal.company }}</p>
                        <p class="text-xs text-zinc-500 mt-0.5">{{ deal.contact }}</p>
                      </div>
                      <span class="text-sm font-bold text-white tabular-nums">{{ deal.value }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] text-zinc-600">Added {{ deal.date }}</span>
                      <div class="flex gap-1">
                        <span v-for="d in 3" :key="d" :class="['w-1.5 h-1.5 rounded-full transition-colors', d <= deal.dots ? col.dot : 'bg-zinc-700']" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-2.5 px-1 text-xs text-zinc-600 font-medium tabular-nums">Total: {{ col.total }}</div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- ─── Contact Drawer (right slide) ────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-250 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="showContactDrawer" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" @click="closeDrawer" />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-250 ease-in"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <div v-if="showContactDrawer" class="fixed right-0 inset-y-0 z-50 w-96 flex flex-col bg-zinc-950 border-l border-zinc-800/60 shadow-2xl shadow-black/60 overflow-y-auto">
        <!-- Drawer header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-zinc-800/60 shrink-0">
          <p class="text-sm font-semibold text-white">Contact Details</p>
          <button @click="closeDrawer" class="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div v-if="selectedContact" class="flex flex-col gap-5 p-5">
          <!-- Contact hero -->
          <div class="flex items-center gap-4">
            <div :class="['w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-lg font-bold text-white shrink-0 shadow-lg', selectedContact.color]">
              {{ selectedContact.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-base font-bold text-white">{{ selectedContact.name }}</h2>
              <p class="text-sm text-zinc-500">{{ selectedContact.company }}</p>
              <span :class="['text-xs font-semibold px-2 py-0.5 rounded-lg mt-1.5 inline-block', stageBadge(selectedContact.stage)]">{{ selectedContact.stage }}</span>
            </div>
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-colors border border-zinc-700">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
          </div>

          <!-- Contact info -->
          <div class="rounded-xl bg-zinc-900 border border-zinc-800 p-4 flex flex-col gap-3">
            <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Contact Info</p>
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span class="text-sm text-zinc-300">{{ selectedContact.email }}</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span class="text-sm text-zinc-300">+1 (555) 000-1234</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span class="text-sm text-zinc-300">San Francisco, CA</span>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-zinc-800">
              <span class="text-xs text-zinc-600">Deal value</span>
              <span class="text-sm font-bold text-white tabular-nums">{{ selectedContact.value }}</span>
            </div>
          </div>

          <!-- Deals -->
          <div>
            <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Deals (2)</p>
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div>
                  <p class="text-sm font-medium text-white">Enterprise Plan</p>
                  <p class="text-xs text-zinc-500 mt-0.5">Closed Won</p>
                </div>
                <span class="text-sm font-bold text-emerald-400">$24,000</span>
              </div>
              <div class="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <div>
                  <p class="text-sm font-medium text-white">Add-on Services</p>
                  <p class="text-xs text-zinc-500 mt-0.5">In Progress</p>
                </div>
                <span class="text-sm font-bold text-amber-400">$4,500</span>
              </div>
            </div>
          </div>

          <!-- Activity Timeline -->
          <div>
            <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Activity</p>
            <div class="relative flex flex-col gap-0">
              <div class="absolute left-[13px] top-4 bottom-4 w-px bg-zinc-800" />
              <div v-for="ev in activityTimeline" :key="ev.id" class="flex items-start gap-3 relative pl-1 pb-4 last:pb-0">
                <div :class="['w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ring-2 ring-zinc-950', ev.color]">
                  <svg v-if="ev.type === 'won'" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <svg v-else-if="ev.type === 'meeting'" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  <svg v-else class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div class="flex-1 min-w-0 pt-0.5">
                  <p class="text-sm text-zinc-300">{{ ev.label }}</p>
                  <p class="text-xs text-zinc-600 mt-0.5">{{ ev.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <p class="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Notes</p>
            <div class="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <p class="text-sm text-zinc-400 leading-relaxed">Key stakeholder. Decision maker. Prefers async comms. Renewal due Q3. Follow up on volume discount request.</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ─── Add Contact Modal ─────────────────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-200"
      leave-active-class="transition-all duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="showAddContact" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-[2px]" @click.self="showAddContact = false">
        <div class="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
          <!-- Modal header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <h2 class="text-base font-bold text-white">Add Contact</h2>
            <button @click="showAddContact = false" class="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Form -->
          <div class="p-6 flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-zinc-400 mb-1.5">First name</label>
                <input v-model="addForm.firstName" type="text" placeholder="Sarah" class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700/60 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
              </div>
              <div>
                <label class="block text-xs font-medium text-zinc-400 mb-1.5">Last name</label>
                <input v-model="addForm.lastName" type="text" placeholder="Chen" class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700/60 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
              <input v-model="addForm.email" type="email" placeholder="sarah@company.com" class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700/60 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
            </div>
            <div>
              <label class="block text-xs font-medium text-zinc-400 mb-1.5">Company</label>
              <input v-model="addForm.company" type="text" placeholder="Stripe" class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700/60 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
            </div>
            <div>
              <label class="block text-xs font-medium text-zinc-400 mb-1.5">Phone</label>
              <input v-model="addForm.phone" type="tel" placeholder="+1 (555) 000-0000" class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700/60 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-zinc-400 mb-1.5">Stage</label>
                <select v-model="addForm.stage" class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700/60 rounded-lg text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer">
                  <option value="Lead">Lead</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Customer">Customer</option>
                  <option value="Churned">Churned</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-zinc-400 mb-1.5">Est. Value</label>
                <input v-model="addForm.value" type="text" placeholder="$10,000" class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700/60 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-2.5 px-6 pb-5">
            <button @click="showAddContact = false" class="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700">Cancel</button>
            <button @click="showAddContact = false" class="px-5 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-colors shadow-lg shadow-emerald-500/20">Add Contact</button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>
