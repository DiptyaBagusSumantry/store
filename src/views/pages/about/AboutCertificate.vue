<template>
  <div id="certificate-section">
    <div class="certificate-content">
      <h1 class="font-weight-bolder mx-auto section-title">
        Sertifikat
      </h1>
      <div class="d-flex flex-wrap justify-content-center">
        <b-card
          v-for="(value, index) in dataCertificate"
          :key="index"
          class="m-1"
          no-body
        >
          <b-img
            :src="require(`@/assets/images/certificates/${value}.svg`)"
            class="mx-auto my-auto"
          />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BCard, BImg } from 'bootstrap-vue'

export default {
  components:{
    BCard,
    BImg
  },
  setup() {
    const dataCertificate = ref([
      'togaf',
      'cobit2019',
      'itil4',
      'comptia'
    ])

    return {
      dataCertificate
    }
  }
}
</script>
