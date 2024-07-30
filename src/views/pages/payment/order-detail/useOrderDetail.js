import { ref } from '@vue/composition-api'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'

export default function useOrderDetail() {
  const toast = useToast()

  const itemData = ref({})

  const fetchUserSubscriptionPlan = planId => store
    .dispatch('widya-analytic-subs-plans/fetchSubscriptionPlan', planId)
    .then(response => {
      const { product: productId, price } = response.data
      const taxAggregate = price <= 2000000 ? 0.11 : 0.125
      const taxAmount = price * taxAggregate
      const grossAmount = price + taxAmount
      itemData.value = {
        ...response.data,
        taxAggregate,
        taxAmount,
        grossAmount,
      }

      store.dispatch('widya-analytic-subs-plans/fetchProduct', productId)
        .then(resp => {
          const { name, description } = resp.data
          itemData.value = {
            ...itemData.value,
            product: { id: productId, name, description },
          }
        })
    })

  const fetchEvent = eventId => store
    .dispatch('widya-analytic-eventform/fetchEvent', eventId)
    .then(response => {
      const { price } = response.data
      const grossAmount = price
      itemData.value = {
        ...response.data,
        grossAmount,
      }
    })

  const addPaymentEvent = payload => new Promise((resolve, reject) => {
    store.dispatch('widya-analytic-order-detail/addPaymentEvent', payload)
      .then(respone => resolve(respone))
      .catch(error => {
        if (error.response) {
          const { data: errorData, statusText: errorStatus } = error.response
          reject(toast({
            component: ToastificationContent,
            props: {
              title: errorStatus,
              icon: 'AlertCircleIcon',
              variant: 'danger',
              text: errorData.detail || errorData.message || errorData,
            },
          }))
        }
      })
  })

  const addPaymentProduct = payload => new Promise((resolve, reject) => {
    store.dispatch('widya-analytic-order-detail/addPaymentProduct', payload)
      .then(respone => resolve(respone))
      .catch(error => {
        if (error.response) {
          const { data: errorData, statusText: errorStatus } = error.response
          reject(toast({
            component: ToastificationContent,
            props: {
              title: errorStatus,
              icon: 'AlertCircleIcon',
              variant: 'danger',
              text: errorData.detail || errorData.message || errorData,
            },
          }))
        }
      })
  })

  const removePaymentEvent = paymentId => new Promise((resolve, reject) => {
    store.dispatch('widya-analytic-order-detail/removePaymentEvent', paymentId)
      .then(respone => resolve(respone))
      .catch(error => {
        if (error.response) {
          const { data: errorData, statusText: errorStatus } = error.response
          reject(toast({
            component: ToastificationContent,
            props: {
              title: errorStatus,
              icon: 'AlertCircleIcon',
              variant: 'danger',
              text: errorData.detail || errorData.message || errorData,
            },
          }))
        }
      })
  })

  const removePaymentProduct = paymentId => new Promise((resolve, reject) => {
    store.dispatch('widya-analytic-order-detail/removePaymentProduct', paymentId)
      .then(respone => resolve(respone))
      .catch(error => {
        if (error.response) {
          const { data: errorData, statusText: errorStatus } = error.response
          reject(toast({
            component: ToastificationContent,
            props: {
              title: errorStatus,
              icon: 'AlertCircleIcon',
              variant: 'danger',
              text: errorData.detail || errorData.message || errorData,
            },
          }))
        }
      })
  })

  return {
    itemData,
    fetchEvent,
    fetchUserSubscriptionPlan,
    addPaymentEvent,
    addPaymentProduct,
    removePaymentEvent,
    removePaymentProduct,
  }
}
