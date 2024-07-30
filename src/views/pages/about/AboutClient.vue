<template>
  <div id="client-section">
    <h1 class="font-weight-bolder mx-auto section-title">
      Client
    </h1>
    <div class="d-flex justify-content-center flex-wrap">
      <about-client-card
        v-for="(value, index) in dataClient"
        :key="index"
        class="m-1"
        :data="value"
      />
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import AboutClientCard from './AboutClientCard.vue'

export default {
  components:{
    AboutClientCard
  },
  setup() {
    const dataClient = ref([
      {
        img: 'phe',
        header: {
          title: 'Pertamina Hulu Energi',
          duration: '18 Months Project'
        },
        content: [
          {
            title: 'Toba Apps',
            description: 'CDMS'
          }
        ]
      },
      {
        img: 'tamtech',
        header: {
          title: 'Tamtech  International',
          duration: '3 Months Project'
        },
        content: [
          {
            title: 'Toba Apps',
            description: 'SIM-RS'
          }
        ]
      },
      {
        img: 'ugm',
        header: {
          title: 'UGM',
          duration: '6 Months Project'
        },
        content: [
          {
            title: 'Toba Apps',
            description: 'Gamabox'
          }
        ]
      },
      {
        img: 'paparons'
      },
      {
        img: 'widya-skilloka',
        header: {
          title: 'Widya Skilloka',
          duration: '6 Months Project'
        },
        content: [
          {
            title: 'Toba Data',
            description: 'Konsultasi Teknologi'
          }
        ]
      },
      {
        img: 'diy',
        header: {
          title: 'Pemerintah Kota Jogja',
          duration: '3 Months Project'
        },
        content: [
          {
            title: 'Toba Data',
            description: 'Dashboard Covid-19'
          }
        ]
      },
      {
        img: 'bdi',
        header: {
          title: 'Balai Diklat Industri Yogyakarta',
          duration: '3 Days Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'IOT'
          }
        ]
      },
      {
        img: 'kemenag',
        header: {
          title: 'Balai Diklat Kementerian Keagamaan',
          duration: '5 Days Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'Mobile Dev'
          }
        ]
      },
      {
        img: 'bank-kalteng'
      },
      {
        img: 'esb',
        header: {
          title: 'ESB',
          duration: '3 Months Project'
        },
        content: [
          {
            title: 'Toba Algo',
            description: 'Sistem Rekomendasi'
          }
        ]
      },
      {
        img: 'kab-rembang',
        header: {
          title: 'BKN Rembang',
          duration: '1 Weeks Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'Training Teknologi'
          }
        ]
      },
      {
        img: 'bank-sulsel'
      },
      {
        img: 'widya-security',
        header: {
          title: 'Widya Security',
          duration: '4 Months Project'
        },
        content: [
          {
            title: 'Toba Algo',
            description: 'Konsultasi Teknologi'
          }
        ]
      },
      {
        img: 'dikti-jogja',
        header: {
          title: 'LLDIKTI V',
          duration: '1 Weeks Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'Training Data Science'
          }
        ]
      },
      {
        img: 'widya-herbal',
        header: {
          title: 'Widya Herbal',
          duration: '6 Months Project'
        },
        content: [
          {
            title: 'Toba Apps',
            description: 'Marketplace dan Telekonsultasi'
          }
        ]
      },
      {
        img: 'kemendikbud',
        header: {
          title: 'Kemendikbud',
          duration: '6 Months Project'
        },
        content: [
          {
            title: 'Toba Algo',
            description: 'Automatic Essay Scoring'
          }
        ]
      },
      {
        img: 'bank-sumsel',
        header: {
          title: 'Bank Sumsel Babel',
          duration: '3 Days Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'IT Risk, QA'
          }
        ]
      },
      {
        img: 'univ-tidar',
        header: {
          title: 'Universitas Tidar',
          duration: '1 Weeks Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'Training QA, Sistem Analyst, Web Dev'
          }
        ]
      },
      {
        img: 'bank-sumut',
        header: {
          title: 'Bank Sumut',
          duration: '1 Weeks Project'
        },
        content: [
          {
            title: 'Toba.AI',
            description: 'Konsultasi Big Data untuk CSR'
          }
        ]
      },
      {
        img: 'kemenlu',
        header: {
          title: 'Kemenlu',
          duration: '1 Weeks Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'Training Data Science'
          }
        ]
      },
      {
        img: 'widya-matador',
        header: {
          title: 'Widya Matador',
          duration: '3 Months Project'
        },
        content: [
          {
            title: 'Toba Apps',
            description: 'Dashboard Tracker'
          }
        ]
      },
      {
        img: 'diskominfo-jogja',
        header: {
          title: 'Diskominfo Kota Jogja',
          duration: '1 Weeks Project'
        },
        content: [
          {
            title: 'Toba Data',
            description: 'Training dan instalasi big data'
          }
        ]
      },
      {
        img: 'bank-papua',
        header: {
          title: 'Bank Papua',
          duration: '3 Days Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'Workshop big data'
          }
        ]
      },
      {
        img: 'uin-bandung',
        header: {
          title: 'UIN Bandung',
          duration: '1 Weeks Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'Training IT Risk, IT Audit, Node JS, React JS, DevOpp'
          }
        ]
      },
      {
        img: 'widya-immersive'
      },
      {
        img: 'bareskrim',
        header: {
          title: 'Bareskrim POLRI',
          duration: '1 Weeks Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'Training Data Science, Forensik'
          }
        ]
      },
      {
        img: 'bank-bapas',
        header: {
          title: 'Bank Bapas 69',
          duration: '1 Weeks Project'
        },
        content: [
          {
            title: 'Toba Labs',
            description: 'Training Web Development'
          }
        ]
      },
      {
        img: 'uin-jogja'
      }
    ])

    return {
      dataClient
    }
  }
}
</script>
