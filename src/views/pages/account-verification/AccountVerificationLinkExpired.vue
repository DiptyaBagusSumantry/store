<template>
  <div>
    <b-img
      alt="account-verification-link-expired"
      width="294"
      fluid
      :src="require('@/assets/images/pages/account-verification-link-expired.svg')"
      class="mb-2 mb-lg-3"
    />
    <b-card-title class="mb-1 mb-lg-2">
      <h2>Link Kadaluarsa</h2>
    </b-card-title>
    <b-card-text>
      Verifikasi gagal karena link yang Anda pakai sudah kadaluarsa.
    </b-card-text>

    <div class="mt-2 mt-lg-3">
      <b-button
        variant="gradient-primary"
        :to="{ name: 'account-verification' }"
        class="px-3"
      >
        <small class="font-weight-bold">Coba Lagi</small>
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  BButton, BImg, BCardTitle, BCardText
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BCardTitle,
    BCardText,
    BImg,
  },
}
</script>