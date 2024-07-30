import Vue from 'vue'

// axios
import axios from 'axios'

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const axiosIns = axios.create({
  baseURL: 'restapi/',
  // timeout: 1000,

  // Make Axios play nice with Django CSRF
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  xhrFields: {
    withCredentials: true,
  },

  headers: {
    'accept': 'application/json',
    'accept-language': 'id,en-US,en-GB,en;q=0.9',
    'X-Time-Zone': timeZone,
  }
})

Vue.prototype.$http = axiosIns

export default axiosIns
