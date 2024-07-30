<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <b-card class="mb-0 text-center px-sm-3 py-sm-2">
        <b-img
          class="mb-2"
          alt=""
          :src="require('@/assets/images/pages/reset-password.svg')"
        />

        <b-card-title class="text-black font-weight-bolder mb-2">
          Reset Password
        </b-card-title>
        <b-card-text class="mb-2">
          Masukkan email Anda untuk me-reset password
        </b-card-text>

        <!-- form -->
        <validation-observer
          ref="forgotPasswordForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-forgot-password-form text-left mt-2"
            @submit.prevent="sendLink"
          >
            <!-- email -->
            <b-form-group>
              <validation-provider
                #default="{ errors }"
                name="Email"
                vid="email"
                rules="required|email"
              >
                <b-form-input
                  id="forgot-password-email"
                  v-model="userEmail"
                  :state="errors.length > 0 ? false:null"
                  name="forgot-password-email"
                  placeholder="kamu@contoh.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              block
              variant="primary"
              type="submit"
              class="mt-2 mt-sm-3 mx-auto"
              size="sm"
              :disabled="invalid"
            >
              Kirim Link
            </b-button>
          </b-form>
        </validation-observer>
      </b-card>

    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BCard, BCardText, BCardTitle, BForm, BFormGroup, BFormInput, BImg
} from 'bootstrap-vue'
import { required, email } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BButton,
    BCard,
    BCardText,
    BCardTitle,
    BForm,
    BFormGroup,
    BFormInput,
    BImg,

    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userEmail: '',
      // validation
      required,
      email,
    }
  },
  methods: {
    sendLink() {
      this.$refs.forgotPasswordForm.validate().then(success => {
        if (success) {
          this.$http.post('/auth/password/reset/', { email: this.userEmail })
            .then(response => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: response.data.detail,
                  icon: 'MailIcon',
                  variant: 'success',
                },
              })
              this.$router.push({ name: 'auth-forgot-password-success', params: { email: this.userEmail } })
            })
            .catch(error => {
              const { data: errorData, statusText: errorStatus } = error.response
              if (errorData) {
                const { error: validationErrors } = errorData
                if (validationErrors) {
                  this.$refs.forgotPasswordForm.setErrors(validationErrors)
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
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-auth.scss';
</style>
