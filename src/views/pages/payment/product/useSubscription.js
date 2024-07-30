import { ref } from '@vue/composition-api'
import { updateUserData } from '@/auth/utils'
import store from '@/store'

export default function useSubscription() {
  const productSubscriptionPlans = ref([])
  const userSubscriptionPlan = ref(null)

  const fetchProductSubscriptionPlans = productId => new Promise((resolve, reject) => {
    store.dispatch('widya-analytic-subs-plans/fetchProduct', productId)
      .then(response => {
        productSubscriptionPlans.value = response.data.subscription_plans
        resolve(response)
      })
      .catch(error => reject(error))
  })
  const fetchSubscriptionPlan = planId => new Promise((resolve, reject) => {
    store.dispatch('widya-analytic-subs-plans/fetchSubscriptionPlan', planId)
      .then(response => {
        userSubscriptionPlan.value = response.data
        resolve(response)
      })
      .catch(error => reject(error))
  })
  const fetchUserSubscriptions = () => store
    .dispatch('widya-analytic-subs-plans/fetchUserSubscriptions')
  const deleteUserSubscription = subscriptionId => store
    .dispatch('widya-analytic-subs-plans/deleteUserSubscription', subscriptionId)
  const deleteAndUpdateSubscriptions = subscriptionId => new Promise((resolve, reject) => {
    deleteUserSubscription(subscriptionId)
      .then(() => {
        fetchUserSubscriptions()
          .then(async response => {
            const subscriptions = [...response.data]
            updateUserData({ subscriptions })

            resolve(response)
          })
      })
      .catch(error => reject(error))
  })

  return {
    userSubscriptionPlan,
    productSubscriptionPlans,
    fetchSubscriptionPlan,
    fetchProductSubscriptionPlans,
    deleteAndUpdateSubscriptions,
  }
}
