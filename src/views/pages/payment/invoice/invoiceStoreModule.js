import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchEventPayment(context, paymentId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/events/payments/${paymentId}/`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    fetchProductPayment(context, paymentId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/store/payments/${paymentId}/`)
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
