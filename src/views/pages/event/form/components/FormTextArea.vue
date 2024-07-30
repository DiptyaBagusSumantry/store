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
        :rules="`${required ? 'required' : ''}|min:${minValue ? minValue : 0}|${maxValue ? `max:${maxValue}` : '' }`"
      >
        <b-form-group
          :label-for="`input-${questionId}`"
          :state="errors.length > 0 ? false:null"
        >
          <b-form-textarea
            :id="`input-${questionId}`"
            v-model="answer"
            class="input-form"
            placeholder="Jawabanmu"
            rows="3"
            :state="errors.length > 0 ? false:null"
            :required="required"
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
import { BCard, BFormGroup, BFormTextarea, BFormInvalidFeedback } from 'bootstrap-vue'
import { extend, ValidationProvider } from 'vee-validate'
import { required, min, max } from '@validations'

extend('required', {
  ...required,
  message: 'Pertanyaan ini wajib diisi'
})
extend('min', {
  ...min,
  message: `Minimal karakter {length}`
})
extend('max', {
  ...max,
  message: `Maksimal karakter {length}`
})

export default {
  props: {
    minValue: {
      type: Number,
      default: null,
    },
    maxValue: {
      type: Number,
      default: null,
    },
    rows: {
      type: Number,
      default: 3,
    },
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
  },
  data() {
    return {
      min,
      max
    }
  },
  components: {
    BCard,
    BFormGroup,
    BFormTextarea,
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
