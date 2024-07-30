import { $themeConfig } from '@themeConfig'
import navMenuItems from '@/navigation/vertical'
import landingNavMenuItems from '@/navigation/vertical-landing'
import { isUserAdmin, isUserLoggedIn } from '@/auth/utils'
import { useRouter } from '@core/utils/utils'
import useStore from '@/views/pages/store/useStore'

export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
    isMouseHovered: false,
    verticalNavMenuItems: [...navMenuItems],
    verticalLandingNavMenuItems: [...landingNavMenuItems],
  },
  getters: {
    navMenuItems: (state, getters, rootState, rootGetters) => {
      const { route } = useRouter()
      if (route.value.name === 'landing') {
        return state.verticalLandingNavMenuItems
      }

      const verticalNavMenuItems = [...state.verticalNavMenuItems]

      // Update 'Beranda' child menu items, based user subscriptions
      const productMenuItem = {
        1: {
          stroke: '#EC5B56',
          fill: '#EC5B56',
        },
        2: {
          stroke: '#F08C34',
          fill: '#F08C34',
        },
        3: {
          route: null,
          stroke: '#F8DD6C',
          fill: '#F8DD6C',
        },
        4: {
          route: null,
          stroke: '#48C5B5',
          fill: '#48C5B5',
        },
        5: {
          route: null,
          stroke: '#A9D0D5',
          fill: '#A9D0D5',
        },
        6: {
          route: null,
          stroke: '#7B55E6',
          fill: '#7B55E6',
        },
      }

      if (isUserLoggedIn()) {
        const {
          isValidStatus,
        } = useStore()

        const products = rootGetters['store/getProducts']()

        const children = []
        products.forEach(product => {
          if (product.subscription || isUserAdmin()) {
            if (!verticalNavMenuItems[0].children.find(item => item.id === product.id)) {
              const child = {
                ...productMenuItem[product.id],
                id: product.id,
                title: product.nickname || product.name,
                href: product.app_link,
                disabled: false,
                resource: 'Account',
                action: 'manage',
              }
              if (!isValidStatus(product.subscription)) {
                child.disabled = true
              }
              children.push(child)
            }
          }
        })
        verticalNavMenuItems[0].children = children
      }
      return verticalNavMenuItems
    },
  },
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      state.isVerticalMenuCollapsed = val
    },
    UPDATE_MOUSE_HOVERED(state, val) {
      state.isMouseHovered = val
    },
  },
}
