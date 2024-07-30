<template>
  <div id="landing-interest" class="text-center">
    <div class="mb-2">
      <h2 class="text-black font-weight-bolder">Tertarik dengan produk yang kami tawarkan?</h2>
    </div>
    <div>
      <b-button
        variant="gradient-primary"
        class="text-white"
        href="https://wa.me/6285171609661?text=Hello%20Widya Analytic!%0AButuh%20informasi%20lebih%20lanjut%20nih..."
        target="_blank"
      >
        Hubungi Kami
      </b-button>
    </div>
  </div>
</template>
<script>
import {
  BImg,
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BImg,
    BButton,
  },
}
</script>
<style lang="scss" scoped>
#landing-interest {
  .btn {
    box-shadow: 0px 4px 14px rgba(35, 90, 131, 0.38);
  }
}
</style>