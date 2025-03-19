import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';
import PatientCountChart from '../components/Doctor-count-chart/PatientCountChart.jsx';
import DoctorCountBarGraph from '../components/Doctor-count-chart/DoctorCountBarGraph.jsx';

const Dashboard = () => {
    const [showPopover, setShowPopover] = useState(false);
    const [doctorCount, setDoctorCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [resignedCount, setResignedCount] = useState(0);
    const [dischargedCount, setDischargedCount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchDoctorCount = async ()=>{
            try{
                const response = await axios.get('http://localhost:3000/api/doctors/count');
                setDoctorCount(response.data.count);
            }catch(error){
                console.error("Error fetching doctor count:", error);
            }
        }
        fetchDoctorCount();
        const fetchPatientCount = async()=>{
            try{
                const response = await axios.get('http://localhost:3000/api/patient/count');
                setPatientCount(response.data.count);
            }catch(error){
                console.error("Error fetching Patient count:", error);
            }
        }
        fetchPatientCount();
        const fetchResignedCount = async () =>{
                try{
                    const response = await axios.get('http://localhost:3000/api/doctors/resigned/count');
                    setResignedCount(response.data.count);
                }catch(error){
                    console.error('Error fetching resigned doctor count:', error);
                }
            };
        fetchResignedCount();
        const fetchDischargedCount = async ()=>{
            try{
                const response = await axios.get('http://localhost:3000/api/patient/discharged/count');
                setDischargedCount(response.data.count);
            }catch(error){
                console.error('Error fetching Discharged patient count:', error);
            }
        }
        fetchDischargedCount();
    },[]);
    const handleLogout = async () => {
        try {
            // Get the token from local storage
            const token = localStorage.getItem('token');

            // Call the logout endpoint
            await axios.post(
                'http://localhost:3000/api/auth/logout',
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Dispatch logout action and navigate to login page
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed');
        } finally {
            setShowPopover(false);
        }
    };

    const handleLogoutClick = () => {
        setShowPopover(true);
    };

    const handleClosePopover = () => {
        setShowPopover(false);
    };

    return (
        <>
            <div className="dashboeard-header">
                <h1>Dashboard</h1>
                <button onClick={handleLogoutClick}>Logout</button>
            </div>
            <div className="dashboard-functions">
                <button onClick={() => navigate('/tables')}>View Tables</button>
                <button>Generate Report</button>
            </div>
            <div className="dashboard-statistics">
                <div className="stat-card">
                    <h1>{patientCount}</h1>
                    <h3>Total Number of Patients</h3>
                </div>
                <div className="stat-card">
                    <h1>{doctorCount}</h1>
                    <h3>Total Number of Doctors</h3>
                </div>
                <div className="stat-card">
                    <h1>{resignedCount}</h1>
                    <h3>Resigned Doctors</h3>
                </div>
                <div className="stat-card">
                    <h1>{dischargedCount}</h1>
                    <h3>Discharged Patients</h3>
                </div>
            </div>
            <div className="graph-container">
                <PatientCountChart/>
                <DoctorCountBarGraph/>
            </div>
            {showPopover && (
                <>
                    <div className="logout-popover">
                        <p>Are you sure you want to log out?</p>
                        <button className="confirm-button" onClick={handleLogout}>
                            Yes
                        </button>
                        <button className="cancel-button" onClick={handleClosePopover}>
                            No
                        </button>
                    </div>
                    <div className="overlay" onClick={handleClosePopover}></div>
                </>
            )}
        </>
    );
};

export default Dashboard;
