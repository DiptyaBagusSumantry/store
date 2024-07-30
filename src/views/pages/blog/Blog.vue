<template>
  <b-container class="blog">
    <header class="d-flex flex-column align-items-center justify-content-center mb-2 mb-sm-5">
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

    <section
      v-if="categories"
      class="filter-blog"
    >
      <b-tabs
        pills
        align="center"
      >
        <b-tab
          title="Semua"
          active
        >
          <blog-carousel
            source="tobawidya"
            category="Artikel Terbaru"
          />
          <blog-carousel
            source="tobawidya"
            category="Semua Artikel"
          />
        </b-tab>
        <b-tab
          title="Digital Marketing"
          lazy
        >
          <blog-carousel
            source="toba"
            category="Instagram Tips"
            :categoryId="getCategoryId('Instagram Tips')"
          />
          <blog-carousel
            source="toba"
            category="Instagram Update"
            :categoryId="getCategoryId('Instagram Update')"
          />
          <blog-carousel
            source="toba"
            category="Digital Marketing"
            :categoryId="getCategoryId('Digital Marketing')"
          />
        </b-tab>
        <b-tab
          title="Teknologi"
          lazy
        >
          <blog-carousel
            source="widya"
            category="Artikel Terbaru"
          />
          <blog-carousel
            source="widya"
            category="Semua Artikel"
          />
        </b-tab>
      </b-tabs>
    </section>

    <section class="articles">
      <div>
        <h1 class="text-dark font-weight-bolder mb-2">
          Kategori
        </h1>
      </div>
      <div class="categories d-flex flex-wrap justify-content-center">
        <div
          v-for="(value, idx) in categoriesInRandom"
          :key="idx"
          @click="goToPageAll({
            sourceCode: (value.yoast_head_json.og_site_name === 'Toba.AI' ? 't' : 'w'),
            category: value.id
          })"
          class="category m-1"
        >
          <b-img
            :src="require(`@/assets/images/pages/blog-category/${categoriesImg[idx]}.svg`)"
            alt="image"
            fluid-grow
          />
          <div class="label d-flex justify-content-center align-items-center">
            <h4 class="text-white mx-auto">
              {{ value.name }}
            </h4>
          </div>
        </div>
        <div
          class="category m-1"
          @click="shuffleCategories"
        >
          <b-img
            :src="require('@/assets/images/pages/blog-category/categories.svg')"
            alt="image"
            fluid-grow
          />
          <div class="label d-flex justify-content-center align-items-center">
            <h4 class="text-white mx-auto">
              Categories
            </h4>
          </div>
        </div>
      </div>
    </section>

  </b-container>
</template>

<script>
import { ref, onMounted, onUnmounted } from '@vue/composition-api'
import { BButton, BCarousel, BCarouselSlide, BContainer, BFormInput, BImg, BInputGroup, BInputGroupPrepend, BTab, BTabs } from 'bootstrap-vue'
import store from '@/store'

import BlogCarousel from './components/BlogCarousel.vue'
import BlogHeader from './components/BlogHeader.vue'
import blogStoreModule from './blogStoreModule'
import useBlog from './useBlog'

export default {
  components: {
    BButton,
    BCarousel,
    BCarouselSlide,
    BContainer,
    BFormInput,
    BImg,
    BInputGroup,
    BInputGroupPrepend,
    BTab,
    BTabs,

    // components
    BlogHeader,
    BlogCarousel,
  },
  data() {
    return {
      categoriesImg: [
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
    const inputKeyword = ref('')

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME, blogStoreModule)
    // end Register module

    const {
      categories,
      categoriesInRandom,

      fetchAllCategories,

      goToPageAll,
      shuffleCategories,
    } = useBlog(props, context)

    onMounted(() => {
      fetchAllCategories()
    })

    onUnmounted(() => {
      // UnRegister on leave
      if (store.hasModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_BLOG_MODULE_NAME)
      // end UnRegister on leave
    })

    const searchByKeyword = () => {
      context.root.$router.push({ name: 'blog-all', params: { sourceCode: 'tw', category: 'all' }, query: { keyword: inputKeyword.value } })
    }

    const getCategoryId = (val) => {
      const category = categories.value.find(category => category.name === val)
      if (category) {
        return category.id
      }
    }

    return {
      inputKeyword,
      categories,
      categoriesInRandom,

      shuffleCategories,
      searchByKeyword,
      goToPageAll,
      getCategoryId,
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-blog';
</style>
