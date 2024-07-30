import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    addPaymentEvent(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/events/payments/', payload)
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    addPaymentProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('/store/payments/', payload)
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    removePaymentEvent(context, paymentId) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/events/payments/${paymentId}/`)
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    removePaymentProduct(context, paymentId) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/store/payments/${paymentId}/`)
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
  },
}
