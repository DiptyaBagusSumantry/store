<template>
  <div>
    <div id="pdf-ticket-1">
      <layout-pdf pageTitle="e-Ticket">
        <template #content>
          <div v-if="payment.id && payment.transaction_details.transaction_status">
            <div class="content-top">
              <div>
                <div class="card e-ticket mx-auto d-flex flex-row flex-nowrap">
                  <div class="ticket e-ticket-left d-flex flex-column justify-content-between">
                    <div>
                      <img
                        class="ml-2"
                        :src="appLogoImage"
                        width="153.49px"
                        alt="widya analytic logo"
                      >
                      <hr>
                    </div>
                    <div>
                      <h4 class="font-weight-normal gradient-blue mb-2">
                        Informasi Pengunjung
                      </h4>
                      <h4 class="font-weight-normal">
                        Nama
                      </h4>
                      <h3 class="font-weight-bolder gradient-blue mb-2">
                        {{ userData.fullName }}
                      </h3>
                      <h4 class="font-weight-normal">
                        Email
                      </h4>
                      <h3 class="font-weight-bolder gradient-blue mb-2">
                        {{ userData.email }}
                      </h3>
                      <h4 class="font-weight-normal">
                        Waktu pesan
                      </h4>
                      <h3 class="font-weight-bolder gradient-blue">
                        {{ formatDate(payment.transaction_details.transaction_time) }} WIB
                      </h3>
                    </div>
                    <div>
                      <h4 class="font-weight-normal">
                        *Syarat & Ketentuan berlaku
                      </h4>
                    </div>
                  </div>
                  <div class="ticket e-ticket-right d-flex flex-row justify-content-between">
                    <div class="event-content flex-grow-1 d-flex flex-column justify-content-between">
                      <div class="event-code">
                        <h4 class="font-weight-normal">
                          Ticket Code
                        </h4>
                        <p class="font-weight-bolder gradient-blue">
                          {{ payment.id.split('-')[0].toUpperCase() }}
                        </p>
                      </div>
                      <div class="event-title">
                        <p class="font-weight-bolder gradient-red mb-1">
                          {{ payment.event.name }}
                        </p>
                        <h3 class="font-weight-bolder">
                          Live Course
                        </h3>
                      </div>
                      <div class="event-time">
                        <h3 class="font-weight-normal gradient-blue">
                          Time
                        </h3>
                        <p class="gradient-blue font-weight-bolder">
                          {{ formatDate(payment.event.start_date).split(',')[0] }}
                        </p>
                        <h3 class="font-weight-bolder gradient-red">
                          {{ payment.event.start_time.slice(0, -3) }} - {{ payment.event.end_time.slice(0, -3) }} WIB
                        </h3>
                      </div>
                      <div class="event-desc d-flex flex-row justify-content-between">
                        <div class="d-flex flex-column justify-content-end">
                          <h4 class="font-weight-normal gradient-blue">
                            Place
                          </h4>
                          <h3 class="font-weight-bolder gradient-blue">
                            via {{payment.event.venue}}
                          </h3>
                        </div>
                        <div>
                          <h4 class="font-weight-normal gradient-blue">
                            Price
                          </h4>
                          <p class="font-weight-bolder gradient-blue">
                            {{ payment.transaction_details.gross_amount > 0 ? `RP ${formatMoney(payment.transaction_details.gross_amount)}` : 'FREE' }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="event-label">
                      <h3 class="font-weight-bolder text-white">
                        EVENT TICKET
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mt-2 mb-3">
            <div class="content-bottom">
              <h2 class="font-weight-bolder text-black mb-4"> Event Detail </h2>
              <div class="event-detail">
                <div class="d-flex flex-nowrap mb-2">
                  <h4 class="text-black">
                    Event name
                  </h4>
                  <h3 class="text-black font-weight-bolder">
                    {{ payment.event.name }}
                  </h3>
                </div>
                <div class="d-flex flex-nowrap mb-2">
                  <h4 class="text-black">
                    Pembicara
                  </h4>
                  <h3 class="text-black font-weight-bolder">
                    {{ payment.event.speaker }}
                  </h3>
                </div>
                <div class="d-flex flex-nowrap mb-2">
                  <h4 class="text-black">
                    Tempat
                  </h4>
                  <h3 class="text-black font-weight-bolder">
                    {{ payment.event.venue_link }}
                  </h3>
                </div>
                <div class="d-flex flex-nowrap mb-2">
                  <h4 class="text-black">
                    Link Event
                  </h4>
                  <h3 class="link font-weight-bolder">
                    {{ payment.event.blog_link }}
                  </h3>
                </div>
                <div class="d-flex flex-nowrap mb-2">
                  <h4 class="text-black">
                    Link Group
                  </h4>
                  <h3 class="link font-weight-bolder">
                    {{ payment.event.group_link }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </template>
      </layout-pdf>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from '@vue/composition-api'
import { BImg } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import { getUserData } from '@/auth/utils'
import store from '@/store'

import useInvoice from '@/views/pages/payment/invoice/useInvoice'
import invoiceStoreModule from '@/views/pages/payment/invoice/invoiceStoreModule'

import LayoutPdf from '@/layouts/LayoutPDF.vue'

export default {
  components: {
    BImg,

    LayoutPdf,
  },
  computed: {
    userData() {
      return getUserData()
    },
  },
  setup(props, context) {
    const { paymentId } = context.root.$route.params
    const { appLogoImage } = $themeConfig.app

    const {
      payment,
      formatDate,
      formatMoney,
      fetchEventPayment,
    } = useInvoice(props, context)

    const WIDYA_ANALYTIC_INVOICE_MODULE_NAME = 'widya-analytic-invoice'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME, invoiceStoreModule)

    onMounted(() => {
      fetchEventPayment(paymentId)
    })

    onUnmounted(() => {
      // UnRegister on leave
      if (store.hasModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_INVOICE_MODULE_NAME)
      // end UnRegister on leave
    })

    return {
      appLogoImage,
      payment,
      formatDate,
      formatMoney,
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';

#pdf-ticket-1 {
  & > hr {
    border-top: 2px solid #c4c4c4 !important
  }

  .link {
    color: #44B51F;
  }

  .content{
    &-top {
      .e-ticket {
        border-radius: 16px;
        height: 480px;
        width: fit-content;

        &-left {
          background: radial-gradient(circle at top right,$primary 22px,white 0) top right,
            radial-gradient(circle at bottom right,$primary 22px,white 0) bottom right;
          background-size: 50% 50% !important;
          border-radius: 16px 0px 0px 16px;
          border-style: solid dashed solid solid;
          border-right-width: 1px !important;
          width: 380px;
          padding: 20px 40px 24px 40px;

          hr {
            border-top: 1px solid #c9cbcd !important
          }
        }
        &-right {
          background: radial-gradient(circle at top left,$primary 22px,white 0) top left,
            radial-gradient(circle at bottom left,$primary 22px,white 0) bottom left;
          background-size: 50% 50%, 50% 50%, 44% 93% !important;
          border-radius: 0px 16px 16px 0px;
          border-style: solid solid solid none;
          min-width: 940px;
          max-width: 940px;
          overflow: hidden;

          .event {
            &-code {
              p {
                font-size: 42px;
                line-height: 48px;
              }
            }
            &-content {
              padding: 20px 66px 20px 32px;
            }
            &-desc {
              p {
                font-size: 64px;
                line-height: 48px;
              }
            }
            &-label {
              background-color: $primary;
              width: 60px;

              h3 {
                position: relative;
                top: 275px;
                transform: rotate(-90deg);
                white-space: nowrap;
                width: 100%;
              }
            }
            &-time {
              p {
                font-size: 42px;
                line-height: 48px;
              }
            }
            &-title {
              h3 {
                color: #93989B;
              }
              p {
                font-size: 36px;
                line-height: 40px;
              }
            }
          }
        }
        & > .ticket {
          background-repeat: no-repeat !important;
          border-color: $primary;
          height: inherit;
        }
        & p {
          margin: 0px;
        }
        &::before {
          content: "";
          background-image: url('~@/assets/images/pages/watermark-logo.svg');
          background-position: bottom right;
          background-repeat: no-repeat !important;
          background-size: 38% 93%;
          position: absolute;
          top: 0px;
          right: 0px;
          bottom: 0px;
          left: 0px;
          opacity: 0.15;
        }
        .gradient-blue {
          color: $primary;
        }
        .gradient-red {
          color: #F72A85;
        }
      }
    }
    &-bottom {
      h4 {
        width: 335px;
      }
    }
  }
}
</style>