import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const AddCategory = () => {
    const [category,setCategory]=useState()
    const navigate=useNavigate();

    axios.defaults.withCredentials = true


    const handleSubmit=(e)=>{
        e.preventDefault();
        axios
          .post('http://localhost:4444/auth/add-category',{category:category})
          .then((result) => {
            console.log(result)
            if (result.data.status) {
              navigate('/dashboard/category')
            } else {
              alert(result.data.Error)
            }
          })
          .catch((err) => {
            console.log(err)
          })
    }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="p-3 rounded w-25 border ">
        <h2>Add Category</h2>
        <form  onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">
              <strong>Category</strong>
            </label>
            <input
              type="text"
              name="category"
              id="category"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e)=>setCategory(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Add Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory
