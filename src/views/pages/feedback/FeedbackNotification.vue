<template>
  <div>
    <div class="feedback-send mx-auto d-flex flex-column justify-content-between">
      <h3 class="text-center text-black font-weight-bolder mb-1">
        Terima kasih telah memberikan feedback!
      </h3>
      <div class="text-center">
        <b-img
          :src="require('@/assets/images/pages/feedback-sent.svg')"
          alt="feedback sent"
          width="400"
          height="400"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { BCard, BImg } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BImg,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.feedback-send {
  max-width: 480px;
}
</style>
