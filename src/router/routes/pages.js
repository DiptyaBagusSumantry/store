export default [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/sso/login',
    alias: '/sso',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Authentication.vue'),
    props: { activeTab: 0 },
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/sso/register',
    name: 'auth-register',
    component: () => import('@/views/pages/authentication/Authentication.vue'),
    props: { activeTab: 1 },
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/sso/logout',
    name: 'auth-logout',
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/sso/facebook/callback',
    name: 'auth-facebook-callback',
    component: () => import('@/views/pages/authentication/AuthenticationFacebookCallback.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/sso/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/pages/authentication/ForgotPassword.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/sso/forgot-password/:email/success',
    name: 'auth-forgot-password-success',
    component: () => import('@/views/pages/authentication/ForgotPasswordSuccess.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/sso/reset-password/:key/:token',
    name: 'auth-reset-password',
    component: () => import('@/views/pages/authentication/ResetPassword.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/sso/reset-password/success',
    name: 'auth-reset-password-success',
    component: () => import('@/views/pages/authentication/ResetPasswordSuccess.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@/views/pages/store/Store.vue'),
    meta: {
      resource: 'Store',
    },
  },
  {
    path: '/store/beranda',
    name: 'beranda',
    component: () => import('@/views/pages/Beranda.vue'),
    meta: {
      resource: 'Store',
    },
  },
  {
    path: '/store/account-verification',
    component: () => import('@/views/pages/account-verification/AccountVerification.vue'),
    children: [
      {
        path: '',
        name: 'account-verification',
        component: () => import('@/views/pages/account-verification/AccountVerificationInfo.vue'),
        meta: {
          resource: 'Account',
          redirectIfVerified: true,
        },
      },
      {
        path: 'alternative',
        name: 'account-verification-alternative',
        component: () => import('@/views/pages/account-verification/AccountVerificationAlternative.vue'),
        meta: {
          resource: 'Account',
          redirectIfVerified: true,
        },
      },
      {
        path: 'link-expired',
        name: 'account-verification-link-expired',
        component: () => import('@/views/pages/account-verification/AccountVerificationLinkExpired.vue'),
        meta: {
          resource: 'Account',
          redirectIfVerified: true,
        },
      },
      {
        path: 'confirm-email/:key',
        name: 'account-verification-confirm-email',
        component: () => import('@/views/pages/account-verification/AccountVerificationConfirmEmail.vue'),
        meta: {
          resource: 'Account',
          redirectIfVerified: true,
        },
      },
    ],
  },
  {
    path: '/store/faq',
    name: 'faq',
    component: () => import('@/views/pages/faq/FAQ.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/store/blog',
    name: 'blog',
    component: () => import('@/views/pages/blog/Blog.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/store/blog/:sourceCode/:category',
    name: 'blog-all',
    component: () => import('@/views/pages/blog/BlogAll.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/store/event',
    name: 'event',
    component: () => import('@/views/pages/event/Event.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/store/event/:category',
    name: 'event-all',
    component: () => import('@/views/pages/event/EventAll.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/store/event-form/:eventId',
    name: 'event-form',
    component: () => import('@/views/pages/event/form/EventForm.vue'),
    meta: {
      layout: 'full',
      resource: 'Account',
    },
  },
  {
    path: '/store/profile',
    name: 'profile-setting',
    component: () => import('@/views/pages/profile/ProfileSetting.vue'),
    meta: {
      resource: 'Store',
    },
  },
  {
    path: '/store/product/:productId/subscription-plan',
    name: 'product-subscription-plan',
    component: () => import('@/views/pages/payment/product/SubscriptionPlan.vue'),
    meta: {
      resource: 'Account',
    },
  },
  {
    path: '/store/payment/:paymentId/e-ticket/:page',
    name: 'payment-e-ticket',
    component: () => import('@/views/pages/payment/eticket/ETicket.vue'),
    meta: {
      layout: 'full',
      resource: 'Store',
    },
  },
  {
    path: '/store/payment/:paymentId/invoice/:item/:itemId',
    name: 'payment-invoice',
    component: () => import('@/views/pages/payment/invoice/Invoice.vue'),
    meta: {
      resource: 'Store',
    },
  },
  {
    path: '/store/payment/:paymentId/invoice/:item/:itemId/download',
    name: 'payment-invoice-download',
    component: () => import('@/views/pages/payment/invoice/InvoicePDF.vue'),
    meta: {
      layout: 'full',
      resource: 'Store',
    },
  },
  {
    path: '/store/payment/:paymentId/success/:item/:itemId',
    name: 'payment-success',
    component: () => import('@/views/pages/payment/PaymentSuccess.vue'),
    meta: {
      resource: 'Store',
    },
  },
  {
    path: '/store/payment/:paymentId/failed/:item/:itemId',
    name: 'payment-failed',
    component: () => import('@/views/pages/payment/PaymentFailed.vue'),
    meta: {
      resource: 'Store',
    },
  },
  {
    path: '/store/payment/:paymentId?/order-detail/:item/:itemId',
    name: 'payment-order-detail',
    component: () => import('@/views/pages/payment/order-detail/OrderDetail.vue'),
    meta: {
      resource: 'Account',
    },
  },
  {
    path: '/store/payment/history',
    name: 'payment-history',
    redirect: { name: 'payment-history-event-ticket' },
  },
  {
    path: '/store/payment/history/event',
    name: 'payment-history-event',
    component: () => import('@/views/pages/payment/PaymentHistory.vue'),
    props: { activeTab: 0, activeSubTab: 1 },
    meta: {
      resource: 'Store',
      action: 'manage',
    },
  },
  {
    path: '/store/payment/history/event/ticket',
    name: 'payment-history-event-ticket',
    component: () => import('@/views/pages/payment/PaymentHistory.vue'),
    props: { activeTab: 0, activeSubTab: 0 },
    meta: {
      resource: 'Store',
      action: 'manage',
    },
  },
  {
    path: '/store/payment/history/product',
    name: 'payment-history-product',
    component: () => import('@/views/pages/payment/PaymentHistory.vue'),
    props: { activeTab: 1 },
    meta: {
      resource: 'Store',
      action: 'manage',
    },
  },
]
