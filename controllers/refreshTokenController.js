import jwt from 'jsonwebtoken'
import { ApiError } from '../error/ApiError.js'
import { generateAccessToken } from '../utils/generateToken.js'

export async function refreshTokenController (req, res, next) {
  const refreshToken = req.cookies.jwt
  if (!refreshToken) {
    return next(ApiError.unauthorized('Unauthorized'))
  }

  try {
    const decoded = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    const accessToken = generateAccessToken(decoded.login)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.json('success')
  } catch (err) {
    return next(ApiError.unauthorized('unauthorized'))
  }
}
