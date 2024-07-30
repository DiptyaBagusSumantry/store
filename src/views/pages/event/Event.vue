<template>
  <b-container class="event">
    <header>
      <event-header />
    </header>

    <div class="filter-event">
      <b-tabs
        pills
        align="center"
      >
        <b-tab
          title="Semua"
          active
          lazy
        >
          <event-carousel
            :category="'Event Terbaru'"
            type="all"
          />
          <event-carousel
            :category="'Live Course'"
            type="live-course"
          />
          <event-carousel
            :category="'Toba Talks'"
            type="toba"
          />
        </b-tab>
        <b-tab
          title="Digital Marketing"
          lazy
        >
          <event-carousel
            :category="'Live Course'"
            type="live-course"
          />
          <event-carousel
            :category="'Toba Talks'"
            type="toba"
          />
        </b-tab>
        <b-tab
          title="Teknologi"
          lazy
        >
          <event-all />
        </b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>
<script>
import {
  BButton,
  BContainer,
  BTab,
  BTabs,
  BRow,
  BCol,
} from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import store from '@/store'
import EventCarousel from './components/EventCarousel.vue'
import EventAll from './EventAll'
import EventHeader from './EventHeader'
import eventStoreModule from './eventStoreModule.js'
import useEvent from './useEvent'

export default {
  components:{
    BButton,
    BContainer,
    BTab,
    BTabs,
    BCol,
    BRow,
    EventCarousel,
    EventAll,
    EventHeader,
  },
  setup(props,context) {
    const WIDYA_ANALYTIC_EVENT_MODULE_NAME = 'widya-analytic-event'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_EVENT_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_EVENT_MODULE_NAME, eventStoreModule)
    // end Register module

    const {
      fetchAllPosts,
    } = useEvent(props,context)

    onMounted(() => {
      fetchAllPosts([
        { categories: 3, per_page: 5 },
        { categories: '147,158', per_page: 5 },
      ])
    })

    return {}
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/base/pages/page-event.scss';
</style>