export interface PropDef {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export interface ComponentItem {
  id: string
  name: string
  isNew?: boolean
}

export interface Category {
  id: string
  name: string
  items: ComponentItem[]
}

export interface ComponentDoc {
  id: string
  name: string
  category: string
  categoryId: string
  isNew?: boolean
  description: string
  props: PropDef[]
  usage: string
  filename?: string  // override when id doesn't match Ui{PascalCase}.vue (e.g. switch → UiToggle)
}

export const categories: Category[] = [
  {
    id: 'buttons',
    name: 'Buttons',
    items: [
      { id: 'button',       name: 'Button' },
      { id: 'icon-button',  name: 'Icon Button',   isNew: true },
      { id: 'button-group', name: 'Button Group' },
    ],
  },
  {
    id: 'forms',
    name: 'Forms',
    items: [
      { id: 'input',    name: 'Input' },
      { id: 'textarea', name: 'Textarea' },
      { id: 'select',   name: 'Select' },
      { id: 'checkbox', name: 'Checkbox' },
      { id: 'switch',   name: 'Switch', isNew: true },
    ],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    items: [
      { id: 'tabs',       name: 'Tabs' },
      { id: 'breadcrumb', name: 'Breadcrumb' },
      { id: 'pagination', name: 'Pagination' },
    ],
  },
  {
    id: 'feedback',
    name: 'Feedback',
    items: [
      { id: 'badge',    name: 'Badge' },
      { id: 'alert',    name: 'Alert',    isNew: true },
      { id: 'toast',    name: 'Toast' },
      { id: 'spinner',  name: 'Spinner' },
      { id: 'progress', name: 'Progress' },
    ],
  },
  {
    id: 'overlay',
    name: 'Overlay',
    items: [
      { id: 'modal',    name: 'Modal' },
      { id: 'tooltip',  name: 'Tooltip' },
      { id: 'dropdown', name: 'Dropdown' },
    ],
  },
  {
    id: 'data-display',
    name: 'Data Display',
    items: [
      { id: 'card',   name: 'Card' },
      { id: 'avatar', name: 'Avatar' },
      { id: 'table',  name: 'Table' },
      { id: 'tag',    name: 'Tag' },
    ],
  },
]

export const allItems = categories.flatMap(c =>
  c.items.map(i => ({ ...i, categoryId: c.id, categoryName: c.name })),
)

export const componentDocs: Record<string, ComponentDoc> = {
  button: {
    id: 'button',
    name: 'Button',
    category: 'Buttons',
    categoryId: 'buttons',
    description: 'Interactive button with multiple variants, sizes, and GSAP micro-interactions on hover and press.',
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual style of the button' },
      { name: 'size',    type: "'sm' | 'md' | 'lg'",                          default: "'md'",       description: 'Size preset controlling padding and font size' },
      { name: 'disabled', type: 'boolean',                                    default: 'false',      description: 'Disables the button and prevents all interactions' },
    ],
    usage: `<UiButton variant="primary" size="md">Get started</UiButton>
<UiButton variant="secondary">Learn more</UiButton>
<UiButton variant="ghost" size="sm">Cancel</UiButton>
<UiButton variant="danger">Delete account</UiButton>
<UiButton disabled>Not available</UiButton>`,
  },

  'icon-button': {
    id: 'icon-button',
    name: 'Icon Button',
    category: 'Buttons',
    categoryId: 'buttons',
    isNew: true,
    description: 'Square button designed to hold a single icon with the same variants as the Button component.',
    props: [
      { name: 'label',   type: 'string',                                        required: true,  description: 'Accessible label (aria-label) — required for screen readers' },
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'",  default: "'secondary'", description: 'Visual style of the button' },
      { name: 'size',    type: "'sm' | 'md' | 'lg'",                            default: "'md'",        description: 'Size preset (sm = 28px, md = 36px, lg = 44px)' },
      { name: 'disabled', type: 'boolean',                                      default: 'false',       description: 'Disables the button' },
    ],
    usage: `<UiIconButton label="Add item" variant="ghost">
  <Icon name="lucide:plus" class="w-4 h-4" />
</UiIconButton>

<UiIconButton label="Delete" variant="danger">
  <Icon name="lucide:trash-2" class="w-4 h-4" />
</UiIconButton>`,
  },

  'button-group': {
    id: 'button-group',
    name: 'Button Group',
    category: 'Buttons',
    categoryId: 'buttons',
    description: 'Group of related buttons — available as joined border group or segmented control.',
    props: [
      { name: 'items',      type: '{ label: string; value: string; disabled?: boolean }[]', required: true,  description: 'Array of button items to render' },
      { name: 'modelValue', type: 'string',                                                 default: 'undefined', description: 'Currently selected value (use v-model)' },
      { name: 'variant',    type: "'default' | 'segmented'",                               default: "'default'",  description: 'Layout variant — default is joined, segmented is pill-style' },
    ],
    usage: `<UiButtonGroup
  v-model="view"
  :items="[
    { label: 'Day',   value: 'day' },
    { label: 'Week',  value: 'week' },
    { label: 'Month', value: 'month' },
  ]"
/>

<!-- Segmented control -->
<UiButtonGroup
  variant="segmented"
  v-model="layout"
  :items="[
    { label: 'Grid',  value: 'grid' },
    { label: 'List',  value: 'list' },
  ]"
/>`,
  },

  input: {
    id: 'input',
    name: 'Input',
    category: 'Forms',
    categoryId: 'forms',
    description: 'Text input with label, placeholder, error and hint states. Fully keyboard-accessible.',
    props: [
      { name: 'modelValue',  type: 'string',  default: "''",        description: 'Bound value (use v-model)' },
      { name: 'label',       type: 'string',  default: 'undefined', description: 'Label displayed above the input' },
      { name: 'placeholder', type: 'string',  default: 'undefined', description: 'Placeholder text' },
      { name: 'type',        type: 'string',  default: "'text'",    description: 'HTML input type (text, email, password, number…)' },
      { name: 'disabled',    type: 'boolean', default: 'false',     description: 'Disables the input' },
      { name: 'error',       type: 'string',  default: 'undefined', description: 'Error message — also applies error border styling' },
      { name: 'hint',        type: 'string',  default: 'undefined', description: 'Hint text shown below the input (hidden when error is set)' },
    ],
    usage: `<UiInput v-model="email" label="Email" type="email" placeholder="you@example.com" />

<UiInput
  v-model="username"
  label="Username"
  placeholder="johndoe"
  error="Username is already taken"
/>

<UiInput v-model="name" label="Full name" hint="As it appears on your ID" />`,
  },

  textarea: {
    id: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    categoryId: 'forms',
    description: 'Multi-line text input with the same label, error, and hint system as the Input component.',
    props: [
      { name: 'modelValue',  type: 'string',  default: "''",        description: 'Bound value (use v-model)' },
      { name: 'label',       type: 'string',  default: 'undefined', description: 'Label displayed above the textarea' },
      { name: 'placeholder', type: 'string',  default: 'undefined', description: 'Placeholder text' },
      { name: 'rows',        type: 'number',  default: '4',         description: 'Number of visible rows' },
      { name: 'disabled',    type: 'boolean', default: 'false',     description: 'Disables the textarea' },
      { name: 'error',       type: 'string',  default: 'undefined', description: 'Error message' },
      { name: 'hint',        type: 'string',  default: 'undefined', description: 'Hint text (hidden when error is set)' },
    ],
    usage: `<UiTextarea
  v-model="message"
  label="Message"
  placeholder="Write your message here…"
  :rows="5"
  hint="Maximum 500 characters"
/>`,
  },

  select: {
    id: 'select',
    name: 'Select',
    category: 'Forms',
    categoryId: 'forms',
    description: 'Custom dropdown select — fully styled, no native browser UI. Supports keyboard navigation and GSAP animation.',
    props: [
      { name: 'options',     type: '{ label: string; value: string | number; disabled?: boolean }[]', required: true,       description: 'Array of options to display' },
      { name: 'modelValue',  type: 'string | number',                                                  default: 'undefined', description: 'Selected value (use v-model)' },
      { name: 'label',       type: 'string',                                                            default: 'undefined', description: 'Label displayed above the select' },
      { name: 'placeholder', type: 'string',                                                            default: 'undefined', description: 'Shown when no value is selected' },
      { name: 'disabled',    type: 'boolean',                                                           default: 'false',     description: 'Disables the select' },
      { name: 'error',       type: 'string',                                                            default: 'undefined', description: 'Error message' },
      { name: 'hint',        type: 'string',                                                            default: 'undefined', description: 'Hint text (hidden when error is set)' },
    ],
    usage: `<UiSelect
  v-model="plan"
  label="Plan"
  placeholder="Choose a plan"
  :options="[
    { label: 'Free',        value: 'free' },
    { label: 'Pro — $12/mo', value: 'pro' },
    { label: 'Enterprise',  value: 'enterprise' },
  ]"
/>`,
  },

  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    categoryId: 'forms',
    description: 'Accessible checkbox with label, indeterminate state, and a GSAP check animation on selection.',
    props: [
      { name: 'modelValue',    type: 'boolean', default: 'false',     description: 'Checked state (use v-model)' },
      { name: 'label',         type: 'string',  default: 'undefined', description: 'Label text — can also use the default slot' },
      { name: 'disabled',      type: 'boolean', default: 'false',     description: 'Disables the checkbox' },
      { name: 'indeterminate', type: 'boolean', default: 'false',     description: 'Shows an indeterminate (dash) state — useful for "select all" scenarios' },
    ],
    usage: `<UiCheckbox v-model="accepted" label="Accept terms and conditions" />

<!-- Indeterminate (select all) -->
<UiCheckbox
  v-model="allSelected"
  :indeterminate="someSelected && !allSelected"
  label="Select all"
/>`,
  },

  switch: {
    id: 'switch',
    name: 'Switch',
    filename: 'UiToggle',
    category: 'Forms',
    categoryId: 'forms',
    isNew: true,
    description: 'Animated toggle switch with a spring-based GSAP thumb animation. Use via UiToggle component.',
    props: [
      { name: 'modelValue', type: 'boolean', default: 'false', description: 'On/off state (use v-model)' },
    ],
    usage: `<div class="flex items-center gap-3">
  <UiToggle v-model="darkMode" />
  <span class="text-sm text-zinc-300">Dark mode</span>
</div>

<div class="flex items-center gap-3">
  <UiToggle v-model="notifications" />
  <span class="text-sm text-zinc-300">Enable notifications</span>
</div>`,
  },

  tabs: {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    categoryId: 'navigation',
    description: 'Tab navigation with animated indicator. Available in underline and pill variants. Content projection via default slot.',
    props: [
      { name: 'modelValue', type: 'string',                                            required: true,     description: 'Active tab id (use v-model)' },
      { name: 'tabs',       type: '{ id: string; label: string; disabled?: boolean }[]', required: true,  description: 'Array of tab definitions' },
      { name: 'variant',    type: "'underline' | 'pill'",                              default: "'underline'", description: 'Visual variant — underline uses an animated indicator, pill uses background' },
    ],
    usage: `<UiTabs
  v-model="activeTab"
  :tabs="[
    { id: 'overview',  label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings',  label: 'Settings' },
  ]"
>
  <div v-if="activeTab === 'overview'">Overview content</div>
  <div v-if="activeTab === 'analytics'">Analytics content</div>
  <div v-if="activeTab === 'settings'">Settings content</div>
</UiTabs>`,
  },

  breadcrumb: {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation',
    categoryId: 'navigation',
    description: 'Accessible breadcrumb navigation. The last item is always rendered as the current page (non-clickable).',
    props: [
      { name: 'items', type: '{ label: string; href?: string }[]', required: true, description: 'Ordered array of breadcrumb items. Last item is the current page.' },
    ],
    usage: `<UiBreadcrumb
  :items="[
    { label: 'Home',       href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb' },
  ]"
/>`,
  },

  pagination: {
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    categoryId: 'navigation',
    description: 'Page navigator with smart ellipsis logic. Renders prev/next arrows and a configurable window of page numbers around the current page.',
    props: [
      { name: 'modelValue', type: 'number',  required: true,       description: 'Current page number (use v-model)' },
      { name: 'total',      type: 'number',  required: true,       description: 'Total number of items' },
      { name: 'perPage',    type: 'number',  default: '10',        description: 'Items per page — used to calculate total pages' },
      { name: 'siblings',   type: 'number',  default: '1',         description: 'Number of page buttons shown on each side of the current page' },
    ],
    usage: `<UiPagination v-model="page" :total="247" :per-page="20" />

<!-- With more siblings -->
<UiPagination v-model="page" :total="500" :per-page="10" :siblings="2" />`,
  },

  badge: {
    id: 'badge',
    name: 'Badge',
    category: 'Feedback',
    categoryId: 'feedback',
    description: 'Small pill label for status, category, or metadata. Uses a slot so any content can be placed inside.',
    props: [
      { name: 'variant', type: "'default' | 'indigo' | 'green' | 'red' | 'zinc'", default: "'default'", description: 'Color variant of the badge' },
    ],
    usage: `<UiBadge>Default</UiBadge>
<UiBadge variant="indigo">TypeScript</UiBadge>
<UiBadge variant="green">Active</UiBadge>
<UiBadge variant="red">Deprecated</UiBadge>
<UiBadge variant="zinc">Draft</UiBadge>`,
  },

  alert: {
    id: 'alert',
    name: 'Alert',
    category: 'Feedback',
    categoryId: 'feedback',
    isNew: true,
    description: 'Contextual feedback message with an icon, optional title, and a dismiss button. Supports info, success, warning, and error states.',
    props: [
      { name: 'variant',     type: "'info' | 'success' | 'warning' | 'error'", default: "'info'",  description: 'Semantic variant — controls icon and color scheme' },
      { name: 'title',       type: 'string',                                    default: 'undefined', description: 'Optional bold title shown above the message' },
      { name: 'dismissible', type: 'boolean',                                   default: 'false',     description: 'Shows a close button that hides the alert on click' },
    ],
    usage: `<UiAlert variant="info" title="Heads up!">
  This action will affect all users in your organization.
</UiAlert>

<UiAlert variant="success" title="Saved!" dismissible>
  Your changes have been saved successfully.
</UiAlert>

<UiAlert variant="warning">
  Your trial expires in 3 days.
</UiAlert>

<UiAlert variant="error" title="Something went wrong">
  Unable to connect to the server. Please try again.
</UiAlert>`,
  },

  toast: {
    id: 'toast',
    name: 'Toast',
    category: 'Feedback',
    categoryId: 'feedback',
    description: 'Floating notification with GSAP slide-in animation and optional auto-dismiss timer. Typically rendered from a composable or a fixed container.',
    props: [
      { name: 'title',       type: 'string',                                          required: true,   description: 'Main notification text' },
      { name: 'variant',     type: "'default' | 'success' | 'error' | 'warning'",     default: "'default'", description: 'Semantic variant — controls the icon and icon color' },
      { name: 'description', type: 'string',                                          default: 'undefined', description: 'Optional secondary line of text below the title' },
      { name: 'duration',    type: 'number',                                          default: '4000',      description: 'Auto-dismiss delay in ms. Set to 0 to disable.' },
    ],
    usage: `<UiToast
  title="Changes saved"
  description="Your profile has been updated."
  variant="success"
/>

<UiToast
  title="Upload failed"
  description="Max file size is 10 MB."
  variant="error"
  :duration="0"
  @close="removeToast"
/>`,
  },

  spinner: {
    id: 'spinner',
    name: 'Spinner',
    category: 'Feedback',
    categoryId: 'feedback',
    description: 'Lightweight CSS-animated loading indicator. Three sizes and three color variants to match any surface.',
    props: [
      { name: 'size',    type: "'sm' | 'md' | 'lg'",             default: "'md'",      description: 'Size of the spinner (sm = 16px, md = 24px, lg = 36px)' },
      { name: 'variant', type: "'primary' | 'white' | 'muted'",  default: "'primary'", description: 'Color variant — primary is indigo, white is for dark buttons, muted is zinc' },
    ],
    usage: `<UiSpinner />
<UiSpinner size="lg" variant="white" />
<UiSpinner size="sm" variant="muted" />`,
  },

  progress: {
    id: 'progress',
    name: 'Progress',
    category: 'Feedback',
    categoryId: 'feedback',
    description: 'Horizontal progress bar with smooth CSS transition. Supports an optional label and value display, three sizes, and four color variants.',
    props: [
      { name: 'value',     type: 'number',                                        required: true,       description: 'Fill percentage — clamped between 0 and 100' },
      { name: 'size',      type: "'sm' | 'md' | 'lg'",                            default: "'md'",      description: 'Track height (sm = 6px, md = 8px, lg = 12px)' },
      { name: 'variant',   type: "'default' | 'success' | 'warning' | 'danger'",  default: "'default'", description: 'Fill color — default is indigo' },
      { name: 'label',     type: 'string',                                        default: 'undefined', description: 'Label text shown above the bar on the left' },
      { name: 'showValue', type: 'boolean',                                       default: 'false',     description: 'Shows the percentage value above the bar on the right' },
    ],
    usage: `<UiProgress :value="72" label="Storage used" show-value />

<UiProgress :value="100" variant="success" size="sm" />
<UiProgress :value="55" variant="warning" />
<UiProgress :value="30" variant="danger" size="lg" />`,
  },

  modal: {
    id: 'modal',
    name: 'Modal',
    category: 'Overlay',
    categoryId: 'overlay',
    description: 'Accessible dialog with GSAP open animation, backdrop blur, ESC key support, and named slots for header and footer.',
    props: [
      { name: 'modelValue', type: 'boolean', required: true,       description: 'Controls visibility (use v-model)' },
      { name: 'title',      type: 'string',  default: 'undefined', description: 'Title text rendered in the header — leave empty to use the header slot' },
      { name: 'size',       type: "'sm' | 'md' | 'lg'",            default: "'md'", description: 'Max width of the panel (sm = 384px, md = 512px, lg = 672px)' },
    ],
    usage: `<UiButton @click="open = true">Open modal</UiButton>

<UiModal v-model="open" title="Confirm deletion" size="sm">
  Are you sure you want to delete this item? This action cannot be undone.
  <template #footer>
    <UiButton variant="ghost" @click="open = false">Cancel</UiButton>
    <UiButton variant="danger" @click="confirmDelete">Delete</UiButton>
  </template>
</UiModal>`,
  },

  tooltip: {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Overlay',
    categoryId: 'overlay',
    description: 'Hover or focus tooltip with GSAP scale-in animation. Wraps any trigger element via the default slot.',
    props: [
      { name: 'content',   type: 'string',                              required: true,   description: 'Text content of the tooltip' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Position relative to the trigger element' },
      { name: 'delay',     type: 'number',                              default: '100',   description: 'Show delay in milliseconds' },
    ],
    usage: `<UiTooltip content="Copy to clipboard" placement="top">
  <UiIconButton label="Copy" variant="ghost">
    <Icon name="lucide:copy" class="w-4 h-4" />
  </UiIconButton>
</UiTooltip>

<UiTooltip content="Opens in a new tab" placement="right">
  <UiButton variant="secondary" size="sm">Learn more</UiButton>
</UiTooltip>`,
  },

  dropdown: {
    id: 'dropdown',
    name: 'Dropdown',
    category: 'Overlay',
    categoryId: 'overlay',
    description: 'Context menu with GSAP open animation, click-outside dismissal, dividers, danger items, and disabled states. Wraps any trigger via the default slot.',
    props: [
      { name: 'items',     type: '{ label: string; icon?: string; action?: () => void; divider?: boolean; danger?: boolean; disabled?: boolean }[]', required: true, description: 'Array of menu items — set divider: true to render a separator' },
      { name: 'placement', type: "'bottom-left' | 'bottom-right'",                                                                                   default: "'bottom-left'", description: 'Alignment of the dropdown panel relative to the trigger' },
    ],
    usage: `<UiDropdown
  :items="[
    { label: 'Edit',     icon: 'lucide:pencil', action: () => edit() },
    { label: 'Duplicate',icon: 'lucide:copy',   action: () => duplicate() },
    { divider: true },
    { label: 'Delete',   icon: 'lucide:trash-2',danger: true, action: () => remove() },
  ]"
>
  <UiButton variant="ghost" size="sm">Options</UiButton>
</UiDropdown>`,
  },

  card: {
    id: 'card',
    name: 'Card',
    category: 'Data Display',
    categoryId: 'data-display',
    description: 'Versatile container with configurable padding and an optional hover lift effect. Accepts any content via the default slot.',
    props: [
      { name: 'padding',   type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'",   description: 'Inner padding (none = 0, sm = 12px, md = 20px, lg = 28px)' },
      { name: 'hoverable', type: 'boolean',                     default: 'false',  description: 'Adds a lift shadow and border highlight on hover' },
    ],
    usage: `<UiCard>
  <h3 class="text-white font-semibold">Card title</h3>
  <p class="text-zinc-400 text-sm mt-1">Card content goes here.</p>
</UiCard>

<!-- Hoverable card -->
<UiCard hoverable padding="lg">
  <h3 class="text-white font-semibold">Clickable card</h3>
  <p class="text-zinc-400 text-sm mt-1">Hover to see the lift effect.</p>
</UiCard>`,
  },

  avatar: {
    id: 'avatar',
    name: 'Avatar',
    category: 'Data Display',
    categoryId: 'data-display',
    description: 'User avatar with image support, auto-generated initials, five sizes, six color variants, and an online/offline indicator.',
    props: [
      { name: 'name',   type: 'string',                                        default: 'undefined', description: 'User name — used to generate initials when no src is provided' },
      { name: 'src',    type: 'string',                                        default: 'undefined', description: 'Image URL — when set, renders an <img> instead of initials' },
      { name: 'size',   type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",            default: "'md'",      description: 'Size preset (xs = 24px … xl = 64px)' },
      { name: 'color',  type: "'indigo' | 'green' | 'amber' | 'red' | 'pink' | 'zinc'", default: "'indigo'", description: 'Background color for the initials avatar' },
      { name: 'online', type: 'boolean',                                       default: 'undefined', description: 'When set, shows a green (true) or grey (false) status dot' },
    ],
    usage: `<UiAvatar name="Elvin Kyungu" size="md" :online="true" />
<UiAvatar name="Jane Doe" size="lg" color="green" :online="false" />
<UiAvatar src="/avatar.jpg" name="Alex" size="xl" />

<!-- Avatar group -->
<div class="flex -space-x-2">
  <UiAvatar name="Alice" color="indigo" size="sm" />
  <UiAvatar name="Bob"   color="green"  size="sm" />
  <UiAvatar name="Carol" color="amber"  size="sm" />
</div>`,
  },

  table: {
    id: 'table',
    name: 'Table',
    category: 'Data Display',
    categoryId: 'data-display',
    description: 'Data table with named column slots, striped rows, hover highlight, and a skeleton loading state.',
    props: [
      { name: 'columns',   type: '{ key: string; label: string; width?: string; align?: "left" | "center" | "right" }[]', required: true, description: 'Column definitions — key maps to the slot name and row property' },
      { name: 'rows',      type: 'Record<string, unknown>[]',                                                              required: true, description: 'Array of row data objects' },
      { name: 'loading',   type: 'boolean',                                                                                default: 'false', description: 'Shows a pulsing skeleton instead of rows' },
      { name: 'striped',   type: 'boolean',                                                                                default: 'false', description: 'Alternates row background colors' },
      { name: 'hoverable', type: 'boolean',                                                                                default: 'true',  description: 'Highlights rows on hover' },
    ],
    usage: `<UiTable
  :columns="[
    { key: 'name',   label: 'Name' },
    { key: 'role',   label: 'Role' },
    { key: 'status', label: 'Status', align: 'center' },
  ]"
  :rows="[
    { name: 'Alice Martin', role: 'Engineer',  status: 'Active' },
    { name: 'Bob Chen',     role: 'Designer',  status: 'Active' },
    { name: 'Carol Smith',  role: 'Manager',   status: 'Pending' },
  ]"
  striped
>
  <template #status="{ value }">
    <UiBadge :variant="value === 'Active' ? 'green' : 'default'">{{ value }}</UiBadge>
  </template>
</UiTable>`,
  },

  tag: {
    id: 'tag',
    name: 'Tag',
    category: 'Data Display',
    categoryId: 'data-display',
    description: 'Pill-shaped label with optional remove button. Useful for filtering, search chips, and multi-select UIs.',
    props: [
      { name: 'variant',   type: "'default' | 'indigo' | 'green' | 'amber' | 'red'", default: "'default'", description: 'Color variant' },
      { name: 'removable', type: 'boolean',                                           default: 'false',     description: 'Shows a × button that emits the remove event' },
    ],
    usage: `<UiTag>Design</UiTag>
<UiTag variant="indigo">Vue 3</UiTag>
<UiTag variant="green" removable @remove="removeTag('nuxt')">Nuxt</UiTag>
<UiTag variant="amber">Beta</UiTag>
<UiTag variant="red" removable @remove="removeTag('deprecated')">Deprecated</UiTag>`,
  },
}
