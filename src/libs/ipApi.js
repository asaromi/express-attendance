const fetch = require('node-fetch')

exports.getLocation = async (ip_address) => {
  const response = await fetch(`https://ipapi.co/${ip_address}/json`, {
    headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
  })
  return await response.json()
}
