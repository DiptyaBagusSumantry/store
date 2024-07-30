import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUserCategories() {
      return new Promise((resolve, reject) => {
        axios
          .get('user-management/categories/')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updatePassword(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('account/password/change/', payload)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateDataProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put('account/', payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
