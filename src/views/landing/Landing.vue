<template>
  <div id="landing">
    <landing-swiper />
    <landing-first />
    <landing-service />
    <landing-product />
    <landing-event />
    <landing-blog />
    <landing-faq />
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import { BModal, BImg, BButton, } from 'bootstrap-vue'
import LandingSwiper from './LandingSwiper'
import LandingFirst from './LandingFirst.vue'
import LandingProduct from './LandingProduct.vue'
import LandingEvent from './LandingEvent.vue'
import LandingFAQ from './LandingFAQ.vue'
import LandingBlog from './LandingBlog.vue'
import LandingService from './LandingService.vue'

export default {
  components: {
    BModal,
    BImg,
    BButton,
    LandingSwiper,
    LandingFirst,
    LandingProduct,
    LandingEvent,
    'landing-faq': LandingFAQ,
    LandingBlog,
    LandingService,
  },
  setup(props, context) {
    const scrollPage = () => {
      setTimeout(() => {
        context.root.$nextTick(() => {
          const hash = context.root.$route.hash.replace('#', '')
          const el = document.getElementById(hash)
          if (el) el.scrollIntoView({behavior: 'smooth'})
        })
      }, 1000)
    }
    window.onhashchange = () => {
      scrollPage()
    }
    onMounted(() => {
      scrollPage()
    })
  }
}
</script>

<style lang="scss" scoped>
#landing {
  top: 121px !important;
}
</style>

<style lang="scss">
@import '@/assets/scss/base/pages/page-landing.scss';
</style>


