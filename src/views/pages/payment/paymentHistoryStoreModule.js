import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchEventPayments() {
      return new Promise((resolve, reject) => {
        axios
          .get('/events/payments/')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchProductPayments() {
      return new Promise((resolve, reject) => {
        axios
          .get('/store/payments/')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
