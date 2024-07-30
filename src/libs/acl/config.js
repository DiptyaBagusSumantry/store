export const initialAbility = [
  {
    action: 'read',
    subject: 'Auth',
  },
]

export const adminUserAbility = [
  {
    action: 'manage',
    subject: 'all',
  },
]

export const loggedInUserAbility = [
  {
    action: 'manage',
    subject: 'Account',
  },
  ...initialAbility,
]

export const verifiedUserAbility = [
  {
    action: 'manage',
    subject: 'Store',
  },
  ...loggedInUserAbility,
]

export const _ = undefined
