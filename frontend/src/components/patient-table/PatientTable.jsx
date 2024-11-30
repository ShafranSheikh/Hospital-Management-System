import React from 'react'
import '../patient-table/patient-table.css'
import { Button } from '@mui/material'
const PatientTable = () => {
  return (
    <div className="patient-table-container">
      <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Purpose</th>
          <th>Phone Number</th>
          <th>Admision Date</th>
          <th>Discharge patient</th>
        </tr>
      </thead>
      <tbody>
          <tr >
            <td>id</td>
            <td>name</td>
            <td>age</td>
            <td>Gender</td>
            <td>Email</td>
            <td>Purpose</td>
            <td>Phone Number</td>
            <td>Admision Date</td>
            <td className='td-button'><button>Discharge</button></td>
          </tr>
          
      </tbody>
    </table>
    </div>
    
  )
}

export default PatientTable