<template>
  <div>
    <div class="pdf-page mx-auto d-flex flex-column justify-content-between">
      <div>
        <div class="content-header">
          <div class="mb-5 d-flex flex-row justify-content-between">
            <div class="font-weight-bolder title-pdf text-black">
              {{ pageTitle }}
            </div>
            <img
              class="ml-2"
              :src="appLogoImage"
              width="153.49px"
              alt="widya analytic logo"
            >
          </div>
        </div>
        <div>
          <slot name="content" />
        </div>
      </div>
      <div class="content-footer">
        <hr class="mb-5">
        <div class="d-flex flex-row flex-nowrap justify-content-around align-items-center">
          <img
            class="ml-2"
            :src="appLogoImage"
            width="153.49px"
            alt="widya analytic logo"
          >
          <h3 class="font-weight-bolder text-black">
            CUSTOMER SUPPORT :
          </h3>
          <div class="d-flex flex-row">
            <feather-icon
              class="mr-2"
              icon="PhoneIcon"
              size="30"
            />
            <h3 class="font-weight-bolder ">
              0812 2521 4920
            </h3>
          </div>
          <div class="d-flex flex-row">
            <feather-icon
              class="mr-2"
              icon="MailIcon"
              size="30"
            />
            <h3 class="font-weight-bolder ">
              bisnis@widyaanalytic.com
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BImg } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'

import VueHtml2pdf from 'vue-html2pdf'

export default {
  components: {
    BImg,

    VueHtml2pdf,
  },
  props: {
    pageTitle: {
      type: String,
      default: null,
    },
  },
  setup() {
    const { appLogoImage } = $themeConfig.app

    return {
      appLogoImage,
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';

.pdf-page {
  width: 1440px;
  height: 2038px;
  padding: 60px 46px 40px 46px;

  .title {
    &-pdf {
      font-size: 42px;
    }
  }

  .content{
    &-footer {
      & hr {
        border-top: 8px solid $primary !important
      }
    }
  }
}
</style>