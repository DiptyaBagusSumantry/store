import { ref, computed } from '@vue/composition-api'
import { getUserData, updateUserData } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'
import store from '@/store'
import { useRouter } from '@core/utils/utils'
import Swal from 'sweetalert2'

import successIcon from '@/assets/images/icons/success.svg'

export default function useProfile() {
  const toast = useToast()

  const { router } = useRouter()

  const categoryOptions = ref([])
  const userData = computed(() => getUserData())

  const fetchUserCategories = () => new Promise((resolve, reject) => store
    .dispatch('widya-analytic-profile/fetchUserCategories')
    .then(response => {
      categoryOptions.value = response.data
      resolve(response)
    })
    .catch(error => reject(error)))

  const updatePassword = payload => store
    .dispatch('widya-analytic-profile/updatePassword', payload)

  const updateDataProfile = payload => new Promise((resolve, reject) => store
    .dispatch('widya-analytic-profile/updateDataProfile', payload)
    .then(response => {
      resolve(updateUserData(response.data))
    })
    .catch(error => reject(error)))

  const warningNotification = text => {
    toast({
      component: ToastificationContent,
      props: {
        title: 'Notifikasi',
        icon: 'BellIcon',
        text,
        variant: 'danger',
      },
    })
  }
  const successNotification = title => {
    Swal.fire({
      title: `<h3 class="font-weight-bolder text-black">${title}</h3>`,
      iconHtml: `<img src="${successIcon}">`,
      width: '443px',
      confirmButtonText: 'Ok',
      customClass: {
        container: 'swal2-profile-setting',
        confirmButton: 'btn btn-primary btn-confirm',
      },
      buttonsStyling: false,
    }).then(() => {
      // Refresh window
      router.go(0)
    })
  }

  return {
    categoryOptions,
    userData,

    fetchUserCategories,
    updatePassword,
    updateDataProfile,
    successNotification,
    warningNotification,
  }
}
