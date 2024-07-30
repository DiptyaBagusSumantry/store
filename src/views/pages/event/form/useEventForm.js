import { ref } from '@vue/composition-api'
import store from '@/store'

export default function useForm() {
  const event = ref({})
  const eventForm = ref({})

  const fetchEvent = eventId => {
    store.dispatch('widya-analytic-eventform/fetchEvent', eventId)
      .then(response => {
        event.value = response.data
      })
  }
  const fetchEventForm = eventId => {
    store.dispatch('widya-analytic-eventform/fetchEventForm', eventId)
      .then(response => {
        const { questions } = response.data
        questions.sort((first, second) => first.order - second.order)
        eventForm.value = {
          ...response.data,
          questions,
        }
      })
  }
  const answerEventForm = (eventId, payload) => new Promise((resolve, reject) => {
    store.dispatch('widya-analytic-eventform/answerEventForm', { eventId, payload })
      .then(() => resolve())
      .catch(() => reject())
  })

  return {
    event,
    eventForm,
    fetchEvent,
    fetchEventForm,
    answerEventForm,
  }
}
