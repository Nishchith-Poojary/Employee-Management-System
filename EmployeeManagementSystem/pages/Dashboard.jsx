import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Dashboard = () => {
  const  navigate=useNavigate();

  const handleLogout=()=>{
    axios.get('http://localhost:4444/auth/logout')
    .then(result=>{
      if(result.data.status){
        navigate('/start')
      }
    })
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-mid-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              EMS
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i class="fa-solid fa-gauge"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-white">
                  <i class="fa-solid fa-users"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/category" className="nav-link px-0 align-middle text-white">
                  <i class="fa-solid fa-table-cells"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              {/* <li className="w-100">
                <Link to="/dashboard/profile" className="nav-link px-0 align-middle text-white">
                  <i class="fa-regular fa-user"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li> */}
              <li className="w-100" onClick={handleLogout}>
                <Link to="" className="nav-link px-0 align-middle text-white">
                  <i class="fa-solid fa-right-from-bracket"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div  className='col p-0 m-0'>
          <div className='p-2 d-flex justify-content-center shadow '>
            <h4>Employee Management System</h4>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
