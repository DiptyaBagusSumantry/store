<template>
  <div class="testimoni-card">
    <b-card
      no-body
      @mouseover="cardHover = true"
      @mouseleave="cardHover = false"
    >
      <div class="tcard-header d-flex align-items-center">
        <b-avatar
          class="mr-1"
          size="80px"
          :src="data['img'] ? require(`@/assets/images/testimoni/${data['img']}.png`) : ''"
        />
        <div>
          <p class="font-weight-bolder text-primary m-0">
            {{ data['name'] }}
          </p>
          <span>
            {{ data['position'] }}
          </span>
        </div>
      </div>
      <hr class="m-0">
      <div class="tcard-content">
        <b-img
          class="mb-1"
          :src="cardHover ? require('@/assets/images/testimoni/dash-hover.svg') : require('@/assets/images/testimoni/dash.svg')"
        />
        <p class="m-0 font-weight-bold">
          {{ data['testimoni'] }}
        </p>
      </div>
    </b-card>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BAvatar, BCard, BImg } from 'bootstrap-vue'

export default {
  components:{
    BAvatar,
    BCard,
    BImg
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const cardHover = ref(false)

    return {
      cardHover
    }
  }
}
</script>
