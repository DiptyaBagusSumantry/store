<template>
  <div class="navbar-container d-flex content align-items-center justify-content-between">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav mr-1 d-lg-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      id="navbar-left"
      class="align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <b-link
        class="navbar-brand"
        :to="{ name: 'landing' }"
      >
        <b-img
          :src="appLogoImage"
          width="122.79"
          alt="widya analytic logo"
        />
      </b-link>
      <div
        v-if="$route.name === 'landing' || $route.name === 'about'"
        class="ml-5 mr-1 d-flex align-items-center cursor-pointer font-weight-bold"
      >
        <b-dropdown
          id="dropdown-1"
          variant="flat-secondary"
        >
          <template #button-content>
            <div class="d-flex align-items-center">
              <p class="text-toba-gradient-blue font-weight-bold mb-0">
                Tentang
              </p>
              <b-img
                class="ml-75"
                src="@/assets/images/icons/chevron-down-gradient-blue.svg"
              />
            </div>
          </template>
          <div v-for=" (item, index) in aboutNavMenuItems" :key="index">
            <div v-if="item.hasOwnProperty('children')">
              <b-dropdown
                id="dropdown-2"
                dropright
                text="Profile"
                variant="flat-secondary"
                class="btn-block align-items-start"
              >
                <b-dropdown-item
                  v-for=" (item2, index) in item.children"
                  :key="index"
                  :to="item2.to"
                  @click="scrollOnPage"
                >
                  {{ item2.name }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div v-else>
              <b-dropdown-item
                v-if="item.hasOwnProperty('to')"
                :to="item.to"
                @click="scrollOnPage"
              >
                {{ item.name }}
              </b-dropdown-item>
              <b-dropdown-item
                v-else
                :href="item.href"
                target="_blank"
              >
                {{ item.name }}
              </b-dropdown-item>
            </div>
          </div>
        </b-dropdown>
        <b-dropdown
          id="dropdown-3"
          variant="flat-secondary"
          class="ml-2"
        >
          <template #button-content>
            <div class="d-flex align-items-center user-nav">
              <p class="text-toba-gradient-blue font-weight-bold mb-0">
                Layanan Kami
              </p>
              <b-img
                class="ml-75"
                src="@/assets/images/icons/chevron-down-gradient-blue.svg"
              />
            </div>
          </template>
          <b-dropdown-item
            v-for="(item2, index) in serviceNavMenuItems"
            :key="index"
            :to="item2.to"
            @click="scrollOnPage"
          >
            {{ item2.name }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <b-navbar-nav
      id="navbar-right"
      v-if="!isLoggedIn"
      class="nav align-items-center ml-auto"
    >
      <div class="mr-1">
        <b-button
          variant="outline-primary"
          :to="{ name: 'auth-login' }"
        >
          Masuk
        </b-button>
      </div>
      <b-button
        class="d-none d-md-block"
        variant="gradient-primary"
        :to="{ name: 'auth-register' }"
      >
        Daftar
      </b-button>
    </b-navbar-nav>
    <b-navbar-nav
      v-else
      class="nav align-items-center ml-auto"
    >
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ userData.fullName }}
            </p>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            style="object-fit: cover;"
            :src="userData.photoURL"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          :to="{ name: 'beranda' }"
        >
          <span>Beranda</span>
        </b-dropdown-item>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          :to="{ name: 'profile-setting' }"
        >
          <span>Akun Saya</span>
        </b-dropdown-item>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Keluar</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BAvatar, BButton,BDropdown, BDropdownDivider, BDropdownItem, BImg, BLink, BNavbarNav, BNavItemDropdown,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import { getUserData, isUserLoggedIn, logout } from '@/auth/utils'
import { $themeConfig } from '@themeConfig'
import { useRouter } from '@core/utils/utils'

export default {
  components: {
    BAvatar,
    BButton,
    BDropdown,
    BDropdownDivider,
    BDropdownItem,
    BImg,
    BLink,
    BNavbarNav,
    BNavItemDropdown,

    // Navbar Components
    DarkToggler,
  },
  data() {
      return {
        name: 'BootstrapVue',
        isDropdown2Visible: false,
        aboutNavMenuItems: [{
          children: [
            {
              name: 'Widya Analytic',
              to: { name: 'about', hash: '#widya-analytic-section' }
            },
            {
              name: 'Portofolio',
              to: { name: 'about', hash: '#portofolio-section' }
            },
            {
              name: 'Klien & Partner',
              to: { name: 'about', hash: '#partner-section' }
            },
            {
              name: 'Sertifikat',
              to: { name: 'about', hash: '#certificate-section' }
            },
            {
              name: 'Award',
              to: { name: 'about', hash: '#reward-section' }
            },
          ]
        },
        {
          name: 'Karir',
          href: 'https://widyaanalytic.com/career/'
        },
        {
          name: 'Kegiatan',
          to: { name: 'landing', hash: '#landing-event' }
        }],
        serviceNavMenuItems: [
          {
            name: 'Solusi',
            to: { name: 'landing', hash: '#landing-service' }
          },
          {
            name: 'Produk',
            to: { name: 'landing', hash: '#landing-product' }
          },
        ]
      }
    },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    userData() { return getUserData() },
    isLoggedIn() { return isUserLoggedIn() },
  },
  methods: {
    logout() {
      logout().then(() => {
        // Refresh window
        this.$router.go(0)
      })
    },
  },
  mounted() {
    this.$root.$on('bv::dropdown::show', bvEvent => {
      if (bvEvent.componentId === 'dropdown-2') {
        this.isDropdown2Visible = true;
      }
    })
    this.$root.$on('bv::dropdown::hide', bvEvent => {
      if (bvEvent.componentId === 'dropdown-2') {
        this.isDropdown2Visible = false;
      }
      if (this.isDropdown2Visible) {
        bvEvent.preventDefault()
      }
    })
  },
  setup() {
    const { route } = useRouter()
    const { appLogoImage } = $themeConfig.app

    const scrollOnPage = () => {
      setTimeout(() => {
        const hash = route.value.hash.replace('#', '')
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 1000)
    }
    return {
      appLogoImage,
      scrollOnPage,
    }
  }
}
</script>
