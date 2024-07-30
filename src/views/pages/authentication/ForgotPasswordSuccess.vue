<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <b-card class="mb-0 text-center px-sm-3 py-sm-2">
        <b-img
          class="mb-2"
          alt=""
          :src="require('@/assets/images/icons/email.svg')"
        />

        <b-card-title class="text-black font-weight-bolder mb-2">
          Periksa Email Anda
        </b-card-title>
        <b-card-text class="mb-2">
          Link untuk reset password telah dikirim ke <strong>{{ $route.params.email }}</strong>
        </b-card-text>

        <b-button
          block
          variant="primary"
          class="mt-2 mt-sm-3 mx-auto"
          size="sm"
          :disabled="sendProgress"
          @click="sendLink"
        >
          Kirim Ulang
        </b-button>
      </b-card>

    </div>
  </div>
</template>

<script>
import {
  BButton, BCard, BCardText, BCardTitle, BImg
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BButton,
    BCard,
    BCardText,
    BCardTitle,
    BImg,
  },
  data() {
    return {
      sendProgress: false,
    }
  },
  methods: {
    sendLink() {
      this.sendProgress = true
      this.$http.post('/auth/password/reset/', { email: this.$route.params.email })
        .then(response => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.data.detail,
              icon: 'MailIcon',
              variant: 'success',
            },
          })
        })
        .catch(error => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: errorStatus,
              icon: 'AlertCircleIcon',
              variant: 'danger',
              text: errorData.detail || errorData.message || errorData,
            },
          })
        })
        .finally(() => this.sendProgress = false)
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-auth.scss';
</style>
