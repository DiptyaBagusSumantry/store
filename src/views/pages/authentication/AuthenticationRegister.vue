<template>
  <div>
    <b-card-title
      title-tag="h2"
      class="font-weight-bolder mb-2"
    >
      Daftar
    </b-card-title>

    <!-- form -->
    <validation-observer ref="registerForm">
      <b-form
        class="auth-register-form mt-2"
        @submit.prevent="register"
      >
        <!-- first name -->
        <b-form-group
          label="Nama Depan"
          label-for="register-first-name"
        >
          <validation-provider
            #default="{ errors }"
            name="Nama depan"
            vid="first_name"
            rules="required|alpha-spaces"
          >
            <b-form-input
              id="register-first-name"
              v-model="userFirstName"
              name="register-first-name"
              :state="errors.length > 0 ? false:null"
              placeholder="Masukkan nama depan"
              trim
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <!-- last name -->
        <b-form-group
          label="Nama Belakang"
          label-for="register-last-name"
          class="mt-lg-2"
        >
          <validation-provider
            #default="{ errors }"
            name="Nama belakang"
            vid="last_name"
            rules="required|alpha-spaces"
          >
            <b-form-input
              id="register-last-name"
              v-model="userLastName"
              name="register-last-name"
              :state="errors.length > 0 ? false:null"
              placeholder="Masukkan nama belakang"
              trim
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <!-- email -->
        <b-form-group
          label="Email"
          label-for="register-email"
          class="mt-lg-2"
        >
          <validation-provider
            #default="{ errors }"
            name="Email"
            vid="email"
            rules="required|email"
          >
            <b-form-input
              id="register-email"
              v-model="userEmail"
              name="register-email"
              :state="errors.length > 0 ? false:null"
              :clearable="false"
              placeholder="contoh@email.com"
              :formatter="(value) => value.toLowerCase()"
              trim
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <!-- phone -->
        <b-form-group
          label="No Kontak (HP)"
          label-for="register-phone"
          class="mt-lg-2"
        >
          <validation-provider
            #default="{ errors }"
            name="Nomor kontak"
            vid="phone"
            rules="required|phone"
          >
            <b-form-input
              id="register-phone"
              v-model="userPhone"
              name="register-phone"
              :state="errors.length > 0 ? false:null"
              placeholder="Masukkan no kontak aktif"
              trim
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <!-- select category -->
        <validation-provider
          #default="{ errors }"
          name="Kategori"
          vid="category"
          rules="required"
        >
          <b-form-group
            label="Kategori"
            label-for="register-category"
            :state="errors.length > 0 ? false:null"
            class="mt-lg-2"
          >
            <v-select
              id="register-category"
              v-model="userCategory"
              name="register-category"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="name"
              :options="userCategories"
              :clearable="false"
              :reduce="option => option.id"
              placeholder="Pilih kategori"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>


        <!-- password -->
        <b-form-group
          label-for="register-password"
          label="Password"
          class="mt-lg-2"
        >
          <validation-provider
            #default="{ errors }"
            name="Password"
            vid="password1"
            rules="required|min:8"
          >
            <b-input-group
              class="input-group-merge"
              :class="errors.length > 0 ? 'is-invalid':null"
            >
              <b-form-input
                id="register-password"
                v-model="userPassword"
                class="form-control-merge"
                :type="passwordFieldType"
                :state="errors.length > 0 ? false:null"
                name="register-password"
                placeholder="Masukkan password"
                autocomplete="off"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIcon"
                  class="cursor-pointer"
                  @click="togglePassword"
                />
              </b-input-group-append>
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <!-- confirm password -->
        <b-form-group
          v-if="userPassword !== ''"
          label-for="register-password-confirm"
          label="Konfirmasi password"
          class="mt-lg-2"
        >
          <validation-provider
            #default="{ errors }"
            name="Konfirmasi password"
            vid="password2"
            rules="required|confirmed:password1"
          >
            <b-input-group
              class="input-group-merge"
              :class="errors.length > 0 ? 'is-invalid':null"
            >
              <b-form-input
                id="register-password-confirm"
                v-model="userPasswordConfirm"
                class="form-control-merge"
                :type="passwordFieldTypeConfirm"
                :state="errors.length > 0 ? false:null"
                name="register-password-confirm"
                placeholder="Ketik ulang password"
                autocomplete="off"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconConfirm"
                  class="cursor-pointer"
                  @click="togglePasswordConfirm"
                />
              </b-input-group-append>
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group class="mt-2 mt-lg-3">
          <b-form-checkbox
            id="register-coupon-check"
            v-model="useCoupon"
          >
            Punya kupon pendaftaran?
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          v-if="useCoupon"
          label="Kupon Pendaftaran"
          label-for="register-coupon"
        >
          <validation-provider
            #default="{ errors }"
            name="Kupon"
            vid="coupon_code"
            rules="required|max:64|alpha-num"
          >
            <b-form-input
              id="register-coupon"
              name="register-coupon"
              v-model="userCoupon"
              trim
              :state="errors.length > 0 ? false:null"
              placeholder="Masukkan kupon pendaftaran"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group class="mt-lg-2">
          <validation-provider
            #default="{ errors }"
            name="Syarat dan ketentuan"
            rules="required"
          >
            <b-form-checkbox
              id="register-term-conditions"
              :state="errors.length > 0 ? false:null"
              v-model="isTnCAgreed"
              @input="(val) => { isTnCAgreed = val ? val : null }"
            >
              Saya menyetujui
              <b-link
                @click="$refs['tnc-modal'].show()"
                class="font-weight-bold"
                style="text-decoration: underline;"
              >
                Syarat dan ketentuan
              </b-link>
            </b-form-checkbox>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group class="mb-2 mb-lg-3 mt-lg-2">
          <validation-provider
            #default="{ errors }"
            name="Kebijakan privasi"
            rules="required"
          >
            <b-form-checkbox
              id="register-privacy-policy"
              :state="errors.length > 0 ? false:null"
              v-model="isPPAgreed"
              @input="(val) => { isPPAgreed = val ? val : null }"
            >
              Data Anda akan kami gunakan untuk meningkatkan pelayanan dan pengalaman Anda (customer service) selama menggunakan produk kami. Baca
              <b-link
                href="https://alpha.toba.ai/privacy-policy"
                target="_blank"
                class="font-weight-bold"
                style="text-decoration: underline;"
              >
                Kebijakan Privasi
              </b-link>
            </b-form-checkbox>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-button
          variant="gradient-primary"
          block
          type="submit"
          class="font-weight-bold"
        >
          <span v-if="!isLoading">Daftar</span>
          <b-spinner
            v-else
            small
            type="grow"
            variant="white"
          />
        </b-button>
      </b-form>
    </validation-observer>

    <!-- terms and conditions -->
    <b-modal
      ref="tnc-modal"
      size="lg"
      hide-footer
      centered
    >
      <terms-and-conditions />
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        class="mt-2"
        block
        variant="primary"
        @click="() => {$refs['tnc-modal'].hide(); isTnCAgreed = true;}"
      >
        Selesai
      </b-button>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BLink, BButton, BModal, BForm, BFormSelect, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BCardTitle, BCardText, BTooltip, BSpinner,
} from 'bootstrap-vue'
import { inject } from '@vue/composition-api'
import { required, email, alphaSpaces, phone, alphaNum, max, min } from '@validations'
import vSelect from 'vue-select'
import useJwt from '@/auth/jwt/useJwt'
import { initLogin, handleRedirectURI, isUserVerified } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import TermsAndConditions from './TermsAndConditions.vue'


export default {
  components: {
    BLink,
    BButton,
    BModal,
    BForm,
    BFormSelect,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BTooltip,
    BSpinner,
    // validations
    ValidationProvider,
    ValidationObserver,
    vSelect,
    ToastificationContent,

    TermsAndConditions,
  },
  data() {
    return {
      isTnCAgreed: true,
      isPPAgreed: true,
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userPhone: '',
      userCategory: null,
      useCoupon: false,
      userCoupon: '',
      userPassword: '',
      userPasswordConfirm: '',
      passwordFieldType: 'password',
      passwordFieldTypeConfirm: 'password',
      // validation
      required,
      email,
      alphaSpaces,
      phone,
      alphaNum,
      max,
      min,

      // Loading button
      isLoading: false,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeOffIcon' : 'EyeIcon'
    },
    passwordToggleIconConfirm() {
      return this.passwordFieldTypeConfirm === 'password' ? 'EyeOffIcon' : 'EyeIcon'
    },
  },
  methods: {
    register() {
      this.isLoading = true
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          useJwt.register({
            first_name: this.userFirstName,
            last_name: this.userLastName,
            email: this.userEmail,
            phone: this.userPhone,
            category: this.userCategory,
            coupon_code: this.userCoupon,
            password1: this.userPassword,
            password2: this.userPasswordConfirm,
          })
            .then(async response => {
              const { user: userData, token: accessToken } = response.data
              await initLogin(userData, accessToken)

              // Navigate User to homepage or redirect to other app
              const { currentRoute } = this.$router
              if (currentRoute.query.redirect_uri && isUserVerified()) {
                handleRedirectURI(currentRoute)
              } else this.$router.push(currentRoute.query.to || { name: 'beranda' })
            })
            .catch(error => {
              const { data: errorData, statusText: errorStatus } = error.response
              if (errorData) {
                const { error: validationErrors } = errorData
                if (validationErrors) {
                  this.$refs.registerForm.setErrors(validationErrors)
                } else {
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
              }
            })
            .finally(() => this.isLoading = false)
        }
      })
    },
    togglePassword() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    togglePasswordConfirm() {
      this.passwordFieldTypeConfirm = this.passwordFieldTypeConfirm === 'password' ? 'text' : 'password'
    },
  },
  setup() {
    const userCategories = inject('userCategories')
    console.log(userCategories)
    return { userCategories }
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.form-group {
  &.is-invalid {
    // Vue Select
    .v-select {
      .vs__actions {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23ea5455' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ea5455' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-size: calc(0.725em + 0.438rem) calc(0.725em + 0.438rem);
        background-position: right calc(0.3625em + 0.219rem) center;
      }
    }
  }
  .v-select {
    .vs__selected-options {
      input {
        &::placeholder {
          color: $gray-100 !important;
        }
      }
    }
  }
}
</style>
