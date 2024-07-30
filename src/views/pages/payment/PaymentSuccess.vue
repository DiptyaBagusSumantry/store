<template>
  <div
    id="payment-success"
    class="p-sm-5"
  >
    <div class="payment-success d-flex justify-content-center align-items-center align-items-sm-end">
      <div class="payment-success-content d-flex flex-column align-items-center justify-content-between mb-3">
        <b-img
          :src="require('@/assets/images/icons/payment-success.svg')"
          alt="payment-succes-icon"
          width="60"
          height="60"
          class="mb-4"
        />
        <div class="d-flex flex-column text-center">
          <h3 class="font-weight-bolder">
            Terima kasih sudah melakukan pembayaran!
          </h3>
          <p class="font-weight-bolder mt-1">
            Mohon ditunggu, transaksi Anda sedang kami proses.
          </p>
        </div>
        <div class="d-flex flex-column mt-75">
          <b-button
            class="mb-1"
            variant="primary"
            :to="{ name: `payment-history-${$route.params.item}` }"
          >
            Lihat Riwayat Transaksi
          </b-button>
          <b-button
            class="w-100"
            variant="flat-primary"
            @click="$refs['join-community-modal'].show()"
          >
            Gabung Komunitas
          </b-button>
        </div>
      </div>
    </div>

    <b-modal
      ref="join-community-modal"
      modal-class="payment-modal"
      hide-footer
      centered
      header-bg-variant="white"
    >
      <join-community />
    </b-modal>
  </div>
</template>

<script>
import { BButton, BCard, BImg, BModal } from 'bootstrap-vue'
import JoinCommunity from './components/JoinCommunity.vue'

export default {
  components: {
    BButton,
    BCard,
    BImg,
    BModal,

    JoinCommunity,
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/base/pages/page-payment-success.scss";
@import "@/assets/scss/base/components/join-community.scss";
</style>