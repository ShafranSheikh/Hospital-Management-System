import React,{useState} from 'react';
import '../styles/patient.css';
import { useDispatch } from 'react-redux';
import {logout} from '../redux/features/authSlice.js'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
const Tables = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // State to track the active tab
    const [activeTab, setActiveTab] = useState(0);

  // Data for tables
    const tableData = [
    {
        title: "New Patients",
        rows: [
        { id: 1, name: "John", age: 28 },
        { id: 2, name: "Alice", age: 24 },
        { id: 3, name: "Doe", age: 54 },

        ],
    },
    {
        title: "Emergency",
        rows: [
        { id: 1, product: "Laptop", price: "$1200" },
        { id: 2, product: "Phone", price: "$800" },
        ],
    },
    {
        title: "Discharged",
        rows: [
        { id: 1, city: "New York", population: "8M" },
        { id: 2, city: "Los Angeles", population: "4M" },
        ],
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
            <div>
      {/* Tabs */}
      <div className="tabs">
        {tableData.map((table, index) => (
          <button
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {table.title}
          </button>
        ))}
      </div>

      {/* Table Display */}
      <div className="table-container">
        {activeTab === 0 && (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {tableData[0].rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 1 && (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {tableData[1].rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.product}</td>
                  <td>{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 2 && (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>City</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              {tableData[2].rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.city}</td>
                  <td>{row.population}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </div>
        </>
        
    )
}

export default Tables;