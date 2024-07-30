import axios from '@axios'

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  getters: {
    getCategories: state => {
      const categoriesByBlog = {
        'Widya Analytic': {},
        'Toba.AI': {},
      }
      state.categories.forEach(value => {
        categoriesByBlog[value.yoast_head_json.og_site_name][value.id] = value.name
      })
      return categoriesByBlog
    },
  },
  mutations: {
    SET_ALL_CATEGORIES(state, data) {
      state.categories = data
    },
  },
  actions: {
    fetchAllCategories({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        Promise.all([
          dispatch('fetchTobaCategories'),
          dispatch('fetchWidyaCategories'),
        ])
          .then(responses => {
            const [tobaCategories, widyaAnalyticCategories] = responses.map(response => response.data)
            const responsesData = [...tobaCategories, ...widyaAnalyticCategories]
            commit('SET_ALL_CATEGORIES', responsesData)
            resolve(responsesData)
          })
          .catch(error => reject(error))
      })
    },
    fetchAllPosts({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        Promise.all([
          dispatch('fetchTobaPosts', params),
          dispatch('fetchWidyaPosts', params),
        ])
          .then(responses => {
            const [tobaPost, widyaAnalyticPost] = responses.map(response => response.data)
            const responsesData = [tobaPost, widyaAnalyticPost]
            resolve(responsesData)
          })
          .catch(error => reject(error))
      })
    },
    fetchTobaCategories() {
      const params = {
        exclude: '115, 146, 147,158',
      }
      return new Promise((resolve, reject) => {
        axios
          .get('https://toba.ai/blog/wp-json/wp/v2/categories', {
            params,
            transformRequest: (data, headers) => {
              delete headers.Authorization
              delete headers.common.Authorization
              delete headers['X-Time-Zone']
              return headers
            },
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchTobaPosts(context, params) {
      params.categories_exclude = '115, 146, 147,158'
      return new Promise((resolve, reject) => {
        axios
          .get('https://toba.ai/blog/wp-json/wp/v2/posts', {
            params,
            transformRequest: (data, headers) => {
              delete headers.Authorization
              delete headers.common.Authorization
              delete headers['X-Time-Zone']
              return headers
            },
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchWidyaCategories() {
      const params = {
        exclude: 3,
      }
      return new Promise((resolve, reject) => {
        axios
          .get('https://widyaanalytic.com/wp-json/wp/v2/categories', {
            params,
            transformRequest: (data, headers) => {
              delete headers.Authorization
              delete headers.common.Authorization
              delete headers['X-Time-Zone']
              return headers
            },
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchWidyaPosts(context, params) {
      params.categories_exclude = 3
      return new Promise((resolve, reject) => {
        axios
          .get('https://widyaanalytic.com/wp-json/wp/v2/posts', {
            params,
            transformRequest: (data, headers) => {
              delete headers.Authorization
              delete headers.common.Authorization
              delete headers['X-Time-Zone']
              return headers
            },
          })
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
