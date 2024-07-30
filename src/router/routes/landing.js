export default [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/landing/Landing.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/about/',
    name: 'about',
    component: () => import('@/views/pages/about/About.vue'),
    meta: {
      resource: 'Auth',
      action: 'read',
    },
  },
]
