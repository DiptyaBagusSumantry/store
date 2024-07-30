<template>
  <div
    id="profile-setting-general"
    class="d-flex justify-content-around"
  >
    <div class="d-flex flex-column align-items-center">
      <b-avatar
        class="mx-3 badge-none"
        :src="profilePhoto"
        variant="light-primary"
        size="167px"
      />
      <div class="text-center mt-75">
        <validation-observer ref="refInputPhotoForm">
          <validation-provider
            ref="refInputPhotoProvider"
            name="File"
            rules="image"
            vid="photo"
            v-slot="{ errors }"
          >
            <b-button
              size="sm"
              variant="flat-primary"
              class="cursor-pointer"
              @click="$refs.inputPhoto.click()"
            >
              <input
                ref="inputPhoto"
                type="file"
                class="d-none"
                @input="inputImageRenderer"
                @change="handleFileChange"
              >
              <span class="d-block font-weight-bolder text-primary font-small-4">Edit Foto Profil</span>
            </b-button>
            <p
              v-if="errors.length === 0"
              class="font-small-1"
            >
              [Max: 500 KB]
            </p>
            <b-form-invalid-feedback
              class="px-2"
              :state="errors.length > 0 ? false:null"
            >
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>
        </validation-observer>
      </div>
    </div>
    <div class="profile-setting-form d-flex justify-content-center w-100">
      <validation-observer
        ref="refProfileSettingForm"
        tag="form"
      >
        <validation-provider
          #default="{ errors }"
          name="Nama depan"
          rules="required|alpha-spaces"
        >
          <b-form-group
            label="Nama Depan"
            label-for="setting-first-name"
            :state="errors.length > 0 ? false:null"
          >
            <b-form-input
              id="setting-first-name"
              placeholder="Masukkan nama depan"
              v-model="dataLocal.firstName"
              trim
              :state="errors.length > 0 ? false:null"
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider
          #default="{ errors }"
          name="Nama belakang"
          rules="required|alpha-spaces"
        >
          <b-form-group
            label="Nama Belakang"
            label-for="setting-last-name"
            :state="errors.length > 0 ? false:null"
          >
            <b-form-input
              id="setting-last-name"
              placeholder="Masukkan nama belakang"
              v-model="dataLocal.lastName"
              trim
              :state="errors.length > 0 ? false:null"
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <b-form-group
          label="Email"
          label-for="setting-email"
        >
          <b-form-input
            id="setting-email"
            :value="dataLocal.email"
            readonly
          />
        </b-form-group>

        <validation-provider
          #default="{ errors }"
          name="Nomor kontak"
          rules="required|phone"
          vid="phone"
        >
          <b-form-group
            label="No Kontak (HP)"
            label-for="setting-phone"
            :state="errors.length > 0 ? false:null"
          >
            <b-form-input
              id="setting-phone"
              placeholder="Masukkan no kontak aktif"
              v-model="dataLocal.phone"
              :state="errors.length > 0 ? false:null"
              trim
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider
          #default="{ errors }"
          name="Kategori"
          rules="required"
          vid="category"
        >
          <b-form-group
            label="Kategori"
            label-for="setting-category"
            :state="errors.length > 0 ? false:null"
          >
            <v-select
              id="setting-category"
              v-model="dataLocal.categoryId"
              label="name"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="categoryOptions"
              :clearable="false"
              :reduce="option => option.id"
              :state="errors.length > 0 ? false:null"
              placeholder="Pilih kategori"
            />
            <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <div class="d-flex justify-content-end mt-3">
          <b-button
            @click="saveChanges"
            class="font-weight-bold w-25"
            variant="primary"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          >
            Simpan
          </b-button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { ref, onMounted, reactive } from '@vue/composition-api'
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { BButton, BFormGroup, BFormInput, BFormInvalidFeedback, BAvatar, BLink } from 'bootstrap-vue'
import { required, alphaSpaces, phone, email } from '@validations'
import { avatarText } from '@core/utils/filter'

import useProfile from '@/views/pages/profile/useProfile'

extend('image', value => {
  const imageType = value[0].type.split('/')[0]
  if (imageType === 'image') {
    return true
  }

  return `{_field_} Anda tidak valid`
})

export default {
  components: {
    BButton,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BAvatar,
    BLink,
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      avatarText,
      // validation
      required,
      alphaSpaces,
      phone,
      email,
    }
  },
  setup(props, context) {
    const {
      userData,
      categoryOptions,

      fetchUserCategories,
      updateDataProfile,
      successNotification,
      warningNotification,
    } = useProfile(props, context)

    const dataLocal = reactive({
      firstName: userData.value.first_name,
      lastName: userData.value.last_name,
      email: userData.value.email,
      phone: userData.value.profile.phone,
      categoryId: userData.value.profile.category ? userData.value.profile.category.id : null,
      photoURL: userData.value.photoURL,
    })

    const refProfileSettingForm = ref(null)
    const refInputPhotoForm = ref(null)
    const refInputPhotoProvider = ref(null)
    const inputPhoto = ref(null)
    const profilePhoto = ref(null)

    const saveChanges = () => {
      return new Promise((resolve, reject) => {
        refProfileSettingForm.value.validate().then(success => {
          if (success) {
            let formData = new FormData()
            formData.append('first_name', dataLocal.firstName)
            formData.append('last_name', dataLocal.lastName)
            formData.append('profile.phone', dataLocal.phone)
            formData.append('profile.category_id', dataLocal.categoryId)
            if (inputPhoto.value && inputPhoto.value.files.length) formData.append('profile.photo', inputPhoto.value.files[0])

            updateDataProfile(formData)
              .then(() => {
                resolve(successNotification('Profil Berhasil Diubah!'))
              })
              .catch(error => {
                const { data: errorData } = error.response
                if (statusCode === 400 && errorData && errorData.error) {
                  let validationErrors = { ...errorData.error['profile'] }
                  delete errorData.error['profile']

                  validationErrors = {
                    ...errorData.error,
                    ...validationErrors,
                  }

                  refProfileSettingForm.value.setErrors(validationErrors)
                } else {
                  reject(warningNotification('Maaf, terjadi kesalahan saat update data.'))
                }
              })
          }
        })
      })
    }

    const { inputImageRenderer } = useInputImageRenderer(inputPhoto, base64 => {
      const imageSize = inputPhoto.value.files[0].size / 1024

      if (imageSize > 500 ) {
        refInputPhotoForm.value.setErrors({ photo: `Ukuran file terlalu besar (${imageSize.toFixed(1)} KB). Max: 500KB` })
        return
      }

      profilePhoto.value = base64
    })
    const handleFileChange = e => {
      refInputPhotoProvider.value.validate(e)
    }

    onMounted(async () => {
      await fetchUserCategories()
      profilePhoto.value = dataLocal.photoURL
    })

    return {
      dataLocal,
      profilePhoto,
      categoryOptions,
      userData,

      refProfileSettingForm,
      refInputPhotoForm,
      refInputPhotoProvider,
      inputPhoto,
      inputImageRenderer,
      handleFileChange,

      saveChanges,
    }
  }
}
</script>

<style lang="scss">
#profile-setting-general {
  display: flex;
  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: center;
  }
}
</style>
