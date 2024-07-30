<template>
  <div id="portofolio-1">
    <b-row class="layout container m-auto">
      <b-col
        align-self="center"
        xl='2'
        class="p-2"
      >
        <h3 class="text-primary font-weight-bolder"> IT Solution</h3>
        <br>
        <span class="text-black"> Layanan Konsultasi di bidang Teknologi, Big Data dan juga Transformasi Digital untuk mengembangkan SDM (training & sertifikasi), SPBE, dan Smart City. </span>
      </b-col>

      <b-col
        align-self="center"
        class="p-2"
      >
        <b-carousel
          id="carousel-1"
          ref="myCarousel"
          indicators
          :interval="0"
        >
          <div v-for=" index in 4 " :key="index">
            <b-carousel-slide>
              <template #img>
                <div
                  class="overlay-image"
                  @mouseover="hover = true"
                  @mouseleave="hover = false"
                >
                  <img
                    class="img-fluid"
                    :src="require(`@/assets/images/pages/about/it-solution-${index}.svg`)"
                  >
                  <div class="hover-carosel" />
                    <div
                      v-if="hover"
                      class="d-flex justify-content-between align-items-center control-carousel"
                    >
                      <div
                        @click="prev"
                        class="icon-navigation ml-2"
                      >
                        <feather-icon
                          icon="ChevronLeftIcon"
                          width="30"
                          height="30"
                          stroke="#ffff"
                          stroke-width="1"
                        />
                        <div class="w-100 h-100 overlay-icon" />
                      </div>
                        <b-button
                          :href="`${next_detail}`"
                          variant="gradient-primary"
                        >
                          Lebih Lanjut
                        </b-button>
                      <div
                        @click="next"
                        class="icon-navigation mr-2"
                      >
                        <feather-icon
                          icon="ChevronRightIcon"
                          width="30"
                          height="30"
                          stroke="#ffff"
                          stroke-width="1"
                        />
                        <div class="w-100 h-100 overlay-icon" />
                      </div>
                    </div>
                </div>
              </template>
            </b-carousel-slide>
          </div>
        </b-carousel>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BCarousel, BCarouselSlide, BRow, BCol, BButton, BLink } from 'bootstrap-vue'

export default {
  components: {
		BCarousel,
    BCarouselSlide,
    BRow,
    BCol,
    BButton,
    BLink,
  },
  setup() {
    const hover = ref(false)
    return {
      hover,
    }
  },
  data: () => ({
    status: false,
    next_detail: "https://widyaanalytic.com/tobalabs/",
  }),
  methods: {
    prev() {
      if (!this.status) {
        this.$refs.myCarousel.prev()
      }
    },
    next() {
      if (!this.status) {
        this.$refs.myCarousel.next()
      }
    },
    start() {
      this.status = !this.status
      if (this.status) {
        this.$refs.myCarousel.pause()
      } else {
        this.$refs.myCarousel.start()
      }
    },
  },
}
</script>