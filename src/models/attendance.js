const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
  date: {
    type: String, // format: YYYY-MM-DD
    required: true
  },
  type: {
    type: String,
    enum: ['in', 'out'],
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ip_address: {
    type: String,
    required: true
  },
  location: {
    type: Object,
    // it must be latitude, longitude, and address
    required: true
  },
}, { timestamps: true })

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema)
module.exports = Attendance
