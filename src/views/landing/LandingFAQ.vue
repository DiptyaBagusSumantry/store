<template>
  <div
    id="landing-faq"
    class="landing-content pt-2 pb-2 bg-rounded-1"
  >
    <b-row class="container m-auto">
      <b-col
        align-self="center"
        lg="5"
        md="4"
      >
        <h3 class="mb-2 text-primary font-weight-bolder">
          FAQ
        </h3>
        <h5 class="text-black mb-3 mb-sm-5">
          Belum menemukan jawabannya? klik tombol di bawah untuk lebih lengkap
        </h5>
        <b-button
          variant="gradient-primary"
          :to="{ name: 'faq' }"
          class="mb-3"
        >
          Lihat Semua FAQ
        </b-button>
      </b-col>
      <b-col
        lg="7"
        md="8"
      >
        <faq-accordion :accordion="accordion" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import FAQAccordion from '@/views/pages/faq/FAQAccordion.vue'
import { BRow, BCol, BButton,BFormRadioGroup, BFormRadio, BFormGroup } from 'bootstrap-vue'

export default {
  data() {
    return {
      accordion: [
        {
          id: 1,
          title: "Apakah aplikasi di sini tersedia juga di app store atau play store?",
          description: "Saat ini, semua produk / aplikasi masih berupa website jadi hanya bisa diakses melalui web browser seperti Chrome, Firefox, Microsoft Edge, dsb."
        },
        {
          id: 2,
          title: "Apakah saya bisa menggunakan produk / aplikasi dari Widya Analytic di handphone?",
          description:"Tentu bisa! Anda bisa akses melalui browser PC maupun mobile. Namun pastinya, akan lebih nyaman jika menggunakan PC / laptop."
        },
        {
          id: 3,
          title: "Apa keuntungan menggunakan produk / aplikasi dari Widya Analytic?",
          description: "Aplikasi kami dapat membantu Anda dalam menyelesaikan beberapa pekerjaan dengan mudah dan efisien. Mulai dari manajemen konten sosial media, mencari tahu topik-topik populer, melakukan pengarsipan data, hingga update berita politik terbaru."
        },
        {
          id: 4,
          title: "Apakah semua produk / aplikasi di sini berbayar?",
          description: "Tidak ada biaya pendaftaran pada aplikasi kami. Namun, untuk dapat menikmati semua fitur yang ada, Anda bisa berlangganan sesuai dengan kebutuhan."
        },
        {
          id: 5,
          title: "Berapa biaya untuk berlangganan produk / aplikasi di sini?",
          description: " Biaya untuk setiap aplikasi berbeda-beda dan tergantung dengan periode yang dipilih. Untuk informasi lebih detail mengenai harga, silakan hubungi kami melalui telepon (021)1234567 atau email cs@widyaanalytic.com"
        }
      ],
    }
  },
  components: {
    BRow,
    BCol,
    BButton,
    BFormRadioGroup,
    BFormRadio,
    BFormGroup,
    'faq-accordion': FAQAccordion,
  },
}
</script>