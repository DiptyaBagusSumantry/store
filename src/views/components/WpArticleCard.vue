<template>
  <div class="wp-article-card">
    <b-card no-body>
      <div class="card-img-top">
        <b-img
          :src="image ? image : require('@/assets/images/articles/empty-post.png')"
          rounded="top"
          alt=""
        />
      </div>
      <div class="card-body">
        <b-badge class="text-dark">
          {{ label }}
        </b-badge>
        <div class="card-content">
          <span class="text-toba-gradient-pink font-weight-bold">
            {{ date }}
          </span>
          <div class="title-pos mt-1">
            <h3 class="text-black font-weight-bolder">
              {{ title }}
            </h3>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { BBadge, BButton, BCard, BCardText, BImg } from 'bootstrap-vue'
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  components: {
    BBadge,
    BButton,
    BCard,
    BCardText,
    BImg,
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/components/wp-article';
</style>
