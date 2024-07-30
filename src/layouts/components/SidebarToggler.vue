<template>
  <div
    class="sidebar-toggler bg-gradient-primary d-flex align-items-center justify-content-around"
    @click="toggleActivated"
    @mouseenter="isMouseHovered(true)"
    @mouseleave="isMouseHovered(false)"
  >
    <div class="text-center">
      <b-img
        :src="require('@/assets/images/logo/toba-no-text-white.svg')"
        width="24"
        alt="toba no text logo"
      />
      <p class="mb-0 text-white">
        menu
      </p>
    </div>
    <feather-icon
      icon="ChevronRightIcon"
      stroke="white"
      size="24"
    />
  </div>
</template>

<script>
import store from '@/store'
import { BImg } from 'bootstrap-vue'

export default({
  components: {
    BImg,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  setup (props) {
    const isMouseHovered = val => store.commit('verticalMenu/UPDATE_MOUSE_HOVERED', val)
    const toggleActivated = () => props.toggleVerticalMenuActive()

    return {
      isMouseHovered,
      toggleActivated,
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base/components/sidebar-toggler.scss';
</style>
