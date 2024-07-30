<template>
  <b-container
    v-if="itemData.id"
    id="order-detail"
  >
    <b-row class="match-height">
      <b-col cols="12" lg="8">
        <b-card
          class="content-left mb-0"
          no-body
        >
          <order-detail-event
            v-if="item === 'event'"
            :data="itemData"
          />
          <order-detail-product
            v-if="item === 'product'"
            :data="itemData"
          />
        </b-card>
      </b-col>
      <b-col>
        <b-card
          class="content-right mb-0"
          no-body
        >
          <h3 class="mb-3 font-weight-bolder">
            Detail Harga
          </h3>
          <div class="d-flex justify-content-between mb-1">
            <span>
              Harga Tiket
            </span>
            <span class="font-weight-bolder">
              Rp {{ formatMoney(itemData.price) }}
            </span>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span>
              Diskon
            </span>
            <span class="font-weight-bolder">
              -
            </span>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span v-if="item === 'product'">
              Pajak ({{ itemData.taxAggregate * 100 }}%)
            </span>
            <span v-else>
              Pajak
            </span>
            <span class="font-weight-bolder">
              {{ item === 'product' ? `+${formatMoney(itemData.taxAmount)}` : '-' }}
            </span>
          </div>

          <hr class="mb-1">

          <div class="d-flex justify-content-between mb-4">
            <span>
              Total
            </span>
            <span class="font-weight-bolder">
              Rp {{ formatMoney(itemData.grossAmount) }}
            </span>
          </div>

          <b-button
            v-if="item === 'event'"
            class="w-100 mt-auto"
            variant="primary"
            @click="claimTicket"
          >
            Klaim Tiket
          </b-button>
          <b-button
            v-else-if="item === 'product'"
            class="w-100 mt-auto"
            variant="primary"
            @click="claimProduct"
          >
            Pilih Pembayaran
          </b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      ref="cancel-modal"
      centered
      hide-footer
      header-bg-variant="white"
    >
      <div class="d-block text-center mb-3">
        <h3 class="font-weight-bolder text-dark mb-1">Keluar dari halaman ini?</h3>
        <span class="text-black">
          Keluar dari halaman ini akan membatalkan pesanan
        </span>
      </div>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        class="mt-2"
        variant="primary"
        block
        @click="cancelOrder()"
      >
        Batalkan Pesanan
      </b-button>
    </b-modal>
  </b-container>
</template>

<script>
import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import { BButton, BCard, BCol, BContainer, BLink, BModal, BRow } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import { useRouter } from '@/@core/utils/utils'

import subscriptionStoreModule from '@/views/pages/payment/product/subscriptionStoreModule'
import eventFormStoreModule from '@/views/pages/event/form/eventFormStoreModule'
import orderDetailStoreModule from '@/views/pages/payment/order-detail/orderDetailStoreModule'
import useOrderDetail from '@/views/pages/payment/order-detail/useOrderDetail'

import OrderDetailProduct from '@/views/pages/payment/order-detail/OrderDetailProduct'
import OrderDetailEvent from '@/views/pages/payment/order-detail/OrderDetailEvent'

export default {
  components: {
    BButton,
    BCard,
    BCol,
    BContainer,
    BLink,
    BModal,
    BRow,

    OrderDetailProduct,
    OrderDetailEvent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      toRoute: {},
      isOrderCanceled: false,
    }
  },
  methods: {
    showCancelModal() {
      this.$refs['cancel-modal'].show()
    },
    async cancelOrder() {
      if (this.paymentEvent) {
        await this.removePaymentEvent(this.paymentEvent.id)
      } else if (this.paymentProduct) {
        await this.removePaymentProduct(this.paymentProduct.id)
      }
      this.isOrderCanceled = true
      this.$router.push(this.toRoute)
    },
  },
  beforeRouteLeave(to, _, next) {
    const allowed = ['payment-history-event', 'payment-history-product', 'payment-success', 'payment-failed']
    if (allowed.includes(to.name) || this.isOrderCanceled) {
      // Remove localStorage item
      localStorage.removeItem('currentPaymentProduct')
      localStorage.removeItem('currentPaymentEvent')

      next()
    }
    else {
      this.toRoute = to
      this.showCancelModal()
    }
  },
  setup(props, context) {
    const WIDYA_ANALYTIC_EVENT_FORM_MODULE_NAME = 'widya-analytic-eventform'
    const WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME = 'widya-analytic-subs-plans'
    const WIDYA_ANALYTIC_ORDER_DETAIL_MODULE_NAME = 'widya-analytic-order-detail'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_EVENT_FORM_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_EVENT_FORM_MODULE_NAME, eventFormStoreModule)
    if (!store.hasModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME, subscriptionStoreModule)
    if (!store.hasModule(WIDYA_ANALYTIC_ORDER_DETAIL_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_ORDER_DETAIL_MODULE_NAME, orderDetailStoreModule)

    onUnmounted(() => {
      // UnRegister on leave
      if (store.hasModule(WIDYA_ANALYTIC_EVENT_FORM_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_EVENT_FORM_MODULE_NAME)
      if (store.hasModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)
      if (store.hasModule(WIDYA_ANALYTIC_ORDER_DETAIL_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_ORDER_DETAIL_MODULE_NAME)
      // end UnRegister on leave
    })

    const { route, router } = useRouter()

    const { item, itemId, paymentId } = route.value.params

    const paymentEvent = ref(JSON.parse(localStorage.getItem('currentPaymentEvent')) || null)
    const paymentProduct = ref(JSON.parse(localStorage.getItem('currentPaymentProduct')) || null)

    const {
      itemData,
      fetchEvent,
      fetchUserSubscriptionPlan,
      addPaymentEvent,
      addPaymentProduct,
      removePaymentEvent,
      removePaymentProduct,
    } = useOrderDetail(props, context)

    onMounted(() => {
      if (item === 'event') fetchEvent(itemId)
      if (item === 'product') fetchUserSubscriptionPlan(itemId)
    })

    const claimTicket = () => {
      const payload = { event: itemId }
      if (paymentId) payload['id'] = paymentId
      if (paymentEvent.value) payload['id'] = paymentEvent.value.id

      addPaymentEvent(payload)
        .then(response => {
          paymentEvent.value = response.data

          // Save in localStorage
          localStorage.setItem('currentPaymentEvent', JSON.stringify(paymentEvent.value))

          if (paymentEvent.value.transaction_details.transaction_token) {
            window.snap.pay(paymentEvent.value.transaction_details.transaction_token, {
              onSuccess: () => {
                router.push({
                  name: 'payment-success',
                  params: {
                    paymentId: paymentEvent.value.id,
                    item,
                    itemId,
                  }
                })
              },
              onPending: () => {
                router.push({
                  name: 'payment-success',
                  params: {
                    paymentId: paymentEvent.value.id,
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
                      paymentId: paymentEvent.value.id,
                      item,
                      itemId,
                    }
                  })
                  return
                }

                router.push({
                  name: 'payment-failed',
                  params: {
                    paymentId: paymentEvent.value.id,
                    item,
                    itemId,
                  }
                })
              },
            })
          } else router.push({ name: 'payment-history-event' })
        })
    }

    const claimProduct = () => {
      const payload = { subscription_plan: Number(itemId) }
      if (paymentId) payload['id'] = paymentId
      if (paymentProduct.value) payload['id'] = paymentProduct.value.id

      addPaymentProduct(payload)
        .then(response => {
          paymentProduct.value = response.data

          // Save in localStorage
          localStorage.setItem('currentPaymentProduct', JSON.stringify(paymentProduct.value))

          if (paymentProduct.value.transaction_details.transaction_token) {
            window.snap.pay(paymentProduct.value.transaction_details.transaction_token, {
              onSuccess: () => {
                router.push({
                  name: 'payment-success',
                  params: {
                    paymentId: paymentProduct.value.id,
                    item,
                    itemId,
                  }
                })
              },
              onPending: () => {
                router.push({
                  name: 'payment-success',
                  params: {
                    paymentId: paymentProduct.value.id,
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
                      paymentId: paymentProduct.value.id,
                      item,
                      itemId,
                    }
                  })
                  return
                }

                router.push({
                  name: 'payment-failed',
                  params: {
                    paymentId: paymentProduct.value.id,
                    item,
                    itemId,
                  }
                })
              },
            })
          } else router.push({ name: 'payment-history-product' })
        })
    }

    // UI
    const formatMoney = (value, options) => value.toLocaleString('id-ID', options)

    return {
      item,
      itemData,
      claimTicket,
      claimProduct,
      formatMoney,
      paymentEvent,
      paymentProduct,
      removePaymentEvent,
      removePaymentProduct,
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/base/bootstrap-extended/include';
@import "@/assets/scss/variables/_variables.scss";

#order-detail {
  .breadcrumb * {
    color: black;
    line-height: 24px;
  }
  .card {
    min-height: 350px;
    width: 100%;

    &.content {
      &-left {
        padding: 47px 56px 22px 56px;
      }
      &-right {
        padding: 24px;
      }
    }
  }
  .data {
    &-key {
      width: 110px;
      font-size: 13px;
      line-height: 16px;
      color: #93989b;
    }
    &-title {
      color: $primary;
      font-weight: 600;
    }
    &-value {
      font-size: 14px;
      line-height: 24px;
      color: black;
    }
  }

  @include media-breakpoint-down(sm) {
    .card.content {
      &-left,
      &-right {
        padding: 2rem;
      }
    }
  }
}
</style>