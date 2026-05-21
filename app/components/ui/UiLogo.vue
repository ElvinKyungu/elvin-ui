<script setup lang="ts">
interface Props {
  size?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 32,
  color: 'currentColor',
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-label="Elvin UI"
  >
    <path
      d="M 78 56 A 28 28 0 1 0 70 76 L 86 70"
      :stroke="color"
      stroke-width="13"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <line
      x1="26" y1="50" x2="74" y2="50"
      :stroke="color"
      stroke-width="13"
      stroke-linecap="round"
    />
    <circle cx="86" cy="70" r="4.5" fill="#42B883" />
  </svg>
</template>

<!--
USAGE:
<UiLogo />                          → 32px, currentColor
<UiLogo :size="24" />               → 24px
<UiLogo :size="40" color="white" /> → 40px white
-->
