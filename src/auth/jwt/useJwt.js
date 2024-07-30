import axios from '@axios'
import jwtConfig from './jwtConfig'
import JwtService from './jwtService'

function useJwt(axiosIns, jwtOverrideConfig) {
  const jwt = new JwtService(axiosIns, jwtOverrideConfig)

  return {
    jwt,
  }
}

const { jwt } = useJwt(axios, jwtConfig)
export default jwt
