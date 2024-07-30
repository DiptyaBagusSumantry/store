import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchProduct(context, productId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/store/products/${productId}/`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    fetchSubscriptionPlan(context, planId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/subscription-plans/${planId}/`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    fetchUserSubscriptions(context) {
      return new Promise((resolve, reject) => {
        axios
          .get('/subscriptions/')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteUserSubscription(context, subscriptionId) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/subscriptions/${subscriptionId}/`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
  },
}
