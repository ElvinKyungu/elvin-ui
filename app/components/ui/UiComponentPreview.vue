<script setup lang="ts">
defineProps<{ id: string }>()

const checkboxStates = ref([true, true, false, false])
const switchStates = ref([true, false, true])
const tabActive = ref('preview')
const buttonGroupVal = ref('week')
const segmentedVal = ref('grid')
const paginationPage = ref(3)
const progressVals = [75, 42, 85]

const dropdownItems = [
  { label: 'Edit',     icon: 'lucide:pencil' },
  { label: 'Duplicate', icon: 'lucide:copy' },
  { divider: true },
  { label: 'Delete',   icon: 'lucide:trash-2', danger: true },
]

const selectOptions = [
  { label: 'Free',       value: 'free' },
  { label: 'Pro',        value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
]
const selectedPlan = ref('pro')

const tableColumns = [
  { key: 'name',   label: 'Name' },
  { key: 'role',   label: 'Role' },
  { key: 'status', label: 'Status', align: 'right' as const },
]
const tableRows = [
  { name: 'Alice Martin', role: 'Designer',  status: 'Active' },
  { name: 'Bob Chen',     role: 'Engineer',  status: 'Idle' },
  { name: 'Sara López',   role: 'Manager',   status: 'Active' },
]
</script>

<template>

  <!-- BUTTON -->
  <template v-if="id === 'button'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3">
      <div class="flex items-center gap-2.5 flex-wrap justify-center">
        <UiButton size="sm" variant="primary">Primary</UiButton>
        <UiButton size="sm" variant="secondary">Secondary</UiButton>
        <UiButton size="sm" variant="ghost">Ghost</UiButton>
        <UiButton size="sm" variant="danger">Danger</UiButton>
      </div>
      <div class="flex items-center gap-2">
        <UiButton size="sm" variant="primary" disabled>Disabled</UiButton>
      </div>
    </div>
  </template>

  <!-- ICON BUTTON -->
  <template v-else-if="id === 'icon-button'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center gap-3">
      <UiIconButton label="Add" variant="primary" size="md">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
      </UiIconButton>
      <UiIconButton label="Done" variant="secondary" size="md">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 12 6 6L21 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </UiIconButton>
      <UiIconButton label="Delete" variant="ghost" size="md">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M3 7h18" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </UiIconButton>
      <UiIconButton label="Danger" variant="danger" size="md">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </UiIconButton>
    </div>
  </template>

  <!-- BUTTON GROUP -->
  <template v-else-if="id === 'button-group'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <UiButtonGroup
        v-model="buttonGroupVal"
        :items="[{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]"
      />
      <UiButtonGroup
        variant="segmented"
        v-model="segmentedVal"
        :items="[{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }, { label: 'Table', value: 'table' }]"
      />
    </div>
  </template>

  <!-- INPUT -->
  <template v-else-if="id === 'input'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3 px-8">
      <UiInput label="Email address" placeholder="you@example.com" type="email" />
      <UiInput label="Username" placeholder="johndoe" error="Username already taken" />
    </div>
  </template>

  <!-- TEXTAREA -->
  <template v-else-if="id === 'textarea'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center px-8">
      <UiTextarea label="Message" placeholder="Write your message here..." :rows="3" hint="Max 500 characters" />
    </div>
  </template>

  <!-- SELECT -->
  <template v-else-if="id === 'select'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3 px-8">
      <UiSelect
        v-model="selectedPlan"
        label="Plan"
        :options="selectOptions"
      />
      <UiSelect
        label="Country"
        placeholder="Select a country"
        :options="[{ label: 'France', value: 'fr' }, { label: 'USA', value: 'us' }, { label: 'Japan', value: 'jp' }]"
        hint="Used for billing"
      />
    </div>
  </template>

  <!-- CHECKBOX -->
  <template v-else-if="id === 'checkbox'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <div class="flex flex-col gap-3">
        <UiCheckbox v-model="checkboxStates[0]" label="Accept terms and conditions" />
        <UiCheckbox v-model="checkboxStates[1]" label="Subscribe to newsletter" />
        <UiCheckbox v-model="checkboxStates[2]" label="Enable notifications" />
        <UiCheckbox v-model="checkboxStates[3]" label="Share analytics" disabled />
      </div>
    </div>
  </template>

  <!-- SWITCH -->
  <template v-else-if="id === 'switch'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <div class="flex flex-col gap-4">
        <div v-for="(on, i) in switchStates" :key="i" class="flex items-center gap-3">
          <UiToggle v-model="switchStates[i]" />
          <span class="text-sm" :class="on ? 'text-zinc-200' : 'text-zinc-500'">
            {{ ['Dark mode', 'Notifications', 'Auto-save'][i] }}
          </span>
        </div>
      </div>
    </div>
  </template>

  <!-- TABS -->
  <template v-else-if="id === 'tabs'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col px-5 py-4">
      <UiTabs
        v-model="tabActive"
        :tabs="[
          { id: 'preview', label: 'Preview' },
          { id: 'code',    label: 'Code' },
          { id: 'props',   label: 'Props' },
        ]"
      >
        <div class="flex flex-col gap-1.5 mt-1">
          <div class="h-1.5 w-3/4 bg-zinc-700 rounded-full" />
          <div class="h-1.5 w-full bg-zinc-800 rounded-full" />
          <div class="h-1.5 w-2/3 bg-zinc-800 rounded-full" />
        </div>
      </UiTabs>
    </div>
  </template>

  <!-- BREADCRUMB -->
  <template v-else-if="id === 'breadcrumb'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center px-6">
      <div class="flex flex-col gap-4 w-full">
        <UiBreadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Components' }]" />
        <UiBreadcrumb :items="[{ label: 'Dashboard', href: '/' }, { label: 'Settings' }]" />
      </div>
    </div>
  </template>

  <!-- PAGINATION -->
  <template v-else-if="id === 'pagination'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center">
      <UiPagination v-model="paginationPage" :total="120" :per-page="10" />
    </div>
  </template>

  <!-- BADGE -->
  <template v-else-if="id === 'badge'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3">
      <div class="flex items-center gap-2 flex-wrap justify-center">
        <UiBadge variant="indigo">Indigo</UiBadge>
        <UiBadge variant="green">Success</UiBadge>
        <UiBadge variant="red">Error</UiBadge>
      </div>
      <div class="flex items-center gap-2">
        <UiBadge>Default</UiBadge>
        <UiBadge variant="zinc">Muted</UiBadge>
      </div>
    </div>
  </template>

  <!-- ALERT -->
  <template v-else-if="id === 'alert'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-2 px-5">
      <UiAlert variant="info" title="Update available">A new version is ready to install.</UiAlert>
      <UiAlert variant="success" title="Saved!">Your changes have been saved.</UiAlert>
      <UiAlert variant="error" title="Error">Failed to connect to server.</UiAlert>
    </div>
  </template>

  <!-- TOAST -->
  <template v-else-if="id === 'toast'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-end justify-end gap-2 p-4">
      <UiToast title="Changes saved" description="Your profile was updated." variant="success" :duration="0" />
      <UiToast title="Upload failed" description="Max file size exceeded." variant="error" :duration="0" />
    </div>
  </template>

  <!-- SPINNER -->
  <template v-else-if="id === 'spinner'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center gap-6">
      <div class="flex flex-col items-center gap-2">
        <UiSpinner size="lg" variant="primary" />
        <span class="text-xs text-zinc-500">Primary</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <UiSpinner size="md" variant="white" />
        <span class="text-xs text-zinc-500">White</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <UiSpinner size="sm" variant="muted" />
        <span class="text-xs text-zinc-500">Muted</span>
      </div>
    </div>
  </template>

  <!-- PROGRESS -->
  <template v-else-if="id === 'progress'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-4 px-8">
      <UiProgress :value="75" label="Upload" show-value size="md" />
      <UiProgress :value="42" variant="success" size="md" label="Storage" show-value />
      <UiProgress :value="85" variant="warning" size="lg" label="CPU" show-value />
    </div>
  </template>

  <!-- MODAL -->
  <template v-else-if="id === 'modal'">
    <div class="absolute inset-0 bg-zinc-950/60 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div class="w-full max-w-[220px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        <div class="p-4 border-b border-zinc-800 flex items-center justify-between">
          <span class="text-sm font-semibold text-white">Confirm deletion</span>
          <div class="w-5 h-5 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <svg class="w-3 h-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round"/></svg>
          </div>
        </div>
        <div class="p-4 text-xs text-zinc-400">
          Are you sure you want to delete this item? This action cannot be undone.
        </div>
        <div class="px-4 pb-4 flex gap-2">
          <UiButton size="sm" variant="ghost" class="flex-1">Cancel</UiButton>
          <UiButton size="sm" variant="danger" class="flex-1">Delete</UiButton>
        </div>
      </div>
    </div>
  </template>

  <!-- TOOLTIP -->
  <template v-else-if="id === 'tooltip'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center gap-6">
      <UiTooltip content="Copy to clipboard" placement="top">
        <UiButton size="sm" variant="ghost">Hover me</UiButton>
      </UiTooltip>
      <UiTooltip content="View details" placement="bottom">
        <UiIconButton label="Info" variant="secondary">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg>
        </UiIconButton>
      </UiTooltip>
    </div>
  </template>

  <!-- DROPDOWN -->
  <template v-else-if="id === 'dropdown'">
    <div class="absolute inset-0 bg-zinc-950 flex items-start justify-center pt-8 px-4">
      <div class="flex flex-col gap-1.5">
        <UiDropdown :items="dropdownItems">
          <UiButton size="sm" variant="secondary">
            Options
            <svg class="w-3.5 h-3.5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round"/></svg>
          </UiButton>
        </UiDropdown>
      </div>
    </div>
  </template>

  <!-- CARD -->
  <template v-else-if="id === 'card'">
    <div class="absolute inset-0 bg-zinc-950 flex items-center justify-center gap-3 p-4">
      <UiCard hoverable class="flex-1">
        <p class="text-sm font-semibold text-white">Analytics</p>
        <p class="text-xs text-zinc-500 mt-1">Track your performance metrics in real time.</p>
        <p class="text-2xl font-bold text-indigo-400 mt-3">+24.3%</p>
      </UiCard>
      <UiCard hoverable class="flex-1">
        <p class="text-sm font-semibold text-white">Revenue</p>
        <p class="text-xs text-zinc-500 mt-1">Monthly recurring revenue overview.</p>
        <p class="text-2xl font-bold text-green-400 mt-3">$12.8k</p>
      </UiCard>
    </div>
  </template>

  <!-- AVATAR -->
  <template v-else-if="id === 'avatar'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-5">
      <div class="flex items-center -space-x-2">
        <UiAvatar name="Alice M" color="indigo" size="sm" />
        <UiAvatar name="Bob C"   color="green"  size="sm" />
        <UiAvatar name="Sara L"  color="amber"  size="sm" />
        <UiAvatar name="Tom K"   color="pink"   size="sm" />
        <div class="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-[10px] font-semibold text-zinc-400">+3</div>
      </div>
      <div class="flex items-center gap-3">
        <UiAvatar name="Elvin Kyungu" color="indigo" size="md" :online="true" />
        <div>
          <p class="text-sm font-medium text-white">Elvin Kyungu</p>
          <p class="text-xs text-zinc-500">Admin · Online</p>
        </div>
      </div>
    </div>
  </template>

  <!-- TABLE -->
  <template v-else-if="id === 'table'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col p-3 gap-2 overflow-hidden">
      <UiTable :columns="tableColumns" :rows="tableRows">
        <template #status="{ value }">
          <div class="flex justify-end">
            <UiBadge :variant="value === 'Active' ? 'green' : 'zinc'">{{ value }}</UiBadge>
          </div>
        </template>
      </UiTable>
    </div>
  </template>

  <!-- TAG -->
  <template v-else-if="id === 'tag'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3 px-6">
      <div class="flex flex-wrap gap-1.5 justify-center">
        <UiTag variant="indigo">TypeScript</UiTag>
        <UiTag variant="green">Vue 3</UiTag>
        <UiTag variant="amber">Beta</UiTag>
        <UiTag>Nuxt 4</UiTag>
        <UiTag variant="red" removable>Deprecated</UiTag>
      </div>
    </div>
  </template>

</template>
