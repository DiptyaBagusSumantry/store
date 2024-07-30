import { ref } from '@vue/composition-api'
import store from '@/store'

export default function useInvoice() {
  const payment = ref({})

  const fetchEventPayment = paymentId => store
    .dispatch('widya-analytic-invoice/fetchEventPayment', paymentId)
    .then(response => {
      payment.value = response.data
    })

  const fetchProductPayment = paymentId => store
    .dispatch('widya-analytic-invoice/fetchProductPayment', paymentId)
    .then(response => {
      const { product, subscription_plan } = response.data
      payment.value = {
        ...response.data,
        product: {
          ...product,
          duration: subscription_plan.name,
          price: subscription_plan.price,
        },
      }
    })

  const formatDate = (value, typeMonth = 'long', locales = 'id') => {
    const dateTime = new Date(value)
    const optionsDate = { year: 'numeric', month: typeMonth, day: 'numeric' }
    const optionsTime = { hour: 'numeric', minute: 'numeric' }
    return `${dateTime.toLocaleString(locales, optionsDate)}, ${dateTime.toLocaleString(locales, optionsTime)}`
  }

  const formatMoney = (value, options) => value.toLocaleString('id-ID', options)

  return {
    payment,
    formatDate,
    formatMoney,
    fetchEventPayment,
    fetchProductPayment,
  }
}
