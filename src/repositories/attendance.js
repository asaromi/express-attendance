const Attendance = require('../models/attendance')

class AttendanceRepository {
  constructor() {
    this.attendance = Attendance
  }

  async createOrUpdate({ query, data }) {
    return await this.attendance.findOneAndUpdate(query, data, { upsert: true, new: true })
  }

  async find({ query, lean, populate, select, sort }) {
    return await this.attendance.find(query).lean(lean).populate(populate).select(select).sort(sort)
  }

  async countDocuments({ query }) {
    return await this.attendance.countDocuments(query)
  }
}

module.exports = AttendanceRepository
