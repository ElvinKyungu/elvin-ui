<script setup lang="ts">
import { gsap } from "gsap";

const navRef = useTemplateRef("navRef");
const drawerRef = useTemplateRef("drawerRef");
const overlayRef = useTemplateRef("overlayRef");
const drawerContainerRef = useTemplateRef("drawerContainerRef");
const drawerLinksRef = useTemplateRef("drawerLinksRef");

const isOpen = ref(false);

const links = [
  { label: "Components", href: "/components", icon: "lucide:layers" },
  { label: "Blocks", href: "/blocks", icon: "lucide:layout-panel-left" },
  { label: "Templates", href: "/templates", icon: "lucide:app-window" },
  { label: "Docs", href: "/docs", icon: "lucide:book-open" },
];

function openMenu() {
  isOpen.value = true;
  drawerContainerRef.value?.classList.remove("pointer-events-none");

  gsap.to(overlayRef.value, { opacity: 1, duration: 0.3, ease: "power2.out" });
  gsap.to(drawerRef.value, { x: "0%", duration: 0.4, ease: "power3.out" });

  const linkEls = drawerLinksRef.value?.querySelectorAll<HTMLElement>(".nav-link");
  if (linkEls?.length) {
    gsap.fromTo(
      linkEls,
      { x: 24, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, stagger: 0.07, ease: "power2.out", delay: 0.15 },
    );
  }

  document.body.style.overflow = "hidden";
}

function closeMenu() {
  gsap.to(overlayRef.value, { opacity: 0, duration: 0.25, ease: "power2.in" });
  gsap.to(drawerRef.value, {
    x: "100%",
    duration: 0.35,
    ease: "power3.in",
    onComplete() {
      isOpen.value = false;
      drawerContainerRef.value?.classList.add("pointer-events-none");
      document.body.style.overflow = "";
    },
  });
}

const route = useRoute();
watch(() => route.fullPath, () => {
  if (isOpen.value) closeMenu();
});

onMounted(() => {
  gsap.from(navRef.value, { y: -20, opacity: 0, duration: 0.7, ease: "power3.out" });
  gsap.set(drawerRef.value, { x: "100%" });
  gsap.set(overlayRef.value, { opacity: 0 });
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <header
    ref="navRef"
    class="fixed top-0 inset-x-0 z-50 h-14 border-b border-zinc-800/60 backdrop-blur-md bg-zinc-950/80"
  >
    <div class="max-w-5xl 2xl:max-w-[80rem] mx-auto px-4 h-full flex items-center justify-between">

      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-md bg-indigo-500 flex items-center justify-center flex-shrink-0">
          <span class="text-white text-[10px] font-bold leading-none">E</span>
        </span>
        <span class="text-base font-semibold text-white tracking-tight">elvin ui</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          :class="[
            'px-3 py-1.5 text-sm rounded-md transition-all duration-200',
            route.path === link.href
              ? 'text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50',
          ]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <a
          href="#"
          class="text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
          aria-label="GitHub"
        >
          <Icon name="lucide:github" class="w-4 h-4" />
        </a>
        <div class="w-px h-4 bg-zinc-800 hidden md:block" />
        <UiButton size="sm" variant="primary" class="hidden md:inline-flex">Browse →</UiButton>

        <!-- Hamburger (mobile only) -->
        <button
          @click="isOpen ? closeMenu() : openMenu()"
          class="md:hidden flex items-center justify-center w-8 h-8 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
          aria-label="Toggle menu"
        >
          <Icon
            :name="isOpen ? 'lucide:x' : 'lucide:menu'"
            class="w-[18px] h-[18px] transition-all duration-200"
          />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile drawer (Teleport to avoid stacking context issues) -->
  <Teleport to="body">
    <div ref="drawerContainerRef" class="fixed inset-0 z-[100] pointer-events-none">

      <!-- Overlay -->
      <div
        ref="overlayRef"
        @click="closeMenu"
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <!-- Drawer panel -->
      <div
        ref="drawerRef"
        class="absolute top-0 right-0 h-full w-72 bg-zinc-950 border-l border-zinc-800/60 flex flex-col shadow-2xl"
      >
        <!-- Drawer header -->
        <div class="flex items-center justify-between px-5 h-14 border-b border-zinc-800/60 shrink-0">
          <NuxtLink to="/" @click="closeMenu" class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-md bg-indigo-500 flex items-center justify-center flex-shrink-0">
              <span class="text-white text-[10px] font-bold leading-none">E</span>
            </span>
            <span class="text-base font-semibold text-white tracking-tight">elvin ui</span>
          </NuxtLink>
          <button
            @click="closeMenu"
            class="flex items-center justify-center w-8 h-8 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>

        <!-- Navigation links -->
        <nav ref="drawerLinksRef" class="flex flex-col gap-1 p-4 flex-1">
          <NuxtLink
            v-for="link in links"
            :key="link.href"
            :to="link.href"
            @click="closeMenu"
            class="nav-link flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 group"
          >
            <div class="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-zinc-700 transition-colors duration-200">
              <Icon :name="link.icon" class="w-4 h-4" />
            </div>
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Social links -->
        <div class="p-5 border-t border-zinc-800/60 shrink-0 flex items-center gap-3">
          <a
            href="https://github.com/ElvinKyungu"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200"
            aria-label="GitHub"
          >
            <Icon name="lucide:github" class="w-4 h-4" />
          </a>
          <a
            href="https://x.com/ElvinKyungu"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200"
            aria-label="X (Twitter)"
          >
            <Icon name="lucide:twitter" class="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/ElvinKyungu"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Icon name="lucide:linkedin" class="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  </Teleport>
</template>
