const { verifyToken } =require('../utils/services/Token')

const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false, Error: 'Plz Login' })
  }
  const user = verifyToken(token)
  if (!user) {
    return res.json({ status: false, Error: 'Plz Login' })
  }
  req.id=user.id;
  req.role=user.role;
  return next()
}

module.exports={
    verifyUser,
}
