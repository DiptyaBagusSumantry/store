<template>
  <div
    class="client-card"
    v-click-outside="clickOutside"
  >
    <b-card
      class="m-0"
      no-body
    >
      <transition name="slide-fade">
        <div
          class="before-click w-100 h-100"
          v-show="!activated"
        >
          <div
            class="w-100 h-100 d-flex justify-content-center align-items-center">
            <b-img :src="data.img ? require(`@/assets/images/clients/${data.img}.png`) : ''" />
            <div class="w-100 h-100 overlay text-center">
              <div class="overlay-bg w-100 h-100" />
              <feather-icon
                icon="ChevronsDownIcon"
                size="40"
                stroke="#ffffff"
                stroke-width="1px"
                @click="activated = true"
              />
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div
          class="after-click w-100"
          v-show="activated"
        >
          <div class="client-header d-flex flex-column align-items-center">
            <b-img :src="data.img ? require(`@/assets/images/clients/${data.img}.png`) : ''" />
            <h5 class="font-weight-bolder text-primary text-center">
              {{ data.header ? data.header.title : '' }}
            </h5>
            <span class="text-center">
              {{ data.header ? data.header.duration : '' }}
            </span>
          </div>
          <hr>
          <div
            v-if="data.content"
            class="client-content"
          >
            <div
              v-for="(value, index) in data.content"
              :key="index"
              class="mb-2"
            >
              <p class="font-weight-bolder mb-0">
                {{ value.title }}
              </p>
              <span>
                {{ value.description }}
              </span>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <feather-icon
              icon="ChevronsUpIcon"
              size="40"
              stroke="#ffffff"
              stroke-width="1px"
              @click="activated = false"
            />
          </div>
        </div>
      </transition>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { ref } from '@vue/composition-api'
import { BCard, BImg } from 'bootstrap-vue'

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener("click", el.clickOutsideEvent)
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent)
  },
})

export default {
  components:{
    BCard,
    BImg,
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const activated = ref(false)
    const clickOutside = () => activated.value = false
    return {
      activated,
      clickOutside
    }
  }
}
</script>
