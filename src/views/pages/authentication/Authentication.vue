<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner auth-bg m-0">

      <!-- Left Text-->
      <b-col
        lg="7"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Auth-->
      <b-col
        lg="5"
        class="d-flex align-items-stretch p-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="d-flex flex-column px-xl-2 mx-auto"
        >
          <b-link class="brand-logo text-center mb-2">
            <b-img
              :src="require('@/assets/images/logo/toba-logo.svg')"
              alt="toba-logo"
              width="193"
            />
          </b-link>

          <b-tabs align="center" class="mb-5">
            <b-tab
              title="Masuk"
              class="pt-lg-1"
              :active="!Boolean(activeTab)"
              lazy
            >
              <authentication-login />
            </b-tab>
            <b-tab
              title="Daftar"
              lazy
              :active="Boolean(activeTab)"
              class="pt-lg-1"
            >
              <authentication-register />
            </b-tab>
          </b-tabs>

          <p class="text-right mt-auto">
            <span>made with passion by</span>
            <b-link :to="{ name: 'landing' }">
              <b-img
                class="ml-1"
                :src="appLogoImage"
                height="30"
              />
            </b-link>
          </p>
        </b-col>
      </b-col>
    <!-- /Auth-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { $themeConfig } from '@themeConfig'
import {
  BRow, BCol, BLink, BImg, BTabs, BTab
} from 'bootstrap-vue'
import { ref, provide } from '@vue/composition-api'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import axios from '@axios'
import AuthenticationLogin from './AuthenticationLogin.vue'
import AuthenticationRegister from './AuthenticationRegister.vue'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BImg,
    BTabs,
    BTab,
    AuthenticationLogin,
    AuthenticationRegister,
  },
  mixins: [togglePasswordVisibility],
  props: {
    activeTab: {
      required: true,
      type: [Boolean, Number],
    }
  },
  data() {
    return {
      sideImg: require('@/assets/images/pages/login-v3.svg'),
    }
  },
  computed: {
    imgUrl() {
      return this.sideImg
    },
  },
  setup() {
    const userCategories = ref([])

    // Fetch user categories data
    axios
      .get('user-management/categories/')
      .then(response => { userCategories.value = response.data })

    provide('userCategories', userCategories)
    console.log(userCategories)
    // App Name
    const { appLogoImage } = $themeConfig.app
    return {
      appLogoImage,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
.brand-logo {
  position: static !important;
  svg {
    height: 40px !important;
    width: 193px !important;
  }
}

// Basic Nav Tabs
.nav-tabs {
  box-shadow: 0px 5px 13px -15px rgba(0, 0, 0, 0.4);
  .nav-link {
    &.active {
      font-weight: 600 !important;
    }
  }
}
</style>
