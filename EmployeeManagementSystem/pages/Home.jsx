import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [adminTotal,setAdminTotal]=useState(0);
  const [employeeTotal,setEmployeeTotal]=useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins,setAdmins]=useState([])
  const [refresh,setRefresh]=useState(false)


useEffect(() => {
  adminCount() 
  employeeCount() 
  salaryCount()
  adminRecords()
}, [refresh])
const navigate=useNavigate()

const adminCount = () => {
  axios
    .get('http://localhost:4444/auth/admin-count')
    .then((result) => {
      if (result.data.status) {
        setAdminTotal(result.data.result[0].admin)
      }
    })
    .catch((err) => console.log(err))
    
}

const employeeCount = () => {
  axios
    .get('http://localhost:4444/auth/employee-count')
    .then((result) => {
      if (result.data.status) {
        setEmployeeTotal(result.data.result[0].employee)
      }
    })
    .catch((err) => console.log(err)) 
}


const salaryCount = () => {
  axios
    .get('http://localhost:4444/auth/salary-count')
    .then((result) => {
      if (result.data.status) {
        setSalaryTotal(result.data.result[0].salary)
      }
    })
    .catch((err) => console.log(err)) 
}


const adminRecords=()=>{
  axios
    .get('http://localhost:4444/auth/admin-records')
    .then((result) => {
      if (result.data.status) {
        setAdmins(result.data.result)
      }
    })
    .catch((err) => console.log(err)) 
}

const handleDelete=(id)=>{
  axios
    .post(`http://localhost:4444/auth/delete-admin/${id}`)
    .then((result) => {
      if (result.data.status) {
        navigate('/dashboard/')
        setRefresh(!refresh);
      } else {
        alert(result.data.Error)
      }
    })
    .catch((err) => console.log(err))
}

  return (
    <div>
      <Link to="/dashboard/add-admin" className="btn btn-success mt-4">
        Add Admin
      </Link>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:{adminTotal}</h5>
            <h5></h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr>
                <td>{a.email}</td>
                <td>
                  {/* <button className="btn btn-info btn-sm me-2">Edit</button> */}
                  <button className="btn btn-warning btn-sm" onClick={()=>handleDelete(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Home
