const UserRepository = require('../repositories/user')

class UserService {
  constructor() {
    this.userRepository = new UserRepository()
  }

  async #getUserBy(query, options) {
    const { lean = true, populate, select, sort } = options || {}

    return await this.userRepository.findOne({ query, lean, populate, select, sort })
  }

  async storeUser(data) {
    if (data?.constructor !== Object) throw Error('data must be an object')

    return await this.userRepository.storeData(data)
  }

  async getUserById(id, options) {
    if (!id) throw Error('id is required')

    return await this.#getUserBy({ _id: id }, options)
  }

  async getUserByEmail(email, options) {
    if (!email) throw Error('email is required')

    return await this.#getUserBy({ email }, { ...options, select: '+password' })
  }
}

module.exports = UserService
