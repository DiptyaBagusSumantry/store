<template>
  <div
    id="faq"
    class="flex-wrap landing-content pt-2 pb-3 container m-auto"
  >
    <div class="d-flex justify-content-center">
      <h4
        class="text-black font-weight-bolder"
        :class="{'font-large-2': !['xs', 'sm'].includes(currentBreakPoint)}"
      >
        Ada yang bisa saya bantu?
      </h4>
    </div>
    <div class="d-flex justify-content-center">
      <div
        class="text-black"
        style="width: 577px;"
      >
        <p class="text-center">
          Penasaran dengan layanan one stop service data kami atau tentang Widya Analytic itu sendiri, tanyakan saja dan kami akan senang hati menjawabnya.
        </p>
      </div>
    </div>
    <div class="pt-1">
      <faq-accordion :accordion="accordion" />
    </div>
  </div>
</template>

<script>
import FAQAccordion from './FAQAccordion.vue'
import { mapGetters } from 'vuex'

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
          description: "Tentu bisa! Anda bisa akses melalui browser PC maupun mobile. Namun pastinya, akan lebih nyaman jika menggunakan PC / laptop."
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
          description: "Biaya untuk setiap aplikasi berbeda-beda dan tergantung dengan periode yang dipilih. Untuk informasi lebih detail mengenai harga, silakan hubungi kami melalui telepon (021)1234567 atau email cs@widyaanalytic.com"
        },
        {
          id: 6,
          title: "Apakah bisa mengganti produk / aplikasi ketika sudah melakukan pembayaran?",
          description: "Jika sudah melakukan pembayaran maka tidak bisa diganti."
        },
        {
          id: 7,
          title: "Bisakah saya meminta bantuan Customer Service untuk melakukan proses pembelian Aplikasi",
          description: "Bisa, silakan hubungi Customer Service kami di nomor (021)1234567 untuk melakukan proses pembelian aplikasi."
        },
        {
          id: 8,
          title: "Apakah saya dapat membatalkan langganan?",
          description: "Jika sudah melakukan pembayaran maka tidak bisa dibatalkan."
        },
         {
          id: 9,
          title: "Apakah bisa melakukan pembelian lebih dari 1 produk di hari yang sama?",
          description: "Untuk akun yang sama, pembelian per hari maksimal 1 produk. Jika ingin melakukan beberapa transaksi di hari yang sama bisa dengan menggunakan akun berbeda atau menghubungi Customer Service kami di nomor (021)1234567."
        },
         {
          id: 10,
          title: "Apa saja metode pembayaran yang tersedia?",
          description: "Metode pembayaran yang tersedia saat ini adalah transfer bank (BCA, Mandiri, BNI, BRI), GOPAY, Shopee Pay, Indomart, Alfamart, Visa, dan Master Card."
        },
         {
          id: 11,
          title: "Bagaimana cara mendapatkan tiket Event & Course secara gratis?",
          description: "Caranya mudah, cukup pantau Instagram @widya.analytic dan @toba.ai karena semua Event & Course gratis akan kami informasikan di sana."
        },
      ],
    }
  },
  components: {
    'faq-accordion': FAQAccordion,
  },
  computed: {
    ...mapGetters({
      currentBreakPoint: 'app/currentBreakPoint',
    })
  },
}
</script>

<style lang="scss">
@import '@core/scss/base/bootstrap-extended/include';

#faq {
  height: 100%;
  .card-faq {
    &.collapse-icon {
      &.collapse-margin {
        margin-bottom: 20px;
        .card {
          box-shadow: none !important;
          &-header {
            color: $toba-blue-secondary;
            box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.08);
            height: 88px !important;
            display: flex;
            align-items: center;
            &[aria-expanded=true] {
              box-shadow: 0px 4px 25px 5px rgba(0, 0, 0, 0.1) !important;
            }
          }
          &-body {
            padding: 1rem !important;
            padding-top: 1.3rem !important;
            text-align: justify;
          }

          [data-toggle=collapse]:after {
            background-size: cover;
            height: 20px;
            width: 20px;
            top: 42px;
            right: 15px;
          }

          [aria-expanded=true]:after {
            background-image: url('../../../assets/images/icons/minus-circle.svg') !important;
          }

          [aria-expanded=false]:after {
            background-image: url('../../../assets/images/icons/plus-circle.svg') !important;
          }
        }
        &-title {
          background: -webkit-linear-gradient($toba-blue, $toba-blue-secondary);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          font-weight: 600 !important;
        }
      }
    }
  }
}
</style>