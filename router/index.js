import { Router } from 'express'
import { check } from 'express-validator'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { loginController } from '../controllers/loginController.js'
import { registerController } from '../controllers/registerController.js'
import { refreshTokenController } from '../controllers/refreshTokenController.js'
import { tasksRouter } from './tasksRouter.js'

export const router = Router()

const userFieldsMiddleware = [
  check('login', 'login incorrect').notEmpty().isLength({ max: 10 }),
  check('password', 'pass incorrect').notEmpty().isLength({ max: 10 })
]

router.post('/login', userFieldsMiddleware, loginController)
router.post('/register', userFieldsMiddleware, registerController)
router.post('/refresh-token', authMiddleware, refreshTokenController)

router.use('/tasks', authMiddleware, tasksRouter)
