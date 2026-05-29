<script setup lang="ts">
const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'Elvin UI — Copy-paste Nuxt 4 components',
  description: 'Beautiful, production-ready UI components for Nuxt 4. Copy, paste, ship. No CLI, no config, no hidden deps.',
  ogTitle: 'Elvin UI — Copy-paste Nuxt 4 components',
  ogDescription: 'Beautiful, production-ready UI components for Nuxt 4. Copy, paste, ship. No CLI, no config, no hidden deps.',
  ogImage: `${siteUrl}/home_screen.png`,
  ogUrl: siteUrl,
  ogType: 'website',
  ogSiteName: 'Elvin UI',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Elvin UI — Copy-paste Nuxt 4 components',
  twitterDescription: 'Beautiful, production-ready UI components for Nuxt 4. Copy, paste, ship.',
  twitterImage: `${siteUrl}/home_screen.png`,
})
</script>

<template>
  <div>
    <div class="fixed inset-0 pointer-events-none">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_0.3px,transparent_0.8px)] bg-[size:64px_64px]"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff12_0.3px,transparent_0.8px)] bg-[size:60px_60px]"
      />
    </div>
    <BlocksNavBar />
    <BlocksHeroSection />
    <BlocksMarqueeStrip />
    <!-- <BlocksRecentlyAdded /> -->
    <BlocksBentoSection />
    <BlocksSplitFeatureSection />
    <BlocksFeaturesSection />
    <BlocksScrollRevealText />
    <BlocksPricingSection />
    <BlocksMagneticCTA />
    <BlocksFooterSection />
  </div>
</template>
