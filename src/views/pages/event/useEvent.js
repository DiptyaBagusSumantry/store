import { ref, computed } from '@vue/composition-api'
import store from '@/store'
import useBlog from '../blog/useBlog'

export default function useEvent(props, context) {

  const currentBreakpoint = computed(() => store.getters['app/currentBreakPoint'])

  // Reactivty variable
  const posts = ref([])
  const postsInTotal = ref(0)
  const { mergeTwoArray } = useBlog(props, context)

  // Method to get all event from widya event and toba event
  const fetchAllPosts = (params) => {
    store.dispatch('widya-analytic-event/fetchAllPosts', params)
      .then(response => {
        posts.value =  mergeTwoArray(response[0], response[1])
        postsInTotal.value = posts.value.length
      })
  }
  // Method for fetch Widya Event from service
  const fetchWidyaEvents = async (params) => {
    try {
      const response = await store.dispatch('widya-analytic-event/fetchWidyaPostByCategory', params)
      posts.value = response.data
      handleResponseInFetchPosts(response)
    } catch (error) {}
  }

  // Method for fetch toba Event (like live course or toba talks)
  const fetchTobaEvents = async (params) => {
    try {
      const response = await store.dispatch('widya-analytic-event/fetchTobaPosts', params)
      posts.value = response.data
      handleResponseInFetchPosts(response)
    } catch (error) {}
  }
  // Method for know how many data
  const handleResponseInFetchPosts = (response) => {
    postsInTotal.value = response.headers['x-wp-total']
  }

  return {
    currentBreakpoint,
    posts,
    postsInTotal,
    fetchWidyaEvents,
    fetchTobaEvents,
    fetchAllPosts,
  }
}