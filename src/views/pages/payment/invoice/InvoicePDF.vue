<template>
  <div>
    <vue-html2pdf
      :show-layout="true"
      :float-layout="false"
      :enable-download="true"
      :preview-modal="false"
      :pdf-quality="2"
      :manual-pagination="true"
      pdf-content-width="1440px"
      :html-to-pdf-options="options"
      ref="refHtml2Pdf"
    >
      <section slot="pdf-content">
        <!-- PDF Content Here -->
        <div
          v-if="payment.id && payment.transaction_details.transaction_status"
          id="pdf-invoice"
        >
          <layout-pdf pageTitle="invoice">
            <template #content>
              <div class="d-flex flex-column invoice-detail-pay">
                <h4 class="font-weight-bolder mb-1">
                  Invoice #{{ payment.id.split('-')[0].toUpperCase() }}
                </h4>
                <span>
                  Tanggal Invoice : <span class="font-weight-bolder">{{ formatDate(payment.transaction_details.transaction_time) }} WIB</span>
                </span>
                <span>
                  Tenggat Waktu : <span class="font-weight-bolder">{{ formatDate(payment.transaction_details.transaction_expired_at) }} WIB</span>
                </span>
                <span class="d-flex flex-row">
                  <span>
                    Pembeli :&nbsp;
                  </span>
                  <span class="d-flex flex-column">
                    <span>
                      {{ userData.fullName }}
                    </span>
                    <span class="invoice-email">
                      ({{ userData.email }})
                    </span>
                  </span>
                </span>
                <span class="d-flex flex-row">
                  <span>
                    Status :&nbsp;
                  </span>
                  <span class="d-flex flex-column">
                    <span>
                      {{ payment.transaction_status === 'success' ? 'Sudah dibayar' : 'Belum dibayar' }}
                    </span>
                    <span
                      v-if="payment.transaction_status === 'success'"
                      class="invoice-email"
                    >
                      ({{ formatDate(payment.transaction_details.settlement_time || payment.transaction_details.transaction_time) }} WIB)
                    </span>
                  </span>
                </span>
              </div>

              <hr class="mt-5 mb-2">

              <div>
                <b-table
                  responsive="sm"
                  :items="[payment[item]]"
                  :fields="fields"
                >
                  <template #head(name)="data">
                    <span class="font-weight-bolder">{{ data.label }}</span>
                  </template>
                  <template #head(duration)="data">
                    <div class="text-center">
                      <span class="font-weight-bolder">{{ data.label }}</span>
                    </div>
                  </template>
                  <template #head(price)="data">
                    <div class="text-center">
                      <span class="font-weight-bolder">{{ data.label }}</span>
                    </div>
                  </template>

                  <template #cell(name)="data">
                    <span class="font-weight-bolder">{{ data.value }}</span>
                  </template>
                  <template #cell(duration)="data">
                    <div class="text-center">
                      <span class="font-weight-bolder">
                        {{ item === 'product' ? data.value : '-' }}
                      </span>
                    </div>
                  </template>
                  <template #cell(price)>
                    <div class="text-center">
                      <span class="font-weight-bolder">
                        {{ formatMoney(payment.transaction_details.net_amount || payment.transaction_details.gross_amount) }}
                      </span>
                    </div>
                  </template>
                </b-table>
              </div>

              <div class="d-flex justify-content-end mb-3">
                <div class="invoice-detail-price">
                  <div class="d-flex justify-content-between">
                    <span>
                      SubTotal:
                    </span>
                    <span class="font-weight-bolder">
                      Rp {{ formatMoney(payment.transaction_details.net_amount || payment.transaction_details.gross_amount) }}
                    </span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>
                      Diskon:
                    </span>
                    <span class="font-weight-bolder">
                      -
                    </span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span v-if="payment.transaction_details.tax_aggregate">
                      Pajak ({{ payment.transaction_details.tax_aggregate * 100 }}%):
                    </span>
                    <span v-else>
                      Pajak:
                    </span>
                    <span class="font-weight-bolder">
                      {{ payment.transaction_details.tax_amount ? `+${payment.transaction_details.tax_amount.toLocaleString('id')}` : '-' }}
                    </span>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between">
                    <span>
                      Total:
                    </span>
                    <span class="font-weight-bolder">
                      Rp {{ formatMoney(payment.transaction_details.gross_amount) }}
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </layout-pdf>
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from '@vue/composition-api'
import { BTable } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import VueHtml2pdf from 'vue-html2pdf'
import Ripple from 'vue-ripple-directive'
import { useRouter } from '@core/utils/utils'
import store from '@/store'

import useInvoice from '@/views/pages/payment/invoice/useInvoice'
import invoiceStoreModule from '@/views/pages/payment/invoice/invoiceStoreModule'
import subscriptionStoreModule from '@/views/pages/payment/product/subscriptionStoreModule'

import LayoutPdf from '@/layouts/LayoutPDF.vue'

export default {
  components: {
    BTable,

    LayoutPdf,
    VueHtml2pdf,
  },
  directives: {
    Ripple,
  },
  computed: {
    userData() {
      return getUserData()
    },
  },
  data () {
    return {
      options: {
        filename: 'invoice',
        html2canvas: {
          scale: 2,
          useCORS: true,
          width: 1440,
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          hotfixes: ['px_scaling'],
          orientation: 'portrait'
        }
      }
    }
  },
  setup(props, context) {
    const { route } = useRouter()
    const { item, paymentId } = route.value.params

    const refHtml2Pdf = ref(null)

    const fields = [
      {
        key: 'name',
        label: 'Nama Produk',
      },
      {
        key: 'duration',
        label: 'Durasi',
      },
      {
        key: 'price',
        label: 'Harga',
      },
    ]

    const {
      payment,
      formatDate,
      formatMoney,
      fetchEventPayment,
      fetchProductPayment,
    } = useInvoice(props, context)

    const WIDYA_ANALYTIC_INVOICE_MODULE_NAME = 'widya-analytic-invoice'
    const WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME = 'widya-analytic-subs-plans'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME, invoiceStoreModule)
    if (!store.hasModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME, subscriptionStoreModule)


    const generateReport = () => {
      refHtml2Pdf.value.generatePdf()
    }

    onMounted(() => {
      if (item === 'event') {
        fetchEventPayment(paymentId)
          .then(() => generateReport())
      }
      if (item === 'product') {
        fetchProductPayment(paymentId)
          .then(() => generateReport())
      }
    })

    onUnmounted(() => {
      // UnRegister on leave
      if (store.hasModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME)
      if (store.hasModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)
      // end UnRegister on leave
    })

    return {
      refHtml2Pdf,
      item,
      fields,
      payment,
      formatDate,
      formatMoney,
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/base/pages/page-payment-invoice.scss";

.page-payment-invoice-download {
  section.content-wrapper {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
