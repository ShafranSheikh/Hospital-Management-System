import React from 'react';
import { useDispatch } from 'react-redux';
import {logout} from '../redux/features/authSlice.js'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';
const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div className="dashboeard-header">
            <h1>DashBoard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="dashboard-functions">
            <div className="month-selector">
                <p>Date Range</p>
                <form >
                    <input type="month" />
                </form>
            </div>
            <button>Add New Patient</button>
            <button>Add New Doctor</button>
        </div>
        <div className="dashboard-statistics">
            <div className="stat-card">
                <h1>01</h1>
                <h3>Total Number of Patients</h3>
            </div>
            <div className="stat-card">
                <h1>01</h1>
                <h3>Total Number of Doctors</h3>
            </div>
            <div className="stat-card">
                <h1>01</h1>
                <h3>Total Number of Specialists</h3>
            </div>
            <div className="stat-card">
                <h1>01</h1>
                <h3>Discharged Patients</h3>
            </div>
        </div>
    </>
  )
}

export default Dashboard