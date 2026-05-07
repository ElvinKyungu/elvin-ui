<script setup lang="ts">
interface Props {
  modelValue: number
  total: number
  perPage?: number
  siblings?: number
}

const props = withDefaults(defineProps<Props>(), {
  perPage: 10,
  siblings: 1,
})

const emit = defineEmits<{ 'update:modelValue': [page: number] }>()

const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const pages = computed(() => {
  const current = props.modelValue
  const total = totalPages.value
  const s = props.siblings

  const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i)

  if (total <= 2 * s + 5) return range(1, total)

  const left = Math.max(current - s, 1)
  const right = Math.min(current + s, total)

  const showLeftDots = left > 2
  const showRightDots = right < total - 1

  const result: (number | '...')[] = [1]
  if (showLeftDots) result.push('...')
  result.push(...range(Math.max(left, 2), Math.min(right, total - 1)))
  if (showRightDots) result.push('...')
  result.push(total)

  return result
})

function go(page: number | '...') {
  if (page === '...' || page === props.modelValue) return
  emit('update:modelValue', page)
}
</script>

<template>
  <nav aria-label="Pagination" class="flex items-center gap-1">
    <!-- Prev -->
    <button
      @click="go(modelValue - 1)"
      :disabled="modelValue === 1"
      class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
      aria-label="Previous page"
    >
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <!-- Pages -->
    <button
      v-for="(page, i) in pages"
      :key="i"
      @click="go(page)"
      :disabled="page === '...'"
      :aria-current="page === modelValue ? 'page' : undefined"
      :class="[
        'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150',
        page === modelValue
          ? 'bg-emerald-500 text-white border border-emerald-500'
          : page === '...'
            ? 'text-zinc-600 cursor-default'
            : 'border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800',
      ]"
    >{{ page }}</button>

    <!-- Next -->
    <button
      @click="go(modelValue + 1)"
      :disabled="modelValue === totalPages"
      class="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
      aria-label="Next page"
    >
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </nav>
</template>

<!--
USAGE:
<UiPagination v-model="page" :total="247" :per-page="20" />
-->
