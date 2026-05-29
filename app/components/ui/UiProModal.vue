<script setup lang="ts">
interface Props {
  modelValue: boolean
  productId: string
  name: string
  price: number
  redirectPath: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'unlocked': [productId: string]
}>()

const { login } = useAuth()
const { public: { siteUrl } } = useRuntimeConfig()

type View = 'buy' | 'key'
const view = ref<View>('buy')

// Buy form
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const phoneCountry = ref('CD')
const buyError = ref('')
const buyLoading = ref(false)

// License key form
const licenseKey = ref('')
const keyError = ref('')
const keyLoading = ref(false)
const keySuccess = ref(false)

function close() {
  emit('update:modelValue', false)
}

function reset() {
  view.value = 'buy'
  email.value = ''
  firstName.value = ''
  lastName.value = ''
  phoneNumber.value = ''
  buyError.value = ''
  keyError.value = ''
  licenseKey.value = ''
  keySuccess.value = false
}

watch(() => props.modelValue, (open) => {
  if (!open) setTimeout(reset, 300)
})

async function handleBuy() {
  if (!email.value || !firstName.value || !lastName.value || !phoneNumber.value) {
    buyError.value = 'Please fill in all fields'
    return
  }

  buyLoading.value = true
  buyError.value = ''

  try {
    const redirectUrl = `${siteUrl}${props.redirectPath}?enter-key=true`

    const data = await $fetch<{ checkoutUrl?: string, alreadyPurchased?: boolean }>('/api/checkout', {
      method: 'POST',
      body: {
        productId: props.productId,
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phone: { number: phoneNumber.value, country_code: phoneCountry.value },
        redirectUrl,
      },
    })

    if (data.alreadyPurchased) {
      view.value = 'key'
      return
    }

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl
    }
  }
  catch {
    buyError.value = 'Something went wrong. Please try again.'
  }
  finally {
    buyLoading.value = false
  }
}

async function handleKey() {
  if (!licenseKey.value.trim()) {
    keyError.value = 'Please enter your license key'
    return
  }

  keyLoading.value = true
  keyError.value = ''

  const result = await login(licenseKey.value.trim())

  if (!result.success) {
    keyError.value = result.error ?? 'Invalid license key'
    keyLoading.value = false
    return
  }

  keySuccess.value = true
  keyLoading.value = false

  setTimeout(() => {
    emit('unlocked', result.accessLevel ?? props.productId)
    close()
  }, 1000)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-all duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          leave-active-class="transition-all duration-150"
          leave-to-class="opacity-0 scale-95 translate-y-1"
        >
          <div
            v-if="modelValue"
            class="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
          >
            <!-- Header -->
            <div class="flex items-start justify-between p-6 pb-5 border-b border-zinc-800/60">
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-400/15 text-amber-400 border border-amber-400/20">Pro</span>
                  <span class="text-xs text-zinc-500">{{ view === 'buy' ? 'One-time purchase' : 'Enter license key' }}</span>
                </div>
                <h2 class="text-base font-semibold text-white">{{ name }}</h2>
              </div>
              <button
                @click="close"
                class="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors flex-shrink-0"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" />
                </svg>
              </button>
            </div>

            <!-- Buy view -->
            <div v-if="view === 'buy'" class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/40">
                <div class="flex flex-col gap-0.5">
                  <span class="text-sm font-medium text-white">{{ name }}</span>
                  <span class="text-xs text-zinc-500">Full Nuxt 4 source — copy-paste ready</span>
                </div>
                <span class="text-xl font-bold text-white">${{ price }}</span>
              </div>

              <div class="flex flex-col gap-3">
                <div class="grid grid-cols-2 gap-3">
                  <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-medium text-zinc-400">First name</label>
                    <input
                      v-model="firstName"
                      type="text"
                      placeholder="John"
                      class="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-medium text-zinc-400">Last name</label>
                    <input
                      v-model="lastName"
                      type="text"
                      placeholder="Doe"
                      class="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-medium text-zinc-400">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    placeholder="john@example.com"
                    class="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-medium text-zinc-400">Phone number</label>
                  <div class="flex gap-2">
                    <input
                      v-model="phoneCountry"
                      type="text"
                      placeholder="CD"
                      maxlength="3"
                      class="w-16 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors uppercase text-center"
                    />
                    <input
                      v-model="phoneNumber"
                      type="tel"
                      placeholder="0812345678"
                      class="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <p v-if="buyError" class="text-xs text-red-400 text-center">{{ buyError }}</p>

              <button
                @click="handleBuy"
                :disabled="buyLoading"
                class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                <svg v-if="buyLoading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round" />
                </svg>
                <span v-else>Pay ${{ price }} →</span>
                <span v-if="buyLoading">Redirecting...</span>
              </button>

              <button
                @click="view = 'key'"
                class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors text-center"
              >
                Already have a license key? Enter it here
              </button>
            </div>

            <!-- License key view -->
            <div v-else class="p-6 flex flex-col gap-4">
              <p class="text-sm text-zinc-400 leading-relaxed">
                After payment, Chariow sends your license key by email. Enter it below to unlock access.
              </p>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-medium text-zinc-400">License key</label>
                <input
                  v-model="licenseKey"
                  type="text"
                  placeholder="ABC-123-XYZ-789"
                  :disabled="keySuccess"
                  class="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 font-mono tracking-wider transition-colors disabled:opacity-50"
                />
              </div>

              <p v-if="keyError" class="text-xs text-red-400 text-center">{{ keyError }}</p>

              <button
                v-if="!keySuccess"
                @click="handleKey"
                :disabled="keyLoading"
                class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                <svg v-if="keyLoading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round" />
                </svg>
                <span v-else>Unlock access</span>
                <span v-if="keyLoading">Validating...</span>
              </button>

              <div
                v-else
                class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Unlocked!
              </div>

              <button
                @click="view = 'buy'"
                class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors text-center"
              >
                ← Back to purchase
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
