<template>
  <div id="store">
    <b-card class="mb-0">

      <div class="page-title">
        <h2 class="text-primary font-weight-bolder">
          Store
        </h2>
        <span>
          Tools untuk riset dan analisis media sosial, manage customer, hingga digitalisasi dokumen
        </span>
      </div>

      <hr class="page-divider">

      <div class="page-content d-flex flex-wrap justify-content-center">
        <product-card
          v-for="(product, idx) in storeProducts"
          :key="idx"
          class="mx-1 mb-1"
          :data="product"
          @showConfirm="showConfirm"
        />
      </div>

      <b-modal
        ref="refConfirmModal"
        centered
        hide-footer
        header-bg-variant="white"
      >
        <div class="d-block text-center">
          <h3 class="font-weight-bolder text-dark mb-1">Coba {{ product.name }} 7 hari?</h3>
          <span class="text-black">
            Anda akan mendapatkan gratis 7 hari menggunakan aplikasi {{ product.name }}.
          </span>
        </div>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          class="mt-2"
          variant="primary"
          block
          @click="claimFreeTrial(product.id)"
        >
          Ya, lanjut ke {{ product.name }}
        </b-button>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          class="mt-1"
          variant="outline-primary"
          block
          :to="{ name: 'product-subscription-plan', params: { productId: product.id } }"
        >
          Berlangganan Sekarang
        </b-button>
      </b-modal>
    </b-card>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { BButton, BCard, BModal } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import ProductCard from '@/views/components/ProductCard.vue'

export default {
  components: {
    BButton,
    BCard,
    BModal,
    ProductCard,
  },
  directives: {
    Ripple,
  },
  methods: {
    claimFreeTrial(productId) {
      this.$store.dispatch('store/useFreeTrial', productId)
        .catch(error => {
          if (error.response) {
            const { data: errorData, statusText: errorStatus } = error.response
            this.$toast({
              component: ToastificationContent,
              props: {
                title: errorStatus,
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: errorData.detail || errorData.message || errorData,
              },
            })
          }
        })
    }
  },
  setup() {
    const product = ref({})
    const refConfirmModal = ref(null)

    const storeProducts = computed(() => store.getters['store/getProducts']())

    const showConfirm = val => {
      if (val.group=== 'trial') {
        product.value = val
        refConfirmModal.value.show()
      }
    }

    return {
      product,
      storeProducts,
      refConfirmModal,
      showConfirm,
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/base/components/product';

#store {
  .page {
    &-title {
      padding: 2.9rem 4rem 0 4rem;
    }
    &-content {
      padding: 0rem 4rem 2.9rem 4rem;
    }
    &-divider {
      border-color: #c9cbcd;
      margin-bottom: 41px;
      width: calc(100% - 32px);
    }
  }
}
</style>
