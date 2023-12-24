const AttendanceRepository = require('../repositories/attendance')

class AttendanceService {
  constructor() {
    this.attendanceRepository = new AttendanceRepository()
  }

  async storeAttendance(data) {
    if (data?.constructor !== Object) throw Error('data must be an object')

    return await this.attendanceRepository.storeData(data)
  }

  async getAttendancesByUserId(user_id, options) {
    if (!user_id) throw Error('user_id is required')

    const { sort, lean, populate, select } = options || {}
    return await this.attendanceRepository.find({ query: { user_id }, sort, lean, populate, select })
  }

  async countTodayAttendancesByUserId(user_id, type = 'in') {
    if (!user_id) throw Error('user_id is required')
    const date = new Date().toISOString().slice(0,10)

    return await this.attendanceRepository.countDocuments({ query: { user_id, date, type } })
  }
}

module.exports = AttendanceService
