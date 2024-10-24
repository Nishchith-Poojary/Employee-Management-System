import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Category = () => {
  const [category,setCategory]=useState([])

  useEffect(() => {
    axios
      .get('http://localhost:4444/auth/allcategory')
      .then((result) => {
        if (result.data.status) {
          setCategory(result.data.result)
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Category list</h3>
      </div>
      <Link to="/dashboard/add-category" className="btn btn-success">
        Add Category
      </Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {
              category.map(c=>{
                return (
                  <tr key={c.category_id}>
                    {c.category_name}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category
