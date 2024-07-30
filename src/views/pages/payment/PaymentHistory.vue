<template>
  <b-container id="payment-history">
    <b-card
      class="p-2 py-sm-3 px-sm-4 mb-0"
      no-body
    >
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="text-primary font-weight-bolder">Riwayat transaksi</h3>
        <b-button
          variant="outline-secondary"
          class="d-flex align-items-center"
          @click="refreshTable()"
        >
          <feather-icon
            icon="RefreshCwIcon"
            size="16"
            class="mr-50"
          />
          <span class="font-weight-bold">Refresh Tabel</span>
        </b-button>
      </div>
      <p class="font-weight-normal mt-75 mt-sm-0">Semua riwayat transaksi Anda akan tersimpan di sini</p>
      <b-tabs class="mt-1">
        <b-tab
          title="Tiket"
          lazy
          :active="!Boolean(activeTab)"
        >
          <div class="d-flex">
            <b-button
              class="mr-1"
              :variant="tabIndex === 0 ? 'outline-primary' : 'outline-secondary'"
              @click="tabIndex = 0"
            >
              Tiket Saya
            </b-button>
            <b-button
              :variant="tabIndex === 1 ? 'outline-primary' : 'outline-secondary'"
              @click="tabIndex = 1"
            >
              Riwayat Transaksi
            </b-button>
          </div>
          <b-tabs
            v-model="tabIndex"
            small
            :no-nav-style="true"
          >
            <b-tab lazy>
              <payment-history-table
                ref="paymentHistoryTable"
                tableName="eventTicket"
                paymentItem="event"
              />
            </b-tab>
            <b-tab lazy>
              <payment-history-table
                ref="paymentHistoryTable"
                tableName="eventPayment"
                paymentItem="event"
              />
            </b-tab>
          </b-tabs>
        </b-tab>
        <b-tab
          title="Produk"
          lazy
          :active="Boolean(activeTab)"
        >
          <payment-history-table
            ref="paymentHistoryTable"
            tableName="productPayment"
            paymentItem="product"
          />
        </b-tab>
      </b-tabs>
    </b-card>

  </b-container>
</template>

<script>
import {
  BCard,
  BContainer,
  BButton,
  BTabs,
  BTab,
  BAlert,
} from 'bootstrap-vue'
import PaymentHistoryTable from './PaymentHistoryTable'

export default {
  props: {
    activeTab: {
      required: true,
      type: [Boolean, Number],
    },
    activeSubTab: {
      type: [Boolean, Number],
    }
  },
  components: {
    BCard,
    BContainer,
    BButton,
    BTabs,
    BTab,
    BAlert,
    PaymentHistoryTable,
  },
  data() {
    return {
      tabIndex: null,
    }
  },
  methods: {
    refreshTable() {
      this.$refs.paymentHistoryTable.updateTable()
    }
  },
  created() {
    this.tabIndex = this.activeSubTab
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-payment-history.scss';
</style>