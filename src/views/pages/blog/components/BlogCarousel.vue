<template>
  <div class="blog">
    <div class="articles">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h1 class="text-dark font-weight-bolder">
          {{ category }}
        </h1>
        <h5
          class="mb-0 text-nowrap"
          @click="goToPageAll({
            sourceCode: (source === 'toba' ? 't' : source === 'widya' ? 'w' : 'tw'),
            category: categoryId ? categoryId : category === 'Artikel Terbaru' ? 'newest' : 'all'
          })"
        >
          Lihat Semua
          <feather-icon
            icon="ChevronRightIcon"
            size="20"
          />
        </h5>
      </div>
      <div
        v-if="posts"
        class="carousel-articles"
      >
        <carousel
          :perPageCustom="[[0, 1], [830, 2], [1450, 3]]"
          :paginationEnabled="false"
          navigationEnabled
          ref="carousel"
        >
          <slide
            v-for="(value, idx) in posts"
            :key="idx"
          >
            <div @click="goToPageAll({ href: value.yoast_head_json.og_url })">
              <wp-article-card
                :label="categoryId ? category : allCategories[value.yoast_head_json.og_site_name][value.categories[0]]"
                :title="value.yoast_head_json.title"
                :date="formatDate(value.date)"
                :image="value.yoast_head_json.og_image ? value.yoast_head_json.og_image[0].url : null"
              />
            </div>
          </slide>
          <template #navigation>
            <navigation-carousel @navigationclick="handleNavigation" />
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import { Carousel, Slide } from 'vue-carousel'
import { ArrowLeftCircleIcon } from 'vue-feather-icons'

import NavigationCarousel from '@/views/components/NavigationCarousel.vue'
import WpArticleCard from '@/views/components/WpArticleCard.vue'
import useBlog from '../useBlog'

export default {
  props: {
    source: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    categoryId: {
      type: Number,
      default: null,
    },
    perPage: {
      type: Number,
      default: 5,
    },
  },
  components: {
    // third party
    ArrowLeftCircleIcon,
    Carousel,
    Slide,

    // components
    NavigationCarousel,
    WpArticleCard,
  },
  methods: {
    handleNavigation(direction) {
      this.$refs.carousel.goToPage(this.$refs.carousel.handleNavigation(direction));
    },
  },
  setup(props, context) {
    const {
      posts,
      allCategories,

      fetchAllPosts,
      fetchTobaPosts,
      fetchTobaCategories,
      fetchWidyaPosts,
      fetchWidyaCategories,

      goToPageAll,
      formatDate,
    } = useBlog(props, context)

    onMounted(() => {
      if (props.source === 'toba') {
        fetchTobaCategories()
        fetchTobaPosts({ categories: props.categoryId, per_page: props.perPage })
      } else if (props.source === 'widya') {
        fetchWidyaCategories()
        fetchWidyaPosts({ categories: props.categoryId, per_page: props.perPage })
      } else if (props.source === 'tobawidya') {
        fetchAllPosts({ per_page: props.perPage })
      }
    })

    return {
      posts,
      allCategories,

      goToPageAll,
      formatDate,
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-blog';
</style>

<style lang="scss" scoped>
.blog {
  .articles {
    margin-bottom: 3rem;
  }
}
</style>
