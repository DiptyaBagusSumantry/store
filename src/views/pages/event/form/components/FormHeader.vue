<template>
  <div id="form-header">
    <b-card :title="title">
      <span class="card-form card-form-context">
        {{ content }}
      </span>
      <hr>
      <div>
        <span class="card-form text-black">
          {{ userData.fullName }}
        </span>
      </div>
    </b-card>
  </div>
</template>

<script>
import { BButton, BCard } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
  },
  computed: {
    userData() {
      return getUserData()
    }
  },
  components: {
    BButton,
    BCard,
  },
}
</script>

<style lang="scss">
#form-header {
  .card-title {
    font-weight: 600 !important;
    font-size: 24px !important;
    line-height: 32px !important;
    background: linear-gradient(279.9deg, rgba(245, 49, 127, 0) 0%, #F5317F 100%), #FF7C6E;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .card-form {
    font-size: 12px;
    line-height: 20px;

    .context {
      color: #5e646a;
    }
    .or {
      color: #c9cbcd
    }
  }
}
</style>
