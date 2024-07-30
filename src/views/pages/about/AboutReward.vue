<template>
  <div id="reward-section">
    <h1 class="font-weight-bolder mx-auto section-title">
      Penghargaan
    </h1>
    <div class="d-flex flex-wrap justify-content-center">
      <div
        v-for="(value, index) in dataReward"
        :key="index"
        class="reward-item m-1"
      >
        <b-card
          class="m-0 mb-1 w-100"
          no-body
        >
          <b-img
            :src="require(`@/assets/images/rewards/${value.src}.svg`)"
            class="mx-auto my-auto"
          />
        </b-card>
        <h3 class="font-weight-bolder">
          {{ value.name }}
        </h3>
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
    const dataReward = ref([
      {
        name: 'IDENTIK (Indonesia Enterpreneur TIK)',
        src: 'identik'
      },
      {
        name: 'Finalis Asean Startup Award',
        src: 'asa'
      },
      {
        name: 'Finalis Apresiasi Kreasi Indonesia (Bidang Digital)',
        src: 'aki'
      }
    ])

    return {
      dataReward
    }
  }
}
</script>
