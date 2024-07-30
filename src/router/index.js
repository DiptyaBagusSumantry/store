import Vue from 'vue'
import VueRouter from 'vue-router'
import { configureScope, setContext, setUser } from '@sentry/vue'

import { canNavigate } from '@/libs/acl/routeProtection'
// eslint-disable-next-line import/no-cycle
import {
  isUserLoggedIn,
  isUserVerified,
  handleRedirectURI,
  getCookie,
  logout,
  getUserData,
} from '@/auth/utils'

// Routes
import landing from './routes/landing'
import pages from './routes/pages'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash }
    }
    return { x: 0, y: 0 }
  },
  routes: [
    ...landing,
    ...pages,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach(async (to, _, next) => {
  // Logout token if cookie not set
  if (isUserLoggedIn() && getCookie('loginstatus') !== 'loggedin') {
    await logout()
  }

  const isLoggedIn = isUserLoggedIn()
  const isVerified = isUserVerified()
  const userData = getUserData()

  if (isLoggedIn) {
    setContext('activeUser', { fullName: userData.fullName })
    setUser({
      id: userData.id,
      email: userData.email,
    })
  } else {
    configureScope(scope => {
      scope.clear()
      scope.setUser(null)
    })
  }

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login', query: { to: to.fullPath } })

    // Navigate User to account verification page
    if (!isVerified && !to.meta.redirectIfVerified) {
      return next({ name: 'account-verification' })
    }
  }

  // Redirect if verified
  if (to.meta.redirectIfVerified && isVerified) {
    next({ name: 'beranda' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const { route: toRoute } = router.resolve(to.fullPath)
    if (toRoute.query.redirect_uri && isVerified) {
      if (toRoute.name === 'auth-logout') {
        await logout()
      }
      next(handleRedirectURI(toRoute))
    } else next({ name: 'beranda' })
  }

  if (to.name === 'auth-logout' && !isLoggedIn) {
    next({ name: 'auth-login', query: to.query })
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
