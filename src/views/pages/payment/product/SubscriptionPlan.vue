<template>
  <b-container id="subscription-plan">
    <b-card
      no-body
      class="mb-0"
    >
      <div class="mx-0 mb-1 px-0 breadcrumb">
        <b-link
          class="d-flex flex-row align-items-center"
          :to="{ name: 'beranda' }"
        >
          <feather-icon
            icon="ArrowLeftIcon"
            size="15"
            class="mr-1"
            stroke="#5e646a"
          />
          <span>
            Kembali ke Beranda
          </span>
        </b-link>
      </div>
      <div v-if="productSubscriptionPlans.length > 0">
        <h3 class="font-weight-bolder page-title mb-4">
          Paket Langganan
        </h3>
        <b-form-group v-slot="{ ariaDescribedby }">
          <div class="d-flex flex-column flex-sm-row flex-wrap justify-content-center match-height container-subs-plan">
            <b-col
              v-if="userSubscriptionPlan && userSubscriptionPlan.id"
              class="p-0 mr-sm-3"
            >
              <subscription-plan-card
                class="owned-plan"
                type="owned"
                headerText="Paket Terkini Anda"
                :description="userSubscriptionPlan.description"
                :duration="userSubscriptionPlan.name"
                :status="userSubscription.status"
                :date="userSubscription.period_end"
                :priceFormer="userSubscriptionPlan.extra_data.price_before ? userSubscriptionPlan.extra_data.price_before : null"
                :priceLatest="userSubscriptionPlan.price"
                @cancelSubs="$refs.refConfirmModal.show()"
              />
            </b-col>
            <b-col
              v-for="(plan, idx) in productSubscriptionPlans.filter(plan => plan.price > 0)"
              :key="idx"
              class="p-0"
              @click="selectedSubsriptionPlan = plan"
            >
              <subscription-plan-card
                class="subs-plan"
                :description="plan.description"
                :duration="plan.name"
                :priceFormer="plan.extra_data.price_before ? plan.extra_data.price_before : null"
                :priceLatest="plan.price"
                :perks="plan.perks"
              >
                <template #selectPlan>
                  <div>
                    <b-form-radio
                      v-model="selectedSubsriptionPlan"
                      :aria-describedby="ariaDescribedby"
                      :name="`some-radios-${plan.id}`"
                      :value="plan"
                    >
                      <h3 class="font-weight-bolder mb-1 ml-1">
                        {{ plan.name }}
                      </h3>
                    </b-form-radio>
                  </div>
                </template>
              </subscription-plan-card>
            </b-col>
          </div>
        </b-form-group>
        <div class="text-center mt-2">
          <b-button
            variant="primary"
            :disabled="selectedSubsriptionPlan === null"
            :to="{
              name: 'payment-order-detail',
              params: {
                item: 'product',
                itemId: selectedSubsriptionPlan ? selectedSubsriptionPlan.id : null
              }
            }"
          >
            Langganan
          </b-button>
        </div>
      </div>
    </b-card>

    <b-modal
      ref="refConfirmModal"
      centered
      hide-footer
      header-bg-variant="white"
    >
      <div class="d-block text-center mb-3">
        <h3 class="font-weight-bolder text-dark mb-1">Berhenti Berlangganan?</h3>
        <span class="text-black">
          Anda akan berhenti berlangganan Paket {{ userSubscriptionPlan ? userSubscriptionPlan.name : '' }}
        </span>
      </div>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        class="mt-2"
        variant="primary"
        block
        @click="stopSubscription(productId)"
      >
        Hentikan Langganan
      </b-button>
    </b-modal>
  </b-container>
</template>

<script>
import { ref, onMounted, onUnmounted } from '@vue/composition-api'
import { BButton, BCard, BContainer, BFormGroup, BFormRadio, BLink, BCol } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import { useRouter } from '@core/utils/utils'

import subscriptionStoreModule from '@/views/pages/payment/product/subscriptionStoreModule'
import useSubscription from '@/views/pages/payment/product/useSubscription'

import SubscriptionPlanCard from './SubscriptionPlanCard.vue'

export default {
  components: {
    BButton,
    BCard,
    BContainer,
    BFormGroup,
    BFormRadio,
    BLink,
    BCol,

    SubscriptionPlanCard,
  },
  directives: {
    Ripple,
  },
  setup(props, context) {
    // Page url parameter
    const { route } = useRouter()
    const { productId } = route.value.params

    const selectedSubsriptionPlan = ref(null)
    const refConfirmModal = ref(null)
    const userSubscription = ref(getUserData().subscriptions.find(data => data.product.id == productId))

    const {
      userSubscriptionPlan,
      productSubscriptionPlans,
      fetchSubscriptionPlan,
      fetchProductSubscriptionPlans,
      deleteAndUpdateSubscriptions,
    } = useSubscription(props, context)

    const WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME = 'widya-analytic-subs-plans'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME, subscriptionStoreModule)

    onMounted(() => {
      fetchProductSubscriptionPlans(productId)
      if (userSubscription.value) fetchSubscriptionPlan(userSubscription.value.plan.id)
    })

    onUnmounted(() => {
      // UnRegister on leave
      if (store.hasModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_SUBS_PLANS_MODULE_NAME)
      // end UnRegister on leave
    })

    const stopSubscription = productId => {
      deleteAndUpdateSubscriptions(productId)
        .then(() => {
          userSubscription.value = getUserData().subscriptions.find(data => data.id == productId)
          refConfirmModal.value.hide()
        })
    }

    return {
      refConfirmModal,
      productId,
      userSubscription,
      userSubscriptionPlan,
      productSubscriptionPlans,
      selectedSubsriptionPlan,
      stopSubscription,
    }
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/base/pages/page-subscription-plan.scss";
</style>
