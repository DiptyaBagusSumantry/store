<template>
  <div
    id="landing-blog"
    class="landing-content pt-2 pb-2 bg-white bg-rounded-2"
  >
    <div class="text-center mb-4 mb-sm-5">
      <h1 class="text-toba-gradient-blue font-weight-bolder">Blog & Artikel</h1>
    </div>
    <div class="d-flex flex-xl-nowrap flex-wrap mb-3 mb-sm-4 justify-content-center">
      <div
        class="mx-1 mb-1"
        v-for="(value, index) in posts.slice(0, 3)" :key="index"
      >
        <div @click="goToPageAll({ href: value.yoast_head_json.og_url })">
          <wp-article-card
            :label="getCategoryById(value.categories[0])"
            :title="value.yoast_head_json.title"
            :date="formatDate(value.date)"
            :image="value.yoast_head_json.og_image ? value.yoast_head_json.og_image[0].url : require('@/assets/images/articles/empty-post.png')"
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <b-button
        variant="outline-primary"
        :to="{ name: 'blog' }"
      >
        Lihat Semuanya
      </b-button>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from '@vue/composition-api'
import {
  BCard,
  BButton,
  BRow,
  BCol,
} from 'bootstrap-vue'
import store from '@/store'

import WpArticleCard from '@/views/components/WpArticleCard.vue'
import blogStoreModule from '@/views/pages/blog/blogStoreModule'
import useBlog from '@/views/pages/blog/useBlog'

export default {
  components: {
    BCard,
    BButton,
    BRow,
    BCol,

    // component
    WpArticleCard,
  },
  setup(props, context) {
    const WIDYA_ANALYTIC_BLOG_MODULE_NAME = 'widya-analytic-blog'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME, blogStoreModule)
    // end Register module

    const {
      posts,

      fetchAllPosts,
      fetchAllCategories,
      formatDate,
      goToPageAll,
      getCategoryById,
    } = useBlog(props, context)

    onMounted(() => {
      fetchAllCategories()
      fetchAllPosts({ per_page: 3 })
    })

    onUnmounted(() => {
      // UnRegister on leave
      if (store.hasModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME)
      // end UnRegister on leave
    })

    return {
      posts,
      formatDate,
      getCategoryById,
      goToPageAll,
    }
  }
}
</script>