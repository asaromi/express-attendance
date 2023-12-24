const { successResponse, errorResponse } = require('../libs/response')
const { getLocation } = require('../libs/ipApi')
const AttendanceService = require('../services/attendance')

const attendanceService = new AttendanceService()

const getMyAttendances = async (req, res) => {
  try {
    const { _id: user_id } = req.user
    const attendances = await attendanceService.getAttendancesByUserId(user_id)

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

    const {
      latitude,
      longitude,
      city,
      region,
      country_name,
      country_code,
    } = await getLocation(ip_address)

    const attendance = await attendanceService.storeAttendance({
      date: new Date().toISOString().slice(0, 10),
      type,
      user_id,
      ip_address,
      location: {
        latitude,
        longitude,
        address: `${city}, ${region}, ${country_name}`,
        country_code,
      }
    })

    return successResponse({ res, result: attendance })
  } catch (error) {
    return errorResponse({ error, res })
  }
}

module.exports = { getMyAttendances, postAttendance }
