require('dotenv').config()

const cookieParser = require('cookie-parser');
const express=require("express")
const app=express();
const cors=require('cors')
const PORT=process.env.PORT
const {verifyUser}=require('./middleware/verify')


const adminRoutes=require('./routes/adminRoutes')
const employeeRoutes=require('./routes/employee')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'POST','DELETE', 'OPTIONS'],
    credentials:true
  })
)
app.options('*', cors());  // Handle preflight requests for all routes

app.use(express.static('./public'))

app.use('/auth',adminRoutes)
app.use('/employee', employeeRoutes)



app.get('/verify',verifyUser,(req,res)=>{
  return res.json({status:true,role:req.role,id:req.id})
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})

console.log(PORT)