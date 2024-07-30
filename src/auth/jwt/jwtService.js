import jwtDefaultConfig from '@core/auth/jwt/jwtDefaultConfig'
/* eslint-disable import/no-cycle */
import { preLogout } from '@/auth/utils'
import router from '@/router'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For force logout
  isAlreadyLoggedOut = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      async error => {
        // const { config, response: { status } } = error
        const { response } = error

        // if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyLoggedOut) {
            this.isAlreadyLoggedOut = true

            await preLogout()

            // Refresh window
            router.go(0)
          }
        }
        return Promise.reject(error)
      },
    )
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  loginWithFacebook(...args) {
    return this.axiosIns.post(this.jwtConfig.loginWithFacebookEndpoint, ...args)
  }

  logout(...args) {
    return this.axiosIns.post(this.jwtConfig.logoutEndpoint, ...args)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }
}
