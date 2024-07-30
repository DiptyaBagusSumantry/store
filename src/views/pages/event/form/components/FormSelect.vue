<template>
  <div>
    <b-card>
      <template #header>
        <h4 class="mb-0 card-title">
          {{ question }}
          <span
            class="icon-required"
            v-if="required"
          >
            *
          </span>
        </h4>
      </template>
      <validation-provider
        #default="{ errors }"
        :rules="`${required ? 'required' : ''}`"
      >
        <b-form-group
          :label-for="`input-${questionId}`"
          :state="errors.length > 0 ? false:null"
        >
          <v-select
            :id="`input-${questionId}`"
            v-model="answer"
            label="name"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :clearable="false"
            :options="options"
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
            <div class="d-flex align-items-center">
              <feather-icon
                icon="AlertCircleIcon"
                width="13"
                height="13"
                stroke="#EA5455"
              />
              &nbsp;
              {{ errors[0] }}
            </div>
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
    </b-card>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import { BCard, BFormGroup, BFormInvalidFeedback } from 'bootstrap-vue'
import { extend, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'

extend('required', {
  ...required,
  message: 'Pertanyaan ini wajib diisi'
})

export default {
  props: {
    questionId: {
      type: String,
      default: null,
    },
    question: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    BCard,
    BFormGroup,
    BFormInvalidFeedback,

    vSelect,

    ValidationProvider,
  },
  setup(props, context) {
    const answer = ref(null)

    watch(answer, val => {
      context.emit('answer', {
        question_id: props.questionId,
        answer: val
      })
    })

    return {
      answer
    }
  }
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
