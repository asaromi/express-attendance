class AuthError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthError'
  }

  get statusCode() {
    return 401
  }
}

module.exports = {
  AuthError
}
