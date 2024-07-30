<template>
  <div>
    <div class="mb-1 mx-0 px-0 breadcrumb">
      <b-link
        class="d-flex flex-row align-items-center"
        :to="{ name: 'event' }"
      >
        <feather-icon
          icon="ArrowLeftIcon"
          size="15"
          class="mr-1"
        />
        <span>
          Kembali ke Event
        </span>
      </b-link>
    </div>
    <h3 class="mb-3 data-title">
      Detail Pemesanan
    </h3>
    <div class="d-flex flex-row mb-1">
      <div class="data-key d-flex justify-content-between">
        <span>
          Nama Event
        </span>
        <span>
          : &nbsp;
        </span>
      </div>
      <span class="font-weight-bolder">
        {{ data.name }}
      </span>
    </div>
    <div class="d-flex flex-row mb-1">
      <div class="data-key d-flex justify-content-between">
        <span>
          Lokasi
        </span>
        <span>
          : &nbsp;
        </span>
      </div>
      <span class="data-value">
        {{ data.venue }}
      </span>
    </div>
    <div class="d-flex flex-row mb-1">
      <div class="data-key d-flex justify-content-between">
        <span>
          Waktu
        </span>
        <span>
          : &nbsp;
        </span>
      </div>
      <div class="d-flex flex-column data-value">
        <span>
          {{ data.start_date }}
        </span>
        <span>
          {{ data.start_time }}
        </span>
      </div>
    </div>
    <div class="d-flex flex-row">
      <div class="data-key d-flex justify-content-between">
        <span>
          Pemateri
        </span>
        <span>
          : &nbsp;
        </span>
      </div>
      <span class="data-value">
        {{ data.speaker }}
      </span>
    </div>
  </div>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
