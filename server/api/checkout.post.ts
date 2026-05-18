export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { productId, email, firstName, lastName, phone, redirectUrl } = body

  if (!productId || !email || !firstName || !lastName || !phone?.number || !phone?.country_code) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const response = await $fetch<any>('https://api.chariow.com/v1/checkout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.chariowApiKey}`,
      'Content-Type': 'application/json',
    },
    body: {
      product_id: productId,
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
      redirect_url: redirectUrl,
    },
  })

  const step = response?.data?.step

  if (step === 'payment') {
    return { checkoutUrl: response.data.payment.checkout_url }
  }

  if (step === 'already_purchased') {
    return { alreadyPurchased: true }
  }

  throw createError({ statusCode: 500, message: 'Unexpected checkout response' })
})
