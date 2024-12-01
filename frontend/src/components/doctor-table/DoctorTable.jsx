import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../doctor-table/doctor-table.css';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const DoctorTable = () => {
  const navigate = useNavigate();
  const [doctorDetails, setDoctordetails] = useState([]);
//fetching doctor details from the backend
useEffect(()=>{
  const fetchDoctorDetails = async () =>{
    try{
      const response = await axios.get('http://localhost:3000/api/doctors/details')
      setDoctordetails(response.data);
    }catch(error){
      console.error('Error fetching Doctor Details',error);
    }
  }
  fetchDoctorDetails();
},[]);
  return (
    <div className="doctor-table-container">
      <h2><button onClick={()=>navigate('/doctor/overview')}>View Complete Doctor overview &nbsp;<ArrowOutwardIcon/></button></h2>
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
        </tr>
      </thead>
      <tbody>
  {doctorDetails.length > 0 ? (
    doctorDetails.map((doctor) => (
      <tr key={doctor.id}>
        <td>{doctor.id}</td>
        <td>{doctor.fname} {doctor.lname}</td>
        <td>{doctor.age}</td>
        <td>{doctor.gender}</td>
        <td>{doctor.email}</td>
        <td>{doctor.pnumber}</td>
        <td>{doctor.rnumber}</td>
        <td>{doctor.experience}</td>
        <td>{doctor.speciality}</td>
        <td>{doctor.employment}</td>
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

export default DoctorTable