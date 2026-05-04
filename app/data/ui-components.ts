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
}
