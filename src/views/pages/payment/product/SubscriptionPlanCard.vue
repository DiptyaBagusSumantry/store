<template>
  <b-card
    class="plan-card w-100"
    :class="[`page-${type}-${isValidStatus(status)}`]"
    :header-bg-variant="isValidStatus(status) ? 'primary' : 'danger'"
    header-tag="header"
  >
    <template
      v-if="type === 'owned'"
      #header
    >
      <h6 class="mx-auto my-0 text-white">{{ headerText }}</h6>
    </template>
    <div class="d-flex flex-column h-100 card-content">
      <div class="plan-label">
        <slot name="selectPlan">
          <h3 class="font-weight-bolder">
            {{ (type === 'owned' && !isValidStatus(status)) ? 'Paket Anda sudah habis' : duration }}
          </h3>
        </slot>
      </div>
      <div
        v-if="(type === 'owned' && isValidStatus(status)) || type !== 'owned'"
        class="price d-flex align-items-top"
      >
        <span
          v-if="priceFormer"
          class="price-former text-nowrap"
        >
          Rp {{ formatMoney(priceFormer) }}&nbsp;
        </span>
        <span class="price-latest text-nowrap font-weight-bolder">
          Rp {{ formatMoney(priceLatest) }}
        </span>
      </div>
      <div class="packet-description">
        <p
          class="text-black"
          v-html="(type === 'owned' && !isValidStatus(status)) ? expiredDesc : description"
        />
        <p v-if="type === 'owned' && !isValidStatus(status)">
          &nbsp;
          <feather-icon
            icon="ArrowRightIcon"
            width="20"
            height="20"
            stroke="#283138"
          />
        </p>
      </div>
      <div
        v-if="type !== 'owned'"
        class="packet-perks mt-1"
      >
        <span>Kamu bisa:</span>
        <ul style="list-style-type:none" class="pl-0 mt-50">
          <li v-for="(perk, index) in perks" :key="index" class="d-flex mb-25">
            <feather-icon icon="CheckSquareIcon" size="12" class="text-primary mt-25 mr-50" style="min-width:12px" />
            <span>{{ perk }}</span>
          </li>
        </ul>
      </div>
      <div
        v-if="type === 'owned' && isValidStatus(status)"
        class="packet-detail d-flex flex-column"
      >
        <span>
          {{ 'Paket Anda berlaku hingga' }}
        </span>
        <span class="date font-weight-bolder">
          {{ formatDate(date) }}
        </span>
      </div>
      <div
        v-if="type === 'owned' && isValidStatus(status)"
        class="packet-button text-center"
      >
        <b-button
          variant="outline-danger"
          size="sm"
          @click="cancelSubs"
        >
          Batalkan Langganan
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BButton, BCard } from 'bootstrap-vue'

export default {
  props: {
    priceFormer: {
      type: Number,
      default: null,
    },
    priceLatest: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'plan',
    },
    description: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
    headerText: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    perks: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    BButton,
    BCard,
  },
  setup(props, context) {
    const expiredDesc = ref('Berlangganan sekarang untuk tetap bisa menikmati layanan kami. Pilih paketnya di samping.')

    const cancelSubs = () => {
      context.emit('cancelSubs')
    }

    // UI
    const formatMoney = (value, options) => value.toLocaleString('id-ID', options)
    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('id-ID', options)
    }
    const isValidStatus = (status) => {
      if (status === 'canceled' || status === 'ended') return false
      return true
    }

    return {
      expiredDesc,

      cancelSubs,
      isValidStatus,
      formatDate,
      formatMoney,
    }
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/variables/_variables.scss";

.plan-card {
  .card-header {
    border-radius: 0px;
    text-align: center;
    padding: 5px;

    h6 {
      font-size: 12px;
      line-height: 150%;
    }
  }
  .card-body {
    .packet {
      &-description {
        span {
          font-size: 12px;
          line-height: 150%;
        }
      }
      &-detail {
        .date {
          color: $primary;
        }
      }
    }
    .price {
      &-former {
        font-size: 12px;
        line-height: 16px;
        text-decoration-line: line-through;
      }
      &-latest {
        color: $primary;
        font-size: 16px;
        line-height: 150%;
      }
    }
  }

  .packet-description {
    min-height: 120px;
  }
}
</style>
