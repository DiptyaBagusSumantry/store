<template>
  <div>
    <b-img
      alt="account-verification-alternative"
      width="294"
      fluid
      :src="require('@/assets/images/pages/account-verification.svg')"
      class="mb-2 mb-lg-3"
    />
    <b-card-title class="mb-1 mb-lg-2">
      <h2><span class="font-weight-normal">Hai</span> <strong>{{ userData.fullName }}</strong></h2>
    </b-card-title>
    <b-card-text>
      Batas maksimal minta email konfirmasi hanya 3x. <br>Kalau masih belum dapat juga, silakan klik tombol di bawah.
    </b-card-text>

    <div class="mt-2 mt-lg-3">
      <b-button
        variant="gradient-primary"
        class="px-3"
        href="https://wa.me/6281225214920"
        target="_blank"
      >
        <small class="font-weight-bolder">Hubungi Kami</small>
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  BButton, BImg, BCardTitle, BCardText
} from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    BButton,
    BCardTitle,
    BCardText,
    BImg,
  },
  computed: {
    userData() {
      return getUserData()
    },
  },
}
</script>
