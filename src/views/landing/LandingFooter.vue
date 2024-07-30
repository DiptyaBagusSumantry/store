<template>
  <div
    id="landing-footer"
    class="bg-white"
    :class="{'bg-rounded-3': $route.name === 'landing'}"
  >
    <b-container
      class="landing-content bg-image footer-container d-flex flex-column"
      :class="{'pt-2 bg-image-landing footer-container-landing': $route.name === 'landing'}"
    >
      <landing-interest
        v-if="$route.name === 'landing'"
        class="interest-section"
      />
      <footer class="d-flex pt-lg-3 flex-column mt-auto">
        <div class="d-flex flex-column flex-lg-row justify-content-lg-around align-items-center align-items-lg-start mt-2 mb-sm-1">
          <div class="footer-logo d-flex flex-column align-items-center align-items-lg-start mb-1 mb-md-2 mb-md-3">
            <div>
              <b-img
                :src="appLogoImage"
                width="220"
              />
            </div>
            <p class="my-1 my-lg-2">Mari tetap terhubung dengan kami melalui link di bawah.</p>
            <div class="d-flex justify-content-start">
              <b-button
                href="https://widyaanalytic.com"
                target="_blank"
                variant="primary"
                class="mr-75 btn-icon rounded-circle"
              >
                <feather-icon
                  icon="GlobeIcon"
                  size="24"
                />
              </b-button>
              <b-button
                href="https://www.instagram.com/widya.analytic/?hl=en"
                target="_blank"
                variant="primary"
                class="mr-75 btn-icon rounded-circle">
                <feather-icon
                  icon="InstagramIcon"
                  size="24"
                />
              </b-button>
              <b-button
                href="https://www.youtube.com/c/WidyaAnalytic"
                target="_blank"
                variant="primary"
                class="mr-75  btn-icon rounded-circle"
              >
                <feather-icon
                  icon="YoutubeIcon"
                  size="24"
                />
              </b-button>
              <b-button
                href="https://www.facebook.com/TobaAI/"
                target="_blank"
                variant="primary"
                class="mr-75 btn-icon rounded-circle"
              >
                <feather-icon
                  icon="FacebookIcon"
                  size="24"
                />
              </b-button>
              <b-button
                href="https://twitter.com/widya_analytic"
                target="_blank"
                variant="primary"
                class="mr-75 btn-icon rounded-circle"
              >
                <feather-icon
                  icon="TwitterIcon"
                  stroke-width="1"
                  fill="white"
                  size="24"
                />
              </b-button>
              <b-button
                class="btn-icon rounded-circle spotify"
                target="_blank"
                variant="primary"
                href="https://open.spotify.com/show/6mjUtJqRYRGvtf32bBNTXD"
              >
                <b-img
                  class="rounded"
                  src="@/assets/images/icons/spotify.svg"
                />
              </b-button>
            </div>
          </div>
          <div class="mb-1 mb-md-2 mb-lg-3 mt-1 mt-md-0 mt-lg-2">
            <h3 class="font-weight-bolder mb-1 mb-lg-3">
              Produk
            </h3>
            <ul
              class="cursor-pointer"
              style="list-style-type:none;margin:0;padding:0"
            >
              <li><a class="text-reset" href="https://toba.ai" target="_blank">Toba.AI</a></li>
              <li><a class="text-reset" href="https://wa.me/6285171609661?text=Hello%20Widya Analytic!%0AButuh%20informasi%20lebih%20lanjut%20tentang%20Toba%20Apps%20nih..." target="_blank">Toba Apps</a></li>
              <li><a class="text-reset" href="https://tobadata.widyaanalytic.com" target="_blank">Toba Data</a></li>
              <li><a class="text-reset" href="https://wa.me/6285171609661?text=Hello%20Widya Analytic!%0AButuh%20informasi%20lebih%20lanjut%20tentang%20Toba%20Algo%20nih..." target="_blank">Toba Algo</a></li>
              <li><a class="text-reset" href="https://widyaanalytic.com/tobalabs/" target="_blank">Toba Labs</a></li>
            </ul>
          </div>
          <div class="footer-address mt-1 mt-md-0 mt-lg-2 font-weight-bolder">
            <h3 class="font-weight-bolder d-flex d-lg-block justify-content-center mb-1 mb-lg-3">
              Alamat Kami
            </h3>
            <div class="d-flex align-items-start mb-1 mb-lg-2">
              <div class="mr-75">
                <b-img src="@/assets/images/icons/phone.svg" />
              </div>
              <div class="ml-1 align-items-start">
                <span>0812 2521 4920</span>
              </div>
            </div>
            <div class="d-flex align-items-start mb-1 mb-lg-2">
              <div class="mr-75">
                <b-img src="@/assets/images/icons/mail.svg" />
              </div>
              <div class="ml-75">
                <span>bisnis@widyaanalytic.com</span>
              </div>
            </div>
            <div class="d-flex align-items-start">
              <div class="mr-75">
                <b-img src="@/assets/images/icons/maps.svg" />
              </div>
              <div class="ml-75">
                <span>Widya Space, Jl Kabupaten KM 3, Ngawean, Trihanggo, Kec. Gamping, Sleman, DIY, 55291</span>
              </div>
            </div>
          </div>
        </div>
        <div class="d-block text-center font-weight-bolder mt-auto mb-md-1">
          <p class="mb-0 font-small-1">
            <span>
              MADE WITH PASSION by WIDYA ANALYTIC © {{ new Date().getFullYear() }}
              <span class="d-none d-sm-inline-block"> ALL RIGHTS RESERVED</span>
            </span>
          </p>
        </div>
      </footer>

    </b-container>
  </div>
</template>

<script>
import {
  BImg,
  BRow,
  BCol,
  BButton,
  BContainer,
} from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import { computed } from '@vue/composition-api'
import { isUserLoggedIn } from '@/auth/utils'

import LandingInterest from './LandingInterest'

export default {
  components: {
    BImg,
    BRow,
    BCol,
    BButton,
    BContainer,

    LandingInterest,
  },
  setup() {
    // App Logo
    const { appLogoImage } = $themeConfig.app

    const isLoggedIn = computed(() => isUserLoggedIn())
    return {
      appLogoImage,

      isLoggedIn,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base/pages/page-landing.scss';
@import '@core/scss/base/bootstrap-extended/include';

#landing-footer {
  width: 100%;
  margin: auto;

  footer {
    height: 380px;

    h3 {
      color: $toba-blue-dark;
    }

    .footer {
      &-logo {
        p {
          width: 320px;
        }
        .btn-icon {
          border: 0 !important;
        }
      }
      &-address {
        width: 352px;
      }
    }
    .spotify {
      img {
        height: 16px !important;
        margin-top: 4px;
      }
    }
  }

  @media (min-width: 1840px) {
    footer {
      height: 360px;
    }
  }
  @include media-breakpoint-down(md) {
    footer {
      height: 640px;

      ul {
        text-align: center;
      }
      .footer-logo {
        p {
          text-align: center;
        }
      }
    }
  }

  .footer-container {
    height: 480px;
    @include media-breakpoint-down(md) {
      height: 680px;
    }
    @include media-breakpoint-down(sm) {
      height: 620px;
    }

    &-landing {
      height: 1040px;
      @include media-breakpoint-down(md) {
        height: 1480px;
      }
      @include media-breakpoint-down(sm) {
        height: 1280px;
      }
    }
  }
  .interest-section {
    margin-top: 80px;
    @include media-breakpoint-down(md) {
      margin-top: 150px;
    }
    @include media-breakpoint-down(sm) {
      margin-top: 270px;
    }
  }

  .bg-image {
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-position: bottom;
    background-size: cover;

    background-image: url("~@/assets/images/footer/background.svg");
    background-position: top;
    background-size: cover;

    &-landing {
      background-image: url("~@/assets/images/footer/background-2.png");
      background-repeat: no-repeat;
      background-attachment: scroll;
      background-position: top;
      background-size: cover;

      @include media-breakpoint-down(sm) {
        background-image: url("~@/assets/images/footer/background-2-mobile.png");
        background-position: bottom;
        background-size: auto;
      }
    }
  }
}
</style>