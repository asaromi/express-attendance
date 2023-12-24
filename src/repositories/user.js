const User = require('../models/user')

class UserRepository {
  constructor() {
    this.user = User
  }

  async storeData(data) {
    return await this.user.create(data)
  }

  async findOne({ query, lean, populate, select, sort }) {
    return await this.user.findOne(query).lean(lean).populate(populate).select(select).sort(sort)
  }
}

module.exports = UserRepository
