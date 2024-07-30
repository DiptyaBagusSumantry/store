<template>
  <div class="join-community">
    <div class="d-flex flex-row justify-content-between align-items-center flex-wrap">
      <div
        class="d-flex flex-column justify-content-between modal-community"
        :class="{
          'order-2': windowWidth < 862
        }"
      >
        <div class="mb-2">
          <h3 class="text-black">
            Gabung Komunitas
          </h3>
          <span class="font-weight-bold">
            Tetap terhubung dengan kami di grup dan media sosial, di bawah ini:
          </span>
        </div>
        <div class="mb-2">
          <b-row>
            <b-col
              cols="5"
              class="text-black font-weight-bold"
            >
              CP
            </b-col>
            <b-col class="text-black font-weight-bold">
              : 0851 6151 3887
            </b-col>
          </b-row>
          <b-row>
            <b-col
              cols="5"
              class="text-black font-weight-bold"
            >
              WhatsApp
            </b-col>
            <b-col class="text-black font-weight-bold">
              :
              <b-link
                href="https://bit.ly/INFOANALYTIC"
                target="_blank"
              >
                https://bit.ly/INFOANALYTIC
              </b-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              cols="5"
              class="text-black font-weight-bold"
            >
              Telegram (Group)
            </b-col>
            <b-col class="text-black font-weight-bold">
              :
              <b-link
                href="https://bit.ly/GRUPTOBAAI"
                target="_blank"
              >
                https://bit.ly/GRUPTOBAAI
              </b-link>
            </b-col>
          </b-row>
        </div>
        <div class="d-flex flex-column">
          <span class="text-black font-weight-bold">
            Jangan lupa follow dan aktifkan notifikasi
          </span>
          <b-link
            class="text-black font-weight-bold"
            href="https://www.instagram.com/toba.ai/"
            target="_blank"
          >
            https://www.instagram.com/toba.ai/
          </b-link>
          <b-link
            class="text-black font-weight-bold"
            href="https://www.instagram.com/widya.analytic/"
            target="_blank"
          >
            https://www.instagram.com/widya.analytic/
          </b-link>
        </div>
      </div>
      <b-img
        class="pr-2"
        :class="{
          'order-1': windowWidth < 862
        }"
        :src="require('@/assets/images/pages/join-community.svg')"
        alt="join-community"
        width="431"
        height="314"
      />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { BCol, BImg, BLink, BRow } from 'bootstrap-vue'
import store from '@/store'

export default {
  components: {
    BCol,
    BImg,
    BLink,
    BRow,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const windowWidth = computed(() => store.state.app.windowWidth)

    return {
      windowWidth,
    }
  }
}
</script>