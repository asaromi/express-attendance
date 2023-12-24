const { successResponse, errorResponse } = require('../libs/response')
const { getLocation } = require('../libs/ipApi')
const AttendanceService = require('../services/attendance')

const attendanceService = new AttendanceService()

const getMyAttendances = async (req, res) => {
  try {
    const { _id: user_id } = req.user
    const attendances = await attendanceService.getAttendancesByUserId(user_id, { sort: { createdAt: -1 } })

    return successResponse({ res, result: attendances })
  } catch (error) {
    return errorResponse({ error, res })
  }
}

const postAttendance = async (req, res) => {
  try {
    const { _id: user_id } = req.user
    const { body: {ip_address}, params: {type} } = req

    if (!ip_address) return errorResponse({ res, message: 'IP address is required', statusCode: 400 })

    const [location, countAttendance] = await Promise.all([
      getLocation(ip_address),
      attendanceService.countTodayAttendancesByUserId(user_id, type)
    ])

    if (countAttendance > 0) {
      const error = new Error(`You have already checked ${type} today`)
      error.statusCode = 400

      throw error
    }

    const date = attendanceService.todayDate(location.utc_offset)
    const attendance = await attendanceService.storeAttendance({
      date,
      type,
      user_id,
      ip_address,
      location
    })

    return successResponse({ res, result: attendance })
  } catch (error) {
    return errorResponse({ error, res })
  }
}

module.exports = { getMyAttendances, postAttendance }
