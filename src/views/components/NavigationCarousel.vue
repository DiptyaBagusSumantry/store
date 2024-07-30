<template>
  <div class="VueCarousel-navigation">
    <button
      type="button"
      aria-label="Previous page"
      :tabindex="canAdvanceBackward ? 0 : -1"
      class="VueCarousel-navigation-button VueCarousel-navigation-prev p-1 mr-1"
      v-on:click.prevent="triggerPageAdvance('backward')"
      v-bind:class="{ 'VueCarousel-navigation--disabled': !canAdvanceBackward }"
    >
      <div class="nav-carl nav-carl-prev">
        <feather-icon
          icon="ArrowLeftCircleIcon"
          fill="white"
          stroke-width="1"
          stroke="#283138"
          size="60"
        />
      </div>
    </button>
    <button
      type="button"
      aria-label="Next page"
      :tabindex="canAdvanceForward ? 0 : -1"
      class="VueCarousel-navigation-button VueCarousel-navigation-next p-1 ml-1"
      v-on:click.prevent="triggerPageAdvance('forward')"
      v-bind:class="{ 'VueCarousel-navigation--disabled': !canAdvanceForward }"
    >
      <div class="nav-carl nav-carl-next">
        <feather-icon
          icon="ArrowRightCircleIcon"
          fill="white"
          stroke-width="1"
          stroke="#283138"
          size="60"
        />
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "navigation",
  inject: ["carousel"],
  computed: {
    /**
     * @return {Boolean} Can the slider move forward?
     */
    canAdvanceForward() {
      return this.carousel.canAdvanceForward || false;
    },
    /**
     * @return {Boolean} Can the slider move backward?
     */
    canAdvanceBackward() {
      return this.carousel.canAdvanceBackward || false;
    }
  },
  methods: {
    /**
     * Trigger page change on +/- 1 depending on the direction
     * @param {"backward"} [direction]
     * @return {void}
     */
    triggerPageAdvance(direction) {
      /**
       * @event paginationclick
       * @type {string}
       */
      this.$emit("navigationclick", direction);
    }
  }
};
</script>

<style scoped>
.VueCarousel-navigation-button {
  position: absolute;
  top: 50%;
  box-sizing: border-box;
  color: #000;
  text-decoration: none;
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  outline: none;
}

.VueCarousel-navigation-button:focus {
  outline: 1px solid lightblue;
}

.VueCarousel-navigation-next {
  right: 0;
  transform: translateY(-50%) translateX(100%);
  font-family: "system";
}

.VueCarousel-navigation-prev {
  left: 0;
  transform: translateY(-50%) translateX(-100%);
  font-family: "system";
}

.VueCarousel-navigation--disabled {
  /* not use opacity because when position backward == 0 left arrow navigation is not display and not opacity */
  /* opacity: 0.5; */
  display: none;
  cursor: default;
}

/* Define the "system" font family */
@font-face {
  font-family: system;
  font-style: normal;
  font-weight: 300;
  src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"),
    local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Symbol"),
    local("Roboto-Light"), local("DroidSans"), local("Tahoma");
}
</style>
