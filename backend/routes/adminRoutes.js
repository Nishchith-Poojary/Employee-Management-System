const express = require('express')
const con = require('../utils/db')
const { createToken } = require('../utils/services/Token')
const router = express.Router()
const crypto = require('crypto')
const multer = require('multer')
const path = require('path')

router.post('/adminlogin', (req, res) => {
  console.log(req.body.email)
  const sql = 'select * from admin where email=? and password=?'
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({
        loginStatus: false,
        Error: 'Query error',
      })
    }
    if (result.length > 0) {
      console.log(result)
      const user = result[0]
      const token = createToken(user)
      console.log(token)
      res.cookie('token', token)
      return res.json({
        loginStatus: true,
      })
    } else {
      return res.json({ loginStatus: false, Error: 'Wrong email or password' })
    }
  })
})

router.post('/add-category', (req, res) => {
  const sql = 'INSERT INTO category (category_name) VALUES (?)'
  console.log(req.body)
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ status: false, Error: 'Query Error' })
    return res.json({ status: true })
  })
})

router.post('/add-admin',(req,res)=>{
  const sql=`INSERT INTO admin (id,email,password) VALUES (?,?,?)`
  console.log("add-admin",req.body)
  con.query(sql,[Date.now(),req.body.email,req.body.password],(err,result)=>{
    if(err) return res.json({status:false,Error:JSON.stringify(err)})
    return res.json({status:true})
  })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

router.post('/add-employee', upload.single('image'), (req, res) => {
  console.log('Request received at /add-employee')
  const sql =
    'INSERT INTO employee (name, email, password, salary, image, category_id, address) VALUES (?, ?, ?, ?, ?, ?, ?);'

  console.log(req.file)
  const salt = '2314'
  const hashedPassword = crypto
    .createHmac('sha256', salt)
    .update(req.body.password)
    .digest('hex')
  console.log(req.file)
  const newValues = [
    req.body.name,
    req.body.email,
    hashedPassword,
    req.body.salary,
    req.file.filename,
    req.body.category_id,
    req.body.address,
  ]

  console.log(newValues)
  con.query(sql, newValues, (err, result) => {
    if (err) {
      return res.json({ status: false, Error: JSON.stringify(err) })
    }
    return res.json({ status: true })
  })
})

router.get('/allcategory', (req, res) => {
  const sql = 'select * from category'
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ status: false, Error: 'Query Error' })
    }
    return res.json({ status: true, result: result })
  })
})


router.get('/allemployee', (req, res) => {
  const sql = `
    SELECT 
      e.*,
      (SELECT category_name FROM category c WHERE c.category_id = e.category_id) AS category_name
    FROM employee e;
  `

  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ status: false, Error: 'query Error' })
    }
    return res.json({ status: true, result: result })
  })
})



// router.delete('/delete-employee/:id', (req, res) => {
//   const id = req.params.id
//   const sql = 'delete from employee where employee_id=?'
//   con.query(sql, [id], (err, result) => {
  //     if (err) {
//       return res.json({ status: false, Error: err })
//     } else {
//       return res.json({ status: true, result: result })
//     }
//   })
// })




router.get('/admin-count', (req, res) => {
  const sql = 'select count(id) as admin from admin'
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ status: false, Error: err })
    } else {
      return res.json({ status: true, result: result })
    }
  })
})

router.get('/employee-count', (req, res) => {
  const sql = 'select count(employee_id) as employee from employee' // Correct column name for employee ID
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ status: false, Error: err })
    } else if (result.length > 0) {
      return res.json({ status: true, result: result })
    } else {
      return res.json({ status: false, Error: 'No employees found' })
    }
  })
})


router.get('/salary-count', (req, res) => {
  const sql = 'select sum(salary) as salary from employee' 
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ status: false, Error: err })
    } else if (result.length > 0) {
      return res.json({ status: true, result: result })
    } else {
      return res.json({ status: false, Error: 'No employees found' })
    }
  })
})


router.get('/admin-records',(req,res)=>{
  const sql="select * from admin"
  con.query(sql, (err, result) => {
      if (err) {
        return res.json({ status: false, Error: err })
      } else if (result.length > 0) {
        return res.json({ status: true, result: result })
      } else {
        return res.json({ status: false, Error: 'No employees found' })
      }
    })
})


router.get('/logout',(req,res)=>{
  res.clearCookie("token");
  return res.json({status:true})
})


router.delete('/delete-employee/:id', (req, res) => {
  const id = req.params.id
  const sql = 'CALL delete_employee_by_id(?)'

  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ status: false, error: err })
    } else {
      if (result.affectedRows === 0) {
        return res.json({
          status: false,
          message: 'No employee found with the given ID',
        })
      }
      return res.json({
        status: true,
        message: 'Employee deleted and archived successfully',
      })
    }
  })
})



router.put('/edit-employee/:id', (req, res) => {
  console.log(req.body, req.params.id)
  const id = req.params.id
  const sql =
  'update employee set name=? ,email=?,salary=?,address=?,category_id=? where employee_id=?'
  console.log('id', id)
  const newValues = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id,
  ]
  con.query(sql, [...newValues, id], (err, result) => {
    if (err) return res.json({ status: false, Error: err })
      return res.json({ status: true, result: result })
})
})

router.post('/delete-admin/:id',(req,res)=>{
  const id=req.params.id;
  console.log(id);
  const sql='delete from admin where id=(?)'
  con.query(sql,[id],(err,result)=>{
        if (err) {
          return res.json({ status: false, Error: 'query Error' })
        }
        return res.json({ status: true })
  })
})

router.get('/employee/:id', (req, res) => {
  const id = req.params.id
  const sql = 'select * from employee where employee_id=?'
  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ status: false, Error: err })
    } else {
      return res.json({ status: true, result: result })
    }
  })
})

module.exports = router
