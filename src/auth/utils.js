import axios from '@axios'
import ability from '@/libs/acl/ability'
import {
  adminUserAbility, verifiedUserAbility, loggedInUserAbility, initialAbility,
} from '@/libs/acl/config'
import {
  captureMessage, configureScope, setContext, setUser,
} from '@sentry/vue'
// eslint-disable-next-line import/no-cycle
import useJwt from './jwt/useJwt'

/**
 * This function is used for set auth cookie
 * @param {String} cname Cookie name
 * @param {String} cvalue Cookie value
 * @param {Number} exdays Cookie expiry in days
 */
export const setCookie = (cname, cvalue, exdays = 1) => {
  let cookie = `${cname}=${cvalue};`
  if (exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    const expires = `expires=${d.toUTCString()}`
    cookie = `${cookie + expires};`
  }
  cookie += 'path=/'
  document.cookie = cookie
}

/**
 * This function is used for get auth cookie
 * @param {String} cname Cookie name
 */
export const getCookie = cname => {
  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

/**
 * This function is used for delete auth cookie
 * @param {String} cname Cookie name
 */
export const deleteCookie = cname => {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

/**
 * Return true if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => Boolean(
  localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName),
)

/**
 * This function is used for get user data
 */
export const getUserData = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (!userData) return {}
  let photoURL = ''
  if (userData.profile) {
    photoURL = userData.profile.photo_url ? userData.profile.photo_url : ''
  }
  return {
    ...userData,
    fullName: `${userData.first_name} ${userData.last_name}`.trim(),
    isAdmin: Boolean(userData.is_superuser || userData.is_staff),
    isVerified: userData.is_verified,
    photoURL,
  }
}

/**
 * This function is used for update user data
 * @param {Object} payload Updated data
 */
export const updateUserData = payload => {
  // Get Data localStorage
  const userData = JSON.parse(localStorage.getItem('userData')) || {}

  Object.keys(payload).forEach(property => {
    // Update key in localStorage
    userData[property] = payload[property]
  })

  // Store data in localStorage
  localStorage.setItem('userData', JSON.stringify(userData))
}

/**
 * Return true if user is verified
 */
// eslint-disable-next-line arrow-body-style
export const isUserVerified = () => {
  const isLoggedIn = isUserLoggedIn()
  if (isLoggedIn) {
    const { isVerified } = getUserData()
    return Boolean(isVerified)
  }
  return false
}

/**
 * Return true if user is admin
 */
// eslint-disable-next-line arrow-body-style
export const isUserAdmin = () => {
  const isLoggedIn = isUserLoggedIn()
  if (isLoggedIn) {
    const { isAdmin } = getUserData()
    return Boolean(isAdmin)
  }
  return false
}

/**
 * Update user abiities, based userData
 */
export const updateUserAbility = () => new Promise(resolve => {
  // Define user ability
  let userAbility = loggedInUserAbility
  if (isUserAdmin()) userAbility = adminUserAbility
  else if (isUserVerified()) userAbility = verifiedUserAbility

  ability.update(userAbility)

  // Change userData in localStorage
  resolve(updateUserData({ ability: userAbility }))
})

/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return '/'
  if (userRole === 'client') return { name: 'access-control' }
  return { name: 'auth-login' }
}

/**
 * Navidate user to other site if redirect_uri route query exist
 * @param {Object} route To route
 */
export const handleRedirectURI = async route => {
  let href = route.query.redirect_uri
  if (isUserLoggedIn()) {
    href = `${href}?session_token=${useJwt.getToken()}&session_expiry=${localStorage.getItem('sessionExpiry')}`
  }
  Object.entries(route.query).forEach(([key, value]) => {
    if (key !== 'redirect_uri') {
      href += `&${key}=${encodeURIComponent(value)}`
    }
  })
  window.location.replace(href)
}

/**
 * This function is used for start logged in user
 * @param {Object} userData User data from login response
 * @param {String} accessToken User access token
 * @param {Boolean} rememberMe True if remember me button clicked
 */
export const initLogin = async (userData, accessToken, rememberMe = false) => {
  localStorage.setItem('userData', JSON.stringify(userData))

  // Update user ability, based userData
  await updateUserAbility()
  // console.log(userData)
  return new Promise(resolve => {
    useJwt.setToken(accessToken)

    const expDays = rememberMe ? 1 : null
    setCookie('loginstatus', 'loggedin', expDays)
    localStorage.setItem('sessionExpiry', expDays)

    // Sentry set user
    setContext('activeUser', { fullName: userData.fullName })
    setUser({
      id: userData.id,
      email: userData.email,
    })
    captureMessage('User login successfully', 'info')

    resolve()
  })
}

/**
 * This function is used for start logout
 */
export const preLogout = () => new Promise(resolve => {
  // Remove userData from localStorage
  // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
  localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
  localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

  // Remove Authorization axios header
  delete axios.defaults.headers.common.Authorization

  // Reset ability
  ability.update(initialAbility)

  // Remove userData from localStorage
  localStorage.removeItem('userData')

  // Remove sessionExpiry from localStorage
  localStorage.removeItem('sessionExpiry')

  // Remove local payments data from localStorage
  localStorage.removeItem('currentPaymentProduct')
  localStorage.removeItem('currentPaymentEvent')

  deleteCookie('loginstatus')

  // Remove user from Sentry
  resolve(configureScope(scope => {
    scope.clear()
    scope.setUser(null)
  }))
})

/**
 * This function is used for logout
 */
export const logout = async () => {
  await useJwt.logout()
  return Promise.resolve(preLogout())
}
