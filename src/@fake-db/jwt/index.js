import jwt from 'jsonwebtoken'
import mock from '@/@fake-db/mock'

const data = {
  users: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      password: 'admin',
      // eslint-disable-next-line global-require
      avatar: require('@/assets/images/avatars/13-small.png'),
      email: 'admin@demo.com',
      isAdmin: true,
      isVerified: true,
      // ability: [
      //   {
      //     action: 'manage',
      //     subject: 'all',
      //   },
      // ],
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'client',
      // eslint-disable-next-line global-require
      avatar: require('@/assets/images/avatars/1-small.png'),
      email: 'client@demo.com',
      isAdmin: false,
      isVerified: true,
      // ability: [
      //   {
      //     action: 'manage',
      //     subject: 'Account',
      //   },
      //   {
      //     action: 'manage',
      //     subject: 'Dashboard',
      //   },
      //   {
      //     action: 'read',
      //     subject: 'Auth',
      //   },
      // ],
    },
  ],
}

// ! These two secrets shall be in .env file and not in any other file
const jwtConfig = {
  secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
  refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
  expireTime: '10m',
  refreshTokenExpireTime: '10m',
}

mock.onPost('/jwt/login').reply(request => {
  const { email, password } = JSON.parse(request.data)

  let error = {
    email: ['Something went wrong'],
  }

  const user = data.users.find(u => u.email === email && u.password === password)

  if (user) {
    try {
      const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
      const refreshToken = jwt.sign({ id: user.id }, jwtConfig.refreshTokenSecret, {
        expiresIn: jwtConfig.refreshTokenExpireTime,
      })

      const userData = { ...user }

      delete userData.password

      const response = {
        userData,
        accessToken,
        refreshToken,
      }

      return [200, response]
    } catch (e) {
      error = e
    }
  } else {
    error = {
      email: ['Password dan email tidak cocok'],
      password: ['Password dan email tidak cocok'],
    }
  }

  return [400, { error }]
})

mock.onPost('/jwt/register').reply(request => {
  const {
    firstName, lastName, email, phone, category, password,
  } = JSON.parse(request.data)

  // If not any of data is missing return 400
  if (!(firstName && lastName && email && phone && category && password)) return [400]

  const isEmailAlreadyInUse = data.users.find(user => user.email === email)

  const error = {
    password: !password ? ['Please enter password'] : null,
    email: (() => {
      if (!email) return ['Please enter your email.']
      if (isEmailAlreadyInUse) return ['Alamat email sudah digunakan.']
      return null
    })(),
  }

  if (!error.password && !error.email) {
    const userData = {
      email,
      password,
      firstName,
      lastName,
      phone,
      category,
      avatar: null,
      isAdmin: false,
      isVerified: false,
      // ability: [
      //   {
      //     action: 'manage',
      //     subject: 'Account',
      //   },
      //   {
      //     action: 'read',
      //     subject: 'Auth',
      //   },
      // ],
    }

    // Add user id
    const { length } = data.users
    let lastIndex = 0
    if (length) {
      lastIndex = data.users[length - 1].id
    }
    userData.id = lastIndex + 1

    data.users.push(userData)

    const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })

    const user = { ...userData }
    delete user.password
    const response = {
      userData: user,
      accessToken,
    }

    return [200, response]
  }
  return [400, { error }]
})

mock.onPost('/jwt/refresh-token').reply(request => {
  const { refreshToken } = JSON.parse(request.data)

  try {
    const { id } = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret)

    const userData = { ...data.users.find(user => user.id === id) }

    const newAccessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
    const newRefreshToken = jwt.sign({ id: userData.id }, jwtConfig.refreshTokenSecret, {
      expiresIn: jwtConfig.refreshTokenExpireTime,
    })

    delete userData.password
    const response = {
      userData,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }

    return [200, response]
  } catch (e) {
    const error = 'Invalid refresh token'
    return [401, { error }]
  }
})
