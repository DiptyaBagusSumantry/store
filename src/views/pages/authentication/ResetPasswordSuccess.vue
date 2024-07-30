<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <b-card class="mb-0 text-center px-sm-3 py-sm-2">
        <b-img
          class="mb-2"
          alt=""
          :src="require('@/assets/images/icons/change-success.svg')"
        />

        <b-card-title class="text-black font-weight-bolder mb-2">
          Berhasil Disimpan!
        </b-card-title>
        <b-card-text>
          Password baru Anda berhasil disimpan. Masuk kembali untuk melanjutkan.
        </b-card-text>

        <b-button
          class="mt-2 mt-sm-3 mx-auto"
          size="sm"
          variant="primary"
          :to="{ name: 'auth-login' }"
        >
          Masuk
        </b-button>
      </b-card>

    </div>
  </div>
</template>

<script>
import {
  BButton, BCard, BCardTitle, BCardText, BImg
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BCard,
    BCardTitle,
    BCardText,
    BImg,
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-auth.scss';
</style>