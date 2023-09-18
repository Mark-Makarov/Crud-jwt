import { ApiError } from '../error/ApiError.js'
import jwt from 'jsonwebtoken'

export function authMiddleware (req, res, next) {
  const token = req.cookies.accessToken
  if (!token) {
    return next(ApiError.unauthorized('unauthorized'))
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { login } = decoded
    req.body.login = login
    next()
  } catch (e) {
    return next(ApiError.unauthorized('unauthorized'))
  }
}
