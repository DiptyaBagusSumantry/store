import { isUserAdmin } from '@/auth/utils'

export default function useStore() {
  // UI
  /**
   * Return true if user subscription is valid
   * @param {Object} data Subscription data
   */
  const isValidStatus = data => {
    if (isUserAdmin()) return true
    if (!data.id || data.status === 'canceled' || data.status === 'ended') return false
    return true
  }

  return {
    // UI
    isValidStatus,
  }
}
