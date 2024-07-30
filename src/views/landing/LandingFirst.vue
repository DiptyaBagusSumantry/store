<template>
  <div
    id="landing-first"
    class="landing-content pt-4 pb-4 bg-white"
  >
    <b-row class="container m-auto">
      <b-col
        xl="6"
        cols="12"
        class="content-left d-flex flex-column"
      >
        <div class="title mb-2">
          <h1 class="font-weight-bolder line-height-condensed">
            Keputusan Hebat Anda Berawal dari Sini!
          </h1>
        </div>
        <div class="mb-2">
          <h5 class="text-black font-weight-normal line-height-condensed">
            Transformasi Digital adalah adaptasi yang harus dilakukan organisasi untuk dapat bertahan dan bersaing pada situasi saat ini. Dalam Transformasi Digital dibutuhkan beberapa aspek agar tercapai tujuan perusahaan.
          </h5>
        </div>
        <div class="mb-3 mb-md-5">
          <b-button
            variant="gradient-primary"
            href="https://wa.me/6285171609661?text=Hello%20Widya Analytic!%0AButuh%20informasi%20lebih%20lanjut%20nih..."
            target="_blank"
          >
            Hubungi Kami
          </b-button>
        </div>
      </b-col>
      <b-col
        xl="6"
        cols="12"
        class="text-center"
      >
        <b-img
          src="@/assets/images/landing/illustration-1.svg"
          fluid
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BImg,
  BButton,
} from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
import { isUserLoggedIn } from '@/auth/utils'
import store from '@/store'
export default {
  components: {
    BRow,
    BCol,
    BImg,
    BButton,
  },
  setup(props, context) {
    const currentBreakPoint = computed(() => store.getters['app/currentBreakPoint'])
    const isLoggedIn = isUserLoggedIn()
    return {
      currentBreakPoint,
      isLoggedIn,
    }
  }
}
</script>