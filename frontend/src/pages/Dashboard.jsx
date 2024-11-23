import React from 'react'
import '../styles/dashboard.css';
const Dashboard = () => {
  return (
    <>
        <div className="dashboeard-header">
            <h1>DashBoard</h1>
            <button>SignOut</button>
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