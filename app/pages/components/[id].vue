<script setup lang="ts">
import { allItems, componentDocs } from '~/data/ui-components'

const route = useRoute()
const id = computed(() => route.params.id as string)
const doc = computed(() => componentDocs[id.value])
const item = computed(() => allItems.find(i => i.id === id.value))

const sidebarOpen = inject<Ref<boolean>>('comp-sidebar-open', ref(true))
const toggleSidebar = inject<() => void>('comp-toggle-sidebar', () => {})

useHead(() => ({
  title: doc.value ? `${doc.value.name} — Components — Elvin UI` : 'Component — Elvin UI',
}))

// Preview / Code tab
const activeTab = ref<'preview' | 'code'>('preview')
watch(id, () => { activeTab.value = 'preview' })

// Demo state
const tabsActive = ref('overview')
const tabsPillActive = ref('grid')
const buttonGroupVal = ref('week')
const segmentedVal = ref('list')
const checkboxes = ref([true, false, true, false])
const switches = ref([true, false, true])
const inputVal = ref('')
const textareaVal = ref('')
const selectVal = ref('pro')
const selectOptions = [
  { label: 'Free',         value: 'free' },
  { label: 'Pro — $12/mo', value: 'pro' },
  { label: 'Enterprise',   value: 'enterprise' },
]
const paginationPage = ref(5)
const progressVal = ref(68)
const modalOpen = ref(false)
const tags = ref(['Vue 3', 'Nuxt', 'TypeScript', 'GSAP'])
const tableRows = [
  { name: 'Alice Martin', role: 'Engineer', status: 'Active' },
  { name: 'Bob Chen',     role: 'Designer', status: 'Active' },
  { name: 'Carol Smith',  role: 'Manager',  status: 'Pending' },
  { name: 'Dan Park',     role: 'DevOps',   status: 'Inactive' },
]
const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', align: 'center' as const },
]
const dropdownItems = [
  { label: 'Edit', icon: 'lucide:pencil' },
  { label: 'Duplicate', icon: 'lucide:copy' },
  { divider: true },
  { label: 'Delete', icon: 'lucide:trash-2', danger: true },
]

const currentIndex = computed(() => allItems.findIndex(i => i.id === id.value))
const prevItem = computed(() => currentIndex.value > 0 ? allItems[currentIndex.value - 1] : null)
const nextItem = computed(() => currentIndex.value < allItems.length - 1 ? allItems[currentIndex.value + 1] : null)
</script>

<template>
  <main class="flex-1 min-w-0 overflow-x-hidden">

    <!-- Toolbar -->
    <div class="sticky z-10 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 h-11 flex items-center gap-3 px-4">
      <button
        @click="toggleSidebar"
        class="p-1.5 rounded-md transition-colors"
        :class="sidebarOpen ? 'text-white bg-zinc-800' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <path d="M9 3v18" stroke-linecap="round" />
        </svg>
      </button>
      <div class="h-3.5 w-px bg-zinc-800" />
      <UiBreadcrumb :items="[
        { label: 'Components', href: '/components' },
        { label: doc?.category ?? '', href: `/components?cat=${doc?.categoryId}` },
        { label: doc?.name ?? id },
      ]" />
    </div>

    <!-- Not documented -->
    <div v-if="!doc" class="flex flex-col items-center justify-center py-28 gap-5 px-6 text-center">
      <div class="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 grid place-items-center">
        <svg class="w-6 h-6 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div>
        <p class="text-base font-semibold text-zinc-200">{{ item?.name ?? id }}</p>
        <p class="text-sm text-zinc-500 mt-1.5">Documentation for this component is coming soon.</p>
      </div>
      <NuxtLink to="/components" class="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/70 transition-colors">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Back to all components
      </NuxtLink>
    </div>

    <!-- Doc page -->
    <div v-else class="pb-20">

      <!-- ── Hero header ──────────────────────────────────────────────── -->
      <div class="relative border-b border-zinc-800/60 px-6 sm:px-10 pt-10 pb-8 overflow-hidden">
        <!-- Subtle radial glow -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_10%_50%,rgb(99_102_241_/_0.07),transparent_70%)] pointer-events-none" />

        <div class="relative flex flex-col gap-3 max-w-2xl">
          <!-- Category + New -->
          <div class="flex items-center gap-2">
            <NuxtLink
              :to="`/components?cat=${doc.categoryId}`"
              class="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >{{ doc.category }}</NuxtLink>
            <span class="text-zinc-700">·</span>
            <span v-if="item?.isNew" class="text-[10px] px-1.5 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded font-semibold uppercase tracking-wide">New</span>
            <span v-else class="text-xs text-zinc-600">Component</span>
          </div>

          <!-- Name -->
          <h1 class="text-3xl font-bold text-white tracking-tight leading-none">{{ doc.name }}</h1>

          <!-- Description -->
          <p class="text-zinc-400 text-sm leading-relaxed">{{ doc.description }}</p>
        </div>
      </div>

      <!-- ── Content ──────────────────────────────────────────────────── -->
      <div class="px-6 sm:px-10 flex flex-col gap-10 pt-10 max-w-3xl">

        <!-- PREVIEW + CODE -->
        <section class="flex flex-col gap-3">

          <!-- Section header with tab toggle -->
          <div class="flex items-center justify-between">
            <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500">Preview</h2>
            <div class="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg gap-0.5">
              <button
                v-for="tab in ['preview', 'code'] as const"
                :key="tab"
                @click="activeTab = tab"
                :class="[
                  'px-3 py-1 text-xs font-medium rounded-md transition-all duration-150 capitalize',
                  activeTab === tab
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-500 hover:text-zinc-300',
                ]"
              >{{ tab }}</button>
            </div>
          </div>

          <!-- Preview pane -->
          <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-100"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <!-- LIVE DEMO -->
            <div
              v-if="activeTab === 'preview'"
              class="rounded-xl border border-zinc-800/80 bg-zinc-900/30 overflow-hidden"
            >
              <!-- Inner grid bg -->
              <div class="relative min-h-[220px] flex items-center justify-center p-8 sm:p-12">
                <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_0.3px,transparent_0.8px)] bg-[size:32px_32px] pointer-events-none" />
                <div class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff06_0.3px,transparent_0.8px)] bg-[size:32px_32px] pointer-events-none" />

                <div class="relative w-full flex items-center justify-center">

                  <!-- BUTTON -->
                  <template v-if="id === 'button'">
                    <div class="flex flex-col items-center gap-5 w-full">
                      <div class="flex flex-wrap items-center justify-center gap-2.5">
                        <UiButton variant="primary">Primary</UiButton>
                        <UiButton variant="secondary">Secondary</UiButton>
                        <UiButton variant="ghost">Ghost</UiButton>
                        <UiButton variant="danger">Danger</UiButton>
                      </div>
                      <div class="flex items-end gap-3">
                        <div class="flex flex-col items-center gap-1.5">
                          <UiButton size="sm" variant="secondary">Small</UiButton>
                          <span class="text-[10px] text-zinc-600">sm</span>
                        </div>
                        <div class="flex flex-col items-center gap-1.5">
                          <UiButton size="md" variant="secondary">Medium</UiButton>
                          <span class="text-[10px] text-zinc-600">md</span>
                        </div>
                        <div class="flex flex-col items-center gap-1.5">
                          <UiButton size="lg" variant="secondary">Large</UiButton>
                          <span class="text-[10px] text-zinc-600">lg</span>
                        </div>
                      </div>
                      <UiButton disabled>Disabled</UiButton>
                    </div>
                  </template>

                  <!-- ICON BUTTON -->
                  <template v-else-if="id === 'icon-button'">
                    <div class="flex flex-col items-center gap-6">
                      <div class="flex items-center gap-3">
                        <UiTooltip content="Primary" placement="top">
                          <UiIconButton label="Add" variant="primary">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                          </UiIconButton>
                        </UiTooltip>
                        <UiTooltip content="Secondary" placement="top">
                          <UiIconButton label="Save" variant="secondary">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 12 6 6L21 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          </UiIconButton>
                        </UiTooltip>
                        <UiTooltip content="Ghost" placement="top">
                          <UiIconButton label="Edit" variant="ghost">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          </UiIconButton>
                        </UiTooltip>
                        <UiTooltip content="Danger" placement="top">
                          <UiIconButton label="Delete" variant="danger">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M3 7h18" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          </UiIconButton>
                        </UiTooltip>
                      </div>
                      <div class="flex items-end gap-4">
                        <div v-for="size in ['sm', 'md', 'lg'] as const" :key="size" class="flex flex-col items-center gap-1.5">
                          <UiIconButton :label="size" variant="secondary" :size="size">
                            <svg :class="size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                          </UiIconButton>
                          <span class="text-[10px] text-zinc-600">{{ size }}</span>
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- BUTTON GROUP -->
                  <template v-else-if="id === 'button-group'">
                    <div class="flex flex-col items-center gap-8">
                      <div class="flex flex-col items-center gap-2">
                        <UiButtonGroup v-model="buttonGroupVal" :items="[{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]" />
                        <span class="text-xs text-zinc-600 mt-1">Default variant</span>
                      </div>
                      <div class="flex flex-col items-center gap-2">
                        <UiButtonGroup variant="segmented" v-model="segmentedVal" :items="[{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }, { label: 'Table', value: 'table' }]" />
                        <span class="text-xs text-zinc-600 mt-1">Segmented variant</span>
                      </div>
                    </div>
                  </template>

                  <!-- INPUT -->
                  <template v-else-if="id === 'input'">
                    <div class="flex flex-col gap-4 w-full max-w-sm">
                      <UiInput v-model="inputVal" label="Email address" type="email" placeholder="you@example.com" hint="We'll never share your email." />
                      <UiInput label="Username" placeholder="johndoe" error="Username is already taken" />
                      <UiInput label="Disabled field" placeholder="Read only" disabled />
                    </div>
                  </template>

                  <!-- TEXTAREA -->
                  <template v-else-if="id === 'textarea'">
                    <div class="flex flex-col gap-4 w-full max-w-sm">
                      <UiTextarea v-model="textareaVal" label="Message" placeholder="Write your message here…" :rows="3" hint="Maximum 500 characters" />
                      <UiTextarea label="Feedback" placeholder="Tell us what you think…" error="This field is required" :rows="2" />
                    </div>
                  </template>

                  <!-- SELECT -->
                  <template v-else-if="id === 'select'">
                    <div class="flex flex-col gap-4 w-full max-w-sm">
                      <UiSelect v-model="selectVal" label="Subscription plan" :options="selectOptions" hint="You can change this anytime." />
                      <UiSelect label="Country" placeholder="Select your country" :options="[{ label: 'France', value: 'fr' }, { label: 'USA', value: 'us' }, { label: 'Japan', value: 'jp' }]" />
                      <UiSelect label="Disabled" placeholder="Not available" :options="[]" disabled />
                    </div>
                  </template>

                  <!-- CHECKBOX -->
                  <template v-else-if="id === 'checkbox'">
                    <div class="flex flex-col gap-3.5">
                      <UiCheckbox v-model="checkboxes[0]" label="Accept terms and conditions" />
                      <UiCheckbox v-model="checkboxes[1]" label="Subscribe to newsletter" />
                      <UiCheckbox v-model="checkboxes[2]" label="Enable notifications" />
                      <UiCheckbox v-model="checkboxes[3]" label="Analytics sharing" disabled />
                      <UiCheckbox :model-value="true" :indeterminate="true" label="Indeterminate state" />
                    </div>
                  </template>

                  <!-- SWITCH -->
                  <template v-else-if="id === 'switch'">
                    <div class="flex flex-col gap-4">
                      <div v-for="(_, i) in switches" :key="i" class="flex items-center gap-3">
                        <UiToggle v-model="switches[i]" />
                        <span class="text-sm" :class="switches[i] ? 'text-zinc-200' : 'text-zinc-500'">
                          {{ ['Dark mode', 'Notifications', 'Auto-save'][i] }}
                        </span>
                      </div>
                    </div>
                  </template>

                  <!-- TABS -->
                  <template v-else-if="id === 'tabs'">
                    <div class="flex flex-col gap-10 w-full">
                      <div class="flex flex-col gap-1">
                        <p class="text-xs text-zinc-600 mb-3">underline</p>
                        <UiTabs v-model="tabsActive" :tabs="[{ id: 'overview', label: 'Overview' }, { id: 'code', label: 'Code' }, { id: 'props', label: 'Props' }]">
                          <p class="text-sm text-zinc-400 pt-1">Active tab: <span class="text-white font-medium">{{ tabsActive }}</span></p>
                        </UiTabs>
                      </div>
                      <div class="flex flex-col gap-1">
                        <p class="text-xs text-zinc-600 mb-3">pill</p>
                        <UiTabs variant="pill" v-model="tabsPillActive" :tabs="[{ id: 'grid', label: 'Grid' }, { id: 'list', label: 'List' }, { id: 'table', label: 'Table', disabled: true }]">
                          <p class="text-sm text-zinc-400 pt-1">Layout: <span class="text-white font-medium">{{ tabsPillActive }}</span></p>
                        </UiTabs>
                      </div>
                    </div>
                  </template>

                  <!-- BREADCRUMB -->
                  <template v-else-if="id === 'breadcrumb'">
                    <div class="flex flex-col gap-5 w-full">
                      <UiBreadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Components', href: '/components' }, { label: 'Breadcrumb' }]" />
                      <UiBreadcrumb :items="[{ label: 'Dashboard', href: '/' }, { label: 'Settings', href: '/settings' }, { label: 'Profile' }]" />
                      <UiBreadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'About' }]" />
                    </div>
                  </template>

                  <!-- PAGINATION -->
                  <template v-else-if="id === 'pagination'">
                    <div class="flex flex-col items-center gap-8">
                      <div class="flex flex-col items-center gap-2">
                        <UiPagination v-model="paginationPage" :total="120" :per-page="10" />
                        <span class="text-xs text-zinc-600">Page {{ paginationPage }} of 12</span>
                      </div>
                      <div class="flex flex-col items-center gap-2">
                        <UiPagination v-model="paginationPage" :total="500" :per-page="20" :siblings="2" />
                        <span class="text-xs text-zinc-600">siblings: 2</span>
                      </div>
                    </div>
                  </template>

                  <!-- BADGE -->
                  <template v-else-if="id === 'badge'">
                    <div class="flex flex-wrap items-center justify-center gap-3">
                      <UiBadge>Default</UiBadge>
                      <UiBadge variant="indigo">TypeScript</UiBadge>
                      <UiBadge variant="green">Active</UiBadge>
                      <UiBadge variant="red">Deprecated</UiBadge>
                      <UiBadge variant="zinc">Draft</UiBadge>
                    </div>
                  </template>

                  <!-- ALERT -->
                  <template v-else-if="id === 'alert'">
                    <div class="flex flex-col gap-3 w-full max-w-md">
                      <UiAlert variant="info" title="Heads up!">This action will affect all users in your organization.</UiAlert>
                      <UiAlert variant="success" title="Saved!" dismissible>Your changes have been saved successfully.</UiAlert>
                      <UiAlert variant="warning">Your trial expires in 3 days. Upgrade to keep access.</UiAlert>
                      <UiAlert variant="error" title="Something went wrong">Unable to connect to the server. Please try again.</UiAlert>
                    </div>
                  </template>

                  <!-- TOAST -->
                  <template v-else-if="id === 'toast'">
                    <div class="flex flex-col gap-3 items-center">
                      <UiToast title="Changes saved" description="Your profile has been updated." variant="success" :duration="0" />
                      <UiToast title="Upload failed" description="Max file size is 10 MB." variant="error" :duration="0" />
                      <UiToast title="Reminder" description="Your meeting starts in 5 minutes." variant="default" :duration="0" />
                    </div>
                  </template>

                  <!-- SPINNER -->
                  <template v-else-if="id === 'spinner'">
                    <div class="flex flex-col gap-10 items-center">
                      <div class="flex items-center gap-8">
                        <div class="flex flex-col items-center gap-2">
                          <UiSpinner size="sm" />
                          <span class="text-[10px] text-zinc-600">sm</span>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                          <UiSpinner size="md" />
                          <span class="text-[10px] text-zinc-600">md</span>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                          <UiSpinner size="lg" />
                          <span class="text-[10px] text-zinc-600">lg</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-8">
                        <div class="flex flex-col items-center gap-2">
                          <UiSpinner variant="primary" />
                          <span class="text-[10px] text-zinc-600">primary</span>
                        </div>
                        <div class="flex flex-col items-center gap-2 bg-zinc-700 rounded-xl p-3">
                          <UiSpinner variant="white" />
                          <span class="text-[10px] text-zinc-400">white</span>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                          <UiSpinner variant="muted" />
                          <span class="text-[10px] text-zinc-600">muted</span>
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- PROGRESS -->
                  <template v-else-if="id === 'progress'">
                    <div class="flex flex-col gap-5 w-full max-w-sm">
                      <UiProgress :value="progressVal" label="Storage" show-value />
                      <UiProgress :value="100" variant="success" size="sm" label="Upload complete" show-value />
                      <UiProgress :value="55" variant="warning" label="CPU usage" show-value />
                      <UiProgress :value="30" variant="danger" size="lg" label="Memory critical" show-value />
                      <input type="range" v-model="progressVal" min="0" max="100" class="w-full accent-indigo-500" />
                    </div>
                  </template>

                  <!-- MODAL -->
                  <template v-else-if="id === 'modal'">
                    <div class="flex flex-col items-center gap-4">
                      <UiButton @click="modalOpen = true">Open modal</UiButton>
                      <p class="text-xs text-zinc-600">Click the button to open a modal</p>
                      <UiModal v-model="modalOpen" title="Confirm deletion" size="sm">
                        Are you sure you want to delete this item? This action cannot be undone.
                        <template #footer>
                          <UiButton variant="ghost" @click="modalOpen = false">Cancel</UiButton>
                          <UiButton variant="danger" @click="modalOpen = false">Delete</UiButton>
                        </template>
                      </UiModal>
                    </div>
                  </template>

                  <!-- TOOLTIP -->
                  <template v-else-if="id === 'tooltip'">
                    <div class="flex flex-col gap-10 items-center">
                      <div class="flex items-center gap-6">
                        <UiTooltip content="Top tooltip" placement="top">
                          <UiButton variant="secondary" size="sm">Top</UiButton>
                        </UiTooltip>
                        <UiTooltip content="Bottom tooltip" placement="bottom">
                          <UiButton variant="secondary" size="sm">Bottom</UiButton>
                        </UiTooltip>
                        <UiTooltip content="Left tooltip" placement="left">
                          <UiButton variant="secondary" size="sm">Left</UiButton>
                        </UiTooltip>
                        <UiTooltip content="Right tooltip" placement="right">
                          <UiButton variant="secondary" size="sm">Right</UiButton>
                        </UiTooltip>
                      </div>
                      <p class="text-xs text-zinc-600">Hover over each button to reveal the tooltip</p>
                    </div>
                  </template>

                  <!-- DROPDOWN -->
                  <template v-else-if="id === 'dropdown'">
                    <div class="flex flex-col items-center gap-4">
                      <UiDropdown :items="dropdownItems">
                        <UiButton variant="secondary">Options
                          <svg class="w-3.5 h-3.5 ml-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </UiButton>
                      </UiDropdown>
                      <p class="text-xs text-zinc-600">Click to open the context menu</p>
                    </div>
                  </template>

                  <!-- CARD -->
                  <template v-else-if="id === 'card'">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                      <UiCard>
                        <p class="text-xs text-zinc-500 mb-1">Default</p>
                        <h3 class="text-white font-semibold text-sm">Card title</h3>
                        <p class="text-zinc-400 text-xs mt-1">Card content goes here.</p>
                      </UiCard>
                      <UiCard hoverable>
                        <p class="text-xs text-zinc-500 mb-1">Hoverable</p>
                        <h3 class="text-white font-semibold text-sm">Hover me</h3>
                        <p class="text-zinc-400 text-xs mt-1">I lift on hover.</p>
                      </UiCard>
                      <UiCard padding="sm">
                        <p class="text-xs text-zinc-500 mb-1">Small padding</p>
                        <p class="text-zinc-400 text-xs">Compact layout.</p>
                      </UiCard>
                      <UiCard padding="lg" hoverable>
                        <p class="text-xs text-zinc-500 mb-1">Large + hoverable</p>
                        <p class="text-zinc-400 text-xs">More breathing room.</p>
                      </UiCard>
                    </div>
                  </template>

                  <!-- AVATAR -->
                  <template v-else-if="id === 'avatar'">
                    <div class="flex flex-col gap-8 items-center">
                      <div class="flex items-end gap-4">
                        <UiAvatar name="Alice" size="xs" color="indigo" />
                        <UiAvatar name="Bob Chen" size="sm" color="green" />
                        <UiAvatar name="Carol" size="md" color="amber" :online="true" />
                        <UiAvatar name="Dan Park" size="lg" color="red" :online="false" />
                        <UiAvatar name="Eve Long" size="xl" color="pink" :online="true" />
                      </div>
                      <div class="flex -space-x-2">
                        <UiAvatar name="Alice" color="indigo" size="sm" />
                        <UiAvatar name="Bob" color="green" size="sm" />
                        <UiAvatar name="Carol" color="amber" size="sm" />
                        <UiAvatar name="Dan" color="red" size="sm" />
                        <div class="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 font-medium">+4</div>
                      </div>
                    </div>
                  </template>

                  <!-- TABLE -->
                  <template v-else-if="id === 'table'">
                    <div class="w-full">
                      <UiTable :columns="tableColumns" :rows="tableRows" striped>
                        <template #status="{ value }">
                          <UiBadge :variant="value === 'Active' ? 'green' : value === 'Pending' ? 'indigo' : 'zinc'">{{ value }}</UiBadge>
                        </template>
                      </UiTable>
                    </div>
                  </template>

                  <!-- TAG -->
                  <template v-else-if="id === 'tag'">
                    <div class="flex flex-col gap-6 items-center">
                      <div class="flex flex-wrap justify-center gap-2">
                        <UiTag>Default</UiTag>
                        <UiTag variant="indigo">Vue 3</UiTag>
                        <UiTag variant="green">Active</UiTag>
                        <UiTag variant="amber">Beta</UiTag>
                        <UiTag variant="red">Deprecated</UiTag>
                      </div>
                      <div class="flex flex-wrap justify-center gap-2">
                        <UiTag
                          v-for="tag in tags"
                          :key="tag"
                          variant="indigo"
                          removable
                          @remove="tags = tags.filter(t => t !== tag)"
                        >{{ tag }}</UiTag>
                        <span v-if="!tags.length" class="text-xs text-zinc-600">All tags removed</span>
                      </div>
                    </div>
                  </template>

                </div>
              </div>
            </div>

            <!-- CODE BLOCK -->
            <UiCodeBlock v-else :code="doc.usage" />
          </Transition>
        </section>

        <!-- USAGE (code always visible) -->
        <section v-if="activeTab !== 'code'" class="flex flex-col gap-3">
          <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500">Usage</h2>
          <UiCodeBlock :code="doc.usage" />
        </section>

        <!-- PROPS TABLE -->
        <section class="flex flex-col gap-3">
          <h2 class="text-xs font-semibold tracking-widest uppercase text-zinc-500">Props</h2>

          <div class="rounded-xl border border-zinc-800/80 overflow-hidden">
            <!-- Header -->
            <div class="grid grid-cols-[1fr_1.6fr_0.8fr_2fr] px-4 py-2.5 border-b border-zinc-800/60 bg-zinc-900/60">
              <span class="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Prop</span>
              <span class="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Type</span>
              <span class="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Default</span>
              <span class="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider hidden lg:block">Description</span>
            </div>

            <!-- Rows -->
            <div
              v-for="(prop, i) in doc.props"
              :key="prop.name"
              :class="[
                'grid grid-cols-[1fr_1.6fr_0.8fr_2fr] px-4 py-3.5 border-b border-zinc-800/40 last:border-0 transition-colors hover:bg-zinc-800/20',
                i % 2 === 0 ? '' : 'bg-zinc-900/20',
              ]"
            >
              <!-- Prop name -->
              <div class="flex items-start gap-1.5 pt-0.5">
                <code class="text-[12px] font-mono font-medium text-indigo-400">{{ prop.name }}</code>
                <span v-if="prop.required" class="text-[9px] mt-0.5 px-1 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded font-bold uppercase leading-none">req</span>
              </div>

              <!-- Type -->
              <div class="flex items-start pt-0.5 pr-4">
                <code class="text-[11px] font-mono text-amber-300/80 bg-amber-500/8 px-2 py-0.5 rounded-md border border-amber-500/10 break-all leading-relaxed">{{ prop.type }}</code>
              </div>

              <!-- Default -->
              <div class="flex items-start pt-0.5">
                <code v-if="prop.default" class="text-[12px] font-mono text-zinc-400">{{ prop.default }}</code>
                <span v-else class="text-zinc-700 text-xs pt-0.5">—</span>
              </div>

              <!-- Description -->
              <div class="hidden lg:flex items-start pt-0.5">
                <span class="text-[13px] text-zinc-400 leading-snug">{{ prop.description }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- PREV / NEXT ──────────────────────────────────────────────── -->
        <div class="flex items-center justify-between pt-6 border-t border-zinc-800/60 mt-4">
          <NuxtLink
            v-if="prevItem"
            :to="`/components/${prevItem.id}`"
            class="group flex flex-col gap-0.5"
          >
            <span class="text-[11px] text-zinc-600 uppercase tracking-wider">Previous</span>
            <span class="flex items-center gap-1.5 text-sm text-zinc-300 group-hover:text-white transition-colors">
              <svg class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              {{ prevItem.name }}
            </span>
          </NuxtLink>
          <div v-else />

          <NuxtLink
            v-if="nextItem"
            :to="`/components/${nextItem.id}`"
            class="group flex flex-col items-end gap-0.5"
          >
            <span class="text-[11px] text-zinc-600 uppercase tracking-wider">Next</span>
            <span class="flex items-center gap-1.5 text-sm text-zinc-300 group-hover:text-white transition-colors">
              {{ nextItem.name }}
              <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </NuxtLink>
          <div v-else />
        </div>

      </div>
    </div>
  </main>
</template>
