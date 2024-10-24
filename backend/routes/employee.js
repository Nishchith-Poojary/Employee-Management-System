const express = require('express')
const router = express.Router()
const con = require('../utils/db')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { createToken, createTokenE } = require('../utils/services/Token')

router.post('/employeelogin', (req, res) => {
  console.log(req.body.email)
  const sql = 'select * from employee where email=?'
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({
        loginStatus: false,
        Error: 'Query error',
      })
    }
    if (result.length > 0) {
      const salt = '2314'
      const hashedPassword = crypto
        .createHmac('sha256', salt)
        .update(req.body.password)
        .digest('hex')

      if (result[0].password !== hashedPassword) {
        return res.json({
          loginStatus: false,
          Error: 'Wrong Password',
        })
      }
      const user = result[0]
      const token = createTokenE(user)
      console.log(token)
      res.cookie('token', token)
      return res.json({
        loginStatus: true,
        id:result[0].employee_id
      })
    } else {
      return res.json({ loginStatus: false, Error: 'Wrong email or password' })
    }
  })
})


router.get('/:id',(req,res)=>{
    const id=req.params.id;
    const sql="select * from employee where employee_id=?"
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({status:false,Error:err})
        return res.json({status:true,result:result})
    })
})


router.get('/logout',(req,res)=>{
    res.clearCookie("token")
    return res.json({status:true})
})

module.exports = router
