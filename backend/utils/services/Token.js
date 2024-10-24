const jwt = require('jsonwebtoken')
const secretKey = '12345668790'

const createToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      role: 'admin',
    },
    secretKey,
    { expiresIn: '1d' }
  )
}


const createTokenE = (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      role: 'employee',
    },
    secretKey,
    { expiresIn: '1d' }
  )
}

const verifyToken = (token) => {
  return jwt.verify(token, secretKey)
}

module.exports = {
  createToken,
  verifyToken,
  createTokenE
}
