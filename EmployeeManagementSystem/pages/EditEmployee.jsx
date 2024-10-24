import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EditEmployee = () => {
  const { id } = useParams()

    const [employee, setEmployee] = useState({
      name: '',
      email: '',
      salary: '',
      address: '',
      category_id: '',
    })

    const navigate=useNavigate()
    
  const [category, setCategory] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:4444/auth/allcategory')
      .then((result) => {
        if (result.data.status) {
          console.log(result.data.status)
          console.log(result.data.result)
          setCategory(result.data.result)
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))


      axios.get(`http://localhost:4444/auth/employee/${id}`)
      .then(result=>{
        setEmployee({
          ...employee,
          name: result.data.result[0].name,
          email: result.data.result[0].email,
          address: result.data.result[0].address,
          salary: result.data.result[0].salary,
          category_id:result.data.result[0].category_id
        })
      })
  }, [])

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(id)
    axios.put(`http://localhost:4444/auth/edit-employee/${id}`,employee)
    .then(result=>{
      if(result.data.status){
        navigate('/dashboard/employee')
      }else{
        alert(result.data.Error)
      }
    })
    .catch(err=>console.log(err));
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              value={employee.name}
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                return (
                  <option key={c.category_id} value={c.category_id}>
                    {c.category_name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee
