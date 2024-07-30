<template>
  <div
    id="landing-product"
    class="landing-content pt-2 pb-1 bg-gray-50"
  >
    <div class="text-center mb-4 mb-sm-5">
      <h1 class="text-toba-gradient-blue font-weight-bolder">Produk Kami</h1>
      <p class="text-black">
        Mulai dari kebutuhan riset dan analisis untuk media sosial, manage customer hingga tracking dan digitalisasi dokumen
      </p>
    </div>
    <div class="d-flex flex-wrap justify-content-center">
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
  </div>
</template>

<script>
import { isUserLoggedIn } from '@/auth/utils'
import { ref, computed } from '@vue/composition-api'
import { BButton, BCard, BModal } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useRouter } from '@core/utils/utils'
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
    const { router } = useRouter()

    const product = ref({})
    const refConfirmModal = ref(null)

    const storeProducts = computed(() => store.getters['store/getProducts']())

    const showConfirm = val => {
      if (isUserLoggedIn()) {
        if (val.group=== 'trial') {
          product.value = val
          refConfirmModal.value.show()
        }
      } else {
        router.push({
          name: 'store',
          query: { product: val.name.toLowerCase().replace(/ /g, '') },
        })
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