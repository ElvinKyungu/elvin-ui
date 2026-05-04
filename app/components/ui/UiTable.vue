<script setup lang="ts">
interface Column {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface Props {
  columns: Column[]
  rows: Record<string, unknown>[]
  loading?: boolean
  striped?: boolean
  hoverable?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  striped: false,
  hoverable: true,
})
</script>

<template>
  <div class="w-full overflow-x-auto rounded-xl border border-zinc-800">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-zinc-800 bg-zinc-900">
          <th
            v-for="col in columns"
            :key="col.key"
            :style="col.width ? `width: ${col.width}` : ''"
            :class="[
              'px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider',
              col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
            ]"
          >{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="i in 3" :key="i" class="border-b border-zinc-800/60 last:border-0">
            <td v-for="col in columns" :key="col.key" class="px-4 py-3">
              <div class="h-3 bg-zinc-800 rounded-full animate-pulse" :style="{ width: `${40 + Math.random() * 40}%` }" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="(row, ri) in rows"
            :key="ri"
            :class="[
              'border-b border-zinc-800/60 last:border-0 transition-colors',
              striped && ri % 2 === 1 && 'bg-zinc-900/30',
              hoverable && 'hover:bg-zinc-800/30',
            ]"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="[
                'px-4 py-3 text-zinc-300',
                col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
              ]"
            >
              <slot :name="col.key" :value="row[col.key]" :row="row">{{ row[col.key] }}</slot>
            </td>
          </tr>
          <tr v-if="!rows.length">
            <td :colspan="columns.length" class="px-4 py-8 text-center text-zinc-500 text-sm">No data</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<!--
USAGE:
<UiTable
  :columns="[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }]"
  :rows="[{ name: 'Alice', status: 'Active' }, { name: 'Bob', status: 'Pending' }]"
>
  <template #status="{ value }">
    <UiBadge :variant="value === 'Active' ? 'green' : 'default'">{{ value }}</UiBadge>
  </template>
</UiTable>
-->
