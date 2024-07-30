<template>
  <li
    v-if="canViewVerticalNavMenuLink(item)"
    class="nav-item"
    :class="{
      'active': isActive,
      'disabled': item.disabled
    }"
  >
    <b-link
      v-bind="elProps"
      class="d-flex align-items-center"
      @click="clickHandler"
    >
      <feather-icon
        :fill="item.fill || 'none'"
        :stroke="item.stroke || '#93989B'"
        :icon="item.icon || 'CircleIcon'"
      />
      <span class="menu-title text-truncate">{{ t(item.title) }}</span>
      <b-badge
        v-if="item.tag"
        pill
        :variant="item.tagVariant || 'primary'"
        class="mr-1 ml-auto"
      >
        {{ item.tag }}
      </b-badge>
    </b-link>
    <b-modal
      id="feedback-modal"
      ref="refFeedbackModal"
      centered
      hide-footer
      header-bg-variant="white"
      no-close-on-backdrop
    >
      <feedback />
    </b-modal>
  </li>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api'
import { useRouter } from '@core/utils/utils'
import { useUtils as useAclUtils } from '@core/libs/acl'
import { BLink, BBadge } from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useVerticalNavMenuLink from '@core/layouts/layout-vertical/components/vertical-nav-menu/components/vertical-nav-menu-link/useVerticalNavMenuLink'
import mixinVerticalNavMenuLink from '@core/layouts/layout-vertical/components/vertical-nav-menu/components/vertical-nav-menu-link/mixinVerticalNavMenuLink'
import { isUserVerified } from '@/auth/utils'
import store from '@/store'

import Feedback from '@/views/pages/feedback/Feedback'

export default {
  components: {
    BLink,
    BBadge,
    Feedback,
  },
  mixins: [mixinVerticalNavMenuLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { isActive, linkProps, updateIsActive } = useVerticalNavMenuLink(props.item)
    const { t } = useI18nUtils()
    const { canViewVerticalNavMenuLink } = useAclUtils()
    const { route } = useRouter()

    const refFeedbackModal = ref(null)

    const elProps = computed(() => {
      if (props.item.title.toLowerCase() === 'feedback') return {}
      return linkProps.value
    })

    const clickHandler = () => {
      if (isUserVerified()) {
        if (props.item.title.toLowerCase() === 'feedback') refFeedbackModal.value.show()
      }
    }

    onMounted(() => {
      if (props.item.title.toLowerCase() === 'feedback' && route.value.query.feedback === 'active') {
        refFeedbackModal.value.show()
      }
    })

    return {
      isActive,
      updateIsActive,
      refFeedbackModal,

      // ACL
      canViewVerticalNavMenuLink,

      // i18n
      t,

      // custom
      elProps,
      clickHandler,
    }
  },

}
</script>
<style lang="scss">
#feedback-modal {
  .modal-content {
    max-width: 480px;
    .modal-body {
      padding: 1rem !important;
    }
  }
}
</style>
