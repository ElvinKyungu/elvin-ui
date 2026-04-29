<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const thumb = useTemplateRef('thumb')
const TRAVEL = 20

onMounted(() => {
  if (props.modelValue) gsap.set(thumb.value, { x: TRAVEL })
})

watch(() => props.modelValue, (val) => {
  gsap.to(thumb.value, {
    x: val ? TRAVEL : 0,
    duration: 0.28,
    ease: 'back.out(2.5)',
  })
})

const toggle = () => emit('update:modelValue', !props.modelValue)
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    @click="toggle"
    :class="[
      'relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none flex-shrink-0',
      modelValue ? 'bg-indigo-500' : 'bg-zinc-700',
    ]"
  >
    <span
      ref="thumb"
      class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md"
    />
  </button>
</template>

<!--
USAGE:
<UiToggle v-model="enabled" />
-->
