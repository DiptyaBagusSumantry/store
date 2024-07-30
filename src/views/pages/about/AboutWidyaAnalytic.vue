<template>
  <div
    id="widya-analytic-section"
    class="overlay-image"
  >
    <b-img
      :src="require('@/assets/images/pages/about/widya-space.jpg')"
      fluid
      alt="Responsive image"
    />
    <div class="centered landing-content d-flex justify-content-start">
      <div class="margin-title">
        <h1 class="text-white font-weight-bolder">Widya Analytic</h1>
        <p class="text-white mt-2">
          <b>PT Widya Intelektual Bangsa
          (Widya Analytic) adalah <br> yang memberikan
          solusi di bidang big data <br> analytic
          dan artificial intelligence</b> bagi
          pemerintah, swasta, <br> perguruan
          tinggi serta UMKM.
        </p>
        <p class="text-white mt-2">
          Fokus perusahaan kami adalah membantu bisnis <br>
          bertumbuh melalui transformasi digital berbasis data <br>
          driven untuk memudahkan tim dalam mengambil <br>
          keputusan, meningkatkan produktivitas dan <br>
          merancang strategi.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { BRow, BCol, BImg } from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BImg,
  },
}
</script>


