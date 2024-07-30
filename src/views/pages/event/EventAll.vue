<template>
  <b-container class="event-all d-flex flex-column">
    <b-breadcrumb
      v-show="(this.$route.name !== 'event')"
      class="text-black breadcrumb-slash"
      :items="breadcrumbItems"
    >
    </b-breadcrumb>

    <header class="d-flex justify-content-center mt-4">
      <h1
        v-show="(this.$route.name !== 'event')"
        class="font-weight-bolder text-black"
      >
        {{ this.$route.params.category }}
      </h1>
    </header>

    <b-row align-h="center" class="mt-3">
      <b-col
        cols='12'
        md="6"
        xl="4"
        class="d-flex justify-content-center"
        v-for="(item, index) in this.$route.params.category === 'Event Terbaru' ? paginationStep : posts"
        :key="index"
      >
        <event-card :event="item"/>
      </b-col>
    </b-row>

    <b-pagination
      class="overflow-auto justify-content-sm-center my-3"
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="postsInTotal"
      pills
      align="fill"
      prev-text="Sebelumnya"
      next-text="Selanjutnya"
    />
  </b-container>
</template>
<script>
import { ref, onMounted, watch, computed } from '@vue/composition-api'
import store from '@/store'
import {
  BBreadcrumb,
  BRow,
  BCol,
  BPagination,
  BContainer,
} from 'bootstrap-vue'
import EventCard from './components/EventCard.vue'
import eventStoreModule from './eventStoreModule.js'
import useEvent from './useEvent'

export default {
  components: {
    BBreadcrumb,
    BCol,
    BRow,
    BPagination,
    BContainer,
    EventCard,
  },
  setup(props,context) {
    const WIDYA_ANALYTIC_EVENT_MODULE_NAME = 'widya-analytic-event'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_EVENT_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_EVENT_MODULE_NAME, eventStoreModule)
    // end Register module

    const breadcrumbItems = ref([
      {
        text: 'Event',
        to: '/store/event',
      },
    ])
    const currentPage = ref(1)
    const perPage = ref(9)
    const route = context.root._route

    const {
      posts,
      postsInTotal,
      fetchWidyaEvents,
      fetchTobaEvents,
      fetchAllPosts,
    } = useEvent(props,context)

    onMounted(() => {
      breadcrumbItems.value.push({
        text : route.params.category,
        to : route.fullPath
      })
      if (route.params.category === 'Live Course') {
        fetchTobaEvents({ categories: 147, per_page: 9, offset: 0 })
      } else if (route.params.category === 'Toba Talks') {
        fetchTobaEvents({ categories: 158, per_page: 9, offset: 0 })
      } else if (route.name === 'event') {
        // When user click 'Teknologi' filter and get data from parent through props
        fetchWidyaEvents({ categories: 3, per_page: 9 })
      } else {
        // Always hit Wordpress API when user click 'Lihat Semua' button on 'Event Terbaru'
        fetchAllPosts([
          { categories: 3, per_page: 999 },
          { categories: '147,158', per_page: 999 },
        ])
      }
    })

    watch(currentPage, (val) => {
      if (route.params.category === 'Live Course') {
        fetchTobaEvents({ categories: 147, per_page: 9, page: val })
      } else if (route.params.category === 'Toba Talks') {
        fetchTobaEvents({ categories: 158 , per_page: 9, page: val })
      } else if (route.name === 'event' ) {
        // When user click teknologi filter and get data from parent through props
        fetchWidyaEvents({ categories: 3, per_page: 9, page: val })
      } else {
        // Using computed paginationStep for 'lihat semua event terbaru'
      }
    })

    const paginationStep = computed(() => {
      let pages = posts.value
      return pages.slice(perPage.value * (currentPage.value - 1), perPage.value * currentPage.value)
    })

    return {
      posts,
      breadcrumbItems,
      currentPage,
      perPage,
      postsInTotal,
      paginationStep,
    }
  },
}
</script>
<style lang="scss">
@import '@/assets/scss/base/pages/page-event.scss';
</style>