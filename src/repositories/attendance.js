const Attendance = require('../models/attendance')

class AttendanceRepository {
  constructor() {
    this.attendance = Attendance
  }

  async storeData(data) {
    return await this.attendance.create(data)
  }

  async find({ query, lean, populate, select, sort }) {
    return await this.attendance.find(query).lean(lean).populate(populate).select(select).sort(sort)
  }
}

module.exports = AttendanceRepository
