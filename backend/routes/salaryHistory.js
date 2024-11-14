// Fetch complete salary history for an employee
router.get('/:id', (req, res) => {
  const id = req.params.id
  const sql = `
    SELECT 
      e.name,
      sh.old_salary,
      sh.new_salary,
      sh.change_date,
      c.category_name
    FROM employee e
    JOIN salary_history sh ON e.employee_id = sh.employee_id
    JOIN category c ON e.category_id = c.category_id
    WHERE e.employee_id = ?
    ORDER BY sh.change_date;
  `

  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ status: false, Error: err })
    }
    return res.json({ status: true, history: result })
  })
})
