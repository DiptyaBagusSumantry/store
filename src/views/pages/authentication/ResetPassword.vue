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
          Buat Password Baru
        </b-card-title>

        <!-- form -->
        <validation-observer
          ref="resetPasswordForm"
          #default="{invalid}"
        >
          <b-form
            method="POST"
            class="auth-reset-password-form mt-2 text-left"
            @submit.prevent="resetPassword"
          >

            <!-- password -->
            <b-form-group
              label="Password Baru"
              label-for="reset-password-new"
            >
              <validation-provider
                #default="{ errors }"
                name="Password"
                vid="new_password2"
                rules="required|min:8"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-new"
                    v-model="newPassword1"
                    :type="password1FieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="reset-password-new"
                    placeholder="Masukkan password baru"
                    autocomplete="off"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password1ToggleIcon"
                      @click="togglePassword1Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- confirm password -->
            <b-form-group
              label-for="reset-password-confirm"
              label="Konfirmasi Password"
              class="mt-lg-2"
            >
              <validation-provider
                #default="{ errors }"
                name="Konfirmasi password"
                rules="required|confirmed:new_password2"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-confirm"
                    v-model="newPassword2"
                    :type="password2FieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="reset-password-confirm"
                    placeholder="Ketik ulang password baru"
                    autocomplete="off"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password2ToggleIcon"
                      @click="togglePassword2Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              block
              type="submit"
              size="sm"
              :disabled="invalid"
              variant="primary"
              class="mt-2 mt-sm-3 mx-auto"
            >
              Simpan
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
  BButton, BCard, BCardTitle, BCardText, BForm, BFormGroup, BFormInput, BImg, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { required, min } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BButton,
    BCard,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BFormInput,
    BImg,
    BInputGroup,
    BInputGroupAppend,

    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      newPassword1: '',
      newPassword2: '',

      // validation
      required,
      min,

      // Toggle Password
      password1FieldType: 'password',
      password2FieldType: 'password',
    }
  },
  computed: {
    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeOffIcon' : 'EyeIcon'
    },
    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeOffIcon' : 'EyeIcon'
    },
  },
  methods: {
    togglePassword1Visibility() {
      this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
    },
    togglePassword2Visibility() {
      this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
    },
    resetPassword() {
      this.$refs.resetPasswordForm.validate().then(success => {
        if (success) {
          this.$http.post('/auth/password/reset/confirm/', {
              new_password1: this.newPassword1,
              new_password2: this.newPassword2,
              uid: this.$route.params.key,
              token: this.$route.params.token,
          })
            .then(response => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: response.data.detail,
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })
              this.$router.push({ name: 'auth-reset-password-success' })
            })
            .catch(error => {
              const { data: errorData, statusText: errorStatus } = error.response
              if (errorData) {
                const { error: validationErrors } = errorData
                if (validationErrors) {
                  this.$refs.resetPasswordForm.setErrors(validationErrors)
                  if (validationErrors['token']) {
                    this.$toast({
                      component: ToastificationContent,
                      props: {
                        title: errorStatus,
                        icon: 'AlertCircleIcon',
                        variant: 'danger',
                        text: 'Tautan tidak valid.',
                      },
                    })
                  }

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

.auth-reset-password-form {
  .form-group {
    label {
      font-size: 10px;
    }
  }
}
</style>
