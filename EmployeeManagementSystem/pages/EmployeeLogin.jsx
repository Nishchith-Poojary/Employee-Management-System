import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:4444/employee/employeelogin', values)
      .then((result) => {
        if (result.data.loginStatus) {
          navigate(`/employee/${result.data.id}`)
        } else {
          setError(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2>Login Page</h2>
        <div className="text-danger">{error && error}</div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
          <div className="mb-3">
            <input type="checkbox" name="tick" id="tick" />
            <label htmlFor="tick">You are agree with terms</label>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeLogin
