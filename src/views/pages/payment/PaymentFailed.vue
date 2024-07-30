<template>
  <div
    id="payment-failed"
    class="p-sm-5"
  >
    <div class="d-flex flex-wrap justify-content-center align-items-center">
      <div class="d-flex flex-column align-items-center justify-content-center mb-2">
        <h3 class="font-weight-bolder mb-1">
          Transaksi Gagal
        </h3>
        <div class="d-flex flex-column text-center mb-2">
          <span class="font-weight-bolder text-black">
            Transaksi Anda gagal karena ada kesalahan teknis.
          </span>
          <span class="font-weight-bolder text-black">
            Silakan coba beberapa saat lagi.
          </span>
        </div>
        <div class="d-flex flex-column mt-75">
          <b-button
            class="mb-1"
            variant="primary"
            :to="{
                name:'payment-order-detail',
                params: {
                  paymentId: $route.params.paymentId,
                  item: $route.params.item,
                  itemId: $route.params.itemId
                }
              }"
          >
            Kembali ke Pembayaran
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
      <b-img
        fluid
        :src="require('@/assets/images/pages/payment-failed.svg')"
        alt="payment-failed-image"
      />
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
@import "@/assets/scss/base/components/join-community.scss";

#payment-failed {
  height: 70vh;

  h3 {
    color: #f7427b;
  }
  .btn {
    max-width: 276px;

    & + .btn {
      text-decoration: underline;
    }
  }
}
</style>