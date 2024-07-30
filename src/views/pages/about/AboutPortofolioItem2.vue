<template>
  <div
    id="portofolio-1"
    class="mt-3"
  >
    <b-row class="layout container m-auto">
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
          <div v-for="index in 4" :key="index">
            <b-carousel-slide>
              <template #img>
                <div
                  class="overlay-image"
                  @mouseover="hover = true"
                  @mouseleave="hover = false"
                >
                  <img
                    class="img-fluid"
                    :src="require(`@/assets/images/pages/about/application-${index}.svg`)"
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

      <b-col
        align-self="center"
        xl='2'
        class="p-2"
      >
        <h3 class="text-primary font-weight-bolder">Application Solution</h3>
        <br>
        <span class="text-black"> Layanan yang dapat mendukung penerapan Transformasi Digital pada Instansi melalui berbagai pengembangan aplikasi untuk pengelolaan data, sumber daya, marketplace, transportasi, serta data analisis dan citra digital. </span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BCarousel, BCarouselSlide, BRow, BCol, BButton } from 'bootstrap-vue'

export default {
  components: {
		BCarousel,
    BCarouselSlide,
    BRow,
    BCol,
    BButton,
  },
  setup() {
    const hover = ref(false)
    return {
      hover
    }
  },
  data: () => ({
    status: false,
    next_detail: "https://api.whatsapp.com/send/?phone=6285171609661&text=Hello+Widya+Analytic%21%0AButuh+informasi+lebih+lanjut+tentang+Toba+Apps+nih...&app_absent=0",
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
