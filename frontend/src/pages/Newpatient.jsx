import React, { useState } from 'react';
import '../styles/newpatient.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const Newpatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        address: "",
        email: "",
        purpose: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const errors = {};

        // Validate firstName
        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required";
        }

        // Validate lastName
        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required";
        }

        // Validate age
        if (!formData.age) {
            errors.age = "Age is required";
        } else if (isNaN(formData.age) || formData.age <= 0) {
            errors.age = "Enter a valid age";
        }

        // Validate gender
        if (!formData.gender) {
            errors.gender = "Gender is required";
        }

        // Validate address
        if (!formData.address.trim()) {
            errors.address = "Address is required";
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            errors.email = "Enter a valid email address";
        }

        // Validate purpose
        if (!formData.purpose) {
            errors.purpose = "Purpose is required";
        }

        // Validate phone
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            errors.phone = "Enter a valid 10-digit phone number";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            for (const key in validationErrors) {
                toast.error(validationErrors[key]);
            }
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/patient/register/new', formData);
            toast.success('Patient added successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error during submission', error);
            toast.error('Failed to add patient');
        }
    };

    return (
        <>
            <div className="patient-header">
                <h1>Patients</h1>
                <button onClick={() => navigate('/tables')}>Back to Tables</button>
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
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
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
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                    {errors.age && <span className="error">{errors.age}</span>}
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
                    {errors.gender && <span className="error">{errors.gender}</span>}
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
                    {errors.address && <span className="error">{errors.address}</span>}
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
                    {errors.email && <span className="error">{errors.email}</span>}
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
                    {errors.purpose && <span className="error">{errors.purpose}</span>}
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
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default Newpatient;
