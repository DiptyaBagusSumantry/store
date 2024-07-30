<template>
  <div>
    <b-img
      alt="account-verification-info"
      width="294"
      fluid
      :src="require('@/assets/images/pages/account-verification.svg')"
      class="mb-2 mb-lg-3"
    />
    <b-card-title class="mb-1 mb-lg-2">
      <h2><span class="font-weight-normal">Hai</span> <strong>{{ userData.fullName }}</strong></h2>
    </b-card-title>
    <b-card-text>
      Terimakasih sudah mendaftar. Cek email Anda lalu ikuti tautan, ya! Link verifikasi kadaluarsa dalam 3 hari.
    </b-card-text>

    <div class="mt-2 mt-lg-3">
      <b-button
        variant="flat-primary"
        size="sm"
        :disabled="countDown !== '00:00'"
        @click="resendLink"
      >
        <small class="font-weight-bold">Kirim Ulang</small>
      </b-button>
      <div>
        <small class="font-small-1">{{ countDown }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BButton, BImg, BCardTitle, BCardText
} from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
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
  data() {
    return {
      countdownSecs: 60,
      countDown: '00:00',
    }
  },
  methods: {
    resendLink() {
      this.$http.patch('/account/verify-email/resend/')
        .then(response => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.data.detail,
              icon: 'MailIcon',
              variant: 'success',
            },
          })

          // Set the date we're counting down to
          const countDownEndAt = new Date(new Date(response.headers.date).getTime() + this.countdownSecs * 1000)
          // Store data in localStorage
          localStorage.setItem('verificationAccountInfo', JSON.stringify({ countDownEndAt, isResendLinkCooldown: true }))
        })
        .catch(error => {
          const { data: errorData, statusText: errorStatus, headers: responseHeaders } = error.response
          if (errorData) {
            if (errorData.code === 'cooldown_period') {
              const countdownSecs = parseInt(errorData.message.match(/\d+/)[0])
              // Set the date we're counting down to
              const countDownEndAt = new Date(new Date(responseHeaders.date).getTime() + countdownSecs * 1000)
              // Store data in localStorage
              localStorage.setItem('verificationAccountInfo', JSON.stringify({ countDownEndAt, isResendLinkCooldown: true }))
            }
            if (errorData.code === 'exceed_limit') {
              localStorage.removeItem('verificationAccountInfo')
              this.$router.push({ name: 'account-verification-alternative' })
              return
            }
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
        })
        .finally(() => {
          const { countDownEndAt, isResendLinkCooldown } = this.getVerificationAccountInfo()
          if (isResendLinkCooldown) {
            this.setCountDown(countDownEndAt)
          }
        })
    },
    getVerificationAccountInfo() {
      const defaultInfo =  { countDownEndAt: null, isResendLinkCooldown: false }
      return JSON.parse(localStorage.getItem('verificationAccountInfo')) || defaultInfo
    },
    updateCountDown(distance) {
      // Time calculations
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result
      minutes = minutes < 10 ? `0${minutes}` : minutes
      seconds = seconds < 10 ? `0${seconds}` : seconds
      this.countDown = `${minutes}:${seconds}`
    },
    setCountDown(countDownEndAt) {
      if (countDownEndAt) {
        const getDistanceInTime = () => {
          // Get today's date and time
          const now = new Date().getTime()
          return new Date(countDownEndAt).getTime() - now
        }

        // Find the distance between now and the count down date
        const distance = getDistanceInTime()
        // If the count down is finished, remove localStorage (break)
        if (distance < 0) {
          localStorage.removeItem('verificationAccountInfo')
          return
        }

        // Start count down
        this.updateCountDown(distance)

        // Update the count down every 1 second
        const dismiss = setInterval(() => {
          // Find the distance between now and the count down date
          const distance = getDistanceInTime()

          // If the count down is finished, remove localStorage and clear count down (break)
          if (distance <= 0) {
            localStorage.removeItem('verificationAccountInfo')
            clearInterval(dismiss)
          } else {
            // Time calculations in seconds
            this.updateCountDown(distance)
          }
        }, 1000)
      }
    },
  },
  created() {
    const { countDownEndAt, isResendLinkCooldown } = this.getVerificationAccountInfo()
    if (isResendLinkCooldown) {
      this.setCountDown(countDownEndAt)
    }
  },
}
</script>
