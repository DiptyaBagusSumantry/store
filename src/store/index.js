import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import auth from './auth'
import store from './store'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    auth,
    store,
    verticalMenu,
  },
  strict: process.env.DEV,
})
