const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employee_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false // this will not return password when we query user
  },
  phone_number: {
    type: String,
    unique: true
  },
  employment_type: {
    type: String,
    enum: ['Intern', 'Full-time', 'Contract'],
    default: 'Full-time'
  },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)
module.exports = User
