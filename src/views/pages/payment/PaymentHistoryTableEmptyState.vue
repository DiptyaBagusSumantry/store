<template>
  <div
    id="payment-table-empty-state"
    class="p-1 p-sm-5"
  >
    <div class="d-flex justify-content-center">
      <b-img
        src="@/assets/images/payment/empty-state/empty-state-payment-table.svg"
        alt="No transaction"
      />
    </div>
    <div class="d-flex justify-content-center">
      <h4 class="font-weight-bolder">
        {{ tableName === 'eventTicket' ? "Belum punya ticket" : "Belum ada transaksi" }}
      </h4>
    </div>
    <div class="d-flex justify-content-center">
      <h5 class="text-center">
        {{ tableName === 'eventTicket' ? "Anda tidak memiliki tiket untuk event & course yang akan datang" : "Anda belum melakukan transaksi" }}
      </h5>
    </div>
    <div class="mt-3 d-flex justify-content-center">
      <b-button
        variant="primary"
        :to="toButton"
      >
        {{ tableName === 'productPayment' ? "Pergi ke Store" : "Pergi ke Event & Course" }}
      </b-button>
    </div>
  </div>
</template>
<script>
import { BImg, BButton } from 'bootstrap-vue'
export default {
  props: {
    tableName: {
      type: String,
      required: true,
    }
  },
  computed: {
    toButton() {
      if (this.tableName === 'productPayment') {
        return { name: 'store' }
      } else {
        return { name: 'event' }
      }
    },
  },
  components: {
    BImg,
    BButton,
  }
}
</script>

<style lang="scss">
  #payment-table-empty-state {
    h5 {
      width: 300px;
      font-weight: 400;
    }
  }
</style>