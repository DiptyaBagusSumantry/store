<template>
  <div id="event-form">
    <div class="text-center mb-2">
      <b-img
        class="img-logo"
        :src="appLogoImage"
        width="122.79"
        alt="widya analytic logo"
      />
    </div>
    <div class="mx-auto event-form-content">
      <form-header
        :title="event.id ? event.name : ''"
        :content="event.description ? event.description : ''"
      />
      <div
        class="form"
        v-if="eventForm.questions"
      >
        <validation-observer
          ref="refEventForm"
          tag="form"
        >
          <component
            :is="resolveFormComponent(form)"
            v-for="form in eventForm.questions"
            :key="form.order"
            :questionId="form.id"
            :question="form.question"
            :required="form.rules.required"
            :rows="form.rules.rows ? form.rules.rows : 3"
            :minValue="form.rules.min ? form.rules.min : null"
            :maxValue="form.rules.max ? form.rules.max : null"
            :options="form.options ? form.options : []"
            @answer="answerForm"
          />
          <div class="text-right">
            <b-button
              variant="gradient-danger"
              @click="saveChanges"
            >
              Kirim jawaban
            </b-button>
          </div>
        </validation-observer>
      </div>
    </div>
    <div class="footer text-center">
      <span class="font-weight-bolder">
        Jangan pernah berikan informasi penting apapun kedalam form
      </span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from '@vue/composition-api'
import { BButton, BImg } from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import { $themeConfig } from '@themeConfig'
import { useRouter } from '@core/utils/utils'
import store from '@/store'

import FormHeader from './components/FormHeader.vue'

import FormCheckBox from './components/FormCheckBox.vue'
import FormDatePicker from './components/FormDatePicker.vue'
import FormInput from './components/FormInput.vue'
import FormRadio from './components/FormRadio.vue'
import FormSelect from './components/FormSelect.vue'
import FormTextArea from './components/FormTextArea.vue'
import FormTimePicker from './components/FormTimePicker.vue'

import eventFormStoreModule from '@/views/pages/event/form/eventFormStoreModule'
import useEventForm from '@/views/pages/event/form/useEventForm'

export default {
  components: {
    BButton,
    BImg,

    FormHeader,

    FormCheckBox,
    FormDatePicker,
    FormInput,
    FormRadio,
    FormSelect,
    FormTextArea,
    FormTimePicker,

    ValidationObserver,
  },
  setup(props, context) {
    const { appLogoImage } = $themeConfig.app
    const { route, router } = useRouter()
    const { eventId } = route.value.params

    const answers = ref({})

    const {
      event,
      eventForm,
      fetchEvent,
      fetchEventForm,
      answerEventForm,
    } = useEventForm(props, context)

    const WIDYA_ANALYTIC_EVENT_FORM_MODULE_NAME = 'widya-analytic-eventform'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_EVENT_FORM_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_EVENT_FORM_MODULE_NAME, eventFormStoreModule)

    onMounted(() => {
      fetchEvent(eventId)
      fetchEventForm(eventId)
    })

    const resolveFormComponent = input => {
      if (input.type === 'checkbox') return 'form-check-box'
      if (input.type === 'date') return 'form-date-picker'
      if (input.type === 'dropdown') return 'form-select'
      if (input.type === 'input') return 'form-input'
      if (input.type === 'radio') return 'form-radio'
      if (input.type === 'textarea') return 'form-text-area'
      if (input.type === 'time') return 'form-time-picker'
    }

    const answerForm = answer => {
      answers.value[answer.question_id] = {
        question_id: answer.question_id,
        answer: answer.answer
      }
    }

    const saveChanges = () => {
      return new Promise((resolve, reject) => {
        context.refs.refEventForm.validate().then(success => {
          if (success) {
            const payload = {
              answers: Object.values(answers.value)
            }
            answerEventForm(eventId, payload)
              .then(() => router.push({
                name: 'payment-order-detail',
                params: {
                  item: 'event',
                  itemId: eventId
                }
              }))
          }
        })
      })
    }

    return {
      appLogoImage,
      event,
      eventForm,
      answerForm,
      saveChanges,
      resolveFormComponent,
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/base/pages/page-event-form.scss';
</style>