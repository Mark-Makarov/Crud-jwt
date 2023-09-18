import { generateAccessToken, generateRefreshToken } from './generateToken.js'

export function setTokenCookies (res, login) {
  const accessToken = generateAccessToken(login)
  const refreshToken = generateRefreshToken(login)

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
  })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
  })
}
