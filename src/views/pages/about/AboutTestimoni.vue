<template>
  <div id="testimoni-section">
    <h1 class="font-weight-bolder mx-auto section-title">
      Testimoni
    </h1>
    <div class="d-flex flex-wrap justify-content-center">
      <about-testimoni-card
        v-for="(value, index) in dataTestimoni"
        :key="index"
        :data="value"
        class="m-1"
      />
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BCard, BImg } from 'bootstrap-vue'
import AboutTestimoniCard from './AboutTestimoniCard.vue'

export default {
  components:{
    BCard,
    BImg,
    AboutTestimoniCard
  },
  setup() {
    const dataTestimoni = ref([
      {
        name: 'Jerry Sambuaga',
        position: 'Wakil Menteri Perdagangan',
        testimoni: 'Semoga mengedepankan produk-produk karya dan bangsa, dan dapat ekspor sampai mancanegara',
        img: 'jerry-sambuaga'
      },
      {
        name: 'Rahmawati, S.T., M.ED.',
        position: 'Koordinator bidang Analisis dan pemanfaatan hasil penilaian-Pusat asesmen kemendikbud ristek',
        testimoni: 'Semoga Widya analytic akan lebih inovatif, layanannya berkualitas dan terus berdampak.',
        img: 'rahmawati'
      },
      {
        name: 'Ignatius Trigastono',
        position: 'Kepala Dinas Kominfo dan Persandian Kota Yogyakarta',
        testimoni: 'Semoga terus maju, dan layanannya makin berkualitas',
        img: 'ignatius-tri-hastono'
      },
      {
        name: 'Bimo Widyo Andoko',
        position: 'Kepala Lembaga Layanan Pendidikan Tinggi Wilayah V Yogyakarta',
        testimoni: 'Semoga Widya Analytic dapat jadi perusahaan yang semakin maju, dengan layanan yang berkualitas tinggi di layanan Big Data dan AI'
      }
    ])

    return {
      dataTestimoni
    }
  }
}
</script>
