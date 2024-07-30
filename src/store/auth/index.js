import axios from '@axios'
import { updateUserData, updateUserAbility } from '@/auth/utils'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    fetchUserData() {
      return new Promise((resolve, reject) => {
        axios
          .get('/account/')
          .then(response => {
            // Update user details
            updateUserData(response.data)

            resolve(response)
          })
          .catch(error => { reject(error) })
      })
    },
    async updateUserData({ dispatch }) {
      await dispatch('fetchUserData')

      // Update user ability
      updateUserAbility()
    },
  },
}
