import { ApiError } from '../error/ApiError.js'
import { validationResult } from 'express-validator'
import { userModel } from '../models/index.js'
import bcrypt from 'bcrypt'
import { setTokenCookies } from '../utils/setTokenCookies.js'

export async function registerController (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(ApiError.badRequest(errors))
  }

  const { login, password } = req.body

  const candidate = await userModel.findOne({ where: { login } })
  if (candidate) {
    return next(ApiError.badRequest('user already exist'))
  }

  const hashPassword = await bcrypt.hash(password, 5)
  await userModel.create({
    login,
    password: hashPassword
  })

  setTokenCookies(res, login)

  return res.json({ message: 'success' })
}
