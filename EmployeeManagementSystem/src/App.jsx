import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from '../pages/Home'
import Employee from '../pages/Employee'
import Category from '../pages/Category'
import Profile from '../pages/Profile'
import AddCategory from '../pages/AddCategory'
import AddEmployee from '../pages/AddEmployee'
import EditEmployee from '../pages/EditEmployee'
import Start from '../pages/Start'
import EmployeeLogin from '../pages/EmployeeLogin'
import EmployeeDetail from '../pages/EmployeeDetail'
import axios from 'axios'
import AddAdmin from '../pages/AddAdmin'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<Start></Start>}></Route>
        <Route path="/" element={<Start></Start>}></Route>
        <Route path="/adminlogin" element={<Login></Login>}></Route>
        <Route
          path="/employeelogin"
          element={<EmployeeLogin></EmployeeLogin>}
        ></Route>
        <Route path="/employee/:id" element={<EmployeeDetail />}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route path="" element={<Home></Home>}></Route>
          <Route
            path="/dashboard/employee"
            element={<Employee></Employee>}
          ></Route>
          <Route
            path="/dashboard/category"
            element={<Category></Category>}
          ></Route>
          <Route
            path="/dashboard/add-admin"
            element={<AddAdmin></AddAdmin>}
          ></Route>
          <Route
            path="/dashboard/add-category"
            element={<AddCategory></AddCategory>}
          ></Route>
          <Route
            path="/dashboard/add-employee"
            element={<AddEmployee></AddEmployee>}
          ></Route>
          <Route
            path="/dashboard/employee/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
