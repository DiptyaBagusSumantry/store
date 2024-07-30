<template>
  <div id="beranda">
    <b-card class="mb-0">

      <div class="page-title">
        <h2 class="text-primary font-weight-bolder">
          Beranda
        </h2>
        <span>
          Semua produk yang Anda pilih dan gunakan akan tampil di sini
        </span>
      </div>

      <hr class="page-divider">

      <div
        v-if="isAdmin || userData.subscriptions.length > 0"
        class="page-content d-flex flex-wrap justify-content-center justify-content-sm-start"
      >
        <product-card
          v-for="(product, idx) in storeProducts.filter(data => isAdmin || data.subscription)"
          :key="idx"
          class="mx-1 mb-1"
          :data="product"
        />
      </div>
      <div
        v-else
        class="text-center product-empty px-1"
      >
        <b-img
          :src="require('@/assets/images/pages/empty-beranda.svg')"
          class="mb-2"
          alt="empty beranda"
        />
        <div class="text-center">
          <div class="title mb-1">
            Hai, {{ userData.fullName }}
          </div>
          <div class="content mx-auto mb-1">
            <span>
              Coba gratis semua produk kami dan rasakan mudahnya mengambil keputusan dengan bantuan Big Data & AI
            </span>
          </div>
          <b-link :to="{ name: 'store' }">
            <b-button
              class="font-weight-bolder"
              variant="gradient-primary"
            >
              Pergi ke Store
            </b-button>
          </b-link>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { getUserData } from '@/auth/utils'
import { BButton, BCard, BImg, BLink } from 'bootstrap-vue'
import { isUserAdmin } from '@/auth/utils'

import ProductCard from '@/views/components/ProductCard.vue'

export default {
  components: {
    BButton,
    BCard,
    BImg,
    BLink,
    ProductCard,
  },
  computed: {
    userData() {
      console.log(getUserData)
      return getUserData()
    },
    isAdmin() {
      return isUserAdmin()
    },
    storeProducts() {
      return this.$store.getters['store/getProducts']()
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/components/product';

#beranda {
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
