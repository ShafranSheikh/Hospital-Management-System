import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../patient-table/patient-table.css'
import { Button } from '@mui/material'
const PatientTable = () => {
  const navigate = useNavigate();
  const [ patientDetails, setPatientDetails ]= useState([]);

  useEffect(()=>{
    const fetchPatientDetails = async ()=>{
      try{
        const response = await axios.get('http://localhost:3000/api/patient/details');
        setPatientDetails(response.data);
      }catch(error){
        console.error('Error fetching patient detials');
      }
    }
    fetchPatientDetails();
  },[]);
  const deletePatient = async(id)=>{
    try{
      await axios.delete(`http://localhost:3000/api/patient/delete/${id}`);
      setPatientDetails(patientDetails.filter((patient)=>patient.id !== id));
      alert('Patient Discharged Successfully');
    }catch(error){
      console.error('Error deleting patient:', error);
      alert('Failed to discharge patient.');
    }
  }
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
          <th>Address</th>
          <th>Purpose</th>
          <th>Phone Number</th>
          <th>Discharge patient</th>
        </tr>
      </thead>
      <tbody>
        {patientDetails.length > 0 ? (
          patientDetails.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.fname} {patient.lname}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.email}</td>
              <td>{patient.address}</td>
              <td>{patient.purpose}</td>
              <td>{patient.phone}</td>
              <td className='td-button' onClick={()=>deletePatient(patient.id)}><button>Discharge</button></td>
            </tr>
          ))
    ) : (
      <tr>
        <td colSpan="10">No doctor details available</td>
      </tr>
    )}
      </tbody>
    </table>
    </div>
    
  )
}

export default PatientTable