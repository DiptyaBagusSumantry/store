export default [
  {
    title: 'Beranda',
    route: 'beranda',
    icon: 'HomeIcon',
    resource: 'Account',
    action: 'manage',
    children: [],
  },
  {
    title: 'Store',
    route: 'store',
    icon: 'ShoppingBagIcon',
    resource: 'Account',
    action: 'manage',
  },
  {
    title: 'Riwayat Pembelian',
    route: 'payment-history-event-ticket',
    icon: 'TagIcon',
    resource: 'Account',
    action: 'manage',
  },
  {
    title: 'Event',
    route: 'event',
    icon: 'CalendarIcon',
    resource: 'Auth',
    action: 'read',
  },
  {
    title: 'FAQ',
    route: 'faq',
    icon: 'HelpCircleIcon',
    resource: 'Auth',
    action: 'read',
  },
  {
    title: 'Blog & Artikel',
    route: 'blog',
    icon: 'BookOpenIcon',
    resource: 'Auth',
    action: 'read',
  },
  {
    title: 'Feedback',
    route: null,
    icon: 'MessageCircleIcon',
    resource: 'Account',
    action: 'manage',
  },
]
