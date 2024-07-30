import { ref, computed } from '@vue/composition-api'
import { captureMessage, withScope } from '@sentry/vue'
import store from '@/store'

export default function useBlog(props, context) {
  const posts = ref([])
  const postsInTotal = ref(null)

  const categories = ref([])
  const categoriesInRandom = ref([])

  const windowWidth = computed(() => store.state.app.windowWidth)
  const allCategories = computed(() => store.getters['widya-analytic-blog/getCategories'])

  // Other method
  const goToPageAll = ({ sourceCode, category, href }) => {
    if (href) {
      withScope(scope => {
        scope.setContext('blogPost', {
          address: href,
        })
        captureMessage('User has accessed post in blog', 'info')
        scope.clear()
      })
      window.open(href)
    } else context.root.$router.push({ name: 'blog-all', params: { sourceCode, category } })
  }
  const mergeTwoArray = (arr1, arr2) => {
    const merged = []
    let index1 = 0
    let index2 = 0
    let current = 0

    while (current < (arr1.length + arr2.length)) {
      const isArr1Depleted = index1 >= arr1.length
      const isArr2Depleted = index2 >= arr2.length
      if (!isArr1Depleted && (isArr2Depleted || (new Date(arr1[index1].date) > new Date(arr2[index2].date)))) {
        merged[current] = arr1[index1]
        index1 += 1
      } else {
        merged[current] = arr2[index2]
        index2 += 1
      }

      current += 1
    }

    return merged
  }

  // Method for posts
  const handleResponseInFetchPosts = response => {
    posts.value = response.data
    postsInTotal.value = response.headers['x-wp-total']
  }

  // Method for categories
  const handleResponseInFetchCategories = response => {
    categories.value = response
    categoriesInRandom.value = categories.value.slice(0, 7)
  }
  const shuffleCategories = () => {
    categoriesInRandom.value = categories.value.sort(() => Math.random() - 0.5).slice(0, 7)
  }
  const getCategoryById = id => {
    const category = categories.value.find(data => data.id === id)
    if (category) return category.name
    return ''
  }

  // Fetch posts
  const fetchAllPosts = params => {
    store.dispatch('widya-analytic-blog/fetchAllPosts', params)
      .then(response => {
        posts.value = mergeTwoArray(response[0], response[1])
        postsInTotal.value = posts.value.length
      })
  }
  const fetchTobaPosts = params => {
    store.dispatch('widya-analytic-blog/fetchTobaPosts', params)
      .then(response => {
        handleResponseInFetchPosts(response)
      })
  }
  const fetchWidyaPosts = params => {
    store.dispatch('widya-analytic-blog/fetchWidyaPosts', params)
      .then(response => {
        handleResponseInFetchPosts(response)
      })
  }

  // Fetch categories
  const fetchAllCategories = () => {
    store.dispatch('widya-analytic-blog/fetchAllCategories')
      .then(response => {
        handleResponseInFetchCategories(response)
      })
  }
  const fetchTobaCategories = () => {
    store.dispatch('widya-analytic-blog/fetchTobaCategories')
      .then(response => {
        handleResponseInFetchCategories(response.data)
      })
  }
  const fetchWidyaCategories = () => {
    store.dispatch('widya-analytic-blog/fetchWidyaCategories')
      .then(response => {
        handleResponseInFetchCategories(response.data)
      })
  }

  // Method for date
  const formatDate = date => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Des']
    const localDate = new Date(date).toLocaleDateString().split('/')
    return `${months[Number(localDate[0]) - 1]} ${localDate[1]}, ${localDate[2]}`
  }
  const getDateMinusNDay = val => {
    const date = new Date()
    date.setDate(date.getDate() - val)
    const dateToIso = date.toISOString()

    return dateToIso
  }

  return {
    posts,
    postsInTotal,

    categories,
    categoriesInRandom,
    allCategories,

    windowWidth,

    goToPageAll,
    getDateMinusNDay,
    getCategoryById,
    fetchAllCategories,
    fetchAllPosts,
    fetchTobaCategories,
    fetchTobaPosts,
    fetchWidyaCategories,
    fetchWidyaPosts,
    mergeTwoArray,
    shuffleCategories,
    formatDate,
  }
}
