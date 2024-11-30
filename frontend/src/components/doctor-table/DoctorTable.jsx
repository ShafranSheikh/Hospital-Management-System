import React from 'react'
import '../doctor-table/doctor-table.css'
const DoctorTable = () => {
  return (
    <div className="doctor-table-container">
      <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Reg No</th>
          <th>Experience</th>
          <th>Specialization</th>
          <th>Employment</th>
          <th>Resign</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>id</td>
            <td>Name</td>
            <td>Age</td>
            <td>Gender</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Reg No</td>
            <td>Experience</td>
            <td>Specialization</td>
            <td>Employment</td>
            <td className='td-doctor-button'><button>Resign</button></td>
          </tr>
      </tbody>
    </table>
    </div>
    
  )
}

export default DoctorTable