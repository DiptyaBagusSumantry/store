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
        #default="{ errors, validate }"
        :rules="`${required ? 'required' : ''}`"
      >
        <b-form-group
          :label-for="`input-${questionId}`"
          :state="errors.length > 0 ? false:null"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio-group
            :id="`input-${questionId}`"
            v-model="answer"
            class="input-form"
            :options="options"
            :aria-describedby="ariaDescribedby"
            :required="required"
            @input="validate(answer, 'required')"
            stacked
          />
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
import { BCard, BFormGroup, BFormRadioGroup, BFormInvalidFeedback } from 'bootstrap-vue'
import { extend, ValidationProvider } from 'vee-validate'
import { required } from '@validations'

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
    BFormRadioGroup,
    BFormInvalidFeedback,

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
