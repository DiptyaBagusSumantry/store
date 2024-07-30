<template>
  <div class="invoice-content">
    <div v-if="payment.id && payment.transaction_details.transaction_status">
      <div class="d-flex justify-content-between">
        <div class="d-none d-md-flex flex-column">
          <b-img
            :src="appLogoImage"
            class="mb-1"
            width="160"
            alt="widya analytic logo"
          />
          <span>
            Widya Space, Jl kabupaten KM 3,
          </span>
          <span>
            Ngawean, Trihanggo,
          </span>
          <span>
            Kec. Gamping, Sleman, DIY, 55291
          </span>
        </div>
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
      </div>

      <hr class="my-2 mt-sm-5">

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
              {{ payment.transaction_details.tax_amount ? `+${formatMoney(payment.transaction_details.tax_amount)}` : '-' }}
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

      <div
        class="d-flex align-items-center"
        :class="{
          'justify-content-between': payment.transaction_details.transaction_status === 'pending',
        }"
      >
        <div>
          <span class="font-weight-bolder">
            Note:
          </span>
          <span>
            Bayar sebelum tenggat waktu agar kode virtual tidak kadaluarsa
          </span>
        </div>
        <div
          v-if="payment.transaction_details.transaction_status === 'pending'"
          class="invoice-btn-pay"
        >
          <b-button
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            variant="primary"
            @click="openMidtrans"
          >
            <span class="align-middle">Bayar</span>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from '@vue/composition-api'
import { BButton, BImg, BTable } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import { getUserData } from '@/auth/utils'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import { useRouter } from '@/@core/utils/utils'

import useInvoice from '@/views/pages/payment/invoice/useInvoice'
import invoiceStoreModule from '@/views/pages/payment/invoice/invoiceStoreModule'
import subscriptionStoreModule from '@/views/pages/payment/product/subscriptionStoreModule'

export default {
  components: {
    BButton,
    BImg,
    BTable,
  },
  directives: {
    Ripple,
  },
  computed: {
    userData() {
      return getUserData()
    },
  },
  setup(props, context) {
    const { route, router } = useRouter()
    const { appLogoImage } = $themeConfig.app
    const { item, itemId, paymentId } = route.value.params
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

    onMounted(() => {
      if (item === 'event') fetchEventPayment(paymentId)
      if (item === 'product') fetchProductPayment(paymentId)
    })

    onUnmounted(() => {
      // UnRegister on leave
      if (store.hasModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME)
      if (store.hasModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)
      // end UnRegister on leave
    })

    const openMidtrans = () => {
      if (payment.value.transaction_details.transaction_token) {
        window.snap.pay(payment.value.transaction_details.transaction_token, {
          onSuccess: () => {
            router.push({
              name: 'payment-success',
              params: {
                paymentId: payment.value.id,
                item,
                itemId,
              }
            })
          },
          onPending: () => {
            router.push({
              name: 'payment-success',
              params: {
                paymentId: payment.value.id,
                item,
                itemId,
              }
            })
          },
          onError: (result) => {
            if ([406, 409].includes(Number(result.status_code))) {
              router.push({
                name: 'payment-success',
                params: {
                  paymentId: payment.value.id,
                  item,
                  itemId,
                }
              })
              return
            }

            router.push({
              name: 'payment-failed',
              params: {
                paymentId: payment.value.id,
                item,
                itemId,
              }
            })
          },
        })
      }
    }

    return {
      item,
      fields,
      payment,
      appLogoImage,
      formatDate,
      formatMoney,

      openMidtrans,
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-content {
  min-height: 300px;
}
</style>
