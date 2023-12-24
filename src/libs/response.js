exports.successResponse = ({ message, res, result }) => {
  return res.status(200).json({
    success: true,
    result,
    message
  })
}

exports.errorResponse = ({ error, res, statusCode = 500 }) => {
  const { message, statusCode: code } = error

  return res.status(code || statusCode).json({
    success: false,
    error: message || error
  })
}
