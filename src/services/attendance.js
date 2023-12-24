const AttendanceRepository = require('../repositories/attendance')

class AttendanceService {
  constructor() {
    this.attendanceRepository = new AttendanceRepository()
  }

  async storeAttendance(data) {
    if (data?.constructor !== Object) throw Error('data must be an object')

    const { type, ip_address, location, ...payload } = data

    console.log('date before store attendance', data.date)
    if (type === 'in') {
      payload.time_in = { ip_address, location, timestamp: new Date() }
    } else if (type === 'out') {
      payload.time_out = { ip_address, location, timestamp: new Date() }
    } else {
      throw Error('type must be in or out')
    }

    const query = { date: payload.date, user_id: payload.user_id }
    return await this.attendanceRepository.createOrUpdate({ query, data: payload })
  }

  async getAttendancesByUserId(user_id, options) {
    if (!user_id) throw Error('user_id is required')

    const { sort, lean, populate, select } = options || {}
    return await this.attendanceRepository.find({ query: { user_id }, sort, lean, populate, select })
  }

  async countTodayAttendancesByUserId(user_id, type = 'in') {
    if (!user_id) throw Error('user_id is required')
    const date = this.todayDate()
    const time = type === 'in' ? 'time_in' : 'time_out'

    return await this.attendanceRepository.countDocuments({
      query: {
        user_id,
        date,
        [time]: { $ne: null }
      }
    })
  }

  todayDate(timezoneOffset = "+0700") {
    const date = new Date()
    console.log('before: ', date.toISOString())
    const hourOffset = parseInt(timezoneOffset.slice(0, 3))
    const minuteOffset = parseInt(timezoneOffset.slice(3)) * (hourOffset < 0 ? -1 : 1)

    date.setUTCHours(date.getUTCHours() + hourOffset)
    date.setUTCMinutes(date.getUTCMinutes() + minuteOffset)

    console.log('after: ', date.toISOString())
    return date.toISOString().slice(0, 10)
  }
}

module.exports = AttendanceService
