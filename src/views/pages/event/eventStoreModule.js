import axios from 'axios'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {
    // Action toget data from widya and toba wordpress API
    fetchAllPosts({ dispatch }, params) {
      return new Promise((resolve, reject) => [
        Promise.all([
          dispatch('fetchWidyaPostByCategory', params[0]),
          dispatch('fetchTobaPosts', params[1]),
        ])
          .then(responses => {
            const [widyaResponse, tobaResponse] = responses.map(response => response.data)
            const responsesData = [widyaResponse, tobaResponse]
            resolve(responsesData)
          })
          .catch(error => reject(error)),
      ])
    },
    // Action to get data from widya wordpress API Only
    fetchWidyaPostByCategory(context, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('https://widyaanalytic.com/wp-json/wp/v2/posts', { params })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // Action to get data from toba wordpress any category
    fetchTobaPosts(context, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('https://toba.ai/blog/wp-json/wp/v2/posts', { params })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
}
