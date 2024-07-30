<template>
  <div class="blog-header">
    <div v-if="!posts">
      <b-carousel
        class="carousel-artikel"
        controls
        indicators
      >
        <b-carousel-slide :img-src="require('@/assets/images/articles/empty-post.png')">
          <div class="carousel-content pl-5 h-100 d-flex align-items-center" />
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div v-else>
      <b-carousel
        class="carousel-artikel"
        controls
        indicators
      >
        <b-carousel-slide
          v-for="(value, idx) in posts.slice(0, 3)"
          :key="idx"
          :img-src="value.yoast_head_json.og_image ? value.yoast_head_json.og_image[0].url : require('@/assets/images/articles/empty-post.png')"
        >
          <div class="carousel-content pl-5 h-100 d-flex align-items-center">
            <div class="text-left">
              <h4 class="font-weight-bolder text-white">
                {{ allCategories[value.yoast_head_json.og_site_name][value.categories[0]] }}
              </h4>
              <h1 class="text-white font-weight-bolder mb-2">
                <span v-html="value.yoast_head_json.title" />
              </h1>
              <div class="mb-2">
                <span v-html="value.yoast_head_json.og_description" />
              </div>
              <b-button
                @click="goToPageAll({ href: value.yoast_head_json.og_url })"
                variant="primary"
              >
                Lihat Detail
              </b-button>
            </div>
          </div>
        </b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import { BButton, BCarousel, BCarouselSlide } from 'bootstrap-vue'

import useBlog from '../useBlog'

export default {
  components: {
    BButton,
    BCarousel,
    BCarouselSlide,
  },
  setup(props, context) {
    const {
      posts,
      allCategories,

      goToPageAll,
      fetchAllCategories,
      fetchAllPosts,
    } = useBlog(props, context)

    onMounted(() => {
      fetchAllCategories()
      fetchAllPosts({ per_page: 3 })
    })

    return {
      posts,
      allCategories,
      goToPageAll,
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-blog';
</style>
