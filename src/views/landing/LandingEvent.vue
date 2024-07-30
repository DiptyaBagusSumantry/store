<template>
  <div
    id="landing-event"
    class="landing-content pt-2 pb-2 bg-semiwhite"
  >
    <div class="text-center mb-4 mb-sm-5">
      <h1 class="text-toba-gradient-blue font-weight-bolder">Ikuti Event & Course Kami</h1>
    </div>
    <div class="d-flex flex-xl-nowrap flex-wrap mb-1 mb-sm-2 justify-content-center">
      <div
        class="m-1"
        v-for="(item, index) in posts.slice(0, 3)" :key="index"
      >
        <event-card :event="item" />
      </div>
    </div>
    <div class="text-center">
      <b-button
        variant="outline-primary"
        :to="{ name: 'event' }"
      >
        Lihat semua Event & Course
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BButton,
} from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import store from '@/store'
import eventStoreModule from '@/views/pages/event/eventStoreModule.js'
import useEvent from '@/views/pages/event/useEvent'
import EventCard from '@/views/pages/event/components/EventCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    EventCard,
  },
  setup(props,context) {
    const WIDYA_ANALYTIC_EVENT_MODULE_NAME = 'widya-analytic-event'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_EVENT_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_EVENT_MODULE_NAME, eventStoreModule)
    // end Register module

    const {
      posts,
      fetchAllPosts,
    } = useEvent(props,context)

    onMounted( async() => {
      await fetchAllPosts([
        { categories: 3, per_page: 3, offset: 0 },
        { categories: '147,158', per_page: 3, offset: 0 },
      ])
    })

    return {
      posts,
    }
  },
}
</script>