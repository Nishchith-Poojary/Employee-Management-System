import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Employee = () => {
  const [employee, setEmployee] = useState([])
  useEffect(() => {
    axios.get('http://localhost:4444/auth/allemployee').then((result) => {
      if (result.status) {
        console.log('result;', result.data.result)
        setEmployee(result.data.result)
      } else {
        alert(result.data.Error)
      }
    })
  }, [])

  const navigate=useNavigate();

  const handleDelete=(id)=>{
    axios.delete(`http://localhost:4444/auth/delete-employee/${id}`)
    .then(result=>{
      if(result.data.status){
        window.location.reload()
      }else{
        alert(result.data.Error);
      }
    })
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee list</h3>
      </div>
      <Link to="/dashboard/add-employee" className="btn btn-success mt-4">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => {
              return (
                <tr key={e.employee_id}>
                  <td>{e.name}</td>
                  <td>
                    <img
                      src={`http://localhost:4444/uploads/${e.image}`}
                      alt={e.name}
                      width="40px"
                      height="40px"
                      style={{ borderRadius: '100px' }}
                    />
                  </td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>
                    <Link
                      to={`dashboard/edit_employee/${e.employee_id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(e.employee_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
