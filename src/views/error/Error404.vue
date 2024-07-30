<template>
  <!-- Error page-->
  <div class="misc-wrapper">
    <div class="misc-inner p-2 pl-lg-3 pr-lg-0">
      <h1 class="mb-1 mb-lg-2 font-large-2 font-weight-bolder text-black">
        Sedang Dikembangkan
      </h1>
      <h3 class="mb-2 mb-lg-3 pr-lg-5 font-medium-3 font-weight-normal">
        Halaman ini masih dalam proses pengembangan. Info selanjutnya akan kami kabari melalui email dan Instagram @widya.analytic atau <a href="https://wa.me/6281225214920?text=Hello%20Toba.AI!%0AMau%20bertanya%20nih..." target="_blank" style="text-decoration: underline;">Hubungi Kami</a>.
      </h3>

      <b-button
        variant="gradient-primary"
        class="mb-2 btn-sm-block"
        :to="{ name: 'beranda' }"
      >
        Kembali ke Beranda
      </b-button>
    </div>
    <div class="py-sm-2 pr-sm-2">
      <!-- image -->
      <b-img
        fluid
        :src="imgUrl"
        alt="Error page"
      />
    </div>
  </div>
<!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import { BButton, BImg } from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/error-v2.svg'),
    }
  },
  computed: {
    imgUrl() {
      return this.downImg
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/base/bootstrap-extended/include'; // Bootstrap includes
@import '@core/scss/vue/pages/page-misc.scss';

.misc-wrapper {
  display: flex;
  flex-basis: 100%;
  min-height: 100vh;
  width: 100%;
  // align-items: center;
  // justify-content: center;

  @include media-breakpoint-down(lg) {
    flex-direction: column;
  }

  .misc-inner {
    // position: relative;
    max-width: 600px;
    text-align: left;

    @include media-breakpoint-down(lg) {
      text-align: center;
    }
  }
}
</style>
