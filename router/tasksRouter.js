import { Router } from 'express'
import { check } from 'express-validator'
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask
} from '../controllers/tasksController.js'

export const tasksRouter = Router()

const createTaskMiddleware = [
  check('title', 'incorrect title').notEmpty().isLength({ max: 100 }),
  check('description', 'incorrect description')
    .notEmpty()
    .isLength({ max: 200 })
]

const updateTaskMiddleware = [
  check('title', 'too long title').isLength({ max: 100 }),
  check('description', 'too long description').isLength({ max: 200 }),
  check('status', 'Incorrect status').optional().isIn(['', 'started', 'paused', 'completed'])
]

tasksRouter.get('/', getAllTasks)
tasksRouter.post('/', createTaskMiddleware, createTask)
tasksRouter.put('/:id', updateTaskMiddleware, updateTask)
tasksRouter.delete('/:id', deleteTask)
