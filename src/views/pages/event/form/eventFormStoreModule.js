import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchEvent(context, eventId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`events/${eventId}/`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    fetchEventForm(context, eventId) {
      return new Promise((resolve, reject) => {
        axios
          .get(`events-form/${eventId}/`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    answerEventForm(context, { eventId, payload }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`events-form/${eventId}/answer/`, payload)
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
