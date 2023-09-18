import { ApiError } from '../error/ApiError.js'
import { validationResult } from 'express-validator'
import { userModel } from '../models/index.js'
import bcrypt from 'bcrypt'
import { setTokenCookies } from '../utils/setTokenCookies.js'

export async function loginController (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(ApiError.badRequest(errors))
  }

  const { login, password } = req.body

  const user = await userModel.findOne({ where: { login } })
  if (!user) {
    return next(ApiError.badRequest('incorrect login or password'))
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.get('password'))
  if (!isPasswordCorrect) {
    return next(ApiError.badRequest('incorrect login or password'))
  }

  setTokenCookies(res, login)

  return res.json({ message: 'success' })
}
