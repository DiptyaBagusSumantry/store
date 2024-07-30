<template>
  <div id="landing-swiper">
    <swiper
      ref="mySwiper"
      class="swiper-navigations"
      :options="swiperOptions"
      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
    >
      <swiper-slide
        v-for="(item, index) in swiperSlides"
        :key="index"
        :data-swiper-autoplay="item.category === 'video' && watchVideo ? item.video_duration : 5000"
      >
        <div
          v-if="item.category === 'video'"
          class="h-100"
        >
          <youtube
            :video-id="getYoutubeId(item.video_link)"
            width="100%"
            height="100%"
            ref="youtube"
          />
        </div>
        <div
          v-else
          class="h-100"
          :style="{
            'background': item.background_colors.length > 1 ? (
              `linear-gradient(to right, ${item.background_colors[0]}, ${item.background_colors[1]})`
            ) : item.background_colors[0]
          }"
        >
          <b-img
            :class="`bg-image ${item.category}`"
            :src="item.image.url"
          />
          <div v-if="item.category === 'product'" class="h-100">
            <!-- For Product -->
            <landing-swiper-content class="justify-content-center">
              <template #title>
                <div class="d-flex flex-wrap">
                  <h1 :style="{
                    'color': `${item.font_color}`,
                    'font-size': '50px',
                  }">
                    {{ item.title }}
                  </h1>
                </div>
                <div class="d-flex flex-wrap mb-3 mt-75">
                  <h4 :style="{'color': `${item.font_color}`}">
                    {{ item.subtitle }}
                  </h4>
                </div>
              </template>
              <template #description>
                <div class="d-flex flex-wrap">
                  <p :style="{'color': `${item.font_color}`}">
                    {{ item.description }}
                  </p>
                </div>
                <div class="mt-3">
                  <b-button
                    variant="gradient-orange"
                    :href="buildAbsoluteURI(item.product_link)"
                  >
                    <span class="font-weight-bold">{{ item.button_text }}</span>
                  </b-button>
                </div>
              </template>
            </landing-swiper-content>
          </div>
          <div v-else>
            <!-- For Event -->
            <landing-swiper-content>
              <template #title>
                <div class="d-flex flex-wrap mb-3">
                  <h1 :style="{'color': `${item.font_color}`}">{{ item.title }}</h1>
                </div>
              </template>
              <template #description>
                <div class="d-flex justify-content-between flex-wrap mb-3">
                  <div style="width: 180px">
                    <h3
                      class="text-nowrap"
                      :style="{'color': `${item.font_color}`}"
                    >
                      {{ formatDate(item.event_start) }}<br>
                      {{ formatTime(item.event_start, item.event_end) }}
                    </h3>
                  </div>
                  <h3
                    v-show="item.event_is_online"
                    :style="{'color': `${item.font_color}`}"
                  >
                    Live Via ZOOM
                  </h3>
                </div>
                <div class="d-flex">
                  <h5 :style="{'color': `${item.font_color}`}">Pembicara:</h5>
                </div>
                <div class="d-flex">
                  <h2 :style="{'color': `${item.font_color}`}">{{ item.event_speaker }}</h2>
                </div>
                <div class="d-flex">
                  <p :style="{'color': `${item.font_color}`}">{{ item.event_speaker_origin }}</p>
                </div>
                <div class="mt-3">
                  <b-button
                    variant="gradient-orange"
                    :href="buildAbsoluteURI(item.event_registration_link)"
                  >
                    <span class="font-weight-bold">{{ item.button_text ? item.button_text : 'Daftar Sekarang' }}</span>
                  </b-button>
                </div>
                <div class="social-media d-flex mt-3 justify-content-between flex-wrap">
                  <div class="d-flex">
                    <feather-icon
                      icon="TwitterIcon"
                      fill="white"
                      size="18"
                      :color="item.font_color"
                      class="mr-1"
                    />
                    <p :style="{'color': `${item.font_color}`}">WIDYAANALYTIC</p>
                  </div>
                  <div class="d-flex mr-1">
                    <feather-icon
                      icon="InstagramIcon"
                      size="18"
                      :color="item.font_color"
                      class="mr-1"
                    />
                    <p :style="{'color': `${item.font_color}`}">WIDYAANALYTIC</p>
                  </div>
                </div>
              </template>
            </landing-swiper-content>
          </div>
        </div>
      </swiper-slide>

      <!-- Add Arrows -->
      <div
        slot="button-next"
        class="swiper-button-next"
        @click="nextButton(videoIndex)"
      />
      <div
        slot="button-prev"
        class="swiper-button-prev"
        @click="prevButton(videoIndex)"
      />
      <div
        slot="pagination"
        class="swiper-pagination"
      />
    </swiper>
  </div>
</template>

<script>
import { BButton, BImg } from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { onMounted } from '@vue/composition-api'

import LandingSwiperContent from './LandingSwiperContent.vue'
import useLanding from '@/views/landing/useLanding'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    BButton,
    BImg,
    LandingSwiperContent,
  },
  data() {
    return {
      watchVideo: false,
      swiperOptions: {
        direction: 'horizontal',
        initialSlide : 0,
        slidesPerView: 1,
        spaceBetween: 300,
        centeredSlides: true,
        autoplay: {
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
        },
      },
    }
  },
  methods: {
    getYoutubeId(videoLink) {
      return this.$youtube.getIdFromUrl(videoLink)
    },
    nextButton(videoIndex) {
      if (this.$refs.mySwiper.$swiper.realIndex === videoIndex-1) {
        this.watchVideo = true
        this.player.playVideo()
      }
    },
    prevButton(videoIndex) {
      if (this.$refs.mySwiper.$swiper.realIndex !== videoIndex-1) {
        this.watchVideo = false
        this.player.stopVideo()
      }
    },
    buildAbsoluteURI(url) {
      if (url.startsWith("http")) return url
      return `https://${url}`
    }
  },
  computed: {
    player() {
      return this.$refs.youtube[0].player
    },
  },
  setup(props, context) {
    const {
      videoIndex,
      swiperSlides,
      fetchSwiperSlides,
      formatDate,
      formatTime,
    } = useLanding(props, context)

    onMounted(() => {
      fetchSwiperSlides()
    })

    return {
      videoIndex,
      swiperSlides,
      formatDate,
      formatTime,
    }
  }
}
</script>