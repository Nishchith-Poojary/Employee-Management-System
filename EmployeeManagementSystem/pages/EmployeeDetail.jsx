import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeDetail = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [salaryHistory, setSalaryHistory] = useState([]) // Add state for salary history

  const navigate = useNavigate()

  // Fetch employee details
  useEffect(() => {
    axios
      .get(`http://localhost:4444/employee/${id}`)
      .then((result) => {
        if (result.data.status) {
          setEmployee(result.data.result[0])
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }, [id])

  // Fetch employee salary history
  useEffect(() => {
    axios
      .get(`http://localhost:4444/employee/salary-history/${id}`)
      .then((result) => {
        if (result.data.status) {
          setSalaryHistory(result.data.data)
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }, [id])

  if (!employee) {
    return <p>Loading...</p>
  }

  const handleLogout = () => {
    axios.get(`http://localhost:4444/employee/logout`).then((result) => {
      if (result.data.status) {
        return navigate('/start')
      }
      return navigate('/start')
    })
  }

  return (
    <div className='body' style={{width:"100%",height:"100vh",color:"wheat"}}>
      <div className="p-2 d-flex justify-content-center shadow " >
        <h4 style={{color:"white"}}>Employee Management System</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://localhost:4444/uploads/${employee.image}`}
          className="emp_det_image"
          alt="Employee"
        />
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
        </div>
        <div className="mt-4">
          <h4>Salary History</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Old Salary</th>
                <th>New Salary</th>
                <th>Change Date</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {salaryHistory.map((record, index) => (
                <tr key={index}>
                  <td>${record.old_salary}</td>
                  <td>${record.new_salary}</td>
                  <td>{new Date(record.change_date).toLocaleDateString()}</td>
                  <td>{record.category_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          {/* <button className="btn btn-primary me-2">Edit</button> */}
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
