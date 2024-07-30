import { ref, computed } from '@vue/composition-api'
import store from '@/store'

export default function usePaymentHistory(props) {
  const tableColumnsTemplate = {
    eventTicket: [
      {
        key: 'event',
        label: 'Event',
        sortable: true,
        sortByFormatted: true,
        thStyle: { width: '30%' },
        formatter: val => `${val.name}`,
      },
      {
        key: 'eventDate',
        label: 'Tanggal Event',
        sortable: true,
        thStyle: { width: '20%' },
      },
      {
        key: 'eventPrice',
        label: 'total',
        sortable: true,
        thStyle: { width: '10%' },
      },
      {
        key: 'eventStatus',
        label: 'status',
        sortable: true,
        thStyle: { width: '5%' },
      },
      {
        key: 'eventActions',
        label: '',
        thStyle: { width: '5%' },
      },
    ],
    eventPayment: [
      {
        key: 'event',
        label: 'Event',
        sortable: true,
        sortByFormatted: true,
        thStyle: { width: '35%' },
        formatter: val => `${val.name}`,
      },
      {
        key: 'paymentExpiredAt',
        label: 'Jatuh Tempo',
        sortable: true,
        thStyle: { width: '20%' },
      },
      {
        key: 'settlementTime',
        label: 'Tanggal Pembayaran',
        sortable: true,
        thStyle: { width: '30%' },
      },
      {
        key: 'paymentPrice',
        label: 'total',
        sortable: true,
        thStyle: { width: '5%' },
      },
      {
        key: 'paymentStatus',
        label: 'status',
        sortable: true,
        thStyle: { width: '5%' },
      },
      {
        key: 'paymentActions',
        label: '',
        thStyle: { width: '5%' },
      },
    ],
    productPayment: [
      {
        key: 'product',
        label: 'Produk',
        sortable: true,
        sortByFormatted: true,
        thStyle: { width: '25%' },
        formatter: val => `${val.name}`,
      },
      {
        key: 'paymentExpiredAt',
        label: 'Jatuh Tempo',
        sortable: true,
        thStyle: { width: '20%' },
      },
      {
        key: 'settlementTime',
        label: 'Tanggal Pembayaran',
        sortable: true,
        thStyle: { width: '25%' },
      },
      {
        key: 'paymentPrice',
        label: 'total',
        sortable: true,
        thStyle: { width: '5%' },
      },
      {
        key: 'paymentStatus',
        label: 'status',
        sortable: true,
        thStyle: { width: '5%' },
      },
      {
        key: 'paymentActions',
        label: '',
        thStyle: { width: '5%' },
      },
    ],
  }

  const productImages = ['cb.svg', 'ct.svg', 'fl.svg', 'kr.svg', 'sna.svg', 'wao.svg', 'kr.svg']

  // Refs
  const tableColumns = ref([])

  /**
   * 'dataTable' variable is a variable that stores the load result data
   * that the user wants and let this variable be pure from endpoint content
   */
  const dataTable = ref(null)
  const perPage = ref(5)
  const pageOptions = ref([3, 5, 10])
  const currentPage = ref(1)
  const sortBy = ref('')
  const sortDesc = ref(false)

  /**
   * 'searchQuery' variable is a variable that holds the keywords entered by the user
   */
  const searchQuery = ref('')

  /**
   * Attention this comment, please! Why are you still using totalRows as variable?
   * because it help you to handle filter search and pagination
   */
  const totalRows = ref(1)

  // Computed
  const tableItems = computed(() => {
    let localData = dataTable.value
    if (searchQuery.value !== '') {
      localData = dataTable.value.filter(data => {
        const localItem = 'event' in data ? 'event' : 'product'
        return searchQuery.value.toLowerCase().split(' ').every(v => data[localItem].name.toLowerCase().includes(v))
      })

      // Trigger pagination to update the number of buttons/pages due to filtering
      totalRows.value = localData.length
      currentPage.value = 1
      return localData
    }

    return localData
  })
  const dataMeta = computed(() => {
    let from = currentPage.value * perPage.value
    if (currentPage.value === 1) {
      from = '1'
    } else if (from > totalRows.value) {
      from = totalRows.value
    }

    let to = currentPage.value * perPage.value + perPage.value
    if (to > totalRows.value) {
      to = totalRows.value
    } else if (currentPage.value === 1) {
      to = perPage.value
    }

    return {
      from,
      to,
      of: totalRows.value,
    }
  })

  // Methods
  const fetchEventPayments = () => new Promise((resolve, reject) => {
    store.dispatch('widya-analytic-payment-history/fetchEventPayments')
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
  const fetchProductPayments = () => new Promise((resolve, reject) => {
    store.dispatch('widya-analytic-payment-history/fetchProductPayments')
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })

  const formatDateTime = (value, month = 'long', locale = 'id') => {
    const dateTime = new Date(value)
    const dateOptions = { year: 'numeric', month, day: 'numeric' }
    const timeOptions = { hour: 'numeric', minute: 'numeric' }
    return `${dateTime.toLocaleString(locale, dateOptions)}, ${dateTime.toLocaleString(locale, timeOptions)} WIB`
  }

  const determineTable = async tableName => {
    tableColumns.value = tableColumnsTemplate[tableName]
    if (tableName === 'eventTicket') {
      const eventPayments = await fetchEventPayments()
      dataTable.value = eventPayments.filter(payment => payment.transaction_status === 'success')
      dataTable.value = dataTable.value.map(data => ({
        ...data,
        eventStatus: data.event,
        eventPrice: data.transaction_details.gross_amount,
        eventDate: `${data.event.start_date} ${data.event.start_time}`,

      }))
    } else if (tableName === 'eventPayment') {
      const eventPayments = await fetchEventPayments()
      dataTable.value = eventPayments.map(data => ({
        ...data,
        paymentExpiredAt: data.transaction_details.transaction_expired_at,
        settlementTime: data.transaction_details.settlement_time || data.transaction_details.transaction_time,
        paymentPrice: data.transaction_status === 'success' ? data.transaction_details.gross_amount : null,
        paymentStatus: data.transaction_status,
      }))
    } else if (tableName === 'productPayment') {
      const productPayments = await fetchProductPayments()
      dataTable.value = productPayments.map(data => ({
        ...data,
        paymentExpiredAt: data.transaction_details.transaction_expired_at,
        settlementTime: data.transaction_details.settlement_time || data.transaction_details.transaction_time,
        paymentPrice: data.transaction_status === 'success' ? data.transaction_details.gross_amount : null,
        paymentStatus: data.transaction_status,
      }))

      // Update user subscription local data
      store.dispatch('auth/updateUserData')
    }

    totalRows.value = dataTable.value.length
  }
  const updateTable = () => {
    determineTable(props.tableName)
  }

  // UI
  const resolveEventStatusVariantAndText = event => {
    const now = Date.now()
    const eventStart = new Date(`${event.start_date} ${event.start_time}`)
    const eventEnd = new Date(`${event.end_date} ${event.end_time}`)
    if (eventStart > now) return { text: 'Akan Datang', variant: 'light-warning' }
    if (eventEnd < now) return { text: 'Selesai', variant: 'light-primary' }
    return { text: 'Berlangsung', variant: 'light-success' }
  }
  const resolveStatusPaymentVariantAndText = status => {
    if (status === 'success') return { text: 'Sudah Bayar', variant: 'light-success' }
    if (status === 'pending') return { text: 'Menunggu Pembayaran', variant: 'light-purple' }
    if (status === 'failure') return { text: 'Dibatalkan', variant: 'light-danger' }
    return { text: 'Belum Bayar', variant: 'light-warning' }
  }
  return {
    productImages,
    currentPage,
    dataMeta,
    tableItems,
    perPage,
    pageOptions,
    tableColumns,
    totalRows,
    searchQuery,
    sortBy,
    sortDesc,
    determineTable,
    updateTable,
    resolveStatusPaymentVariantAndText,
    resolveEventStatusVariantAndText,
    formatDateTime,
  }
}
