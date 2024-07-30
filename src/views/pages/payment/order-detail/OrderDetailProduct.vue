<template>
  <div>
    <div class="mb-1 mx-0 px-0 breadcrumb">
      <b-link
        class="d-flex flex-row align-items-center"
        :to="{ name: 'product-subscription-plan', params: { productId: data.product.id } }"
      >
        <feather-icon
          icon="ArrowLeftIcon"
          size="15"
          class="mr-1"
        />
        <span>
          Kembali ke Paket Langganan
        </span>
      </b-link>
    </div>
    <h3 class="mb-3 data-title">
      Detail Pemesanan
    </h3>
    <div class="d-flex flex-row mb-1">
      <div class="data-key d-flex justify-content-between">
        <span>
          Nama Produk
        </span>
        <span>
          : &nbsp;
        </span>
      </div>
      <span class="font-weight-bolder">
        {{ data.product.name }}
      </span>
    </div>
    <div class="d-flex flex-row mb-1">
      <div class="data-key d-flex justify-content-between">
        <span>
          Durasi
        </span>
        <span>
          : &nbsp;
        </span>
      </div>
      <span class="data-value">
        {{ data.name }}
      </span>
    </div>
    <div class="d-flex flex-row">
      <div class="data-key d-flex justify-content-between">
        <span>
          Pembeli
        </span>
        <span>
          : &nbsp;
        </span>
      </div>
      <div class="d-flex flex-column">
        <span class="data-value">
          {{ userData.fullName }}
        </span>
        <span class="data-value">
          ({{ userData.email }})
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { BLink } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    BLink,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    userData() {
      return getUserData()
    },
  },
}
</script>
