<script setup lang="ts">
definePageMeta({ layout: false })
import { gsap } from 'gsap'

// ─── Step data ─────────────────────────────────────────────────────────────────
const currentStep = ref<1 | 2 | 3>(1)
const orderPlaced  = ref(false)

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  saveInfo: false,
})

const shippingMethod = ref<'standard' | 'express' | 'overnight'>('standard')
const shippingOptions = [
  { id: 'standard',  label: 'Standard Shipping', desc: '5–7 business days',  price: 0,     freeLabel: 'FREE' },
  { id: 'express',   label: 'Express Shipping',  desc: '2–3 business days',  price: 9.99  },
  { id: 'overnight', label: 'Overnight Shipping', desc: 'Next business day', price: 24.99 },
]

const payment = reactive({
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  saveCard: false,
})

// ─── Cart / order data ─────────────────────────────────────────────────────────
const cartItems = [
  { name: 'AirPods Pro Max', variant: 'Space Gray', qty: 1, price: 549, gradient: 'from-zinc-700 to-zinc-900' },
  { name: 'iPhone 15 Case',  variant: 'Clear',      qty: 2, price: 29,  gradient: 'from-blue-900/30 to-zinc-900' },
]

// ─── Coupon ────────────────────────────────────────────────────────────────────
const couponCode    = ref('')
const couponApplied = ref(false)
const couponError   = ref(false)

function applyCoupon() {
  if (couponCode.value.trim().toUpperCase() === 'ELVIN20') {
    couponApplied.value = true
    couponError.value   = false
  } else {
    couponError.value   = true
    couponApplied.value = false
  }
}

// ─── Computed totals ───────────────────────────────────────────────────────────
const subtotal = computed(() => cartItems.reduce((a, i) => a + i.price * i.qty, 0))
const selectedShipping = computed(() => shippingOptions.find(o => o.id === shippingMethod.value)!)
const shippingCost = computed(() => selectedShipping.value.price)
const taxRate  = 0.08
const discount = computed(() => couponApplied.value ? Math.round(subtotal.value * 0.2 * 100) / 100 : 0)
const tax      = computed(() => Math.round((subtotal.value - discount.value + shippingCost.value) * taxRate * 100) / 100)
const total    = computed(() => subtotal.value - discount.value + shippingCost.value + tax.value)

// ─── Modals ────────────────────────────────────────────────────────────────────
const showCvvHelp = ref(false)

// ─── Refs ───────────────────────────────────────────────────────────────────────
const formPanel    = useTemplateRef<HTMLElement>('formPanel')
const progressFill = useTemplateRef<HTMLElement>('progressFill')
const successPanel = useTemplateRef<HTMLElement>('successPanel')
const checkCircle  = useTemplateRef<SVGCircleElement>('checkCircle')
const checkMark    = useTemplateRef<SVGPathElement>('checkMark')

// ─── Step transitions ──────────────────────────────────────────────────────────
function nextStep() {
  if (currentStep.value >= 3) return
  if (!formPanel.value) { currentStep.value++; return }
  gsap.to(formPanel.value, {
    x: -30, opacity: 0, duration: 0.22, ease: 'power2.in',
    onComplete: () => {
      currentStep.value++
      nextTick(() => {
        gsap.fromTo(formPanel.value!, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.28, ease: 'power3.out' })
        animateProgressBar()
      })
    },
  })
}

function prevStep() {
  if (currentStep.value <= 1) return
  if (!formPanel.value) { currentStep.value--; return }
  gsap.to(formPanel.value, {
    x: 30, opacity: 0, duration: 0.22, ease: 'power2.in',
    onComplete: () => {
      currentStep.value--
      nextTick(() => {
        gsap.fromTo(formPanel.value!, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.28, ease: 'power3.out' })
        animateProgressBar()
      })
    },
  })
}

function animateProgressBar() {
  if (!progressFill.value) return
  const target = ((currentStep.value - 1) / 2) * 100
  gsap.to(progressFill.value, { width: `${target}%`, duration: 0.4, ease: 'power2.out' })
}

function placeOrder() {
  if (!formPanel.value) { orderPlaced.value = true; return }
  gsap.to(formPanel.value, {
    scale: 0.96, opacity: 0, duration: 0.3, ease: 'power2.in',
    onComplete: () => {
      orderPlaced.value = true
      nextTick(() => {
        if (!successPanel.value) return
        gsap.fromTo(successPanel.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        // Animate checkmark
        if (checkCircle.value) {
          const len = 2 * Math.PI * 38
          gsap.set(checkCircle.value, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(checkCircle.value, { strokeDashoffset: 0, duration: 0.65, ease: 'power2.out', delay: 0.15 })
        }
        if (checkMark.value) {
          const len2 = checkMark.value.getTotalLength?.() ?? 60
          gsap.set(checkMark.value, { strokeDasharray: len2, strokeDashoffset: len2 })
          gsap.to(checkMark.value, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out', delay: 0.65 })
        }
      })
    },
  })
}

// ─── Card number formatter ─────────────────────────────────────────────────────
function formatCard(e: Event) {
  const input = e.target as HTMLInputElement
  const raw   = input.value.replace(/\D/g, '').slice(0, 16)
  payment.cardNumber = raw.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(e: Event) {
  const input = e.target as HTMLInputElement
  const raw   = input.value.replace(/\D/g, '').slice(0, 4)
  payment.expiry = raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw
}

// ─── Mount ─────────────────────────────────────────────────────────────────────
onMounted(() => {
  gsap.from(formPanel.value, { x: 20, opacity: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 })
  gsap.from('.order-summary-panel', { x: 20, opacity: 0, duration: 0.55, ease: 'power3.out', delay: 0.2 })
})

onUnmounted(() => {
  gsap.killTweensOf([formPanel.value, progressFill.value, successPanel.value, checkCircle.value, checkMark.value, '.order-summary-panel'])
})
</script>

<template>
  <div class="min-h-screen bg-[#080808] text-white" style="font-family:Inter,system-ui,sans-serif">

    <!-- ─── Header ───────────────────────────────────────────────────────────── -->
    <header class="sticky top-0 z-20 h-14 border-b border-zinc-800/60 bg-[#080808]/90 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-4">

        <!-- Logo -->
        <a href="/templates/ecommerce-product" class="flex items-center gap-2 shrink-0">
          <UiLogo :size="24" color="white" />
          <span class="text-sm font-bold text-white tracking-tight hidden sm:inline">Elvin Store</span>
        </a>

        <!-- Progress bar (center) -->
        <div class="flex-1 flex items-center justify-center">
          <div class="flex items-center gap-0 w-full max-w-xs">
            <!-- Step 1 -->
            <div class="flex flex-col items-center gap-1 shrink-0">
              <div :class="['w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 border',
                currentStep >= 1 ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-700 text-zinc-600']">
                <svg v-if="currentStep > 1" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span v-else>1</span>
              </div>
              <span :class="['text-[9px] font-medium hidden sm:block', currentStep === 1 ? 'text-emerald-400' : currentStep > 1 ? 'text-zinc-400' : 'text-zinc-600']">Info</span>
            </div>

            <!-- Line 1 -->
            <div class="flex-1 h-px bg-zinc-800 mx-1 relative overflow-hidden">
              <div ref="progressFill" :class="['absolute inset-y-0 left-0 transition-all duration-300', currentStep > 1 ? 'bg-emerald-500' : 'bg-zinc-800']" :style="`width:${currentStep > 1 ? '100%' : '0%'}`" />
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center gap-1 shrink-0">
              <div :class="['w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 border',
                currentStep >= 2 ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-700 text-zinc-600']">
                <svg v-if="currentStep > 2" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span v-else>2</span>
              </div>
              <span :class="['text-[9px] font-medium hidden sm:block', currentStep === 2 ? 'text-emerald-400' : currentStep > 2 ? 'text-zinc-400' : 'text-zinc-600']">Shipping</span>
            </div>

            <!-- Line 2 -->
            <div class="flex-1 h-px bg-zinc-800 mx-1 relative overflow-hidden">
              <div :class="['absolute inset-y-0 left-0 transition-all duration-300 bg-emerald-500']" :style="`width:${currentStep > 2 ? '100%' : '0%'}`" />
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center gap-1 shrink-0">
              <div :class="['w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 border',
                currentStep >= 3 ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-700 text-zinc-600']">3</div>
              <span :class="['text-[9px] font-medium hidden sm:block', currentStep === 3 ? 'text-emerald-400' : 'text-zinc-600']">Payment</span>
            </div>
          </div>
        </div>

        <!-- SSL badge -->
        <div class="flex items-center gap-1.5 text-xs text-zinc-500 shrink-0">
          <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span class="hidden sm:inline">SSL Secured</span>
        </div>
      </div>
    </header>

    <!-- ─── Main layout ───────────────────────────────────────────────────────── -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

        <!-- ─── Left: Form panel ─────────────────────────────────────────────── -->
        <div>

          <!-- Success state -->
          <div v-if="orderPlaced" ref="successPanel" class="flex flex-col items-center justify-center py-16 text-center">
            <!-- Animated checkmark SVG -->
            <div class="w-28 h-28 mb-6">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <circle ref="checkCircle" cx="50" cy="50" r="38" fill="none" stroke="#42b883" stroke-width="4" stroke-linecap="round" class="-rotate-90 origin-center" style="transform-origin:50px 50px"/>
                <path ref="checkMark" d="M30 50 L45 65 L70 38" fill="none" stroke="#42b883" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 class="text-3xl font-black text-white mb-2">Order confirmed!</h1>
            <p class="text-zinc-400 text-sm mb-1">Order number: <span class="font-bold text-emerald-400">#ELV-2847</span></p>
            <p class="text-zinc-500 text-sm mb-8">We'll send a confirmation to your email address.</p>
            <a
              href="/templates/ecommerce-product"
              class="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-bold text-white transition-colors shadow-lg shadow-emerald-500/20"
            >
              Continue shopping
            </a>
          </div>

          <!-- Form steps -->
          <div v-else ref="formPanel">

            <!-- ─ Step 1: Information ──────────────────────────────────────── -->
            <div v-if="currentStep === 1">
              <!-- Contact information -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-base font-bold text-white">Contact information</h2>
                  <a href="#" class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">Login</a>
                </div>
                <div class="relative">
                  <label class="block text-xs text-zinc-400 font-medium mb-1.5">Email address</label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="you@example.com"
                    class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                </div>
              </div>

              <!-- Shipping address -->
              <div class="mb-6">
                <h2 class="text-base font-bold text-white mb-4">Shipping address</h2>
                <div class="flex flex-col gap-3">
                  <!-- Name row -->
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs text-zinc-400 font-medium mb-1.5">First name</label>
                      <input v-model="form.firstName" type="text" placeholder="Jane"
                        class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                    </div>
                    <div>
                      <label class="block text-xs text-zinc-400 font-medium mb-1.5">Last name</label>
                      <input v-model="form.lastName" type="text" placeholder="Smith"
                        class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                    </div>
                  </div>

                  <!-- Address -->
                  <div>
                    <label class="block text-xs text-zinc-400 font-medium mb-1.5">Address</label>
                    <input v-model="form.address" type="text" placeholder="123 Main Street"
                      class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                  </div>

                  <!-- Apartment -->
                  <div>
                    <label class="block text-xs text-zinc-400 font-medium mb-1.5">Apartment, suite, etc. <span class="text-zinc-600">(optional)</span></label>
                    <input v-model="form.apartment" type="text" placeholder="Apt 4B"
                      class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                  </div>

                  <!-- City / State / ZIP -->
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label class="block text-xs text-zinc-400 font-medium mb-1.5">City</label>
                      <input v-model="form.city" type="text" placeholder="New York"
                        class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                    </div>
                    <div>
                      <label class="block text-xs text-zinc-400 font-medium mb-1.5">State</label>
                      <input v-model="form.state" type="text" placeholder="NY"
                        class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                    </div>
                    <div>
                      <label class="block text-xs text-zinc-400 font-medium mb-1.5">ZIP code</label>
                      <input v-model="form.zip" type="text" placeholder="10001"
                        class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                    </div>
                  </div>

                  <!-- Country -->
                  <div>
                    <label class="block text-xs text-zinc-400 font-medium mb-1.5">Country</label>
                    <select v-model="form.country"
                      class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                      <option>Germany</option>
                      <option>France</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Save info -->
              <label class="flex items-center gap-3 cursor-pointer mb-6 group">
                <div
                  @click="form.saveInfo = !form.saveInfo"
                  :class="['w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0', form.saveInfo ? 'bg-emerald-500 border-emerald-500' : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-600']"
                >
                  <svg v-if="form.saveInfo" class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span class="text-sm text-zinc-400">Save this information for next time</span>
              </label>

              <button @click="nextStep" class="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-bold text-white transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                Continue to shipping
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>

            <!-- ─ Step 2: Shipping method ──────────────────────────────────── -->
            <div v-else-if="currentStep === 2">
              <h2 class="text-base font-bold text-white mb-5">Shipping method</h2>

              <div class="flex flex-col gap-3 mb-8">
                <label
                  v-for="opt in shippingOptions" :key="opt.id"
                  @click="shippingMethod = opt.id as 'standard' | 'express' | 'overnight'"
                  :class="[
                    'flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200',
                    shippingMethod === opt.id
                      ? 'border-emerald-500 bg-emerald-500/5 shadow-sm shadow-emerald-500/10'
                      : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700',
                  ]"
                >
                  <!-- Radio -->
                  <div :class="['w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all', shippingMethod === opt.id ? 'border-emerald-500' : 'border-zinc-600']">
                    <div v-if="shippingMethod === opt.id" class="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-white">{{ opt.label }}</p>
                    <p class="text-xs text-zinc-500 mt-0.5">{{ opt.desc }}</p>
                  </div>
                  <!-- Price -->
                  <span :class="['text-sm font-bold shrink-0', opt.price === 0 ? 'text-emerald-400' : 'text-white']">
                    {{ opt.price === 0 ? (opt.freeLabel ?? 'FREE') : `$${opt.price.toFixed(2)}` }}
                  </span>
                </label>
              </div>

              <div class="flex gap-3">
                <button @click="prevStep" class="flex-1 h-11 rounded-xl border border-zinc-800 text-sm font-semibold text-zinc-400 hover:border-zinc-700 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back
                </button>
                <button @click="nextStep" class="flex-[2] h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-bold text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                  Continue to payment
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            <!-- ─ Step 3: Payment ─────────────────────────────────────────── -->
            <div v-else-if="currentStep === 3">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-base font-bold text-white">Payment</h2>
                <!-- Card type icons -->
                <div class="flex items-center gap-1.5">
                  <div class="w-9 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                    <span class="text-[8px] font-black text-white tracking-tight">VISA</span>
                  </div>
                  <div class="w-9 h-6 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center gap-0.5">
                    <div class="w-3 h-3 rounded-full bg-red-500 opacity-90" />
                    <div class="w-3 h-3 rounded-full bg-amber-400 opacity-90 -ml-1.5" />
                  </div>
                  <div class="w-9 h-6 rounded-md bg-zinc-700 flex items-center justify-center">
                    <span class="text-[7px] font-black text-zinc-300 tracking-tight">AMEX</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-4 mb-6">
                <!-- Card number -->
                <div>
                  <label class="block text-xs text-zinc-400 font-medium mb-1.5">Card number</label>
                  <div class="relative">
                    <input
                      :value="payment.cardNumber"
                      @input="formatCard"
                      type="text"
                      inputmode="numeric"
                      maxlength="19"
                      placeholder="1234 5678 9012 3456"
                      class="checkout-input w-full px-4 py-3 pr-12 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                    <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </div>
                </div>

                <!-- Name on card -->
                <div>
                  <label class="block text-xs text-zinc-400 font-medium mb-1.5">Name on card</label>
                  <input v-model="payment.cardName" type="text" placeholder="Jane Smith"
                    class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                </div>

                <!-- Expiry + CVV -->
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs text-zinc-400 font-medium mb-1.5">Expiry date</label>
                    <input
                      :value="payment.expiry"
                      @input="formatExpiry"
                      type="text"
                      inputmode="numeric"
                      maxlength="5"
                      placeholder="MM/YY"
                      class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label class="flex items-center gap-1.5 text-xs text-zinc-400 font-medium mb-1.5">
                      CVV
                      <button @click="showCvvHelp = true" class="w-4 h-4 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-colors text-[9px] font-bold">?</button>
                    </label>
                    <input v-model="payment.cvv" type="text" inputmode="numeric" maxlength="4" placeholder="•••"
                      class="checkout-input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                  </div>
                </div>
              </div>

              <!-- Save card -->
              <label class="flex items-center gap-3 cursor-pointer mb-7 group">
                <div
                  @click="payment.saveCard = !payment.saveCard"
                  :class="['w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0', payment.saveCard ? 'bg-emerald-500 border-emerald-500' : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-600']"
                >
                  <svg v-if="payment.saveCard" class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span class="text-sm text-zinc-400">Save card for future purchases</span>
              </label>

              <div class="flex gap-3">
                <button @click="prevStep" class="flex-1 h-12 rounded-xl border border-zinc-800 text-sm font-semibold text-zinc-400 hover:border-zinc-700 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back
                </button>
                <button @click="placeOrder" class="flex-[2] h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-bold text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Place order — ${{ total.toFixed(2) }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ─── Right: Order summary ──────────────────────────────────────────── -->
        <div class="order-summary-panel sticky top-20">
          <div class="bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-6">
            <h2 class="text-sm font-bold text-white mb-5">Order summary</h2>

            <!-- Cart items -->
            <div class="flex flex-col gap-4 mb-5">
              <div v-for="item in cartItems" :key="item.name" class="flex items-center gap-3">
                <!-- Product image -->
                <div class="relative shrink-0">
                  <div :class="`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} border border-zinc-800/60`" />
                  <span class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-zinc-700 border border-zinc-600 text-[10px] font-bold text-zinc-300 flex items-center justify-center">{{ item.qty }}</span>
                </div>
                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-white truncate">{{ item.name }}</p>
                  <p class="text-xs text-zinc-500 truncate">{{ item.variant }}</p>
                </div>
                <!-- Price -->
                <p class="text-sm font-bold text-white shrink-0">${{ (item.price * item.qty).toFixed(2) }}</p>
              </div>
            </div>

            <div class="h-px bg-zinc-800/60 mb-5" />

            <!-- Coupon -->
            <div class="mb-5">
              <div class="flex gap-2">
                <input
                  v-model="couponCode"
                  type="text"
                  placeholder="Coupon code"
                  @keydown.enter="applyCoupon"
                  :class="[
                    'flex-1 px-4 py-2.5 rounded-xl text-sm placeholder-zinc-600 focus:outline-none transition-all',
                    couponError ? 'bg-rose-500/5 border border-rose-500/40 text-rose-300 focus:border-rose-500/60' : 'bg-zinc-800 border border-zinc-700 text-zinc-300 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20',
                  ]"
                />
                <button @click="applyCoupon" :class="['px-4 py-2.5 rounded-xl text-sm font-semibold shrink-0 transition-colors',
                  couponApplied ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white']">
                  {{ couponApplied ? 'Applied!' : 'Apply' }}
                </button>
              </div>
              <p v-if="couponError" class="text-xs text-rose-400 mt-1.5">Invalid coupon code. Try "ELVIN20".</p>
              <div v-if="couponApplied" class="flex items-center gap-1.5 mt-2">
                <span class="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-semibold">ELVIN20</span>
                <span class="text-xs text-emerald-400">20% discount applied</span>
              </div>
            </div>

            <!-- Price breakdown -->
            <div class="flex flex-col gap-2.5 mb-5">
              <div class="flex items-center justify-between">
                <span class="text-sm text-zinc-500">Subtotal</span>
                <span class="text-sm text-zinc-300">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-zinc-500">Shipping</span>
                <span :class="['text-sm font-medium', shippingCost === 0 ? 'text-emerald-400' : 'text-zinc-300']">
                  {{ shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}` }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-zinc-500">Tax (8%)</span>
                <span class="text-sm text-zinc-300">${{ tax.toFixed(2) }}</span>
              </div>
              <div v-if="couponApplied" class="flex items-center justify-between">
                <span class="text-sm text-zinc-500">Discount</span>
                <span class="text-sm font-semibold text-emerald-400">−${{ discount.toFixed(2) }}</span>
              </div>
            </div>

            <div class="h-px bg-zinc-800/60 mb-4" />

            <!-- Total -->
            <div class="flex items-center justify-between mb-5">
              <span class="text-sm font-semibold text-zinc-400">Total</span>
              <span class="text-2xl font-black text-white">${{ total.toFixed(2) }}</span>
            </div>

            <!-- Trust badges -->
            <div class="grid grid-cols-3 gap-2">
              <div v-for="badge in [
                { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Secure checkout' },
                { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 0-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1m4 0h-4', label: '30-day returns' },
                { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', label: 'Satisfaction' },
              ]" :key="badge.label" class="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                <svg class="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path :d="badge.icon"/>
                </svg>
                <span class="text-[9px] text-zinc-500 text-center leading-tight">{{ badge.label }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ─── Modal: CVV help ──────────────────────────────────────────────────── -->
    <Transition name="modal">
      <div v-if="showCvvHelp" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showCvvHelp = false">
        <div class="modal-box w-full max-w-xs bg-zinc-900 border border-zinc-800/60 rounded-2xl p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-bold text-white">What is a CVV?</h2>
            <button @click="showCvvHelp = false" class="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <p class="text-sm text-zinc-400 leading-relaxed mb-4">
            The CVV (Card Verification Value) is the 3–4 digit security code printed on your card.
          </p>
          <!-- Card diagram -->
          <div class="flex flex-col gap-2">
            <div class="w-full h-16 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-700/60 relative overflow-hidden flex items-end p-3">
              <div class="w-full h-6 bg-zinc-950/80 rounded-md flex items-center justify-between px-3">
                <span class="text-[8px] text-zinc-500 font-mono">XXXX XXXX XXXX XXXX</span>
              </div>
            </div>
            <div class="w-full h-12 rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-700 border border-zinc-700/60 relative overflow-hidden flex items-center px-3 gap-2">
              <div class="flex-1 h-6 bg-zinc-950/60" />
              <div class="bg-white/90 rounded px-2 py-1 text-xs font-mono text-zinc-800 font-bold">123</div>
              <div class="w-16 border border-dashed border-emerald-500/60 rounded-md p-0.5">
                <div class="h-4 flex items-center justify-center">
                  <span class="text-[8px] text-emerald-400 font-medium">← CVV here</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-box { transition: transform 0.2s ease; }
.modal-enter-from .modal-box, .modal-leave-to .modal-box { transform: scale(0.95) translateY(8px); }

.checkout-input::placeholder { color: #52525b; }
</style>
