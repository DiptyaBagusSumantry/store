<template>
  <layout-vertical>

    <router-view />

    <template #navbar="{ toggleVerticalMenuActive }">
      <navbar :toggle-vertical-menu-active="toggleVerticalMenuActive" />
      <sidebar-toggler
        v-if="$route.name !== 'landing'"
        :toggle-vertical-menu-active="toggleVerticalMenuActive"
      />
    </template>

    <template #vertical-menu-header="{ toggleVerticalMenuActive }">
      <ul class="nav navbar-nav flex-row align-items-center">

        <!-- Logo & Text -->
        <li class="nav-item mr-auto">
          <b-link
            class="navbar-brand"
            to="/"
          >
            <b-img
              :src="appLogoImage"
              width="130"
              alt="logo"
            />
          </b-link>
        </li>

        <!-- Toggler Button -->
        <li class="nav-item nav-toggle">
          <b-link class="nav-link modern-nav-toggle">
            <feather-icon
              icon="XIcon"
              size="20"
              class="d-block d-xl-none"
              @click="toggleVerticalMenuActive"
            />
          </b-link>
        </li>
      </ul>
    </template>

    <template #vertical-menu-items>
      <component
        :is="resolveNavMenuItem()"
        :items="navMenuItems"
        class="navigation navigation-main"
      />
    </template>

    <template #footer>
      <landing-footer v-if="$route.name === 'landing' || !isLoggedIn" />
      <footer v-else />
    </template>
  </layout-vertical>
</template>

<script>
import { BImg, BLink } from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
import { isUserLoggedIn } from '@/auth/utils'
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
import { $themeConfig } from '@themeConfig'
import store from '@/store'
import { useRouter } from '@core/utils/utils'

import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue'
import VerticalLandingNavMenuItems from '@core/layouts/layout-vertical/components/vertical-nav-menu/components/vertical-nav-menu-items/VerticalNavMenuItems.vue'
import Navbar from '@/layouts/components/Navbar.vue'
import SidebarToggler from '@/layouts/components/SidebarToggler'
import LandingFooter from '@/views/landing/LandingFooter'

export default {
  components: {
    // AppCustomizer,
    BImg,
    BLink,
    SidebarToggler,
    LayoutVertical,
    Navbar,
    VerticalNavMenuItems,
    VerticalLandingNavMenuItems,

    // Components
    LandingFooter,
  },
  setup() {
    // const { isNavMenuHidden } = useAppConfig()
    const { appLogoImage } = $themeConfig.app

    const isLoggedIn = computed(() => isUserLoggedIn())
    const navMenuItems = computed(() => store.getters['verticalMenu/navMenuItems'])

    /**
     * Return which component to render based on current route
     */
    const resolveNavMenuItem = () => {
      const { route } = useRouter()
      if (route.value.name === 'landing') {
        return 'vertical-landing-nav-menu-items'
      }
      return 'vertical-nav-menu-items'
    }

    return {
      navMenuItems,
      appLogoImage,
      isLoggedIn,
      resolveNavMenuItem,
    }
  }
}
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/vertical-menu.scss";
</style>
