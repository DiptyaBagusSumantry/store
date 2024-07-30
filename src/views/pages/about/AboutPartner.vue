<template>
  <div id="partner-section">
    <h1 class="font-weight-bolder mx-auto section-title">
      Partner
    </h1>
    <carousel
      :perPageCustom="[[0, 1], [500, 2], [720, 3], [970, 4], [1140, 5], [1450, 7]]"
      :loop="true"
      :autoplay="true"
      :autoplayHoverPause="true"
      :paginationEnabled="false"
    >
      <slide
        v-for="(value, index) in dataPartner"
        :key="index"
      >
        <b-img :src="require(`@/assets/images/partners/${value}.svg`)" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BImg } from 'bootstrap-vue'
import { Carousel, Slide } from 'vue-carousel'

export default {
  components:{
    BImg,
    Carousel,
    Slide,
  },
  setup() {
    const dataPartner = ref([
      'asus',
      'kreen',
      'widya-wicara',
      'efison',
      'umg',
      'praxis',
      'widya-robotics',
      'akumandiri',
      'qubisa',
      'bpr-msa'
    ])

    return {
      dataPartner
    }
  }
}
</script>
