<template>
  <div class="profile-setting-form d-flex justify-content-center">
    <validation-observer
      class="w-75"
      ref="refChangePasswordForm"
      tag="form"
    >
      <validation-provider
        #default="{ errors }"
        name="Password lama"
        vid="old_password"
        rules="required"
      >
        <b-form-group
          label="Password Lama"
          label-for="setting-password-old"
        >
          <b-input-group
            class="input-group-merge"
            :class="errors.length > 0 ? 'is-invalid':null"
          >
            <b-form-input
              id="setting-password-old"
              v-model="oldPass"
              :type="oldPasswordFieldType"
              placeholder="Masukkan password lama"
              :state="errors.length > 0 ? false:null"
            />
            <b-input-group-append is-text>
              <feather-icon
                :icon="oldPasswordFieldType === 'password' ? 'EyeOffIcon': 'EyeIcon'"
                class="cursor-pointer"
                @click="togglePasswordVisibilityCustom('old')"
              />
            </b-input-group-append>
          </b-input-group>
          <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        #default="{ errors }"
        name="Password baru"
        vid="new_password1"
        rules="required"
      >
        <b-form-group
          label="Password Baru"
          label-for="setting-password-new"
        >
          <b-input-group
            class="input-group-merge"
            :class="errors.length > 0 ? 'is-invalid':null"
          >
            <b-form-input
              id="setting-password-new"
              v-model="newPass1"
              :type="newPasswordFieldType"
              placeholder="Masukkan password baru"
              :state="errors.length > 0 ? false:null"
            />
            <b-input-group-append is-text>
              <feather-icon
                :icon="newPasswordFieldType === 'password' ? 'EyeOffIcon' : 'EyeIcon'"
                class="cursor-pointer"
                @click="togglePasswordVisibilityCustom('new')"
              />
            </b-input-group-append>
          </b-input-group>
          <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        #default="{ errors }"
        name="Konfirmasi password baru"
        vid="new_password2"
        rules="required|password:@new_password1"
      >
        <b-form-group
          label="Konfirmasi Password Baru"
          label-for="setting-password-new-confirm"
        >
          <b-input-group
            class="input-group-merge"
            :class="errors.length > 0 ? 'is-invalid':null"
          >
            <b-form-input
              id="setting-password-new-confirm"
              v-model="newPass2"
              :type="confirmationPasswordFieldType"
              placeholder="Ketik ulang password baru"
              :state="errors.length > 0 ? false:null"
            />
            <b-input-group-append is-text>
              <feather-icon
                :icon="confirmationPasswordFieldType === 'password' ? 'EyeOffIcon' : 'EyeIcon'"
                class="cursor-pointer"
                @click="togglePasswordVisibilityCustom('confirmation')"
              />
            </b-input-group-append>
          </b-input-group>
          <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <div class="d-flex justify-content-end mt-2 mt-md-3">
        <b-button
          @click="changePassword"
          class="font-weight-bold w-25"
          variant="primary"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        >
          Simpan
        </b-button>
      </div>

    </validation-observer>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { ref } from '@vue/composition-api'
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
import { BButton, BFormGroup, BFormInput, BFormInvalidFeedback, BInputGroup, BInputGroupAppend } from 'bootstrap-vue'
import { togglePasswordVisibilityCustom } from '@/mixins/forms'

import useProfile from '@/views/pages/profile/useProfile'

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password yang dimasukkan berbeda'
})

export default {
  components: {
    BButton,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BInputGroup,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibilityCustom],
  setup() {
    const refChangePasswordForm = ref(null)
    const oldPass = ref('')
    const newPass1 = ref('')
    const newPass2 = ref('')

    const {
      updatePassword,
      successNotification,
      warningNotification,
    } = useProfile()

    const changePassword = () => {
      return new Promise((resolve, reject) => {
        refChangePasswordForm.value.validate().then(success => {
          if (success) {
            const payload = {
              old_password: oldPass.value,
              new_password1: newPass1.value,
              new_password2: newPass2.value,
            }
            updatePassword(payload)
              .then(() => {
                resolve(successNotification('Password Berhasil Diubah!'))
              })
              .catch(error => {
                const { data: errorData, status: statusCode } = error.response
                if (statusCode === 400 && errorData) {
                  const { error: validationErrors } = errorData
                  if (validationErrors) refChangePasswordForm.value.setErrors(validationErrors)
                } else {
                  reject(warningNotification('Maaf, terjadi kesalahan saat ganti password.'))
                }
              })
          }
        })
      })
    }

    return {
      refChangePasswordForm,
      oldPass,
      newPass1,
      newPass2,
      changePassword,
    }
  }
}
</script>
