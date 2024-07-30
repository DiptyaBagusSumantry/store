<template>
  <div>
    <b-img
      alt="account-verification-confirm-email"
      height="200"
      fluid
      :src="require('@/assets/images/pages/account-verification-confirm-email.svg')"
      class="mb-2 mb-lg-3"
    />
    <b-card-title class="mb-1 mb-lg-2">
      <h2 class="font-weight-bolder">Aktivasi Akun</h2>
    </b-card-title>
    <b-card-text>
      Klik tombol <strong>konfirmasi</strong> untuk mengaktifkan akun Anda.
    </b-card-text>

    <div class="mt-2 mt-lg-3">
      <b-button
        variant="gradient-primary"
        class="px-3"
        @click="confirmEmail"
      >
        <small class="font-weight-bold">Konfirmasi</small>
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  BButton, BImg, BCardTitle, BCardText
} from 'bootstrap-vue'
import { getUserData, updateUserData } from '@/auth/utils'
import { verifiedUserAbility } from '@/libs/acl/config'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    // BSV
    BButton,
    BCardTitle,
    BCardText,
    BImg,
  },
  computed: {
    userData() {
      return getUserData()
    },
  },
  methods: {
    confirmEmail() {
      this.$http.post('/account/verify-email/', {
        key: this.$route.params.key,
      })
        .then(response => {
          this.$ability.update(verifiedUserAbility)
          updateUserData({ is_verified: true, ability: verifiedUserAbility })

          this.$router.push({ name: 'beranda' })

          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.data.detail,
              icon: 'UserIcon',
              variant: 'success',
            },
          })
        })
        .catch(error => {
          const { data: errorData, statusText: errorStatus } = error.response
          if (errorData) {
            // Error witk `code` key is only because key activation is expired or invalid
            if (errorData.code === 'key_expired') {
              this.$router.push({ name: 'account-verification-link-expired' })
              return
            }

            this.$toast({
              component: ToastificationContent,
              props: {
                title: errorStatus,
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: errorData.detail || errorData.message || errorData,
              },
            })
          }
        })
    },
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
