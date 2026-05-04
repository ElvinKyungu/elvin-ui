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
  { label: 'Free',        value: 'free' },
  { label: 'Pro — $12/mo', value: 'pro' },
  { label: 'Enterprise',  value: 'enterprise' },
]

// Prev / next navigation
const currentIndex = computed(() => allItems.findIndex(i => i.id === id.value))
const prevItem = computed(() => currentIndex.value > 0 ? allItems[currentIndex.value - 1] : null)
const nextItem = computed(() => currentIndex.value < allItems.length - 1 ? allItems[currentIndex.value + 1] : null)
</script>

<template>
  <main class="flex-1 min-w-0">

    <!-- Toolbar -->
    <div class="sticky top-14 z-10 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 h-11 flex items-center gap-3 px-4">
      <button
        @click="toggleSidebar"
        class="p-1.5 rounded-md transition-colors"
        :class="sidebarOpen ? 'text-white bg-zinc-800' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'"
        title="Toggle sidebar"
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

    <!-- Not documented yet -->
    <div v-if="!doc" class="flex flex-col items-center justify-center py-20 gap-4 px-6 text-center">
      <div class="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 grid place-items-center">
        <svg class="w-5 h-5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div>
        <p class="text-sm font-semibold text-zinc-300">{{ item?.name ?? id }} — documentation coming soon</p>
        <p class="text-xs text-zinc-600 mt-1">Only the first 10 components are documented so far.</p>
      </div>
      <NuxtLink to="/components" class="text-xs text-accent hover:text-accent/70 transition-colors">← Back to all components</NuxtLink>
    </div>

    <!-- Component page -->
    <div v-else class="max-w-3xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-12">

      <!-- Header -->
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-white tracking-tight">{{ doc.name }}</h1>
          <span v-if="item?.isNew" class="text-[10px] px-1.5 py-0.5 bg-accent/15 text-accent border border-accent/20 rounded font-semibold uppercase tracking-wide">New</span>
        </div>
        <p class="text-zinc-400 leading-relaxed">{{ doc.description }}</p>
      </div>

      <!-- PREVIEW -->
      <section class="flex flex-col gap-4">
        <h2 class="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Preview</h2>
        <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
          <div class="min-h-[200px] flex items-center justify-center p-8">

            <!-- BUTTON -->
            <template v-if="id === 'button'">
              <div class="flex flex-col items-center gap-4 w-full">
                <div class="flex flex-wrap items-center justify-center gap-2.5">
                  <UiButton variant="primary">Primary</UiButton>
                  <UiButton variant="secondary">Secondary</UiButton>
                  <UiButton variant="ghost">Ghost</UiButton>
                  <UiButton variant="danger">Danger</UiButton>
                </div>
                <div class="flex items-center gap-2">
                  <UiButton size="sm">Small</UiButton>
                  <UiButton size="md">Medium</UiButton>
                  <UiButton size="lg">Large</UiButton>
                </div>
                <UiButton disabled>Disabled</UiButton>
              </div>
            </template>

            <!-- ICON BUTTON -->
            <template v-else-if="id === 'icon-button'">
              <div class="flex flex-col items-center gap-6">
                <div class="flex items-center gap-3">
                  <UiIconButton label="Add" variant="primary">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                  </UiIconButton>
                  <UiIconButton label="Save" variant="secondary">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 12 6 6L21 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </UiIconButton>
                  <UiIconButton label="Edit" variant="ghost">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </UiIconButton>
                  <UiIconButton label="Delete" variant="danger">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M3 7h18" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </UiIconButton>
                </div>
                <div class="flex items-end gap-3">
                  <div class="flex flex-col items-center gap-1.5">
                    <UiIconButton label="SM" variant="secondary" size="sm">
                      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                    </UiIconButton>
                    <span class="text-xs text-zinc-600">sm</span>
                  </div>
                  <div class="flex flex-col items-center gap-1.5">
                    <UiIconButton label="MD" variant="secondary" size="md">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                    </UiIconButton>
                    <span class="text-xs text-zinc-600">md</span>
                  </div>
                  <div class="flex flex-col items-center gap-1.5">
                    <UiIconButton label="LG" variant="secondary" size="lg">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
                    </UiIconButton>
                    <span class="text-xs text-zinc-600">lg</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- BUTTON GROUP -->
            <template v-else-if="id === 'button-group'">
              <div class="flex flex-col items-center gap-6">
                <div class="flex flex-col items-center gap-2">
                  <span class="text-xs text-zinc-600 mb-1">Default</span>
                  <UiButtonGroup v-model="buttonGroupVal" :items="[{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]" />
                </div>
                <div class="flex flex-col items-center gap-2">
                  <span class="text-xs text-zinc-600 mb-1">Segmented</span>
                  <UiButtonGroup variant="segmented" v-model="segmentedVal" :items="[{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }, { label: 'Table', value: 'table' }]" />
                </div>
              </div>
            </template>

            <!-- INPUT -->
            <template v-else-if="id === 'input'">
              <div class="flex flex-col gap-4 w-full max-w-sm">
                <UiInput v-model="inputVal" label="Email address" type="email" placeholder="you@example.com" hint="We'll never share your email." />
                <UiInput label="Username" placeholder="johndoe" error="Username is already taken" />
                <UiInput label="Disabled" placeholder="Can't touch this" disabled />
              </div>
            </template>

            <!-- TEXTAREA -->
            <template v-else-if="id === 'textarea'">
              <div class="flex flex-col gap-4 w-full max-w-sm">
                <UiTextarea v-model="textareaVal" label="Message" placeholder="Write your message here…" :rows="4" hint="Maximum 500 characters" />
                <UiTextarea label="Feedback" placeholder="Tell us what you think…" error="This field is required" :rows="3" />
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
              <div class="flex flex-col gap-3">
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
                <div v-for="(on, i) in switches" :key="i" class="flex items-center gap-3">
                  <UiToggle v-model="switches[i]" />
                  <span class="text-sm" :class="on ? 'text-zinc-200' : 'text-zinc-500'">
                    {{ ['Dark mode', 'Notifications', 'Auto-save'][i] }}
                  </span>
                </div>
              </div>
            </template>

            <!-- TABS -->
            <template v-else-if="id === 'tabs'">
              <div class="flex flex-col gap-8 w-full">
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-zinc-600">Underline variant</span>
                  <UiTabs v-model="tabsActive" :tabs="[{ id: 'overview', label: 'Overview' }, { id: 'code', label: 'Code' }, { id: 'props', label: 'Props' }]">
                    <p class="text-sm text-zinc-400">Content for tab: <strong class="text-white">{{ tabsActive }}</strong></p>
                  </UiTabs>
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-xs text-zinc-600">Pill variant</span>
                  <UiTabs variant="pill" v-model="tabsPillActive" :tabs="[{ id: 'grid', label: 'Grid' }, { id: 'list', label: 'List' }, { id: 'table', label: 'Table', disabled: true }]">
                    <p class="text-sm text-zinc-400">View: <strong class="text-white">{{ tabsPillActive }}</strong></p>
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

          </div>
        </div>
      </section>

      <!-- USAGE -->
      <section class="flex flex-col gap-4">
        <h2 class="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Usage</h2>
        <UiCodeBlock :code="doc.usage" />
      </section>

      <!-- PROPS -->
      <section class="flex flex-col gap-4">
        <h2 class="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Props</h2>
        <div class="rounded-xl border border-zinc-800 overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-zinc-800 bg-zinc-900">
                <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Prop</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Default</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden lg:table-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="prop in doc.props"
                :key="prop.name"
                class="border-b border-zinc-800/60 last:border-0 hover:bg-zinc-800/20 transition-colors"
              >
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <code class="text-indigo-400 font-mono text-xs">{{ prop.name }}</code>
                    <span v-if="prop.required" class="text-[9px] px-1 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded font-semibold uppercase leading-none">req</span>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <code class="text-[11px] font-mono text-amber-400/80 bg-amber-500/5 px-1.5 py-0.5 rounded border border-amber-500/10">{{ prop.type }}</code>
                </td>
                <td class="px-4 py-3">
                  <code v-if="prop.default" class="text-[11px] font-mono text-zinc-400">{{ prop.default }}</code>
                  <span v-else class="text-zinc-700 text-xs">—</span>
                </td>
                <td class="px-4 py-3 text-zinc-400 hidden lg:table-cell">{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PREV / NEXT -->
      <div class="flex items-center justify-between pt-4 border-t border-zinc-800/60">
        <NuxtLink
          v-if="prevItem"
          :to="`/components/${prevItem.id}`"
          class="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
        >
          <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          {{ prevItem.name }}
        </NuxtLink>
        <div v-else />
        <NuxtLink
          v-if="nextItem"
          :to="`/components/${nextItem.id}`"
          class="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
        >
          {{ nextItem.name }}
          <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </NuxtLink>
        <div v-else />
      </div>

    </div>
  </main>
</template>
