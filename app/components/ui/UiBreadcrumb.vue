<script setup lang="ts">
interface Item {
  label: string
  href?: string
}

interface Props {
  items: Item[]
}

defineProps<Props>()
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center flex-wrap gap-1">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="flex items-center gap-1"
      >
        <component
          :is="item.href && i < items.length - 1 ? 'a' : 'span'"
          :href="item.href"
          :aria-current="i === items.length - 1 ? 'page' : undefined"
          :class="[
            'text-sm transition-colors duration-150',
            i === items.length - 1
              ? 'text-zinc-200 font-medium'
              : item.href
                ? 'text-zinc-500 hover:text-zinc-200 cursor-pointer'
                : 'text-zinc-500',
          ]"
        >{{ item.label }}</component>
        <svg
          v-if="i < items.length - 1"
          class="w-3.5 h-3.5 text-zinc-700 flex-shrink-0"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        >
          <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<!--
USAGE:
<UiBreadcrumb :items="[
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumb' },
]" />
-->
