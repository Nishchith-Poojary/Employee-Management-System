import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeDetail = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null) // Initialize with null

const navigate=useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:4444/employee/${id}`)
      .then((result) => {
        if (result.data.status) {
          console.log(result.data)
          setEmployee(result.data.result[0]) // Correctly access employee data
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }, [id])

  if (!employee) {
    // Display loading or fallback when employee is null
    return <p>Loading...</p>
  }


  const handleLogout=()=>{
    axios.get(`http://localhost:4444/employee/logout`)
    .then(result=>{
        if(result.data.status){
            navigate('/start')
        }
    })
  }

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Emoployee Management System</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://localhost:4444/uploads/${employee.image}`}
          className="emp_det_image"
        />
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
        </div>
        <div>
          <button className="btn btn-primary me-2">Edit</button>
          <button className="btn btn-danger"  onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
