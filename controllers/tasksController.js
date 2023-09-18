import { validationResult } from 'express-validator'
import { ApiError } from '../error/ApiError.js'
import { taskModel, userModel } from '../models/index.js'

async function getAllTasks (req, res, next) {
  const { login } = req.body

  const { id: userId } = await userModel.findOne({ where: { login } })
  if (!userId) {
    return next(ApiError.badRequest('invalid token'))
  }

  const tasks = await taskModel.findAll({ where: { userId } })

  return res.json(tasks)
}

async function createTask (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(ApiError.badRequest(errors))
  }

  const { title, description, login } = req.body

  const { id: userId } = await userModel.findOne({ where: { login } })

  await taskModel.create({
    title,
    description,
    userId
  })

  return res.json({ message: 'success' })
}

async function updateTask (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(ApiError.badRequest(errors))
  }

  const { id: taskId } = req.params
  if (!taskId) {
    return next(ApiError.badRequest('missing task id'))
  }

  const { title, description, status } = req.body
  if (!title && !description && !status) {
    return next(ApiError.badRequest('missing properties for update'))
  }

  const task = await taskModel.findOne({ where: { id: taskId } })
  if (!task) {
    return next(ApiError.notFound('task not found'))
  }

  const { login } = req.body
  const { id: userId } = await userModel.findOne({ where: { login } })
  if (userId !== task.userId) {
    return next(ApiError.unauthorized('no permissions for update task'))
  }

  if (title) {
    task.title = title
  }

  if (description) {
    task.description = description
  }

  if (status) {
    task.status = status
  }

  await task.save()

  return res.json({ message: 'success' })
}

async function deleteTask (req, res, next) {
  const { id: taskId } = req.params
  if (!taskId) {
    return next(ApiError.badRequest('missing task id'))
  }

  const task = await taskModel.findOne({ where: { id: taskId } })
  if (!task) {
    return next(ApiError.notFound('task not found'))
  }

  const { login } = req.body
  const { id: userId } = await userModel.findOne({ where: { login } })
  if (userId !== task.userId) {
    return next(ApiError.unauthorized('no permissions for delete task'))
  }

  await task.destroy()

  return res.json({ message: 'success' })
}

export { getAllTasks, createTask, updateTask, deleteTask }
