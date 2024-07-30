<template>
  <div
    id="about"
    class="about-container"
  >
    <about-widya-analytic />
    <about-portofolio />
    <about-client />
    <about-partner />
    <about-testimoni />
    <about-certificate />
    <about-reward />
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import AboutWidyaAnalytic from'./AboutWidyaAnalytic.vue'
import AboutPortofolio from './AboutPortofolio.vue'
import AboutReward from './AboutReward.vue'
import AboutCertificate from './AboutCertificate.vue'
import AboutClient from './AboutClient.vue'
import AboutPartner from './AboutPartner.vue'
import AboutTestimoni from './AboutTestimoni.vue'

export default {
  components:{
    AboutWidyaAnalytic,
    AboutPortofolio,
    AboutReward,
    AboutCertificate,
    AboutClient,
    AboutPartner,
    AboutTestimoni
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
      const dropdown1 = document.querySelector("#dropdown-1")
      const child = dropdown1.querySelector("ul")
      dropdown1.classList.remove("show")
      child.classList.remove("show")
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-about.scss';
</style>
