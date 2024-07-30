<template>
  <div class="account-verification-wrapper">
    <b-col class="d-flex align-items-center justify-content-center">
      <b-col
        md="10"
        lg="8"
        xl="6"
        class="d-flex align-items-center justify-content-center"
      >
        <b-card class="mb-0 text-center p-lg-2">
          <router-view />
        </b-card>
      </b-col>
    </b-col>
  </div>
</template>

<script>
import {
  BCard, BCol
} from 'bootstrap-vue'
import { isUserVerified } from '@/auth/utils'

export default {
  components: {
    BCard,
    BCol,
  },
  mounted() {
    if (isUserVerified()) {
      this.$router.push({ name: 'beranda' })
    }
  },
}
</script>

<style lang="scss">
.account-verification-wrapper {
  display: flex;
  justify-content: center;
  flex-basis: 100%;
  min-height: 80vh;
  min-height: calc(var(--vh, 1vh) * 80);
  width: 100%;
}
</style>
