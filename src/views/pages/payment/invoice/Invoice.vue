<template>
  <b-container id="invoice">
    <b-card no-body>
      <div class="d-flex justify-content-between p-1 pt-sm-3 px-sm-5">
        <div class="d-flex flex-row align-items-center">
          <b-link
            class="cursor-pointer"
            :to="{ name: `payment-history-${$route.params.item}` }"
          >
            <feather-icon
              icon="ChevronLeftIcon"
              width="20"
              height="20"
              stroke="#368AC8"
            />
          </b-link>
          <h3 class="m-0 ml-75 font-weight-bolder">
            Invoice
          </h3>
        </div>
        <div>
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
            :to="{
              name: 'payment-invoice-download',
              params: { ...$route.params },
            }"
            target="_blank"
          >
            <feather-icon
              icon="PrinterIcon"
              class="mr-50"
            />
            <span class="align-middle">Download</span>
          </b-button>
        </div>
      </div>

      <invoice-view class="w-100 p-1 pt-sm-3 px-sm-5" />
    </b-card>
  </b-container>
</template>

<script>
import { BButton, BLink, BCard, BCardText, BContainer } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

import InvoiceView from './InvoiceView.vue'

export default {
  components: {
    BButton,
    BLink,
    BCard,
    BCardText,
    BContainer,

    InvoiceView,
  },
  directives: {
    Ripple,
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/base/pages/page-payment-invoice.scss";
</style>