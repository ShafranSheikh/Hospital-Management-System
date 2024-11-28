import React, { useState } from 'react'
import '../styles/newpatient.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Newpatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
        email: "",
        purpose: "",
        phone: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/patient/register/new', formData);
            
        }catch(error){
            console.error('Error during submission',error);
        }
      };
  return (
    <>
        <div className="patient-header">
                <h1>Patients</h1>
                <button onClick={()=> navigate('/tables')}>Back to Tables</button>
        </div>
        <form className="patient-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group radio-group">
                <label>Gender:</label>
                <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                onChange={handleChange}
                />
                <label htmlFor="male">Male</label>
                <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
            </div>
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group radio-group">
                <label>Purpose:</label>
                <input
                type="radio"
                id="emergency"
                name="purpose"
                value="Emergency"
                onChange={handleChange}
                />
                <label htmlFor="emergency">Emergency</label>
                <input
                type="radio"
                id="normal"
                name="purpose"
                value="Normal"
                onChange={handleChange}
                />
                <label htmlFor="normal">Normal</label>
                <input
                type="radio"
                id="daily-checkup"
                name="purpose"
                value="Daily Checkup"
                onChange={handleChange}
                />
                <label htmlFor="daily-checkup">Daily Checkup</label>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <button type="submit">Submit</button>
            </div>
        </form>
    </>
  )
}

export default Newpatient;