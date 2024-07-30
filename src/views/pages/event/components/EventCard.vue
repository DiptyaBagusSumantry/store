<template>
  <div class="event-card">
    <a
      :href="event.yoast_head_json.og_url"
      target="_blank"
    >
      <b-card class="card-base w-100 mb-2">
        <div class="card-img-top w-100">
          <b-img
            class="w-100"
            :src="event.yoast_head_json.og_image ? event.yoast_head_json.og_image[0].url : require('@/assets/images/articles/empty-post.png')"
            lazy
          />
        </div>
        <b-card-text class="mt-1">
          <span class="text-toba-gradient-pink font-weight-bold">
            {{ formatDate(event.yoast_head_json.article_published_time) }}
          </span>
          <div
            class="card-title-event mt-1"
            :class="{'overflow-auto': event.yoast_head_json.og_title.length >= 49}"
          >
            <h3 class="text-black font-weight-bolder">
              {{ event.yoast_head_json.og_title }}
            </h3>
          </div>
        </b-card-text>
      </b-card>
    </a>
  </div>
</template>

<script>
import useBlog from '@/views/pages/blog/useBlog'

import {
  BButton,
  BCard,
  BCardText,
  BImg,
} from 'bootstrap-vue'

export default {
  props: ['event'],
  components: {
    BButton,
    BCard,
    BCardText,
    BImg,
  },
  setup(props, context) {
    const { formatDate } = useBlog(props, context)

    return { formatDate }
  }
}
</script>
