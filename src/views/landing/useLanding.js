import axios from '@axios'
import { ref } from '@vue/composition-api'

export default function useLanding() {
  const videoIndex = ref({})
  const swiperSlides = ref({})

  const fetchSwiperSlides = async () => {
    const response = await axios.get('/landing/swiper/')
    swiperSlides.value = response.data.filter(item => item.is_show).map((item, index) => {
      if (item.slide.category === 'video') {
        videoIndex.value = index
      }

      return item.slide
    })
  }
  const formatDate = start => {
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
    }
    const splitedStartDate = new Date(start).toLocaleString('id', options).split(' ')

    return `${splitedStartDate[1]}, ${splitedStartDate[0]} ${splitedStartDate[2]}`
  }

  const formatTime = (start, end) => {
    const options = {
      hour: 'numeric', minute: 'numeric',
    }
    const startTime = new Date(start).toLocaleTimeString('id', options)
    const endTime = new Date(end).toLocaleTimeString('id', options)

    return `${startTime} - ${endTime} WIB`
  }

  return {
    videoIndex,
    swiperSlides,
    fetchSwiperSlides,
    formatDate,
    formatTime,
  }
}
