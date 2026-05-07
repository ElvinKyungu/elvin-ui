<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>

  <!-- SaaS Landing -->
  <template v-if="id === 'saas-landing'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-3 gap-3">
          <div class="w-2 h-2 bg-white rounded-[2px]" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-5 bg-zinc-700 rounded-full" /><div class="h-1 w-5 bg-zinc-700 rounded-full" /><div class="h-1 w-5 bg-zinc-700 rounded-full" /></div>
          <div class="h-3 w-8 bg-accent rounded-md ml-1" />
        </div>
        <div class="flex-1 flex flex-col items-center justify-center gap-1.5 px-4 relative">
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgb(var(--color-accent)/0.15),transparent_65%)]" />
          <div class="h-1.5 w-8 bg-accent/50 rounded-full" />
          <div class="h-2 w-28 bg-zinc-200 rounded-full" />
          <div class="h-1.5 w-20 bg-zinc-600 rounded-full" />
          <div class="h-1 w-16 bg-zinc-700/60 rounded-full" />
          <div class="flex gap-1.5 mt-1"><div class="h-4 w-12 bg-accent rounded-md" /><div class="h-4 w-12 border border-zinc-700 rounded-md" /></div>
        </div>
        <div class="h-8 border-t border-zinc-800/60 flex items-center justify-center gap-3 px-3">
          <div v-for="i in 5" :key="i" class="h-1 w-6 bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- SaaS Pricing -->
  <template v-else-if="id === 'saas-pricing'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col p-3 gap-2">
        <div class="flex flex-col items-center gap-1">
          <div class="h-2 w-16 bg-zinc-300 rounded-full" />
          <div class="h-1.5 w-24 bg-zinc-600 rounded-full" />
          <div class="flex gap-1 mt-0.5 p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div class="h-3 w-10 bg-zinc-700 rounded-md" />
            <div class="h-3 w-10 bg-transparent rounded-md" />
          </div>
        </div>
        <div class="flex gap-1.5 flex-1">
          <div v-for="i in [0,1,2]" :key="i"
            class="flex-1 rounded-lg border p-1.5 flex flex-col gap-1"
            :class="i === 1 ? 'bg-accent/10 border-accent/30' : 'bg-zinc-900 border-zinc-800'"
          >
            <div class="h-1 w-8 rounded-full" :class="i === 1 ? 'bg-accent/60' : 'bg-zinc-600'" />
            <div class="h-2.5 w-10 rounded-md" :class="i === 1 ? 'bg-accent' : 'bg-zinc-400'" />
            <div class="mt-1 space-y-0.5 flex-1">
              <div v-for="j in 4" :key="j" class="flex items-center gap-1">
                <div class="w-1.5 h-1.5 rounded-full" :class="i === 1 ? 'bg-accent/50' : 'bg-zinc-700'" />
                <div class="h-1 rounded-full flex-1" :class="i === 1 ? 'bg-accent/20' : 'bg-zinc-800'" />
              </div>
            </div>
            <div class="h-3 rounded-md mt-auto" :class="i === 1 ? 'bg-accent' : 'bg-zinc-800'" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- SaaS Docs -->
  <template v-else-if="id === 'saas-docs'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex">
        <div class="w-16 border-r border-zinc-800/60 p-2 flex flex-col gap-1.5">
          <div class="h-1.5 w-10 bg-accent/50 rounded-full" />
          <div v-for="i in 5" :key="i" class="h-1 rounded-full" :class="i === 1 ? 'w-8 bg-zinc-400' : 'w-full bg-zinc-800'" />
          <div class="mt-1 h-1 w-full bg-zinc-800 rounded-full" />
          <div v-for="i in 3" :key="i" class="h-1 w-3/4 bg-zinc-800 rounded-full ml-1.5" />
        </div>
        <div class="flex-1 p-3 flex flex-col gap-1.5">
          <div class="h-1.5 w-6 bg-accent/60 rounded-full" />
          <div class="h-2 w-24 bg-zinc-200 rounded-full" />
          <div class="h-1 w-full bg-zinc-700/50 rounded-full" />
          <div class="h-1 w-5/6 bg-zinc-700/50 rounded-full" />
          <div class="mt-1 p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div class="h-1 w-3/4 bg-zinc-600 rounded-full" />
            <div class="h-1 w-1/2 bg-zinc-700 rounded-full mt-0.5" />
          </div>
          <div class="h-1 w-full bg-zinc-700/40 rounded-full" />
          <div class="h-1 w-4/5 bg-zinc-700/40 rounded-full" />
        </div>
      </div>
    </div>
  </template>

  <!-- Analytics Dashboard -->
  <template v-else-if="id === 'dashboard-analytics'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex">
        <div class="w-12 border-r border-zinc-800/60 p-2 flex flex-col items-center gap-2">
          <div class="w-4 h-4 bg-zinc-800 rounded-md" />
          <div v-for="i in 4" :key="i" class="w-4 h-4 rounded-md" :class="i === 1 ? 'bg-accent/30' : 'bg-zinc-900'" />
        </div>
        <div class="flex-1 p-2 flex flex-col gap-2">
          <div class="grid grid-cols-3 gap-1.5">
            <div v-for="i in 3" :key="i" class="bg-zinc-900 border border-zinc-800 rounded-lg p-1.5">
              <div class="h-1 w-8 bg-zinc-600 rounded-full mb-1" />
              <div class="h-2.5 w-10 bg-zinc-200 rounded-md" />
            </div>
          </div>
          <div class="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-2">
            <div class="h-1 w-12 bg-zinc-500 rounded-full mb-2" />
            <div class="flex items-end gap-0.5 h-8">
              <div v-for="(h, i) in [40,65,50,80,60,90,70,55,75,85,60,95]" :key="i"
                class="flex-1 rounded-sm"
                :class="i === 11 ? 'bg-accent/60' : 'bg-zinc-700'"
                :style="{ height: h + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- CRM Dashboard -->
  <template v-else-if="id === 'dashboard-crm'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex">
        <div class="w-12 border-r border-zinc-800/60 p-2 flex flex-col items-center gap-2">
          <div class="w-4 h-4 bg-zinc-800 rounded-md" />
          <div v-for="i in 4" :key="i" class="w-4 h-4 rounded-md" :class="i === 2 ? 'bg-accent/30' : 'bg-zinc-900'" />
        </div>
        <div class="flex-1 p-2 flex flex-col gap-1.5">
          <div class="flex gap-1 items-center">
            <div class="h-1.5 w-14 bg-zinc-300 rounded-full" />
            <div class="ml-auto h-3 w-8 bg-accent rounded-md" />
          </div>
          <div class="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div class="flex gap-2 px-2 py-1 border-b border-zinc-800">
              <div v-for="col in ['Name','Status','Deal','Date']" :key="col" class="h-1 flex-1 bg-zinc-700 rounded-full" />
            </div>
            <div v-for="row in 4" :key="row" class="flex gap-2 px-2 py-1.5 border-b border-zinc-800/40">
              <div class="flex items-center gap-1 flex-1">
                <div class="w-2 h-2 rounded-full bg-zinc-600" />
                <div class="h-1 w-10 bg-zinc-600 rounded-full" />
              </div>
              <div class="flex-1 flex items-center">
                <div class="h-2 w-8 rounded-full" :class="row % 2 === 0 ? 'bg-emerald-500/30' : 'bg-accent/20'" />
              </div>
              <div class="h-1 flex-1 bg-zinc-700 rounded-full" />
              <div class="h-1 flex-1 bg-zinc-800 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- E-commerce Store -->
  <template v-else-if="id === 'ecommerce-store'">
    <div class="absolute inset-0 bg-white flex flex-col">
      <div class="h-6 border-b border-zinc-200 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /></div>
        <div class="flex-1 h-2 bg-zinc-200 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-200 flex items-center px-3 gap-2">
          <div class="w-2 h-2 bg-zinc-800 rounded-[2px]" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-5 bg-zinc-300 rounded-full" /><div class="h-1 w-5 bg-zinc-300 rounded-full" /><div class="h-1 w-5 bg-zinc-300 rounded-full" /></div>
          <div class="h-3 w-3 bg-zinc-700 rounded-sm ml-1" />
        </div>
        <div class="flex-1 p-2 flex flex-col gap-1.5">
          <div class="flex gap-1.5">
            <div class="h-4 w-8 bg-zinc-800 rounded-md text-[5px] flex items-center justify-center text-white font-medium">All</div>
            <div v-for="cat in ['Tops','Pants','Shoes','Bags']" :key="cat" class="h-4 w-8 bg-zinc-100 border border-zinc-200 rounded-md" />
          </div>
          <div class="grid grid-cols-3 gap-1.5 flex-1">
            <div v-for="i in 6" :key="i" class="bg-zinc-100 rounded-lg overflow-hidden flex flex-col">
              <div class="flex-1 bg-zinc-200" />
              <div class="p-1">
                <div class="h-1 w-full bg-zinc-400 rounded-full mb-0.5" />
                <div class="h-1 w-8 bg-zinc-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Product Page -->
  <template v-else-if="id === 'ecommerce-product'">
    <div class="absolute inset-0 bg-white flex flex-col">
      <div class="h-6 border-b border-zinc-200 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /></div>
        <div class="flex-1 h-2 bg-zinc-200 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex gap-2 p-2">
        <div class="flex-1 flex flex-col gap-1.5">
          <div class="flex-1 bg-zinc-100 rounded-lg" />
          <div class="flex gap-1">
            <div v-for="i in 3" :key="i" class="w-6 h-6 bg-zinc-200 rounded-md" />
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-1.5 py-1">
          <div class="h-1 w-8 bg-zinc-300 rounded-full" />
          <div class="h-2 w-full bg-zinc-800 rounded-full" />
          <div class="h-1.5 w-12 bg-zinc-500 rounded-full" />
          <div class="flex gap-1 mt-0.5">
            <div v-for="c in ['bg-zinc-800','bg-zinc-400','bg-zinc-200']" :key="c" class="w-3 h-3 rounded-full border-2 border-white shadow-sm" :class="c" />
          </div>
          <div class="mt-auto flex flex-col gap-1">
            <div class="h-4 w-full bg-zinc-800 rounded-md" />
            <div class="h-4 w-full border border-zinc-300 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Checkout -->
  <template v-else-if="id === 'ecommerce-checkout'">
    <div class="absolute inset-0 bg-white flex flex-col">
      <div class="h-6 border-b border-zinc-200 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /></div>
        <div class="flex-1 h-2 bg-zinc-200 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex gap-2 p-2">
        <div class="flex-[1.4] flex flex-col gap-1.5">
          <div class="h-1.5 w-16 bg-zinc-700 rounded-full" />
          <div class="space-y-1">
            <div v-for="i in 3" :key="i" class="h-4 bg-zinc-100 border border-zinc-200 rounded-md" />
          </div>
          <div class="grid grid-cols-2 gap-1">
            <div class="h-4 bg-zinc-100 border border-zinc-200 rounded-md" />
            <div class="h-4 bg-zinc-100 border border-zinc-200 rounded-md" />
          </div>
          <div class="mt-auto h-4 bg-zinc-800 rounded-md" />
        </div>
        <div class="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg p-1.5 flex flex-col gap-1">
          <div class="h-1.5 w-12 bg-zinc-500 rounded-full" />
          <div v-for="i in 2" :key="i" class="flex gap-1 items-center">
            <div class="w-4 h-4 bg-zinc-200 rounded-md" />
            <div class="flex-1 space-y-0.5">
              <div class="h-1 w-full bg-zinc-400 rounded-full" />
              <div class="h-1 w-8 bg-zinc-300 rounded-full" />
            </div>
          </div>
          <div class="border-t border-zinc-200 pt-1 mt-auto">
            <div class="flex justify-between"><div class="h-1 w-8 bg-zinc-400 rounded-full" /><div class="h-1 w-6 bg-zinc-600 rounded-full" /></div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Agency Landing -->
  <template v-else-if="id === 'marketing-agency'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-3 gap-3">
          <div class="w-2 h-2 bg-white rounded-[2px]" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-5 bg-zinc-700 rounded-full" /><div class="h-1 w-5 bg-zinc-700 rounded-full" /><div class="h-1 w-5 bg-zinc-700 rounded-full" /></div>
        </div>
        <div class="flex-1 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-zinc-950 to-pink-500/10" />
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-4">
            <div class="h-1 w-8 bg-emerald-400/60 rounded-full" />
            <div class="h-3 w-32 bg-zinc-100 rounded-full" />
            <div class="h-1.5 w-24 bg-zinc-500 rounded-full" />
            <div class="flex gap-1.5 mt-1"><div class="h-4 w-12 bg-emerald-500 rounded-md" /><div class="h-4 w-12 border border-zinc-700 rounded-md" /></div>
          </div>
        </div>
        <div class="h-8 border-t border-zinc-800/60 flex items-center justify-center gap-2">
          <div v-for="i in 4" :key="i" class="h-4 flex-1 mx-1 bg-zinc-900 border border-zinc-800 rounded-md" />
        </div>
      </div>
    </div>
  </template>

  <!-- Startup Landing -->
  <template v-else-if="id === 'marketing-startup'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-4 gap-2">
          <div class="h-2 w-2 bg-white rounded-sm" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-4 bg-zinc-700 rounded-full" /><div class="h-1 w-4 bg-zinc-700 rounded-full" /></div>
          <div class="h-3 w-7 bg-accent rounded-md" />
        </div>
        <div class="flex flex-1">
          <div class="flex-1 flex flex-col justify-center gap-1.5 px-3">
            <div class="h-3 w-20 bg-zinc-100 rounded-full" />
            <div class="h-3 w-16 bg-zinc-300 rounded-full" />
            <div class="h-1.5 w-24 bg-zinc-600 rounded-full" />
            <div class="h-4 w-14 bg-accent rounded-md mt-1" />
          </div>
          <div class="flex-1 p-2">
            <div class="w-full h-full bg-zinc-800/40 rounded-xl border border-zinc-700/40 p-1.5 flex flex-col gap-1">
              <div class="h-full bg-zinc-800/60 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Blog Home -->
  <template v-else-if="id === 'blog-home'">
    <div class="absolute inset-0 bg-white flex flex-col">
      <div class="h-6 border-b border-zinc-200 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /></div>
        <div class="flex-1 h-2 bg-zinc-200 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-200 flex items-center px-3 gap-2">
          <div class="w-2 h-2 bg-zinc-800 rounded-[2px]" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-5 bg-zinc-300 rounded-full" /><div class="h-1 w-5 bg-zinc-300 rounded-full" /></div>
        </div>
        <div class="flex-1 p-2 flex flex-col gap-1.5">
          <div class="h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
            <div class="h-2 w-20 bg-zinc-700 rounded-full" />
          </div>
          <div class="grid grid-cols-2 gap-1.5 flex-1">
            <div class="col-span-2 bg-zinc-100 rounded-lg overflow-hidden flex gap-2 p-1.5">
              <div class="w-16 bg-zinc-200 rounded-md" />
              <div class="flex-1 flex flex-col justify-center gap-0.5">
                <div class="h-1 w-8 bg-zinc-400 rounded-full" />
                <div class="h-1.5 w-full bg-zinc-700 rounded-full" />
                <div class="h-1 w-3/4 bg-zinc-400 rounded-full" />
              </div>
            </div>
            <div v-for="i in 2" :key="i" class="bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden">
              <div class="h-8 bg-zinc-200" />
              <div class="p-1.5 space-y-0.5">
                <div class="h-1 w-6 bg-zinc-400 rounded-full" />
                <div class="h-1.5 w-full bg-zinc-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Blog Post -->
  <template v-else-if="id === 'blog-post'">
    <div class="absolute inset-0 bg-white flex flex-col">
      <div class="h-6 border-b border-zinc-200 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-300" /></div>
        <div class="flex-1 h-2 bg-zinc-200 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex">
        <div class="flex-1 px-4 py-2 flex flex-col gap-1.5 max-w-[60%] mx-auto">
          <div class="h-1 w-8 bg-zinc-400 rounded-full" />
          <div class="h-2 w-full bg-zinc-700 rounded-full" />
          <div class="h-2 w-4/5 bg-zinc-700 rounded-full" />
          <div class="flex items-center gap-1.5 py-0.5">
            <div class="w-3 h-3 bg-zinc-300 rounded-full" />
            <div class="h-1 w-12 bg-zinc-400 rounded-full" />
            <div class="h-1 w-8 bg-zinc-300 rounded-full" />
          </div>
          <div class="h-10 bg-zinc-200 rounded-lg" />
          <div class="space-y-0.5">
            <div v-for="i in 4" :key="i" class="h-1 rounded-full" :class="i % 3 === 0 ? 'w-3/4 bg-zinc-300' : 'w-full bg-zinc-300'" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Portfolio -->
  <template v-else-if="id === 'portfolio'">
    <div class="absolute inset-0 bg-zinc-950 flex flex-col">
      <div class="h-6 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
        <div class="flex gap-1"><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /><div class="w-1.5 h-1.5 rounded-full bg-zinc-700" /></div>
        <div class="flex-1 h-2 bg-zinc-800 rounded-full mx-4" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-5 border-b border-zinc-800/60 flex items-center px-3 gap-2">
          <div class="h-1 w-6 bg-zinc-400 rounded-full" />
          <div class="flex gap-2 ml-auto"><div class="h-1 w-4 bg-zinc-700 rounded-full" /><div class="h-1 w-4 bg-zinc-700 rounded-full" /><div class="h-1 w-4 bg-zinc-700 rounded-full" /></div>
        </div>
        <div class="flex-1 flex flex-col items-center justify-center gap-1.5 px-4 relative">
          <div class="w-6 h-6 rounded-full bg-zinc-700 mb-0.5" />
          <div class="h-2.5 w-20 bg-zinc-200 rounded-full" />
          <div class="h-1.5 w-28 bg-zinc-600 rounded-full" />
          <div class="flex gap-1.5 mt-1">
            <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-1 p-2">
          <div v-for="i in 3" :key="i" class="h-8 bg-zinc-900 border border-zinc-800 rounded-lg" />
        </div>
      </div>
    </div>
  </template>

</template>
