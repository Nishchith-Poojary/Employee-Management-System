


const mysql=require('mysql')

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nish@2205',
    database:'employeems',
})


con.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('connected')
    }
})

module.exports=con

