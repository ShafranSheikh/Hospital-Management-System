import React,{useState} from 'react';
import '../styles/tables.css';
import { useDispatch } from 'react-redux';
import {logout} from '../redux/features/authSlice.js'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '../components/tabs/Tabs.jsx';
import axios from 'axios';
import PatientTable from '../components/patient-table/PatientTable.jsx';
import DoctorTable from '../components/doctor-table/DoctorTable.jsx';
import StaffTable from '../components/staff-table/StaffTable.jsx';
const Tables = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // State to track the active tab
    const [activeTab, setActiveTab] = useState(0);

  // Data for tables
  const tabsData = [
    {
      label: 'Patients',
      content: <PatientTable />,
    },
    {
      label: 'Doctors',
      content: <DoctorTable />,
    },
    {
      label: 'Staffs',
      content: <StaffTable/>,
    },
  ];

    const handleLogout = async () =>{
        try{
            //get the token from local storage
            const token = localStorage.getItem('token');
            //call the logout endpoint
            await axios.post(
                'http://localhost:3000/api/auth/logout',
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch(logout());
        }catch(error){
            console.error('Logout failed:', error);
            alert('Logout failed');
        }
    }
    return (
        <>
            <div className="patient-header">
                <h1>Tables</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="patien-ribbon">
                <button onClick={()=> navigate('/tables/newpatient')}>Add New Patient <AddIcon fontSize='medium'/></button>
                <button onClick={()=> navigate('/tables/newdoctor')}>Add New Doctor <AddIcon fontSize='medium'/></button>
            </div>
            <Tabs tabs={tabsData} />
        </>
        
    )
}

export default Tables;