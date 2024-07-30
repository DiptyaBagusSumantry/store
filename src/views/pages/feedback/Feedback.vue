<template>
  <div>
    <div
      v-if="!feedbackSent"
      class="feedback p-1 mx-auto"
    >
      <div class="mb-3">
        <h3 class="font-weight-bolder text-black text-center">
          Berikan feedback-mu untuk kami
        </h3>
      </div>
      <!-- form -->
      <validation-observer ref="refFeedbackForm">
        <b-form @submit.prevent="sendFeedback">
          <b-form-group class="mb-2">
            <validation-provider
              #default="{ errors }"
              vid="satisfaction"
            >
              <h4 class="font-weight-bolder text-black mb-1">
                Apa pendapatmu tentang halaman ini?
              </h4>
              <div class="d-flex justify-content-around emoticon">
                <div
                  v-for="(emoticon, idx) in emoticons"
                  :key="idx"
                  class="d-flex flex-column"
                >
                  <b-img
                    :src="require(`@/assets/images/icons/${selectedEmoticon === emoticon.iconSelected ? emoticon.iconSelected : emoticon.icon}.svg`)"
                    class="mb-1"
                    :alt="`${emoticon.iconSelected}-image`"
                    width="88"
                    @click="selectedEmoticon = emoticon.iconSelected"
                  />
                  <span class="text-center">
                    {{ emoticon.label }}
                  </span>
                </div>
              </div>
              <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
          <b-form-group class="mb-2">
            <validation-provider
              #default="{ errors }"
              vid="type"
            >
              <h4 class="font-weight-bolder text-black mb-50">
                Feedback apa yang ingin kamu sampaikan?
              </h4>
              <b-button
                v-for="(value, idx) in feedback"
                :key="idx"
                class="mr-1 my-50 ml-0"
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                :variant="selectedFeedback === value ? 'primary' : 'outline-secondary'"
                @click="selectedFeedback = value"
              >
                {{ value }}
              </b-button>
              <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
          <b-form-group class="mb-3">
            <validation-provider
              #default="{ errors }"
              vid="page"
            >
              <h4 class="font-weight-bolder text-black mb-1">
                Halaman apa yang ingin kamu beri feedback?
              </h4>
              <v-select
                v-model="selectedPage"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="pageOptions"
                :clearable="false"
              >
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <feather-icon
                      icon="ChevronDownIcon"
                      width="20"
                      height="20"
                      stroke="#000000"
                    />
                  </span>
                </template>
              </v-select>
              <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
          <b-form-group class="mb-3">
            <validation-provider
              #default="{ errors }"
              vid="message"
            >
              <h4 class="font-weight-bolder text-black mb-1">
                Ceritakan Pengalamanmu
              </h4>
              <b-form-textarea
                id="textarea"
                v-model="message"
                placeholder="Tuliskan semua perasaan, masalah, atau kritik dan saranmu"
                rows="3"
                max-rows="6"
                trim
              />
              <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
          <div class="mb-3 attachment">
            <div class="mb-2">
              <h4 class="font-weight-bolder text-black">
                Punya lampirannya? (opsional)
              </h4>
              <span>
                Upload foto atau bukti pendukung untuk membantu kami memahami masalahmu
              </span>
            </div>
            <div>
              <validation-observer
                v-if="!attachmentImg"
                ref="refInputPhotoForm"
              >
                <validation-provider
                  name="File"
                  vid="photo"
                  ref="inputPhotoProvider"
                  v-slot="{ errors }"
                >
                  <div
                    class="upload-img"
                    @click="$refs.refInputPhoto.click()"
                  >
                    <feather-icon
                      icon="CameraIcon"
                      width="70"
                      height="70"
                      stroke="#ffffff"
                      fill="#000000"
                    />
                    <input
                      ref="refInputPhoto"
                      type="file"
                      class="d-none"
                      @input="inputImageRenderer"
                    >
                  </div>
                  <b-form-invalid-feedback :state="errors.length > 0 ? false:null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </validation-observer>
              <b-avatar
                v-else
                rounded
                badge
                badge-top
                badge-offset="-0.5em"
                badge-variant="secondary"
                size="120"
                class="feedback-avatar"
                :src="attachmentImg"
              >
                <template #badge>
                  <feather-icon
                    icon="XIcon"
                    size="18"
                    @click="cancelImage"
                  />
                </template>
              </b-avatar>
            </div>
          </div>
          <b-button
            block
            type="submit"
            variant="gradient-primary"
            :disabled="invalid"
          >
            Kirim
          </b-button>
        </b-form>
      </validation-observer>
    </div>
    <feedback-notification v-else />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  BAvatar,
  BButton,
  BCard,
  BForm,
  BFormGroup,
  BFormInvalidFeedback,
  BFormTextarea,
  BImg,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'

import FeedbackNotification from '@/views/pages/feedback/FeedbackNotification'

export default {
  components: {
    BAvatar,
    BButton,
    BCard,
    BForm,
    BFormGroup,
    BFormInvalidFeedback,
    BFormTextarea,
    BImg,

    vSelect,
    ValidationProvider,
    ValidationObserver,

    FeedbackNotification,
  },
  directives: {
    Ripple,
  },
  computed: {
    invalid() {
      return this.selectedEmoticon === '' || this.selectedFeedback === '' || this.message === ''
    }
  },
  setup() {
    const refFeedbackForm = ref(null)
    const inputPhoto = ref(null)
    const refInputPhoto = ref(null)
    const refInputPhotoForm = ref(null)
    const attachmentImg = ref(null)
    const feedbackSent = ref(false)
    const message = ref('')
    const selectedPage = ref('Store')
    const selectedEmoticon = ref('')
    const selectedFeedback = ref('')

    // Consts
    const emoticons = [
      {
        icon: 'dissatisfied-false',
        iconSelected: 'dissatisfied',
        label: 'Kecewa',
        value: 'Kecewa',
      },
      {
        icon: 'normal-false',
        iconSelected: 'normal',
        label: 'Cukup',
        value: 'Cukup',
      },
      {
        icon: 'satisfied-false',
        iconSelected: 'satisfied',
        label: 'Puas',
        value: 'Puas',
      },
    ]
    const feedback = [
      'Kritik',
      'Saran',
      'Error',
      'Fitur',
    ]
    const pageOptions = [
      'Beranda',
      'Store',
      'Pembayaran',
      'Riwayat transaksi',
      'Beli paket/ berlangganan',
      'Form tiket',
      'Tutorial',
      'Tambah akun',
      'Pilih akun IG',
      'Aplikasiku',
      'Profil - Akunku',
      'FAQ',
      'Inovice',
      'CekBrand - Statistik',
      'CekBrand - Top Post',
      'CekBrand - Kompetitor',
      'Lainnya',
    ]

    const sendFeedback = () => {
      let formData = new FormData()
      formData.append('satisfaction', selectedEmoticon.value)
      formData.append('type', selectedFeedback.value)
      formData.append('page', selectedPage.value)
      formData.append('message', message.value)
      if (inputPhoto.value) formData.append('attachment', inputPhoto.value.files[0])
      axios
        .post('/feedback/', formData)
        .then(() => {
          feedbackSent.value = true
        })
        .catch(error => {
          const { data: errorData } = error.response
          if (errorData && errorData.error) {
            refFeedbackForm.value.setErrors(errorData.error)
            return
          }
        })
    }

    const { inputImageRenderer } = useInputImageRenderer(refInputPhoto, base64 => {
      const imageSize = refInputPhoto.value.files[0].size / 1024
      const imageType = refInputPhoto.value.files[0].type.split('/')[0]

      if (imageSize > 500 ) {
        refInputPhotoForm.value.setErrors({ photo: `Ukuran file terlalu besar (${imageSize.toFixed(1)} KB). Max: 500KB` })
        return
      }
      if (imageType !== 'image') {
        refInputPhotoForm.value.setErrors({ photo: 'Ekstensi file yang dimasukkan salah' })
        return
      }

      inputPhoto.value = refInputPhoto.value
      attachmentImg.value = base64
    })
    const cancelImage = () => {
      inputPhoto.value = null
      attachmentImg.value = null
    }

    return {
      refFeedbackForm,
      refInputPhotoForm,
      cancelImage,
      refInputPhoto,
      attachmentImg,
      inputImageRenderer,

      feedbackSent,

      message,
      selectedPage,
      selectedEmoticon,
      selectedFeedback,

      pageOptions,
      emoticons,
      feedback,
      sendFeedback,
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.feedback {
  max-height: 600px;
  overflow: auto;

  .mb-3 {
    margin-bottom: 2.5rem !important;
  }
  // Scrollbar

  /* width */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #ffffff;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e9eaeb;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }

  // End Scrollbar

  .feedback-avatar {
    .b-avatar-badge {
      cursor: pointer;
      font-size: initial !important;

      &:hover {
        font-size: large !important;
      }
    }
  }
  h4 {
    font-size: 16px;
  }
  .upload-img {
    cursor: pointer;
    width: min-content;

    .feather-camera {
      padding: 20px;
      background-color: #e9eaeb;
      border-radius: 8px;
    }
  }
  .emoticon {
    cursor: pointer;
  }
  .emoticon,
  .attachment {
    span {
      font-size: 12px;
    }
  }
  .v-select {
    min-width: 200px;
    width: max-content;
  }
}
</style>
