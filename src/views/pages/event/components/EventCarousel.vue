<template>
  <div class="event-category">
    <div class="d-flex justify-content-between align-items-center mb-1">
      <h1 class="text-black font-weight-bolder">
        {{ category }}
      </h1>
      <h5
        style="color:#93989B"
        class="mb-0 text-nowrap"
        @click="goToAll(category)"
      >
        Lihat Semua
        <feather-icon
          icon="ChevronRightIcon"
          size="20"
        />
      </h5>
    </div>
    <carousel
      :perPageCustom="[[0, 1], [830, 2], [1450, 3]]"
      :paginationEnabled="false"
      navigationEnabled
      ref="carousel"
    >
      <slide v-for="(item, index) in posts.slice(0, 5)" :key="index">
        <event-card :event="item" />
      </slide>
      <template #navigation>
        <navigation-carousel @navigationclick="handleNavigation" />
      </template>
    </carousel>
  </div>
</template>
<script>
import { onMounted } from '@vue/composition-api'
import { Carousel, Slide } from 'vue-carousel'
import { ArrowLeftCircleIcon } from 'vue-feather-icons'

import EventCard from './EventCard.vue'
import NavigationCarousel from '@/views/components/NavigationCarousel.vue'
import useEvent from '../useEvent'

export default {
  components:{
    //third party
    Carousel,
    Slide,
    ArrowLeftCircleIcon,

    //component
    EventCard,
    NavigationCarousel,
  },
  props: ['category', 'type'],
  methods: {
    handleNavigation(direction) {
      this.$refs.carousel.goToPage(this.$refs.carousel.handleNavigation(direction))
    },
    toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        }
      )
    },
    goToAll(category) {
      this.$router.push({
        name: 'event-all',
        params: {
          category: this.toTitleCase(category)
        }
      })
    }
  },
  setup(props,context) {
    const {
      posts,
      postsInTotal,
      fetchTobaEvents,
      fetchAllPosts,
    } = useEvent(props,context)

    onMounted(() => {
      if (props.type === 'all') {
        fetchAllPosts([
          { categories: 3, per_page: 5 },
          { categories: '147,158', per_page: 5 },
        ])
      } else if (props.type === 'toba') {
        fetchTobaEvents({ categories: 158, per_page: 5 })
      } else if (props.type === 'live-course') {
        fetchTobaEvents({ categories: 147, per_page: 5 })
      }
    })

    return {
      posts,
      postsInTotal,
    }
  }
}
</script>