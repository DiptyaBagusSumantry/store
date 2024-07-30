export default [
  {
    title: 'Profile',
    icon: 'BookOpenIcon',
    resource: 'Auth',
    action: 'read',
    children: [
      {
        title: 'Widya Analytic',
        resource: 'Auth',
        action: 'read',
        route: { name: 'about', hash: '#widya-analytic-section' },
      },
      {
        title: 'Portofolio',
        resource: 'Auth',
        action: 'read',
        route: { name: 'about', hash: '#portofolio-section' },
      },
      {
        title: 'Klien & Partner',
        resource: 'Auth',
        action: 'read',
        route: { name: 'about', hash: '#partner-section' },
      },
      {
        title: 'Sertifikat',
        resource: 'Auth',
        action: 'read',
        route: { name: 'about', hash: '#certificate-section' },
      },
      {
        title: 'Award',
        resource: 'Auth',
        action: 'read',
        route: { name: 'about', hash: '#reward-section' },
      },
    ],
  },
  {
    title: 'Karir',
    icon: 'BriefcaseIcon',
    resource: 'Auth',
    action: 'read',
    href: 'https://widyaanalytic.com/career/',
    target: '_blank',
  },
]
