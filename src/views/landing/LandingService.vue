<template>
  <div
    id="landing-service"
    class="landing-content pt-2 pb-2 bg-semiwhite"
  >
    <div class="text-center mb-4 mb-sm-5">
      <h1 class="text-toba-gradient-blue font-weight-bolder">Layanan Kami</h1>
    </div>
    <div class="d-flex flex-xl-nowrap flex-wrap justify-content-center">
      <b-card
        v-for="(item, index) in serviceItems"
        :key="index"
        no-body
        class="mx-1"
      >
        <div class="d-flex justify-content-center pb-2">
          <b-img
            fluid
            :src="require(`@/assets/images/landing/landing-service/${item.image}`)"
          />
        </div>
        <b-card-text>
          <div class="card-description-service overflow-auto">
            <p class="text-black font-weight-bold">
              {{ item.description }}
            </p>
          </div>
          <div class="d-flex justify-content-center">
            <b-button
              class="text-white mt-1"
              variant="gradient-primary"
              :href="item.buttonURL"
              target="_blank"
            >
              {{ item.buttonText }}
            </b-button>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>
<script>
import {
  BCard,
  BCardText,
  BCardImg,
  BImg,
  BButton,
} from 'bootstrap-vue'
export default {
  components: {
    BCard,
    BCardText,
    BCardImg,
    BImg,
    BButton,
  },
  data() {
    return {
      serviceItems: [
        {
          image: "toba-apps.svg",
          description: "Memberikan solusi melalui berbagai aplikasi untuk pengelolaan data, sumber daya, marketplace, transportasi, serta data analisis dan citra digital.",
          buttonURL: "https://wa.me/6285171609661?text=Hello%20Widya Analytic!%0AButuh%20informasi%20lebih%20lanjut%20tentang%20Toba%20Apps%20nih...",
          buttonText: "Hubungi Kami",
        },
        {
          image: "toba-labs.svg",
          description: "Layanan konsultasi transformasi digital menyeluruh mengenai arsitektur SPBE, Smart City, serta Pengembangan Kompetensi SDM (training).",
          buttonURL: "https://widyaanalytic.com/tobalabs/",
          buttonText: "Selengkapnya",
        },
        {
          image: "toba-algo.svg",
          description: "Layanan kecerdasan buatan (Model NLP, API Mesin Prediksi, & Sistem Rekomendasi) yang mampu memudahkan kinerja dalam dunia pendidikan, industri, dan pemerintahan.",
          buttonURL: "https://wa.me/6285171609661?text=Hello%20Widya Analytic!%0AButuh%20informasi%20lebih%20lanjut%20tentang%20Toba%20Algo%20nih...",
          buttonText: "Hubungi Kami",
        }
      ]
    }
  },
}
</script>