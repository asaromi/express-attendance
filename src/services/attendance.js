const AttendanceRepository = require('../repositories/attendance')

class AttendanceService {
  constructor() {
    this.attendanceRepository = new AttendanceRepository()
  }

  async storeAttendance(data) {
    if (data?.constructor !== Object) throw Error('data must be an object')

    return await this.attendanceRepository.storeData(data)
  }

  async getAttendancesByUserId(userId) {
    if (!userId) throw Error('userId is required')

    return await this.attendanceRepository.find({ userId })
  }
}

module.exports = AttendanceService
