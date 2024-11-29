import React,{useState} from 'react';
import '../styles/tables.css';
import { useDispatch } from 'react-redux';
import {logout} from '../redux/features/authSlice.js'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '../components/tabs/Tabs.jsx';
import axios from 'axios';
const Tables = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // State to track the active tab
    const [activeTab, setActiveTab] = useState(0);

  // Data for tables
  const tabsData = [
    {
      label: 'Home',
      content: <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
          <tr >
            <td>id</td>
            <td>name</td>
            <td>age</td>
          </tr>
      </tbody>
    </table>,
    },
    {
      label: 'Profile',
      content: <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>id</td>
            <td>product</td>
            <td>price</td>
          </tr>
          
      </tbody>
    </table>,
    },
    {
      label: 'Settings',
      content: <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>City</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>id</td>
            <td>city</td>
            <td>population</td>
          </tr>
      </tbody>
    </table>,
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