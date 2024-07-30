<template>
  <b-container class="blog d-flex flex-column">
    <header class="d-flex flex-column align-items-center justify-content-center my-2 mt-lg-0 mb-sm-5">
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <feather-icon
            icon="SearchIcon"
            size="18"
          />
        </b-input-group-prepend>
        <b-form-input
          v-model="inputKeyword"
          @keyup.enter.native="searchByKeyword"
          placeholder="Masukkan kata kunci"
        />
      </b-input-group>

      <blog-header class="w-100" />
    </header>

    <div class="d-flex justify-content-center justify-content-md-start mb-3">
      <h1
        v-if="inputKeyword === ''"
        class="text-dark font-weight-bolder"
      >
        {{ categoryTitle[category] ? categoryTitle[category] : allCategories[source[sourceCode]][category] }}
      </h1>
    </div>
    <div
      v-if="inputKeyword !== '' && postsInTotal === 0"
      class="empty-search d-flex justify-content-center justify-content-md-start"
    >
      <h4 class="font-weight-bolder text-dark">
        Hasil Pencarian:
        <span class="font-weight-normal">
          0 hasil ditemukan
        </span>
      </h4>
    </div>
    <b-row v-else>
      <b-col
        cols="12"
        :md="windowWidth > 1380 ? 4 : 6"
        v-for="(value, idx) in (sourceCode === 'tw' ? posts.slice(perPage * (currentPage - 1), perPage * currentPage) : posts)"
        :key="idx"
      >
        <div
          class="mb-2 d-flex justify-content-center"
          @click="goToPageAll({ href: value.yoast_head_json.og_url })"
        >
          <wp-article-card
            :label="isNaN(category) ?
              allCategories[value.yoast_head_json.og_site_name][value.categories[0]] :
              allCategories[value.yoast_head_json.og_site_name][category]"
            :title="value.yoast_head_json.title"
            :date="formatDate(value.date)"
            :image="value.yoast_head_json.og_image ? value.yoast_head_json.og_image[0].url : null"
          />
        </div>
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
import { ref, watch, onMounted, onUnmounted } from '@vue/composition-api'
import {
  BButton, BCarousel, BCarouselSlide, BCol, BFormInput, BImg, BInputGroup, BInputGroupPrepend, BPagination, BRow, BTab, BTabs, BContainer,
} from 'bootstrap-vue'
import store from '@/store'

import WpArticleCard from '@/views/components/WpArticleCard.vue'
import BlogHeader from './components/BlogHeader.vue'
import blogStoreModule from './blogStoreModule'
import useBlog from './useBlog'

export default {
  components: {
    BButton,
    BCarousel,
    BCarouselSlide,
    BCol,
    BFormInput,
    BImg,
    BInputGroup,
    BInputGroupPrepend,
    BPagination,
    BRow,
    BTab,
    BTabs,
    BContainer,

    // components
    BlogHeader,
    WpArticleCard,
  },
  data() {
    return {
      categoryImg: [
        'digital-marketing',
        'influencer',
        'insight',
        'instagram-tips',
        'instagram-update',
        'liputan-media',
        'toba-labs',
      ],
    }
  },
  setup(props, context) {
    const WIDYA_ANALYTIC_BLOG_MODULE_NAME = 'widya-analytic-blog'
    const categoryTitle = {
      all: 'Semua Artikel',
      newest: 'Artikel Terbaru'
    }
    const source = {
      t: 'Toba.AI',
      w: 'Widya Analytic',
    }

    // Page url parameter
    const { sourceCode, category } = context.root.$route.params

    // Variable
    const perPage = 9
    const currentPage = ref(1)
    const inputKeyword = ref(context.root.$route.query.keyword || '')

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME, blogStoreModule)
    // end Register module

    const {
      posts,
      postsInTotal,

      allCategories,

      windowWidth,

      fetchAllCategories,
      fetchAllPosts,
      fetchTobaCategories,
      fetchTobaPosts,
      fetchWidyaCategories,
      fetchWidyaPosts,

      formatDate,
      getDateMinusNDay,
      goToPageAll,
    } = useBlog(props, context)

    const dateMinusOneMonth = getDateMinusNDay(29)

    onMounted(() => {
      if (sourceCode === 't') {
        fetchTobaCategories()
        fetchTobaPosts({ categories: category, per_page: perPage, search: inputKeyword.value })
      } else if (sourceCode === 'w') {
        fetchWidyaCategories()
        if (category === 'all') fetchWidyaPosts({ per_page: perPage, search: inputKeyword.value })
        else if (category === 'newest') fetchWidyaPosts({ per_page: perPage, after: dateMinusOneMonth, search: inputKeyword.value })
        else fetchWidyaPosts({ categories: category, perPage, search: inputKeyword.value })
      } else if (sourceCode === 'tw') {
        fetchAllCategories()
        if (category === 'all') fetchAllPosts({ per_page: 999, search: inputKeyword.value })
        else if (category === 'newest') fetchAllPosts({ per_page: 999, after: dateMinusOneMonth, search: inputKeyword.value })
      }
    })

    const searchByKeyword = (currentPage = 1) => {
      if (sourceCode === 't') {
        fetchTobaPosts({ categories: category, per_page: perPage, page: currentPage, search: inputKeyword.value })
      } else if (sourceCode === 'w') {
        if (category === 'all') fetchWidyaPosts({ per_page: perPage, page: currentPage, search: inputKeyword.value })
        else if (category === 'newest') fetchWidyaPosts({ per_page: perPage, after: dateMinusOneMonth, page: currentPage, search: inputKeyword.value })
        else fetchWidyaPosts({ categories: category, per_page: perPage, page: currentPage, search: inputKeyword.value })
      } else if (sourceCode === 'tw') {
        if (category === 'all') fetchAllPosts({ per_page: 999, search: inputKeyword.value })
        else if (category === 'newest') fetchAllPosts({ per_page: 999, after: dateMinusOneMonth, search: inputKeyword.value })
      }
    }

    watch(currentPage, val => {
      searchByKeyword(val)
    })

    onUnmounted(() => {
      // UnRegister on leave
      if (store.hasModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME)
      // end UnRegister on leave
    })

    return {
      source,
      sourceCode,

      category,
      categoryTitle,
      allCategories,

      posts,
      postsInTotal,

      perPage,
      currentPage,
      inputKeyword,
      windowWidth,

      formatDate,
      searchByKeyword,
      goToPageAll,
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-blog';
</style>
