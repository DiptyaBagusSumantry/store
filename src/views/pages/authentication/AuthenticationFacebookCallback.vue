<template>
  <div id="loading-bg">
    <div class="loading-logo">
      <img src="../../../../public/logo.png" alt="Logo" />
    </div>
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
</template>

<script>
import useJwt from '@/auth/jwt/useJwt'
import { deleteCookie, initLogin, handleRedirectURI, isUserVerified } from '@/auth/utils'
import router from '@/router'

export default {
  setup() {
    const { query: currentRouteQuery } = router.currentRoute

    useJwt
      .loginWithFacebook({ code: currentRouteQuery.code })
      .then(async response => {
        localStorage.removeItem('authLoginInfo')

        const { user: userData, token: accessToken } = response.data
        await initLogin(userData, accessToken)

        // Navigate User to homepage or redirect to other app
        if (currentRouteQuery.redirect_uri && isUserVerified()) {
          handleRedirectURI(router.currentRoute)
        } else router.push(currentRouteQuery.to || { name: 'beranda' })
      })
      .catch(() => {
        deleteCookie('loginstatus')

        const route = { name: 'auth-login' }
        if (currentRouteQuery.redirect_uri) {
          route.query = { redirect_uri: currentRouteQuery.redirect_uri }
        }

        router.replace(route)
      })

    return {}
  },
}
</script>

<style>
@import url('../../../../public/loader.css');
</style>