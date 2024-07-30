<template>
  <div v-if="tableItems !== null && tableItems.length === 0">
    <payment-history-table-empty-state :tableName="tableName" />
  </div>
  <div
    v-else
    class="payment-history-table"
  >
    <div class="d-flex-none d-sm-flex justify-content-between my-2">
      <div class="d-flex align-items-center">
        <label class="mr-2">Show</label>
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          :options="pageOptions"
        />
      </div>
      <!-- Dont remove class pt-1 pt-sm-o is used for padding top when mobile display -->
      <div class="d-flex align-items-center pt-1 pt-sm-0">
        <label class="mr-50">Pencarian</label>
        <b-input-group size="sm">
          <b-form-input
            id="filterInput"
            v-model="searchQuery"
            type="search"
            :placeholder="paymentItem === 'product' ? 'Cari Produk' : 'Cari Event'"
            class="w-100"
          />
        </b-input-group>
      </div>
    </div>
    <b-row>
      <b-col cols="12">
        <b-table
          class="position-relative"
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="tableItems"
          :fields="tableColumns"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :outlined="true"
        >
          <template #cell(event)="data">
            <div
              class="d-flex align-items-center"
              style="width:250px"
            >
              <b-img
                :src="data.item.event.poster ? data.item.event.poster : require(`@/assets/images/event/empty-image-event.svg`)"
                width="48"
                height="48"
              />
              <h5 class="mb-0 font-weight-bolder ml-1">
                {{ data.value }}
              </h5>
            </div>
          </template>

          <template #cell(product)="data">
            <div
              class="d-flex align-items-center"
              style="width:150px"
            >
              <b-img
                :src="require(`@/assets/images/payment/product/${productImages[data.item.product.id - 1]}`)"
                width="48"
                height="48"
              />
              <div>
                <h5 class="mb-0 font-weight-bolder ml-1">
                  {{ data.value }}
                </h5>
                <h5 class="mb-0 font-weight-bolder ml-1">
                  {{ data.item.subscription_plan.name }}
                </h5>
              </div>
            </div>
          </template>

          <!-- Payment -->
          <template #cell(paymentStatus)="data">
            <b-badge
              pill
              :variant="resolveStatusPaymentVariantAndText(data.value).variant"
            >
              {{ resolveStatusPaymentVariantAndText(data.value).text }}
            </b-badge>
          </template>

          <template #cell(paymentExpiredAt)="data">
            <div style="width:100px">
              {{ data.value ? formatDateTime(data.value) : '-'}}
            </div>
          </template>

          <template #cell(paymentActions)="data">
            <b-button
              v-if="data.item.transaction_status"
              :variant="data.item.transaction_status !== 'failure' ? 'outline-primary' : 'primary'"
              :disabled="data.item.transaction_status === 'failure'"
              :to="{
                name:'payment-invoice',
                params: {
                  paymentId: data.item.id,
                  item: paymentItem,
                  itemId: data.item[paymentItem].id,
                }
              }"
            >
              Invoice
            </b-button>
            <b-button
              v-else
              variant="primary"
              :to="{
                name:'payment-order-detail',
                params: {
                  paymentId: data.item.id,
                  item: paymentItem,
                  itemId: paymentItem === 'event' ? data.item[paymentItem].id : data.item.subscription_plan.id,
                }
              }"
            >
              Bayar
            </b-button>
          </template>

          <template #cell(settlementTime)="data">
            <div style="width:100px">
              {{ data.value ? formatDateTime(data.value) : '-' }}
            </div>
          </template>
          <template #cell(paymentPrice)="data">
            <div style="width:100px">
              {{ data.value ? `Rp ${formatMoney(data.value)}` : data.item.transaction_status === 'success' ? 'FREE' : '-' }}
            </div>
          </template>
          <!-- /Payment -->

          <!-- Event Ticket -->
          <template #cell(eventStatus)="data">
            <b-badge
              pill
              :variant="resolveEventStatusVariantAndText(data.value).variant"
            >
              {{ resolveEventStatusVariantAndText(data.value).text }}
            </b-badge>
          </template>

          <template #cell(eventPrice)="data">
            <div style="width:100px">
              {{ data.value > 0 ? `Rp ${formatMoney(data.value)}` : 'FREE' }}
            </div>
          </template>

          <template #cell(eventDate)="data">
            <div style="width:100px">
              {{ formatDateTime(data.value) }}
            </div>
          </template>

          <template #cell(eventActions)="data">
            <b-button
              variant="outline-primary"
              :to="{
                name: 'payment-e-ticket',
                params: {
                  paymentId: data.item.id,
                  page: 1,
                }
              }"
            >
              Lihat Tiket
            </b-button>
          </template>
          <!-- Event Ticket -->
        </b-table>
      </b-col>
    </b-row>
    <div class="d-flex justify-content-between mb-3">
      <!-- page length -->
      <div class="d-flex align-items-center">
        <span>
          Showing {{ dataMeta.from  }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries
        </span>
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        first-number
        last-number
        class="mb-0 mt-1 mt-sm-0"
        prev-class="prev-item"
        next-class="next-item"
      >
        <template #prev-text>
          <feather-icon
            icon="ChevronLeftIcon"
            size="18"
          />
        </template>

        <template #next-text>
          <feather-icon
            icon="ChevronRightIcon"
            size="18"
          />
        </template>
      </b-pagination>
    </div>
  </div>
</template>

<script>
import {
  BImg,
  BBadge,
  BButton,
  BCol,
  BFormInput,
  BFormSelect,
  BInputGroup,
  BPagination,
  BRow,
  BTable,
} from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import store from '@/store'

import PaymentHistoryTableEmptyState from '@/views/pages/payment/PaymentHistoryTableEmptyState.vue'

import usePaymentHistory from './usePaymentHistory'
import useInvoice from '@/views/pages/payment/invoice/useInvoice'
import paymentHistoryStoreModule from '@/views/pages/payment/paymentHistoryStoreModule'

export default {
  props: {
    tableName: {
      type: String,
      required: true,
    },
    paymentItem: {
      type: String,
      required: true,
    },
  },
  components: {
    BImg,
    BBadge,
    BButton,
    BCol,
    BFormInput,
    BFormSelect,
    BInputGroup,
    BPagination,
    BRow,
    BTable,
    PaymentHistoryTableEmptyState,
  },
  setup(props, context) {
    const WIDYA_ANALYTIC_PAYMENT_HISTORY_MODULE_NAME = 'widya-analytic-payment-history'

    const {
      formatMoney,
    } = useInvoice(props, context)

    const {
      productImages,
      tableColumns,
      tableItems,
      perPage,
      pageOptions,
      currentPage,
      dataMeta,
      totalRows,
      sortBy,
      sortDesc,
      searchQuery,
      determineTable,
      updateTable,
      resolveStatusPaymentVariantAndText,
      resolveEventStatusVariantAndText,
      formatDateTime,
    } = usePaymentHistory(props, context)

     // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_PAYMENT_HISTORY_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_PAYMENT_HISTORY_MODULE_NAME, paymentHistoryStoreModule)

    onMounted(() => {
      determineTable(props.tableName)
    })

    return {
      productImages,
      tableColumns,
      tableItems,
      perPage,
      pageOptions,
      currentPage,
      dataMeta,
      totalRows,
      sortBy,
      sortDesc,
      searchQuery,
      formatMoney,
      updateTable,
      resolveStatusPaymentVariantAndText,
      resolveEventStatusVariantAndText,
      formatDateTime,
    }
  },
}
</script>
