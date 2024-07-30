<template>
  <b-container id="profile-setting">
    <b-card
      no-body
      class="mb-0"
    >
      <div class="profile-setting-content">
        <div>
          <h2 class="text-primary font-weight-bolder">
            Akun Saya
          </h2>
        </div>

        <div class="profile-setting-tabs">
          <b-card
            no-body
            class="mb-0"
          >
            <b-tabs
              pills
              card
              :vertical="(windowWidth > themeBreakpoints.xl)"
            >
              <b-tab
                title="Edit Profil"
                lazy
                active
              >
                <profile-setting-general />
              </b-tab>
              <b-tab
                title="Password"
                lazy
                class="p-0"
              >
                <profile-setting-password />
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { computed, onUnmounted } from '@vue/composition-api'
import { $themeBreakpoints } from '@themeConfig'
import { BCard, BContainer, BTab, BTabs } from 'bootstrap-vue'
import store from '@/store'

import ProfileSettingGeneral from './ProfileSettingGeneral'
import ProfileSettingPassword from './ProfileSettingPassword'

import profileStoreModule from '@/views/pages/profile/profileStoreModule'

export default {
  components: {
    BCard,
    BContainer,
    BTab,
    BTabs,

    ProfileSettingGeneral,
    ProfileSettingPassword,
  },
  directives: {
    Ripple,
  },
  setup(props, context) {
    const windowWidth = computed(() => store.state.app.windowWidth)
    const themeBreakpoints = computed(() => $themeBreakpoints)

    const WIDYA_ANALYTIC_PROFILE_MODULE_NAME = 'widya-analytic-profile'

    // Register module
    if (!store.hasModule(WIDYA_ANALYTIC_PROFILE_MODULE_NAME)) store.registerModule(WIDYA_ANALYTIC_PROFILE_MODULE_NAME, profileStoreModule)

    onUnmounted(() => {
      // UnRegister on leave
      if (store.hasModule(WIDYA_ANALYTIC_PROFILE_MODULE_NAME)) store.unregisterModule(WIDYA_ANALYTIC_PROFILE_MODULE_NAME)
      // end UnRegister on leave
    })

    return {
      windowWidth,
      themeBreakpoints
    }
  }
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/base/bootstrap-extended/include';
@import '@/assets/scss/base/pages/page-profile.scss';

.swal2-profile-setting {
  .swal2-popup {
    &.swal2-modal {
      height: 314px;

    & .swal2-actions {
      .btn-confirm {
        width: 94px;
      }
    }
    & .swal2-icon {
      margin: 50px auto 50px;
    }
    }
  }
}
#profile-setting {
  .profile-setting-content {
    padding: 2.9rem 4rem;

    @include media-breakpoint-down(sm) {
      padding: 1.5rem;
    }
  }
}
</style>
