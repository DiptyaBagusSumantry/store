<template>
  <b-row class="event-header d-flex align-items-center justify-content-center mb-3">
    <b-col
      lg="6"
      md="10"
      sm="12"
      :order="['lg', 'xl'].includes(currentBreakpoint) ? '1' : '2'"
      class="d-flex flex-column justify-content-center align-items-center mt-2 mt-lg-0"
    >
      <h1 class="mb-2 text-black font-weight-bolder">
        Tingkatkan skill dan pengetahuan Anda di sini
      </h1>
      <small class="text-black">
        Ada berbagai Event dan Live Course untuk menambah skill dan pengetahuan Anda terkait Teknologi, Media Sosial, dan Digital Marketing.
      </small>
    </b-col>
    <b-col
      class="d-flex justify-content-center mt-1 mt-lg-0"
      lg="6"
      md="10"
      sm="12"
      :order="(['lg', 'xl'].includes(currentBreakpoint)) ? '2' : '1'"
    >
      <b-img
        :src="require('@/assets/images/event/ilustrasi_9.svg')"
        fluid
      />
    </b-col>
  </b-row>
</template>
<script>
import {
  BImg,
  BRow,
  BCol,
} from 'bootstrap-vue'
import useEvent from './useEvent'

export default {
  components:{
    BImg,
    BCol,
    BRow,
  },
  setup(props,context) {
    const {
      currentBreakpoint,
    } = useEvent(props,context)

    return {
      currentBreakpoint,
    }
  }
}
</script>