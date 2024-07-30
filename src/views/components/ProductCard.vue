<template>
  <div
    v-if="data.id"
    :class="`product-card bg-${data.bgColor}`"
  >
    <b-card
      overlay
      :img-src="require(`@/assets/images/products/${data.image}.svg`)"
      img-alt="Image"
    >
      <div class="card-title d-flex align-items-center">
        <h3 class="font-weight-bolder text-white">
          {{ data.name }}
        </h3>
      </div>
      <div class="card-content d-flex flex-column justify-content-between">
        <b-card-text>
          <span v-html="data.description" />&nbsp;
          <b-link
            v-if="data.landing_link || data.app_link"
            :href="data.landing_link || data.app_link"
            target="_blank"
          >
            Selengkapnya
          </b-link>
          <b-link
            v-else
            to="error-404"
            target="_blank"
          >
            Selengkapnya
          </b-link>
        </b-card-text>
        <div>
          <div class="d-flex justify-content-between">
            <b-button
              v-if="data.subscription || isAdmin"
              class="btn-fill"
              :disabled="data.disabled || !isValidStatus(data.subscription)"
              :href="data.app_link"
            >
              Buka App
            </b-button>
            <b-button
              v-else
              class="btn-fill"
              :disabled="data.disabled"
              @click="showConfirm({
                id: data.id,
                group: 'trial',
                name: data.name,
              })"
            >
              Coba Gratis
            </b-button>

            <b-button
              class="btn-outline px-0"
              :to="{ name: 'product-subscription-plan', params: { productId: data.id } }"
              :disabled="data.disabled"
            >
              Berlangganan
            </b-button>
          </div>
          <div class="active-period mt-50">
            <span v-if="data.subscription && isValidStatus(data.subscription)">
              Aktif Periode : {{ new Date(data.subscription.period_end).toLocaleDateString('id', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              <span v-if="data.subscription.group && data.subscription.group.name === 'trial'">
                (Free Trial)
              </span>
            </span>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import { BButton, BCard, BCardText, BLink } from 'bootstrap-vue'
import { isUserAdmin } from '@/auth/utils'
import { useRouter } from '@core/utils/utils'
import useStore from '@/views/pages/store/useStore'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    }
  },
  components: {
    BButton,
    BCard,
    BCardText,
    BLink,
  },
  computed: {
    isAdmin() {
      return isUserAdmin()
    },
  },
  setup(props, { emit }) {
    const {
      isValidStatus,
    } = useStore()

    const showConfirm = val => {
      setTimeout(() => {
        emit('showConfirm', val)
      }, 1000)
    }

    const { route } = useRouter()

    onMounted(() => {
      if (props.data.name.toLowerCase().replace(/ /g, '') === route.value.query.product) {
        if (!props.data.subscription && !props.data.disabled) {
          showConfirm({
            id: props.data.id,
            group: 'trial',
            name: props.data.name,
          })
        } else if (isValidStatus(props.data.subscription)) {
          window.location.replace(props.data.app_link)
        }
      }
    })

    return {
      isValidStatus,
      showConfirm,
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/base/components/product';
</style>
