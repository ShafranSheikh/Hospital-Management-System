import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/doctoroverview.css';
import axios from 'axios';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const DoctorOverview = () => {
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
    const navigate = useNavigate();
  return (
    <>
        <div className="patient-header">
            <h1>Doctor Overview</h1>
            <button onClick={()=> navigate('/tables')}>Back to Tables</button>
        </div>
        <div className="doctor-stats">
            <div className="doctor-card-container">
                <h1>20</h1>
                <p>Total Number of Doctors</p>
            </div>
            <div className="doctor-card-container">
                <h1>10</h1>
                <p>Total Number of Resigned Doctors</p>
            </div>
        </div>
        <div className="doctor-overview-container">
            {doctorDetails.length > 0 ?(doctorDetails.map((doctor)=>(
                <div className="doctor-overview-card" key={doctor.id}>
                    <img src={doctor.data} alt="" />
                    <h2>Dr.&nbsp;{doctor.fname}&nbsp;{doctor.lname}</h2>
                    <p>{doctor.speciality}</p>
                    <p>Doctor ID:&nbsp; <span>{doctor.rnumber}</span></p>
                    <button><OpenInNewIcon/></button>
                </div>
            ))):(
                <p>No Doctor details available</p>
            )}
            
        </div>
    </>
  )
}

export default DoctorOverview;