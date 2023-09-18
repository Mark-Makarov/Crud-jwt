export class ApiError extends Error {
  status () {
    throw new Error('Method not implemented.')
  }

  constructor (status, message) {
    super()
    this.status = status
    this.message = message
  }

  static badRequest (message) {
    return new ApiError(400, message)
  }

  static unauthorized (message) {
    return new ApiError(401, message)
  }

  static notFound (message) {
    return new ApiError(404, message)
  }

  static internal (message) {
    return new ApiError(500, message)
  }
}
