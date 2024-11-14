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



// Get Complete Salary History for an Employee
router.get('/salary-history/:id', (req, res) => {
  const id = req.params.id;
  
  // Query to fetch complete salary history for a specific employee
  const sql = `
    SELECT 
      e.name,
      sh.old_salary,
      sh.new_salary,
      sh.change_date,
      c.category_name
    FROM employee e
    JOIN salary_history sh ON e.employee_id = sh.employee_id
    JOIN category c ON e.category_id = c.category_id
    WHERE e.employee_id = ?
    ORDER BY sh.change_date;
  `;

  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ status: false, Error: err });
    }
    return res.json({ status: true, data: result });
  });
});

module.exports = router;


router.get('/logout',(req,res)=>{
    res.clearCookie("token", { path: '/' });
    return res.json({status:true})
})

router.get('/:id',(req,res)=>{
    const id=req.params.id;
    const sql="select * from employee where employee_id=?"
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({status:false,Error:err})
        return res.json({status:true,result:result})
    })
})



module.exports = router
